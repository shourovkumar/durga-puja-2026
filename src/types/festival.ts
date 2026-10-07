export type FestivalDate = {
  readonly id: string;
  readonly label: string;
  readonly date: string;
  readonly isoDate: `${number}-${number}-${number}`;
  readonly description: string;
};

export type PujaJourneyTone =
  | "mahalaya"
  | "shashthi"
  | "saptami"
  | "ashtami"
  | "navami"
  | "dashami";

export type PujaJourneyArtwork = {
  /** A transparent label for the styled reserve until commissioned art is available. */
  readonly reserveLabel: string;
  readonly motif: string;
  readonly sequence: string;
};

export type PujaJourneyMoment = FestivalDate & {
  readonly bengaliLabel: string;
  readonly tithi: string;
  readonly tone: PujaJourneyTone;
  readonly artwork: PujaJourneyArtwork;
};

export type FestivalNavigationItem = {
  readonly label: string;
  readonly href: `#${string}`;
};

export type FestivalFooter = {
  readonly description: string;
  readonly legalLine: string;
  readonly contactLabel: string;
  readonly contactHref: `mailto:${string}`;
};

export type FestivalDiya = {
  readonly sectionLabel: string;
  readonly actionLabel: string;
  readonly supportingText: string;
  readonly greeting: string;
  readonly devotion: string;
  readonly replayLabel: string;
};

export type FestivalSeo = {
  readonly title: string;
  readonly description: string;
  readonly siteName: string;
  readonly keywords: readonly string[];
  readonly openGraphLocale: string;
  /** Expected public path for the commissioned social-preview artwork. */
  readonly socialPreviewPath: `/${string}`;
  readonly socialPreviewAlt: string;
};

export type FestivalConfig = {
  readonly name: string;
  readonly year: number;
  readonly shortName: string;
  readonly location: string;
  readonly timezone: string;
  readonly navigation: readonly FestivalNavigationItem[];
  readonly hero: {
    readonly seasonLabel: string;
    readonly arrivalTitle: string;
    readonly supportingTitle: string;
    readonly artworkReserveLabel: string;
  };
  readonly countdown: {
    readonly target: string;
    readonly label: string;
    readonly displayDate: string;
  };
  readonly pujaJourney: readonly PujaJourneyMoment[];
  readonly importantDates: readonly FestivalDate[];
  readonly pujaDays: readonly FestivalDate[];
  readonly diya: FestivalDiya;
  readonly footer: FestivalFooter;
  readonly seo: FestivalSeo;
};
