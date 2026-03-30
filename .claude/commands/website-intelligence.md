---
name: website-intelligence
description: |
  Research-driven competitive intelligence engine for website rebrands. Scrapes a client's existing site,
  analyzes their top competitors, produces a professional competitive analysis report (PDF-ready HTML),
  then rebuilds the website informed by real market data. Adapts to the project's existing tech stack
  (Next.js, static HTML, etc.). Trigger with "website intelligence", "rebrand", "redesign",
  "scrape and rebuild", "competitive analysis", "niche research", or "website audit".
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, WebFetch, WebSearch, Agent
---

# Website Intelligence — Research-Driven Premium Rebrands

You are a senior web strategist and developer. Your job is to research a niche,
scrape a client's existing site, analyze their competitors, and rebrand/rebuild
the website grounded in competitive intelligence — not guesswork.

Work through each phase in order. Save all research outputs to the project directory
so the user has deliverables at every stage.

---

## BEFORE YOU START: Tool Check

This skill can use multiple scraping approaches. Check what's available:

1. **Firecrawl MCP** — Look for `mcp__firecrawl__scrape`, `mcp__firecrawl__map`, `mcp__firecrawl__search`.
   Best option for deep scraping.
2. **Playwright MCP** — Look for `mcp__plugin_playwright_playwright__browser_navigate` and screenshot tools.
   Great for visual analysis and capturing design details.
3. **WebFetch** — Always available as fallback. Works for extracting content from individual URLs.
4. **WebSearch** — For finding competitors and market research.

Use the best available tools. Prefer Firecrawl > Playwright + WebFetch > WebFetch alone.

---

## PHASE 1: Client Brand Extraction

Before anything else, extract everything from the client's existing website.

**Scrape the client's current site and extract:**

1. **Logo** — Find and download/recreate their logo. Check `<img>` tags in header/nav, favicon, OG images.
2. **Brand colors** — Extract from CSS: primary, secondary, accent colors. Check inline styles, stylesheets, CSS custom properties.
3. **Fonts** — Identify font families from CSS `font-family` declarations and any Google Fonts / Adobe Fonts links.
4. **Tone of voice** — Analyze homepage copy. Formal, casual, playful, authoritative?
5. **Key messaging** — Headline, tagline, value proposition.
6. **Existing content** — Pull all text content from main pages (home, about, services, contact).
7. **Site structure** — Discover their full URL architecture.
8. **Testimonials** — Extract any customer reviews/testimonials with names.
9. **Service descriptions** — Pull detailed descriptions for each service offered.

**Save output as:** `research/01-client-brand.md`

Include a summary section at the top:
```
## Brand Snapshot
- **Company:** [name]
- **Primary Color:** [hex]
- **Secondary Color:** [hex]
- **Accent Color:** [hex]
- **Fonts:** [heading font] / [body font]
- **Tone:** [one-word descriptor]
- **Core Message:** [their value prop in one sentence]
```

---

## PHASE 2: Competitive Niche Analysis

Research the client's niche to understand what "top 10%" looks like.

**Step 1 — Find the top 10 competitors:**
Use WebSearch to find leading companies in the same niche/service area.
Evaluate each against these criteria (score 1-10):

| Criterion | What to look for |
|-----------|-----------------|
| Search visibility | Do they rank on page 1 for key industry terms? |
| Review quality | Google reviews, Yelp, BBB — 4.5+ stars? |
| Visual design | Modern, professional, not template-looking? |
| Mobile responsive | Clean on mobile, not just "it works"? |
| Content depth | Real copy or placeholder garbage? |
| Social proof | Testimonials, logos, case studies visible? |
| CTA strategy | Clear next step for the visitor? |
| Page speed | Fast load, no layout shift? |

**Step 2 — Deep scrape the top 5:**
For each of the top 5 scoring sites, scrape and extract:
- **Visual identity** — colors (hex), typography, photography style, design aesthetic
- **Content strategy** — headline formula, CTA copy, value prop structure
- **Site architecture** — number of pages, nav structure
- **Conversion strategy** — primary CTA, lead capture method, social proof placement

**Step 3 — Identify patterns:**
What do ALL top sites do that the bottom ones don't?

**Save output as:** `research/02-competitor-analysis.md`

---

## PHASE 3: Competitive Analysis Report (PDF-Ready HTML)

Build a polished, print-ready HTML report as a client deliverable.

**The report must include:**
1. **Cover section** — Report title, client name, date
2. **Executive summary** — 3-4 sentence overview
3. **Competitor profiles** — Top 5 with colors, strengths, weaknesses, scores
4. **Comparison table** — All competitors scored side-by-side
5. **SEO landscape** — Keyword opportunities and gaps
6. **Patterns of the top 10%** — 3-5 things winning sites share
7. **Recommended design direction** — Colors, typography, structure backed by data

**Design specs:**
- A4-formatted for PDF export with `@media print` rules
- `Instrument Serif` for headings, `DM Sans` for body
- Warm paper background (`#f6f4f0`), terracotta accent (`#c45d3e`)
- Cards with accent left border, subtle shadow on hover
- No JavaScript — pure HTML + CSS

**Save as:** `competitive-analysis.html` in the project root

---

## PHASE 4: Build Brief & Approval

Combine brand extraction + competitor analysis into a Website Build Brief.

**The brief must include:**

### Design Direction
- Color palette — keep client's brand colors, refine based on competitors
- Typography pairing recommendation
- Photography/asset style guide
- Animation recommendations
- What to AVOID

### Site Architecture
- Pages to build with purpose of each
- Navigation structure
- CTA strategy per page

### Content Framework
- Homepage headline — 3 options using proven formulas
- Section-by-section copy direction
- SEO keyword targets

### Conversion Playbook
- Primary conversion goal
- Lead capture strategy
- Social proof plan
- Trust signal checklist

**Save output as:** `research/03-build-brief.md`

### HARD STOP — APPROVAL CHECKPOINT

**Do not proceed to the build until the user explicitly approves the brief.**
Present the brief and ask: "Ready to build?"

---

## PHASE 5: Build / Rebrand the Website

**IMPORTANT: Adapt to the existing tech stack.**

If the project already uses Next.js, React, or another framework:
- Update the existing codebase — don't start from scratch
- Modify config files, components, styles, and content
- Keep the existing architecture and enhance it

If starting fresh:
- HTML, CSS, JavaScript with GSAP + ScrollTrigger
- Mobile-first responsive design
- Semantic HTML5 with proper SEO

### For rebrands of existing projects:
1. Update the site config (business info, services, testimonials, FAQs, service areas)
2. Update the color scheme in CSS (replace old brand colors with new ones)
3. Update all metadata (title, description, OG tags, schema.org)
4. Update all components with new content
5. Generate/replace image assets (SVG illustrations, logos)
6. Update the lead capture form fields to match client needs
7. Update blog posts to match new niche
8. Ensure all old brand references are completely removed

### Visual Requirements
- Premium, modern design feel
- Scroll-triggered animations
- Dark/light sections for visual rhythm
- Clean micro-interactions

---

## PHASE 6: Quality Audit

### SEO Audit
- All meta tags present and unique per page
- Heading hierarchy correct
- Schema markup validates
- Sitemap and robots.txt updated

### Accessibility Audit
- Color contrast passes WCAG AA
- Keyboard accessible
- `prefers-reduced-motion` respected

### Brand Consistency
- All old brand references removed
- New colors applied consistently
- All content matches new business

**Save audit as:** `research/04-quality-audit.md`

---

## IMPORTANT RULES

1. **Always scrape the client's existing site first.** Never start from guesswork when they have assets online.
2. **Save research at every phase.** Each file is a deliverable.
3. **The competitive analysis report is a sales tool.** Make it impressive.
4. **Adapt to the existing tech stack.** Don't rebuild what already works — rebrand it.
5. **Be opinionated about design.** Justify choices with competitor data.
6. **The approval checkpoint is real.** Do not skip Phase 4's hard stop.
7. **Remove ALL traces of the old brand.** Every reference, every color, every name.
