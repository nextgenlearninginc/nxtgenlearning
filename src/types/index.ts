export type Subject = "math" | "english";

export type AssessmentOption = {
  id: string;
  text: string;
};

export type AssessmentQuestion = {
  id: number;
  prompt: string;
  options: AssessmentOption[];
  /** id of the correct option */
  correct: string;
  /** 1 (easiest) .. 5 (hardest) — questions ramp up in difficulty */
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export type LevelCode =
  | "M1"
  | "M2"
  | "M3"
  | "M4"
  | "M5"
  | "E1"
  | "E2"
  | "E3"
  | "E4"
  | "E5";

export type LevelInfo = {
  code: LevelCode;
  title: string;
  summary: string;
  /** topics covered at this level */
  focus: string[];
};

export type AssessmentResult = {
  subject: Subject;
  score: number;
  total: number;
  level: LevelInfo;
};

/**
 * Payload shape the signup form produces — mirrors a future DB row.
 * Intentionally minimal: just enough to get a family in the door. Anything
 * else (goals, availability, subject preference, assessment level, etc.) is
 * collected after signup or at the first lesson — see the confirmation
 * screen in registration-form.tsx.
 */
export type RegistrationPayload = {
  parentName: string;
  email: string;
  studentFirstName: string;
  studentGrade: string;
  agreed: boolean;
};

export type VolunteerPayload = {
  fullName: string;
  age: string;
  school: string;
  university: string;
  grade: string;
  subjects: string[];
  experience: string;
  availability: string;
  motivation: string;
  resumeFileName: string;
};
