"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState, type CSSProperties } from "react";

import { JourneyArtwork } from "@/components/ui/journey-artwork";
import { Container } from "@/components/ui/container";
import { festival } from "@/data/festival";
import { cinematicEase } from "@/lib/animation";

const visualTransition = {
  duration: 0.75,
  ease: cinematicEase,
};

export function PujaJourney() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMoment = festival.pujaJourney[activeIndex] ?? festival.pujaJourney[0];

  const setActiveMoment = useCallback((index: number) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? currentIndex : index));
  }, []);

  return (
    <section
      aria-labelledby="journey-title"
      className="puja-journey"
      data-active={activeMoment.id}
      id="journey"
    >
      <div aria-hidden="true" className="puja-journey__atmosphere">
        {festival.pujaJourney.map((moment) => (
          <span
            className={`puja-journey__aura puja-journey__aura--${moment.tone}`}
            key={moment.id}
          />
        ))}
        <span className="puja-journey__veil" />
      </div>

      <Container className="puja-journey__container">
        <header className="puja-journey__header">
          <p className="type-label">The journey of Puja</p>
          <h2 className="puja-journey__title" id="journey-title">
            Six thresholds. One
            <em> homecoming.</em>
          </h2>
          <p className="puja-journey__introduction">
            Follow the rhythm from the first invocation to the tender farewell—one sacred moment at a time.
          </p>
        </header>

        <div className="puja-journey__mobile-progress">
          <span className="puja-journey__mobile-progress-count">
            {String(activeIndex + 1).padStart(2, "0")} / {String(festival.pujaJourney.length).padStart(2, "0")}
          </span>
          <span className="puja-journey__mobile-progress-name">{activeMoment.label}</span>
          <span
            aria-hidden="true"
            className="puja-journey__mobile-progress-line"
            style={
              {
                "--journey-progress": `${((activeIndex + 1) / festival.pujaJourney.length) * 100}%`,
              } as CSSProperties
            }
          />
        </div>

        <div className="puja-journey__story">
          <nav aria-label="Puja journey moments" className="puja-journey__progress">
            <ol className="puja-journey__progress-list">
              {festival.pujaJourney.map((moment, index) => {
                const isActive = index === activeIndex;

                return (
                  <li className="puja-journey__progress-item" key={moment.id}>
                    <a
                      aria-current={isActive ? "step" : undefined}
                      className="puja-journey__progress-link"
                      data-active={isActive || undefined}
                      href={`#journey-${moment.id}`}
                    >
                      <span className="puja-journey__progress-dot" />
                      <span className="puja-journey__progress-label">{moment.label}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="puja-journey__entries">
            {festival.pujaJourney.map((moment, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.article
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: isActive ? 1 : 0.36, y: isActive ? 0 : 20 }
                  }
                  aria-labelledby={`journey-${moment.id}-title`}
                  className="puja-journey__moment"
                  id={`journey-${moment.id}`}
                  initial={shouldReduceMotion ? false : { opacity: index === 0 ? 1 : 0.2, y: 28 }}
                  key={moment.id}
                  onViewportEnter={() => setActiveMoment(index)}
                  transition={visualTransition}
                  viewport={{ amount: 0.48, margin: "0px 0px -12% 0px" }}
                >
                  <div className="puja-journey__moment-copy">
                    <p className="puja-journey__tithi">{moment.tithi}</p>
                    <div className="puja-journey__moment-heading">
                      <p className="puja-journey__bengali" lang="bn">
                        {moment.bengaliLabel}
                      </p>
                      <h3 id={`journey-${moment.id}-title`}>{moment.label}</h3>
                    </div>
                    <time className="puja-journey__date" dateTime={moment.isoDate}>
                      {moment.date}
                    </time>
                    <p className="puja-journey__description">{moment.description}</p>
                    <span aria-hidden="true" className="puja-journey__ornament">
                      <span />
                    </span>
                  </div>
                  <JourneyArtwork className="puja-journey__inline-artwork" moment={moment} />
                </motion.article>
              );
            })}
          </div>

          <aside aria-hidden="true" className="puja-journey__visual-stage">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="puja-journey__visual-motion"
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.025, y: -14 }}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.975, y: 16 }}
                key={activeMoment.id}
                transition={visualTransition}
              >
                <JourneyArtwork moment={activeMoment} />
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </Container>
    </section>
  );
}
