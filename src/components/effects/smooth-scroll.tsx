"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Enables eased scrolling only for people who have not requested reduced motion.
 * Keep visual WebGL effects dynamically imported at the section that needs them.
 */
export function SmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
    });

    const synchronizeMenuState = (event: Event) => {
      const menuEvent = event as CustomEvent<{ readonly open?: boolean }>;

      if (menuEvent.detail?.open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const scrollToSection = (event: Event) => {
      const navigationEvent = event as CustomEvent<{ readonly target?: string }>;
      const targetSelector = navigationEvent.detail?.target;

      if (!targetSelector) {
        return;
      }

      const target = document.querySelector<HTMLElement>(targetSelector);
      const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;

      if (target) {
        lenis.scrollTo(target, { duration: 0.95, offset: -(headerHeight + 12) });
      }
    };

    window.addEventListener("durga:menu-state", synchronizeMenuState);
    window.addEventListener("durga:scroll-to", scrollToSection);

    return () => {
      window.removeEventListener("durga:menu-state", synchronizeMenuState);
      window.removeEventListener("durga:scroll-to", scrollToSection);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
