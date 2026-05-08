"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

const FALLBACK_INSIGHTS = {
  salaryRanges: [
    {
      role: "Entry Level",
      min: 40000,
      max: 70000,
      median: 55000,
      location: "Global",
    },
  ],
  growthRate: 10,
  demandLevel: "Medium",
  topSkills: ["Communication", "Problem Solving", "AI Tools"],
  marketOutlook: "Neutral",
  keyTrends: ["Automation", "AI-first workflows", "Remote collaboration"],
  recommendedSkills: ["Data Literacy", "Prompting", "Domain Fundamentals"],
};

function toNumber(value, fallback) {
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function sanitizeInsights(raw) {
  const base = raw && typeof raw === "object" ? raw : {};

  const salaryRanges = Array.isArray(base.salaryRanges)
    ? base.salaryRanges
        .map((item) => ({
          role: String(item?.role ?? "Role"),
          min: toNumber(item?.min, 40000),
          max: toNumber(item?.max, 70000),
          median: toNumber(item?.median, 55000),
          location: String(item?.location ?? "Global"),
        }))
        .slice(0, 8)
    : FALLBACK_INSIGHTS.salaryRanges;

  const demandLevel = ["High", "Medium", "Low"].includes(base.demandLevel)
    ? base.demandLevel
    : "Medium";

  const marketOutlook = ["Positive", "Neutral", "Negative"].includes(base.marketOutlook)
    ? base.marketOutlook
    : "Neutral";

  const topSkills = Array.isArray(base.topSkills)
    ? base.topSkills.map((item) => String(item)).filter(Boolean).slice(0, 12)
    : [];

  const keyTrends = Array.isArray(base.keyTrends)
    ? base.keyTrends.map((item) => String(item)).filter(Boolean).slice(0, 12)
    : [];

  const recommendedSkills = Array.isArray(base.recommendedSkills)
    ? base.recommendedSkills.map((item) => String(item)).filter(Boolean).slice(0, 12)
    : [];

  return {
    salaryRanges: salaryRanges.length ? salaryRanges : FALLBACK_INSIGHTS.salaryRanges,
    growthRate: toNumber(base.growthRate, FALLBACK_INSIGHTS.growthRate),
    demandLevel,
    topSkills: topSkills.length ? topSkills : FALLBACK_INSIGHTS.topSkills,
    marketOutlook,
    keyTrends: keyTrends.length ? keyTrends : FALLBACK_INSIGHTS.keyTrends,
    recommendedSkills: recommendedSkills.length
      ? recommendedSkills
      : FALLBACK_INSIGHTS.recommendedSkills,
  };
}

async function ensureIndustryInsight(industry) {
  const existing = await db.industryInsight.findUnique({
    where: { industry },
  });

  if (existing) return existing;

  let insights = FALLBACK_INSIGHTS;

  try {
    const generated = await generateAIInsights(industry);
    insights = sanitizeInsights(generated);
  } catch (aiError) {
    console.error("AI insight generation failed, using fallback:", aiError.message);
  }

  return db.industryInsight.upsert({
    where: { industry },
    update: {},
    create: {
      industry,
      ...insights,
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
}

export async function updateUser(data) {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) throw new Error("User not found");

  try {
    await ensureIndustryInsight(data.industry);

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        industry: data.industry,
        experience: data.experience,
        bio: data.bio,
        skills: data.skills,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    return {
      success: true,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user and industry:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) throw new Error("User not found");

  try {
    const userData = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!userData?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
