"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE } from "@/lib/site-data";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 group" aria-label="iRack IT Solutions — Home">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-border/40 bg-background/80 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
        <Image
          src="/images/logo.png"
          alt="iRack IT Solutions logo"
          width={40}
          height={40}
          className="h-full w-full object-contain"
          priority
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
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 24));
  }, [scrollY]);

  React.useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2 bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle color theme"
            className="rounded-full"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" aria-hidden="true" />
              ) : (
                <Moon className="h-4.5 w-4.5" aria-hidden="true" />
              )
            ) : (
              <Moon className="h-4.5 w-4.5 opacity-0" aria-hidden="true" />
            )}
          </Button>

          <Button
            asChild
            className="hidden lg:inline-flex rounded-full bg-ember text-accent-foreground hover:bg-ember/90 shadow-lg shadow-ember/20 border-none"
          >
            <a href="#contact">
              Start a Project
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden rounded-full"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[340px] bg-background/95 backdrop-blur-xl"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mt-2 mb-6">
                <Logo />
              </div>
              <ul className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                        activeSection === link.href.replace("#", "")
                          ? "bg-primary/10 text-foreground border border-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button
                  asChild
                  className="w-full rounded-xl bg-ember text-accent-foreground hover:bg-ember/90"
                >
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Start a Project
                    <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {SITE.email}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
