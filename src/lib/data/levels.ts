import type { LevelInfo, Subject } from "@/types";

export const mathLevels: LevelInfo[] = [
  {
    code: "M1",
    title: "Basic Arithmetic",
    summary:
      "You're building a strong foundation with whole numbers. We'll focus on confident addition, subtraction, multiplication, and division.",
    focus: ["Place value", "Addition & subtraction", "Times tables", "Word problems"],
  },
  {
    code: "M2",
    title: "Fractions & Decimals",
    summary:
      "You're ready to work with parts of a whole. We'll build fluency with fractions, decimals, and how they connect.",
    focus: ["Equivalent fractions", "Adding fractions", "Decimals", "Percentages"],
  },
  {
    code: "M3",
    title: "Pre-Algebra",
    summary:
      "You're bridging into algebraic thinking. We'll cover ratios, integers, and your first equations with variables.",
    focus: ["Integers", "Ratios & proportions", "Simple equations", "Order of operations"],
  },
  {
    code: "M4",
    title: "Algebra",
    summary:
      "You're comfortable with variables and ready for real algebra — solving, graphing, and reasoning with expressions.",
    focus: ["Linear equations", "Inequalities", "Graphing lines", "Systems of equations"],
  },
  {
    code: "M5",
    title: "Advanced Algebra",
    summary:
      "You're operating at a high level. We'll stretch into quadratics, functions, and multi-step problem solving.",
    focus: ["Quadratics", "Functions", "Exponents & roots", "Advanced word problems"],
  },
];

export const englishLevels: LevelInfo[] = [
  {
    code: "E1",
    title: "Reading Basics",
    summary:
      "You're strengthening core reading skills. We'll focus on phonics, sight words, and reading with confidence.",
    focus: ["Phonics", "Sight words", "Sentence basics", "Reading aloud"],
  },
  {
    code: "E2",
    title: "Grammar",
    summary:
      "You read well and are ready to sharpen the mechanics — parts of speech, punctuation, and clean sentences.",
    focus: ["Parts of speech", "Punctuation", "Subject–verb agreement", "Tenses"],
  },
  {
    code: "E3",
    title: "Reading Comprehension",
    summary:
      "You're ready to read for meaning — finding main ideas, drawing inferences, and understanding an author's purpose.",
    focus: ["Main idea", "Inference", "Context clues", "Author's purpose"],
  },
  {
    code: "E4",
    title: "Writing",
    summary:
      "You understand grammar and comprehension — now we build clear, structured paragraphs and short essays.",
    focus: ["Paragraph structure", "Topic sentences", "Transitions", "Editing"],
  },
  {
    code: "E5",
    title: "Advanced Writing",
    summary:
      "You're a strong writer ready for craft — thesis-driven essays, evidence, and a confident personal voice.",
    focus: ["Thesis statements", "Evidence & analysis", "Essay structure", "Voice & style"],
  },
];

export function getLevelsForSubject(subject: Subject): LevelInfo[] {
  return subject === "math" ? mathLevels : englishLevels;
}

/**
 * Map a raw score (out of 15) onto one of five levels.
 * Higher scores unlock higher levels, so the ramp mirrors the question order.
 */
export function scoreToLevel(subject: Subject, score: number): LevelInfo {
  const levels = getLevelsForSubject(subject);
  // 0-3 -> L1, 4-6 -> L2, 7-9 -> L3, 10-12 -> L4, 13-15 -> L5
  let index = Math.floor(score / 3);
  if (index > 4) index = 4;
  return levels[index];
}

export function findLevelByCode(code: string): LevelInfo | undefined {
  return [...mathLevels, ...englishLevels].find((l) => l.code === code);
}
