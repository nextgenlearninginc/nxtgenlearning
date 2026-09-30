import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { RegistrationForm } from "@/components/forms/registration-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up for free online Math and English tutoring with NextGen Learning. Takes less than a minute.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Sign up your student"
        description="Just a few quick details to get started — takes less than a minute. We'll follow up to schedule your first lesson and learn more then."
      />
      <section className="pb-24">
        <div className="container">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
