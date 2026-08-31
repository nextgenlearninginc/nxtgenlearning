"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const res = await submitContactMessage(form);
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-secondary/30 bg-secondary/5 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out, {form.name || "friend"}. We'll get back to you
          within one business day.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setForm({ name: "", email: "", message: "" });
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Your name"
          autoComplete="name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          required
          value={form.message}
          onChange={update("message")}
          placeholder="How can we help?"
          rows={5}
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again in a moment.
        </p>
      ) : null}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        We'll only use your name and email to reply to this message. See our{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
