# ADR-0001: Server-first landing-page foundation

**Status:** Accepted  
**Date:** 2026-10-07  
**Deciders:** Project team

## Context

The site will grow into a cinematic, responsive Durga Puja landing page. It needs a stable content model and clear section boundaries, without making the first implementation dependent on a large client-side visual system.

## Decision

Use the Next.js App Router with server-rendered layout, content sections, and UI primitives by default. Isolate interaction and motion in small client components under `src/components/effects`. Keep dates, labels, navigation, countdown configuration, and footer copy in `src/data/festival.ts`.

## Options Considered

### Option A: Server-first sections with isolated client effects

| Dimension | Assessment |
| --- | --- |
| Complexity | Low |
| Performance | High |
| Scalability | High |
| Team familiarity | High |

**Pros:** Small client boundary, clear content ownership, easy future section growth.  
**Cons:** Interactions must be deliberately introduced where needed.

### Option B: One client-rendered page shell

| Dimension | Assessment |
| --- | --- |
| Complexity | Medium |
| Performance | Medium |
| Scalability | Medium |
| Team familiarity | High |

**Pros:** Convenient for immediate prototype animation.  
**Cons:** Makes static content and layout part of the client bundle unnecessarily.

## Consequences

- New content sections can remain server components unless they own interaction.
- Heavy visuals, including any future Three.js scene, should be dynamically imported by the individual section that proves its value.
- Festival information changes in one typed configuration file.
