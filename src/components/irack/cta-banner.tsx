"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

export function CTABanner() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      aria-label="Call to action"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-gradient-to-br from-primary/15 via-card to-ember/15 p-10 text-center sm:p-16"
        >
          <div
            className="absolute inset-0 bg-grid bg-grid-fade opacity-50"
            aria-hidden="true"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[30rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
              Ready When You Are
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s Build Your{" "}
              <span className="text-gradient">Technology Future</span>{" "}
              Together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Smart solutions for a stronger future. Get in touch with our
              experts today for a free consultation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-ember px-8 text-base font-semibold text-accent-foreground shadow-xl shadow-ember/25 hover:brightness-110 border-none"
              >
                <a href="#contact">
                  Get a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-8 text-base font-semibold backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10"
              >
                <a href={`tel:${SITE.phoneRaw.replace(/\+/g, "")}`}>
                  Call {SITE.phone}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
