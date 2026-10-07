"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cinematicEase, motionTokens } from "@/lib/animation";
import { cn } from "@/lib/cn";

type RevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: motionTokens.distance.reveal }}
      transition={{
        delay,
        duration: motionTokens.duration.slow,
        ease: cinematicEase,
      }}
      viewport={{ amount: 0.25, once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
