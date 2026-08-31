import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBand } from "@/components/shared/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CtaBand />
    </>
  );
}
