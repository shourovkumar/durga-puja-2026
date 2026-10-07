"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { Container } from "@/components/ui/container";
import { festival } from "@/data/festival";
import { cinematicEase } from "@/lib/animation";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

type ScrollStyles = {
  readonly bodyOverflow: string;
  readonly bodyPaddingRight: string;
  readonly rootOverflow: string;
  readonly rootScrollBehavior: string;
};

export function SiteHeader() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [highlightedHref, setHighlightedHref] = useState(festival.navigation[0]?.href ?? "#hero");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const scrollStylesRef = useRef<ScrollStyles | null>(null);
  const navigationFrameRef = useRef<number | null>(null);
  const headerScrolledRef = useRef(false);

  const restoreScroll = useCallback(() => {
    const previousStyles = scrollStylesRef.current;

    if (!previousStyles) {
      return;
    }

    document.body.style.overflow = previousStyles.bodyOverflow;
    document.body.style.paddingRight = previousStyles.bodyPaddingRight;
    document.documentElement.style.overflow = previousStyles.rootOverflow;
    document.documentElement.style.scrollBehavior = previousStyles.rootScrollBehavior;
    delete document.documentElement.dataset.menuOpen;
    window.dispatchEvent(new CustomEvent("durga:menu-state", { detail: { open: false } }));
    scrollStylesRef.current = null;
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    const locationItem = festival.navigation.find((item) => item.href === window.location.hash);

    setHighlightedHref(locationItem?.href ?? festival.navigation[0]?.href ?? "#hero");
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const updateScrolledState = () => {
      const nextHasScrolled = window.scrollY > 12;

      if (headerScrolledRef.current !== nextHasScrolled) {
        headerScrolledRef.current = nextHasScrolled;
        setHasScrolled(nextHasScrolled);
      }
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      restoreScroll();
      return;
    }

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    scrollStylesRef.current = {
      bodyOverflow: document.body.style.overflow,
      bodyPaddingRight: document.body.style.paddingRight,
      rootOverflow: document.documentElement.style.overflow,
      rootScrollBehavior: document.documentElement.style.scrollBehavior,
    };

    document.documentElement.dataset.menuOpen = "true";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.overflow = "hidden";

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    window.dispatchEvent(new CustomEvent("durga:menu-state", { detail: { open: true } }));
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      restoreScroll();
    };
  }, [closeMenu, isOpen, restoreScroll]);

  useEffect(() => () => {
    if (navigationFrameRef.current !== null) {
      window.cancelAnimationFrame(navigationFrameRef.current);
    }
  }, []);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    closeMenu();

    navigationFrameRef.current = window.requestAnimationFrame(() => {
      navigationFrameRef.current = window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(href);

        if (!target) {
          return;
        }

        window.history.replaceState(null, "", href);
        if (shouldReduceMotion) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          window.dispatchEvent(new CustomEvent("durga:scroll-to", { detail: { target: href } }));
        }
      });
    });
  };

  return (
    <>
      <header className="site-header" data-scrolled={hasScrolled || undefined}>
        <Container className="site-header__inner">
          <a
            aria-label={`${festival.name} ${festival.year} home`}
            className="site-brand"
            href="#hero"
          >
            <span aria-hidden="true" className="site-brand__mark" />
            <span>{festival.hero.seasonLabel}</span>
          </a>

          <button
            aria-controls="festival-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close festival menu" : "Open festival menu"}
            className="site-menu-trigger"
            onClick={isOpen ? closeMenu : openMenu}
            ref={triggerRef}
            type="button"
          >
            <span>{isOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="site-menu-trigger__glyph">
              <i />
              <i />
            </span>
          </button>
        </Container>
      </header>

      <AnimatePresence onExitComplete={() => triggerRef.current?.focus()}>
        {isOpen ? (
          <motion.aside
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            aria-labelledby="festival-menu-title"
            aria-modal="true"
            className="site-menu"
            exit={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            id="festival-menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeMenu();
              }
            }}
            ref={dialogRef}
            role="dialog"
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.56, ease: cinematicEase }}
          >
            <div aria-hidden="true" className="site-menu__atmosphere">
              <span className="site-menu__glow" />
              <span className="site-menu__line site-menu__line--one" />
              <span className="site-menu__line site-menu__line--two" />
            </div>

            <Container className="site-menu__inner">
              <div className="site-menu__topline">
                <p className="site-menu__eyebrow">{festival.hero.seasonLabel}</p>
                <button
                  aria-label="Close festival menu"
                  className="site-menu__close"
                  onClick={closeMenu}
                  ref={closeRef}
                  type="button"
                >
                  <span>Close</span>
                  <span aria-hidden="true" className="site-menu__close-mark" />
                </button>
              </div>

              <nav aria-label="Festival navigation" className="site-menu__navigation">
                <h2 className="sr-only" id="festival-menu-title">Festival navigation</h2>
                <motion.ol
                  animate="visible"
                  className="site-menu__list"
                  initial="hidden"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: shouldReduceMotion ? { duration: 0 } : { delayChildren: 0.18, staggerChildren: 0.06 },
                    },
                  }}
                >
                  {festival.navigation.map((item, index) => (
                    <motion.li
                      className="site-menu__item"
                      key={item.href}
                      variants={{
                        hidden: shouldReduceMotion ? { opacity: 0 } : { filter: "blur(4px)", opacity: 0, y: 18 },
                        visible: shouldReduceMotion ? { opacity: 1 } : { filter: "blur(0px)", opacity: 1, y: 0 },
                      }}
                    >
                      <a
                        aria-current={highlightedHref === item.href ? "page" : undefined}
                        className="site-menu__link"
                        data-active={highlightedHref === item.href || undefined}
                        href={item.href}
                        onClick={(event) => handleNavigation(event, item.href)}
                        onFocus={() => setHighlightedHref(item.href)}
                        onMouseEnter={() => setHighlightedHref(item.href)}
                      >
                        <span className="site-menu__index">{String(index + 1).padStart(2, "0")}</span>
                        <span>{item.label}</span>
                        <span aria-hidden="true" className="site-menu__link-line" />
                      </a>
                    </motion.li>
                  ))}
                </motion.ol>
              </nav>

              <p className="site-menu__footer">Durga Puja 2026 · Bangladesh</p>
            </Container>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
