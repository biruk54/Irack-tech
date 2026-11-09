"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Landmark, RadioTower, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { MARKETS, CLIENT_LOGOS } from "@/lib/site-data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  RadioTower,
};

export function Clients() {
  return (
    <section
      id="clients"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-label="Our clients"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Clients"
          title={
            <>
              Trusted by Ethiopia&apos;s{" "}
              <span className="text-gradient">Institutions</span>
            </>
          }
          description="We serve diverse market segments and have built strong customer relationships across regions of Ethiopia — from federal ministries and universities to telecom operators."
        />

        {/* Market segments */}
        <div className="grid gap-5 md:grid-cols-3">
          {MARKETS.map((market, i) => {
            const Icon = ICONS[market.icon] ?? Landmark;
            return (
              <motion.article
                key={market.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.1 * i }}
                whileHover={{ y: -6 }}
                className="card-shine group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
              >
                <span
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-ember/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug">
                  {market.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {market.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {market.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/25"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-ember"
                        aria-hidden="true"
                      />
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* Client logos grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="text-center font-display text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
              A Selection of Our Clients
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {CLIENT_LOGOS.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.03 * i }}
                title={logo.name}
                className="group flex aspect-square items-center justify-center rounded-2xl border border-border/60 bg-card/70 p-3 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={120}
                  className="h-auto max-h-full w-auto max-w-full object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            …and many more ministries, agencies, universities and enterprises
            across Ethiopia.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
