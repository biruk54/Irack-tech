import { NextRequest, NextResponse } from "next/server";

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

    const modelName = process.env.AI_MODEL || "gemini-1.5-flash";
    const lastUserMessage =
      messages?.slice().reverse().find((m: any) => m.role === "user")?.content || "Hello";

    const systemPrompt = `You are "RackAI", the friendly AI assistant for iRack IT Solutions, an Ethiopian IT company.
Location: Piyassa, Wastna Building 5th Floor, Office 501, Addis Ababa, Ethiopia.
Email: info@iracktech.com | Phones: +251 111 704 557 / +251 92 015 5779
Services: Data Center & Power Infrastructure, Enterprise Networking, Cyber Security, Modern Data Center & Cloud, Smart City Infrastructure, Software Solutions.
Be warm, concise, and helpful.`;

    const isBearer = apiKey.startsWith("AQ.") || apiKey.startsWith("ya29.");
    const url = isBearer
      ? `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`
      : `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isBearer) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            parts: [{ text: lastUserMessage }],
          },
        ],
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error Response:", errorText);
      return NextResponse.json(
        { error: `Gemini API failed (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json(
        { error: "No response text generated." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply, message: reply });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
