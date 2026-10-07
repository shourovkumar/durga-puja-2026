"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";

import { Container } from "@/components/ui/container";
import { HeroArtwork } from "@/components/ui/hero-artwork";
import { HeroCountdown } from "@/components/ui/hero-countdown";
import { HeroInteraction } from "@/components/effects/hero-interaction";
import { festival } from "@/data/festival";
import { cinematicEase } from "@/lib/animation";

const particles = [
  { delay: "-4s", duration: "13s", left: "8%", opacity: "0.34", size: "2px", top: "25%", x: "16px", y: "-32px" },
  { delay: "-11s", duration: "16s", left: "22%", opacity: "0.2", size: "1px", top: "67%", x: "-12px", y: "-42px" },
  { delay: "-7s", duration: "19s", left: "46%", opacity: "0.3", size: "2px", top: "14%", x: "22px", y: "-28px" },
  { delay: "-14s", duration: "17s", left: "63%", opacity: "0.22", size: "1px", top: "39%", x: "-16px", y: "-37px" },
  { delay: "-2s", duration: "21s", left: "77%", opacity: "0.28", size: "2px", top: "72%", x: "15px", y: "-46px" },
  { delay: "-17s", duration: "15s", left: "91%", opacity: "0.19", size: "1px", top: "24%", x: "-23px", y: "-31px" },
  { delay: "-8s", duration: "24s", left: "36%", opacity: "0.17", size: "1px", top: "82%", x: "11px", y: "-24px" },
  { delay: "-19s", duration: "22s", left: "84%", opacity: "0.24", size: "1px", top: "51%", x: "-18px", y: "-29px" },
  { delay: "-5s", duration: "18s", left: "54%", opacity: "0.2", size: "1px", top: "8%", x: "9px", y: "-34px" },
  { delay: "-13s", duration: "27s", left: "14%", opacity: "0.15", size: "1px", top: "48%", x: "-7px", y: "-21px" },
] as const;

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const atmosphereY = useTransform(scrollY, [0, 900], [0, 72]);
  const artworkY = useTransform(scrollY, [0, 900], [0, -46]);
  const contentY = useTransform(scrollY, [0, 900], [0, 34]);

  return (
    <section aria-labelledby="hero-title" className="hero" id="hero" ref={heroRef}>
      <motion.div
        animate={{ opacity: 1 }}
        aria-hidden="true"
        className="hero__atmosphere"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        style={{ y: shouldReduceMotion ? 0 : atmosphereY }}
        transition={{ duration: 1.4, ease: cinematicEase }}
      >
        <div className="hero__atmosphere-depth">
          <div className="hero__liquid-light" />
          <div className="hero__bloom" />
          <div className="hero__haze hero__haze--one" />
          <div className="hero__haze hero__haze--two" />
          <div className="hero__particles">
            {particles.map((particle) => (
              <span
                className="hero__particle"
                key={`${particle.left}-${particle.top}`}
                style={
                  {
                    "--particle-delay": particle.delay,
                    "--particle-duration": particle.duration,
                    "--particle-opacity": particle.opacity,
                    "--particle-size": particle.size,
                    "--particle-x": particle.x,
                    "--particle-y": particle.y,
                    left: particle.left,
                    top: particle.top,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </motion.div>

      <HeroInteraction heroRef={heroRef} />

      <Container className="hero__container">
        <div className="hero__layout">
          <motion.div className="hero__content-motion" style={{ y: shouldReduceMotion ? 0 : contentY }}>
            <div className="hero__content-depth">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="hero__content"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
                transition={{ delay: 0.5, duration: 0.9, ease: cinematicEase }}
              >
                <p className="hero__season">{festival.hero.seasonLabel}</p>
                <h1 className="hero__arrival-title" id="hero-title" lang="bn">
                  {festival.hero.arrivalTitle}
                </h1>
                <p className="hero__supporting-title">{festival.hero.supportingTitle}</p>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  transition={{ delay: 0.82, duration: 0.7, ease: cinematicEase }}
                >
                  <HeroCountdown label={festival.countdown.label} target={festival.countdown.target} />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="hero__artwork-wrap"
            style={{ y: shouldReduceMotion ? 0 : artworkY }}
          >
            <div className="hero__artwork-depth">
              <div aria-hidden="true" className="hero__artwork-halo" />
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                transition={{ delay: 0.26, duration: 1.25, ease: cinematicEase }}
              >
                <HeroArtwork reserveLabel={festival.hero.artworkReserveLabel} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        aria-hidden="true"
        className="hero__scroll-cue"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        transition={{ delay: 1.18, duration: 0.6, ease: cinematicEase }}
      >
        <span className="hero__scroll-mark" />
        Scroll to unfold
      </motion.p>
    </section>
  );
}
