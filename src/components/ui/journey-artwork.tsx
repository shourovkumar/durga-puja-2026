import Image, { type StaticImageData } from "next/image";

import type { PujaJourneyMoment } from "@/types/festival";
import { cn } from "@/lib/cn";

type JourneyArtworkProps = {
  /** Optional optimized art import for this individual Puja moment. */
  readonly artwork?: StaticImageData;
  readonly alt?: string;
  readonly className?: string;
  readonly moment: PujaJourneyMoment;
};

/**
 * A deliberately abstract visual reserve. It gives each story moment a refined
 * place for future commissioned artwork without impersonating photography.
 */
export function JourneyArtwork({ artwork, alt, className, moment }: JourneyArtworkProps) {
  return (
    <div
      className={cn("journey-artwork", className)}
      data-tone={moment.tone}
    >
      {artwork ? (
        <Image
          alt={alt ?? `${moment.label} artwork for Durga Puja 2026`}
          className="journey-artwork__image"
          fill
          sizes="(min-width: 64rem) 31vw, (min-width: 42rem) 38vw, 100vw"
          src={artwork}
        />
      ) : (
        <div aria-hidden="true" className="journey-artwork__reserve">
          <span className="journey-artwork__ray journey-artwork__ray--one" />
          <span className="journey-artwork__ray journey-artwork__ray--two" />
          <span className="journey-artwork__ring journey-artwork__ring--outer" />
          <span className="journey-artwork__ring journey-artwork__ring--inner" />
          <span className="journey-artwork__arch" />
          <span className="journey-artwork__sequence">{moment.artwork.sequence}</span>
          <span className="journey-artwork__motif">{moment.artwork.motif}</span>
          <span className="journey-artwork__reserve-label">{moment.artwork.reserveLabel}</span>
        </div>
      )}
    </div>
  );
}
