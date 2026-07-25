export type Spec = { k: string; v: string };
export type FAQ = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  blurb: string;
  specs: Spec[];
  sizes: string[];
  image: string;       // primary / thumbnail image
  images?: string[];   // optional gallery — falls back to [image] if not provided
};

export type Category = {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  tagline: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  industries: string[];
  faqs: FAQ[];
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const resolveImage = (image?: string) => {
  if (!image) return "";
  if (image.startsWith('/') || image.startsWith('http')) return image;
  return img(image);
};

// Returns a resolved gallery array for a product, always `count` long.
// Uses p.images if present, otherwise repeats p.image as a fallback.
export const resolveGallery = (p: Product, count = 3) => {
  const raw = p.images && p.images.length > 0 ? p.images : [p.image];
  const resolved = raw.map(resolveImage);
  while (resolved.length < count) resolved.push(resolved[0] ?? "");
  return resolved.slice(0, count);
};

export const categories: Category[] = [
  {
    slug: "packaging-tape",
    name: "Packaging Tape",
    icon: "Package",
    tagline: "High-tack BOPP & carton sealing tapes",
    description:
      "Our BOPP self-adhesive packaging tapes deliver dependable carton sealing performance for high-speed dispatch lines. Manufactured from premium bi-axially oriented polypropylene film with solvent-free acrylic or hot-melt adhesive, each roll offers consistent tack, clean unwind and strong holding power across cartons, cases and export consignments.",
    image: '/product-img/Packaging-Tape.jpg',
    features: [
      "Strong instant tack and shear holding",
      "Noise-controlled clean unwind",
      "Solvent-free, odour-free acrylic adhesive",
      "Available printed for brand promotion",
    ],
    applications: ["Carton sealing", "Export packaging", "E-commerce dispatch", "Bundling & strapping"],
    industries: ["FMCG", "E-commerce & Retail", "Logistics", "Manufacturing"],
    faqs: [
      { q: "What widths are available?", a: "Standard widths are 24mm, 48mm and 72mm, with custom slitting from 12mm upwards on request." },
      { q: "Can tapes be printed with our logo?", a: "Yes. We supply single and multi-colour printed BOPP tapes with your brand name, logo or handling instructions." },
    ],
  },
  {
    slug: "tape",
    name: "Adhesive & Double-Sided Tape",
    icon: "Layers",
    tagline: "Single & double-sided bonding tapes",
    description:
      "A versatile range of transparent, polyester and double-sided adhesive tapes engineered for mounting, splicing and bonding. From clear stationery tapes to high-performance double-sided polyester and 3M-grade tissue tapes, each product is coated with pressure-sensitive adhesive for reliable, residue-free adhesion.",
    image: '/product-img/double-category.png',
    features: [
      "Pressure-sensitive high-bond adhesive",
      "Clear, low-profile finish",
      "Excellent age and temperature stability",
      "Die-cuttable to custom shapes",
    ],
    applications: ["Mounting & bonding", "Splicing", "POS display assembly", "Print finishing"],
    industries: ["Printing & Packaging", "Retail Display", "Electronics", "Signage"],
    faqs: [
      { q: "Do double-sided tapes leave residue?", a: "No. Our polyester and tissue-carrier tapes are designed for clean removal on most substrates." },
    ],
  },
  {
    slug: "label-printing-tape",
    name: "Label & Flexo Printing Tape",
    icon: "Printer",
    tagline: "Plate-mounting & printing consumables",
    description:
      "Precision double-sided cotton flexo printing tapes, clear polyester tapes and tissue tapes engineered for the label, flexo and offset printing industries. These plate-mounting tapes provide uniform cushioning, accurate registration and clean release for repeat print jobs.",
    image: '/product-img/flexo-printing-label.jpg',
    features: [
      "Uniform foam cushioning for print clarity",
      "Consistent thickness tolerance",
      "Clean plate release without ghosting",
      "Available in soft / medium / hard densities",
    ],
    applications: ["Flexo plate mounting", "Label converting", "Sleeve building", "Paper application"],
    industries: ["Label Printing", "Flexible Packaging", "Corrugation", "Publishing"],
    faqs: [
      { q: "Which density should we choose?", a: "Soft cushions solids, medium is an all-round choice, and hard suits fine line and text work. Our team can advise per plate type." },
    ],
  },
  {
    slug: "electrical-tapes",
    name: "Electrical Tapes",
    icon: "Zap",
    tagline: "Insulation & harness tapes",
    description:
      "Flame-retardant PVC, polyester and cotton cloth electrical tapes for insulation, harnessing and high-temperature applications. Manufactured to withstand demanding electrical loads with excellent dielectric strength and abrasion resistance.",
    image: '/product-img/Electrical-tape_black.jpg',
    features: [
      "High dielectric / insulation strength",
      "Flame-retardant PVC options",
      "Conformable and stretchable",
      "Heat-resistant polyester grades",
    ],
    applications: ["Wire insulation", "Cable harnessing", "Coil wrapping", "High-temp masking"],
    industries: ["Electrical", "Automotive", "Appliances", "Panel Manufacturing"],
    faqs: [
      { q: "Are these tapes flame-retardant?", a: "Yes, our PVC insulation tapes are formulated to be self-extinguishing and meet common electrical safety standards." },
    ],
  },
  {
    slug: "insulation-waterproof-tapes",
    name: "Insulation & Waterproof Tapes",
    icon: "Droplets",
    tagline: "Butyl, duct & foil sealing tapes",
    description:
      "A robust range of waterproof butyl rubber tapes, aluminium foil tapes and cloth duct tapes for sealing, insulation and moisture protection. Ideal for HVAC, roofing, ducting and industrial repair where a permanent watertight bond is essential.",
    image: '/product-img/insulation-waterproof-trapes.jpg',
    features: [
      "Fully waterproof and airtight seal",
      "Superior conformability to irregular surfaces",
      "UV and weather resistant",
      "Reflective aluminium foil grades",
    ],
    applications: ["HVAC duct sealing", "Roof & terrace waterproofing", "Pipe insulation", "Industrial repair"],
    industries: ["HVAC", "Construction", "Infrastructure", "Maintenance"],
    faqs: [
      { q: "Can duct tape be used outdoors?", a: "Our waterproof butyl and foil grades are UV-stabilised for exterior and long-term sealing applications." },
    ],
  },
  {
    slug: "architecture-glass-tapes",
    name: "Architecture & Glass Tapes",
    icon: "Building2",
    tagline: "Surface protection & glazing tapes",
    description:
      "Specialised surface protection films, colour masking tapes, spacer tapes and EPE backer rods for the architecture, glazing and facade industries. Engineered to protect finished surfaces during transit and installation, and to support structural glazing joints.",
    image: '/product-img/architecture-glass-tapes.jpg',
    features: [
      "Residue-free surface protection",
      "Clean-edge colour masking",
      "Backer rods for joint depth control",
      "UV-resistant glazing grades",
    ],
    applications: ["Glass & panel protection", "Facade masking", "Structural glazing joints", "Aluminium fabrication"],
    industries: ["Architecture", "Glass Processing", "Facade & Glazing", "Aluminium"],
    faqs: [
      { q: "Will protection tape damage glass or panels?", a: "No. Our surface protection tapes peel away cleanly without adhesive transfer within the recommended service window." },
    ],
  },
  {
    slug: "plastic-rods",
    name: "Plastic Rods & Backer Rods",
    icon: "Cylinder",
    tagline: "EPE foam backer rods & nylon tapes",
    description:
      "Closed-cell EPE foam backer rods in a full range of diameters, plus nylon reinforcement tapes. Backer rods control sealant depth in expansion joints, delivering better joint geometry, reduced sealant consumption and long-lasting weatherproof seals.",
    image: '/product-img/backer-rod-and-expansion-rod-back-up-rod.jpg',
    features: [
      "Closed-cell, non-absorbent foam",
      "Compressible for tight joint fit",
      "Diameters from 6mm to 80mm+",
      "Chemically inert with sealants",
    ],
    applications: ["Expansion joint filling", "Sealant backing", "Insulation packing", "Void filling"],
    industries: ["Construction", "Civil Infrastructure", "Facade", "Roads"],
    faqs: [
      { q: "How do I select backer rod diameter?", a: "Choose a rod roughly 25% larger than the joint width for correct compression. Our team can recommend sizes per joint." },
    ],
  },
  {
    slug: "expanded-polyethylene-foam",
    name: "Expanded Polyethylene (EPE) Foam",
    icon: "Box",
    tagline: "Protective foam profiles & tubes",
    description:
      "Lightweight, resilient EPE foam rods, pipe insulation tubes, C-sections and U-profiles engineered for edge protection, cushioning and thermal insulation. Closed-cell structure absorbs shock and vibration while remaining moisture-resistant and recyclable.",
    image: '/product-img/expanded-polyethylene.jpg',
    features: [
      "Excellent shock and vibration absorption",
      "Thermal insulation for pipes",
      "Custom C / U edge profiles",
      "Non-abrasive, surface-safe",
    ],
    applications: ["Edge & corner protection", "Pipe insulation", "Furniture packaging", "Appliance cushioning"],
    industries: ["Packaging", "White Goods", "Furniture", "Logistics"],
    faqs: [
      { q: "Can EPE profiles be customised?", a: "Yes, we extrude and cut C-sections, U-profiles and rods to your dimensions and colours." },
    ],
  },
  {
    slug: "eva-foam",
    name: "EVA Foam",
    icon: "Layers3",
    tagline: "Die-cut & CNC-routed EVA sheets",
    description:
      "Premium EVA foam sheets, rolls and die-cut components with fine cell structure and consistent density. Available as CNC-routed inserts, gaskets and protective packaging for tool cases, electronics and precision products.",
    image: '/product-img/EVA-foam.jpeg',
    features: [
      "Fine, uniform closed-cell structure",
      "CNC routing and die-cutting",
      "High resilience and cushioning",
      "Available in multiple colours & densities",
    ],
    applications: ["Tool case inserts", "Protective packaging", "Gaskets & seals", "Sports & footwear"],
    industries: ["Electronics", "Automotive", "Footwear", "Sports Goods"],
    faqs: [
      { q: "Do you make custom CNC foam inserts?", a: "Yes, share your product dimensions or drawing and we will router-cut precise foam inserts." },
    ],
  },
  {
    slug: "automotive-tapes",
    name: "Automotive Tapes",
    icon: "Car",
    tagline: "PE foam & panel bonding tapes",
    description:
      "High-performance PE foam and acrylic panel-bonding tapes for automotive trim, emblem mounting and weather sealing. Designed to bond dissimilar surfaces with vibration resistance and long-term durability in demanding under-hood and exterior conditions.",
    image: '/product-img/automotive-tapes.jpg',
    features: [
      "Strong structural bonding",
      "Vibration and temperature resistant",
      "Weatherproof PE foam carrier",
      "Bonds dissimilar substrates",
    ],
    applications: ["Emblem & trim mounting", "Panel bonding", "Weatherstrip sealing", "Badge fixing"],
    industries: ["Automotive OEM", "Auto Aftermarket", "Two-Wheeler", "Commercial Vehicles"],
    faqs: [
      { q: "Will these tapes hold in high heat?", a: "Yes, our acrylic foam tapes retain bond strength across a wide automotive temperature range." },
    ],
  },
  {
    slug: "roads-construction",
    name: "Road & Construction Products",
    icon: "TrafficCone",
    tagline: "Reflective, barricade & safety tapes",
    description:
      "Reflective fabric tapes, retro-reflective safety tapes, caution barricade tapes and LDPE curing sheets for road construction and site safety. Engineered for high visibility, weather durability and compliance with site safety practices.",
    image: '/product-img/silver-grey-fabric-reflective-tape.webp',
    features: [
      "High-visibility retro-reflectivity",
      "Weather and abrasion resistant",
      "Bright caution / barricade grades",
      "LDPE sheets for concrete curing",
    ],
    applications: ["Road safety marking", "Site barricading", "Concrete curing", "Hazard identification"],
    industries: ["Road Construction", "Civil Infrastructure", "Municipal", "Safety"],
    faqs: [
      { q: "Are reflective tapes suitable for outdoor road use?", a: "Yes, our retro-reflective and fabric reflective tapes are built for long outdoor exposure." },
    ],
  },
  {
    slug: "floor-care",
    name: "Floor Care & Marking",
    icon: "Grid3x3",
    tagline: "Floor marking & anti-skid tapes",
    description:
      "Durable PVC floor marking tapes, double-sided carpet tapes and anti-skid safety tapes for warehouses, factories and public spaces. Bright, hard-wearing films define lanes, zones and hazards while anti-slip grades improve underfoot safety.",
    image: '/product-img/floor-care-marking.jpg',
    features: [
      "Abrasion-resistant PVC film",
      "Bright, long-lasting colours",
      "Anti-skid textured grades",
      "Strong floor-grip adhesive",
    ],
    applications: ["Lane & zone marking", "Carpet fixing", "Stair & ramp safety", "5S workplace organisation"],
    industries: ["Warehousing", "Manufacturing", "Retail", "Hospitality"],
    faqs: [
      { q: "Can floor tape handle forklift traffic?", a: "Our heavy-duty PVC marking tapes are formulated to withstand foot and light vehicle traffic." },
    ],
  },
  {
    slug: "ldpe-sheet",
    name: "LDPE Sheets",
    icon: "Sheet",
    tagline: "Curing & protection sheeting",
    description:
      "LDPE and PQC sheets for road construction curing, moisture barriers and surface protection. Supplied in a range of gauges and widths to suit civil, agricultural and packaging protection needs.",
    image: '/product-img/black-ldpe-polythene-sheet.jpeg',
    features: [
      "Consistent gauge and clarity",
      "Effective moisture barrier",
      "Tear and puncture resistant",
      "Custom widths and thickness",
    ],
    applications: ["Concrete curing", "Ground / moisture barrier", "Surface covering", "Protective sheeting"],
    industries: ["Road Construction", "Agriculture", "Civil", "Packaging"],
    faqs: [
      { q: "What thickness do you offer?", a: "We supply LDPE sheeting in multiple micron gauges; share your application and we will recommend the right grade." },
    ],
  },
  {
    slug: "specialty-products",
    name: "Specialty & Custom Products",
    icon: "Sparkles",
    tagline: "Silicone sealant, shoe & event goods",
    description:
      "A curated range of specialty items including neutral silicone sealants, polyester nylon shoe tapes, eyelet reinforcement tapes and catering paper rolls. These custom solutions round out our portfolio for niche industrial and event requirements.",
    image: img("1586528116311-ad8dd3c8310d"),
    features: [
      "Weatherproof silicone sealants",
      "Reinforcement tapes for footwear",
      "Food-grade catering paper rolls",
      "Made-to-order specialty items",
    ],
    applications: ["Sealing & bonding", "Shoe reinforcement", "Event catering", "Custom fabrication"],
    industries: ["Footwear", "Events & Hospitality", "Construction", "General Industry"],
    faqs: [
      { q: "Do you take custom / OEM orders?", a: "Yes. Many of our specialty products are made to order — share your specification and quantity for a quote." },
    ],
  },
];

const P = (
  category: string,
  name: string,
  blurb: string,
  specs: Spec[],
  sizes: string[],
  imgId: string,
  images?: string[]
): Product => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name,
  category,
  blurb,
  specs,
  sizes,
  image: imgId,
  images,
});

export const products: Product[] = [
  // Packaging Tape
  P(
    "packaging-tape",
    "BOPP Self Adhesive Tape",
    "General-purpose BOPP carton sealing tape with strong acrylic adhesive for reliable box closure on high-speed lines.",
    [{ k: "Material", v: "BOPP + Acrylic" }, { k: "Thickness", v: "40–50 micron" }, { k: "Colour", v: "Transparent / Brown" }],
    ["24mm", "48mm", "72mm", "100mm"],
    '/product-img/bopp1.webp',
    ['/product-img/bopp1.webp', '/product-img/bopp2.webp', '/product-img/bopp3.webp'] // example: multiple local images
  ),
  P("packaging-tape", "Printed BOPP Tapes", "Custom-printed BOPP tape carrying your brand name, logo or handling message for professional, tamper-evident cartons.", [{ k: "Print", v: "1–3 Colours" }, { k: "Repeat", v: "Custom" }, { k: "Adhesive", v: "Acrylic / Hot-melt" }], ["48mm", "72mm"], "/product-img/printed-bopp.webp",['/product-img/printed-bopp.webp']),
  P("packaging-tape", "BOPP Tape Laminated with Pearl Film", "Premium pearl-laminated BOPP tape offering an upgraded matte finish and enhanced print vibrancy.", [{ k: "Finish", v: "Pearl Matte" }, { k: "Thickness", v: "45–55 micron" }], ["48mm", "72mm"], "/product-img/bopp-tape-laminated.webp",['/product-img/bopp-tape-laminated.webp']),
  P("packaging-tape", "BOPP Stationery Tape", "Clear, easy-tear stationery tape for office, retail and light packaging use.", [{ k: "Core", v: "1 inch" }, { k: "Clarity", v: "High" }], ["12mm", "18mm", "24mm"], "/product-img/bopp-stationary.webp",['/product-img/bopp-stationary.webp']),

  // Adhesive & Double-Sided
  P("tape", "Double Sided Polyester Tape", "High-bond double-sided polyester tape for mounting, splicing and precision assembly with clean removal.", [{ k: "Carrier", v: "Polyester" }, { k: "Adhesive", v: "Both sides" }], ["6mm", "12mm", "24mm"], "/product-img/double-sided.jpg",['/product-img/double-sided.jpg']),
  P("tape", "Double Sided Tissue Tape", "Economical tissue-carrier double-sided tape ideal for POS displays, card mounting and print finishing.", [{ k: "Carrier", v: "Tissue" }, { k: "Tack", v: "High" }], ["12mm", "18mm", "24mm"], "/product-img/white-tissue-double-sided.jpeg",['/product-img/white-tissue-double-sided.jpeg']),
  P("tape", "3 Inch Transparent Tape", "Wide transparent adhesive tape for bundling, surface covering and general sealing tasks.", [{ k: "Width", v: "3 inch" }, { k: "Clarity", v: "Crystal clear" }], ["72mm"], "/product-img/3-inch-transparent.jpg",['/product-img/3-inch-transparent.jpg']),
  P("tape", "3M-Grade Double Sided Adhesive Tape", "Premium high-performance double-sided tape for demanding structural mounting applications.", [{ k: "Grade", v: "High-bond" }, { k: "Temp", v: "Wide range" }], ["12mm", "24mm"], "/product-img/3M-grade-double-sided-adhesive-tape.jpg",['/product-img/3M-grade-double-sided-adhesive-tape.jpg']),

  // Label & Flexo
  P("label-printing-tape", "Double Sided Cotton Flexo Printing Tape", "Cushioned plate-mounting tape delivering crisp registration and clean plate release for flexo presses.", [{ k: "Density", v: "Soft / Med / Hard" }, { k: "Carrier", v: "Foam" }], ["480mm roll"], "/product-img/double-sided-gum-cotton-tape-flexo-printing.jpg",['/product-img/double-sided-gum-cotton-tape-flexo-printing.jpg']),
  P("label-printing-tape", "Double Sided Clear Polyester Tape", "Thin, high-strength clear polyester tape for label converting and splicing.", [{ k: "Carrier", v: "Polyester" }], ["9mm", "12mm"], "/product-img/double-sided-clear-polyester-tapes.png",['/product-img/double-sided-clear-polyester-tapes.png']),
  P("label-printing-tape", "Paper Application Tape", "Medium-tack paper transfer tape for graphics, labels and signage application.", [{ k: "Carrier", v: "Paper" }, { k: "Tack", v: "Medium" }], ["100mm", "300mm"], "/product-img/paper-application-tape.png",['/product-img/paper-application-tape.png']),

  // Electrical
  P("electrical-tapes", "Polyester Electric Tape", "Heat-resistant polyester insulation tape for coil wrapping and high-temperature electrical use.", [{ k: "Material", v: "Polyester" }, { k: "Class", v: "Insulation" }], ["15mm", "25mm"], "/product-img/polyester-electric-tapes.webp",['/product-img/polyester-electric-tapes.webp']),
  P("electrical-tapes", "PVC Insulation Tape", "Flame-retardant PVC tape with strong dielectric strength for wire and cable insulation.", [{ k: "Material", v: "PVC" }, { k: "Property", v: "Flame-retardant" }], ["18mm"], "/product-img/PVC-insulation-tape.jpg",['/product-img/PVC-insulation-tape.jpg']),
  P("electrical-tapes", "Cotton Cloth Tape", "Durable cotton cloth tape for harnessing, wrapping and abrasion protection.", [{ k: "Material", v: "Cotton cloth" }], ["19mm", "25mm"], "/product-img/cotton-cloth-tape.jpg",['/product-img/cotton-cloth-tape.jpg']),
  P("electrical-tapes", "HT Insulation Tape", "High-temperature insulation tape for demanding electrical and coil applications.", [{ k: "Rating", v: "High-temp" }], ["25mm"], "/product-img/ht-insulation-tape.jpg",['/product-img/ht-insulation-tape.jpg']),

  // Insulation & Waterproof
  P("insulation-waterproof-tapes", "Waterproof Butyl Rubber Tape", "Self-amalgamating butyl tape for permanent watertight sealing on roofs, pipes and joints.", [{ k: "Material", v: "Butyl rubber" }, { k: "Seal", v: "Waterproof" }], ["50mm", "75mm"], "/product-img/waterproof-butyl-rubber-tape.jpg",['/product-img/waterproof-butyl-rubber-tape.jpg']),
  P("insulation-waterproof-tapes", "Aluminium Foil Tape", "Reflective aluminium foil tape for HVAC ducting, heat shielding and insulation seaming.", [{ k: "Material", v: "Aluminium foil" }], ["48mm", "72mm"], "/product-img/aluminium-foil-tape.jpg",['/product-img/aluminium-foil-tape.jpg']),
  P("insulation-waterproof-tapes", "2 Inch Duct Tape", "Strong cloth-backed duct tape for sealing, repair and heavy-duty bundling.", [{ k: "Backing", v: "Cloth / PE" }], ["48mm"], "/product-img/2-Inch-duct-tape.jpg",['/product-img/2-Inch-duct-tape.jpg']),

  // Architecture & Glass
  P("architecture-glass-tapes", "Transparent Surface Protection Tape", "Residue-free protective film that shields glass, panels and finished surfaces during transit and fit-out.", [{ k: "Type", v: "Protection film" }, { k: "Removal", v: "Clean peel" }], ["100mm", "300mm", "500mm"], "/product-img/transparent-surface-protection-tape.jpeg",['/product-img/transparent-surface-protection-tape.jpeg']),
  P("architecture-glass-tapes", "Colour Masking Tape", "Clean-edge masking tape for painting, glazing and facade finishing.", [{ k: "Type", v: "Masking" }], ["18mm", "24mm", "48mm"], "/product-img/colour-masking-tape.jpg",['/product-img/colour-masking-tape.jpg']),
  P("architecture-glass-tapes", "Spacer Tape", "Structural glazing spacer tape providing consistent joint depth and glass support.", [{ k: "Use", v: "Structural glazing" }], ["6mm", "9mm", "12mm"], "/product-img/spacer-tape.jpg",['/product-img/spacer-tape.jpg']),

  // Plastic Rods
  P("plastic-rods", "40 mm EPE Foam Backer Rod", "Closed-cell 40mm backer rod for controlling sealant depth in wide expansion joints.", [{ k: "Diameter", v: "40mm" }, { k: "Cell", v: "Closed" }], ["40mm"], "/product-img/40-mm-EPE-foam-backer-rod.jpg",['/product-img/40-mm-EPE-foam-backer-rod.jpg']),
  P("plastic-rods", "80 mm EPE Foam Backer Rod", "Large-diameter 80mm backer rod for very wide construction and civil joints.", [{ k: "Diameter", v: "80mm" }], ["80mm"], "/product-img/BackerRod-6.jfif",['/product-img/BackerRod-6.jfif']),
  P("plastic-rods", "12 mm EPE Foam Backer Rod", "Slim 12mm backer rod for narrow sealant joints and gaps.", [{ k: "Diameter", v: "12mm" }], ["12mm"], "/product-img/12-mm-EPE-Foam-Backer-Rod.jpeg",['/product-img/12-mm-EPE-Foam-Backer-Rod.jpeg']),
  P("plastic-rods", "1 Inch Nylon Tape", "Strong woven nylon reinforcement tape for binding and edge finishing.", [{ k: "Material", v: "Nylon" }], ["25mm"], "/product-img/1-Inch-Nylon-Tape.webp",['/product-img/1-Inch-Nylon-Tape.webp']),

  // EPE Foam
  P("expanded-polyethylene-foam", "EPE Foam Rods", "Flexible closed-cell foam rods for cushioning, packing and joint filling.", [{ k: "Cell", v: "Closed" }], ["Various dia"], "/product-img/EPE-Foam-Rods.jpg",['/product-img/EPE-Foam-Rods.jpg']),
  P("expanded-polyethylene-foam", "EPE Pipe Insulation Tube", "Thermal insulation tubes that reduce heat loss and prevent condensation on pipework.", [{ k: "Use", v: "Pipe insulation" }], ["15–110mm ID"], "/product-img/EPE-Pipe-Insulation-Tube.jpg",['/product-img/EPE-Pipe-Insulation-Tube.jpg']),
  P("expanded-polyethylene-foam", "EPE Foam C-Section", "Extruded C-profile foam for edge and corner protection during shipping.", [{ k: "Profile", v: "C-section" }], ["Custom"], "/product-img/epe-foam-c-section.jpg",['/product-img/epe-foam-c-section.jpg']),
  P("expanded-polyethylene-foam", "EPE Foam U-Profile", "U-profile foam channel for framing, edge guarding and packaging.", [{ k: "Profile", v: "U-profile" }], ["Custom"], "/product-img/epe-u-profile.jpg",['/product-img/epe-u-profile.jpg']),

  // EVA Foam
  P("eva-foam", "Black EVA Foam Sheet", "Dense, fine-cell black EVA sheet for inserts, gaskets and protective packaging.", [{ k: "Colour", v: "Black" }, { k: "Density", v: "Multiple" }], ["1m x 2m sheets"], "/product-img/Black-sEVA-Foam-Sheet.jpg",['/product-img/Black-sEVA-Foam-Sheet.jpg']),
  P("eva-foam", "Customized CNC Router Foam", "CNC-routed EVA inserts cut precisely to your product profile for tool cases and kits.", [{ k: "Process", v: "CNC routed" }], ["Made to order"], "/product-img/customized-cnc-cutting-foam.webp",['/product-img/customized-cnc-cutting-foam.webp']),
  P("eva-foam", "Die Cut EVA Foam", "Die-cut EVA components produced to volume for consistent, repeatable parts.", [{ k: "Process", v: "Die-cut" }], ["Made to order"], "/product-img/Die-Cut-EVA-Foam.jpg",['/product-img/Die-Cut-EVA-Foam.jpg']),
  P("eva-foam", "EVA Foam Rolls", "EVA foam supplied in rolls for lining, cushioning and fabrication.", [{ k: "Format", v: "Roll" }], ["Custom width"], "/product-img/EVA-Foam-Rolls.jpg",['/product-img/EVA-Foam-Rolls.jpg']),

  // Automotive
  P("automotive-tapes", "PE Foam Tape", "Conformable PE foam tape for gasketing, sealing and gap filling in vehicles.", [{ k: "Carrier", v: "PE foam" }], ["9mm", "12mm", "19mm"], "/product-img/PE-FOAM-TAPE.webp",['/product-img/PE-FOAM-TAPE.webp']),
  P("automotive-tapes", "Panel Bonding Tape", "High-strength acrylic foam tape for bonding automotive panels and trim.", [{ k: "Type", v: "Acrylic foam" }], ["12mm", "19mm"], "/product-img/Panel-Bonding-Tape.jpg",['/product-img/Panel-Bonding-Tape.jpg']),
  P("automotive-tapes", "3M-Grade PE Foam Tape", "Premium PE foam mounting tape for emblems, badges and exterior fixtures.", [{ k: "Grade", v: "Premium" }], ["12mm"], "/product-img/3M-Grade-PE-Foam-Tape.png",['/product-img/3M-Grade-PE-Foam-Tape.png']),

  // Roads & Construction
  P("roads-construction", "Retro Reflective Tape", "High-visibility retro-reflective tape for road safety and vehicle marking.", [{ k: "Type", v: "Retro-reflective" }], ["50mm"], "/product-img/Retro-Reflective-Tape.avif",['/product-img/Retro-Reflective-Tape.avif']),
  P("roads-construction", "Caution Barricade Tape", "Bright barricade tape for cordoning off hazards and work zones.", [{ k: "Type", v: "Barricade" }], ["75mm"], "/product-img/Caution-Barricade-Tape.jpg",['/product-img/Caution-Barricade-Tape.jpg']),
  P("roads-construction", "Silver Grey Fabric Reflective Tape", "Durable fabric reflective tape for garments and site safety wear.", [{ k: "Type", v: "Fabric reflective" }], ["25mm", "50mm"], "/product-img/Silver-Grey-Fabric-Reflective -Tape.jpg",['/product-img/Silver-Grey-Fabric-Reflective -Tape.jpg']),

  // Floor Care
  P("floor-care", "PVC Floor Marking Tape", "Hard-wearing PVC tape for lane marking, zoning and 5S workplace organisation.", [{ k: "Material", v: "PVC" }], ["48mm", "72mm"], "/product-img/PVC-Floor-Marking-Tape.jpg",['/product-img/PVC-Floor-Marking-Tape.jpg']),
  P("floor-care", "Anti Skid Safety Tape", "Textured anti-slip tape improving grip on stairs, ramps and wet areas.", [{ k: "Surface", v: "Textured" }], ["25mm", "50mm"], "/product-img/Anti-Skid-Safety-Tape.jfif",['/product-img/Anti-Skid-Safety-Tape.jfif']),
  P("floor-care", "Double Sided Carpet Tape", "Strong double-sided tape for fixing carpets, mats and rugs securely.", [{ k: "Type", v: "Double-sided" }], ["48mm", "72mm"], "/product-img/Double-Sided-Carpet-Tape.jpg",['/product-img/Double-Sided-Carpet-Tape.jpg']),

  // LDPE
  P("ldpe-sheet", "Road Construction LDPE Sheet", "LDPE curing sheet that retains moisture for proper concrete hydration.", [{ k: "Use", v: "Curing" }], ["Custom width"], "/product-img/road-construction-ldpe-sheet.webp",['/product-img/road-construction-ldpe-sheet.webp']),
  P("ldpe-sheet", "LDPE PQC Sheet", "PQC-grade LDPE sheeting for pavement quality concrete works and barriers.", [{ k: "Grade", v: "PQC" }], ["Custom width"], "/product-img/LDPE-PQC-Sheet.png",['/product-img/LDPE-PQC-Sheet.png']),

  // Specialty
  P("specialty-products", "260 ml Silicone Sealant", "Neutral-cure silicone sealant for weatherproof glazing, sanitary and general sealing.", [{ k: "Volume", v: "260 ml" }, { k: "Cure", v: "Neutral" }], ["260ml cartridge"], "/product-img/260-ml-Silicone-Sealant.jpg",['/product-img/260-ml-Silicone-Sealant.jpg']),
  P("specialty-products", "Polyester Nylon Tape", "Reinforcement tape for footwear stitching and edge strengthening.", [{ k: "Use", v: "Footwear" }], ["Custom"], "/product-img/Polyester-Nylon-Tape.webp",['/product-img/Polyester-Nylon-Tape.webp']),
  P("specialty-products", "Catering Table Paper Roll", "Food-grade paper rolls for events, catering and table covering.", [{ k: "Grade", v: "Food-safe" }], ["Custom width"], "/product-img/catering-table-paper-rolls.jpg",['/product-img/catering-table-paper-rolls.jpg']),
];

// helpers
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (cat: string, slug: string) =>
  products.find((p) => p.category === cat && p.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const relatedProducts = (cat: string, slug: string, n = 3) =>
  products.filter((p) => p.category === cat && p.slug !== slug).slice(0, n);
export const featuredProducts = () =>
  [products[0], products[8], products[18], products[24], products[29], products[42]].filter(Boolean);