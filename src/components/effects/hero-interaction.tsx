"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import type { RefObject } from "react";
import { useEffect, useState } from "react";

type HeroInteractionProps = {
  readonly heroRef: RefObject<HTMLElement | null>;
};

const cursorRadius = 27 * 16;
const finePointerQuery = "(hover: hover) and (pointer: fine)";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

/**
 * Keeps pointer input outside React's render path. Motion values drive both the
 * warm cursor bloom and CSS custom properties consumed by the hero depth layers.
 */
export function HeroInteraction({ heroRef }: HeroInteractionProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const cursorX = useMotionValue(-cursorRadius * 2);
  const cursorY = useMotionValue(-cursorRadius * 2);
  const depthX = useMotionValue(0);
  const depthY = useMotionValue(0);
  const lightX = useSpring(cursorX, { damping: 28, mass: 0.8, stiffness: 80 });
  const lightY = useSpring(cursorY, { damping: 28, mass: 0.8, stiffness: 80 });
  const softenedX = useSpring(depthX, { damping: 24, mass: 0.7, stiffness: 65 });
  const softenedY = useSpring(depthY, { damping: 24, mass: 0.7, stiffness: 65 });

  const updateDepthProperties = () => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const x = softenedX.get();
    const y = softenedY.get();
    const setProperty = (name: string, value: number) =>
      hero.style.setProperty(name, `${value.toFixed(2)}px`);

    setProperty("--hero-pointer-x-atmosphere", x * -4);
    setProperty("--hero-pointer-y-atmosphere", y * -3);
    setProperty("--hero-pointer-x-content", x * -6);
    setProperty("--hero-pointer-y-content", y * -4);
    setProperty("--hero-pointer-x-artwork", x * 9);
    setProperty("--hero-pointer-y-artwork", y * 6);
  };

  useMotionValueEvent(softenedX, "change", updateDepthProperties);
  useMotionValueEvent(softenedY, "change", updateDepthProperties);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const finePointer = window.matchMedia(finePointerQuery);
    const prefersReducedMotion = window.matchMedia(reducedMotionQuery);
    let isActive = false;

    const reset = () => {
      cursorX.set(-cursorRadius * 2);
      cursorY.set(-cursorRadius * 2);
      depthX.set(0);
      depthY.set(0);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
      const verticalPosition = (event.clientY - bounds.top) / bounds.height;

      cursorX.set(event.clientX - bounds.left - cursorRadius);
      cursorY.set(event.clientY - bounds.top - cursorRadius);
      depthX.set((horizontalPosition - 0.5) * 2);
      depthY.set((verticalPosition - 0.5) * 2);
    };

    const updateCapability = () => {
      const nextIsActive = finePointer.matches && !prefersReducedMotion.matches;

      if (nextIsActive === isActive) {
        return;
      }

      isActive = nextIsActive;
      setIsEnabled(nextIsActive);

      if (nextIsActive) {
        hero.addEventListener("pointermove", onPointerMove, { passive: true });
        hero.addEventListener("pointerleave", reset, { passive: true });
      } else {
        hero.removeEventListener("pointermove", onPointerMove);
        hero.removeEventListener("pointerleave", reset);
        reset();
      }
    };

    updateCapability();
    finePointer.addEventListener("change", updateCapability);
    prefersReducedMotion.addEventListener("change", updateCapability);

    return () => {
      finePointer.removeEventListener("change", updateCapability);
      prefersReducedMotion.removeEventListener("change", updateCapability);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [cursorX, cursorY, depthX, depthY, heroRef]);

  if (!isEnabled) {
    return null;
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className="hero__cursor-light"
      initial={{ opacity: 0 }}
      style={{ x: lightX, y: lightY }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
