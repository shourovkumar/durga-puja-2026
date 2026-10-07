import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/cn";

type HeroArtworkProps = {
  /** Pass a local, optimized Next.js image import once commissioned artwork is available. */
  readonly artwork?: StaticImageData;
  readonly alt?: string;
  readonly className?: string;
  readonly reserveLabel: string;
};

export function HeroArtwork({ artwork, alt, className, reserveLabel }: HeroArtworkProps) {
  return (
    <div className={cn("hero-artwork", className)}>
      {artwork ? (
        <Image
          alt={alt ?? "Durga Puja 2026 artwork"}
          className="hero-artwork__image"
          fill
          priority
          sizes="(min-width: 64rem) 48vw, 92vw"
          src={artwork}
        />
      ) : (
        <div aria-hidden="true" className="hero-artwork__reserve">
          <div className="hero-artwork__reserve-arch" />
          <span className="hero-artwork__reserve-label">{reserveLabel}</span>
        </div>
      )}
    </div>
  );
}
