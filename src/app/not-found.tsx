import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LevelLadder } from "@/components/shared/level-ladder";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-soft-radial" />
      <div className="container relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-display text-7xl font-black tracking-tight text-gradient sm:text-8xl">
          404
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          This page took a different path.
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you're looking for isn't here — but your learning journey
          doesn't have to stop. Let's get you back on track.
        </p>

        <div className="mt-8 w-full max-w-sm">
          <LevelLadder active={2} />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gradient" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/assessment">
              <Compass className="h-4 w-4" />
              Take an assessment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
