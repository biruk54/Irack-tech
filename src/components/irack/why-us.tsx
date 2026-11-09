"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, BadgeCheck, Award } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { WHY_US } from "@/lib/site-data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Zap,
  BadgeCheck,
  Award,
};

export function WhyUs() {
  return (
    <section
      className="relative overflow-hidden border-y border-border/40 bg-muted/30 py-20 sm:py-28"
      aria-label="Why choose iRack"
    >
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/8 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              High Quality Services,{" "}
              <span className="text-gradient">Highly Skilled Expertise</span>
            </>
          }
          description="We deliver high quality services through highly skilled technical expertise. Our experienced senior team collaborates closely with you throughout the engagement."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Layers;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.08 * i }}
                whileHover={{ y: -6 }}
                className="card-shine group relative rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
              >
                <span className="absolute top-5 right-5 font-display text-4xl font-bold text-primary/10 transition-colors group-hover:text-primary/20" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-ember/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
