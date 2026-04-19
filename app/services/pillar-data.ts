// Deep per-service content for /services/[slug] pillar pages.
// Each service has hand-written unique copy — not templated — so each page
// ranks for its own head term without cannibalizing the others.

export interface PillarMaterial {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  costRange: string;
  lifespan: string;
}

export interface PillarFaq {
  q: string;
  a: string;
}

export interface PillarPricing {
  tier: string;
  range: string;
  includes: string;
}

export interface PillarContent {
  slug: string;                 // matches serviceData.slug
  titleTag: string;
  metaDescription: string;
  h1: string;
  answerFirst: string;          // ≤55 words, AEO/featured-snippet friendly
  intro: string[];              // 2-3 paragraphs of setup
  materials?: PillarMaterial[]; // optional materials/variants table
  process: { step: string; description: string; timeline: string }[];
  pricing: PillarPricing[];
  faqs: PillarFaq[];
  fallbackImage: string;        // used when serviceData.media is empty or sparse
  relatedServices: string[];    // slugs of related pillars for internal linking
}

// ──────────────────────────────────────────────────────────────────
// PATIO COVERS — flagship
// ──────────────────────────────────────────────────────────────────
const patioCovers: PillarContent = {
  slug: 'patio-covers',
  titleTag: 'Patio Covers — Richmond, Katy & Houston TX',
  metaDescription:
    'Custom patio covers — aluminum, insulated solid, wood & steel — installed across Richmond, Katy, Sugar Land, Rosenberg & Houston TX. Licensed, insured, 15+ years. (832) 945-8084.',
  h1: 'Patio Covers — Aluminum, Insulated Solid, Wood & Custom',
  answerFirst:
    'One Stop Outdoor Construction installs custom patio covers across Richmond, Katy, Sugar Land, Rosenberg and Houston, TX. We build aluminum, insulated solid-panel, wood and steel covers — with ceiling fans, lighting, skylights and HOA-approved finishes. Free on-site estimates: (832) 945-8084.',
  intro: [
    'A good patio cover does three things at once — it shades the slab so you can actually use your backyard in August, it ties into the existing roofline so it reads as original construction, and it adds measurable home value. Done poorly, a cover traps heat, drips rust, and fails the HOA review. Done well, it stays cool, sheds water, and lasts 25+ years.',
    'We\'ve built 300+ patio covers across Fort Bend and west Harris County since 2011. Every build starts with an on-site measurement, a written itemized quote, and — if needed — the HOA ARC packet and Fort Bend County or City of Houston permit submission. One crew, one warranty, no subcontractor runaround.',
  ],
  materials: [
    {
      name: 'Aluminum (insulated panel)',
      description: 'Factory-laminated insulated core with aluminum skin. Our default recommendation for most Texas backyards.',
      pros: [
        'Stays 15–20°F cooler than shingle roofs in August',
        'Zero rot, zero warp, zero repainting',
        'Built-in ceiling for clean underside look',
        'HOA-friendly (multiple approved colors)',
      ],
      cons: ['Higher upfront cost than basic lattice', 'Less visual warmth than wood'],
      costRange: '$8,000 – $18,000 installed',
      lifespan: '30+ years',
    },
    {
      name: 'Aluminum (lattice / open)',
      description: 'Powder-coated aluminum lattice — the most affordable real patio cover.',
      pros: ['Lowest cost entry point', 'Lightweight, fast install', 'Filters sun while staying airy'],
      cons: ['Not rain-proof', 'Less shade than solid panels'],
      costRange: '$3,000 – $7,000 installed',
      lifespan: '20+ years',
    },
    {
      name: 'Wood (cedar or pressure-treated pine)',
      description: 'Traditional wood framing with shingle or metal roof tie-in. Looks best when matched to existing home.',
      pros: ['Custom architectural look', 'Full roof tie-in possible', 'Feels like part of the house'],
      cons: ['Requires re-sealing every 2–3 years in Gulf humidity', 'Higher long-term maintenance'],
      costRange: '$12,000 – $25,000 installed',
      lifespan: '20–25 years with maintenance',
    },
    {
      name: 'Steel (powder-coated)',
      description: 'Structural steel posts and beams — best for large spans and motorized louvered systems.',
      pros: ['Spans 20\'+ without center posts', 'Supports heavy fans, lighting, privacy screens', 'Modern aesthetic'],
      cons: ['Higher upfront cost', 'Requires precise structural engineering'],
      costRange: '$15,000 – $35,000+ installed',
      lifespan: '30+ years',
    },
  ],
  process: [
    { step: 'On-site consultation', description: 'David or a senior crew lead comes out, measures, and discusses material, roof tie-in and electrical.', timeline: 'Within 3–5 days of your call' },
    { step: 'Written itemized quote', description: 'Line-item pricing for materials, labor, permit, HOA submission and electrical. No hidden fees.', timeline: 'Delivered within 48 hours of the visit' },
    { step: 'HOA ARC submission', description: 'If required (Aliana, Harvest Green, Pecan Grove, Cinco Ranch, Riverstone, Telfair, etc.), we prepare drawings, color chips, setback diagram and submit.', timeline: '2–4 weeks for HOA approval' },
    { step: 'County / city permit', description: 'We pull the Fort Bend County, City of Richmond, or City of Houston permit and schedule inspections.', timeline: '1–3 weeks depending on jurisdiction' },
    { step: 'Build', description: 'Posts, beams, roof panels, electrical, fan/light installation, final finish.', timeline: '3–10 working days' },
    { step: 'Final walk-through', description: 'Inspection, punch-list resolution, and warranty hand-off.', timeline: '1 day' },
  ],
  pricing: [
    { tier: 'Basic aluminum cover (12\'×12\')', range: '$3,000 – $7,000', includes: 'Powder-coated aluminum frame, lattice or basic solid roof, standard colors' },
    { tier: 'Mid-size insulated panel (14\'×20\')', range: '$8,000 – $15,000', includes: 'Insulated aluminum solid-panel cover, ceiling fan pre-wire, standard HOA colors' },
    { tier: 'Custom wood or steel cover with fans/lighting', range: '$15,000 – $30,000', includes: 'Wood or steel framing, full roof tie-in, ceiling fans, recessed lighting, HOA submission' },
    { tier: 'Full outdoor-living build (cover + kitchen + stamped concrete)', range: '$30,000 – $75,000+', includes: 'Insulated cover, outdoor kitchen base, stamped or colored concrete pad, electrical, gas line' },
  ],
  faqs: [
    { q: 'How much does a patio cover cost in Texas?', a: 'In the Richmond / Katy / Houston market, basic aluminum covers start around $3,000 for a 12\'×12\'. Insulated solid-panel covers typically run $8,000–$15,000 installed. Custom wood covers with roof tie-in, ceiling fans and HOA submission generally run $15,000–$30,000. Larger full outdoor-living builds run $30,000–$75,000+.' },
    { q: 'What\'s the best patio cover material for the Houston climate?', a: 'For most Gulf-coast homes we recommend insulated aluminum panels. They stay 15–20°F cooler than shingle-roofed covers in August, don\'t rot, don\'t warp, and don\'t need re-sealing. Wood is beautiful but requires maintenance every 2–3 years in our humidity.' },
    { q: 'Do I need a permit for a patio cover?', a: 'Almost always, yes. Attached covers, detached structures over 120 sq ft, and anything with electrical require a Fort Bend County, City of Richmond, or City of Houston permit. We pull the permit and coordinate inspections — you never talk to the county.' },
    { q: 'Do you handle HOA approval?', a: 'Yes. Every major Fort Bend HOA (Aliana, Harvest Green, Pecan Grove, Riverstone, Telfair, Cinco Ranch, Firethorne, Cross Creek Ranch) has its own ARC packet. We prepare drawings, material chips, setback diagrams and submit on your behalf. If a material is rejected we re-spec at no charge.' },
    { q: 'Can you tie a new patio cover into my existing roofline?', a: 'Yes — and we almost always recommend it. A proper roof tie-in (matching pitch, fascia, color and shingle profile) makes the cover read as part of the original build, not a bolt-on. We handle flashing, water-sealing and shingle match.' },
    { q: 'How long does a patio cover take to build?', a: 'Simple attached aluminum covers: 3–5 working days once permit is approved. Custom wood or insulated covers with electrical: 7–10 days. The front-end HOA and permit review adds 2–6 weeks — we start that the day you sign.' },
    { q: 'Can you add ceiling fans, lights or a TV mount to the cover?', a: 'Yes. We pre-wire for fans, recessed or pendant lighting, TV mount outlets, and outdoor speakers during the build. Adding them after the cover is finished costs 30–50% more because of the rework.' },
    { q: 'Can I add a patio cover to my existing concrete slab?', a: 'In most cases, yes. If the slab is in good condition and at least 4 inches thick, cover posts attach directly via engineered brackets and footings. If the slab is cracked, undersized or the wrong shape, we can extend or pour a new section at the same time.' },
    { q: 'What warranty do you offer?', a: 'All labor is warrantied for 1 year on construction defects. Manufacturer warranties on insulated panels (20–30 years), aluminum framing (20+ years), and ceiling fans/lighting (per manufacturer) pass through to you.' },
    { q: 'Do you work outside Richmond?', a: 'Yes — we regularly build in Katy, Sugar Land, Rosenberg, Fulshear, Missouri City, Cinco Ranch, Greatwood, Pecan Grove and greater Houston. Each city has its own service-area page with local pricing and HOA notes.' },
  ],
  fallbackImage: '/og-image.jpg',
  relatedServices: ['outdoor-kitchens', 'pergolas', 'concrete-driveways'],
};

// ──────────────────────────────────────────────────────────────────
// OUTDOOR KITCHENS
// ──────────────────────────────────────────────────────────────────
const outdoorKitchens: PillarContent = {
  slug: 'outdoor-kitchens',
  titleTag: 'Outdoor Kitchens — Richmond, Katy & Houston TX',
  metaDescription:
    'Custom outdoor kitchens built in Richmond, Katy, Sugar Land & Houston TX. Built-in grills, stone counters, full utility hookups. Licensed, insured, 15+ years. (832) 945-8084.',
  h1: 'Custom Outdoor Kitchens — Built-In Grills, Stone Counters & Full Utilities',
  answerFirst:
    'One Stop Outdoor Construction designs and builds custom outdoor kitchens across Richmond, Katy, Sugar Land and Houston, TX. Masonry or steel-frame bases, stainless built-in appliances, natural-stone countertops, and full gas/water/electrical integration. Free estimates: (832) 945-8084.',
  intro: [
    'A real outdoor kitchen is not a grill on a cart. It\'s a permanent, weatherproof, utility-connected space that works as hard as your indoor kitchen — in August heat, in spring storms, and for twenty years of family cookouts. Building one right means getting the base, the ventilation, the utility lines and the finish all correct the first time.',
    'We design every outdoor kitchen around how you actually cook. Grill master who wants a 36" built-in and a side burner? Smoker enthusiast with a Big Green Egg? Pizza-oven family? We spec the layout, build the masonry or steel-frame base, run gas and water, drop in the appliances and finish with stone or tile. Everything under one warranty.',
  ],
  materials: [
    {
      name: 'Masonry base',
      description: 'CMU block core with stucco, stone veneer or tile finish. Classic permanent build.',
      pros: ['Extremely durable (30+ years)', 'Premium look', 'Wide finish options'],
      cons: ['Longer build time', 'Higher upfront cost'],
      costRange: '$12,000 – $45,000 installed',
      lifespan: '30+ years',
    },
    {
      name: 'Steel-frame base',
      description: 'Welded steel frame with cement board and stone or stucco finish. Faster to install than masonry.',
      pros: ['Faster install', 'Lighter (better on slabs)', 'Lower cost than full masonry'],
      cons: ['Shorter lifespan than masonry', 'Less thermal mass'],
      costRange: '$8,000 – $25,000 installed',
      lifespan: '20+ years',
    },
    {
      name: 'Countertop — granite',
      description: 'Natural granite, sealed for outdoor use. Most popular choice.',
      pros: ['Heat-resistant', 'Scratch-resistant', 'Wide color options'],
      cons: ['Requires annual resealing', 'Can chip on sharp impact'],
      costRange: '$60 – $120 per sq ft installed',
      lifespan: '25+ years',
    },
    {
      name: 'Countertop — leathered quartzite',
      description: 'Our preferred outdoor counter for Gulf humidity. Natural stone with matte leathered finish.',
      pros: ['Doesn\'t show water spots', 'Non-slip surface', 'Extremely heat-tolerant'],
      cons: ['Higher cost than granite', 'Limited color palette'],
      costRange: '$80 – $160 per sq ft installed',
      lifespan: '30+ years',
    },
  ],
  process: [
    { step: 'Design consultation', description: 'We walk the space, discuss how you cook, and sketch layout options with appliance placement and utility runs.', timeline: '1 on-site visit + 1 revision round' },
    { step: 'Utility planning', description: 'Gas line route, water supply and drain, 110V and 220V electrical, ventilation if under cover.', timeline: 'Included in design phase' },
    { step: 'Permit', description: 'Most outdoor kitchens need a permit because of gas, water and electrical. We pull it.', timeline: '1–3 weeks' },
    { step: 'Base construction', description: 'Masonry or steel frame, cement board, waterproofing membrane.', timeline: '3–7 days' },
    { step: 'Utilities + appliances', description: 'Gas, water, electrical rough-in, appliance set, countertop fabrication and install.', timeline: '5–10 days' },
    { step: 'Finish + final inspection', description: 'Stone veneer, tile, grout, sealant. City inspection. Walk-through.', timeline: '3–5 days' },
  ],
  pricing: [
    { tier: 'Basic L-shape with built-in grill', range: '$8,000 – $15,000', includes: 'Steel-frame base, built-in 30" grill, basic counter, stucco or tile finish' },
    { tier: 'Mid-tier with grill, side burner, refrigerator', range: '$15,000 – $30,000', includes: 'Masonry base, 36" grill, side burner, outdoor fridge, granite counter, stone veneer' },
    { tier: 'Full outdoor kitchen with bar + prep island', range: '$30,000 – $60,000', includes: 'Full masonry, 36"+ grill, smoker, sink with drain, refrigerator, bar seating, leathered-quartzite counters' },
    { tier: 'Luxury build with pizza oven + Kamado', range: '$50,000 – $100,000+', includes: 'Full masonry, dual prep islands, pizza oven, Kamado, ice maker, full bar, designer lighting, roof integration' },
  ],
  faqs: [
    { q: 'How much does an outdoor kitchen cost in Texas?', a: 'A basic L-shape with a built-in grill runs $8,000–$15,000. Most of our Richmond, Katy and Sugar Land projects fall in the $15,000–$35,000 range with a built-in grill, side burner, refrigerator, granite counter and stone finish. Luxury builds with pizza ovens, prep islands and bars run $50,000–$100,000+.' },
    { q: 'Do I need a permit for an outdoor kitchen?', a: 'Yes — outdoor kitchens require permits because of gas, water and electrical. We pull the permit, submit the plan set, and coordinate inspections.' },
    { q: 'What\'s the best countertop material for an outdoor kitchen in humid Texas?', a: 'We recommend leathered quartzite. It doesn\'t show water spots, is non-slip, and handles heat from grills without staining. Granite is a close second and more affordable.' },
    { q: 'Should I put my outdoor kitchen under a patio cover?', a: 'Yes, almost always. A cover protects appliances from rain and UV, extends your usable season, and lets you cook in summer storms. We often design the cover and kitchen together so the ventilation and lighting are integrated.' },
    { q: 'What brands of built-in grills do you install?', a: 'We install all major brands — Blaze, DCS, Lynx, Alfresco, Bull, Summerset, Twin Eagles, Napoleon and Weber Summit. We typically recommend based on your budget and warranty preference.' },
    { q: 'Can you add gas and water lines if my backyard doesn\'t have them?', a: 'Yes. We trench and run new gas and water from the house. If your gas meter is undersized for the combined indoor + outdoor load, we coordinate the utility upgrade.' },
    { q: 'How long does an outdoor kitchen take to build?', a: 'Most builds are 2–4 weeks of active construction plus 1–3 weeks for permit. Basic steel-frame kitchens can finish in as little as 10 working days; full masonry luxury builds can take 6–8 weeks.' },
    { q: 'Do you design outdoor kitchens for small backyards?', a: 'Yes — one of our most common Katy and Sugar Land builds is a compact L-shape that fits on a 10\'×12\' slab and still includes a grill, side burner and prep space. We work with the space you have.' },
  ],
  fallbackImage: '/og-image.jpg',
  relatedServices: ['patio-covers', 'concrete-driveways', 'pergolas'],
};

// ──────────────────────────────────────────────────────────────────
// PERGOLAS
// ──────────────────────────────────────────────────────────────────
const pergolas: PillarContent = {
  slug: 'pergolas',
  titleTag: 'Custom Pergolas — Richmond, Katy & Houston TX',
  metaDescription:
    'Custom wood, aluminum and steel pergolas built across Richmond, Katy, Sugar Land & Houston TX. Attached, freestanding, motorized louvered. Licensed, insured. (832) 945-8084.',
  h1: 'Custom Pergolas — Wood, Aluminum, Steel & Motorized Louvered',
  answerFirst:
    'One Stop Outdoor Construction builds custom pergolas — wood, aluminum, steel and motorized louvered — across Richmond, Katy, Sugar Land and Houston, TX. Attached or freestanding, with integrated lighting and fans. Free on-site estimates: (832) 945-8084.',
  intro: [
    'A pergola is the most versatile outdoor structure you can build. It defines a space, filters sun, anchors a seating area, and can carry lighting, fans, privacy panels and climbing plants. Done in the right material and scale, it transforms a featureless yard into an outdoor room — without the cost of a full patio cover.',
    'We build pergolas in four structural materials (cedar, pressure-treated pine, aluminum and powder-coated steel) and every common style — attached to the house, freestanding over a patio, freestanding over a kitchen, or motorized louvered for programmable shade. Every build is engineered for Gulf-coast wind loads and permitted through your local jurisdiction.',
  ],
  materials: [
    {
      name: 'Cedar',
      description: 'Premium softwood with natural weather resistance. Warm honey color that greys beautifully if left unsealed.',
      pros: ['Natural weather resistance', 'Beautiful grain', 'Ages to silver-grey if unsealed'],
      cons: ['Higher cost than pine', 'Needs re-sealing every 2–3 years to keep color'],
      costRange: '$7,000 – $18,000 installed',
      lifespan: '20–25 years',
    },
    {
      name: 'Pressure-treated pine',
      description: 'Most affordable wood option. Pre-treated against rot and insects.',
      pros: ['Lowest cost wood option', 'Easy to paint or stain any color', 'Wide availability'],
      cons: ['Requires annual staining', 'Tends to check and split in hot dry spells'],
      costRange: '$5,000 – $12,000 installed',
      lifespan: '15–20 years',
    },
    {
      name: 'Aluminum',
      description: 'Powder-coated aluminum — zero maintenance, never rusts or rots.',
      pros: ['Zero maintenance', 'Clean modern look', 'Available in any color'],
      cons: ['Less warm than wood', 'Shows dents from hard impacts'],
      costRange: '$8,000 – $20,000 installed',
      lifespan: '25+ years',
    },
    {
      name: 'Motorized louvered aluminum',
      description: 'Programmable tilting louvers — open for sun, close for shade or rain. Top-of-line.',
      pros: ['Adjustable shade', 'Rain-proof when closed', 'Integrated lighting and screens available'],
      cons: ['Significantly higher cost', 'Motor and electronics to maintain'],
      costRange: '$18,000 – $45,000+ installed',
      lifespan: '20+ years with motor service',
    },
  ],
  process: [
    { step: 'Site measurement + design', description: 'Walk the space, confirm material, sketch scale and post placement.', timeline: '1 visit' },
    { step: 'HOA + permit', description: 'Attached pergolas and detached structures over 120 sq ft typically require both.', timeline: '2–6 weeks' },
    { step: 'Foundation', description: 'Concrete footings or anchor-bolt plates into existing slab.', timeline: '1–2 days' },
    { step: 'Frame + roof slats', description: 'Posts, beams, rafters and top slats assembled on-site.', timeline: '2–5 days' },
    { step: 'Electrical + finish', description: 'Ceiling fans, lighting, staining/sealing.', timeline: '1–2 days' },
  ],
  pricing: [
    { tier: 'Basic pine pergola (10\'×12\')', range: '$5,000 – $9,000', includes: 'Pressure-treated pine frame, standard stain, basic footings' },
    { tier: 'Cedar or aluminum (12\'×16\')', range: '$8,000 – $18,000', includes: 'Premium framing, lighting pre-wire, ceiling-fan mount, premium stain or powder coat' },
    { tier: 'Custom with fans, lighting, screens', range: '$15,000 – $30,000', includes: 'Larger scale, integrated lighting, ceiling fans, privacy screens, HOA submission' },
    { tier: 'Motorized louvered', range: '$18,000 – $45,000+', includes: 'Programmable louvers, integrated LED lighting, optional screens, smart-home integration' },
  ],
  faqs: [
    { q: 'How much does a pergola cost in Texas?', a: 'Basic pine pergolas start around $5,000 for a 10\'×12\'. Cedar and aluminum builds typically run $8,000–$18,000. Motorized louvered aluminum pergolas run $18,000–$45,000+ depending on size and features.' },
    { q: 'Wood or aluminum — which pergola is better?', a: 'For warmth and traditional curb appeal, cedar wins. For zero maintenance and longevity in Gulf humidity, powder-coated aluminum wins. If you want adjustable shade or rain protection, motorized louvered aluminum is the only real option.' },
    { q: 'Do I need a permit for a pergola?', a: 'Usually yes. Attached pergolas, detached structures over 120 sq ft, and any pergola with electrical require a permit in Fort Bend County and the City of Houston. We pull it.' },
    { q: 'Will a pergola provide real shade?', a: 'A traditional open-slat pergola filters sun but isn\'t fully shaded — about 40–60% shade coverage. For full shade, we either tighten the slat spacing, add a polycarbonate roof panel, or build a motorized louvered pergola that closes completely.' },
    { q: 'Can a pergola support a ceiling fan?', a: 'Yes — we engineer the main beam for fan load and pre-wire during construction. Adding a fan to an existing pergola costs more because of the rework.' },
    { q: 'Can you build a pergola over an existing patio slab?', a: 'Yes — if the slab is in good condition, we anchor posts directly with engineered plates. If the slab is cracked or undersized, we extend or re-pour.' },
    { q: 'What\'s the difference between a pergola and a patio cover?', a: 'A patio cover has a solid (or nearly solid) roof — full shade, full rain protection. A pergola has an open slat roof — partial shade, not rainproof. Pergolas are usually less expensive and look more architectural; covers are more functional.' },
    { q: 'How long does it take to build a pergola?', a: 'After permit: 3–7 working days for most builds. Motorized louvered pergolas take 5–10 days because of the motor commissioning.' },
  ],
  fallbackImage: '/og-image.jpg',
  relatedServices: ['patio-covers', 'outdoor-kitchens', 'concrete-driveways'],
};

// ──────────────────────────────────────────────────────────────────
// CONCRETE & DRIVEWAYS (includes stamped)
// ──────────────────────────────────────────────────────────────────
const concreteDriveways: PillarContent = {
  slug: 'concrete-driveways',
  titleTag: 'Concrete & Stamped Concrete | Richmond, Katy & Houston TX',
  metaDescription:
    'Concrete patios, driveways, stamped and decorative concrete across Richmond, Katy, Sugar Land & Houston TX. Built for Fort Bend clay soils. Licensed, 15+ years. (832) 945-8084.',
  h1: 'Concrete Patios, Driveways & Stamped Concrete',
  answerFirst:
    'One Stop Outdoor Construction installs concrete driveways, patios, walkways and stamped decorative concrete across Richmond, Katy, Sugar Land and Houston, TX. Every slab is prepped for Fort Bend\'s expansive clay soils so it doesn\'t crack. Free estimates: (832) 945-8084.',
  intro: [
    'Concrete in Fort Bend and west Houston is harder than most contractors treat it. Expansive clay soil swells when wet and shrinks when dry, which is why poorly-prepped driveways and patios develop hairline cracks in year one and structural cracks by year three. The fix is not a better mix — it\'s a better sub-base, proper expansion joints and fiber reinforcement.',
    'We\'ve poured concrete across Fort Bend County for 15+ years. Every slab we install starts with proper sub-base compaction, fiber-reinforced 3,500-psi mix, and expansion joints on a correct grid. For stamped or decorative work, we offer dozens of pattern and color combinations — ashlar slate, random stone, wood plank, running bond and more.',
  ],
  materials: [
    {
      name: 'Standard concrete',
      description: 'Fiber-reinforced 3,500-psi mix, broom or trowel finish. Our baseline.',
      pros: ['Most affordable', 'Fast cure', 'Wide utility (driveway, patio, walkway)'],
      cons: ['Plain look', 'Shows stains without sealer'],
      costRange: '$6 – $12 per sq ft installed',
      lifespan: '25+ years with proper prep',
    },
    {
      name: 'Stamped concrete',
      description: 'Textured stamp pattern applied to wet concrete. Most popular decorative option.',
      pros: ['Premium look at fraction of flagstone cost', 'Dozens of patterns', 'Integral color options'],
      cons: ['Requires resealing every 2–3 years', 'More labor-intensive to install'],
      costRange: '$12 – $22 per sq ft installed',
      lifespan: '25+ years with resealing',
    },
    {
      name: 'Colored / integral-color concrete',
      description: 'Color added to the mix at the plant, not the surface. Color runs through the slab.',
      pros: ['Color won\'t wear off', 'Works great as base for stamped', 'Low maintenance'],
      cons: ['Color is permanent — pick carefully', 'Higher mix cost'],
      costRange: '$10 – $18 per sq ft installed',
      lifespan: '25+ years',
    },
    {
      name: 'Exposed aggregate',
      description: 'Surface paste washed away to expose embedded stones. Non-slip, textured finish.',
      pros: ['Non-slip (great for pool decks)', 'Durable', 'Natural look'],
      cons: ['Rough on bare feet', 'Harder to clean'],
      costRange: '$10 – $16 per sq ft installed',
      lifespan: '25+ years',
    },
  ],
  process: [
    { step: 'On-site measure + quote', description: 'Exact square footage, thickness needed, finish selection, edge detail.', timeline: '1 visit' },
    { step: 'Permit if required', description: 'New driveway aprons typically require a city permit; patios usually don\'t.', timeline: '1–3 weeks if permit needed' },
    { step: 'Demo + sub-base prep', description: 'Remove existing slab, compact sub-base, install forms, set rebar/mesh.', timeline: '1–3 days' },
    { step: 'Pour + finish', description: 'Fiber-reinforced 3,500-psi mix, broom/trowel/stamp/expose as specified, expansion joints cut.', timeline: '1 day per pour' },
    { step: 'Cure + seal', description: 'Proper cure time (3–7 days light use, 28 days full cure), sealer application if stamped/decorative.', timeline: '3–7 days' },
  ],
  pricing: [
    { tier: 'Standard concrete patio or walkway', range: '$6 – $12 / sq ft', includes: 'Sub-base prep, 4" 3,500-psi fiber-reinforced mix, broom finish, expansion joints' },
    { tier: 'Stamped concrete patio', range: '$12 – $22 / sq ft', includes: 'Above + integral color, stamp pattern, release agent, sealer' },
    { tier: 'Concrete driveway (residential)', range: '$8 – $15 / sq ft', includes: '4–5" thickness, wire mesh or rebar, saw-cut expansion joints, city apron permit' },
    { tier: 'Decorative stamped driveway', range: '$15 – $25 / sq ft', includes: 'Above + stamp, color, sealer; most Richmond/Katy stamped driveways run $8,000–$20,000 total' },
  ],
  faqs: [
    { q: 'How much does a concrete patio cost in Texas?', a: 'Standard concrete patios run $6–$12 per square foot installed in the Richmond/Katy/Houston market. A typical 300 sq ft patio costs $1,800–$3,600 standard or $3,600–$6,600 stamped. Most of our Richmond stamped jobs fall in the $4,500–$9,000 range depending on size and pattern.' },
    { q: 'How long does concrete take to cure?', a: '24 hours for light foot traffic, 3–7 days for normal patio use, 28 days for full strength. We recommend keeping vehicles off new driveways for at least 7 days, longer in cold weather.' },
    { q: 'Why does concrete crack in Richmond and Sugar Land?', a: 'Expansive clay soil. When it rains the soil swells; when it dries it shrinks. Poorly-prepped slabs move with the soil and crack. Proper sub-base compaction, fiber reinforcement, and correctly-spaced expansion joints prevent this. Every slab we install uses all three.' },
    { q: 'What\'s the difference between stamped and stained concrete?', a: 'Stamped concrete has a pattern pressed into wet concrete — looks like stone, brick or wood plank. Stained concrete has color applied to existing cured concrete — can be used on old slabs. Stamped is done at pour; stain is a refurbishment.' },
    { q: 'Can you stamp my existing patio?', a: 'Not directly — you can\'t stamp cured concrete. But a stamped concrete overlay (2–3 inches of new concrete with stamp) can be applied over a sound existing slab. That saves demo cost and gives you the stamped look.' },
    { q: 'How often does stamped concrete need to be resealed?', a: 'Every 2–3 years in Texas sun and humidity. Resealing refreshes the color, closes surface pores against stains, and extends the life of the finish. We offer a resealing service for our past clients.' },
    { q: 'Do you pour in summer heat?', a: 'Yes, with adjustments. Early-morning pours, chilled mix water, retarding admixtures, and continuous water curing prevent rapid moisture loss that causes surface cracking. We schedule summer pours carefully.' },
    { q: 'Do I need a permit for a new concrete driveway?', a: 'Usually yes — a driveway apron (where the drive meets the street) requires a permit from the city or Fort Bend County. We pull it and coordinate the inspection. Backyard patios typically don\'t require a permit.' },
  ],
  fallbackImage: '/og-image.jpg',
  relatedServices: ['patio-covers', 'walkways-pavers', 'outdoor-kitchens'],
};

// ──────────────────────────────────────────────────────────────────
// WALKWAYS & PAVERS
// ──────────────────────────────────────────────────────────────────
const walkwaysPavers: PillarContent = {
  slug: 'walkways-pavers',
  titleTag: 'Paver Walkways — Richmond, Katy & Houston TX',
  metaDescription:
    'Paver stone walkways, flagstone pathways and natural-stone installations across Richmond, Katy, Sugar Land & Houston TX. Licensed, insured, 15+ years. (832) 945-8084.',
  h1: 'Paver Walkways & Natural Stone Pathways',
  answerFirst:
    'One Stop Outdoor Construction installs paver walkways, flagstone pathways and natural-stone installations across Richmond, Katy, Sugar Land and Houston, TX. Durable, HOA-friendly, properly-prepped for clay soils. Free estimates: (832) 945-8084.',
  intro: [
    'A paver walkway does more than replace a muddy path — it defines the flow of your yard, adds curb appeal the day it\'s installed, and flexes with ground movement in ways that concrete can\'t. When we install pavers over a properly-prepped base, they stay level and crack-free for decades.',
    'We build walkways in concrete pavers, natural flagstone, slate and stamped brick. Each installation includes excavation, compacted base, bedding sand, and polymeric joint sand that locks everything in place without getting washed out by summer rain.',
  ],
  process: [
    { step: 'Design + layout', description: 'Measure the path, pick material and pattern, chalk-line the route.', timeline: '1 visit' },
    { step: 'Excavate + compact base', description: 'Remove soil 6–8 inches deep, install geo-fabric, add crushed-stone base compacted in lifts.', timeline: '1–2 days' },
    { step: 'Set pavers', description: 'Bedding sand, pavers set to pattern, edge restraint installed.', timeline: '1–3 days' },
    { step: 'Finish', description: 'Polymeric joint sand swept in, lightly wetted to activate.', timeline: '1 day' },
  ],
  pricing: [
    { tier: 'Concrete paver walkway', range: '$15 – $25 / sq ft', includes: 'Excavation, compacted base, pavers, edge restraint, polymeric sand' },
    { tier: 'Natural flagstone pathway', range: '$20 – $35 / sq ft', includes: 'Above + natural stone (random or cut) with mortared or sand-set joints' },
    { tier: 'Premium slate or bluestone', range: '$25 – $45 / sq ft', includes: 'Premium stone material, tighter pattern tolerance, mortared joints' },
  ],
  faqs: [
    { q: 'How much does a paver walkway cost?', a: 'Concrete pavers typically run $15–$25 per square foot installed. A 100-foot walkway averages $2,000–$6,000 depending on width and material. Natural flagstone runs $20–$35/sf; premium slate/bluestone runs $25–$45/sf.' },
    { q: 'How long do paver walkways last?', a: '25+ years with proper base prep. The pavers themselves outlast the warranty — what fails is the base if it wasn\'t compacted properly. Our installations include a compacted crushed-stone base with geo-fabric to prevent settling.' },
    { q: 'Will the joints fill with weeds?', a: 'Not if polymeric sand is used. Polymeric joint sand hardens when wetted, locking pavers in place and blocking weed germination. It lasts 5–7 years before needing a refresh.' },
    { q: 'Can I lay pavers over my existing concrete walkway?', a: 'Yes, in some cases. If the existing slab is level and sound, thin pavers can be bonded directly. More commonly we break out the old slab and install pavers on a proper compacted base — the result lasts longer.' },
    { q: 'Do you do paver driveways and patios?', a: 'Yes. Paver patios run $18–$30/sf and paver driveways run $20–$35/sf depending on paver thickness. For driveways we use thicker (2-3/8") pavers rated for vehicle loads.' },
    { q: 'What stone types do you work with?', a: 'Concrete pavers (Belgard, Unilock, Pavestone), natural flagstone, Oklahoma flagstone, slate, bluestone, Arizona sandstone. We recommend based on budget and style.' },
  ],
  fallbackImage: '/og-image.jpg',
  relatedServices: ['concrete-driveways', 'patio-covers', 'outdoor-kitchens'],
};

// ──────────────────────────────────────────────────────────────────
// ROOFING
// ──────────────────────────────────────────────────────────────────
const roofing: PillarContent = {
  slug: 'roofing',
  titleTag: 'Residential Roofing — Richmond, Katy & Houston TX',
  metaDescription:
    'Residential roofing installation and replacement across Richmond, Katy, Sugar Land & Houston TX. Shingle, metal, flat and green roofing. Licensed, insured, 15+ years. (832) 945-8084.',
  h1: 'Residential Roofing — Shingle, Metal, Flat & Green',
  answerFirst:
    'One Stop Outdoor Construction installs and replaces residential roofs across Richmond, Katy, Sugar Land and Houston, TX — shingle, metal, flat and green roofing systems. Licensed, insured, manufacturer-certified. Free inspection: (832) 945-8084.',
  intro: [
    'Texas roofs take a beating — UV, humidity, hail and occasional hurricane winds. The right roof for your home depends on slope, architectural style, budget and how long you plan to stay. We install the four main residential roofing systems and, more importantly, we prep and flash correctly so the system\'s rated lifespan is the lifespan you actually get.',
    'Every roof we install includes full tear-off, deck inspection and repair, drip edge, ice-and-water shield at valleys and penetrations, synthetic underlayment, manufacturer-spec installation, and final inspection. We\'re certified by major shingle manufacturers and can offer extended warranties on qualifying installs.',
  ],
  materials: [
    {
      name: 'Architectural asphalt shingle',
      description: 'Most common residential roof. Dimensional layered shingles with 25-30 year warranties.',
      pros: ['Lowest cost', 'Wide color options', 'Most-repaired system in Texas'],
      cons: ['Shorter lifespan than metal', 'Less wind rating without upgraded install'],
      costRange: '$4 – $7 per sq ft installed',
      lifespan: '20–30 years',
    },
    {
      name: 'Standing-seam metal',
      description: 'Interlocking metal panels with concealed fasteners. Premium residential roof.',
      pros: ['50+ year lifespan', 'Excellent wind rating', 'Energy efficient (reflective)'],
      cons: ['2–3× cost of shingle', 'Louder in rain without proper underlayment'],
      costRange: '$10 – $18 per sq ft installed',
      lifespan: '50+ years',
    },
    {
      name: 'Flat / low-slope (TPO or modified bitumen)',
      description: 'Membrane systems for flat or nearly-flat roof sections. Common on modern additions and garages.',
      pros: ['Handles low slopes where shingles fail', 'Reflective options reduce heat load', 'Relatively fast install'],
      cons: ['Specialized repair', 'Requires periodic reseal at seams'],
      costRange: '$7 – $13 per sq ft installed',
      lifespan: '20–25 years',
    },
  ],
  process: [
    { step: 'Roof inspection + quote', description: 'On-site roof walk, deck condition, ventilation check, itemized quote.', timeline: '1 visit' },
    { step: 'Insurance coordination (if storm-damage)', description: 'We can work directly with your insurance adjuster on hail/wind claims.', timeline: '1–4 weeks' },
    { step: 'Tear-off', description: 'Remove existing roof down to deck, inspect and repair deck as needed.', timeline: '1 day' },
    { step: 'Underlayment + install', description: 'Drip edge, ice-and-water shield, synthetic underlayment, shingle or panel install.', timeline: '1–3 days' },
    { step: 'Cleanup + inspection', description: 'Magnetic sweep for nails, final walk-through, warranty registration.', timeline: '1 day' },
  ],
  pricing: [
    { tier: 'Architectural shingle roof (typical 2,000 sq ft home)', range: '$8,000 – $14,000', includes: 'Full tear-off, deck repair, drip edge, underlayment, 30-year shingle, ridge vent' },
    { tier: 'Standing-seam metal roof (typical 2,000 sq ft home)', range: '$20,000 – $36,000', includes: 'Full system install, concealed fasteners, 24–26 gauge panels' },
    { tier: 'Flat/low-slope TPO (per 1,000 sq ft)', range: '$7,000 – $13,000', includes: 'Tear-off, insulation board, TPO membrane, flashing, drains' },
  ],
  faqs: [
    { q: 'How much does a new roof cost in Houston?', a: 'A typical 2,000 sq ft Houston-area home runs $8,000–$14,000 for architectural shingles, $20,000–$36,000 for standing-seam metal, or $7,000–$13,000 per 1,000 sq ft for TPO on flat sections.' },
    { q: 'How long does a roof replacement take?', a: 'Most shingle roofs are finished in 1–2 working days. Standing-seam metal takes 3–5 days. Flat roofs on smaller sections are 1–3 days.' },
    { q: 'Do you work with insurance on storm claims?', a: 'Yes — we regularly coordinate with insurance adjusters on hail and wind damage claims across Fort Bend and Harris County. We\'ll document the damage, meet the adjuster on-site, and scope the replacement to match the approved claim.' },
    { q: 'How do I know if I need a new roof or just a repair?', a: 'Missing or curled shingles in multiple areas, granule loss in gutters, visible sag, daylight in the attic, and leaks during normal rain are replacement indicators. Isolated damage (one flashed pipe, one wind-blown shingle) is usually a repair.' },
    { q: 'What warranty comes with a new roof?', a: 'Shingle manufacturers offer 25-year to lifetime limited warranties on the material. We offer 1-year workmanship warranty on installation. On qualifying certified installs we can offer extended manufacturer coverage.' },
    { q: 'Do you also do roof tie-ins for new patio covers?', a: 'Yes — we do it on every patio cover build. Matching pitch, fascia, flashing and shingle profile makes the cover read as original construction. One crew, one warranty.' },
  ],
  fallbackImage: '/og-image.jpg',
  relatedServices: ['patio-covers', 'pergolas'],
};

// ──────────────────────────────────────────────────────────────────
// EXPORT
// ──────────────────────────────────────────────────────────────────
export const pillarContent: Record<string, PillarContent> = {
  'patio-covers': patioCovers,
  'outdoor-kitchens': outdoorKitchens,
  'pergolas': pergolas,
  'concrete-driveways': concreteDriveways,
  'walkways-pavers': walkwaysPavers,
  'roofing': roofing,
};

export function getPillarBySlug(slug: string): PillarContent | undefined {
  return pillarContent[slug];
}
