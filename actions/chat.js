"use server";

import { auth } from "@/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
// This is like connecting to an API service
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select the AI model to use (gemini-1.5-flash is fast and accurate)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Send a message to the AI and get a response
 * 
 * This function:
 * 1. Checks if user is logged in (authorized)
 * 2. Sends the message to Google's AI model
 * 3. Returns the AI's response
 * 
 * Think of it like: User -> Your App -> Google AI -> Response
 */
export async function sendChatMessage(userMessage) {
  try {
    // Step 1: Check if user is logged in
    // auth() is like checking if the user is authenticated
    const session = await auth();
    
    if (!session?.user?.email) {
      throw new Error("Unauthorized - Please log in first");
    }

    // Step 2: Validate the message is not empty
    if (!userMessage || userMessage.trim().length === 0) {
      throw new Error("Message cannot be empty");
    }

    // Step 3: Create a system prompt that tells AI how to behave
    // This is like giving AI instructions on what kind of assistant it should be
    const systemPrompt = `You are Path AI, an intelligent career guidance assistant for students transitioning into tech careers.

Your responsibilities:
- Provide actionable 30-60-90 day roadmaps for career transitions
- Analyze resume gaps and suggest improvements (keeping them ATS-friendly)
- Recommend high-impact skills based on target roles
- Help with interview preparation and strategy
- Create strong cover letter bullet points
- Give practical, step-by-step guidance

Be concise, specific, and action-oriented. Format responses with clear sections using markdown (###).
Include specific examples, timelines, and measurable outcomes when possible.`;

    // Step 4: Send the message to Google's AI
    // model.generateContent() is like asking the AI to think and respond
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\nUser's message: ${userMessage}`,
            },
          ],
        },
      ],
    });

    // Step 5: Extract the text response from the AI
    // response.text() gets the actual answer from the AI
    const response = result.response;
    const aiMessage = response.text();

    // Step 6: Return the response
    // This gets sent back to the frontend to display to the user
    return {
      success: true,
      message: aiMessage,
      timestamp: new Date(),
    };
  } catch (error) {
    // If something goes wrong, return an error message
    console.error("Chat Error:", error);
    
    // Check what kind of error it is and return appropriate message
    if (error.message.includes("Unauthorized")) {
      return {
        success: false,
        message: "You need to log in to use Path AI Chat",
        error: "UNAUTHORIZED",
      };
    }

    if (error.message.includes("API")) {
      return {
        success: false,
        message: "AI service is currently unavailable. Please try again later.",
        error: "API_ERROR",
      };
    }

    return {
      success: false,
      message: "Sorry, something went wrong. Please try again.",
      error: "UNKNOWN_ERROR",
    };
  }
}
