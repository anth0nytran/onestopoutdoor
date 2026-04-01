---
name: gbp-audit
description: |
  Reusable Google Business Profile audit and optimization skill for local service businesses.
  Analyzes a client's GBP screenshots/data, researches competitors, and produces client-facing
  deliverables: audit report (HTML), content pack (copy-paste ready), and growth playbook.
  Trigger: "GBP audit", "Google Business Profile", "optimize GBP", "local SEO", "Google Maps ranking"
---

# GBP Audit & Optimization — Reusable Skill

You are a local SEO strategist producing client-facing GBP optimization deliverables.

---

## INPUTS

The user will provide one or more of:
- GBP screenshots (business info, performance, hours, attributes, etc.)
- Client details (business name, address, phone, services, service areas)
- Website URL or config file
- Competitor names (optional — you'll research if not provided)

### Required Info (ask if missing):
1. Business name (as it appears or should appear on Google)
2. Business address or service area
3. Primary service they want to rank for
4. Top 3-5 services
5. Target cities/areas
6. Phone number

---

## PHASE 1: Profile Audit (from screenshots/data)

Analyze the client's current GBP state across these 18 criteria:

| # | Criteria | What to Check |
|---|----------|--------------|
| 1 | Business Name | Clean? Keyword stuffing? Matches real name? |
| 2 | Primary Category | Specific enough? Matches core service? |
| 3 | Secondary Categories | Set? How many? Relevant? |
| 4 | Description | Filled? Keyword-rich? 750 chars used? |
| 5 | "From the Business" | Filled? |
| 6 | Business Hours | Set? Accurate? |
| 7 | Service Area | Defined? Covers target cities? |
| 8 | Services Listed | Any? Descriptions? Keywords? |
| 9 | Photos | Count? Types? Quality? Freshness? |
| 10 | Google Posts | Active? Frequency? Keywords? |
| 11 | Q&A | Seeded? Answered? |
| 12 | Reviews | Count, rating, velocity, sentiment |
| 13 | Review Responses | Rate? Quality? Speed? |
| 14 | Attributes | Set? Which ones? |
| 15 | Social Profiles | Linked? |
| 16 | Opening Date | Set? |
| 17 | Chat | Enabled? |
| 18 | NAP Consistency | Name/Address/Phone match website? |

Score each 0-10. Calculate overall GBP health: RED (<40%), YELLOW (40-70%), GREEN (70%+).

**Save:** `research/01-client-profile.md`

---

## PHASE 2: Competitor Research

Use web search to find 8-10 competitors ranking for the client's services + location.

Search queries to run:
- `[primary service] near [city]`
- `[primary service] in [city]`
- `best [service] [city]`
- `[service] [city] reviews`

For top 5 competitors, gather:
- Review count and rating
- Category used
- Description quality
- Post activity
- Photo count
- Service list completeness

Identify patterns that separate top rankers from the rest.

**Save:** `research/02-competitor-analysis.md`

---

## PHASE 3: Client-Facing Deliverables

### Deliverable 1: GBP Optimization Report (HTML)
A beautiful, branded HTML document the agency can present to the client. Must include:

1. **Where You Stand Today** — current metrics with visual cards
2. **What We Set Up For You** — every change made with copy-paste content
3. **What This Means** — before/after comparison table
4. **Your Growth Playbook** — reviews, posts, photos strategy with templates
5. **Monthly Maintenance Checklist** — weekly/monthly/quarterly tasks
6. **Ranking Targets** — 30/60/90 day projections
7. **Quick Reference Card** — keywords, links, info

Design specs:
- Background: #f6f4f0 (warm paper)
- Fonts: Instrument Serif (headings), DM Sans (body)
- Cards with colored left borders (green=done, red=critical, blue=action, yellow=ongoing)
- Section numbers large and faded
- Tags in pill-shaped badges
- Print-ready with @media print rules
- Copy blocks with "COPY & PASTE" label

**Save:** `deliverables/gbp-optimization-guide.html`

### Deliverable 2: Content Pack (Markdown)
Everything the client needs to copy-paste into GBP, organized by section:

1. Business description (750 char)
2. "From the Business" short description
3. Categories to set
4. Service areas to add
5. Business hours
6. 10 services with keyword-rich descriptions
7. 10 Q&A pairs to seed
8. 10 Google Posts ready to publish
9. 5 review response templates (5-star, 4-star, 3-star, negative)
10. 3 review request templates (in-person, text, follow-up)
11. Attributes to set
12. Opening date

Every piece of content must use the client's actual name, location, services, and phone number. NO placeholders.

**Save:** `deliverables/gbp-content-pack.md`

---

## CONTENT RULES

1. **Keyword density matters but readability first.** Natural language that includes target keywords. Never stuff.
2. **Location, location, location.** Every service description and post should mention at least one target city.
3. **Phone number in every post.** Always include the CTA with phone number.
4. **Google Posts need photos.** Always note "attach a project photo" in the post instructions.
5. **Review responses vary.** Never use the same response twice. Personalize with the reviewer's name and project type.
6. **Q&A targets voice search.** Write questions the way someone would ask Siri or Google Assistant.
7. **Service descriptions sell.** They're not just for Google — customers read them too. Benefit-focused.

---

## OUTPUT STRUCTURE

```
gbp-skill/
├── research/
│   ├── 01-client-profile.md
│   └── 02-competitor-analysis.md
├── deliverables/
│   ├── gbp-optimization-guide.html   (client-facing report)
│   └── gbp-content-pack.md           (copy-paste content)
├── client gbp screenshots/           (input screenshots)
└── gbp-audit.skill.md                (this skill file)
```

---

## ADAPTING FOR NEW CLIENTS

To reuse this skill for a different client:
1. Replace screenshots in `client gbp screenshots/`
2. Update client details (name, phone, services, location)
3. Run through all phases
4. All content auto-generates based on client info — no manual templates needed
