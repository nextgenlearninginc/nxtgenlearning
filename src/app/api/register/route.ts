import { NextRequest, NextResponse } from "next/server";

import {
  checkRateLimit,
  clamp,
  escapeHtml,
  isPlausibleEmail,
  sendNotificationEmail,
} from "@/lib/email";
import type { RegistrationPayload } from "@/types";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`register:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = (await req.json().catch(() => null)) as
    | Partial<RegistrationPayload>
    | null;
  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const p: RegistrationPayload = {
    parentName: clamp(body.parentName, 200),
    email: clamp(body.email, 254),
    studentFirstName: clamp(body.studentFirstName, 100),
    studentGrade: clamp(body.studentGrade, 50),
    agreed: Boolean(body.agreed),
  };

  // Guardian consent is a hard requirement — this program serves minors.
  if (!p.agreed) {
    return NextResponse.json(
      {
        ok: false,
        error: "A parent or guardian must agree to the terms to sign up.",
      },
      { status: 400 }
    );
  }
  if (!p.parentName || !p.studentFirstName || !p.studentGrade || !isPlausibleEmail(p.email)) {
    return NextResponse.json(
      { ok: false, error: "Please complete all fields with a valid email." },
      { status: 400 }
    );
  }

  const id = `reg_${Date.now()}`;
  const row = (label: string, value: string) =>
    value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

  const result = await sendNotificationEmail({
    subject: `New signup: ${p.studentFirstName} (${p.studentGrade})`,
    replyTo: isPlausibleEmail(p.email) ? p.email : undefined,
    html: `
      <h2>New student signup</h2>
      ${row("Reference", id)}
      ${row("Parent/guardian name", p.parentName)}
      ${row("Parent/guardian email", p.email)}
      ${row("Student first name", p.studentFirstName)}
      ${row("Student grade", p.studentGrade)}
      <p style="color:#64748b;font-size:12px;margin-top:16px;">
        Subject preference, availability, and other details are collected
        after signup or at the first lesson — follow up with the family
        directly to gather those and schedule.
      </p>
    `,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true, data: { id } });
}
