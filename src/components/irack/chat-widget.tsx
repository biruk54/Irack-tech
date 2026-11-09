"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What services does iRack offer?",
  "Where are you located?",
  "How can I contact your team?",
  "Tell me about your partners.",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! 👋 I'm RackAI, the iRack IT Solutions assistant. Ask me anything about our services, partners, history or how to get started — I'm here to help 24/7.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    setShowSuggestions(false);

    const userMsg: Message = { id: uid(), role: "user", content };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error("chat failed");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I couldn't process that. Please try again or reach us at irackcontact@iracktech.com.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please email us at irackcontact@iracktech.com or call +251 111 794 557.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close AI chat assistant" : "Open AI chat assistant"}
          className="group relative h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-2xl shadow-primary/30 transition-transform hover:scale-105 border-none"
        >
          <span
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-[10px] font-bold text-accent-foreground"
            aria-hidden="true"
          >
            AI
          </span>
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
          {!open && (
            <span
              className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/30"
              aria-hidden="true"
            />
          )}
        </Button>
      </motion.div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="dialog"
            aria-label="iRack AI assistant chat"
            className="fixed bottom-24 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl sm:right-6"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary/15 via-transparent to-ember/10 px-5 py-4">
              <div className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </span>
                <span
                  className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-bold">RackAI Assistant</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-ember" aria-hidden="true" />
                  Powered by AI · always online
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border/60 bg-muted/60"
                    )}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/60 bg-muted/60 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          delay: i * 0.15,
                        }}
                        className="h-2 w-2 rounded-full bg-primary"
                      />
                    ))}
                  </div>
                </div>
              )}
              {showSuggestions && messages.length === 1 && (
                <div className="space-y-2 pt-2">
                  <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Try asking
                  </p>
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      onClick={() => send(s)}
                      className="block w-full rounded-xl border border-primary/25 bg-primary/5 px-4 py-2.5 text-left text-xs font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-border/60 bg-background/80 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about iRack..."
                aria-label="Type your message"
                className="h-11 flex-1 rounded-full border border-border/60 bg-muted/40 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="h-11 w-11 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4.5 w-4.5" aria-hidden="true" />
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
