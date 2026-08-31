# Services layer

This directory is the single integration boundary for the app. UI never talks
to a backend directly — it calls the typed functions here. To go live:

| Concern            | Provider           | Where to wire it up            |
| ------------------ | ------------------ | ------------------------------ |
| Authentication     | Clerk              | `auth.ts`                      |
| Database           | Supabase           | `index.ts` submit* functions   |
| Transactional mail | Resend             | `index.ts` (send* helpers)     |
| Scheduling         | Google Calendar    | add `calendar.ts`              |
| File storage       | Supabase Storage   | `index.ts` (resume upload)     |

## Planned dashboards (not yet implemented)

- `/dashboard/student`  — upcoming sessions, level progress, materials
- `/dashboard/tutor`    — assigned groups, attendance, logged hours
- `/dashboard/admin`    — enrollment, volunteer hours, attendance reports

Gate each route on `Role` from `auth.ts`.
