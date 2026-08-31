import type { AssessmentQuestion } from "@/types";

/** 15 questions ramping from reading basics to advanced writing. */
export const englishQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    difficulty: 1,
    prompt: "Which word rhymes with 'cat'?",
    options: [
      { id: "a", text: "car" },
      { id: "b", text: "hat" },
      { id: "c", text: "cup" },
      { id: "d", text: "can" },
    ],
    correct: "b",
  },
  {
    id: 2,
    difficulty: 1,
    prompt: "Which word is a noun?",
    options: [
      { id: "a", text: "run" },
      { id: "b", text: "happy" },
      { id: "c", text: "dog" },
      { id: "d", text: "quickly" },
    ],
    correct: "c",
  },
  {
    id: 3,
    difficulty: 1,
    prompt: "Choose the correctly spelled word.",
    options: [
      { id: "a", text: "freind" },
      { id: "b", text: "friend" },
      { id: "c", text: "frend" },
      { id: "d", text: "friynd" },
    ],
    correct: "b",
  },
  {
    id: 4,
    difficulty: 2,
    prompt: "Which sentence is punctuated correctly?",
    options: [
      { id: "a", text: "wheres my book" },
      { id: "b", text: "Where's my book?" },
      { id: "c", text: "Where's my book" },
      { id: "d", text: "where's my book." },
    ],
    correct: "b",
  },
  {
    id: 5,
    difficulty: 2,
    prompt: "Choose the correct verb: The dogs ___ in the yard.",
    options: [
      { id: "a", text: "plays" },
      { id: "b", text: "playing" },
      { id: "c", text: "play" },
      { id: "d", text: "is playing" },
    ],
    correct: "c",
  },
  {
    id: 6,
    difficulty: 2,
    prompt: "What is the past tense of 'run'?",
    options: [
      { id: "a", text: "runned" },
      { id: "b", text: "running" },
      { id: "c", text: "ran" },
      { id: "d", text: "runs" },
    ],
    correct: "c",
  },
  {
    id: 7,
    difficulty: 3,
    prompt:
      "Read: 'The sky darkened and thunder rumbled in the distance.' What is most likely about to happen?",
    options: [
      { id: "a", text: "A sunny picnic" },
      { id: "b", text: "A rainstorm" },
      { id: "c", text: "A snowfall" },
      { id: "d", text: "A rainbow" },
    ],
    correct: "b",
  },
  {
    id: 8,
    difficulty: 3,
    prompt:
      "In 'The ancient bridge was frail,' what does 'frail' most nearly mean?",
    options: [
      { id: "a", text: "colorful" },
      { id: "b", text: "weak" },
      { id: "c", text: "wide" },
      { id: "d", text: "modern" },
    ],
    correct: "b",
  },
  {
    id: 9,
    difficulty: 3,
    prompt:
      "A paragraph mainly describes how bees help flowers grow. What is its main idea?",
    options: [
      { id: "a", text: "Bees can sting" },
      { id: "b", text: "Flowers are colorful" },
      { id: "c", text: "Bees help plants by pollinating" },
      { id: "d", text: "Honey is sweet" },
    ],
    correct: "c",
  },
  {
    id: 10,
    difficulty: 4,
    prompt: "Which sentence has a clear topic sentence for a paragraph about recycling?",
    options: [
      { id: "a", text: "I like blue bins." },
      { id: "b", text: "Recycling helps our community in three important ways." },
      { id: "c", text: "Yesterday it rained a lot." },
      { id: "d", text: "Then we went home." },
    ],
    correct: "b",
  },
  {
    id: 11,
    difficulty: 4,
    prompt: "Which transition word best shows contrast?",
    options: [
      { id: "a", text: "therefore" },
      { id: "b", text: "however" },
      { id: "c", text: "also" },
      { id: "d", text: "finally" },
    ],
    correct: "b",
  },
  {
    id: 12,
    difficulty: 4,
    prompt: "Choose the sentence with correct parallel structure.",
    options: [
      { id: "a", text: "She likes reading, to write, and jogging." },
      { id: "b", text: "She likes reading, writing, and jogging." },
      { id: "c", text: "She likes to read, writing, and jogs." },
      { id: "d", text: "She likes read, write, and jog." },
    ],
    correct: "b",
  },
  {
    id: 13,
    difficulty: 5,
    prompt: "Which is the strongest thesis statement for an essay?",
    options: [
      { id: "a", text: "This essay is about school uniforms." },
      { id: "b", text: "School uniforms are a topic people talk about." },
      {
        id: "c",
        text: "Schools should require uniforms because they reduce distraction and promote equality.",
      },
      { id: "d", text: "I don't like uniforms very much." },
    ],
    correct: "c",
  },
  {
    id: 14,
    difficulty: 5,
    prompt:
      "Which sentence uses evidence to support a claim rather than just stating an opinion?",
    options: [
      { id: "a", text: "Reading is the best hobby ever." },
      {
        id: "b",
        text: "Students who read daily scored 20% higher on vocabulary tests.",
      },
      { id: "c", text: "Everyone should read more books." },
      { id: "d", text: "Books are really interesting." },
    ],
    correct: "b",
  },
  {
    id: 15,
    difficulty: 5,
    prompt:
      "Which revision best improves this sentence: 'The thing was very big and had a lot of stuff in it.'",
    options: [
      { id: "a", text: "The thing was really big with lots of stuff." },
      { id: "b", text: "The warehouse was enormous, packed with crates and machinery." },
      { id: "c", text: "It was big and full." },
      { id: "d", text: "The big thing had many things inside." },
    ],
    correct: "b",
  },
];
