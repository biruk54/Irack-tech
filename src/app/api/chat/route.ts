import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = "https://generativelanguage.googleapis.com/v1beta/openai";
    const model = process.env.AI_MODEL || "gemini-2.0-flash";

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const systemPrompt = {
      role: "system",
      content: `You are "RackAI", the friendly AI assistant for iRack IT Solutions, an Ethiopian IT company located in Addis Ababa (Piyassa, Wastna Building 5th Floor).`
    };

    // Prevent hanging by timing out after 15 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [systemPrompt, ...messages],
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Gemini API error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "No response text received." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    if (err.name === "AbortError") {
      return NextResponse.json(
        { error: "The AI request timed out. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
