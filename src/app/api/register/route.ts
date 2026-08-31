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
    studentFirstName: clamp(body.studentFirstName, 100),
    studentLastName: clamp(body.studentLastName, 100),
    age: clamp(body.age, 10),
    grade: clamp(body.grade, 50),
    guardianName: clamp(body.guardianName, 200),
    guardianEmail: clamp(body.guardianEmail, 254),
    studentEmail: clamp(body.studentEmail, 254),
    subject: (body.subject as RegistrationPayload["subject"]) || "math",
    assessmentLevel: clamp(body.assessmentLevel, 20),
    country: clamp(body.country, 100),
    region: clamp(body.region, 100),
    timezone: clamp(body.timezone, 50),
    preferredDays: Array.isArray(body.preferredDays)
      ? body.preferredDays.slice(0, 7).map((d) => clamp(d, 20))
      : [],
    emergencyContact: clamp(body.emergencyContact, 200),
    notes: clamp(body.notes, 2000),
    agreed: Boolean(body.agreed),
  };

  // Guardian consent is a hard requirement — this program serves minors.
  if (!p.agreed) {
    return NextResponse.json(
      {
        ok: false,
        error: "A parent or guardian must agree to the terms to register.",
      },
      { status: 400 }
    );
  }
  if (
    !p.studentFirstName ||
    !p.studentLastName ||
    !p.guardianName ||
    !isPlausibleEmail(p.guardianEmail)
  ) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  const id = `reg_${Date.now()}`;
  const row = (label: string, value: string) =>
    value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

  const result = await sendNotificationEmail({
    subject: `New registration: ${p.studentFirstName} ${p.studentLastName}`,
    replyTo: isPlausibleEmail(p.guardianEmail) ? p.guardianEmail : undefined,
    html: `
      <h2>New student registration</h2>
      ${row("Reference", id)}
      ${row("Student name", `${p.studentFirstName} ${p.studentLastName}`)}
      ${row("Age", p.age)}
      ${row("Grade", p.grade)}
      ${row("Guardian name", p.guardianName)}
      ${row("Guardian email", p.guardianEmail)}
      ${row("Student email", p.studentEmail)}
      ${row("Subject", p.subject)}
      ${row("Assessment level", p.assessmentLevel)}
      ${row("Country", p.country)}
      ${row("Region", p.region)}
      ${row("Timezone", p.timezone)}
      ${row("Preferred days", p.preferredDays.join(", "))}
      ${row("Emergency contact", p.emergencyContact)}
      ${row("Notes", p.notes)}
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
