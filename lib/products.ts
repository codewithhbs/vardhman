export type Spec = { k: string; v: string };
export type FAQ = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  blurb: string;
  specs: Spec[];
  sizes: string[];
  highlights?: string[]; // product-specific applications / features (falls back to category features on the product page)
  price?: string; // approx. price as listed on the catalogue
  image: string; // primary / thumbnail image
  images?: string[]; // optional gallery — falls back to [image] if not provided
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
  if (image.startsWith("/") || image.startsWith("http")) return image;
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
      "We are a leading Manufacturer of bopp self adhesive tape, cross filament tapes, plastic core for tape, 3m monofilament tape, reinforced kraft paper tape (water activated) and pvc non adhesive tape from New Delhi, India.",
    // image: '/product-img/Packaging-Tape.jpg',
    image: "/product-img/590_0.jpg",
    features: [
      "288 mm to 1500 mm available",
      "Strong instant tack and shear holding",
      "Noise-controlled clean unwind",
      "Solvent-free, odour-free acrylic adhesive",
      "Available printed for brand promotion",
    ],
    applications: [
      "Carton sealing",
      "Export packaging",
      "E-commerce dispatch",
      "Bundling & strapping",
    ],
    industries: ["FMCG", "E-commerce & Retail", "Logistics", "Manufacturing"],
    faqs: [
      {
        q: "What widths are available?",
        a: "Standard widths are 24mm, 48mm and 72mm, with custom slitting from 12mm upwards on request.",
      },
      {
        q: "Can tapes be printed with our logo?",
        a: "Yes. We supply single and multi-colour printed BOPP tapes with your brand name, logo or handling instructions.",
      },
    ],
  },
  {
    slug: "tape",
    name: "Tape",
    icon: "Layers",
    tagline: "Single & double-sided bonding tapes",
    description:
      "A versatile range of transparent, polyester and double-sided adhesive tapes engineered for mounting, splicing and bonding. From clear stationery tapes to high-performance double-sided polyester and 3M-grade tissue tapes, each product is coated with pressure-sensitive adhesive for reliable, residue-free adhesion.",
    image: "/product-img/double-category.png",
    features: [
      "Pressure-sensitive high-bond adhesive",
      "Clear, low-profile finish",
      "Excellent age and temperature stability",
      "Die-cuttable to custom shapes",
    ],
    applications: [
      "Mounting & bonding",
      "Splicing",
      "POS display assembly",
      "Print finishing",
    ],
    industries: [
      "Printing & Packaging",
      "Retail Display",
      "Electronics",
      "Signage",
    ],
    faqs: [
      {
        q: "Do double-sided tapes leave residue?",
        a: "No. Our polyester and tissue-carrier tapes are designed for clean removal on most substrates.",
      },
    ],
  },
  {
    slug: "label-printing-tape",
    name: "Label & Flexo Printing Tape",
    icon: "Printer",
    tagline: "Plate-mounting & printing consumables",
    description:
      "Precision double-sided cotton flexo printing tapes, clear polyester tapes, release liners and tissue tapes engineered for the label, flexo and offset printing industries. These plate-mounting and converting consumables provide uniform cushioning, accurate registration and clean release for repeat print jobs.",
    image: "/product-img/flexo-printing-label.jpg",
    features: [
      "Uniform foam cushioning for print clarity",
      "Consistent thickness tolerance",
      "Clean plate release without ghosting",
      "Available in soft / medium / hard densities",
    ],
    applications: [
      "Flexo plate mounting",
      "Label converting",
      "Sleeve building",
      "Paper application",
    ],
    industries: [
      "Label Printing",
      "Flexible Packaging",
      "Corrugation",
      "Publishing",
    ],
    faqs: [
      {
        q: "Which density should we choose?",
        a: "Soft cushions solids, medium is an all-round choice, and hard suits fine line and text work. Our team can advise per plate type.",
      },
    ],
  },
  {
    slug: "electrical-tapes",
    name: "Electrical Tapes",
    icon: "Zap",
    tagline: "Insulation & harness tapes",
    description:
      "Flame-retardant PVC, polyester, Kapton, Teflon and cotton cloth electrical tapes for insulation, harnessing and high-temperature applications. Manufactured to withstand demanding electrical loads with excellent dielectric strength and abrasion resistance.",
    image: "/product-img/Electrical-tape_black.jpg",
    features: [
      "High dielectric / insulation strength",
      "Flame-retardant PVC options",
      "Conformable and stretchable",
      "Heat-resistant polyester & polyimide grades",
    ],
    applications: [
      "Wire insulation",
      "Cable harnessing",
      "Coil wrapping",
      "High-temp masking",
    ],
    industries: [
      "Electrical",
      "Automotive",
      "Appliances",
      "Panel Manufacturing",
    ],
    faqs: [
      {
        q: "Are these tapes flame-retardant?",
        a: "Yes, our PVC insulation tapes are formulated to be self-extinguishing and meet common electrical safety standards.",
      },
    ],
  },
  {
    slug: "insulation-waterproof-tapes",
    name: "Insulation & Waterproof Tapes",
    icon: "Droplets",
    tagline: "Butyl, duct & foil sealing tapes",
    description:
      "A robust range of waterproof butyl rubber tapes, aluminium foil tapes and cloth duct tapes for sealing, insulation and moisture protection. Ideal for HVAC, roofing, ducting and industrial repair where a permanent watertight bond is essential.",
    image: "/product-img/insulation-waterproof-trapes.jpg",
    features: [
      "Fully waterproof and airtight seal",
      "Superior conformability to irregular surfaces",
      "UV and weather resistant",
      "Reflective aluminium foil grades",
    ],
    applications: [
      "HVAC duct sealing",
      "Roof & terrace waterproofing",
      "Pipe insulation",
      "Industrial repair",
    ],
    industries: ["HVAC", "Construction", "Infrastructure", "Maintenance"],
    faqs: [
      {
        q: "Can duct tape be used outdoors?",
        a: "Our waterproof butyl and foil grades are UV-stabilised for exterior and long-term sealing applications.",
      },
    ],
  },
  {
    slug: "architecture-glass-tapes",
    name: "Architecture & Glass Tapes",
    icon: "Building2",
    tagline: "Surface protection, glazing & sealants",
    description:
      "Specialised surface protection films, colour masking tapes, VHB acrylic foam tapes, spacer tapes, backer rods and structural glazing sealants for the architecture, glazing and facade industries. Engineered to protect finished surfaces and support structural glazing joints.",
    image: "/product-img/architecture-glass-tapes.jpg",
    features: [
      "Residue-free surface protection",
      "Clean-edge colour masking",
      "VHB acrylic foam bonding tapes",
      "Structural glazing sealants & spacers",
    ],
    applications: [
      "Glass & panel protection",
      "Facade masking",
      "Structural glazing joints",
      "Aluminium fabrication",
    ],
    industries: [
      "Architecture",
      "Glass Processing",
      "Facade & Glazing",
      "Aluminium",
    ],
    faqs: [
      {
        q: "Will protection tape damage glass or panels?",
        a: "No. Our surface protection tapes peel away cleanly without adhesive transfer within the recommended service window.",
      },
    ],
  },
  {
    slug: 'plastic-rods',
    name: 'Plastic Rods & Backer Rods',
    icon: 'Cylinder',
    tagline: 'EPE backer rods & engineering rods',
    description:
      'Closed-cell EPE foam backer rods in a full range of diameters, plus Teflon, PP and Delrin engineering rods and nylon reinforcement tapes. Backer rods control sealant depth in expansion joints for better joint geometry and long-lasting weatherproof seals.',
    image: '/product-img/backer-rod-and-expansion-rod-back-up-rod.jpg',
    features: ['Closed-cell, non-absorbent foam', 'Compressible for tight joint fit', 'Diameters from 12mm to 80mm+', 'Engineering rods in Teflon, PP & Delrin'],
    applications: ['Expansion joint filling', 'Sealant backing', 'Machined components', 'Void filling'],
    industries: ['Construction', 'Civil Infrastructure', 'Engineering', 'Roads'],
    faqs: [{ q: 'How do I select backer rod diameter?', a: 'Choose a rod roughly 25% larger than the joint width for correct compression. Our team can recommend sizes per joint.' }],
  },
  {
    slug: "expanded-polyethylene-foam",
    name: "Expanded Polyethylene (EPE) Foam",
    icon: "Box",
    tagline: "Protective foam profiles & tubes",
    description:
      "Lightweight, resilient EPE foam rods, pipe insulation tubes, C-sections, U-profiles and L-sections engineered for edge protection, cushioning and thermal insulation. Closed-cell structure absorbs shock and vibration while remaining moisture-resistant and recyclable.",
    image: "/product-img/expanded-polyethylene.jpg",
    features: [
      "Excellent shock and vibration absorption",
      "Thermal insulation for pipes",
      "Custom C / U / L edge profiles",
      "Non-abrasive, surface-safe",
    ],
    applications: [
      "Edge & corner protection",
      "Pipe insulation",
      "Furniture packaging",
      "Appliance cushioning",
    ],
    industries: ["Packaging", "White Goods", "Furniture", "Logistics"],
    faqs: [
      {
        q: "Can EPE profiles be customised?",
        a: "Yes, we extrude and cut C-sections, U-profiles, L-sections and rods to your dimensions and colours.",
      },
    ],
  },
  // {
  //   slug: "eva-foam",
  //   name: "EVA Foam",
  //   icon: "Layers3",
  //   tagline: "Die-cut & CNC-routed EVA sheets",
  //   description:
  //     "Premium EVA foam sheets, rolls and die-cut components with fine cell structure and consistent density. Available as CNC-routed inserts, gaskets and protective packaging for tool cases, electronics and precision products.",
  //   image: "/product-img/EVA-foam.jpeg",
  //   features: [
  //     "Fine, uniform closed-cell structure",
  //     "CNC routing and die-cutting",
  //     "High resilience and cushioning",
  //     "Available in multiple colours & densities",
  //   ],
  //   applications: [
  //     "Tool case inserts",
  //     "Protective packaging",
  //     "Gaskets & seals",
  //     "Sports & footwear",
  //   ],
  //   industries: ["Electronics", "Automotive", "Footwear", "Sports Goods"],
  //   faqs: [
  //     {
  //       q: "Do you make custom CNC foam inserts?",
  //       a: "Yes, share your product dimensions or drawing and we will router-cut precise foam inserts.",
  //     },
  //   ],
  // },
  {
    slug: "automotive-tapes",
    name: "Automotive Tapes",
    icon: "Car",
    tagline: "PE foam & panel bonding tapes",
    description:
      "High-performance PE foam and acrylic panel-bonding tapes for automotive trim, emblem mounting and weather sealing. Designed to bond dissimilar surfaces with vibration resistance and long-term durability in demanding under-hood and exterior conditions.",
    image: "/product-img/automotive-tapes.jpg",
    features: [
      "Strong structural bonding",
      "Vibration and temperature resistant",
      "Weatherproof PE foam carrier",
      "Bonds dissimilar substrates",
    ],
    applications: [
      "Emblem & trim mounting",
      "Panel bonding",
      "Weatherstrip sealing",
      "Badge fixing",
    ],
    industries: [
      "Automotive OEM",
      "Auto Aftermarket",
      "Two-Wheeler",
      "Commercial Vehicles",
    ],
    faqs: [
      {
        q: "Will these tapes hold in high heat?",
        a: "Yes, our acrylic foam tapes retain bond strength across a wide automotive temperature range.",
      },
    ],
  },
  {
    slug: "roads-construction",
    name: "Road & Construction Products",
    icon: "TrafficCone",
    tagline: "Reflective, barricade & safety tapes",
    description:
      "Reflective fabric tapes, retro-reflective safety tapes, caution barricade tapes, underground warning tapes and dowel bar caps for road construction and site safety. Engineered for high visibility, weather durability and compliance with site safety practices.",
    image: "/product-img/silver-grey-fabric-reflective-tape.webp",
    features: [
      "High-visibility retro-reflectivity",
      "Weather and abrasion resistant",
      "Bright caution / barricade grades",
      "Underground warning & dowel accessories",
    ],
    applications: [
      "Road safety marking",
      "Site barricading",
      "Utility warning",
      "Hazard identification",
    ],
    industries: [
      "Road Construction",
      "Civil Infrastructure",
      "Municipal",
      "Safety",
    ],
    faqs: [
      {
        q: "Are reflective tapes suitable for outdoor road use?",
        a: "Yes, our retro-reflective and fabric reflective tapes are built for long outdoor exposure.",
      },
    ],
  },
  {
    slug: "floor-care",
    name: "Floor Care & Marking",
    icon: "Grid3x3",
    tagline: "Floor marking & anti-skid tapes",
    description:
      "Durable PVC floor marking tapes, double-sided carpet tapes and anti-skid safety tapes for warehouses, factories and public spaces. Bright, hard-wearing films define lanes, zones and hazards while anti-slip grades improve underfoot safety.",
    image: "/product-img/floor-care-marking.jpg",
    features: [
      "Abrasion-resistant PVC film",
      "Bright, long-lasting colours",
      "Anti-skid textured grades",
      "Strong floor-grip adhesive",
    ],
    applications: [
      "Lane & zone marking",
      "Carpet fixing",
      "Stair & ramp safety",
      "5S workplace organisation",
    ],
    industries: ["Warehousing", "Manufacturing", "Retail", "Hospitality"],
    faqs: [
      {
        q: "Can floor tape handle forklift traffic?",
        a: "Our heavy-duty PVC marking tapes are formulated to withstand foot and light vehicle traffic.",
      },
    ],
  },
  {
    slug: "ldpe-sheet",
    name: "LDPE Sheets",
    icon: "Sheet",
    tagline: "Curing & protection sheeting",
    description:
      "LDPE and PQC sheets for road construction curing, moisture barriers and surface protection. Supplied in a range of gauges and widths to suit civil, agricultural and packaging protection needs.",
    image: "/product-img/black-ldpe-polythene-sheet.jpeg",
    features: [
      "Consistent gauge and clarity",
      "Effective moisture barrier",
      "Tear and puncture resistant",
      "Custom widths and thickness",
    ],
    applications: [
      "Concrete curing",
      "Ground / moisture barrier",
      "Surface covering",
      "Protective sheeting",
    ],
    industries: ["Road Construction", "Agriculture", "Civil", "Packaging"],
    faqs: [
      {
        q: "What thickness do you offer?",
        a: "We supply LDPE sheeting in multiple micron gauges; share your application and we will recommend the right grade.",
      },
    ],
  },
  // {
  //   slug: "silicone-sealant",
  //   name: "Silicone Sealant",
  //   icon: "Droplet",
  //   tagline: "Weatherproof & structural glazing sealants",
  //   description:
  //     "Neutral-cure and structural silicone sealants for weatherproofing, structural glazing and general construction sealing. The range includes trusted branded grades delivering strong adhesion, UV stability and long service life across facades, sanitary and industrial joints.",
  //   image: "/product-img/silicone-sealant-250x250.webp",
  //   features: [
  //     "Neutral-cure, low-odour formulation",
  //     "Excellent weather & UV resistance",
  //     "Strong adhesion to glass, metal & masonry",
  //     "Structural glazing grades available",
  //   ],
  //   applications: [
  //     "Structural glazing",
  //     "Weather sealing",
  //     "Sanitary sealing",
  //     "Facade joints",
  //   ],
  //   industries: [
  //     "Architecture",
  //     "Glazing & Facade",
  //     "Construction",
  //     "Sanitary",
  //   ],
  //   faqs: [
  //     {
  //       q: "Do you supply branded structural sealants?",
  //       a: "Yes, we supply neutral and structural silicone sealants including recognised branded grades for glazing applications.",
  //     },
  //   ],
  // },
  {
    slug: "shoe-material-goods",
    name: "Shoe Material & Goods",
    icon: "Footprints",
    tagline: "Footwear reinforcement tapes",
    description:
      "Specialised tapes and reinforcement materials for the footwear manufacturing industry, including polyester nylon tapes and eyelet reinforcement tapes that add strength, shape retention and durability to shoe construction.",
    image: "/product-img/Polyester-Nylon-Tape.webp",
    features: [
      "High-tensile reinforcement",
      "Shape retention for uppers",
      "Eyelet & seam strengthening",
      "Consistent width and quality",
    ],
    applications: [
      "Shoe upper reinforcement",
      "Eyelet strengthening",
      "Seam binding",
      "Edge finishing",
    ],
    industries: ["Footwear", "Leather Goods", "Sports Shoes", "Manufacturing"],
    faqs: [
      {
        q: "Can these tapes be supplied in custom widths?",
        a: "Yes, our footwear reinforcement tapes are available in custom widths to suit your production line.",
      },
    ],
  },
  {
    slug: "corporate-event-management",
    name: "Corporate & Event Supplies",
    icon: "PartyPopper",
    tagline: "Catering rolls & event foam goods",
    description:
      "Consumables and foam goods for events, catering and corporate functions, including food-grade table paper rolls and coloured EPE foam pipes and tubes for decor, protection and presentation.",
    image: "/product-img/catering-table-paper-rolls-250x250.webp",
    features: [
      "Food-grade catering paper rolls",
      "Coloured EPE foam pipes & tubes",
      "Clean, presentable finish",
      "Bulk supply for events",
    ],
    applications: [
      "Event catering",
      "Table covering",
      "Decor & protection",
      "Corporate functions",
    ],
    industries: ["Events & Hospitality", "Catering", "Corporate", "Decor"],
    faqs: [
      {
        q: "Are the paper rolls food-safe?",
        a: "Yes, our catering table paper rolls are food-grade and suitable for events and hospitality use.",
      },
    ],
  },
  {
    slug: "construction-material",
    name: "Construction Material",
    icon: "HardHat",
    tagline: "LDPE sheeting for civil works",
    description:
      "Construction-grade LDPE sheeting for road construction, curing and moisture-barrier applications, supplied in gauges and widths suited to civil and infrastructure projects.",
    image: "/product-img/road-construction-ldpe-sheet.webp",
    features: [
      "Durable civil-grade sheeting",
      "Effective curing moisture retention",
      "Tear and puncture resistant",
      "Custom gauges and widths",
    ],
    applications: [
      "Road construction curing",
      "Moisture barrier",
      "Surface protection",
      "Site covering",
    ],
    industries: [
      "Road Construction",
      "Civil Infrastructure",
      "Construction",
      "Municipal",
    ],
    faqs: [
      {
        q: "What is LDPE curing sheet used for?",
        a: "It retains moisture during concrete curing to ensure proper hydration and strength development.",
      },
    ],
  },
];

const P = (
  category: string,
  name: string,
  price: string,
  blurb: string,
  specs: Spec[],
  sizes: string[],
  highlights?: string[],
  image?: string,
  images?: string[],
): Product => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return {
    slug,
    name,
    category,
    blurb,
    specs,
    sizes,
    highlights,
    price,
    image: image ?? `/product-img/${slug}.jpg`,
    images,
  };
};

export const products: Product[] = [
  // architecture-glass-tapes
  P(
    "architecture-glass-tapes",
    "Transparent Surface Protection Tapes",
    "₹200 / Roll",
    "A surface protection film and tape used for temporary protection of most hard surfaces, available in high, medium and low viscosity grades.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Tape Width", v: "4 Inch" },
      { k: "Tape Length", v: "20 Meter" },
      { k: "Material", v: "LDPE" },
      { k: "Brand", v: "VARDHMAN" },
      { k: "Color", v: "Transparent, Milky White, Black & White" },
    ],
    [
      "4 Inch",
    ],
    [
      "High viscosity grade suits rough plastic and metal surfaces",
      "Sticky grade protects stainless steel, aluminium and similar surfaces",
      "Low viscosity grade suits smooth plastic surface protection",
    ],
    "/product-img/transparent-surface-protection-tape.jpeg",
    [
      "/product-img/transparent-surface-protection-tape.jpeg",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Colour Masking Tape",
    "₹15 / Roll",
    "A colourful crepe-paper masking tape, best suited for diaries, albums and decorative trim work.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Tape Width", v: ">60 mm" },
      { k: "Tape Length", v: "20 m" },
      { k: "Backing Material", v: "Crepe Paper" },
      { k: "Brand", v: "VARDHMAN" },
      { k: "Color", v: "Multi Colours" },
    ],
    [
      "18mm",
      "24mm",
      "48mm",
    ],
    [
      "Keeps paint cans clean and supports lids as glue dries",
      "Used to measure hole depth and protect surfaces while cutting",
    ],
    undefined,
    undefined,
  ),
  P(
    "architecture-glass-tapes",
    "60 mm EPE Foam Backer Rod",
    "₹2 / Meter",
    "A round, flexible EPE foam backer rod used as backing in joints or cracks to control sealant depth and create a back stop.",
    [
      { k: "Minimum Order Quantity", v: "100 Meter" },
      { k: "Diameter", v: "60 mm" },
      { k: "Material", v: "EPE Foam" },
      { k: "Rod Type", v: "Open Cell" },
      { k: "Length Per Roll", v: "25 m" },
      { k: "Application", v: "Construction Joint" },
      { k: "Color", v: "White" },
      { k: "Shape", v: "Round" },
      { k: "Brand", v: "Vardhman" },
      { k: "Temperature Range", v: "Up to 70°C" },
    ],
    [
      "60mm",
    ],
    [
      "Increases elasticity in the joint sealant",
      "Reduces caulk consumption by controlling sealant depth",
      "Forces adhesive into contact with joint sides for a superior hour-glass bond",
    ],
    "/product-img/supreme-backer-rod-250x250.webp",
    [
      "/product-img/supreme-backer-rod-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Red Acrylic Foam Tape",
    "₹25 / Roll",
    "A red-liner acrylic foam tape used to hold components in place for glass-to-metal and glazing projects.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Backing Material", v: "Acrylic Foam" },
      { k: "Color", v: "Red" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Total Thickness", v: ".4mm to 2.3mm" },
      { k: "Width of Tape", v: "4mm to 1200mm" },
    ],
    [
      "12mm",
      "18mm",
      "24mm",
    ],
    [
      "Body side mouldings and B-pillar appliques",
      "ABS/PVC rocker panels, door edge and wheel lip mouldings",
      "Luggage rack slats, wind & rain deflectors, dashboard overlays",
    ],
    "/product-img/red-acrylic-foam-tape-250x250.webp",
    [
      "/product-img/red-acrylic-foam-tape-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "3m vhb Acrylic Foam Transparent Tape",
    "₹150 / Roll",
    "A 3M VHB structural glazing tape — durable, two-sided acrylic foam tape for bonding glass panels into curtain wall, window/door and skylight systems.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Tape Width", v: "0-20 mm" },
      { k: "Tape Length", v: "10 m" },
      { k: "Brand", v: "3M" },
      { k: "Color", v: "Transparent" },
      { k: "Backing Material", v: "Acrylic Foam" },
    ],
    [
      "12mm",
      "19mm",
      "25mm",
    ],
    [
      "Bonds glass panels into curtain wall, commercial window/door and skylight-canopy systems",
      "Designed for rubber seal parts attachment such as automobile weatherstrips",
    ],
    "/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp",
    [
      "/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Debonding Strip Tape",
    "₹60 / Piece",
    "PP de-bonding strips used as joint filler material for concrete pavement and highways, placed prior to sealant application to shape the sealed surface.",
    [
      { k: "Minimum Order Quantity", v: "100 Piece" },
      { k: "Tape Length", v: "10 m" },
      { k: "Backing Material", v: "EVA, P.U" },
      { k: "Color", v: "Black & White" },
      { k: "Tape Type", v: "Adhesive" },
    ],
    [
      "6mm to 1000mm",
    ],
    [
      "Closed cell — negligible water/water-vapour absorption",
      "Compressible, flexible and non-staining",
      "Excellent chemical resistance to most acids and alkalis",
    ],
    "/product-img/debonding-strip-tape-250x250.webp",
    [
      "/product-img/debonding-strip-tape-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Transparent Double Sided Acrylic Foam Tapes",
    "₹144 / Roll",
    "An imported transparent acrylic foam tape used to bond glass to any kind of metal, offering excellent bonding strength and wear resistance.",
    [
      { k: "Brand", v: "Nitto" },
      { k: "Color", v: "Gray, Black, White & Transparent" },
      { k: "Usage/Feature", v: "Commonly used to join transparent material where a clear or colourless tape is needed" },
    ],
    [
      "12mm",
      "18mm",
      "24mm",
    ],
    [
      "High bonding strength",
      "High resistance against wear & tear",
    ],
    "/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp",
    [
      "/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Double Sided & Single Sided Foam Tapes",
    "₹20 / Piece",
    "Single and double-sided foam tapes manufactured from premium raw material, quality-checked at every stage of assembly.",
    [
      { k: "Minimum Order Quantity", v: "1 Piece" },
      { k: "Backing Material", v: "Foam" },
      { k: "Width", v: "24 mm" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Brand", v: "VARDHMAN" },
      { k: "Color", v: "Black, White, Gray" },
    ],
    [
      "9mm",
      "12mm",
      "19mm",
    ],
    [
      "Smooth finish and easy to use",
      "Low maintenance on smooth surfaces",
    ],
    "/product-img/double-sided-single-sided-foam.webp",
    [
      "/product-img/double-sided-single-sided-foam.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Paper Masking Tape",
    "₹13 / Piece",
    "A high-performance crepe paper masking tape for painting, carpentry, manufacturing, art & craft use — tears cleanly and lifts off residue-free.",
    [
      { k: "Minimum Order Quantity", v: "1 Piece" },
      { k: "Tape Length", v: "20 m" },
      { k: "Brand", v: "VARDHMAN" },
      { k: "Color", v: "White" },
      { k: "Usage/Feature", v: "Laminates holding, glass marking, painting, dispenser masking, art & craft" },
      { k: "Backing Material", v: "Crepe Paper" },
    ],
    [
      "24mm",
      "48mm",
    ],
    [
      "Tears easily by hand for quick, clean pieces",
      "Zero residue removal — safe on walls, carpet and decks",
      "Synthetic rubber adhesive built for consumer and commercial jobs",
    ],
    "/product-img/paper-masking-tape.webp",
    [
      "/product-img/paper-masking-tape.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Dow Corning 795 Silicone Sealant",
    "₹500 / Piece",
    "DOWSIL 795 neutral, one-part silicone building sealant offering versatile structural glazing and weather sealing performance in a single product.",
    [
      { k: "Packaging Size", v: "600 ml" },
      { k: "Model", v: "Dowsil 795" },
      { k: "Color", v: "Black" },
      { k: "Packaging Type", v: "Tube" },
      { k: "Compatible Material", v: "Glass" },
      { k: "Nozzle", v: "With Nozzle" },
      { k: "Features", v: "Weathersealing" },
      { k: "Chemical Resistance", v: "Acids" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "Cartridge",
    ],
    [
      "Excellent weatherability from -40°F to 300°F, unaffected by sun, rain, snow and ozone",
      "Excellent unprimed adhesion to anodized, alodined, coated and Kynar-painted aluminium",
      "Used for structural/nonstructural glazing, panel stiffeners and weather sealing",
    ],
    "/product-img/dow-corning-795-silicone-sealant-250x250.webp",
    [
      "/product-img/dow-corning-795-silicone-sealant-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Dow Corning 991 Silicone Sealants",
    "₹725 / Piece",
    "DOWSIL 991 medium-modulus silicone sealant formulated to weatherproof sensitive natural stone, glass and metal panels without staining.",
    [
      { k: "Packaging Size", v: "591 ml" },
      { k: "Color", v: "Black" },
      { k: "Compatible Material", v: "Glass" },
      { k: "Item Form", v: "Paste" },
      { k: "Nozzle", v: "With Nozzle" },
      { k: "Features", v: "Weathersealing" },
      { k: "Applications", v: "Structural and Nonstructural glazing" },
    ],
    [
      "Cartridge",
    ],
    [
      "Non-staining on natural stone, reduces residue rundown on metal/glass panels",
      "High-movement capability — accommodates ±50% joint movement",
      "Good unprimed adhesion to stone, glass, metal, ceramic tile and anodized aluminium",
    ],
    "/product-img/dow-corning-991-silicone-sealants-250x250.webp",
    [
      "/product-img/dow-corning-991-silicone-sealants-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Dow Corning 789 Silicone Sealant weather Proofng",
    "₹300 / Unit",
    "DOWSIL 789 silicone sealant for weatherproofing glass and aluminium building joints.",
    [
      { k: "Minimum Order Quantity", v: "1 Unit" },
      { k: "Packaging Size", v: "600 ml" },
      { k: "Model", v: "Dowsil 789" },
      { k: "Compatible Material", v: "Glass" },
      { k: "Nozzle", v: "With Nozzle" },
      { k: "Features", v: "Weathersealing" },
      { k: "Chemical Resistance", v: "Acids" },
      { k: "Applications", v: "Waterproofing" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "Cartridge",
    ],
    [
      "Compatible with glass and aluminium substrates",
      "Waterproof, weathersealing formulation",
    ],
    "/product-img/dow-corning-789-silicone-sealant-weather-proofng-250x250.webp",
    [
      "/product-img/dow-corning-789-silicone-sealant-weather-proofng-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Single Sided and Double Sided Eva Foam Tapes",
    "₹50 / Piece",
    "Hot-melt, solvent, water-base or rubber-base EVA foam tape for permanent fixing on irregular surfaces, with strong crack resistance.",
    [
      { k: "Tape Width", v: ">100 mm" },
      { k: "Tape Length", v: "50 m" },
      { k: "Brand", v: "VARDHMAN, DEER, NITTO" },
      { k: "Usage/Feature", v: "Sealing and anti-slip purposes, easy to cut to size" },
      { k: "Color", v: "Black and White, multi colour on order" },
    ],
    [
      "9mm",
      "12mm",
      "19mm",
    ],
    [
      "EVA backing, strong adhesive, good vibration mitigation",
      "Anti-solvent, heat resistant and strong crack resistance",
      "Used for permanent fixing, mounting decorative objects and nameplates",
    ],
    "/product-img/single-sided-and-double-sided-eva-foam-tapes-250x250.webp",
    [
      "/product-img/single-sided-and-double-sided-eva-foam-tapes-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "3m Curtain Wall Bonding Tapes",
    "₹100 / Roll",
    "A pressure-sensitive double-side acrylic adhesive tape for bonding glass to painted and unpainted metal in structural curtain-wall projects.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Tape Width", v: "100 mm" },
      { k: "Material", v: "Acrylic Foam" },
      { k: "Usage/Application", v: "Sealing" },
      { k: "Tape Length", v: "10 m" },
      { k: "Size", v: "1/2 inch" },
      { k: "Brand", v: "3m" },
      { k: "Color", v: "Black, Gray" },
    ],
    [
      "12mm",
      "19mm",
    ],
    [
      "Supplied in rolls up to 8.5 m with red/white PE release liner",
      "Greater bonding strength, damps vibration and absorbs impact",
      "Effective in corrosion protection",
    ],
    "/product-img/curtain-wall-tapes-250x250.webp",
    [
      "/product-img/curtain-wall-tapes-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Spacer Tape",
    "₹50 / Piece",
    "A foam spacer tape with pressure-sensitive adhesive coated on both sides, used in glazing and cladding applications.",
    [
      { k: "Minimum Order Quantity", v: "100 Piece" },
      { k: "Tape Length", v: "20 m" },
      { k: "Tape Width", v: "20 mm" },
      { k: "Backing Material", v: "EVA, Acrylic, P.E, P.U, EPE Foam" },
      { k: "Color", v: "Black & White, multi colour on order" },
      { k: "Brand", v: "VARDHMAN, NORTON, 3M" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "6mm",
      "9mm",
      "12mm",
    ],
    [
      "Durable foam tape with adhesive on both sides",
      "Available in different thicknesses per requirement",
      "Used in glazing / cladding applications",
    ],
    "/product-img/spacer-tape-250x250.webp",
    [
      "/product-img/spacer-tape-250x250.webp",
    ],
  ),
  P(
    "architecture-glass-tapes",
    "Norton Spacer Tape",
    "₹60 / Piece",
    "Saint-Gobain (Norton) open-cell polyurethane structural glazing spacer tape for interior and exterior glass fixing across construction.",
    [
      { k: "Backing Material", v: "Open-celled polyurethane foam" },
      { k: "Color", v: "Blue release liner with black foam" },
      { k: "Brand", v: "Saint Gobain (Norton)" },
      { k: "Usage/Feature", v: "Structural glazing tape for interior and exterior glass fixing" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Total Thickness", v: "6.4 mm" },
    ],
    [
      "6mm",
      "9mm",
      "12mm",
    ],
    [
      "Open-cell structure lets air/moisture reach the silicone for optimum curing",
      "UV-resistant adhesive minimises colour change",
      "Suited to 2-sided & 4-sided structural glazing and thermal breaks",
    ],
    "/product-img/norton-spacer-tape-250x250.webp",
    [
      "/product-img/norton-spacer-tape-250x250.webp",
    ],
  ),
  // tape
  P(
    "tape",
    "3 Inch Transparent Tapes",
    "₹1,000 / Box",
    "A BOPP transparent packaging tape supplied on a 3-inch core with a printable acrylic-adhesive finish for general packing.",
    [
      { k: "Width", v: "72mm" },
      { k: "Length", v: "50m" },
      { k: "Material", v: "BOPP" },
      { k: "Color", v: "Transparent" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Core Size", v: "3 inch" },
      { k: "Items per Pack", v: "12" },
      { k: "Application", v: "General Packing" },
      { k: "Features", v: "Printable" },
    ],
    [
      "72mm",
    ],
    [
      "General-purpose carton and box sealing",
      "Printable surface for branding",
    ],
    "/product-img/3-inch-transparent.jpg",
    [
      "/product-img/3-inch-transparent.jpg",
    ],
  ),
  P(
    "tape",
    "Double Sided Polyester Tape",
    "₹100 / Piece",
    "A red-liner polyester double-sided tape with acrylic adhesive for general-purpose mounting and splicing.",
    [
      { k: "Width", v: "24 mm (1 inch)" },
      { k: "Length", v: "50 m" },
      { k: "Application", v: "General Purpose" },
      { k: "Color", v: "Red" },
      { k: "Liner Type", v: "Paper Liner" },
      { k: "Tape Material", v: "Polyester" },
      { k: "Adhesive Type", v: "Acrylic" },
    ],
    [
      "6mm",
      "12mm",
      "24mm",
    ],
    [
      "High-strength polyester backing for mounting and splicing",
    ],
    "/product-img/s-l1000-jpg-250x250.webp",
    [
      "/product-img/s-l1000-jpg-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Double Sided Adhesive Tape",
    "₹50 / Piece",
    "An acrylic VHB-grade double-sided tape on a paper liner for general-purpose bonding.",
    [
      { k: "Tape Material", v: "Acrylic (VHB)" },
      { k: "Width", v: "24 mm (1 inch)" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Length", v: "10 m" },
      { k: "Application", v: "General Purpose" },
      { k: "Color", v: "Red" },
      { k: "Liner Type", v: "Paper Liner" },
    ],
    [
      "12mm",
      "18mm",
      "24mm",
    ],
    [
      "VHB-grade acrylic for high-strength general bonding",
    ],
    "/product-img/acrylic-foam-tapes-250x250.webp",
    [
      "/product-img/acrylic-foam-tapes-250x250.webp",
    ],
  ),
  P(
    "tape",
    "3m Double Sided Adhesive Tapes",
    "₹90 / Piece",
    "A 3M-grade transparent VHB acrylic double-sided tape suited to automotive and general-purpose mounting.",
    [
      { k: "Tape Material", v: "Acrylic (VHB)" },
      { k: "Width", v: "18 mm (0.75 inch)" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Application", v: "Automotive, General Purpose" },
      { k: "Color", v: "Transparent" },
      { k: "Liner Type", v: "Paper Liner" },
      { k: "Length", v: "10 m" },
      { k: "Brand", v: "3M" },
    ],
    [
      "12mm",
      "24mm",
    ],
    [
      "Suited to automotive trim and general-purpose mounting",
    ],
    "/product-img/3m-transparent-tape-250x250.webp",
    [
      "/product-img/3m-transparent-tape-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Adhesive Double Sided Tape",
    "₹100 / Piece",
    "A red VHB acrylic double-sided tape for general-purpose and structural glazing use.",
    [
      { k: "Tape Material", v: "Acrylic (VHB)" },
      { k: "Width", v: "24 mm (1 inch)" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Length", v: "5 m" },
      { k: "Application", v: "General Purpose, Structural Glazing" },
      { k: "Color", v: "Red" },
    ],
    [
      "12mm",
      "24mm",
    ],
    [
      "Suitable for general-purpose and structural glazing bonding",
    ],
    "/product-img/double-sided-single-sided-foam-tapes-250x250.webp",
    [
      "/product-img/double-sided-single-sided-foam-tapes-250x250.webp",
    ],
  ),
  P(
    "tape",
    "3m Double Sided Tape",
    "₹200 / Piece",
    "A 3M-grade white foam-carrier double-sided tape with acrylic adhesive for general-purpose mounting.",
    [
      { k: "Width", v: "24 mm (1 inch)" },
      { k: "Application", v: "General Purpose" },
      { k: "Color", v: "White" },
      { k: "Liner Type", v: "Paper Liner" },
      { k: "Tape Material", v: "Foam" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Length", v: "10 m" },
    ],
    [
      "12mm",
      "24mm",
    ],
    [
      "Foam carrier for uneven-surface mounting",
    ],
    "/product-img/3m-pe-foam-tapes-250x250.webp",
    [
      "/product-img/3m-pe-foam-tapes-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Double Sided Tissue Tapes",
    "₹50 / Piece",
    "A hot-melt tissue-carrier double-sided tape for stationery and lamination work.",
    [
      { k: "Tape Width", v: "24 mm" },
      { k: "Tape Length", v: "40 m" },
      { k: "Adhesive Type", v: "Hot Melt" },
      { k: "Backing Material", v: "Tissue" },
      { k: "Applications", v: "Stationery, Lamination" },
    ],
    [
      "12mm",
      "18mm",
      "24mm",
    ],
    [
      "Suited to stationery mounting and lamination",
    ],
    "/product-img/double-sided-tissue-tape-with-solvent-acrylic-adhesive-jpg-250x250.webp",
    [
      "/product-img/double-sided-tissue-tape-with-solvent-acrylic-adhesive-jpg-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Double Sided Tape",
    "₹100 / Piece",
    "A VHB acrylic double-sided tape for general-purpose and structural glazing bonding.",
    [
      { k: "Tape Material", v: "Acrylic (VHB)" },
      { k: "Width", v: "24 mm (1 inch)" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Length", v: "5 m" },
      { k: "Application", v: "General Purpose, Structural Glazing" },
    ],
    [
      "12mm",
      "24mm",
    ],
    [
      "Suitable for general-purpose and structural glazing bonding",
    ],
    "/product-img/double-sided.jpg",
    [
      "/product-img/double-sided.jpg",
    ],
  ),
  P(
    "tape",
    "Double Sided Adhesive Tissue Tapes",
    "₹100 / Roll",
    "A 3M-grade white hot-melt tissue tape for general-purpose and automotive mounting.",
    [
      { k: "Tape Material", v: "Tissue" },
      { k: "Width", v: "24 mm (1 inch)" },
      { k: "Adhesive Type", v: "Hotmelt" },
      { k: "Application", v: "General Purpose, Automotive" },
      { k: "Color", v: "White" },
      { k: "Liner Type", v: "Paper Liner" },
      { k: "Length", v: "50 m" },
      { k: "Brand", v: "3M" },
    ],
    [
      "12mm",
      "18mm",
    ],
    [
      "Suited to general-purpose and automotive mounting",
    ],
    "/product-img/3m-tissue-tapes-250x250.webp",
    [
      "/product-img/3m-tissue-tapes-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Adhesive Double Sided Foam Tape",
    "₹25 / Piece",
    "A 3M-grade black foam double-sided tape on a film liner for structural glazing and automotive use.",
    [
      { k: "Width", v: "48 mm (2 inch)" },
      { k: "Application", v: "Structural Glazing, Automotive" },
      { k: "Color", v: "Black" },
      { k: "Liner Type", v: "Film Liner" },
      { k: "Tape Material", v: "Foam" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Length", v: "10 m" },
      { k: "Brand", v: "3M" },
    ],
    [
      "9mm",
      "12mm",
      "19mm",
    ],
    [
      "Suited to structural glazing and automotive mounting",
    ],
    "/product-img/1000251388-jpg-250x250.webp",
    [
      "/product-img/1000251388-jpg-250x250.webp",
    ],
  ),
  P(
    "tape",
    "3m Adhesive Double Sided Tissue Tapes",
    "₹170 / Piece",
    "A 3M-grade white foam-carrier double-sided tape for general-purpose mounting.",
    [
      { k: "Width", v: "24 mm (1 inch)" },
      { k: "Application", v: "General Purpose" },
      { k: "Color", v: "White" },
      { k: "Tape Material", v: "Foam" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Length", v: "10 m" },
    ],
    [
      "12mm",
      "18mm",
    ],
    [
      "General-purpose mounting tape",
    ],
    "/product-img/3m-adhesive-tissue-tapes-250x250.webp",
    [
      "/product-img/3m-adhesive-tissue-tapes-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Transparent Cello Tape",
    "₹1,800 / Box",
    "A clear BOPP cello tape for everyday office, retail and light packaging use.",
    [
      { k: "Tape Width", v: "2 Inch" },
      { k: "Material", v: "BOPP" },
    ],
    [
      "12mm",
      "18mm",
      "24mm",
    ],
    [
      "Everyday office, retail and packaging use",
    ],
    "/product-img/bopp-tape-250x250.webp",
    [
      "/product-img/bopp-tape-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Marking Tapes",
    "₹12.5 / Box",
    "A white adhesive marking tape used for coding and identification.",
    [
      { k: "Minimum Order Quantity", v: "2 Box" },
      { k: "Tape Width", v: "20 mm" },
      { k: "Color", v: "White" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "18mm",
      "24mm",
    ],
    [
      "Coding, identification and general marking",
    ],
    "/product-img/masking-tape-250x250.webp",
    [
      "/product-img/masking-tape-250x250.webp",
    ],
  ),
  P(
    "tape",
    "ABRO Masking Tapes",
    "₹10 / Roll",
    "A general-purpose adhesive masking tape for painting and holding.",
    [
      { k: "Tape Width", v: "1 Inch" },
      { k: "Tape Length", v: "20 m" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "18mm",
      "24mm",
      "48mm",
    ],
    [
      "General-purpose painting and holding tape",
    ],
    "/product-img/anti-skid-and-slippery-tapes-250x250.webp",
    [
      "/product-img/anti-skid-and-slippery-tapes-250x250.webp",
    ],
  ),
  P(
    "tape",
    "Double Sided Foam Tape",
    "₹40 / Roll",
    "An EVA foam double-sided tape with acrylic adhesive for automotive mounting on uneven surfaces.",
    [
      { k: "Tape Width", v: "24 mm" },
      { k: "Foam Thickness", v: "1 mm" },
      { k: "Foam Type", v: "EVA Foam" },
      { k: "Adhesive Type", v: "Acrylic" },
      { k: "Tape Length", v: "10 m" },
      { k: "Applications", v: "Automotive" },
    ],
    [
      "12mm",
      "19mm",
      "24mm",
    ],
    [
      "Mounts signs, panels and fixtures on uneven surfaces",
    ],
    "/product-img/double-sided-single-sided-foam-tapes.webp",
    [
      "/product-img/double-sided-single-sided-foam-tapes.webp",
    ],
  ),
  // label-printing-tape
  P(
    "label-printing-tape",
    "Double Sided Cotton Flexo Printing Tape",
    "₹75 / Roll",
    "A pressure-sensitive cotton cloth tape with silicone polyester/paper liner used to mount stereo plates on printing rollers in flexo printing.",
    [
      { k: "Backing Material", v: "Cotton Cloth" },
      { k: "Tape Length", v: "20 m" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Usage/Application", v: "Flexo Printing" },
      { k: "Brand", v: "Vardhman" },
    ],
    [
      "480mm roll",
    ],
    [
      "High-tack rubber base adhesive for flexo plate mounting",
      "Simonized yellow/white release liner or PET film liner",
      "Gives a good number of impressions before the tape is exhausted",
    ],
    "/product-img/double-sided-cotton-flexo-printing-tape-250x250.webp",
    [
      "/product-img/double-sided-cotton-flexo-printing-tape-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Double Sided Clear Polyester Tapes",
    "₹140 / Piece",
    "A clear double-sided PET tape with acrylic adhesive for bonding and laminating flexible and rigid materials.",
    [
      { k: "Backing Material", v: "Polyester" },
      { k: "Width", v: "24 mm" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Tape Length", v: "50 m" },
      { k: "Usage/Application", v: "Bonding and laminating flexible and rigid materials" },
      { k: "Color", v: "Clear" },
    ],
    [
      "9mm",
      "12mm",
    ],
    [
      "Clear glass tape and temporary phone screen repair",
      "Bonding glass and plastics; POS stands, signs and displays",
      "Use with wooden mouldings",
    ],
    "/product-img/double-sided-clear-polyester-tapes.png",
    [
      "/product-img/double-sided-clear-polyester-tapes.png",
    ],
  ),
  P(
    "label-printing-tape",
    "Double Sided Tissue Tapes",
    "₹60 / Roll",
    "A solvent/hot-melt/water-base tissue tape used for foam and felt lamination, splicing and mounting across industries.",
    [
      { k: "Minimum Order Quantity", v: "100 Roll" },
      { k: "Tape Width", v: "1 Inch" },
      { k: "Tape Length", v: "50 m" },
      { k: "Adhesive Type", v: "Solvent, Hot Melt, Water Base" },
      { k: "Color", v: "Transparent" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "12mm",
      "18mm",
    ],
    [
      "Foam and felt lamination in automobile and appliance manufacturing",
      "Splicing films/paper/oils; mounting nameplates and stickers",
      "Easy tear-off with excellent adhesive property",
    ],
    "/product-img/tissue-tapes-250x250.webp",
    [
      "/product-img/tissue-tapes-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Paper Application Tape",
    "₹55 / Piece",
    "A medium-to-high tack transfer/lifting tape for applying self-adhesive lettering, logos and screen-printed graphics.",
    [
      { k: "Minimum Order Quantity", v: "1 Piece" },
      { k: "Packaging Type", v: "Roll Form" },
    ],
    [
      "100mm",
      "300mm",
    ],
    [
      "Easy transfer of graphics from small pieces to large plotter-cut letters",
      "Transparent film shows colours and shapes during application",
      "Easy handling and clean removal",
    ],
    "/product-img/paper-application-tape.png",
    [
      "/product-img/paper-application-tape.png",
    ],
  ),
  P(
    "label-printing-tape",
    "Red Polyester Tapes",
    "₹144 / Roll",
    "A red polyester film tape with pressure-sensitive acrylic adhesive and high tensile-strength backing for graphic arts, photography and electronics.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Tape Width", v: "1 Inch" },
      { k: "Tape Length", v: "50 m" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Backing Material", v: "Red PE Film" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "RED" },
    ],
    [
      "9mm",
      "12mm",
      "19mm",
    ],
    [
      "Thin, high-strength backing for butt splicing and core starting",
      "Chemical and solvent resistant, abrasion resistant",
      "High tear and temperature resistance for long-term aging",
    ],
    "/product-img/red-polyester-tapes-250x250.webp",
    [
      "/product-img/red-polyester-tapes-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Red Pe Release Liner",
    "₹120 / Kg",
    "An 80 GSM red silicone-coated PE release liner used in building, labelling, medical and adhesive coating applications.",
    [
      { k: "Minimum Order Quantity", v: "100 Kg" },
      { k: "GSM", v: "80 GSM" },
      { k: "Coating Type", v: "Silicone Coated" },
      { k: "Coating Side", v: "PE silicone Coating" },
      { k: "Color", v: "Red" },
      { k: "Packing Type", v: "Box" },
    ],
    [
      "Custom",
    ],
    [
      "Supplied for building/construction, labelling, medical and industrial markets",
      "Max coating width 1580mm with custom sizes and lengths on request",
    ],
    "/product-img/red-pe-release-liner-250x250.webp",
    [
      "/product-img/red-pe-release-liner-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Silicone Coated Release Liner Paper",
    "₹120 / Kg",
    "Double-sided Havana glassine silicone-coated release paper used in adhesive tape manufacturing and label production.",
    [
      { k: "Minimum Order Quantity", v: "100 Kg" },
      { k: "Color", v: "White, Yellow, Blue & Brown" },
      { k: "Coating Side", v: "Double side & Single Side" },
      { k: "GSM", v: "30 to 200" },
      { k: "Size", v: "20 x 30" },
      { k: "Customized", v: "As per customer requirement" },
    ],
    [
      "Custom",
    ],
    [
      "Good smoothness, heat resistant and non-stick",
      "Used as interliner for pressing/moulding of prepreg coils and rubber sheeting",
    ],
    "/product-img/silicone-coated-paper-for-stickers-250x250.webp",
    [
      "/product-img/silicone-coated-paper-for-stickers-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Double Sided Paper Polyester Tapes",
    "₹144 / Piece",
    "A polyester-backed double-sided tape used to boost assembly productivity with resilient bonding across substrates.",
    [
      { k: "Minimum Order Quantity", v: "10 Piece" },
      { k: "Backing Material", v: "Polyester" },
      { k: "Tape Length", v: "50 m" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Brand", v: "Vardhman" },
      { k: "Usage/Application", v: "Boost assembly productivity with resilient bonding" },
    ],
    [
      "12mm",
      "19mm",
    ],
    [
      "Good resistance to UV rays, most chemicals and solvents",
      "Excellent bonding/shear strength for plastic, metal and wooden substrates",
      "Suited to splicing paper and clear photographic mounting",
    ],
    "/product-img/double-sided-paper-polyester-tapes-250x250.webp",
    [
      "/product-img/double-sided-paper-polyester-tapes-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "3m Double Sided Tissue Tape",
    "₹220 / Piece",
    "3M Double Coated Tissue Tape (91091) — a 5.0-mil, 340 high-tack acrylic adhesive tape for end-tabbing, bonding fabric and attaching foam to plastics.",
    [
      { k: "Minimum Order Quantity", v: "10 Piece" },
      { k: "Tape Length", v: "50 m" },
      { k: "Brand", v: "3m" },
      { k: "Backing Material", v: "Tissue" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Adhesive Type", v: "Acrylic Solvent" },
      { k: "Usage/Application", v: "Excellent peel, tack and shear strength for rigorous splicing" },
    ],
    [
      "12mm",
      "18mm",
    ],
    [
      "Excellent performance at high and low temperatures",
      "Versatile adhesion to kraft, coated papers and plastic",
      "Used for end-tabbing, foam-to-plastic bonding and closing chipboard mailers",
    ],
    "/product-img/3m-tissue-tapes-250x250.webp",
    [
      "/product-img/3m-tissue-tapes-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Single Sided Pe Coated Paper",
    "₹100 / Kg",
    "A food-grade single-side PE coated paper (50 GSM, 12-micron PE) for food wrap and paper cup applications.",
    [
      { k: "Minimum Order Quantity", v: "100 Kg" },
      { k: "GSM", v: "50 gsm" },
      { k: "PE Thickness", v: "12 micron" },
      { k: "Usage", v: "Food Wrap, Paper Cup" },
      { k: "Coating Side", v: "Single Side" },
      { k: "Form", v: "Roll" },
      { k: "Food Grade", v: "Yes" },
      { k: "Sealing Type", v: "Heat Sealable" },
      { k: "Width", v: "500 mm" },
      { k: "Pulp Material", v: "Wood Pulp" },
      { k: "Color", v: "Printed" },
    ],
    [
      "Custom",
    ],
    [
      "FDA-compliant, protects against liquids like oil and water",
      "Used for bag closures, ream wrap and freezer/meat wrapping",
    ],
    "/product-img/single-sided-pe-coated-paper-250x250.webp",
    [
      "/product-img/single-sided-pe-coated-paper-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Hair Wig Tape",
    "₹30 / Piece",
    "A waterproof, transparent double-sided wig tape for attaching hair systems in minutes with no residue.",
    [
      { k: "Minimum Order Quantity", v: "1 Piece" },
      { k: "Hair Type", v: "All Type Hair" },
      { k: "Gender", v: "Unisex" },
      { k: "Usage/Application", v: "Parlour" },
      { k: "Brand", v: "German Brown" },
      { k: "Pattern", v: "Roll" },
    ],
    [
      "Custom shapes",
    ],
    [
      "Waterproof — safe for shampoo/conditioner use",
      "Easy to apply in small cut pieces",
      "Leaves no residue",
    ],
    "/product-img/hair-wig-tape-250x250.webp",
    [
      "/product-img/hair-wig-tape-250x250.webp",
    ],
  ),
  // P(
  //   "label-printing-tape",
  //   "Vinyl Film Roll",
  //   "₹5,000 / Roll",
  //   "A printable vinyl film roll for signage, labels and graphic applications.",
  //   [
  //     { k: "Material", v: "Vinyl" },
  //     { k: "Use", v: "Printing / signage" },
  //   ],
  //   [
  //     "Custom width",
  //   ],
  //   [
  //     "Used for signage, labels and printed graphics",
  //   ],
  //   "/product-img/vinyl-film-roll-250x250.webp",
  //   [
  //     "/product-img/vinyl-film-roll-250x250.webp",
  //   ],
  // ),
  P(
    "label-printing-tape",
    "Hdpe Pe Silicone Coated Release Liner",
    "₹120 / Kg",
    "An LDPE release film coated with silicone oil, applied to prevent sticking and protect the shape/viscosity of adhesive colloids.",
    [
      { k: "Minimum Order Quantity", v: "100 Kg" },
      { k: "Coating Type", v: "Silicone Coated" },
      { k: "Usage/Application", v: "Tape Manufacturing" },
      { k: "Coating Side", v: "Single Side & Double Side" },
      { k: "Color", v: "Red & Blue" },
      { k: "Size", v: "100 cm to 15 cm" },
    ],
    [
      "Custom",
    ],
    [
      "Beautiful appearance and easy, residue-free peeling",
      "High temperature resistance and soft, easy-paste feel",
    ],
    "/product-img/ldpe-silicone-coated-release-liner-250x250.webp",
    [
      "/product-img/ldpe-silicone-coated-release-liner-250x250.webp",
    ],
  ),
  P(
    "label-printing-tape",
    "Gum Transfer Paper Tape",
    "₹100 / Piece",
    "A paper/polyester gum transfer tape providing outstanding adhesion to silicones for lamination and graphic transfer processes.",
    [
      { k: "Brand", v: "Vardhman" },
      { k: "Backing Material", v: "Paper & Polyester" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Usage/Feature", v: "Transfer and orientation of coloured vinyl and label graphics" },
    ],
    [
      "100mm",
      "300mm",
    ],
    [
      "Used as a laminating tape on signs, graphics and plaques",
      "Adds high stability and additional bonding strength",
    ],
    "/product-img/gum-transfer-paper-tape-250x250.webp",
    [
      "/product-img/gum-transfer-paper-tape-250x250.webp",
    ],
  ),
  // electrical-tapes
  P(
    "electrical-tapes",
    "Polyester Electric Tapes",
    "₹50 / Roll",
    "A 3M-brand polyester film insulation tape for end-turns, inner-layer insulation and wrapping capacitors, wire harnesses and motors. Polyester Film Electrical Tape 1350F is a yellow, white or black, UL recognized flame retardant, 2.5-mil (0.064 mm) or 3.5-mil (0.089 mm) thick tape composed of a 1-mil (0.025 mm) or 2-mil (0.051 mm) polyester film backing coated on one side with a non-corrosive, acrylic pressure-sensitive.",
    [
      { k: "Tape Width", v: "10 mm" },
      { k: "Tape Thickness", v: "0.05 mm" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Dielectric Strength", v: "3 kV" },
      { k: "Tape Length", v: "20 m" },
      { k: "Brand", v: "3M" },
      { k: "Backing Material", v: "Polyester Film" },
      { k: "Color", v: "Multi color" },
    ],
    [
      "15mm",
      "25mm",
    ],
    [
      "Chemical, solvent and moisture resistant; flame-retardant, UL-rated",
      "High edge-tear, puncture and abrasion resistance",
      "Used on end turns, wire harnesses, transformers and fractional HP motors",
    ],
    "/product-img/polyester-electric-tapes.webp",
    [
      "/product-img/polyester-electric-tapes.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Cotton Cloth Tape",
    "₹150 / Roll",
    "We are Manufacturer of Foam Tape, Backer Rod, Anti Skid Epoxy Flooring Tape, Eva Roll Sheet, Floor Marking Adhesive Tape, BOPP Tape, Red Polyester Tap, White Tissue Tape, Cross Filament Tap, etc. We direct all our activities to cater the expectations of customers by providing them excellent quality products as per their gratification.",
    [
      { k: "Tape Width", v: "1 Inch" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Color", v: "Black, White" },
      { k: "Backing Material", v: "Cloth" },
      { k: "Usage/Feature", v: "Electrical" },
      { k: "Brand", v: "Vardhman" },
    ],
    [
      "19mm",
      "25mm",
    ],
    [
      "Excellent waterproof property, flexible & highly conformable",
      "High-temperature masking during sandblasting",
      "Cable bundling, textile screen printing, double-glazing edge protection",
    ],
    undefined,
    undefined,
  ),
  P(
    "electrical-tapes",
    "HT Insulation Tape",
    "₹30 / Roll",
    "A high-temperature insulation tape for demanding electrical and coil applications.",
    [
      { k: "Tape Thickness", v: "1 mm" },
      { k: "Tape Width", v: "25 mm" },
      { k: "Tape Length", v: "20 m" },
      { k: "Packaging Type", v: "BOX" },
      { k: "Brand", v: "VARDHMAN" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "25mm",
    ],
    [
      "Used for high-temperature electrical insulation applications",
    ],
    undefined,
    undefined,
  ),
  P(
    "electrical-tapes",
    "Non Adhesive P.v.c Tape",
    "₹15 / Roll",
    "A self-adhering, non-adhesive PVC tape perfect for electrical installations, wiring looms and commercial wiring projects.",
    [
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Multi Color" },
      { k: "MOQ", v: "100 Rolls" },
      { k: "Usage/Feature", v: "Insulation" },
      { k: "Tape Type", v: "Non-Adhesive" },
    ],
    [
      "18mm",
      "25mm",
    ],
    [
      "Suited to electrical installations and commercial wiring looms",
      "Premium grade plasticised PVC film",
    ],
    "/product-img/non-adhesive-p-v-c-tape-250x250.webp",
    [
      "/product-img/non-adhesive-p-v-c-tape-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Steelgrip Electrical Insulation Tapes",
    "₹40 / Piece",
    "A Steelgrip-brand black electrical insulation tape.",
    [
      { k: "Tape Length", v: "20 m" },
      { k: "Tape Width", v: "18 mm" },
      { k: "Color", v: "Black" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "18mm",
    ],
    [
      "General-purpose electrical insulation",
    ],
    "/product-img/steelgrip-electrical-insulation-tapes-250x250.webp",
    [
      "/product-img/steelgrip-electrical-insulation-tapes-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "PVC Film (Tape Grade / Electric Insulation)",
    "₹20 / sq ft",
    "PVC film manufactured at 0.09mm standard thickness, 1.32m standard width, used for making adhesive/insulation tape.",
    [
      { k: "Pattern", v: "Plain" },
      { k: "Packaging Type", v: "Roll" },
      { k: "Usage/Application", v: "Electricity" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "Custom",
    ],
    [
      "Good fire resistance; complies with IS, REACH and RoHS as required",
      "Protects cables/wires from abrasion, corrosion and UV damage",
    ],
    "/product-img/pvc-film-tape-grade-electric-insulation-250x250.webp",
    [
      "/product-img/pvc-film-tape-grade-electric-insulation-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Heat Resistant Teflon Tape",
    "₹20 / Roll",
    "A PTFE/fiberglass tape with high-temperature silicone adhesive, used as a release surface on heat sealers and in composite aircraft lining.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Tape Length", v: "10 m" },
      { k: "Color", v: "Brown" },
      { k: "Backing Material", v: "Teflon" },
      { k: "Usage/Feature", v: "Heat Resistant" },
    ],
    [
      "15mm",
      "25mm",
    ],
    [
      "Performs continuously up to 260°C",
      "Excellent releasability with Class H insulation property",
      "Flame retardant, oil and corrosion resistant",
    ],
    "/product-img/heat-resistant-teflon-tape-250x250.webp",
    [
      "/product-img/heat-resistant-teflon-tape-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Pvc Electrical Insulation Tape",
    "₹5 / Piece",
    "A PVC electrical tape used for insulation, protection, bundling, maintenance and colour coding around the home.",
    [
      { k: "Tape Width", v: "16mm" },
      { k: "Brand", v: "Vardhman" },
      { k: "Usage/Feature", v: "Electrical insulation and other uses around the home" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Material", v: "PVC" },
    ],
    [
      "18mm",
    ],
    [
      "Withstands voltage with weather-resistant flexibility",
      "High temperature rating of 80°C, fire resistance under 2 seconds",
    ],
    "/product-img/pvc-electrical-insulation-tape-250x250.webp",
    [
      "/product-img/pvc-electrical-insulation-tape-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Polyimide Kapton Adhesive Tape",
    "₹50 / Roll",
    "A silicone/acrylic-adhesive polyimide (Kapton) tape used for coil insulation, capacitor wrapping and high-temperature masking.",
    [
      { k: "Tape Length", v: "20 m" },
      { k: "Backing Material", v: "Silicone & Acrylic" },
      { k: "Color", v: "Tawny/Brown" },
      { k: "Elongation", v: "Reaches maximum at about 300°C (570°F)" },
      { k: "Tape Type", v: "Adhesive" },
    ],
    [
      "10mm",
      "15mm",
      "25mm",
    ],
    [
      "Insulation of coils in electric motors and capacitors",
      "Masking for powder coating; bed surface for 3D printing with ABS",
      "Insulating and fastening flexible PCBs, magnet wire and cabling",
    ],
    "/product-img/polyimide-kapton-adhesive-tape-250x250.webp",
    [
      "/product-img/polyimide-kapton-adhesive-tape-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Conductive Adhesive Copper Foil Tape",
    "₹150 / Roll",
    "A copper foil tape recommended for electro-static shielding, cable wrapping and stained-glass work. Copper Foil Tape 1126 is a 2.6-mil (0.066 mm) thick tape composed of a 1.4-mil (0.036 mm) flat copper foil backing coated on one side with a non-corrosive, electrically conductive acrylic pressure-sensitive adhesive supplied on a removeable liner.",
    [
      { k: "Tape Length", v: "25 m" },
      { k: "Brand", v: "Vardhman" },
      { k: "Backing Material", v: "Copper Foil" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Usage/Feature", v: "Creation of paper circuits" },
    ],
    [
      "10mm",
      "25mm",
    ],
    [
      "Electromagnetic shielding and slug/snail deterrent",
      "Wrapping wire or cables for crafts and domestic applications",
    ],
    "/product-img/copper-foil-adhesive-tape-250x250.webp",
    [
      "/product-img/copper-foil-adhesive-tape-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Cotton Insulation FrictionTape",
    "₹300 / Piece",
    "A black cotton friction insulation tape with high-grade electrical adhesive, used industrially and commercially.",
    [
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Black" },
      { k: "Backing Material", v: "Cotton" },
      { k: "Usage/Feature", v: "Friction insulation cotton tape for industrial & commercial use" },
      { k: "Tape Type", v: "Adhesive" },
    ],
    [
      "19mm",
      "25mm",
    ],
    [
      "Good adhesion strength to almost all surfaces",
      "Bundling of wires, penetration of cables and splices",
      "Provides abrasion protection and mechanical over-wrap protection",
    ],
    "/product-img/cotton-friction-insulation-tape-250x250.webp",
    [
      "/product-img/cotton-friction-insulation-tape-250x250.webp",
    ],
  ),
  P(
    "electrical-tapes",
    "Pink Rayon Tape",
    "₹90 / Roll",
    "A rayon-fabric insulation tape with thermosetting rubber adhesive for coil winding and holding wires in motors.",
    [
      { k: "Minimum Order Quantity", v: "100 Roll" },
      { k: "Conductor Type", v: "Solid" },
      { k: "Insulation Material", v: "Ethylene Propylene" },
      { k: "Tape Length", v: "50 m" },
      { k: "Tape Type", v: "Adhesive" },
    ],
    [
      "19mm",
      "25mm",
    ],
    [
      "Core insulation in relay transformers and solenoid coils",
      "Holding down wire leads in corrosive environments",
      "Coil winding in motors and telecom equipment",
    ],
    "/product-img/pink-rayon-tape-250x250.webp",
    [
      "/product-img/pink-rayon-tape-250x250.webp",
    ],
  ),
  // insulation-waterproof-tapes
  P(
    "insulation-waterproof-tapes",
    "2 Inch Duct Tape",
    "₹140 / Roll",
    "Duct tape is one of the most popular and versatile types of tape thanks to its useful combination of properties — water resistant, strong, easy to tear and flexible. It has become multipurpose and is used for general sealing, patching holes, packing boxes and repairs, sticking to rough and uneven indoor and outdoor surfaces such as wood, stone, plaster, brick and metal.",
    [
      { k: "Minimum Order Quantity", v: "10 Roll" },
      { k: "Tape Width", v: "2 Inch" },
      { k: "Color", v: "Muti" },
    ],
    ["2 Inch"],
    [
      "Very useful for quick repairs and to protect components",
      "Sticks to rough and uneven indoor/outdoor surfaces — wood, stone, plaster, brick and metal",
    ],
    "/product-img/2-Inch-duct-tape.jpg",
    [
      "/product-img/2-Inch-duct-tape.jpg",
    ],
  ),
  P(
    "insulation-waterproof-tapes",
    "Waterproof Butyl Rubber Tape",
    "₹85 / Piece",
    "A butyl rubber sealant tape widely used in roofing, surface crack repair, RV repair, window and boat sealing, and glass and EPDM rubber roof patching. Non-toxic, no contraction, anti-aging, sealing, waterproofing, high/low temperature resistant, fire retardant and UV resistant.",
    [
      { k: "Tape Length", v: "5 m" },
      { k: "Tape Width", v: "2 Inch" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Backing Material", v: "Aluminium With Butyl Rubber" },
      { k: "Color", v: "Black, Gray, Yellow, Transparent" },
    ],
    ["50mm", "75mm"],
    [
      "Just peel off the release film and apply — the aluminium foil cover keeps its size stable",
      "Short-term heat resistance 180°C (356°F); long-term heat resistance 120°C (248°F)",
      "Maintains flexibility and adhesion under displacement and deformation",
    ],
    undefined,
    undefined,
  ),
  P(
    "insulation-waterproof-tapes",
    "Aluminum Foil Tapes",
    "₹60 / Piece",
    "A foil-backed adhesive tape commonly used to cover seams on ducts, joints and metal, relied on across metal finishing, automotive, aerospace and appliance industries. Durable enough to be safe on airplanes and machinery.",
    [
      { k: "Minimum Order Quantity", v: "10 Piece" },
      { k: "Tape Width", v: "4 inch" },
      { k: "Tape Length", v: "20 m" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Backing Material", v: "Aluminium Foil" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    ["48mm", "72mm"],
    [
      "Resists humidity and chemical agents with good thermal conductivity",
      "Resists high temperatures and diffuses/reflects light",
      "Smooth finish, easy to use, low maintenance and durable",
    ],
    "/product-img/aluminium-foil-tape.jpg",
    ["/product-img/aluminium-foil-tape.jpg"],
  ),
  P(
    "insulation-waterproof-tapes",
    "Butyl Rubber Tape",
    "₹50 / Roll",
    "Designed for hot water pipes, building joints, cables and similar applications, with good insulation and waterproof performance. Working temperature 90°C (can reach 500°C briefly), with reliable waterproofing and UV resistance.",
    [
      { k: "Minimum Order Quantity", v: "10 Roll" },
      { k: "Tape Width", v: "2 Inch" },
      { k: "Tape Length", v: "10 m" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Black, White, Yellow" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    ["50mm", "75mm"],
    [
      "Used for cable jointing, telecoms, aerial installation and mechanical fixings",
      "Hose and pipe repair, sports handle wrapping",
      "Solvent-free with good weather resistance and insulation performance",
    ],
    "/product-img/butyl-tapes-250x250.webp",
    ["/product-img/butyl-tapes-250x250.webp"],
  ),
  P(
    "insulation-waterproof-tapes",
    "High Polymer Butyl Rubber Tape",
    "₹85 / Piece",
    "A high-polymer butyl rubber and aluminium foil tape that stops leaks instantly — repairs pipe leakage, roof water leakage and wall cracks with an effective waterproof seal. Anti-ageing for 30 years.",
    [
      { k: "Minimum Order Quantity", v: "10 Piece" },
      { k: "Tape Length", v: "5 m" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Black" },
      { k: "Usage/Feature", v: "Multi-functional, thicker tape, more viscous and longer lasting; repairs wall cracks" },
      { k: "Backing Material", v: "Butyl Rubber With Aluminium Foil" },
    ],
    ["50mm", "75mm"],
    [
      "High temperature resistant to 120°C, low temperature resistant to -40°C",
      "Excellent chemical, weather and corrosion resistance",
      "Good adhesion, water resistance, airtightness and dimensional stability",
    ],
    "/product-img/high-polymer-butyl-rubber-tape-250x250.webp",
    ["/product-img/high-polymer-butyl-rubber-tape-250x250.webp"],
  ),
  P(
    "insulation-waterproof-tapes",
    "Pipe Wrapping Rubber Tapes",
    "₹15 / Piece",
    "A non-inflammable PVC-coated pipe wrapping tape used for sanitary and plumbing applications along with underground pipelines, helping prevent corrosion on metal pipe or conduit.",
    [
      { k: "Minimum Order Quantity", v: "10 Piece" },
      { k: "Tape Width", v: "50 mm" },
      { k: "Tape Length", v: "50 m" },
      { k: "Adhesive Type", v: "Self Adhesive" },
      { k: "Color", v: "Black" },
      { k: "Thickness", v: "0.5 mm" },
      { k: "Material", v: "PVC" },
      { k: "Backing Material", v: "Rubber" },
    ],
    ["50mm"],
    [
      "Premium EPDM rubber reduces condensation on cold pipes",
      "Helps prevent frozen pipes and potential pipe bursts",
      "Applies to flat and irregular surfaces with excellent water resistance",
    ],
    "/product-img/pipe-wrapping-rubber-tapes-250x250.webp",
    ["/product-img/pipe-wrapping-rubber-tapes-250x250.webp"],
  ),
  P(
    "insulation-waterproof-tapes",
    "Silver color Reinforced Aluminium Tape",
    "₹60 / Roll",
    "A reinforced aluminium tape widely used in the HVAC industry, specially processed to be non-tearable with a high coating of hotmelt adhesive that grips joints firmly.",
    [
      { k: "Minimum Order Quantity", v: "72 Roll" },
      { k: "Tape Width", v: "2 inch" },
      { k: "Tape Length", v: "20 m" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Silver" },
      { k: "Backing Material", v: "Aluminium Foil with Thread" },
    ],
    ["48mm", "72mm"],
    [
      "Non-tearable feature grips HVAC duct joints firmly",
      "Assists air and water proofing of ducts over the long run",
    ],
    "/product-img/silver-color-reinforced-aluminium-tape-250x250.webp",
    ["/product-img/silver-color-reinforced-aluminium-tape-250x250.webp"],
  ),
  // packaging-tape
  P(
    "packaging-tape",
    "BOPP Self Adhesive Tape",
    "₹1,800 / Box",
    "BOPP films have excellent gloss and high transparency for a fine finish. Unlike other polyester films, BOPP acts as a good moisture-resistant barrier and resists pollution and harmful chemicals.",
    [
      { k: "Tape Width", v: "2 Inch" },
      { k: "Tape Length", v: "65 m" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Transparent & Brown" },
      { k: "Usage/Feature", v: "Industrial" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "2 Inch",
    ],
    [
      "Strong carton sealing with good moisture resistance",
      "Available transparent, printed or brown for industrial packaging",
    ],
    "/product-img/bopp1.webp",
    [
      "/product-img/bopp1.webp",
    ],
  ),
  P(
    "packaging-tape",
    "Cross Filament Tapes",
    "₹160 / Roll",
    "Cross Filament Tape has very high tensile strength — best for holding white goods, insulation of oil transformers, banding of metal and bar, heavy duty packaging & strapping, closing of metal coils, reinforcement & closing of cables, and structuring of umbilical cord for marine probe. It is a pressure-sensitive tape used for closing corrugated fiberboard boxes, reinforcing packages and bundling.",
    [
      { k: "Minimum Order Quantity", v: "50 Roll" },
      { k: "Tape Length", v: "50 m" },
      { k: "Tape Width", v: "48 mm" },
      { k: "Backing Material", v: "Filament tape or strapping tape is a pressure-sensitive tape" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Transparent" },
    ],
    [
      "48mm",
    ],
    [
      "Balanced machine/cross direction tensile strength, high adhesion and medium impact strength",
      "Uni-directional filaments resist delamination for one-piece removability",
      "Operating temperature range +32°F (0°C) to +180°F (+82°C)",
    ],
    "/product-img/cross-filament-tapes.webp",
    [
      "/product-img/cross-filament-tapes.webp",
    ],
  ),
  P(
    "packaging-tape",
    "Plastic Core For Tape",
    "₹110 / Piece",
    "Precision-cut plastic cores with chamfered ends, burr-free cuts and tight tolerances. Used as support for winding/unwinding rolls of paper, film, fabric and tape; recyclable and cost-effective vs metal cores.",
    [
      { k: "Minimum Order Quantity", v: "100 Piece" },
      { k: "Inner Diameter", v: "3 Inch" },
      { k: "Color", v: "White" },
      { k: "Application Surface", v: "Plastic" },
      { k: "Residue Free Removal", v: "Yes" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "3 Inch ID",
    ],
    [
      "Central support for winding/unwinding paper, film, fabric and tape rolls",
      "Used for label, tape, printing and packaging film cores",
      "Recyclable and lightweight vs metal cores",
    ],
    "/product-img/pvc-plastic-cores-250x250.webp",
    [
      "/product-img/pvc-plastic-cores-250x250.webp",
    ],
  ),
  P(
    "packaging-tape",
    "3m MonoFilament Tape",
    "₹80 / Roll",
    "German-manufactured, conformable polypropylene packaging tape with high tear resistance from longitudinal glass-fibre reinforcement. Strong adhesion for sealing and bundling heavy goods, pallets and dangerous goods during transport.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Color", v: "Tranparent And milky White" },
      { k: "Brand", v: "3m, Vardhman" },
      { k: "Elongation", v: "50 mtr" },
      { k: "Backing Material", v: "Filament" },
    ],
    [
      "Standard",
    ],
    [
      "Palletizing of packaging and bending of tubes/bars",
      "Heavy packaging, closing of metal coils, paint anchor test",
      "Reinforcement and closing of cables",
    ],
    "/product-img/mono-filament-tape-250x250.webp",
    [
      "/product-img/mono-filament-tape-250x250.webp",
    ],
  ),
  P(
    "packaging-tape",
    "Reinforced Kraft Paper Tape (Water Activated)",
    "₹85 / Roll",
    "Made of kraft paper with rubber adhesive, mainly for box packaging and export. Eco-friendly with no plastic content; also available with scrim reinforcement for high strength. Used in carton sealing, splicing, freezer tape and picture framing.",
    [
      { k: "Tape Width", v: "80 mm" },
      { k: "Tape Length", v: "50 m" },
      { k: "Color", v: "Brown" },
      { k: "Backing Material", v: "Flat Back Craft Paper" },
      { k: "Brand", v: "Vardhman" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "80mm",
    ],
    [
      "Carton sealing, packing and splicing for export packaging",
      "Freezer tape, straight-line masking, silk screening and picture framing",
    ],
    "/product-img/reinforced-kraft-paper-tape-250x250.webp",
    [
      "/product-img/reinforced-kraft-paper-tape-250x250.webp",
    ],
  ),
  P(
    "packaging-tape",
    "Pvc Non Adhesive Tape",
    "₹5 / Roll",
    "Made from high-grade plasticised PVC film that bonds together without adhesive, for permanent wrapping applications. Used in automobile wiring harnesses, primary winding of current transformers, cable jointing kits and concealed plumbing.",
    [
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Multi Colour" },
      { k: "Backing Material", v: "Pvc Film" },
      { k: "Tape Type", v: "Non-Adhesive" },
    ],
    [
      "Standard",
    ],
    [
      "Automobile wiring harness and cable jointing kits",
      "Primary winding of current transformers, concealed plumbing",
    ],
    "/product-img/pvc-non-adhesive-tapes-250x250.webp",
    [
      "/product-img/pvc-non-adhesive-tapes-250x250.webp",
    ],
  ),
  P(
    "packaging-tape",
    "Book Binding Or Duct And Gaffer Tapes",
    "₹80 / Roll",
    "Water-activated, gummed linen tape for instant page binding — perfect to reinforce pamphlets, repair covers and mend loose pages.",
    [
      { k: "Width", v: "24 mm (1 in)" },
      { k: "Backing Material", v: "Duct And Cotton" },
      { k: "Length", v: "40 m" },
      { k: "Color", v: "Black" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Brand", v: "Vardhman" },
    ],
    [
      "24mm",
    ],
    [
      "Binds book pages instantly with water-activated gummed linen tape",
      "Reinforces pamphlets, repairs covers and mends loose pages",
    ],
    "/product-img/book3-250x250.webp",
    [
      "/product-img/book3-250x250.webp",
    ],
  ),
  // roads-construction
  P(
    "roads-construction",
    "Silver Grey Fabric Reflective Tape",
    "₹15 / Meter",
    "A sew-on polyester fabric reflective tape composed of wide-angle exposed retroreflective lenses bonded to a durable cloth backing, improving dusk/night visibility.",
    [
      { k: "Minimum Order Quantity", v: "10 Meter" },
      { k: "Tape Width", v: "25 mm" },
      { k: "Tape Length", v: "50 m" },
      { k: "Reflective Grade", v: "Engineering" },
      { k: "Packaging Type", v: "Roll" },
      { k: "Base Color", v: "Grey" },
      { k: "Material", v: "Polyester" },
      { k: "Size", v: "2 inch" },
      { k: "Usage/Application", v: "Used in safety wear for warning" },
    ],
    [
      "25mm",
      "50mm",
    ],
    [
      "Sewn onto jackets, t-shirts, vests, chaps, pants and jeans",
      ">100 home wash cycles, brightness >420 cd/(lx.m2)",
    ],
    "/product-img/silver-grey-fabric-reflective-tape.webp",
    [
      "/product-img/silver-grey-fabric-reflective-tape.webp",
    ],
  ),
  P(
    "roads-construction",
    "Caution Barricade Tape",
    "₹250 / Roll",
    "A brightly coloured PE barricading tape used to warn passersby of hazards, printed with bold 2-inch \"Caution\"/\"Danger\" lettering.",
    [
      { k: "Material", v: "PE" },
      { k: "Tape Type", v: "Barricading Tape" },
      { k: "Usage/Application", v: "Warning" },
      { k: "Brand", v: "Vardhman" },
    ],
    [
      "75mm",
    ],
    [
      "Can be tied, stapled or nailed to posts, fences or barricades",
      "Fast on-the-spot warning for temporary outdoor or permanent indoor use",
    ],
    undefined,
    undefined,
  ),
  P(
    "roads-construction",
    "Retro Reflective Tapes",
    "₹280 / Roll",
    "An imported retro-reflective tape that increases the visibility of moving objects to motorists at night by reflecting headlight beams back to their source.",
    [
      { k: "Packaging Type", v: "Roll" },
      { k: "Color", v: "Multi" },
      { k: "Usage/Application", v: "Heavy Vehicle" },
      { k: "Features", v: "A bright tape can be seen from longer distances" },
      { k: "Brand", v: "3m, Reflomax, Avery Dennison & Chinese" },
    ],
    [
      "50mm",
    ],
    [
      "Reduces side and rear impacts in dark, poorly lit conditions",
      "Important for highway applications where visibility from a distance matters",
    ],
    "/product-img/Retro-Reflective-Tape.avif",
    [
      "/product-img/Retro-Reflective-Tape.avif",
    ],
  ),
  P(
    "roads-construction",
    "Colours Fabric Reflective Tape",
    "₹19 / Meter",
    "A polyester fabric reflective tape used on life jackets, clothing, vehicles and helmets to improve dusk/night visibility.",
    [
      { k: "Packaging Type", v: "Roll" },
      { k: "Material", v: "Polyester" },
      { k: "Roll Length", v: "50 Mtr" },
      { k: "Usage/Application", v: "Life Jackets" },
    ],
    [
      "25mm",
      "50mm",
    ],
    [
      "Sewn to clothing, vehicles, trailers and bike helmets",
      "Highlights driveway edges, letterboxes, boats and ships",
    ],
    "/product-img/colours-fabric-reflective-tape-250x250.webp",
    [
      "/product-img/colours-fabric-reflective-tape-250x250.webp",
    ],
  ),
  P(
    "roads-construction",
    "Dowel Bar Cap Pvc Sleeve",
    "₹2 / Piece",
    "A flexible virgin-plastic sleeve that de-bonds dowel bars from concrete, allowing sliding movement within panels during expansion/contraction.",
    [
      { k: "Size", v: "Sleeves of 25, 30, 32, 36, 38 and 40 mm diameter, lengths 100–360 mm" },
      { k: "Shape", v: "Pipe" },
      { k: "Material", v: "Pvc" },
      { k: "Color", v: "Multicolor" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "Standard",
    ],
    [
      "Covers at least 60% of the dowel bar length for contraction joints",
      "Thin-wall, smooth construction avoids cracking of concrete panels",
    ],
    "/product-img/dowel-bar-cap-pvc-sleeve-250x250.webp",
    [
      "/product-img/dowel-bar-cap-pvc-sleeve-250x250.webp",
    ],
  ),
  P(
    "roads-construction",
    "3m Retro Reflective Tape",
    "₹3,250 / Roll",
    "3M reflective tape featuring microprismatic technology for bright, vivid retroreflectivity at wide angles, improving day/night visibility of vehicles and equipment.",
    [
      { k: "Reflectivity Grade", v: "Commercial Grade" },
      { k: "Tape Width", v: "24 mm" },
      { k: "Roll Length", v: "10 m" },
      { k: "Packaging Type", v: "Roll" },
      { k: "Usage/Application", v: "Vehicles" },
      { k: "Base Material", v: "PVC" },
      { k: "Color", v: "Red white yellow" },
      { k: "Brand", v: "3M" },
      { k: "Size", v: "50mm" },
      { k: "Surface Finish", v: "Glossy" },
      { k: "Conforming Standard", v: "ASTM D4956" },
      { k: "Service Life", v: "3 Years" },
      { k: "Usage Area", v: "Marine, Road Safety, Vehicle Marking" },
    ],
    [
      "50mm",
    ],
    [
      "Almost 90-degree wide-angle retroreflectivity",
      "Certified to ASTM D4956 with a 3-year service life",
    ],
    "/product-img/3m-retro-reflective-tape-250x250.webp",
    [
      "/product-img/3m-retro-reflective-tape-250x250.webp",
    ],
  ),
  P(
    "roads-construction",
    "Underground Warning Tape",
    "₹25 / Meter",
    "A PVC detectable marker tape that enables buried cables and pipes to be located without damage during excavation.",
    [
      { k: "Minimum Order Quantity", v: "1 Meter" },
      { k: "Material", v: "PVC" },
      { k: "Usage/Application", v: "Warning" },
      { k: "Packaging Type", v: "Roll" },
      { k: "Thickness", v: "100 Micron to 200 Micron" },
      { k: "Brand", v: "Vardhman" },
    ],
    [
      "100mm",
      "150mm",
    ],
    [
      "Colour-coded to guard against dangerous digging accidents",
      "Minimum 200µm thickness at 150mm width, 500m roll size per spec",
    ],
    "/product-img/underground-warning-tape-250x250.webp",
    [
      "/product-img/underground-warning-tape-250x250.webp",
    ],
  ),
  // expanded-polyethylene-foam
  P(
    "expanded-polyethylene-foam",
    "Expanded Polyethylene Foam Rods",
    "₹2 / Meter",
    "High-quality EPE foam backer rods, water- and corrosion-resistant, retaining shape without shrinking or swelling.",
    [
      { k: "Minimum Order Quantity", v: "1000 Meter" },
      { k: "Length", v: "200 mm" },
      { k: "Color", v: "White" },
      { k: "Application", v: "Construction Industry" },
      { k: "Shape", v: "Round" },
      { k: "Packing Type", v: "Box" },
    ],
    [
      "Various dia",
    ],
    [
      "Resistant to water, corrosion, acids and alkalis; antifungal",
      "Used in construction, shoes, underground cables and glass wall construction",
      "Also used for heating and thermal insulation",
    ],
    "/product-img/expanded-polyethylene-foam-rods-250x250.webp",
    [
      "/product-img/expanded-polyethylene-foam-rods-250x250.webp",
    ],
  ),
  P(
    "expanded-polyethylene-foam",
    "Epe Pipe Insulation Tube",
    "₹17 / Meter",
    "A closed-cell EPE foam insulation tube with very good flexibility, cushioning and low thermal conductivity, offering strong buoyancy and weather resistance.",
    [
      { k: "Minimum Order Quantity", v: "100 Meter" },
      { k: "Packaging Type", v: "50 Mtr" },
      { k: "Material", v: "Epe Foam" },
      { k: "Color", v: "Multi" },
      { k: "Density", v: "20-30kgs/m3" },
      { k: "Brand", v: "Vardhman" },
    ],
    [
      "15-110mm ID",
    ],
    [
      "Closed-cell, waterproof material with strong buoyancy",
      "Good sound-proofing and anti-vibration effect",
      "Excellent workability — cutting, bonding, extrusion and moulding",
    ],
    "/product-img/epe-pipe-insulation-tube-250x250.webp",
    [
      "/product-img/epe-pipe-insulation-tube-250x250.webp",
    ],
  ),
  P(
    "expanded-polyethylene-foam",
    "Epe Foam C Section",
    "₹12 / Meter",
    "An extruded EPE foam C-section protector offering impact protection, cushioning and abrasion resistance for kids' cycle rods, wires and heater elements.",
    [
      { k: "Minimum Order Quantity", v: "500 Meter" },
      { k: "Color", v: "Multi" },
      { k: "Usage/Application", v: "Protection and insulation of rods, wires and heater elements" },
      { k: "Design Type", v: "Customized" },
    ],
    [
      "Custom",
    ],
    [
      "C-shape protector for impact protection and abrasion resistance",
      "Light weight with resilience, flexibility and shock absorption",
    ],
    undefined,
    undefined,
  ),
  P(
    "expanded-polyethylene-foam",
    "Epe Foam U Profile",
    "₹15 / Meter",
    "An extruded closed-cell self-gripping EPE U-profile for packaging glass, photo-frames, mica sheets and handicraft products.",
    [
      { k: "Minimum Order Quantity", v: "100 Meter" },
      { k: "Color", v: "Multi" },
      { k: "Usage/Application", v: "Cushioning products during shipping" },
      { k: "Material", v: "EPE" },
      { k: "Feature", v: "U-shape protector for impact protection, cushioning and abrasion resistance" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "Custom",
    ],
    [
      "Available in standard U-30 to U-60 sizes, 25/50 m continuous length",
      "High strength, light weight and moisture-proof",
    ],
    "/product-img/epe-foam-u-profile-250x250.webp",
    [
      "/product-img/epe-foam-u-profile-250x250.webp",
    ],
  ),
  P(
    "expanded-polyethylene-foam",
    "Epe Foam L Section",
    "₹17 / Meter",
    "An extruded L-shaped EPE foam profile used as a durable packaging product for electronic items and furniture.",
    [
      { k: "Minimum Order Quantity", v: "100 Meter" },
      { k: "Design Type", v: "Roll" },
      { k: "Brand", v: "vardhaman" },
      { k: "Size", v: "6 x 4 ft" },
      { k: "Length", v: "100 m" },
      { k: "Usage/Application", v: "Furniture, skin products, handbags, computers and electric appliances" },
      { k: "Color", v: "White" },
      { k: "Thickness", v: "25 mm" },
      { k: "Density", v: "30 kg/m3" },
      { k: "Temperature Range", v: "-40 to 70°C" },
    ],
    [
      "Custom",
    ],
    [
      "Used as packaging for electronic products, UPS/inverters and furniture",
      "Excellent strength and crack-resistant finish",
    ],
    "/product-img/epe-foam-l-section-250x250.webp",
    [
      "/product-img/epe-foam-l-section-250x250.webp",
    ],
  ),
  // automotive-tapes
  P(
    "automotive-tapes",
    "3M Pe Foam Tapes",
    "₹10 / Roll",
    "A polyethylene foam tape combining a rubber-based adhesive with conformable closed-cell foam for a good initial bond to a variety of surfaces.",
    [
      { k: "Minimum Order Quantity", v: "10 Roll" },
      { k: "Color", v: "Gray" },
      { k: "Brand", v: "3M" },
      { k: "Material", v: "P.e Foam" },
      { k: "Make", v: "India" },
    ],
    [
      "9mm",
      "12mm",
    ],
    [
      "Protects against surface abrasion, edges and corners",
      "Thermal and acoustic insulation of roofs, walls and pipelines",
      "Floor covering underlay",
    ],
    "/product-img/3m-pe-foam-tapes-250x250.webp",
    [
      "/product-img/3m-pe-foam-tapes-250x250.webp",
    ],
  ),
  P(
    "automotive-tapes",
    "P.e Foam Tape",
    "₹60 / Piece",
    "A white/black PE foam adhesive tape for gasketing, sealing and gap filling in vehicles.",
    [
      { k: "Minimum Order Quantity", v: "10 Piece" },
      { k: "Color", v: "White And Black" },
      { k: "Backing Material", v: "P.e Foam" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Country of Origin", v: "Made in India" },
      { k: "Tape Width", v: "3mm" },
    ],
    [
      "9mm",
      "12mm",
      "19mm",
    ],
    [
      "Protects against surface abrasion, edges and corners",
      "Thermal insulation of pipelines and product spacing",
    ],
    "/product-img/PE-FOAM-TAPE.webp",
    [
      "/product-img/PE-FOAM-TAPE.webp",
    ],
  ),
  P(
    "automotive-tapes",
    "Panel Bonding Tape",
    "₹40 / Piece",
    "A high-strength industrial panel bonding tape used for sealing and bonding automotive panels and trim with virtually invisible fastening.",
    [
      { k: "Minimum Order Quantity", v: "100 Piece" },
      { k: "Tape Width", v: "100 mm" },
      { k: "Tape Length", v: "50 m" },
      { k: "Backing Material", v: "BOX" },
      { k: "Usage/Feature", v: "Industrial" },
      { k: "Tape Type", v: "Adhesive" },
    ],
    [
      "12mm",
      "19mm",
    ],
    [
      "Seals out water and dust; high temperature and solvent resistance",
      "Eliminates screwing, riveting and welding",
      "Excellent for sealing, cushioning and impact resistivity",
    ],
    "/product-img/panel-bonding-tape-250x250.webp",
    [
      "/product-img/panel-bonding-tape-250x250.webp",
    ],
  ),
  // floor-care
  P(
    "floor-care",
    "Pvc Floor Marking Tapes",
    "₹55 / Roll",
    "A PVC adhesive tape used to mark hazards, divide spaces, create aisles or provide directions in industrial and manufacturing facilities.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Material", v: "PVC" },
      { k: "Color", v: "Multi Colour" },
      { k: "Size", v: "24mm to 1250mm" },
      { k: "Brand", v: "Vardhman" },
    ],
    [
      "48mm",
      "72mm",
    ],
    [
      "Used for lane marking, zoning and 5S workplace organisation",
    ],
    "/product-img/pvc-floor-marking-tapes-250x250.webp",
    [
      "/product-img/pvc-floor-marking-tapes-250x250.webp",
    ],
  ),
  P(
    "floor-care",
    "Double Sided Carpet Tape",
    "₹100 / Piece",
    "A yellow, cloth-backed double-sided carpet tape coated with a strong, long-lasting rubber-solvent adhesive for fixing carpets and mats.",
    [
      { k: "Minimum Order Quantity", v: "1 Piece" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Tape Width", v: "41-60 mm" },
      { k: "Tape Length", v: "10-20 m" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Yellow" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "48mm",
      "72mm",
    ],
    [
      "Excellent adhesion to smooth and rough surfaces",
      "Leaves no residue on temporary installation; water and mildew resistant",
    ],
    undefined,
    undefined,
  ),
  P(
    "floor-care",
    "Anti Skid And Slippery Tapes",
    "₹550 / Roll",
    "A 3M-grade, 36-grit aluminium-oxide anti-skid tape that withstands heavy foot traffic without clogging with mud, oil or grease.",
    [
      { k: "Minimum Order Quantity", v: "1 Roll" },
      { k: "Backing Material", v: "Aluminium Oxide coated with aggressive Solvent Acrylic / Synthetic rubber adhesive" },
      { k: "Color", v: "Mutli" },
      { k: "Brand", v: "3m" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "MOQ", v: "10 Rolls" },
    ],
    [
      "25mm",
      "50mm",
    ],
    [
      "Aggressive adhesive sticks to indoor/outdoor surfaces",
      "Protects against slips on wet pedestrian walkways and garage surfaces",
      "Can be spray painted while retaining its non-slip surface",
    ],
    "/product-img/anti-skid-and-slippery-tapes-250x250.webp",
    [
      "/product-img/anti-skid-and-slippery-tapes-250x250.webp",
    ],
  ),
  // eva-foam
  P(
    "eva-foam",
    "Customized CNC Router Foam",
    "₹100 / sq ft",
    "CNC-routed EVA inserts cut precisely to your product profile for tool cases and kits.",
    [
      { k: "Process", v: "CNC routed" },
    ],
    [
      "Made to order",
    ],
    [
      "Precision-cut to your product profile",
      "Suited to tool cases and protective kits",
    ],
    "/product-img/customized-cnc-cutting-foam.webp",
    [
      "/product-img/customized-cnc-cutting-foam.webp",
    ],
  ),
  P(
    "eva-foam",
    "Die Cut House Of Foam",
    "₹100 / Piece",
    "Die-cut EVA foam components produced to volume for consistent, repeatable parts.",
    [
      { k: "Process", v: "Die-cut" },
    ],
    [
      "Made to order",
    ],
    [
      "Produced to volume for consistent, repeatable parts",
    ],
    "/product-img/Die-Cut-EVA-Foam.jpg",
    [
      "/product-img/Die-Cut-EVA-Foam.jpg",
    ],
  ),
  P(
    "eva-foam",
    "Eva Foam Rolls",
    "₹70 / Meter",
    "EVA foam supplied in rolls for lining, cushioning and fabrication.",
    [
      { k: "Format", v: "Roll" },
    ],
    [
      "Custom width",
    ],
    [
      "Supplied in rolls for lining, cushioning and fabrication",
    ],
    undefined,
    undefined,
  ),
  // ldpe-sheet
  P(
    "ldpe-sheet",
    "Road Construction LDPE Sheet",
    "₹115 / Kg",
    "A black recycled LDPE flat sheet supplied for road construction curing, delivered across India at an affordable price.",
    [
      { k: "Minimum Order Quantity", v: "10 Kg" },
      { k: "Sheet Size", v: "10x8 m" },
      { k: "Form", v: "Flat Sheet" },
      { k: "Color", v: "Black" },
      { k: "Application", v: "Road Construction" },
      { k: "Grade", v: "Recycled" },
      { k: "Printing", v: "Plain" },
      { k: "Material", v: "LDPE" },
    ],
    [
      "Custom width",
    ],
    [
      "Acts as a separation membrane preventing road layers from mixing",
      "Moisture barrier that improves drainage and road longevity",
    ],
    "/product-img/road-construction-ldpe-sheet.webp",
    [
      "/product-img/road-construction-ldpe-sheet.webp",
    ],
  ),
  P(
    "ldpe-sheet",
    "Road Constructions LDPE PQC Sheet",
    "₹115 / Kg",
    "A black recycled LDPE PQC sheet supplied in roll form for pavement quality concrete construction work.",
    [
      { k: "Sheet Size", v: "8x6 m" },
      { k: "Form", v: "Roll" },
      { k: "Color", v: "Black" },
      { k: "Application", v: "Construction" },
      { k: "Grade", v: "Recycled" },
      { k: "Printing", v: "Plain" },
      { k: "Material", v: "LDPE PQC" },
    ],
    [
      "Custom width",
    ],
    [
      "Used for pavement quality concrete (PQC) works and barriers",
    ],
    "/product-img/road-constructions-ldpe-pqc-sheet-250x250.webp",
    [
      "/product-img/road-constructions-ldpe-pqc-sheet-250x250.webp",
    ],
  ),
  // corporate-event-management
  P(
    "corporate-event-management",
    "Catering Table Paper Rolls",
    "₹55 / Kg",
    "70 GSM food-grade catering table paper rolls extensively used in hotels, marriage halls and restaurants, available in various colours and sizes.",
    [
      { k: "Material", v: "Paper" },
      { k: "Roll Width", v: "1200 mm" },
      { k: "Roll Length", v: "50 m" },
      { k: "GSM", v: "70 GSM" },
      { k: "Pattern", v: "Plain" },
      { k: "Usage", v: "Restaurant" },
      { k: "Usage/Application", v: "Wedding events and management" },
      { k: "Color", v: "White And Printed" },
      { k: "Packaging Type", v: "Rolls" },
    ],
    [
      "Custom width",
    ],
    [
      "Light weight, moist-proof with a smooth surface finish",
      "Widely used in hotels, marriage halls and five-star restaurants",
    ],
    "/product-img/catering-table-paper-rolls-250x250.webp",
    [
      "/product-img/catering-table-paper-rolls-250x250.webp",
    ],
  ),
  P(
    "corporate-event-management",
    "Epe Colour Foam Pipe And Tubes",
    "₹17 / Meter",
    "Multi-colour EPE foam tubes/pipes/sleeves mainly used for making event tunnels, plus cushioning and insulation of cylindrical objects.",
    [
      { k: "Inner Diameter", v: "25 x 16" },
      { k: "Brand", v: "Vardhman" },
      { k: "Size/Diameter", v: "1 inch" },
      { k: "Usage/Application", v: "Events" },
      { k: "Material", v: "Expanded Polyethylene (EPE) foam" },
      { k: "Color", v: "Multi Color" },
    ],
    [
      "Custom",
    ],
    [
      "Excellent cushioning and shock absorption for cylindrical objects",
      "Flexible enough to wrap different-diameter items; lightweight and eco-friendly",
      "Used for event tunnels, pipe/rod protection and HVAC insulation",
    ],
    "/product-img/epe-colour-foam-pipe-for-events-250x250.webp",
    [
      "/product-img/epe-colour-foam-pipe-for-events-250x250.webp",
    ],
  ),
  // shoe-material-goods
  P(
    "shoe-material-goods",
    "Polyester Nylon Tapes",
    "₹37 / Roll",
    "Superior quality black & white nylon reinforcement tapes for footwear, offering high resistance against heat and easy removal.",
    [
      { k: "Minimum Order Quantity", v: "100 Roll" },
      { k: "Tape Type", v: "Adhesive" },
      { k: "Tape Width", v: "1 Inch" },
      { k: "Tape Length", v: "20 m" },
      { k: "Brand", v: "Vardhman" },
      { k: "Color", v: "Black & White" },
    ],
    [
      "Custom",
    ],
    [
      "Used in packaging of products with high heat resistance",
      "Easy to remove without damaging the surface",
    ],
    "/product-img/polyester-nylon-tapes-250x250.webp",
    [
      "/product-img/polyester-nylon-tapes-250x250.webp",
    ],
  ),
  P(
    "shoe-material-goods",
    "Eyelet Tape, For Shoe Reinforcement",
    "₹60 / Roll",
    "A grey non-woven fabric adhesive tape used in footwear and leather goods to reinforce throats, eyelets, straps and perforations.",
    [
      { k: "Minimum Order Quantity", v: "100 Roll" },
      { k: "Material", v: "Non Woven" },
      { k: "Color", v: "Gray" },
      { k: "Country of Origin", v: "Made in India" },
    ],
    [
      "Custom",
    ],
    [
      "High tensile strength — withstands significant pulling force",
      "Abrasion resistant and flexible enough to conform to shapes",
    ],
    "/product-img/eyelet-tape-for-shoe-reinforcement-250x250.webp",
    [
      "/product-img/eyelet-tape-for-shoe-reinforcement-250x250.webp",
    ],
  ),
  // construction-material
  P(
    "construction-material",
    "Ldpe Sheets For Road Construction",
    "₹115 / Kg",
    "LDPE sheets offering flexibility, water resistance and cost-effectiveness in road construction, acting as a separation membrane and moisture barrier.",
    [
      { k: "Size(mm)", v: "1 mm" },
      { k: "Type", v: "LDPE" },
      { k: "Size", v: "20 m" },
      { k: "Usage/Application", v: "Construction" },
    ],
    [
      "Custom width",
    ],
    [
      "Acts as a separation membrane preventing road layers from mixing/degrading",
      "Reduces maintenance cost by preventing moisture-related road failure",
      "Recyclable, chemical-resistant and easy to install",
    ],
    "/product-img/ldpe-sheets-for-road-construction-250x250.webp",
    [
      "/product-img/ldpe-sheets-for-road-construction-250x250.webp",
    ],
  ),
  // silicone-sealant
  P(
    "silicone-sealant",
    "260 ml Silicone Sealant",
    "₹50 / Piece",
    "Neutral-cure silicone sealant for weatherproof glazing, sanitary and general sealing.",
    [
      { k: "Volume", v: "260 ml" },
      { k: "Cure", v: "Neutral" },
    ],
    [
      "260ml cartridge",
    ],
    [
      "Suited to weatherproof glazing and sanitary sealing",
    ],
    "/product-img/silicone-sealant-250x250.webp",
    [
      "/product-img/silicone-sealant-250x250.webp",
    ],
  ),
];

// helpers
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getProduct = (cat: string, slug: string) =>
  products.find((p) => p.category === cat && p.slug === slug);
export const productsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);
export const relatedProducts = (cat: string, slug: string, n = 3) =>
  products.filter((p) => p.category === cat && p.slug !== slug).slice(0, n);
export const featuredProducts = (n = 6) => {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const c of categories) {
    const p = products.find((x) => x.category === c.slug && !seen.has(x.slug));
    if (p) {
      seen.add(p.slug);
      out.push(p);
    }
    if (out.length >= n) break;
  }
  return out;
};