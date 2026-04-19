// Per-city data for /service-areas/[city] pages.
// Each city has hand-written copy — NOT a shared template — so Google sees
// meaningful variance. Richmond is the priority / deep page; the other
// four are lighter "seed" pages that will compound over time.

export interface AreaFaq {
  q: string;
  a: string;
}

export interface AreaCity {
  slug: string;               // URL segment
  city: string;               // "Richmond"
  state: string;              // "TX"
  zip: string[];              // primary ZIPs we serve
  priority: 'primary' | 'seed';
  titleTag: string;           // <title>
  metaDescription: string;    // meta description
  h1: string;                 // page H1
  // "Answer-first" paragraph rendered immediately after the H1. Must be
  // ≤55 words so it's AEO/featured-snippet friendly.
  answerFirst: string;
  // 3-6 short sentences for the long intro.
  intro: string[];
  // Local detail: neighborhoods / developments we explicitly serve.
  neighborhoods: string[];
  // County anchor — Google uses these as entity signals.
  county: string;
  // "Why {city} homeowners choose us" bullets (3-5, city-specific).
  whyUs: { heading: string; body: string }[];
  // Hand-picked testimonials that mention this city or its neighborhoods.
  // We use quote text only; the author comes from siteConfig.testimonials.
  proofQuotes: { author: string; quote: string }[];
  // City-specific FAQ — 5 minimum for seed pages, 8 for Richmond.
  faqs: AreaFaq[];
  // GEO coordinates for LocalBusiness schema.
  geo: { lat: number; lng: number };
  // Signature hero image (shown in hero section of the area page).
  heroImage: string;
  // Curated project gallery for this city — unique set per city so Google
  // sees meaningful visual variance and each page has distinct engagement.
  projectPhotos: string[];
}

// ──────────────────────────────────────────────────────────────────
// RICHMOND — priority / deep money page
// ──────────────────────────────────────────────────────────────────
const richmond: AreaCity = {
  slug: 'richmond-tx',
  city: 'Richmond',
  state: 'TX',
  zip: ['77406', '77407', '77469'],
  priority: 'primary',
  titleTag: 'Patio Covers & Outdoor Construction in Richmond, TX',
  metaDescription:
    'Richmond, TX patio cover, pergola, outdoor kitchen & concrete contractor. Licensed, insured, 15+ years in Fort Bend County. 5.0 rating. Free estimates — (832) 945-8084.',
  h1: 'Patio Covers, Pergolas & Outdoor Construction in Richmond, TX',
  answerFirst:
    'One Stop Outdoor Construction builds patio covers, pergolas, outdoor kitchens and concrete patios for Richmond, TX homeowners across Fort Bend County. We are licensed, insured, and have completed 300+ Richmond-area backyards over 15+ years. Free on-site estimates — call (832) 945-8084.',
  intro: [
    'Richmond backyards deal with two things most patio builders don\'t plan for: Gulf-coast humidity that chews through untreated wood, and HOAs (Aliana, Harvest Green, Pecan Grove, Long Meadow Farms) that reject anything that doesn\'t match approved material lists. We build to both.',
    'We design every Richmond project for the climate first — insulated aluminum panels that stay cool in August, powder-coated steel that doesn\'t rust, and concrete mixes rated for the expansive clay soils common in 77406/77407/77469. Our crews handle the HOA paperwork, the Fort Bend County permit, and the city inspection on your behalf.',
    'Owner David Arabzadeh lives and works in the Richmond area. Every quote is delivered in person, itemized, and stays honest — no pressure, no hidden add-ons. If we can build it, we\'ll show you exactly what it costs before you sign.',
  ],
  neighborhoods: [
    'Aliana', 'Harvest Green', 'Pecan Grove', 'Long Meadow Farms',
    'Mission Bend', 'Cinco Ranch (west)', 'Greatwood', 'Old Orchard',
    'Canyon Gate', 'Lakes of Bella Terra', 'Veranda', 'Bridlewood Estates',
  ],
  county: 'Fort Bend County',
  whyUs: [
    {
      heading: 'HOA-approved materials, handled for you',
      body:
        'Aliana, Harvest Green and Pecan Grove HOAs each have their own approved-materials lists. We submit your patio-cover or pergola package with the required drawings, color chips, and roof-pitch spec — and we track the ARC review so your build doesn\'t stall.',
    },
    {
      heading: 'Built for Richmond\'s climate',
      body:
        'We default to insulated aluminum or laminated solid panels for covers, stainless fasteners for outdoor kitchens, and fiber-reinforced concrete with proper expansion joints on expansive-clay lots. Everything rated for Gulf humidity, summer storms, and Fort Bend soils.',
    },
    {
      heading: 'One contractor, one warranty, six trades',
      body:
        'Patio cover, outdoor kitchen, stamped concrete, roofing, pergola, walkways — all in-house. No handing you off between three subcontractors. One quote, one crew, one point of contact, one warranty on the finished job.',
    },
    {
      heading: '15+ years & 300+ Fort Bend backyards',
      body:
        'We\'ve been serving Richmond and the surrounding Fort Bend suburbs since 2011. Ask David for references in your specific neighborhood — we almost certainly have recent projects within a few blocks of you.',
    },
  ],
  proofQuotes: [
    {
      author: 'Barbara Autry Huyser',
      quote:
        'If you have any doubts about spending the additional money for stamped concrete, just do it — you will love it. David\'s crew was excellent, very personable, and kept me informed of the progress. The transformation was completed in 8 working days — covered patio, extended concrete, stamped, fascia, soffit, gutters, siding. One highly satisfied customer.',
    },
    {
      author: 'Yogesh Varma',
      quote:
        'David is real, with no-fuss pricing and an eye for refinement and detail. Takes care of HOA approvals. Timely execution and proper post-construction cleanup. Highly recommended.',
    },
    {
      author: 'Vishakha Dastidar',
      quote:
        'His efficient team finished the job earlier than expected and under budget. He quoted the best price of all the contractors and delivered excellent workmanship building our backyard.',
    },
  ],
  faqs: [
    {
      q: 'How much does a patio cover cost in Richmond, TX?',
      a: 'A basic aluminum patio cover in Richmond typically starts around $3,000 for a small attached cover. Mid-size insulated-panel covers (14\'x20\') generally run $8,000–$15,000 installed, and full custom pergolas or wood-framed solid covers with fans, lighting and HOA paperwork run $15,000–$30,000+. Every estimate is free, on-site, and itemized before you sign.',
    },
    {
      q: 'Do I need a permit for a patio cover in Richmond or Fort Bend County?',
      a: 'Yes — almost always. Patio covers attached to the house, detached structures over 120 sq ft, and anything with electrical require a Fort Bend County or City of Richmond permit. We pull the permit, submit stamped drawings where required, and coordinate the inspection. You never have to talk to the county.',
    },
    {
      q: 'Do you handle HOA approval in Aliana, Harvest Green or Pecan Grove?',
      a: 'Yes. Each of those HOAs has a different ARC packet — material lists, color options, roof-pitch rules, setback rules. We prepare the submission, attach the drawings and material chips, and follow it through approval before we break ground. If your HOA rejects a material, we re-spec at no charge.',
    },
    {
      q: 'What patio cover material works best for Richmond\'s humidity?',
      a: 'For most Richmond homes we recommend insulated aluminum or laminated solid panels. They don\'t warp, don\'t rot, shrug off summer storms, and stay 15–20°F cooler than traditional shingle-roofed covers in August. Wood is beautiful but needs re-sealing every 2–3 years in this climate.',
    },
    {
      q: 'How long does a patio cover or outdoor kitchen take to build in Richmond?',
      a: 'Simple attached aluminum covers: 3–5 working days once permit is approved. Custom wood pergolas or insulated covers with electrical: 7–10 days. Full outdoor kitchen with gas, water and stamped concrete base: 2–3 weeks. Permit/HOA review adds 2–4 weeks on the front end — we start that the day you sign.',
    },
    {
      q: 'What about concrete — how do you handle Richmond\'s clay soil?',
      a: 'Richmond, Rosenberg and much of Fort Bend sit on expansive clay. We prep with proper sub-base compaction, use fiber-reinforced 3,500-psi mix on residential slabs, cut expansion joints on a 10\'×10\' grid, and install control joints at all slab transitions. That\'s what stops the hairline cracks you see on poorly-built driveways here.',
    },
    {
      q: 'Do you serve areas outside Richmond like Fulshear or Missouri City?',
      a: 'Yes — we regularly build in Fulshear, Missouri City, Sugar Land, Katy, Rosenberg, and parts of west Houston. If you\'re in Fort Bend County, Harris County west side, or the Cinco Ranch / Greatwood corridor, we\'ll come out for a free estimate.',
    },
    {
      q: 'Are you actually licensed and insured in Texas?',
      a: 'Yes. We are a fully licensed general contractor with comprehensive liability insurance on every job and workers\' comp on our crews. We can email you a current certificate of insurance with your address as certificate holder before work starts.',
    },
  ],
  geo: { lat: 29.5823, lng: -95.7607 },
  heroImage: '/OneStopOutdoor_Photos/photo_04.jpg',
  projectPhotos: [
    '/OneStopOutdoor_Photos/photo_04.jpg',
    '/OneStopOutdoor_Photos/photo_05.jpg',
    '/OneStopOutdoor_Photos/photo_06.jpg',
    '/OneStopOutdoor_Photos/photo_07.jpg',
    '/OneStopOutdoor_Photos/photo_08.jpg',
    '/OneStopOutdoor_Photos/photo_09.jpg',
    '/OneStopOutdoor_Photos/photo_10.jpg',
    '/OneStopOutdoor_Photos/photo_12.jpg',
    '/photos_new_web/patio-cover/patio-cover-1.jpg',
    '/photos_new_web/outdoor-kitchen/outdoor-kitchen-1.jpg',
    '/photos_new_web/concrete/concrete-1.jpg',
    '/photos_new_web/patio-cover/patio-cover-3.jpg',
  ],
};

// ──────────────────────────────────────────────────────────────────
// KATY — seed page
// ──────────────────────────────────────────────────────────────────
const katy: AreaCity = {
  slug: 'katy-tx',
  city: 'Katy',
  state: 'TX',
  zip: ['77449', '77450', '77493', '77494'],
  priority: 'seed',
  titleTag: 'Patio Covers & Outdoor Kitchens in Katy, TX',
  metaDescription:
    'Katy, TX patio cover, pergola, outdoor kitchen & concrete contractor serving Cinco Ranch, Firethorne & Cross Creek Ranch. Licensed, insured, 5.0 rated. Call (832) 945-8084.',
  h1: 'Patio Covers, Pergolas & Outdoor Construction in Katy, TX',
  answerFirst:
    'One Stop Outdoor Construction builds patio covers, pergolas, outdoor kitchens and stamped concrete for Katy, TX homeowners — including Cinco Ranch, Firethorne and Cross Creek Ranch. Licensed, insured, 15+ years. Free on-site estimates — (832) 945-8084.',
  intro: [
    'Katy has two kinds of backyard problems: west-facing lots that bake all afternoon, and HOAs that want every new structure to match the roofline and trim color of the original builder package. We solve both.',
    'We build insulated patio covers that knock 15–20°F off a west-facing Katy backyard in July, match existing Lennar / Perry / Westin trim profiles, and handle HOA submissions for Cinco Ranch, Firethorne and Cross Creek Ranch start-to-finish.',
  ],
  neighborhoods: [
    'Cinco Ranch', 'Firethorne', 'Cross Creek Ranch', 'Falcon Point',
    'Grand Lakes', 'Seven Meadows', 'Silver Ranch', 'Woodcreek Reserve',
  ],
  county: 'Harris County / Fort Bend County',
  whyUs: [
    {
      heading: 'Material matching for Katy builder trims',
      body:
        'We stock color options that match Lennar, Perry, Westin and David Weekley factory trim. Your new patio cover reads as part of the house, not a bolt-on.',
    },
    {
      heading: 'Cinco Ranch & Firethorne HOA experience',
      body:
        'Each of these HOAs has distinct ARC rules. We\'ve been approved in all of them repeatedly and know exactly what to submit on the first round.',
    },
    {
      heading: 'Heat-managed designs for west-facing lots',
      body:
        'Insulated panels, radiant-barrier options, and optional ceiling-fan pre-wire keep your Katy patio usable through summer — not just a shaded oven.',
    },
  ],
  proofQuotes: [
    {
      author: 'Istvan Kathi',
      quote:
        'We got a wonderful patio designed and built by One Stop Outdoor Construction last December in our home in Katy. Highly recommend this company.',
    },
    {
      author: 'Greilan Garcia Balmaseda',
      quote:
        'We are very happy with our covered patio and outdoor kitchen! David and his team did an amazing job. They worked magic with the tiny space we had. We 100% recommend them.',
    },
  ],
  faqs: [
    {
      q: 'How much does a patio cover cost in Katy, TX?',
      a: 'In Katy, basic aluminum covers start around $3,000. Most Cinco Ranch / Firethorne insulated-panel covers run $8,000–$15,000 installed. Full outdoor kitchens with stamped concrete range $20,000–$45,000. Every quote is free, itemized and written down.',
    },
    {
      q: 'Do you handle Cinco Ranch HOA approvals?',
      a: 'Yes — and Firethorne and Cross Creek Ranch too. We prepare the ARC submission with plans, material chips, and setback drawings, and track the review through approval before breaking ground.',
    },
    {
      q: 'What\'s the best patio cover for a west-facing Katy backyard?',
      a: 'Insulated aluminum panels with a radiant barrier. They reflect afternoon sun, cut surface temperatures 15–20°F versus shingle roofs, and stay cooler to the touch so your patio is usable in July and August — not just October.',
    },
    {
      q: 'Do you do outdoor kitchens in Katy?',
      a: 'Yes. We build custom outdoor kitchens throughout Katy — Cinco Ranch, Firethorne, Seven Meadows, Cross Creek Ranch — with gas lines, stainless grills, natural stone counters and matching roof integration so the kitchen ties into the main patio.',
    },
    {
      q: 'Do you work in 77493 and 77494?',
      a: 'Yes — both ZIPs plus 77449 and 77450. Katy is a core service area; we can usually be on-site for a free estimate within 2–3 days of your call.',
    },
  ],
  geo: { lat: 29.7858, lng: -95.8245 },
  heroImage: '/OneStopOutdoor_Photos/photo_14.jpg',
  projectPhotos: [
    '/OneStopOutdoor_Photos/photo_14.jpg',
    '/OneStopOutdoor_Photos/photo_15.jpg',
    '/OneStopOutdoor_Photos/photo_16.jpg',
    '/OneStopOutdoor_Photos/photo_17.jpg',
    '/OneStopOutdoor_Photos/photo_18.jpg',
    '/photos_new_web/patio-cover/patio-cover-4.jpg',
    '/photos_new_web/outdoor-kitchen/outdoor-kitchen-4.jpg',
    '/photos_new_web/concrete/concrete-4.jpg',
  ],
};

// ──────────────────────────────────────────────────────────────────
// SUGAR LAND — seed page
// ──────────────────────────────────────────────────────────────────
const sugarLand: AreaCity = {
  slug: 'sugar-land-tx',
  city: 'Sugar Land',
  state: 'TX',
  zip: ['77478', '77479', '77498'],
  priority: 'seed',
  titleTag: 'Patio Covers & Outdoor Construction in Sugar Land, TX',
  metaDescription:
    'Sugar Land, TX patio cover, outdoor kitchen & concrete contractor serving Riverstone, Telfair, First Colony & New Territory. Licensed, insured, 5.0 rated. (832) 945-8084.',
  h1: 'Patio Covers, Outdoor Kitchens & Concrete in Sugar Land, TX',
  answerFirst:
    'One Stop Outdoor Construction serves Sugar Land homeowners with patio covers, pergolas, outdoor kitchens, and stamped-concrete patios — including Riverstone, Telfair, First Colony and New Territory. Licensed, insured, 15+ years. Free estimates — (832) 945-8084.',
  intro: [
    'Sugar Land HOAs — Riverstone, Telfair, First Colony, Sienna, New Territory — are among the strictest in Fort Bend. Material color, roof pitch, height-above-fence, even fastener visibility can trigger an ARC rejection.',
    'We\'ve been approved in every one of these communities more than once. We know what works, we pre-spec around the common rejection reasons, and we submit a complete package so your patio cover or pergola gets approved on the first round.',
  ],
  neighborhoods: [
    'Riverstone', 'Telfair', 'First Colony', 'New Territory', 'Sienna',
    'Greatwood', 'Colony Lakes', 'Commonwealth', 'Sugar Creek',
  ],
  county: 'Fort Bend County',
  whyUs: [
    {
      heading: 'Riverstone, Telfair, First Colony ARC experience',
      body:
        'Every Sugar Land HOA has its own packet. We submit clean, complete drawings matched to each ARC\'s rules so you don\'t get sent back for color chips or setback clarifications.',
    },
    {
      heading: 'Stamped concrete that holds up in Sugar Land clay',
      body:
        'Expansive clay soils crack poorly-prepped slabs. We prep the sub-base, use fiber-reinforced mixes, and cut proper expansion joints so your stamped patio still looks right in year 5.',
    },
    {
      heading: 'One contractor for the whole backyard',
      body:
        'Cover, kitchen, concrete, roofing, pavers — all under one in-house crew and one warranty. No chasing three different subs.',
    },
  ],
  proofQuotes: [
    {
      author: 'AC Nguyen',
      quote:
        'We had a vision for our patio and David and his crew built it into existence. His mission was to build it so it looked like it came with the house initially, and he exceeded expectations.',
    },
    {
      author: 'Angelina Smith',
      quote:
        'David was patient and came out to my house three times before we decided to proceed. He listened to what we wanted and provided a quality patio at an affordable price.',
    },
  ],
  faqs: [
    {
      q: 'How much does a patio cover cost in Sugar Land, TX?',
      a: 'Most Sugar Land insulated patio covers run $8,000–$18,000 installed. Wood pergolas and custom solid covers with fans, lighting and HOA submissions typically run $12,000–$25,000. Stamped-concrete patios are quoted per square foot; most Riverstone / Telfair projects fall $12–$22/sf installed.',
    },
    {
      q: 'Do you do HOA approvals in Riverstone and Telfair?',
      a: 'Yes — we\'ve been approved in both repeatedly. We prepare the full ARC packet (drawings, material chips, setback diagram, roof-pitch spec) and track it through approval before any build starts.',
    },
    {
      q: 'What\'s the best outdoor-kitchen build for Sugar Land?',
      a: 'A masonry base with stainless appliances, natural-stone counter (granite or leathered quartzite holds up best in humidity), and a roof tie-in to an insulated patio cover so the kitchen is usable year-round.',
    },
    {
      q: 'Do you do stamped concrete in Sugar Land?',
      a: 'Yes — it\'s one of our most popular services in Sugar Land. We offer dozens of stamp patterns, integral colors, and release accents. All slabs are prepped for expansive clay and cut for proper expansion control.',
    },
    {
      q: 'What ZIPs do you serve in Sugar Land?',
      a: '77478, 77479 and 77498 — plus surrounding Missouri City (77459) and Stafford (77477). If you\'re in Fort Bend County we\'ll come out for a free on-site estimate.',
    },
  ],
  geo: { lat: 29.6197, lng: -95.6349 },
  heroImage: '/OneStopOutdoor_Photos/photo_19.jpg',
  projectPhotos: [
    '/OneStopOutdoor_Photos/photo_19.jpg',
    '/OneStopOutdoor_Photos/photo_20.jpg',
    '/OneStopOutdoor_Photos/photo_21.jpg',
    '/OneStopOutdoor_Photos/photo_22.jpg',
    '/OneStopOutdoor_Photos/photo_23.jpg',
    '/photos_new_web/patio-cover/patio-cover-6.jpg',
    '/photos_new_web/outdoor-kitchen/outdoor-kitchen-6.jpg',
    '/photos_new_web/concrete/concrete-6.jpg',
  ],
};

// ──────────────────────────────────────────────────────────────────
// ROSENBERG — seed page
// ──────────────────────────────────────────────────────────────────
const rosenberg: AreaCity = {
  slug: 'rosenberg-tx',
  city: 'Rosenberg',
  state: 'TX',
  zip: ['77469', '77471'],
  priority: 'seed',
  titleTag: 'Patio Covers & Outdoor Construction in Rosenberg, TX',
  metaDescription:
    'Rosenberg, TX patio cover, pergola, outdoor kitchen & concrete contractor. Licensed, insured, serving Fort Bend County 15+ years. Free estimates — (832) 945-8084.',
  h1: 'Patio Covers, Pergolas & Concrete Patios in Rosenberg, TX',
  answerFirst:
    'One Stop Outdoor Construction builds patio covers, pergolas, outdoor kitchens and stamped concrete for Rosenberg, TX homeowners across 77469 and 77471. Licensed, insured, 15+ years in Fort Bend County. Free estimates — (832) 945-8084.',
  intro: [
    'Rosenberg lots tend to be bigger than neighboring Sugar Land or Richmond, which gives you more design freedom — larger covered patios, detached pergolas, full outdoor kitchens with prep islands — without HOA headaches in many of the older subdivisions.',
    'We build to match: wider covers, deeper stamped-concrete patios, and outdoor-kitchen layouts sized for real entertaining. Fully permitted through the City of Rosenberg and Fort Bend County.',
  ],
  neighborhoods: [
    'Walnut Creek', 'Bonbrook Plantation', 'Summer Lakes', 'Briarwood Crossing',
    'Seabourne Landing', 'River Run at the Brazos', 'Reading',
  ],
  county: 'Fort Bend County',
  whyUs: [
    {
      heading: 'Designs scaled for Rosenberg lot sizes',
      body:
        'You have the yard for it — so we design bigger. 20\'×24\' covered patios, detached pergolas with built-in seating, full prep-island outdoor kitchens. No cramming.',
    },
    {
      heading: 'Fort Bend County permitting handled',
      body:
        'We pull the permit, submit drawings, and coordinate inspections through Fort Bend County or the City of Rosenberg depending on your jurisdiction.',
    },
    {
      heading: 'Concrete built for Rosenberg clay',
      body:
        'Expansive clay requires proper prep. We use fiber-reinforced 3,500-psi mix, correct sub-base compaction, and expansion joints on a proper grid so your patio doesn\'t hairline crack in year two.',
    },
  ],
  proofQuotes: [
    {
      author: 'Corinthians Greenburg III',
      quote:
        'David and his team did an amazing job on my patio. They went above and beyond what my wife and I expected. One Stop Construction gave us an estimated timeline and had the job complete on schedule.',
    },
  ],
  faqs: [
    {
      q: 'How much does a patio cover cost in Rosenberg, TX?',
      a: 'Basic aluminum covers start around $3,000. Insulated solid-panel covers 14\'×20\' typically run $8,000–$14,000 installed in Rosenberg. Larger custom covers or pergolas with lighting and ceiling-fan pre-wire run $12,000–$25,000. Estimates are always free.',
    },
    {
      q: 'Do you need a permit for a patio cover in Rosenberg?',
      a: 'Yes in most cases — especially for attached covers, detached structures over 120 sq ft, and anything with electrical. We handle the City of Rosenberg or Fort Bend County permit for you.',
    },
    {
      q: 'Can you do a detached pergola in Rosenberg?',
      a: 'Yes — detached pergolas are a common Rosenberg build because lots are bigger. We build both wood and powder-coated steel, with optional integrated lighting, fans and a stamped-concrete pad.',
    },
    {
      q: 'Do you do stamped-concrete driveways in Rosenberg?',
      a: 'Yes. Stamped and standard concrete driveways, walkways, and patios — all prepped for Fort Bend County clay soils so they hold up.',
    },
    {
      q: 'What ZIPs do you serve in Rosenberg?',
      a: '77469 and 77471, plus adjacent Richmond, Fulshear, and Needville. If you\'re within Fort Bend County we\'ll drive out for a free on-site estimate.',
    },
  ],
  geo: { lat: 29.5572, lng: -95.8085 },
  heroImage: '/OneStopOutdoor_Photos/photo_24.jpg',
  projectPhotos: [
    '/OneStopOutdoor_Photos/photo_24.jpg',
    '/OneStopOutdoor_Photos/photo_25.jpg',
    '/OneStopOutdoor_Photos/photo_26.jpg',
    '/photos_new_web/patio-cover/patio-cover-7.jpg',
    '/photos_new_web/outdoor-kitchen/outdoor-kitchen-7.jpg',
    '/photos_new_web/concrete/concrete-7.jpg',
    '/photos_new_web/patio-cover/patio-cover-9.jpg',
    '/photos_new_web/concrete/concrete-9.jpg',
  ],
};

// ──────────────────────────────────────────────────────────────────
// HOUSTON — seed page
// ──────────────────────────────────────────────────────────────────
const houston: AreaCity = {
  slug: 'houston-tx',
  city: 'Houston',
  state: 'TX',
  zip: ['77048', '77031', '77072', '77083', '77099'],
  priority: 'seed',
  titleTag: 'Patio Covers & Outdoor Construction in Houston, TX',
  metaDescription:
    'Houston, TX patio cover, pergola, outdoor kitchen & concrete contractor serving west and southwest Houston. Licensed, insured, 5.0 rated. Free estimates — (832) 945-8084.',
  h1: 'Patio Covers, Outdoor Kitchens & Concrete in Houston, TX',
  answerFirst:
    'One Stop Outdoor Construction builds patio covers, pergolas, outdoor kitchens, and stamped concrete for Houston, TX homeowners — focusing on west and southwest Houston and inside-the-Beltway neighborhoods near Westpark and Southwest Fwy. Licensed, insured, 15+ years. (832) 945-8084.',
  intro: [
    'Houston properties run the full range — tight inside-the-Loop lots, deed-restricted master-planned communities, and bigger suburban-Houston yards. We adapt the build to the site, the deed restrictions, and the drainage — not the other way around.',
    'Because Houston\'s drainage rules and city-permit requirements are stricter than surrounding suburbs, we handle the permitting and inspection coordination on every Houston project so nothing stalls.',
  ],
  neighborhoods: [
    'Westchase', 'Alief', 'Sharpstown', 'Mission Bend', 'Westwood',
    'Braeburn', 'Fondren Southwest', 'Briargate', 'Eldridge / West Oaks',
  ],
  county: 'Harris County',
  whyUs: [
    {
      heading: 'City of Houston permitting handled',
      body:
        'Houston\'s permit process is more involved than Fort Bend. We pull the permit, submit the plan set, and coordinate the final inspection so you don\'t have to navigate it.',
    },
    {
      heading: 'Drainage-aware concrete design',
      body:
        'Houston requires any new slab to respect drainage easements and slope away from the house. We grade, slope and finish every slab to code — no ponding, no callbacks.',
    },
    {
      heading: 'Real full-service outdoor builds',
      body:
        'Cover, outdoor kitchen, concrete, roofing, pergola, walkways — one crew, one warranty. Not three subs pointing fingers if something needs adjusting.',
    },
  ],
  proofQuotes: [
    {
      author: 'Ruby Pretila Reese',
      quote:
        'David and his crew replaced our roof a couple of years ago and did a really wonderful job. Our next door neighbor hired him to replace her roof too. Awesome service.',
    },
  ],
  faqs: [
    {
      q: 'How much does a patio cover cost in Houston, TX?',
      a: 'Most Houston insulated-panel patio covers run $8,000–$18,000 installed depending on size, material and permit complexity. Simple aluminum covers start around $3,000; full outdoor kitchens with stamped concrete and a cover run $20,000–$45,000. Every estimate is free and itemized.',
    },
    {
      q: 'Do you work inside the Beltway or the Loop?',
      a: 'Yes — inside-the-Beltway and some inside-the-Loop work, especially southwest Houston, Westchase, Sharpstown, Alief. We assess access on-site because tighter lots can affect staging and delivery.',
    },
    {
      q: 'Do you pull the City of Houston permit?',
      a: 'Yes. We pull the permit, submit the plan set, and coordinate the inspection. For work that crosses into Harris County unincorporated, we handle that permit as well.',
    },
    {
      q: 'Can you tie into an existing Houston roofline?',
      a: 'Yes — attached patio covers are one of our most common builds. We match roof pitch, fascia and color so the cover reads as original construction, not an add-on.',
    },
    {
      q: 'What Houston ZIPs do you serve?',
      a: '77048, 77031, 77072, 77083, 77099 and surrounding southwest and west Houston. We also serve the Harris / Fort Bend border communities.',
    },
  ],
  geo: { lat: 29.7604, lng: -95.3698 },
  heroImage: '/OneStopOutdoor_Photos/photo_27.jpg',
  projectPhotos: [
    '/OneStopOutdoor_Photos/photo_27.jpg',
    '/OneStopOutdoor_Photos/photo_28.jpg',
    '/OneStopOutdoor_Photos/photo_29.jpg',
    '/photos_new_web/patio-cover/patio-cover-10.jpg',
    '/photos_new_web/outdoor-kitchen/outdoor-kitchen-10.jpg',
    '/photos_new_web/concrete/concrete-10.jpg',
    '/photos_new_web/patio-cover/patio-cover-11.jpg',
    '/photos_new_web/outdoor-kitchen/outdoor-kitchen-11.jpg',
  ],
};

export const areaCities: AreaCity[] = [richmond, katy, sugarLand, rosenberg, houston];

export function getCityBySlug(slug: string): AreaCity | undefined {
  return areaCities.find((c) => c.slug === slug);
}
