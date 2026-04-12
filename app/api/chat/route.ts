import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the HARVEN AI Assistant, a professional and helpful guide for the HARVEN food sourcing platform. 
HARVEN is a premium global sourcing and B2B trading company based in the UAE.

Your goal is to assist potential partners, retailers, and industrial buyers.

Key Knowledge:
- Brands: 
    1. KeraZone: Focuses on Kerala heritage products like 'Black Stingless Bee Honey' (Rare), 'Kerala Green Cardamom' (Export Grade), and 'Virgin Coconut Oil'.
    2. Fióri: Focuses on industrial fruit solutions like 'Mangozy' (100% Premium Alphonso Mango Pulp).
- Services: Bulk supply, contract sourcing, direct farm partnerships, and global logistics hub (Dubai).
- Tone: Professional, premium, knowledgeable, and helpful. 
- Goal: Answer product questions, explain shipping capabilities, and encourage high-intent users to use the 'Contact Us' page for bulk pricing.

Keep responses concise and professional. If you don't know something, suggest contacting the team at harvenllc@gmail.com.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT
    });

    // Format history for Gemini
    // Gemini expects an array of { role: 'user' | 'model', parts: [{ text: '...' }] }
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: history,
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
