import { NextRequest, NextResponse } from "next/server";

import {
  checkRateLimit,
  clamp,
  escapeHtml,
  isPlausibleEmail,
  sendNotificationEmail,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`contact:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const name = clamp(body.name, 200);
  const email = clamp(body.email, 254);
  const message = clamp(body.message, 5000);
  // Honeypot: a hidden field real users never fill in. If it's non-empty,
  // silently pretend success so the bot doesn't learn anything.
  const honeypot = clamp(body.company, 200);

  if (!name || !message || !isPlausibleEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in a valid name, email, and message." },
      { status: 400 }
    );
  }
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendNotificationEmail({
    subject: `New contact message from ${name}`,
    replyTo: email,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message)}</p>
    `,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
