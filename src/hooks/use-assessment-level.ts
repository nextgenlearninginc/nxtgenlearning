"use client";

import * as React from "react";

const STORAGE_KEY = "ngl:assessment-level";

/**
 * Persists the assessment level so it can carry over into the registration
 * form. Uses localStorage today; swap for a server/session store when auth
 * (Clerk) and a database (Supabase) are added.
 */
export function useAssessmentLevel() {
  const [level, setLevelState] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setLevelState(stored);
    } catch {
      // localStorage unavailable — ignore, form still works manually.
    }
    setReady(true);
  }, []);

  const setLevel = React.useCallback((value: string) => {
    setLevelState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* no-op */
    }
  }, []);

  const clearLevel = React.useCallback(() => {
    setLevelState(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* no-op */
    }
  }, []);

  return { level, setLevel, clearLevel, ready };
}
