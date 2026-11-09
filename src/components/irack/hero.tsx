"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "./counter";
import { STATS, ROTATING_WORDS } from "@/lib/site-data";

/* ------------------------------------------------------------------ */
/* Animated particle network canvas (circuit / connectivity motif)    */
/* ------------------------------------------------------------------ */
function ParticleNetwork() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: "primary" | "ember";
    };

    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 22000), 90);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        hue: Math.random() > 0.82 ? "ember" : "primary",
      }));
    };

    const styles = getComputedStyle(document.documentElement);
    void styles;

    // Canvas-safe tones matching the teal / ember theme
    const primaryColor = "rgba(20, 184, 166,"; // teal
    const emberColor = "rgba(251, 146, 60,"; // orange

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = 130;

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.32;
            ctx.strokeStyle = `${primaryColor} ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // mouse links
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 170) {
          const alpha = (1 - mdist / 170) * 0.5;
          ctx.strokeStyle = `${emberColor} ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const color = n.hue === "ember" ? emberColor : primaryColor;
        ctx.fillStyle = `${color} ${n.hue === "ember" ? 0.85 : 0.6})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Rotating words                                                      */
/* ------------------------------------------------------------------ */
function RotatingWord() {
  const [index, setIndex] = React.useState(0);
  const [isBlurred, setIsBlurred] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsBlurred(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setIsBlurred(false);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-flex h-[1.2em] items-center overflow-visible align-baseline">
      <span
        className={`text-gradient font-display font-bold transition-all duration-300 ${
          isBlurred ? "opacity-0 blur-sm translate-y-2" : "opacity-100 blur-0 translate-y-0"
        }`}
      >
        {ROTATING_WORDS[index]}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background"
      aria-label="Introduction"
    >
      {/* Background layers */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-40 dark:opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>
      <div className="absolute inset-0 bg-grid bg-grid-fade" aria-hidden="true" />
      <ParticleNetwork />
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-ember/10 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2.5s" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-32 pb-16 sm:px-6 lg:px-8"
      >
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Since 2014 · Addis Ababa, Ethiopia
            <Sparkles className="h-3.5 w-3.5 text-ember" aria-hidden="true" />
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Smart Solutions.
          <br />
          <span className="text-muted-foreground/80 font-medium">
            Stronger
          </span>{" "}
          <span className="relative inline-block">
            <RotatingWord />
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          iRack IT Solutions is a trusted technology solutions provider in
          Ethiopia — delivering high-quality, value-added turnkey solutions
          across hardware, software, infrastructure and enterprise systems
          since 2014.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            className="group relative h-12 rounded-full bg-ember px-8 text-base font-semibold text-accent-foreground shadow-xl shadow-ember/25 transition-all hover:shadow-ember/40 hover:brightness-110 border-none"
          >
            <a href="#contact">
              Start Your Project
              <ArrowRight
                className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-8 text-base font-semibold backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/10"
          >
            <a href="#projects">View Completed Projects</a>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.dl
          variants={item}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 backdrop-blur-md sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-background/70 p-5 transition-colors hover:bg-primary/5 sm:p-6"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm sm:normal-case sm:tracking-normal">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.div>
      </motion.a>
    </section>
  );
}
