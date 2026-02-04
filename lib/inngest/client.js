import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "pathaii", 
  name: "PathAI",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});