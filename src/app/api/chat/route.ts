import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.AI_MODEL || "gemini-1.5-flash";

    const systemInstruction = `You are "RackAI", the friendly AI assistant for iRack IT Solutions, an Ethiopian IT company.
Location: Piyassa, Wastna Building 5th Floor, Office 501, Addis Ababa, Ethiopia.
Email: info@iracktech.com | Phones: +251 111 704 557 / +251 92 015 5779
Services: Data Center & Power Infrastructure, Enterprise Networking, Cyber Security, Modern Data Center & Cloud, Smart City Infrastructure, Software Solutions.
Be warm, concise, and helpful.`;

    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemInstruction,
    });

    const lastUserMessage =
      messages?.slice().reverse().find((m: any) => m.role === "user")?.content || "Hello";

    const result = await model.generateContent(lastUserMessage);
    const reply = result.response.text();

    if (!reply) {
      return NextResponse.json(
        { error: "Empty response received from Gemini." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply, message: reply });
  } catch (err: any) {
    console.error("Gemini SDK Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process chat request." },
      { status: 500 }
    );
  }
}
