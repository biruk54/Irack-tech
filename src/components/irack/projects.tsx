"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CalendarDays,
  MapPin,
  Wallet,
  ArrowUpRight,
  FolderOpen,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

export function Projects() {
  const [category, setCategory] = React.useState<string>("all");
  const [visible, setVisible] = React.useState(PAGE_SIZE);

  const filtered = React.useMemo(
    () =>
      category === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === category),
    [category]
  );

  const shown = filtered.slice(0, visible);

  const handleCategory = (id: string) => {
    setCategory(id);
    setVisible(PAGE_SIZE);
  };

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden border-y border-border/40 bg-muted/30 py-20 sm:py-28"
      aria-label="Completed project portfolio"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Completed Project Portfolio"
          title={
            <>
              Proven Delivery Across{" "}
              <span className="text-gradient">Ethiopia</span>
            </>
          }
          description="27 flagship projects delivered for ministries, universities, hospitals and agencies — from 510M ETB data center rehabilitations to nation-wide STEM innovation centers."
        />

        {/* Category filters */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = cat.id === category;
            const count =
              cat.id === "all"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "border-primary/50 bg-primary/10 text-primary shadow-lg shadow-primary/10"
                    : "border-border/60 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat.label}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects grid */}
        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((project, i) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.04 * (i % 3) }}
                whileHover={{ y: -6 }}
                className="card-shine group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
              >
                <span
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-ember/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-ember/30 bg-ember/10 px-3 py-1 font-display text-xs font-bold text-ember">
                    {project.size}
                  </span>
                </div>

                <p className="relative mt-4 text-xs font-bold uppercase tracking-wider text-primary">
                  {project.client}
                </p>
                <h3 className="relative mt-2 flex-1 font-display text-base font-semibold leading-snug">
                  {project.title}
                </h3>

                <div className="relative mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/50 pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {project.year} G.C.
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {project.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
                    {project.size}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load more */}
        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full px-8"
            >
              <FolderOpen className="mr-2 h-4 w-4" aria-hidden="true" />
              Show More Projects ({filtered.length - visible} remaining)
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
