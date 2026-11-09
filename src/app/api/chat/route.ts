import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai";
    const model = process.env.AI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured." },
        { status: 500 }
      );
    }

    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const endpoint = `${cleanBaseUrl}/chat/completions`;

    const systemPrompt = {
      role: "system",
      content: "You are RackAI, the friendly AI assistant for iRack IT Solutions, an Ethiopian IT company. Answer questions accurately and concisely about services, partners, history, and contacting the team."
    };

    const formattedMessages = [systemPrompt, ...(messages || [])];

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `AI Provider Error: ${errorData}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response returned.";

    return NextResponse.json({ message: reply });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to connect to AI server." },
      { status: 500 }
    );
  }
}
