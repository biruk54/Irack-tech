"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function PartnerBadge({
  name,
  tagline,
  src,
}: {
  name: string;
  tagline: string;
  src: string | null;
}) {
  return (
    <div className="mx-3 flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10">
      {src ? (
        <span className="flex h-10 w-16 shrink-0 items-center justify-center">
          <Image
            src={src}
            alt={`${name} logo`}
            width={64}
            height={40}
            loading="eager"
            style={{ width: "auto", height: "auto" }}
            className="max-h-10 max-w-16 object-contain opacity-80"
          />
        </span>
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-ember/10 font-display text-sm font-bold text-primary">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="flex flex-col">
        <span className="font-display text-sm font-semibold tracking-wide">
          {name}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {tagline}
        </span>
      </span>
    </div>
  );
}

export function PartnersMarquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...PARTNERS, ...PARTNERS];
  return (
    <div className="relative marquee-paused">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
        aria-hidden="true"
      />
      <div className="overflow-hidden py-2">
        <div
          className={cn(
            "flex w-max",
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          )}
        >
          {doubled.map((p, i) => (
            <PartnerBadge
              key={`${p.name}-${i}`}
              name={p.name}
              tagline={p.tagline}
              src={p.src}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section
      className="relative border-y border-border/40 bg-muted/30 py-10"
      aria-label="Our global technology partners"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Partnered with Top Global Industry Leaders
        </p>
      </motion.div>
      <PartnersMarquee />
    </section>
  );
}
