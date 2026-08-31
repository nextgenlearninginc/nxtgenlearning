import { siteConfig } from "@/lib/site";

/**
 * Minimal Resend wrapper used by the API routes in src/app/api/*.
 * ---------------------------------------------------------------------------
 * Requires RESEND_API_KEY in the environment (see .env.example). Free tier:
 * 3,000 emails/month, 100/day, no credit card. Sign up at resend.com.
 *
 * Until you verify your own domain with Resend, `from` MUST stay
 * "onboarding@resend.dev" — Resend rejects unverified sender domains. You can
 * send TO any address (e.g. your Gmail) from day one.
 * ---------------------------------------------------------------------------
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Escape untrusted text before interpolating into an HTML email body. This
 * prevents a malicious form submission from injecting HTML/script content
 * into the email you receive, and from spoofing extra "From:"-style lines. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\r?\n/g, "<br/>");
}

/** Reject absurdly long input so a single field can't be used to build a huge
 * or resource-exhausting email. Adjust per-field as needed. */
export function clamp(value: unknown, max = 4000): string {
  const s = typeof value === "string" ? value : "";
  return s.slice(0, max);
}

/** Very small allow-list style email check — not RFC-perfect, just enough to
 * reject obvious junk before it reaches your inbox. */
export function isPlausibleEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function sendNotificationEmail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No key configured yet — fail loudly in logs but don't crash the
    // request. The route handler decides what the user sees.
    console.error(
      "[email] RESEND_API_KEY is not set. Add it to your environment (see .env.example) to enable real email delivery."
    );
    return { ok: false, error: "Email delivery is not configured yet." };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: [siteConfig.email],
        subject: opts.subject,
        html: opts.html,
        reply_to: opts.replyTo,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[email] Resend API error", res.status, text);
      return { ok: false, error: "Failed to send email." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[email] Unexpected error sending email", err);
    return { ok: false, error: "Failed to send email." };
  }
}

/**
 * Extremely lightweight in-memory rate limit, keyed by IP, to blunt basic
 * spam bursts against these public form endpoints.
 *
 * IMPORTANT: this resets whenever the serverless function cold-starts and
 * does not share state across instances, so it is NOT a real defense against
 * a determined bot. Before real launch, add:
 *   - A bot filter: Cloudflare Turnstile or hCaptcha (both free)
 *   - A durable rate limiter: Vercel KV / Upstash Redis (free tier)
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
