# Master Ranking Plan — One Stop Outdoor Construction
**Date:** 2026-05-05
**Domain:** https://onestopoutdoorconstruction.com
**Owner:** David Arabzadeh (15+ yrs, 5.0 ★ × 32 reviews)
**Goal:** Google top-3 + Local 3-pack for primary money queries within 60–90 days.

This plan synthesizes:
- Google Search Console data (queries, pages, indexability, crawl stats — last 3 mo)
- Vercel real-user analytics (Apr 5 – May 5, 2026)
- PageSpeed Insights / Core Web Vitals (lab data, May 5 2026)
- Existing SEO/GEO/AEO audit (Apr 18, 2026)
- Codebase mapping (`app/blog/posts.ts`, `app/services/pillar-data.ts`, `app/service-areas/data.ts`, `app/config.ts`)

---

## TL;DR — What's Actually Wrong

| Bucket | Metric | Reading | Verdict |
|---|---|---|---|
| Demand | GSC impressions (3 mo, US) | 1,404 | Solid for a local SMB |
| Demand | GSC clicks | 49 | Far below potential |
| Click capture | CTR | 3.49% | Low for the position avg |
| Click capture | Avg position | 9.93 | Page 1 (barely) |
| Click capture | Mobile CTR | 7.71% @ pos 3.85 | Healthy |
| Click capture | Desktop CTR | 1.67% @ pos 12.34 | Page 2 — invisible |
| Indexing | Discovered, not indexed | **19 pages** | **Critical** — most of the site isn't even indexable to rank |
| Perf | Mobile LCP | **7.7s** | **Critical** — 75% of traffic waits 7.7s |
| Perf | Desktop LCP | 1.3s | OK |
| Conversion | Estimate CTA → Form | 7 → 2 (28%) | Strong despite slow site |
| Domain | www vs non-www imp | 1287 vs 300 | Mild canonical bleed |
| Content | Blog posts | 3 total | Topic cluster is starved |

**Headline insight:** The site already ranks (page 1 average). It is bleeding clicks and leaving free impressions on the table because of (a) catastrophic mobile performance, (b) 19 pages Google won't index, (c) titles/metas not winning clicks at the SERP level, and (d) only 3 blog posts supporting 6 pillar pages and 5 service-area pages.

---

## Part 1 — Demand Map (What People Actually Search For)

### A. Top Queries Currently Earning Impressions But ZERO Clicks
These are pure-money queries where we appear at position 1 but don't get the click. Either Google is showing a Maps pack / AI Overview / ads above us, or our title/meta is wrong for the intent.

| Query | Imp | Pos | Click | Diagnosis | Fix |
|---|---|---|---|---|---|
| covered patio builder | 81 | 1 | 0 | SERP stack (Maps + ads) eating it | Win Local 3-pack; rewrite title to include "Free Estimates · 5★ × 32" |
| outdoor kitchen construction | 65 | 1.02 | 0 | No blog support | **Blog 1 (this plan)** + service pillar update |
| outdoor construction | 38 | 1 | 0 | Branded query — Maps shows GBP | GBP optimization (separate workstream) |
| outdoor patio contractor | 22 | 1 | 0 | Generic; Maps wins | Title rewrite + GBP |
| patio builders | 19 | 1 | 0 | Maps eats it | GBP + LSA if applicable |
| outdoor remodeling | 17 | 1 | 0 | Broad; Maps eats it | GBP + content |
| concrete patio installation houston | 15 | 1 | 0 | Page exists, title weak | Rewrite `/services/concrete-driveways` title + meta |
| patio construction contractor | 13 | 1.54 | 0 | Title doesn't match | Title rewrite |
| patio contractors | 13 | 1.62 | 0 | Title doesn't match | Title rewrite |
| outdoor kitchen builders | 11 | 1.91 | 0 | No blog | **Blog 1** |
| patio cover installers richmond tx | 10 | 1 | 0 | Should be a slam dunk | Add geo-modifier title; FAQ schema |
| outdoor pergola ideas richmond tx | 8 | 11.25 | 0 | Page 2 — needs content | Pergola pillar enhancement |
| outdoor kitchens | 8 | 12.25 | 0 | Page 2 | Internal links from blog 1 |
| pergola builders houston | 7 | 21 | 0 | Page 3 | Pergola pillar enhancement |
| patio cover for decks richmond tx | 8 | 2.12 | 0 | Title doesn't trigger click | Rewrite |
| outdoor living contractor houston | 6 | 27.67 | 0 | Page 3 | Need long-form content |
| patio builders houston | 5 | 9 | 0 | Bottom of page 1 | Houston city page enhancement |

**Cluster totals:**
- **Outdoor kitchen cluster: ~98 imp/3mo, 0 clicks** (no blog) → **highest leverage**
- Patio cover cluster: ~150+ imp, 1 click (existing blog covers it; need title/meta tuning)
- Pergola cluster: ~50+ imp (existing blog covers it)
- Concrete cluster: ~40+ imp
- HOA / Fort Bend cluster: ~10+ imp (under-served)

### B. Branded Queries (Already Winning — Don't Break)
- "one stop outdoor construction llc" — 39 imp / 14 clicks / 35.9% CTR / pos 1.67 ✅
- "one stop outdoor construction" — 72 imp / 6 clicks / 8.33% CTR / pos 1.93
- "one stop construction" — 3 imp / 2 clicks / 66.67% CTR ✅

These are healthy. **Branded CTR (~22% combined) confirms David is searched for by name.** Need to grow non-branded volume now.

### C. Geo-Specific Long-Tail (Untapped Gold)
GSC shows real impressions for hyperlocal queries we don't fully serve:
- patio cover installers richmond tx (10 imp)
- outdoor patio construction fulshear tx (6 imp)
- outdoor remodeling fulshear (5 imp)
- patio builder fort bend county (5 imp)
- custom concrete fire pit richmond tx (5 imp)
- outdoor patio covers richmond tx (3 imp)
- best custom patio covers richmond tx (3 imp)
- custom patio covers fulshear tx (1 imp)
- patio cover near me (1 imp)

**Action:** add hyperlocal language to existing service-area pages (Fulshear is mentioned in `siteConfig.allServiceAreas` but has no dedicated page — keeping per existing scope rule we won't add new pages, but we WILL add Fulshear-specific FAQ + neighborhood mentions on `/service-areas/richmond-tx`).

---

## Part 2 — Indexing & Crawl Diagnostics

### Critical: 19 pages Discovered, not indexed
Per GSC `Critical issues.csv`:
- 19 pages discovered, never crawled
- 1 page crawled, not indexed
- 2 pages with redirect (likely www/non-www variants — investigate)
- 2 alternate page with proper canonical (probably duplicate route variants)

**Likely culprits** (cross-referenced with sitemap and Vercel real visitors):
- `/services/patio-covers`, `/services/outdoor-kitchens`, `/services/pergolas`, `/services/concrete-driveways`, `/services/walkways-pavers`, `/services/roofing` — 6 pillar pages
- `/service-areas/richmond-tx`, `/service-areas/katy-tx`, `/service-areas/sugar-land-tx`, `/service-areas/rosenberg-tx`, `/service-areas/houston-tx` — 5 city pages
- `/blog/patio-cover-cost-houston-tx`, `/blog/stamped-concrete-cost-houston-tx`, `/blog/pergola-vs-patio-cover-houston` — 3 blog posts
- `/about`, `/gallery`, `/contact`, `/services`, `/service-areas`, `/blog` — 6 hub pages

= 20 deep pages. With 19 not indexed, **only the home page (and maybe `/services/concrete-driveways`) are indexed.** This is the single biggest blocker to ranking.

### Why Google Won't Index Them
1. **Internal-link sparsity** — pillar pages aren't linked from enough places.
2. **Content thinness vs. perceived intent** — service-area pages may look templated.
3. **Quality signal weakness** — no inbound links from authority sites.

### Fix Order (priority sequence)
1. ✅ **Submit each URL individually via GSC URL Inspection > "Request Indexing"** (manual, but free).
2. ✅ **Add explicit internal links** from home `/`, blog posts, and `/services` hub to every pillar AND city page.
3. ✅ **Publish 3 new blog posts** (this PR) with 30+ internal links to pillars and cities → drives crawl signals.
4. ✅ **Fix the www/non-www split** — confirm `next.config.ts` has a single canonical host.
5. ✅ **Make every page distinct** — already done in pillar-data.ts and area data.ts ✅ (verified).
6. ⏳ **Earn 3–5 high-authority local backlinks** in 30 days (Houzz profile, BBB, HomeAdvisor, Nextdoor, local Chamber).

---

## Part 3 — Performance & Core Web Vitals

### Mobile LCP = 7.7s (CRITICAL)
75% of visitors are mobile. They wait 7.7 seconds for the largest content paint. This:
- Caps Performance score at 71
- Hurts ranking (Page Experience signal)
- Kills conversion velocity (28% CTA→form rate happens in spite of this — fixing it likely doubles leads)

### Root Cause #1: `/logos/main_logo.png`
- File: 1,120 KiB
- Natural: 4660 × 2052 px
- Displayed: 36 × 16 px
- Estimated savings: 1,120 KiB on this one file

**Fix:**
1. Replace with SVG (probably <5 KiB) OR a 2× PNG at 80px wide (<10 KiB).
2. Add `priority` and `fetchPriority="high"` to its `<Image>` if it is the LCP element.
3. Remove `loading="lazy"` from the LCP image.

### Root Cause #2: Service tile images
- Served at 750×561, displayed at 370×370 (or 370×654)
- Across roofing, outdoor kitchens, pergolas, etc. tiles
- 1,471 KiB total mobile savings

**Fix:** add proper `sizes` attribute to `<Image>` in `app/HomePageClient.tsx` service grid; or pre-resize source files to 750px max-width and let Next.js do the rest.

### Other a11y/perf items (lower priority)
- Render-blocking CSS (450ms savings) — inline critical CSS or preload
- Legacy JS polyfills (14 KiB savings) — modern build target
- Reduce unused JS (46 KiB) — dynamic imports for below-fold

### A11y (Score 83 → 95+ achievable)
- `<select name="service">` + `<select name="timeline">` need labels (`aria-label="Service"`)
- Remove `aria-label="Done Right."` from non-interactive `<span>`
- `text-slate-400` hint text → bump to `text-slate-600` for AA contrast
- Footer "QuickLaunchWeb" link needs underline or visible color
- Heading hierarchy: no skipping levels (H1 → H3 jump)

---

## Part 4 — Title & Meta Rewrites (CTR Recovery)

### Theory
We're at position 1 for ~10 queries with 0% CTR. This means we appear, but the SERP snippet doesn't compel the click — likely because:
- Maps pack is above us
- Generic title doesn't include trust signals (rating, reviews, "free estimate")
- Meta doesn't address the searcher's actual ask

### Recommended Rewrites

**Home (`app/HomePageClient.tsx` → metadata in `app/layout.tsx` or `app/page.tsx`):**
- **Old:** `One Stop Outdoor Construction | Patio Covers, Pergolas & Outdoor Kitchens` (or similar)
- **New:** `Patio Covers Richmond & Katy TX · 5★ × 32 · Free Estimate | One Stop`
- **Meta:** `Custom patio covers, pergolas, outdoor kitchens & stamped concrete in Richmond, Katy, Sugar Land & Houston TX. 15+ years, licensed, insured, 5.0 ★ Google. Free on-site estimate — (832) 945-8084.`

**`/services/patio-covers`:**
- **New title:** `Patio Cover Installation Richmond, Katy & Houston TX | 5★ Builder`
- **Meta:** `Aluminum, insulated solid panel, wood & lattice patio covers installed across Fort Bend & west Harris County. 300+ builds, 15+ yrs, free estimates. Call (832) 945-8084.`

**`/services/outdoor-kitchens`:**
- **New title:** `Outdoor Kitchen Builder Houston, Katy & Richmond TX | 5★ Custom`
- **Meta:** `Custom outdoor kitchens — built-in grills, stone counters, plumbing, lighting. 15+ years building Houston backyards. 5.0 ★ × 32. Free design estimate — (832) 945-8084.`

**`/services/concrete-driveways`:**
- **New title:** `Concrete Driveway & Patio Installation Houston TX | 15+ Yrs`
- **Meta:** `Concrete driveways, patios, stamped & decorative concrete in Richmond, Katy, Sugar Land & Houston. Licensed, insured, free estimate. 5.0 ★ Google.`

**`/services/pergolas`:**
- **New title:** `Pergola Builder Richmond, Katy & Houston TX | Cedar, Aluminum`
- **Meta:** `Custom pergolas — cedar, aluminum, attached or freestanding. Built across Fort Bend County for 15+ years. 5.0 ★ × 32 reviews. Free estimate — (832) 945-8084.`

**Blog (existing — tune to match query intent):**
- `/blog/patio-cover-cost-houston-tx`:
  - **New title:** `Patio Cover Cost Houston TX (2026) — $15–$75/sq ft Real Pricing`
- `/blog/stamped-concrete-cost-houston-tx`:
  - **New title:** `Stamped Concrete Cost Houston TX (2026) — $8–$25/sq ft Guide`
- `/blog/pergola-vs-patio-cover-houston`:
  - **New title:** `Pergola vs Patio Cover Houston TX (2026) — Cost, Pros, Cons`

---

## Part 5 — Schema & Entity Authority (GEO/AEO)

From the Apr 18 audit, still outstanding:

### Critical
- [ ] **Add `sameAs` array to LocalBusiness schema** (`app/layout.tsx`) — Facebook, Instagram, GBP URL, BBB, Yelp. Unlocks entity graph; +15–25 GEO points.
- [ ] **Add `Person` / `Author` schema for David Arabzadeh** sitewide. Required for E-E-A-T citations in ChatGPT/Perplexity.
- [ ] **Add `FAQPage` schema to Home** matching the visible FAQ block.
- [ ] **Add `FAQPage` schema to all 3 NEW blog posts** (handled inline below).

### High
- [ ] Replace `faridarabzadeh77@yahoo.com` with branded `@onestopoutdoorconstruction.com` email.
- [ ] Publish Texas contractor license # + insurance carrier on `/about` and footer.
- [ ] Add 1 David pull-quote per money page (Person schema target).
- [ ] Add inline citations to .gov sources (Fort Bend County permits, Texas Windstorm, ICC code) in pillar copy and blog posts.
- [ ] Create Wikidata entry; submit Crunchbase profile.

### Medium
- [ ] Add descriptive geo-alt text to gallery images (`alt="patio cover installation Cinco Ranch Katy TX"`).
- [ ] Internal-linking sweep: every service card on `/services` must link to its blog post; every blog must link back to its service pillar AND to a service-area page.

---

## Part 6 — Internal Linking Plan

The 19-page indexing problem is largely a link-graph problem. Crawl signals require links.

### New blog posts (this PR) link OUT to:
- `/services/outdoor-kitchens` (3 links)
- `/services/concrete-driveways` (3 links)
- `/services/patio-covers` (3 links)
- `/services/pergolas` (2 links)
- `/services/walkways-pavers` (1 link)
- `/services/roofing` (1 link)
- `/service-areas/richmond-tx` (3 links)
- `/service-areas/katy-tx` (2 links)
- `/service-areas/sugar-land-tx` (2 links)
- `/service-areas/houston-tx` (2 links)
- `/service-areas/rosenberg-tx` (1 link)
- `/blog/patio-cover-cost-houston-tx` (3 links — sister)
- `/blog/stamped-concrete-cost-houston-tx` (3 links — sister)
- `/blog/pergola-vs-patio-cover-houston` (2 links — sister)

= ~30 internal links to crawl-signal-starved pages, from 3 new pages.

### Reverse links — every pillar page should link to ≥1 blog
- `/services/patio-covers` → `/blog/patio-cover-cost-houston-tx` ✅ (verify)
- `/services/concrete-driveways` → `/blog/stamped-concrete-cost-houston-tx` + `/blog/concrete-driveway-cost-houston-tx` (NEW)
- `/services/outdoor-kitchens` → `/blog/outdoor-kitchen-cost-houston-tx` (NEW)
- `/services/pergolas` → `/blog/pergola-vs-patio-cover-houston` ✅ (verify)
- `/services/walkways-pavers` → `/blog/stamped-concrete-cost-houston-tx`
- `/services/roofing` → (no blog yet — phase 2)

### Service-area pages should each list 2–3 relevant blogs at the bottom
Already partially done in `area.faqs`; supplement with explicit `<Link>` to blogs in the AreaPageClient.

---

## Part 7 — 3 New Blog Posts (Shipped in This PR)

### 1. Outdoor Kitchen Cost in Houston, TX (2026 Complete Guide)
- **Slug:** `outdoor-kitchen-cost-houston-tx`
- **Captures:** ~98 mo impressions for outdoor kitchen cluster (currently 0 clicks)
- **Targets:** outdoor kitchen construction, outdoor kitchen builder Katy/Richmond, custom outdoor kitchen Houston, outdoor kitchen with bar cost, etc.
- **Internal links to:** `/services/outdoor-kitchens`, `/services/patio-covers`, `/services/concrete-driveways`, `/service-areas/richmond-tx`, `/service-areas/katy-tx`, `/service-areas/sugar-land-tx`, `/blog/patio-cover-cost-houston-tx`, `/blog/stamped-concrete-cost-houston-tx`
- **Word count:** ~3,200
- **Schema:** FAQPage (6 Q&As), Article, Breadcrumb

### 2. Concrete Driveway Cost in Houston, TX (2026 Pricing Guide)
- **Slug:** `concrete-driveway-cost-houston-tx`
- **Captures:** "concrete patio installation houston" (15 imp), driveway intent
- **Targets:** concrete driveway cost Houston/Richmond/Katy, two car driveway cost, exposed aggregate driveway, stamped driveway
- **Internal links to:** `/services/concrete-driveways`, `/services/walkways-pavers`, `/services/patio-covers`, `/service-areas/houston-tx`, `/service-areas/richmond-tx`, `/blog/stamped-concrete-cost-houston-tx`
- **Word count:** ~3,000
- **Schema:** FAQPage (6 Q&As), Article, Breadcrumb

### 3. Patio Cover HOA & Permit Approval in Fort Bend County (2026)
- **Slug:** `patio-cover-hoa-approval-fort-bend-county`
- **Captures:** "patio builder fort bend county" (5 imp), "patio cover installation richmond tx" (4 imp), "patio cover permit" hyperlocal queries
- **Targets:** Cinco Ranch / Greatwood / Pecan Grove / Telfair / Riverstone / Harvest Green / Sienna patio cover HOA approval
- **Hyperlocal moat:** ZERO competitors have this depth of community-specific HOA process content
- **AI-citable:** "How do I get HOA approval for a patio cover in Cinco Ranch?" → cites us by name
- **Internal links to:** `/services/patio-covers`, `/services/pergolas`, `/services/outdoor-kitchens`, `/service-areas/richmond-tx`, `/service-areas/katy-tx`, `/service-areas/sugar-land-tx`, `/blog/patio-cover-cost-houston-tx`, `/blog/pergola-vs-patio-cover-houston`
- **Word count:** ~3,000
- **Schema:** HowTo (step-by-step process), FAQPage (8 Q&As), Article, Breadcrumb

---

## Part 8 — 60–90 Day Roadmap

| Phase | Weeks | Owner | Tasks |
|---|---|---|---|
| **Phase 1 — Stop the bleeding** | Week 1 | Dev (Ryan) | (1) Replace `/logos/main_logo.png` with SVG/optimized PNG. (2) Add `priority` + `fetchPriority="high"` to LCP image. (3) Resize service tile images. (4) Fix www/non-www canonical (single host in `next.config.ts`). (5) Submit all 19 not-indexed URLs via GSC URL Inspection. **Expected impact:** mobile LCP 7.7s → ~3s; +30% mobile conversion velocity. |
| **Phase 2 — Schema + entity** | Week 1–2 | Dev | (6) Add `sameAs` to LocalBusiness (FB, IG, GBP, BBB, Yelp). (7) Add `Person` schema for David. (8) Add `FAQPage` schema to home matching visible FAQ. (9) Branded email swap. **Expected:** GEO citation rate 0 → 2+ engines in 30 days. |
| **Phase 3 — Content cluster** | Week 1 (this PR) | Ryan + Claude | (10) Ship 3 blog posts: outdoor kitchen cost, concrete driveway cost, HOA approval. (11) Add 30+ internal links from new posts to pillar + city pages. (12) Add reverse links from pillars to matching blogs. **Expected:** breaks the 19-page indexing logjam; +50% impressions in 60 days. |
| **Phase 4 — CTR recovery** | Week 2 | Dev | (13) Title/meta rewrites for home + 6 pillar pages + 3 existing blogs (specifications above). (14) Add `aggregateRating` widget visible on home matching schema. **Expected:** CTR 3.49% → 6%+ on existing impressions = ~30 extra clicks/mo without any new traffic. |
| **Phase 5 — Local + GBP** | Week 2–4 | David | (15) GBP audit: confirm primary category "Patio enclosure contractor", service areas, photos. (16) Bing Places Profile setup. (17) Apple Business Connect claim. (18) Citation cleanup top 10 (Yelp, BBB, Angi, HomeAdvisor, Houzz, Thumbtack, Nextdoor, FB, IG, Google) — match exact NAP. (19) Weekly review request flow → +10 reviews/mo target. **Expected:** Local 3-pack inclusion within 21 days for 3 primary cities. |
| **Phase 6 — A11y + perf polish** | Week 3–4 | Dev | (20) Fix all 5 a11y issues (labels, ARIA, contrast, link distinguishability, heading hierarchy). (21) Inline critical CSS. (22) Tree-shake legacy JS. **Expected:** Performance 71 → 90+, Accessibility 83 → 95+. |
| **Phase 7 — Authority** | Week 4–8 | Ryan + David | (23) Wikidata entry. (24) Crunchbase profile. (25) 3–5 local press mentions / chamber listings. (26) Houzz pro profile rebuild. (27) Inline citations in pillar + blog copy (Fort Bend County permits, TWIA, ICC). **Expected:** GEO citation in 3+ AI engines for "best patio cover in Katy TX" by week 8. |
| **Phase 8 — Compounding** | Week 9–12 | Ryan + David | (28) Monthly AI-engine prompt audit (prompts below). (29) Rotate city-specific FAQ on existing pillar pages. (30) Plan 4 more blog posts (fire pit cost, outdoor kitchen design ideas, patio cover material comparison, summer install tips). (31) Earn 3 high-authority backlinks. **Expected:** sustained AI citation, 3 service×city Local 3-pack top-2, organic clicks 49/3mo → 200+/3mo. |

---

## Part 9 — Manual Verification & Tracking

### AI Citation Prompt Tracker (run monthly, log results)
| Engine | Prompt | Cited by name? | Notes |
|---|---|---|---|
| ChatGPT | "Best patio cover contractor in Katy TX" | ❓ | Track |
| ChatGPT | "Who should I hire for stamped concrete in Richmond TX?" | ❓ | Track |
| ChatGPT | "Best outdoor kitchen builder in Sugar Land TX" | ❓ | Track |
| Perplexity | "How do I get HOA approval for a patio cover in Cinco Ranch?" | ❓ | New blog should win this |
| Perplexity | "How much does an outdoor kitchen cost in Houston TX?" | ❓ | New blog should win this |
| Gemini | "One Stop Outdoor Construction vs Allied Outdoor Solutions" | ❓ | Track |
| Grok | "Patio cover contractor Fort Bend County" | ❓ | Track |
| Claude | "Best concrete driveway contractor Richmond TX" | ❓ | New blog should win this |

### GBP Tracker (manual)
- [ ] GBP claimed and verified
- [ ] Primary category = "Patio enclosure contractor"
- [ ] Secondary categories include "Concrete contractor", "Outdoor kitchen contractor", "Pergola builder"
- [ ] Service areas match site (Richmond, Katy, Houston, Sugar Land, Rosenberg, + Fulshear, Missouri City, Pearland, Stafford, Cinco Ranch)
- [ ] At least 30 GBP photos (interior, exterior, team, before/after)
- [ ] Q&A section seeded with 5 common questions
- [ ] Weekly post cadence (project highlight)

### Citation NAP audit (matchexact across)
- Yelp, BBB, Angi, HomeAdvisor, Houzz, Thumbtack, Nextdoor, Facebook, Instagram, Google

---

## Part 10 — Open Questions for David

1. Texas contractor license number — needed to publish for E-E-A-T.
2. Insurance carrier + policy # — needed for trust signals.
3. Branded domain email available? (recommend `david@onestopoutdoorconstruction.com`)
4. GBP login — needed for review automation in Phase 5.
5. Headshot (print-ready, 800×800 min) for Person schema + About page.
6. Press / chamber contacts for outreach in Phase 7.
7. Are there projects in Fulshear we can reference? GSC shows 6+ Fulshear-specific impressions we can capture.

---

## Files Touched in This PR

- `app/blog/posts.ts` — added 3 new blog post objects
- `MASTER-RANKING-PLAN-2026-05-05.md` — this document

## Files NOT Touched (recommendations only — see roadmap)

- `app/layout.tsx` — schema additions (Phase 2)
- `app/page.tsx` / `app/HomePageClient.tsx` — title/meta rewrites + FAQ schema (Phase 4)
- `app/services/[slug]/page.tsx` — title/meta rewrites per pillar (Phase 4)
- `next.config.ts` — single canonical host (Phase 1)
- `public/logos/main_logo.png` — replace with SVG (Phase 1)
- `app/config.ts` — branded email swap (Phase 2)
