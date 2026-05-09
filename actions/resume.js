"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath, unstable_cache } from "next/cache";
import { optimizeForATS } from "@/lib/ats-scoring";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function saveResume(content) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) throw new Error("User not found");

  try {
    const atsFriendlyContent = optimizeForATS(content);

    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content: atsFriendlyContent,
      },
      create: {
        userId: user.id,
        content: atsFriendlyContent,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("Unauthorized");

  // Cache the database query for 1 hour
  const getCachedResume = unstable_cache(
    async (email) => {
      return await db.resume.findFirst({
        where: {
          user: {
            email: email,
          },
        },
      });
    },
    ["resume"], // cache key
    { revalidate: 3600 } // 1 hour cache
  );

  return await getCachedResume(userEmail);
}

export async function improveWithAI({ current, type }) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: userEmail },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, ATS-friendly, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    7. Avoid emojis, tables, icons, and decorative formatting
    8. Keep it suitable for plain-text ATS parsing

    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
