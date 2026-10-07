import { useId } from "react";

import { cn } from "@/lib/cn";

type DiyaProps = {
  readonly className?: string;
  readonly lit: boolean;
  /** Remounts the flame layers so the quiet ignition can be replayed. */
  readonly sequence: number;
};

/** A lightweight, replaceable vector diya with a restrained, CSS-animated flame. */
export function Diya({ className, lit, sequence }: DiyaProps) {
  const id = useId().replaceAll(":", "");
  const brassGradient = `diya-brass-${id}`;
  const flameGradient = `diya-flame-${id}`;

  return (
    <div className={cn("diya", className)} data-lit={lit || undefined}>
      <span aria-hidden="true" className="diya__ambient" />
      <svg aria-hidden="true" className="diya__svg" viewBox="0 0 256 256">
        <defs>
          <linearGradient id={brassGradient} x1="56" x2="203" y1="151" y2="221">
            <stop offset="0" stopColor="var(--palette-brown)" />
            <stop offset="0.35" stopColor="var(--palette-gold)" />
            <stop offset="0.62" stopColor="var(--palette-gold-light)" />
            <stop offset="1" stopColor="var(--palette-brown)" />
          </linearGradient>
          <linearGradient id={flameGradient} x1="128" x2="128" y1="32" y2="142">
            <stop offset="0" stopColor="var(--palette-ivory)" />
            <stop offset="0.38" stopColor="var(--palette-gold-light)" />
            <stop offset="1" stopColor="var(--palette-vermilion)" />
          </linearGradient>
        </defs>

        <g className="diya__flame" key={`flame-${sequence}`}>
          <path
            className="diya__flame-outer"
            d="M128 25C112 52 101 72 105 94c3 19 14 34 23 42 9-8 20-23 23-42 4-22-7-42-23-69Z"
            fill={`url(#${flameGradient})`}
          />
          <path
            className="diya__flame-inner"
            d="M128 68c-9 14-13 25-10 37 2 9 6 16 10 21 5-5 9-12 11-21 2-12-2-23-11-37Z"
          />
        </g>

        <path className="diya__wick" d="M128 145c-2-10 1-17 5-24" />
        <ellipse className="diya__rim-shadow" cx="128" cy="157" rx="65" ry="17" />
        <path
          className="diya__bowl"
          d="M62 154c4 23 20 48 43 59 15 8 31 8 46 0 23-11 39-36 43-59-16 8-42 12-66 12s-50-4-66-12Z"
          fill={`url(#${brassGradient})`}
        />
        <path className="diya__rim" d="M62 154c18-11 45-16 66-16s48 5 66 16c-17 10-43 15-66 15s-49-5-66-15Z" />
        <path className="diya__bowl-highlight" d="M89 181c11 17 27 28 43 29" />
      </svg>
    </div>
  );
}
