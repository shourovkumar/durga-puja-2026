import type { FestivalConfig, PujaJourneyMoment } from "@/types/festival";

/**
 * The complete narrative calendar lives here. Shorter date lists elsewhere in
 * the site are derived from this collection, so a festival detail is edited once.
 */
const pujaJourney = [
  {
    id: "mahalaya",
    label: "Mahalaya",
    bengaliLabel: "আগমনী",
    tithi: "The invocation",
    date: "10 October 2026",
    isoDate: "2026-10-10",
    description:
      "Before the first lamp is lit, the invocation carries Devi Durga home through a hush of dawn, memory, and anticipation.",
    tone: "mahalaya",
    artwork: {
      reserveLabel: "Mahalaya · visual study",
      motif: "The first call",
      sequence: "I",
    },
  },
  {
    id: "shashthi",
    label: "Maha Shashthi",
    bengaliLabel: "ষষ্ঠী",
    tithi: "Bodhon",
    date: "17 October 2026",
    isoDate: "2026-10-17",
    description:
      "At Bodhon, the sacred invitation is made. The city gathers its breath as the celebration opens in the soft light of evening.",
    tone: "shashthi",
    artwork: {
      reserveLabel: "Shashthi · visual study",
      motif: "The awakening",
      sequence: "II",
    },
  },
  {
    id: "saptami",
    label: "Maha Saptami",
    bengaliLabel: "সপ্তমী",
    tithi: "Prana Pratistha",
    date: "18 October 2026",
    isoDate: "2026-10-18",
    description:
      "Nabapatrika arrives with the morning. Ritual, river, and fragrance begin to move together in a richer red rhythm.",
    tone: "saptami",
    artwork: {
      reserveLabel: "Saptami · visual study",
      motif: "The living ritual",
      sequence: "III",
    },
  },
  {
    id: "ashtami",
    label: "Maha Ashtami",
    bengaliLabel: "অষ্টমী",
    tithi: "Anjali & Sandhi Puja",
    date: "19 October 2026",
    isoDate: "2026-10-19",
    description:
      "Anjali, incense, and the suspended stillness before Sandhi Puja turn the day luminous—devotion held in a single breath.",
    tone: "ashtami",
    artwork: {
      reserveLabel: "Ashtami · visual study",
      motif: "The luminous hour",
      sequence: "IV",
    },
  },
  {
    id: "navami",
    label: "Maha Navami",
    bengaliLabel: "নবমী",
    tithi: "The gathering",
    date: "20 October 2026",
    isoDate: "2026-10-20",
    description:
      "The final full day of worship gathers every voice around the pandal: warmth, prayer, and a night that feels endless.",
    tone: "navami",
    artwork: {
      reserveLabel: "Navami · visual study",
      motif: "The lasting night",
      sequence: "V",
    },
  },
  {
    id: "dashami",
    label: "Vijaya Dashami",
    bengaliLabel: "বিজয়া",
    tithi: "The farewell",
    date: "21 October 2026",
    isoDate: "2026-10-21",
    description:
      "Sindoor, blessings, and farewell linger together. The immersion leaves an afterglow of remembrance until the next homecoming.",
    tone: "dashami",
    artwork: {
      reserveLabel: "Dashami · visual study",
      motif: "The afterglow",
      sequence: "VI",
    },
  },
] as const satisfies readonly PujaJourneyMoment[];

/**
 * The site-wide festival record. Future sections should consume this object
 * instead of defining dates, labels, or festival copy locally.
 */
export const festival: FestivalConfig = {
  name: "Durga Puja",
  year: 2026,
  shortName: "Durga Puja ’26",
  location: "Bangladesh",
  timezone: "Asia/Dhaka",
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Mahalaya", href: "#journey-mahalaya" },
    { label: "Puja Days", href: "#journey-shashthi" },
    { label: "Moments", href: "#journey-ashtami" },
    { label: "Light the Diya", href: "#light-diya" },
    { label: "Wishes", href: "#wishes" },
  ],
  hero: {
    seasonLabel: "Sharadiya 1433",
    arrivalTitle: "মা আসছেন...",
    supportingTitle: "Durga Puja 2026",
    artworkReserveLabel: "Commissioned Durga artwork reserve",
  },
  countdown: {
    target: "2026-10-17T06:00:00+06:00",
    label: "Until Maha Shashthi",
    displayDate: "17 October 2026",
  },
  pujaJourney,
  importantDates: pujaJourney.filter(({ id }) =>
    ["mahalaya", "shashthi", "dashami"].includes(id),
  ),
  pujaDays: pujaJourney.filter(({ id }) => id !== "mahalaya"),
  diya: {
    sectionLabel: "A moment of light",
    actionLabel: "প্রদীপ জ্বালান",
    supportingText: "আলোর ছোঁয়ায় শুরু হোক উৎসব",
    greeting: "শুভ দুর্গাপূজা ২০২৬",
    devotion: "জয় মা দুর্গা",
    replayLabel: "আবার জ্বালান",
  },
  footer: {
    description: "A forthcoming digital ode to devotion, craft, and coming home.",
    legalLine: "Built with reverence for the festival.",
    contactLabel: "Festival contact",
    contactHref: "mailto:hello@durgapuja2026.com",
  },
  seo: {
    title: "Durga Puja 2026 — Sharadiya 1433",
    description:
      "An immersive digital celebration of Durga Puja 2026—an unfolding journey of devotion, ritual, and homecoming.",
    siteName: "Durga Puja 2026",
    keywords: ["Durga Puja 2026", "Sharadiya 1433", "Bengali festival"],
    openGraphLocale: "bn_BD",
    socialPreviewPath: "/og/durga-puja-2026-og.jpg",
    socialPreviewAlt: "Durga Puja 2026 — Sharadiya 1433",
  },
};
