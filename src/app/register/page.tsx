import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { RegistrationForm } from "@/components/forms/registration-form";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register a student for free online Math and English tutoring with NextGen Learning. Your assessment level carries over automatically.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Enrollment"
        title="Register your student"
        description="It takes about five minutes. If you\u2019ve completed the assessment, your level is already filled in for you."
      />
      <section className="pb-24">
        <div className="container">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
