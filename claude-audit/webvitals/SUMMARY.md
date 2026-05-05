# PageSpeed Insights — onestopoutdoorconstruction.com

**Captured:** 2026-05-05 12:48 PM CDT
**Test ID:** nm9yly65j2
**Source:** https://pagespeed.web.dev/analysis/https-onestopoutdoorconstruction-com/nm9yly65j2

> **Field data (CrUX / real users):** No Data. Site has insufficient real-user traffic for Chrome UX Report. All numbers below are **lab data** (Lighthouse 13.0.1 in headless Chromium).

---

## Scores at a glance

| Category | Mobile | Desktop |
|---|---|---|
| **Performance** | 71 (orange) | 94 (green) |
| **Accessibility** | 83 (orange) | 83 (orange) |
| **Best Practices** | 96 (green) | 100 (green) |
| **SEO** | 100 (green) | 100 (green) |

## Core Web Vitals (lab)

| Metric | Mobile | Desktop | Threshold (good) |
|---|---|---|---|
| First Contentful Paint (FCP) | 1.4 s ✅ | 0.4 s ✅ | <1.8 s |
| **Largest Contentful Paint (LCP)** | **7.7 s 🔴** | **1.3 s 🟠** | <2.5 s |
| Total Blocking Time (TBT) | 10 ms ✅ | 0 ms ✅ | <200 ms |
| Cumulative Layout Shift (CLS) | 0 ✅ | 0.002 ✅ | <0.1 |
| Speed Index | 5.5 s 🟠 | 1.7 s 🟠 | <3.4 s |

**Mobile LCP at 7.7 s is the single biggest issue.** Desktop is healthy; mobile is not.

---

## Root cause #1 — `/logos/main_logo.png`

The hero logo PNG is the dominant problem. PSI flagged it on both form factors:

- **File size:** ~1,120 KiB (mobile shows 1,628 KiB total transfer for the URL row)
- **Natural dimensions:** 4660 × 2052 pixels
- **Displayed dimensions:** 36 × 16 pixels (desktop), small on mobile too
- **Estimated savings:** 1,120 KiB on this one file alone
- **Fix:** Export logo at 2x display size (~80 px wide), use SVG if vector available, or use Next.js `<Image>` with proper `sizes`. Should drop to <10 KiB.

This file accounts for ~75% of the "Improve image delivery" savings (1,471 KiB mobile / 1,959 KiB desktop).

---

## Failing audits — Mobile (14 fails / 1 warn / 108 pass)

### Performance — Insights
1. **Render blocking requests** — Est savings 450 ms. Two CSS chunks (`cb405127ce1c4fce.css` 2.2 KiB / 150 ms, `fbf09151821e38fe.css` 17.3 KiB / 600 ms) blocking initial render.
2. **Improve image delivery** — Est savings **1,471 KiB**. Driven by `/logos/main_logo.png` plus oversized service tile images (Roofing Services, Outdoor Kitchens, etc. served at 750×561 but displayed at 370×654 / 370×370).
3. **Legacy JavaScript** — Est savings 14 KiB. Polyfills shipped that modern browsers don't need.
4. **Forced reflow** — JS reading layout properties after DOM mutations.
5. **LCP breakdown** — High Time to First Byte / load delay component.
6. **LCP request discovery** — LCP image not discoverable from HTML immediately (likely needs `fetchpriority="high"` and removal of `loading="lazy"` if present on the LCP image).
7. **Network dependency tree** — Critical request chain too long.
8. **Reduce unused JavaScript** — Est savings 46 KiB.

### Accessibility (Mobile + Desktop, score 83)
9. **Select elements do not have associated label elements** — `<select name="service">` and `<select name="timeline">` in the estimate form. Add `<label for="...">` or `aria-label`.
10. **Elements use prohibited ARIA attributes** — `<span aria-label="Done Right.">` on a presentational span (the headline accent). Remove `aria-label` from non-interactive spans.
11. **Background and foreground colors do not have a sufficient contrast ratio** — "No cost. No obligation. Fast response." (`text-slate-400` on white) and `(optional)` field hints fail WCAG AA.
12. **Links rely on color to be distinguishable** — The "QuickLaunchWeb" footer link uses `text-white/50` with no underline; can't be distinguished from surrounding white text.
13. **Heading elements are not in a sequentially-descending order** — Heading levels skip (e.g., `<h1>` → `<h3>`).

### Mobile-only / image
14. **Image elements do not have explicit width and height** (warn) — Causes potential CLS; Next.js `<Image>` with fill needs explicit dimensions on parent.
15. **Displays images with incorrect aspect ratio** — Image natural ratio doesn't match display ratio.

---

## Failing audits — Desktop (12 fails / 7 warn)

Desktop has the same accessibility and image-delivery issues. Differences from mobile:
- **Render blocking requests** drops from fail → warn (10 ms only)
- **Avoid enormous network payloads** flags total size of **3,201 KiB**
- **Legacy JavaScript** is warn instead of fail
- LCP is 1.3 s (just over the 2.5 s green threshold but the **score** is amber because PSI uses both LCP and Speed Index)

---

## Prioritized fix list (impact × effort)

| # | Fix | Impact | Effort |
|---|---|---|---|
| 1 | Replace `/logos/main_logo.png` with properly sized SVG/PNG (≤10 KiB) | 🔥 Massive — likely takes mobile LCP from 7.7 → ~3 s | Trivial |
| 2 | Add `fetchpriority="high"` and remove any `loading="lazy"` from the LCP image | 🔥 Large | Trivial |
| 3 | Resize service tile images to actual displayed size (370px wide, not 750px) | 🔥 Large | Easy |
| 4 | Add `aria-label` (or wrap in `<label>`) on `<select name="service">` and `<select name="timeline">` | 🟠 Medium (a11y +5 to ~88) | Trivial |
| 5 | Bump `text-slate-400` hint text to `text-slate-600` for AA contrast | 🟠 Medium (a11y) | Trivial |
| 6 | Underline footer "QuickLaunchWeb" link or change color | 🟠 Medium (a11y) | Trivial |
| 7 | Remove `aria-label="Done Right."` from `<span>` accent | 🟢 Small | Trivial |
| 8 | Fix heading hierarchy (no skipping levels) | 🟢 Small | Easy |
| 9 | Inline critical CSS or preload the two render-blocking CSS chunks | 🟢 Small (~450 ms mobile) | Medium |
| 10 | Tree-shake legacy polyfills (modern build target) | 🟢 Small (14 KiB) | Medium (build config) |

Fixing items 1–3 alone should take mobile Performance from 71 → 90+.

---

## Files in this folder

- `mobile-data.json` — full audit list (123 audits, all statuses) for mobile
- `desktop-data.json` — full audit list for desktop
- `mobile-01-scores.png` — overall scores (Performance 71)
- `mobile-02-perf-metrics.png` — Core Web Vitals values (LCP 7.7 s)
- `mobile-03-filmstrip.png` — load filmstrip + start of insights
- `mobile-04-insights.png` — image delivery details (service tiles)
- `mobile-full.png` — full-page screenshot (compressed by Playwright)
- `desktop-01-scores.png` — overall scores (Performance 94)
- `desktop-02-perf-metrics.png` — Core Web Vitals values (LCP 1.3 s)
- `desktop-03-insights.png` — `/logos/main_logo.png` 2,511 KiB at 36×16 px
- `desktop-04-accessibility.png` — `<select>` label failures
- `desktop-05-accessibility-cont.png` — ARIA + contrast failures
- `desktop-06-contrast-headings.png` — footer link / contrast issues
- `desktop-07-headings-images.png` — passed/manual a11y audits
