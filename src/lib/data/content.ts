import {
  BookOpen,
  Calculator,
  HandHeart,
  HeartHandshake,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

// IMPORTANT — LEGAL: this array is intentionally EMPTY.
// The previous version shipped fabricated names, quotes, and initials
// attributed to fake "parents," "students," and "volunteers." Presenting
// invented endorsements as real social proof is a textbook deceptive
// advertising / fake-testimonial risk (FTC endorsement guidelines and
// equivalent consumer-protection rules elsewhere).
// Do not add an entry here unless: (1) a real person actually said it,
// (2) they gave informed, specific consent to publish their name/quote
// publicly, and (3) if the person is a minor, a parent/guardian consented.
// Until then, the homepage simply does not render a testimonials section.
export const testimonials: Testimonial[] = [];

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "Is tutoring really free?",
    answer:
      "Yes — 100% free, always. NextGen Learning is a nonprofit funded by grants and donations. There are no fees, no subscriptions, and no hidden costs for any student or family.",
  },
  {
    question: "Who can join?",
    answer:
      "Elementary and middle school students (roughly ages 6–14) are welcome to join our Math and English programs. Students of any background or ability level can enroll — the placement assessment helps us meet each student exactly where they are.",
  },
  {
    question: "How are students grouped?",
    answer:
      "Students are grouped by skill level, not by age or grade. After the placement assessment, each student receives a level (M1–M5 for Math, E1–E5 for English) and joins a small group of peers working on the same material.",
  },
  {
    question: "How long are sessions?",
    answer:
      "Sessions run about 45–60 minutes and take place once a week. Students can choose their preferred days during registration, and we do our best to match schedules and time zones.",
  },
  {
    question: "What platform is used?",
    answer:
      "Sessions are held online over secure video calls with a shared whiteboard. Students only need a device with a camera, a stable internet connection, and a quiet space. We'll send setup instructions after registration.",
  },
  {
    question: "How do I volunteer?",
    answer:
      "High school and university students can apply through our Volunteer page. After a short application and orientation, you'll be matched with students in your chosen subjectand receive lesson resources and support along the way.",
  },
];

export type ProgramTopic = { title: string; description: string };

export type Program = {
  id: "math" | "english";
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  topics: string[];
  levelPrefix: "M" | "E";
};

export const programs: Program[] = [
  {
    id: "math",
    name: "Math Program",
    icon: Calculator,
    tagline: "From counting to quadratics.",
    description:
      "Structured, level-based math built to close gaps and build genuine confidence — one concept at a time.",
    topics: [
      "Arithmetic",
      "Fractions",
      "Decimals",
      "Pre-Algebra",
      "Algebra",
      "Geometry",
    ],
    levelPrefix: "M",
  },
  {
    id: "english",
    name: "English Program",
    icon: BookOpen,
    tagline: "From first words to first essays.",
    description:
      "Reading, writing, and language skills taught in small groups so every student is heard and supported.",
    topics: [
      "Reading",
      "Grammar",
      "Vocabulary",
      "Writing",
      "Reading Comprehension",
      "Essay Skills",
    ],
    levelPrefix: "E",
  },
];

export type ValueItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const coreValues: ValueItem[] = [
  {
    title: "Accessibility",
    description:
      "Great education shouldn't depend on a family's budget. Everything we offer is free, online, and open to all.",
    icon: HeartHandshake,
  },
  {
    title: "Community",
    description:
      "Learning happens best together. Small groups build belonging, friendship, and shared momentum.",
    icon: Users,
  },
  {
    title: "Growth",
    description:
      "We meet students where they are and help them climb — celebrating progress at every level.",
    icon: Sparkles,
  },
  {
    title: "Confidence",
    description:
      "Real confidence comes from real understanding. We teach the 'why', not just the answer.",
    icon: BookOpen,
  },
  {
    title: "Volunteerism",
    description:
      "Our tutors give their time because they believe in the mission — and grow as leaders in return.",
    icon: HandHeart,
  },
];

export type Stat = { value: number; suffix: string; label: string };

// IMPORTANT — LEGAL: do not put invented numbers here (e.g. "500+ students
// helped") before they are true and you can back them up. Advertising made-up
// metrics is a deceptive-advertising risk. The values below are things that
// are true by design on day one, not counts that need evidence. Replace with
// real, verifiable figures once you have a track record.
export const stats: Stat[] = [
  { value: 100, suffix: "%", label: "Free, Always" },
  { value: 5, suffix: "", label: "Levels Per Subject" },
  { value: 2, suffix: "", label: "Subjects: Math & English" },
  { value: 1, suffix: ":1", label: "Small-Group Focus" },
];

export type Step = { title: string; description: string };

export const howItWorks: Step[] = [
  {
    title: "Take a Placement Assessment",
    description:
      "A short, friendly quiz in Math or English tells us exactly where your student is thriving and where they need support.",
  },
  {
    title: "Receive Your Learning Level",
    description:
      "We assign one of five levels so your student joins a group working on just-right material — never too easy, never overwhelming.",
  },
  {
    title: "Register",
    description:
      "Complete a quick registration. Your assessment level carries over automatically, so you're matched in minutes.",
  },
  {
    title: "Attend Weekly Online Sessions",
    description:
      "Meet your volunteer tutor and small group each week to learn, practice, and grow — all from home, all for free.",
  },
];
