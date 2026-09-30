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
      "Yes — 100% free, always. NextGen Learning is volunteer-run. There are no fees, no subscriptions, and no hidden costs for any student or family.",
  },
  {
    question: "Who can join?",
    answer:
      "Elementary and middle school students (roughly ages 6–14) are welcome to join our Math and English programs. Students of any background or ability level can enroll — just sign up and we'll take it from there.",
  },
  {
    question: "How are students grouped?",
    answer:
      "Students are grouped by skill level, not by age or grade (M1–M5 for Math, E1–E5 for English). We'll help find the right level after you sign up. If you'd like, you can also try our optional free practice check any time for a sense of where your student stands.",
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
      "High school and university students can apply through our Volunteer page. After a short application and orientation, you'll be matched with students in your chosen subject and receive lesson resources and support along the way.",
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
    title: "Sign Up",
    description:
      "A quick, one-minute signup — just your name, email, and your student's grade. No cost, ever.",
  },
  {
    title: "We Follow Up",
    description:
      "We'll reach out within 1–2 days to learn a bit more and find the right volunteer tutor for your student.",
  },
  {
    title: "Pick a Time",
    description:
      "Choose a time that works for your family's schedule for the first lesson.",
  },
  {
    title: "Attend Weekly Online Sessions",
    description:
      "Meet your volunteer tutor each week to learn, practice, and grow — all from home, all for free.",
  },
];
