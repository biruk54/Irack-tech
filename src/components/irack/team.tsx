"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Wrench, Handshake, Network } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TEAMS, LEADERS } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Wrench,
  Handshake,
};

export function Team() {
  const [active, setActive] = React.useState(TEAMS[0].id);
  const [showOrg, setShowOrg] = React.useState(false);
  const activeTeam = TEAMS.find((t) => t.id === active) ?? TEAMS[0];

  return (
    <section
      id="team"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-label="Meet our team"
    >
      <div
        className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-ember/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our People"
          title={
            <>
              Meet Our <span className="text-gradient">Team</span>
            </>
          }
          description="70+ certified professionals — engineers, developers, consultants and specialists — led by an experienced leadership team and organized into focused delivery departments."
        />

        {/* Leadership cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((leader, i) => (
            <motion.article
              key={leader.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
            >
              <div className="relative aspect-[4/4.4] overflow-hidden">
                <Image
                  src={leader.photo}
                  alt={`${leader.name} — ${leader.role} at iRack IT Solutions`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5">
                <h3 className="font-display text-lg font-bold leading-tight">
                  {leader.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {leader.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Department tabs */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Active team photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative lg:col-span-2"
          >
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-ember/15 via-transparent to-primary/15 opacity-70 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTeam.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={activeTeam.photo}
                    alt={`${activeTeam.title} at iRack IT Solutions`}
                    width={1303}
                    height={660}
                    className="h-auto w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Network className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{activeTeam.title}</p>
                    <p className="text-xs text-muted-foreground">
                      iRack IT Solutions · Addis Ababa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="lg:col-span-3">
            <div
              role="tablist"
              aria-label="Team departments"
              className="flex flex-wrap gap-2"
            >
              {TEAMS.map((team) => {
                const Icon = ICONS[team.icon] ?? Cpu;
                const isActive = team.id === active;
                return (
                  <button
                    key={team.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`team-panel-${team.id}`}
                    id={`team-tab-${team.id}`}
                    onClick={() => setActive(team.id)}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "border-primary/50 bg-primary/10 text-primary shadow-lg shadow-primary/10"
                        : "border-border/60 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {team.title}
                  </button>
                );
              })}
            </div>

            <div className="relative mt-6 min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTeam.id}
                  role="tabpanel"
                  id={`team-panel-${activeTeam.id}`}
                  aria-labelledby={`team-tab-${activeTeam.id}`}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.35 }}
                  className="card-shine rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm sm:p-8"
                >
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    {activeTeam.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {activeTeam.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-primary/30 hover:bg-primary/10"
                    >
                      <a href="#contact">
                        <Handshake className="mr-2 h-4 w-4" aria-hidden="true" />
                        Work With This Team
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setShowOrg(true)}
                    >
                      <Network className="mr-2 h-4 w-4" aria-hidden="true" />
                      View Org Structure
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Org structure image */}
        {showOrg && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-4 backdrop-blur-sm sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">
                  Organizational Structure
                </h3>
                <p className="text-sm text-muted-foreground">
                  CEO · Deputy CEO · Five chief officers and their departments
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOrg(false)}
                aria-label="Hide organizational structure"
              >
                Hide
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Image
                src="/images/org-structure.png"
                alt="iRack IT Solutions organizational structure chart"
                width={1192}
                height={644}
                className="h-auto w-full min-w-[640px] rounded-2xl"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
