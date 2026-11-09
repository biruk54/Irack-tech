"use client";

import * as React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { SITE, NAV_LINKS, SOLUTIONS } from "@/lib/site-data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/60 bg-muted/40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:max-w-xs">
            <a href="#home" className="flex items-center gap-2.5" aria-label="iRack IT Solutions — back to top">
              <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border/40 bg-background/80 shadow-lg">
                <Image
                  src="/images/logo.png"
                  alt="iRack IT Solutions logo"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-tight">
                  i<span className="text-primary">Rack</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  IT Solutions
                </span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Smart solutions, stronger future. High-quality, value-added IT
              solutions from Addis Ababa, Ethiopia — since 2014 G.C.
            </p>
            <div className="mt-5 flex items-center gap-1.5" aria-label="Trusted by leading institutions">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                100+ Projects Delivered
              </span>
            </div>
          </div>

          {/* Solutions */}
          <nav aria-label="Solutions footer navigation">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SOLUTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href="#solutions"
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.title}
                    <ArrowUpRight
                      className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company footer navigation">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneRaw.replace(/\+/g, "")}`}
                  className="flex flex-col gap-1.5"
                >
                  <span className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {SITE.phone}
                  </span>
                  <span className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 opacity-0" aria-hidden="true" />
                    {SITE.phoneAlt}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {SITE.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {SITE.copyright} Established {SITE.established} G.C.
          </p>
          <p className="text-xs text-muted-foreground">
            Smart Solutions, Stronger Future · www.iracktech.com
          </p>
        </div>
      </div>
    </footer>
  );
}
