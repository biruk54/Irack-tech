"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    return scrollY.on("change", (y) => setVisible(y > 500));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <Button
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="h-11 w-11 rounded-full border border-primary/30 bg-background/80 text-primary shadow-xl shadow-primary/15 backdrop-blur-md hover:bg-primary/10"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
