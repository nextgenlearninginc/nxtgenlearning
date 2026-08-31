export const siteConfig = {
  name: "NextGen Learning",
  shortName: "NextGen",
  tagline: "Empowering the Next Generation Through Free Education.",
  description:
    "NextGen Learning is a volunteer-run initiative providing completely free online Math and English tutoring for elementary and middle school students.",
  // TODO: replace with your real domain once purchased. Until then this is
  // set to a placeholder — update after deploying (see README "Hosting").
  url: "https://nextgen-learning.vercel.app",
  ogImage: "/og.png",
  email: "nextgenlearninginc@gmail.com",
  supportEmail: "nextgenlearninginc@gmail.com",
  // Where a concerned student, parent, or volunteer can flag a safety issue.
  safetyEmail: "nextgenlearninginc@gmail.com",
  locale: "en_US",
  // No social accounts exist yet. Add real, verified links here once you
  // actually create these accounts — never link to accounts that don't exist
  // or that aren't yours (this would be a form of impersonation/deception).
  links: {},
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Take Assessment", href: "/assessment" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  programs: [
    { label: "Math Program", href: "/programs#math" },
    { label: "English Program", href: "/programs#english" },
    { label: "Take Assessment", href: "/assessment" },
    { label: "Register", href: "/register" },
  ],
  organization: [
    { label: "About Us", href: "/about" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
