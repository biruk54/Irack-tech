"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Award,
  TrendingUp,
  Target,
  Eye,
  Users,
  ShieldCheck,
  Handshake,
  Lightbulb,
  Leaf,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Counter } from "./counter";
import {
  STORY_MILESTONES,
  MISSION,
  VISION,
  CORE_VALUES,
  REVENUE_GROWTH,
} from "@/lib/site-data";

const VALUE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  ShieldCheck,
  Handshake,
  Award,
  Lightbulb,
  Leaf,
};

const highlights = [
  "Established in 2014 G.C. in Addis Ababa, Ethiopia",
  "One of Ethiopia's leading IT solution providers",
  "Specialized turnkey technology solutions",
  "Hardware, software, infrastructure & enterprise systems",
];

/* Simple animated bar chart of annual turnover growth */
function RevenueChart() {
  const max = Math.max(...REVENUE_GROWTH.points.map((p) => p.value));
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="card-shine mt-6 overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold sm:text-2xl">
            Annual Turnover Growth
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Revenue trend across five consecutive years (ETB)
          </p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="font-display text-2xl font-bold text-primary">
              {REVENUE_GROWTH.growth}
            </p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Overall Growth
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-ember">
              {REVENUE_GROWTH.cagr}
            </p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              CAGR
            </p>
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="mt-8 flex h-44 items-end gap-3 sm:gap-6" role="img" aria-label="Bar chart of annual turnover from 65.7 million ETB in 2020/21 to 527 million ETB in 2024/25">
        {REVENUE_GROWTH.points.map((p, i) => (
          <div key={p.year} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              {p.label}
            </span>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(p.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full rounded-t-xl ${
                i === REVENUE_GROWTH.points.length - 1
                  ? "bg-gradient-to-t from-ember/60 to-ember"
                  : "bg-gradient-to-t from-primary/50 to-primary/80"
              }`}
              style={{ minHeight: 8 }}
            />
            <span className="text-[11px] text-muted-foreground">{p.year}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/50 pt-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
          Average annual turnover:{" "}
          <strong className="text-foreground">{REVENUE_GROWTH.average}</strong>
        </span>
        <span className="inline-flex items-center gap-2">
          <Award className="h-4 w-4 text-ember" aria-hidden="true" />
          Revenue multiple:{" "}
          <strong className="text-foreground">{REVENUE_GROWTH.multiple}</strong>
        </span>
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28" aria-label="About iRack">
      <div
        className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 via-transparent to-ember/20 opacity-60 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
              <Image
                src="/images/team-main.png"
                alt="The iRack IT Solutions team at the office in Addis Ababa"
                width={1024}
                height={766}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                priority={false}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-border/60 bg-card/90 p-4 shadow-xl backdrop-blur-md sm:-right-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember/15 text-ember">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold leading-none">
                    <Counter value={12} suffix="" />
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Years in the Market
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
                Who We Are
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                A Trusted Technology Partner for{" "}
                <span className="text-gradient">Ethiopia</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              <p>
                iRack IT Solutions is a trusted technology solutions provider
                in Ethiopia, established in{" "}
                <strong className="font-semibold text-foreground">
                  2014 G.C.
                </strong>{" "}
                With strong industry experience and technical expertise, we
                deliver high-quality, value-added IT solutions across hardware,
                software, infrastructure and enterprise systems.
              </p>
              <p>
                Since our establishment, we have focused on providing
                specialized turnkey technology solutions that meet modern
                business needs. Through innovation, reliability and
                customer-focused service, iRack has grown into one of
                Ethiopia&apos;s leading IT solution providers.
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm font-medium"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="card-shine group relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-7 backdrop-blur-sm sm:p-8"
          >
            <span
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl transition-transform duration-500 group-hover:scale-150"
              aria-hidden="true"
            />
            <div className="flex items-center gap-4">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl border border-primary/25 bg-primary/15 p-3 text-primary">
                <Target className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {MISSION}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-shine group relative overflow-hidden rounded-3xl border border-ember/30 bg-gradient-to-br from-ember/10 via-card to-card p-7 backdrop-blur-sm sm:p-8"
          >
            <span
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-ember/15 blur-3xl transition-transform duration-500 group-hover:scale-150"
              aria-hidden="true"
            />
            <div className="flex items-center gap-4">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl border border-ember/30 bg-ember/15 p-3 text-ember">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {VISION}
            </p>
          </motion.article>
        </div>

        {/* Core values */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Our Core Values"
            title={
              <>
                The Values That <span className="text-gradient">Drive Us</span>
              </>
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, i) => {
              const ValueIcon = VALUE_ICONS[value.icon] ?? Users;
              return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                whileHover={{ y: -5 }}
                className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 to-ember/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <ValueIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {value.text}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>

        {/* Journey timeline */}
        <div className="mt-20 sm:mt-24">
          <SectionHeading
            eyebrow="Our Journey"
            title={
              <>
                Building Solutions. <span className="text-gradient">Delivering Excellence.</span>
              </>
            }
            description="From a hardware and network provider in 2014 to one of Ethiopia's top IT companies — every year added new capabilities."
          />

          <ol className="relative mx-auto max-w-3xl">
            {/* Timeline line */}
            <span
              className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:left-1/2"
              aria-hidden="true"
            />
            {STORY_MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.05 * i }}
                  className={`relative mb-10 pl-14 sm:mb-14 sm:w-1/2 sm:pl-0 ${
                    isLeft
                      ? "sm:pr-12 sm:text-right"
                      : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-5 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-auto ${
                      isLeft
                        ? "sm:right-0 sm:translate-x-1/2"
                        : "sm:left-0 sm:-translate-x-1/2"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="absolute h-4 w-4 rounded-full bg-primary/25 animate-pulse" />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <div
                    className={`card-shine rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-6 ${
                      isLeft ? "sm:ml-auto" : ""
                    }`}
                  >
                    <p className="font-display text-sm font-bold tracking-widest text-ember">
                      {m.year}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {m.text}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Revenue growth chart */}
        <RevenueChart />
      </div>
    </section>
  );
}
