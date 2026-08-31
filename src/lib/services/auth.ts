/**
 * Auth boundary — placeholder for Clerk (or NextAuth) integration.
 *
 * The app imports `getCurrentUser` / `Role` from here so that adding real
 * authentication later is a drop-in change. Dashboards (student, tutor, admin)
 * should gate on `Role` returned from this module.
 */

export type Role = "student" | "tutor" | "admin" | "guest";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

/** TODO: replace with Clerk's `auth()` / `currentUser()`. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  return null; // unauthenticated by default until Clerk is wired up
}

export const dashboardRoutes: Record<Exclude<Role, "guest">, string> = {
  student: "/dashboard/student",
  tutor: "/dashboard/tutor",
  admin: "/dashboard/admin",
};
