"use client";

import { useEffect, useState } from "react";

export type CountdownValue = {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly isComplete: boolean;
};

const second = 1_000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

function getCountdownValue(targetTime: number, now: number): CountdownValue {
  const remaining = Math.max(targetTime - now, 0);

  return {
    days: Math.floor(remaining / day),
    hours: Math.floor((remaining % day) / hour),
    minutes: Math.floor((remaining % hour) / minute),
    seconds: Math.floor((remaining % minute) / second),
    isComplete: remaining === 0,
  };
}

function isSameCountdown(left: CountdownValue | null, right: CountdownValue) {
  return (
    left?.days === right.days &&
    left.hours === right.hours &&
    left.minutes === right.minutes &&
    left.seconds === right.seconds &&
    left.isComplete === right.isComplete
  );
}

/**
 * Starts only after hydration, then schedules updates on second boundaries.
 * Returning `null` initially ensures server and client markup agree.
 */
export function useCountdown(target: string) {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const targetTime = new Date(target).getTime();

    if (Number.isNaN(targetTime)) {
      return;
    }

    let timeoutId: number | undefined;

    const tick = () => {
      const nextValue = getCountdownValue(targetTime, Date.now());
      setCountdown((currentValue) =>
        isSameCountdown(currentValue, nextValue) ? currentValue : nextValue,
      );

      if (!nextValue.isComplete) {
        const timeToNextSecond = second - (Date.now() % second) + 16;
        timeoutId = window.setTimeout(tick, timeToNextSecond);
      }
    };

    tick();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [target]);

  return countdown;
}
