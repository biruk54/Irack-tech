"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Package,
  Network,
  Building2,
  Server,
  LifeBuoy,
  ShieldCheck,
  Globe,
  Cloud,
  Code2,
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  X,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { SOLUTIONS, SERVICE_WORKFLOW, type Solution } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  Network,
  Building2,
  Server,
  LifeBuoy,
  ShieldCheck,
  Globe,
  Cloud,
  Code2,
};

export function Solutions() {
  const [selected, setSelected] = React.useState<Solution | null>(null);

  return (
    <section
      id="solutions"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-label="Our IT solutions"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-ember/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Smart Solutions for a{" "}
              <span className="text-gradient">Stronger Future</span>
            </>
          }
          description="Consult · Design · Supply · Install · Commission — six complete service lines, delivered turnkey by certified teams. Select a service to see everything it includes."
        />

        {/* Delivery workflow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {SERVICE_WORKFLOW.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-ember/50 hover:bg-ember/5"
            >
              <span className="font-display text-2xl font-bold text-ember/30 transition-colors group-hover:text-ember/60" aria-hidden="true">
                {step.step}
              </span>
              <h3 className="mt-1 font-display text-sm font-bold uppercase tracking-wider">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution, i) => {
            const Icon = ICONS[solution.icon] ?? Server;
            const isLarge = solution.span === "large";
            return (
              <motion.button
                key={solution.id}
                type="button"
                onClick={() => setSelected(solution)}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "card-shine group relative flex flex-col rounded-3xl border border-border/60 bg-card/70 p-6 text-left backdrop-blur-sm transition-all duration-300",
                  "hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                  isLarge && "lg:col-span-2"
                )}
                aria-label={`Learn more about ${solution.title}`}
              >
                {isLarge && (
                  <div className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
                    <Image
                      src="/images/datacenter.jpg"
                      alt=""
                      fill
                      className="object-cover opacity-25 transition-opacity duration-500 group-hover:opacity-40"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
                  </div>
                )}
                <div className="relative flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-ember/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40",
                      isLarge && "h-14 w-14"
                    )}
                  >
                    <Icon className={cn("h-6 w-6", isLarge && "h-7 w-7")} />
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-ember group-hover:bg-ember group-hover:text-accent-foreground">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <h3
                  className={cn(
                    "relative mt-5 font-display text-lg font-semibold leading-snug",
                    isLarge && "text-xl sm:text-2xl"
                  )}
                >
                  {solution.title}
                </h3>
                <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {solution.short}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore Solution
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </motion.button>
            );
          })}

          {/* CTA tile */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-ember/40 bg-gradient-to-br from-ember/15 via-card to-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ember hover:shadow-2xl hover:shadow-ember/15"
          >
            <div
              className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-ember/20 blur-2xl transition-transform duration-500 group-hover:scale-150"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember text-accent-foreground shadow-lg shadow-ember/25 transition-transform duration-300 group-hover:scale-110">
                <MessageSquare className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                Need Something Custom?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Every business is unique. Tell us about your challenge and our
                experts will craft the right solution.
              </p>
            </div>
            <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ember">
              Talk to Our Experts
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </motion.a>
        </div>
      </div>

      {/* Solution detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl overflow-hidden rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl p-0">
          {selected && (
            <div className="relative">
              <div
                className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-primary/20 via-transparent to-ember/20"
                aria-hidden="true"
              />
              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/15 to-ember/10 text-primary">
                      {(() => {
                        const Icon = ICONS[selected.icon] ?? Server;
                        return <Icon className="h-7 w-7" />;
                      })()}
                    </span>
                    <DialogTitle className="font-display text-xl font-bold sm:text-2xl">
                      {selected.title}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription asChild>
                  <div>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {selected.description}
                    </p>
                    <h4 className="mt-6 font-display text-sm font-bold uppercase tracking-widest text-primary">
                      What's Included
                    </h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {selected.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                            aria-hidden="true"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="flex-1 rounded-xl bg-ember text-accent-foreground hover:bg-ember/90">
                        <a href="#contact" onClick={() => setSelected(null)}>
                          <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                          Discuss This Solution
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl"
                        onClick={() => setSelected(null)}
                      >
                        <X className="mr-2 h-4 w-4" aria-hidden="true" />
                        Close
                      </Button>
                    </div>
                  </div>
                </DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
