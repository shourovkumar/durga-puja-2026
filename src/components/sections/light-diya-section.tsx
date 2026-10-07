"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties } from "react";

import { Container } from "@/components/ui/container";
import { Diya } from "@/components/ui/diya";
import { festival } from "@/data/festival";
import { cinematicEase } from "@/lib/animation";

const particles = [
  { delay: "0.36s", left: "24%", rise: "-7.5rem", size: "2px" },
  { delay: "0.54s", left: "35%", rise: "-10rem", size: "1px" },
  { delay: "0.42s", left: "47%", rise: "-8.5rem", size: "2px" },
  { delay: "0.66s", left: "59%", rise: "-11rem", size: "1px" },
  { delay: "0.5s", left: "72%", rise: "-7rem", size: "2px" },
  { delay: "0.78s", left: "80%", rise: "-9rem", size: "1px" },
] as const;

export function LightDiyaSection() {
  const shouldReduceMotion = useReducedMotion();
  const [isLit, setIsLit] = useState(false);
  const [sequence, setSequence] = useState(0);

  const lightDiya = () => {
    setIsLit(true);
    setSequence((currentSequence) => currentSequence + 1);
  };

  return (
    <section
      aria-labelledby="diya-title"
      className="diya-section"
      data-lit={isLit || undefined}
      id="light-diya"
    >
      <div aria-hidden="true" className="diya-section__atmosphere">
        <div className="diya-section__maroon-haze" />
        <div className="diya-section__warmth" key={`light-${sequence}`} />
        <div className="diya-section__smoke diya-section__smoke--one" key={`smoke-one-${sequence}`} />
        <div className="diya-section__smoke diya-section__smoke--two" key={`smoke-two-${sequence}`} />
        <div className="diya-section__particles">
          {particles.map((particle, index) => (
            <span
              className="diya-section__particle"
              key={`${sequence}-${particle.left}`}
              style={
                {
                  "--diya-particle-delay": particle.delay,
                  "--diya-particle-left": particle.left,
                  "--diya-particle-rise": particle.rise,
                  "--diya-particle-size": particle.size,
                  "--diya-particle-x": `${index % 2 === 0 ? "1.4rem" : "-1.1rem"}`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <Container className="diya-section__container">
        <div className="diya-section__experience">
          <header className="diya-section__introduction">
            <p className="type-label">{festival.diya.sectionLabel}</p>
            <h2 className="sr-only" id="diya-title">
              Light the diya
            </h2>
            <p className="diya-section__invitation" id="diya-invitation" lang="bn">
              {festival.diya.supportingText}
            </p>
          </header>

          <div className="diya-section__visual">
            <Diya lit={isLit} sequence={sequence} />
          </div>

          <div className="diya-section__actions">
            {!isLit ? (
              <button
                aria-describedby="diya-invitation"
                aria-pressed="false"
                className="diya-section__ignite"
                onClick={lightDiya}
                type="button"
              >
                <span aria-hidden="true" className="diya-section__button-mark" />
                <span lang="bn">{festival.diya.actionLabel}</span>
              </button>
            ) : (
              <button
                aria-pressed="true"
                className="diya-section__replay"
                onClick={lightDiya}
                type="button"
              >
                <span lang="bn">{festival.diya.replayLabel}</span>
              </button>
            )}
          </div>

          <div aria-live="polite" className="diya-section__message-slot" id="wishes">
            <AnimatePresence initial={false}>
              {isLit ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="diya-section__message"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  key="diya-message"
                  transition={{ delay: shouldReduceMotion ? 0 : 1.15, duration: 0.72, ease: cinematicEase }}
                >
                  <p className="diya-section__greeting" lang="bn">
                    {festival.diya.greeting}
                  </p>
                  <p className="diya-section__devotion" lang="bn">
                    {festival.diya.devotion}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
