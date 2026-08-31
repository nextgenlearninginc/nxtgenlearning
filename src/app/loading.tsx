import { Skeleton } from "@/components/ui/skeleton";

/** Global route-level loading UI (App Router). */
export default function Loading() {
  return (
    <div className="container flex flex-col gap-8 py-24">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5">
        <Skeleton className="h-7 w-40 rounded-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-4/5" />
        <Skeleton className="h-5 w-3/4" />
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
