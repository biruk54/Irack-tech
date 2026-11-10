import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.AI_API_KEY;
    // Force the official Google Gemini OpenAI-compatible endpoint
    const baseUrl = "https://generativelanguage.googleapis.com/v1beta/openai";
    const model = process.env.AI_MODEL || "gemini-3.8-flash";

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const systemPrompt = {
      role: "system",
      content: `You are "RackAI", the friendly AI assistant for iRack IT Solutions, an Ethiopian IT company. Answer questions accurately based on the company details.

iRack IT Solutions Overview:
- Location: Piyassa, Wastna Building 5th Floor, Office 501, Addis Ababa, Ethiopia
- Email: info@iracktech.com | Phones: +251 111 704 557 / +251 92 015 5779
- Services: Data Center & Power Infrastructure, Enterprise Networking, Cyber Security, Modern Data Center & Cloud, Smart City Infrastructure, Software Solutions.`
    };

    const payloadMessages = [systemPrompt, ...(messages || [])];

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: payloadMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return NextResponse.json(
        { error: `Gemini API Error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "Received empty response from AI." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: reply });
  } catch (err: any) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
