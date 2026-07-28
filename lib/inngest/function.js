import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

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
    : [];

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
    salaryRanges,
    growthRate: toNumber(base.growthRate, 10),
    demandLevel,
    topSkills,
    marketOutlook,
    keyTrends,
    recommendedSkills,
  };
}

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights", id: "generate-industry-insights" },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ event, step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY valid JSON.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage number.
          Include at least 5 skills and trends.
        `;

      const cleanedText = await step.run(
        `generate-insights-${industry}`,
        async () => {
          const res = await model.generateContent(prompt);
          const text = res?.response?.text() || "";
          return text.replace(/```(?:json)?\n?/g, "").trim();
        }
      );

      let rawInsights = {};
      try {
        rawInsights = JSON.parse(cleanedText);
      } catch (err) {
        console.error(`Failed to parse AI response for industry ${industry}:`, err);
      }

      const insights = sanitizeInsights(rawInsights);

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);