import { NextRequest, NextResponse } from "next/server";

import {
  checkRateLimit,
  clamp,
  escapeHtml,
  isPlausibleEmail,
  sendNotificationEmail,
} from "@/lib/email";
import type { VolunteerPayload } from "@/types";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`volunteer:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = (await req.json().catch(() => null)) as
    | (Partial<VolunteerPayload> & { email?: string })
    | null;
  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const p: VolunteerPayload = {
    fullName: clamp(body.fullName, 200),
    age: clamp(body.age, 10),
    school: clamp(body.school, 200),
    university: clamp(body.university, 200),
    grade: clamp(body.grade, 50),
    subjects: Array.isArray(body.subjects)
      ? body.subjects.slice(0, 10).map((s) => clamp(s, 50))
      : [],
    experience: clamp(body.experience, 3000),
    availability: clamp(body.availability, 500),
    motivation: clamp(body.motivation, 3000),
    resumeFileName: clamp(body.resumeFileName, 200),
  };
  const email = clamp(body.email, 254);

  if (
    !p.fullName ||
    !isPlausibleEmail(email) ||
    !p.motivation ||
    p.subjects.length === 0
  ) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  const id = `vol_${Date.now()}`;
  const row = (label: string, value: string) =>
    value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

  const result = await sendNotificationEmail({
    subject: `New volunteer application: ${p.fullName}`,
    replyTo: email,
    html: `
      <h2>New volunteer application</h2>
      ${row("Reference", id)}
      ${row("Name", p.fullName)}
      ${row("Email", email)}
      ${row("Age", p.age)}
      ${row("High school", p.school)}
      ${row("University", p.university)}
      ${row("Grade/Year", p.grade)}
      ${row("Subjects", p.subjects.join(", "))}
      ${row("Experience", p.experience)}
      ${row("Availability", p.availability)}
      ${row("Motivation", p.motivation)}
      ${row("Resume filename (not uploaded — placeholder)", p.resumeFileName)}
      <p style="color:#64748b;font-size:12px;margin-top:16px;">
        Note: if the applicant's age suggests they are under 18, confirm
        parent/guardian awareness before onboarding, per your volunteer policy.
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
