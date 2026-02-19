import { GoogleGenAI } from "@google/genai";

let apiKey = '';

try {
    // Check if process is defined (Node.js/Bundled env) to avoid ReferenceError in browser
    if (typeof process !== 'undefined' && process.env) {
        apiKey = process.env.API_KEY || '';
    }
} catch (e) {
    console.warn("Environment variable access failed:", e);
}

const ai = new GoogleGenAI({ apiKey });

export const refineDescription = async (currentDescription: string, type: string): Promise<string> => {
    if (!apiKey) {
        console.warn("No API Key provided for Gemini");
        return currentDescription;
    }

    try {
        const prompt = `
      You are a compassionate case worker for a Kenyan charity.
      A beneficiary is applying for ${type} assistance.
      They wrote: "${currentDescription}".

      Rewrite this to be more clear, professional, and compelling for a grant application,
      while keeping their original voice and key facts.
      Keep it under 100 words.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text || currentDescription;
    } catch (error) {
        console.error("Error refining description:", error);
        return currentDescription;
    }
};

export const generateImpactSummary = async (): Promise<string> => {
    if (!apiKey) return "Together, we are changing lives.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Write a short, inspiring 2-sentence summary about the impact of a charity in Kenya helping 5000+ people with medical and education needs this year."
        });
        return response.text || "Together, we are changing lives.";
    } catch (e) {
        return "Together, we are changing lives.";
    }
}