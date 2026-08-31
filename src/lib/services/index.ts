import type { RegistrationPayload, VolunteerPayload } from "@/types";

/**
 * Service layer boundary.
 * ---------------------------------------------------------------------------
 * Every function here calls a real Next.js API route (src/app/api/*), which
 * sends an email via Resend to the address in src/lib/site.ts. The rest of
 * the app only depends on these signatures, so swapping in a full database
 * later (Supabase/Firebase) means editing the API routes, not the UI.
 *
 * Requires RESEND_API_KEY to be set in the environment — see .env.example
 * and the README "Email delivery" section for the 2-minute setup.
 * ---------------------------------------------------------------------------
 */

export type ServiceResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

async function post<T>(
  url: string,
  payload: unknown
): Promise<ServiceResult<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
      return {
        ok: false,
        error: json?.error || "Something went wrong. Please try again.",
      };
    }
    return { ok: true, data: json.data as T };
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

export async function submitRegistration(
  payload: RegistrationPayload
): Promise<ServiceResult<{ id: string }>> {
  return post<{ id: string }>("/api/register", payload);
}

export async function submitVolunteer(
  payload: VolunteerPayload & { email: string }
): Promise<ServiceResult<{ id: string }>> {
  return post<{ id: string }>("/api/volunteer", payload);
}

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<ServiceResult> {
  return post("/api/contact", payload);
}
