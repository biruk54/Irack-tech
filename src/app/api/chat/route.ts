import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1)
    .max(30),
});

const SYSTEM_PROMPT = `You are "RackAI", the friendly AI assistant for iRack IT Solutions, an Ethiopian IT company. Answer questions accurately based on the knowledge base below. Be warm, concise and helpful. Use short paragraphs or bullet lists. If a question is outside this knowledge base, politely say you focus on iRack topics and suggest contacting the team. Never invent facts, prices, or promises.

=== iRack IT Solutions KNOWLEDGE BASE (Company Profile V0.7, 2026) ===

COMPANY OVERVIEW:
- iRack IT Solutions is a trusted technology solutions provider in Ethiopia, established in 2014 G.C.
- Headquartered at Piyassa, Wastna Building 5th Floor, Office Number 501, Addis Ababa, Ethiopia.
- Email: info@iracktech.com | Phones: +251 111 704 557 / +251 92 015 5779
- Website: www.iracktech.com | Working hours: Monday to Saturday, 8:30 AM - 6:00 PM.
- Tagline: "Smart solutions, stronger future."
- Performance: 12 years in the market, 100+ projects completed, 70+ certified professionals, partnered with top global industry leaders.
- About: delivers high-quality, value-added IT solutions across hardware, software, infrastructure and enterprise systems; specialized turnkey technology solutions for modern business needs; one of Ethiopia's leading IT solution providers.
- Journey: 2014 started as hardware & network solution provider → 2015 data center infrastructure → 2016 systems & cloud solutions → 2017 cyber security → 2018 built strong certified team → 2020 became one of the top IT companies in Ethiopia.
- Revenue growth: from 65.7M ETB (2020/21) to 527M ETB (2024/25) — +701.6% overall growth, 8.02x revenue multiple, 68.3% CAGR; average annual turnover 246.8M ETB.

MISSION: To deliver innovative, reliable, and value-driven IT solutions by listening to our clients, understanding their needs, and using technology to drive their success.
VISION: To become Ethiopia's most trusted and leading IT solution provider, empowering businesses through smart infrastructure, modern technology, and lasting partnerships.
CORE VALUES: Customer Focus, Integrity, Teamwork, Excellence, Innovation, Sustainability.

SERVICES (6 service lines, workflow: Consult → Design → Supply → Install → Commission):
1. Data Center & Power Infrastructure — design & consultancy, modular data centers, UPS & power, cooling & environmental control, rack & containment, fire detection & suppression, DCIM monitoring, structured cabling, physical security & access control.
2. Enterprise Networking — LAN/WAN design & implementation, core/distribution/access switching, wireless LAN & Wi-Fi, structured cabling & fiber backbone, SD-WAN & branch connectivity, network monitoring & performance optimization, testing/documentation/maintenance.
3. Cyber Security Solutions — firewall & perimeter security, endpoint protection & antivirus, email & web security, SIEM, identity & access management (IAM), vulnerability assessment & penetration testing (VAPT), data protection/backup/disaster recovery, security monitoring & incident response.
4. Modern Data Center & Cloud — server infrastructure, storage & backup, virtualization, cloud infrastructure & migration, Microsoft/Linux system administration, data backup/recovery/business continuity, VDI & thin client, system monitoring & support.
5. Smart City Infrastructure & Service Solutions — smart meeting rooms, smart classrooms, smart building management systems, audio-visual & video conferencing, interactive displays & collaboration, smart surveillance & public safety, IT infrastructure support & preventive maintenance.
6. Software Solutions — custom web application development, mobile apps, enterprise software, UI/UX design & front-end, API & system integration, database design & management, business intelligence & automation, maintenance/support/enhancement.

LEADERSHIP TEAM:
- Zenagebriel Fekadu — Chief Operating Officer (COO)
- Sintayehu Getachew — Project Coordinator
- Abrham Yeshingda — Chief Business Development Manager (C-BDM)
- Arsema Tadesse — Pre-Sales Manager
- Organization: CEO → Deputy CEO → Chief Legal Compliance Officer, Chief HR Manager, Chief Corporate Services Officer, Chief Business Development Manager, Chief Operation Officer — with departments for pre-sales (6 solution areas), supply chain, sales & marketing, solution development, infrastructure delivery, and project office (after-sales support & training).

MARKETS & CLIENTS:
- Market segments: Public Sectors; Banking, Financial Services and Insurance (BFSI); Multinational & Telecom.
- Clients include: Ministry of Water and Energy, FDRE Defense Ministry, Ministry of Finance, Ministry of Defense, Office of the Prime Minister, Ethio Telecom, Addis Ababa City Education Bureau, Addis Ababa ITDB, Debre Markos University, Wachamo University, Federal Housing Corporation, Ethiopian News Agency, EKA Kotebe Hospital, Ministry of Trade, Institute of Foreign Affairs, Ethiopian Statistics Service, ECWC, National Archive & Library Agency, CRRSA, Mekdela Amba University, and more.

NOTABLE COMPLETED PROJECTS (27 total):
- Ministry of Water and Energy — data center design, supply, rehabilitation & commissioning (510M ETB, 2026)
- FDRE Defense Ministry — modular data center, enterprise network, cyber security, IP phone & video surveillance (108.5M ETB, 2023)
- Addis Ababa City Education Bureau — STEM education & innovation centers at Gelan Boys and Etege Menen Girls boarding schools (250M ETB, 2026)
- Debre Markos University — enterprise network infrastructure (174.6M ETB, 2026)
- Addis Ababa ITDB — network infrastructure, VSS, data center & video conference room (148.9M ETB, 2026)
- Wachamo University — hyper-converged infrastructure, storage & 410 virtual desktops (90.6M ETB, 2024)
- Ministry of Finance — data backup & storage for the e-government procurement (e-GP) system (98M ETB, 2025)
- Ethio Telecom — fire prevention & protection system at HQ (25M ETB, 2026)

PARTNERS (40+ global industry leaders): Dell, HP, Cisco, Microsoft, Huawei, Oracle, SAP, Palo Alto Networks, Kaspersky, CyberArk, Red Hat, Veeam, APC by Schneider Electric, Vertiv, Canon, Hitachi, Nutanix, Omnissa, Avaya, SolarWinds, ZKTeco, Absen, Hikvision, Dahua, and more.

HOW TO ENGAGE:
- Visitors can use the contact form on the website, email info@iracktech.com, or call +251 111 704 557 / +251 92 015 5779 during working hours.
- iRack offers consultations to choose the right solution tailored to the customer's requirements.
=== END KNOWLEDGE BASE ===`;

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

/* ------------------------------------------------------------------ */
/* Provider 1 — any OpenAI-compatible API (works on Vercel, AWS, etc.) */
/* Configure with environment variables:                               */
/*   AI_API_KEY  — your API key (required for external providers)      */
/*   AI_BASE_URL — e.g. https://generativelanguage.googleapis.com/v1beta/openai  */
/*   AI_MODEL    — e.g. gemini-2.5-flash                               */
/* ------------------------------------------------------------------ */

async function callExternalProvider(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = (
    process.env.AI_BASE_URL ??
    "https://generativelanguage.googleapis.com/v1beta/openai"
  ).replace(/\/+$/, "");
 const model = process.env.AI_MODEL ?? "gemini-1.5-flash";

  if (!apiKey) {
    throw new Error("NO_API_KEY");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 800,
        temperature: 0.4,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`External AI provider error (${res.status}):`, detail.slice(0, 500));
      throw new Error(`PROVIDER_ERROR_${res.status}`);
    }

    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;
    if (!reply || !reply.trim()) {
      throw new Error("EMPTY_REPLY");
    }
    return reply.trim();
  } finally {
    clearTimeout(timeout);
  }
}

/* ------------------------------------------------------------------ */
/* Provider 2 — z-ai-web-dev-sdk (works inside the Z.ai sandbox)       */
/* ------------------------------------------------------------------ */

async function callSandboxProvider(messages: ChatMessage[]): Promise<string> {
  const { default: ZAI } = await import("z-ai-web-dev-sdk");
  const zai = await ZAI.create();

  const response = await zai.chat.completions.create({
    messages: messages as unknown as Parameters<
      typeof zai.chat.completions.create
    >[0]["messages"],
    thinking: { type: "disabled" },
  });

  const reply = response.choices[0]?.message?.content;
  if (!reply) {
    throw new Error("EMPTY_REPLY");
  }
  return reply;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...parsed.data.messages,
    ];

    let reply: string | undefined;

    // Prefer the external provider when an API key is configured
    // (needed on Vercel / AWS / any real hosting), then fall back
    // to the sandbox SDK for the local preview environment.
    if (process.env.AI_API_KEY) {
      try {
        reply = await callExternalProvider(messages);
      } catch (error) {
        console.error("External AI provider failed:", error);
        // fall through to sandbox provider as a last resort
      }
    }

    if (!reply) {
      reply = await callSandboxProvider(messages);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error:
          "The AI assistant is not configured on this server. Add AI_API_KEY (and optionally AI_BASE_URL / AI_MODEL) in your hosting environment variables.",
      },
      { status: 503 }
    );
  }
}
