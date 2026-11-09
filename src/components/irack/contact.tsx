"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "./section-heading";
import { SITE, SOLUTIONS } from "@/lib/site-data";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more (min. 10 characters)"),
});

type ContactForm = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: SITE.address,
    href: "https://maps.google.com/?q=Piyassa+Wastna+Building+Addis+Ababa+Ethiopia",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: `${SITE.phone} · ${SITE.phoneAlt}`,
    href: `tel:${SITE.phoneRaw.replace(/\+/g, "")}`,
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: SITE.hours,
    href: undefined,
  },
];

export function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const [subject, setSubject] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Failed to send message");
      }
      setSubmitted(true);
      reset();
      setSubject("");
      toast({
        title: "Message sent successfully!",
        description: "Our team will get back to you within one business day.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error
            ? error.message
            : "Please try again or email us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-label="Contact us"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title={
            <>
              Let&apos;s Start a <span className="text-gradient">Conversation</span>
            </>
          }
          description="Have a project in mind, a challenge to solve, or just want to say hello? Drop us a message — we respond within one business day."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon;
                const Wrapper = info.href ? "a" : "div";
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <Wrapper
                      {...(info.href
                        ? { href: info.href, target: info.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" }
                        : {})}
                      className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 to-ember/10 text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {info.label}
                        </p>
                        <p className="mt-1 text-sm font-medium leading-relaxed">
                          {info.value}
                        </p>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 rounded-2xl border border-ember/30 bg-gradient-to-br from-ember/10 to-transparent p-5"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-ember" aria-hidden="true" />
                <p className="text-sm font-semibold">
                  Need an instant answer?
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Try our AI assistant — the chat bubble in the bottom-right
                corner knows all about iRack&apos;s solutions and services.
              </p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="card-shine rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary"
                  >
                    <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-bold">
                    Message Received!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thank you for reaching out. Our team will get back to you
                    within one business day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-ember">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g. Abebe Kebede"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        className="rounded-xl bg-background/60"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-ember">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        className="rounded-xl bg-background/60"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+251 ..."
                        autoComplete="tel"
                        className="rounded-xl bg-background/60"
                        {...register("phone")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject-select">I&apos;m interested in</Label>
                      <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger id="subject-select" className="rounded-xl bg-background/60 w-full">
                          <SelectValue placeholder="Select a solution" />
                        </SelectTrigger>
                        <SelectContent>
                          {SOLUTIONS.map((s) => (
                            <SelectItem key={s.id} value={s.title}>
                              {s.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="Other">Other / General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Your Message <span className="text-ember">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, challenge, or question..."
                      rows={5}
                      aria-invalid={!!errors.message}
                      className="resize-none rounded-xl bg-background/60"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl bg-ember text-base font-semibold text-accent-foreground shadow-lg shadow-ember/25 hover:brightness-110 border-none sm:w-auto sm:px-10"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
