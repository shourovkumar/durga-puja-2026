"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useCountdown } from "@/hooks/use-countdown";
import { cinematicEase } from "@/lib/animation";

type HeroCountdownProps = {
  readonly target: string;
  readonly label: string;
};

const countdownUnits = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function formatUnit(value: number | undefined) {
  return value === undefined ? "--" : value.toString().padStart(2, "0");
}

function getTimerLabel(label: string, countdown: ReturnType<typeof useCountdown>) {
  if (!countdown) {
    return `${label}. Countdown loading.`;
  }

  if (countdown.isComplete) {
    return `${label}. The countdown is complete.`;
  }

  return `${label}. ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds remaining.`;
}

export function HeroCountdown({ target, label }: HeroCountdownProps) {
  const countdown = useCountdown(target);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="hero-countdown">
      <p className="hero-countdown__eyebrow">{label}</p>
      <div
        aria-label={getTimerLabel(label, countdown)}
        aria-live="off"
        className="hero-countdown__units"
        role="timer"
      >
        {countdownUnits.map((unit) => {
          const value = formatUnit(countdown?.[unit.key]);

          return (
            <div aria-hidden="true" className="hero-countdown__unit" key={unit.key}>
              <span className="hero-countdown__number-wrap">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-countdown__number"
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    key={value}
                    transition={{ duration: 0.26, ease: cinematicEase }}
                  >
                    {value}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="hero-countdown__label">{unit.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
