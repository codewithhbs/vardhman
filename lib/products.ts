export type Spec = { k: string; v: string };
export type FAQ = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  blurb: string;
  specs: Spec[];
  sizes: string[];
  price?: string;      // approx. price as listed on the catalogue
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
    slug: 'packaging-tape',
    name: 'Packaging Tape',
    icon: 'Package',
    tagline: 'High-tack BOPP & carton sealing tapes',
    description:
      'Our BOPP self-adhesive packaging tapes deliver dependable carton sealing performance for high-speed dispatch lines. Manufactured from premium bi-axially oriented polypropylene film with solvent-free acrylic or hot-melt adhesive, each roll offers consistent tack, clean unwind and strong holding power across cartons, cases and export consignments.',
    image: '/product-img/Packaging-Tape.jpg',
    features: ['Strong instant tack and shear holding', 'Noise-controlled clean unwind', 'Solvent-free, odour-free acrylic adhesive', 'Available printed for brand promotion'],
    applications: ['Carton sealing', 'Export packaging', 'E-commerce dispatch', 'Bundling & strapping'],
    industries: ['FMCG', 'E-commerce & Retail', 'Logistics', 'Manufacturing'],
    faqs: [{ q: 'What widths are available?', a: 'Standard widths are 24mm, 48mm and 72mm, with custom slitting from 12mm upwards on request.' }, { q: 'Can tapes be printed with our logo?', a: 'Yes. We supply single and multi-colour printed BOPP tapes with your brand name, logo or handling instructions.' }],
  },
  {
    slug: 'tape',
    name: 'Adhesive & Double-Sided Tape',
    icon: 'Layers',
    tagline: 'Single & double-sided bonding tapes',
    description:
      'A versatile range of transparent, polyester and double-sided adhesive tapes engineered for mounting, splicing and bonding. From clear stationery tapes to high-performance double-sided polyester and 3M-grade tissue tapes, each product is coated with pressure-sensitive adhesive for reliable, residue-free adhesion.',
    image: '/product-img/double-category.png',
    features: ['Pressure-sensitive high-bond adhesive', 'Clear, low-profile finish', 'Excellent age and temperature stability', 'Die-cuttable to custom shapes'],
    applications: ['Mounting & bonding', 'Splicing', 'POS display assembly', 'Print finishing'],
    industries: ['Printing & Packaging', 'Retail Display', 'Electronics', 'Signage'],
    faqs: [{ q: 'Do double-sided tapes leave residue?', a: 'No. Our polyester and tissue-carrier tapes are designed for clean removal on most substrates.' }],
  },
  {
    slug: 'label-printing-tape',
    name: 'Label & Flexo Printing Tape',
    icon: 'Printer',
    tagline: 'Plate-mounting & printing consumables',
    description:
      'Precision double-sided cotton flexo printing tapes, clear polyester tapes, release liners and tissue tapes engineered for the label, flexo and offset printing industries. These plate-mounting and converting consumables provide uniform cushioning, accurate registration and clean release for repeat print jobs.',
    image: '/product-img/flexo-printing-label.jpg',
    features: ['Uniform foam cushioning for print clarity', 'Consistent thickness tolerance', 'Clean plate release without ghosting', 'Available in soft / medium / hard densities'],
    applications: ['Flexo plate mounting', 'Label converting', 'Sleeve building', 'Paper application'],
    industries: ['Label Printing', 'Flexible Packaging', 'Corrugation', 'Publishing'],
    faqs: [{ q: 'Which density should we choose?', a: 'Soft cushions solids, medium is an all-round choice, and hard suits fine line and text work. Our team can advise per plate type.' }],
  },
  {
    slug: 'electrical-tapes',
    name: 'Electrical Tapes',
    icon: 'Zap',
    tagline: 'Insulation & harness tapes',
    description:
      'Flame-retardant PVC, polyester, Kapton, Teflon and cotton cloth electrical tapes for insulation, harnessing and high-temperature applications. Manufactured to withstand demanding electrical loads with excellent dielectric strength and abrasion resistance.',
    image: '/product-img/Electrical-tape_black.jpg',
    features: ['High dielectric / insulation strength', 'Flame-retardant PVC options', 'Conformable and stretchable', 'Heat-resistant polyester & polyimide grades'],
    applications: ['Wire insulation', 'Cable harnessing', 'Coil wrapping', 'High-temp masking'],
    industries: ['Electrical', 'Automotive', 'Appliances', 'Panel Manufacturing'],
    faqs: [{ q: 'Are these tapes flame-retardant?', a: 'Yes, our PVC insulation tapes are formulated to be self-extinguishing and meet common electrical safety standards.' }],
  },
  {
    slug: 'insulation-waterproof-tapes',
    name: 'Insulation & Waterproof Tapes',
    icon: 'Droplets',
    tagline: 'Butyl, duct & foil sealing tapes',
    description:
      'A robust range of waterproof butyl rubber tapes, aluminium foil tapes and cloth duct tapes for sealing, insulation and moisture protection. Ideal for HVAC, roofing, ducting and industrial repair where a permanent watertight bond is essential.',
    image: '/product-img/insulation-waterproof-trapes.jpg',
    features: ['Fully waterproof and airtight seal', 'Superior conformability to irregular surfaces', 'UV and weather resistant', 'Reflective aluminium foil grades'],
    applications: ['HVAC duct sealing', 'Roof & terrace waterproofing', 'Pipe insulation', 'Industrial repair'],
    industries: ['HVAC', 'Construction', 'Infrastructure', 'Maintenance'],
    faqs: [{ q: 'Can duct tape be used outdoors?', a: 'Our waterproof butyl and foil grades are UV-stabilised for exterior and long-term sealing applications.' }],
  },
  {
    slug: 'architecture-glass-tapes',
    name: 'Architecture & Glass Tapes',
    icon: 'Building2',
    tagline: 'Surface protection, glazing & sealants',
    description:
      'Specialised surface protection films, colour masking tapes, VHB acrylic foam tapes, spacer tapes, backer rods and structural glazing sealants for the architecture, glazing and facade industries. Engineered to protect finished surfaces and support structural glazing joints.',
    image: '/product-img/architecture-glass-tapes.jpg',
    features: ['Residue-free surface protection', 'Clean-edge colour masking', 'VHB acrylic foam bonding tapes', 'Structural glazing sealants & spacers'],
    applications: ['Glass & panel protection', 'Facade masking', 'Structural glazing joints', 'Aluminium fabrication'],
    industries: ['Architecture', 'Glass Processing', 'Facade & Glazing', 'Aluminium'],
    faqs: [{ q: 'Will protection tape damage glass or panels?', a: 'No. Our surface protection tapes peel away cleanly without adhesive transfer within the recommended service window.' }],
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
    slug: 'expanded-polyethylene-foam',
    name: 'Expanded Polyethylene (EPE) Foam',
    icon: 'Box',
    tagline: 'Protective foam profiles & tubes',
    description:
      'Lightweight, resilient EPE foam rods, pipe insulation tubes, C-sections, U-profiles and L-sections engineered for edge protection, cushioning and thermal insulation. Closed-cell structure absorbs shock and vibration while remaining moisture-resistant and recyclable.',
    image: '/product-img/expanded-polyethylene.jpg',
    features: ['Excellent shock and vibration absorption', 'Thermal insulation for pipes', 'Custom C / U / L edge profiles', 'Non-abrasive, surface-safe'],
    applications: ['Edge & corner protection', 'Pipe insulation', 'Furniture packaging', 'Appliance cushioning'],
    industries: ['Packaging', 'White Goods', 'Furniture', 'Logistics'],
    faqs: [{ q: 'Can EPE profiles be customised?', a: 'Yes, we extrude and cut C-sections, U-profiles, L-sections and rods to your dimensions and colours.' }],
  },
  {
    slug: 'eva-foam',
    name: 'EVA Foam',
    icon: 'Layers3',
    tagline: 'Die-cut & CNC-routed EVA sheets',
    description:
      'Premium EVA foam sheets, rolls and die-cut components with fine cell structure and consistent density. Available as CNC-routed inserts, gaskets and protective packaging for tool cases, electronics and precision products.',
    image: '/product-img/EVA-foam.jpeg',
    features: ['Fine, uniform closed-cell structure', 'CNC routing and die-cutting', 'High resilience and cushioning', 'Available in multiple colours & densities'],
    applications: ['Tool case inserts', 'Protective packaging', 'Gaskets & seals', 'Sports & footwear'],
    industries: ['Electronics', 'Automotive', 'Footwear', 'Sports Goods'],
    faqs: [{ q: 'Do you make custom CNC foam inserts?', a: 'Yes, share your product dimensions or drawing and we will router-cut precise foam inserts.' }],
  },
  {
    slug: 'automotive-tapes',
    name: 'Automotive Tapes',
    icon: 'Car',
    tagline: 'PE foam & panel bonding tapes',
    description:
      'High-performance PE foam and acrylic panel-bonding tapes for automotive trim, emblem mounting and weather sealing. Designed to bond dissimilar surfaces with vibration resistance and long-term durability in demanding under-hood and exterior conditions.',
    image: '/product-img/automotive-tapes.jpg',
    features: ['Strong structural bonding', 'Vibration and temperature resistant', 'Weatherproof PE foam carrier', 'Bonds dissimilar substrates'],
    applications: ['Emblem & trim mounting', 'Panel bonding', 'Weatherstrip sealing', 'Badge fixing'],
    industries: ['Automotive OEM', 'Auto Aftermarket', 'Two-Wheeler', 'Commercial Vehicles'],
    faqs: [{ q: 'Will these tapes hold in high heat?', a: 'Yes, our acrylic foam tapes retain bond strength across a wide automotive temperature range.' }],
  },
  {
    slug: 'roads-construction',
    name: 'Road & Construction Products',
    icon: 'TrafficCone',
    tagline: 'Reflective, barricade & safety tapes',
    description:
      'Reflective fabric tapes, retro-reflective safety tapes, caution barricade tapes, underground warning tapes and dowel bar caps for road construction and site safety. Engineered for high visibility, weather durability and compliance with site safety practices.',
    image: '/product-img/silver-grey-fabric-reflective-tape.webp',
    features: ['High-visibility retro-reflectivity', 'Weather and abrasion resistant', 'Bright caution / barricade grades', 'Underground warning & dowel accessories'],
    applications: ['Road safety marking', 'Site barricading', 'Utility warning', 'Hazard identification'],
    industries: ['Road Construction', 'Civil Infrastructure', 'Municipal', 'Safety'],
    faqs: [{ q: 'Are reflective tapes suitable for outdoor road use?', a: 'Yes, our retro-reflective and fabric reflective tapes are built for long outdoor exposure.' }],
  },
  {
    slug: 'floor-care',
    name: 'Floor Care & Marking',
    icon: 'Grid3x3',
    tagline: 'Floor marking & anti-skid tapes',
    description:
      'Durable PVC floor marking tapes, double-sided carpet tapes and anti-skid safety tapes for warehouses, factories and public spaces. Bright, hard-wearing films define lanes, zones and hazards while anti-slip grades improve underfoot safety.',
    image: '/product-img/floor-care-marking.jpg',
    features: ['Abrasion-resistant PVC film', 'Bright, long-lasting colours', 'Anti-skid textured grades', 'Strong floor-grip adhesive'],
    applications: ['Lane & zone marking', 'Carpet fixing', 'Stair & ramp safety', '5S workplace organisation'],
    industries: ['Warehousing', 'Manufacturing', 'Retail', 'Hospitality'],
    faqs: [{ q: 'Can floor tape handle forklift traffic?', a: 'Our heavy-duty PVC marking tapes are formulated to withstand foot and light vehicle traffic.' }],
  },
  {
    slug: 'ldpe-sheet',
    name: 'LDPE Sheets',
    icon: 'Sheet',
    tagline: 'Curing & protection sheeting',
    description:
      'LDPE and PQC sheets for road construction curing, moisture barriers and surface protection. Supplied in a range of gauges and widths to suit civil, agricultural and packaging protection needs.',
    image: '/product-img/black-ldpe-polythene-sheet.jpeg',
    features: ['Consistent gauge and clarity', 'Effective moisture barrier', 'Tear and puncture resistant', 'Custom widths and thickness'],
    applications: ['Concrete curing', 'Ground / moisture barrier', 'Surface covering', 'Protective sheeting'],
    industries: ['Road Construction', 'Agriculture', 'Civil', 'Packaging'],
    faqs: [{ q: 'What thickness do you offer?', a: 'We supply LDPE sheeting in multiple micron gauges; share your application and we will recommend the right grade.' }],
  },
  {
    slug: 'silicone-sealant',
    name: 'Silicone Sealant',
    icon: 'Droplet',
    tagline: 'Weatherproof & structural glazing sealants',
    description:
      'Neutral-cure and structural silicone sealants for weatherproofing, structural glazing and general construction sealing. The range includes trusted branded grades delivering strong adhesion, UV stability and long service life across facades, sanitary and industrial joints.',
    image: '/product-img/silicone-sealant-250x250.webp',
    features: ['Neutral-cure, low-odour formulation', 'Excellent weather & UV resistance', 'Strong adhesion to glass, metal & masonry', 'Structural glazing grades available'],
    applications: ['Structural glazing', 'Weather sealing', 'Sanitary sealing', 'Facade joints'],
    industries: ['Architecture', 'Glazing & Facade', 'Construction', 'Sanitary'],
    faqs: [{ q: 'Do you supply branded structural sealants?', a: 'Yes, we supply neutral and structural silicone sealants including recognised branded grades for glazing applications.' }],
  },
  {
    slug: 'shoe-material-goods',
    name: 'Shoe Material & Goods',
    icon: 'Footprints',
    tagline: 'Footwear reinforcement tapes',
    description:
      'Specialised tapes and reinforcement materials for the footwear manufacturing industry, including polyester nylon tapes and eyelet reinforcement tapes that add strength, shape retention and durability to shoe construction.',
    image: '/product-img/Polyester-Nylon-Tape.webp',
    features: ['High-tensile reinforcement', 'Shape retention for uppers', 'Eyelet & seam strengthening', 'Consistent width and quality'],
    applications: ['Shoe upper reinforcement', 'Eyelet strengthening', 'Seam binding', 'Edge finishing'],
    industries: ['Footwear', 'Leather Goods', 'Sports Shoes', 'Manufacturing'],
    faqs: [{ q: 'Can these tapes be supplied in custom widths?', a: 'Yes, our footwear reinforcement tapes are available in custom widths to suit your production line.' }],
  },
  {
    slug: 'corporate-event-management',
    name: 'Corporate & Event Supplies',
    icon: 'PartyPopper',
    tagline: 'Catering rolls & event foam goods',
    description:
      'Consumables and foam goods for events, catering and corporate functions, including food-grade table paper rolls and coloured EPE foam pipes and tubes for decor, protection and presentation.',
    image: '/product-img/catering-table-paper-rolls-250x250.webp',
    features: ['Food-grade catering paper rolls', 'Coloured EPE foam pipes & tubes', 'Clean, presentable finish', 'Bulk supply for events'],
    applications: ['Event catering', 'Table covering', 'Decor & protection', 'Corporate functions'],
    industries: ['Events & Hospitality', 'Catering', 'Corporate', 'Decor'],
    faqs: [{ q: 'Are the paper rolls food-safe?', a: 'Yes, our catering table paper rolls are food-grade and suitable for events and hospitality use.' }],
  },
  {
    slug: 'construction-material',
    name: 'Construction Material',
    icon: 'HardHat',
    tagline: 'LDPE sheeting for civil works',
    description:
      'Construction-grade LDPE sheeting for road construction, curing and moisture-barrier applications, supplied in gauges and widths suited to civil and infrastructure projects.',
    image: '/product-img/road-construction-ldpe-sheet.webp',
    features: ['Durable civil-grade sheeting', 'Effective curing moisture retention', 'Tear and puncture resistant', 'Custom gauges and widths'],
    applications: ['Road construction curing', 'Moisture barrier', 'Surface protection', 'Site covering'],
    industries: ['Road Construction', 'Civil Infrastructure', 'Construction', 'Municipal'],
    faqs: [{ q: 'What is LDPE curing sheet used for?', a: 'It retains moisture during concrete curing to ensure proper hydration and strength development.' }],
  },
];

const P = (
  category: string,
  name: string,
  price: string,
  blurb: string,
  specs: Spec[],
  sizes: string[],
  image?: string,
  images?: string[]
): Product => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return { slug, name, category, blurb, specs, sizes, price, image: image ?? `/product-img/${slug}.jpg`, images };
};

export const products: Product[] = [
  // architecture-glass-tapes
  P('architecture-glass-tapes', 'Transparent Surface Protection Tapes', '₹200 / Roll', 'Residue-free protective film that shields glass, panels and finished surfaces during transit and fit-out.', [{ k: 'Type', v: 'Protection film' }, { k: 'Removal', v: 'Clean peel' }], ['100mm', '300mm', '500mm'], '/product-img/transparent-surface-protection-tape.jpeg', ['/product-img/transparent-surface-protection-tape.jpeg']),
  P('architecture-glass-tapes', 'Colour Masking Tape', '₹15 / Roll', 'Clean-edge colour masking tape for painting, glazing and facade finishing.', [{ k: 'Type', v: 'Masking' }, { k: 'Edge', v: 'Sharp line' }], ['18mm', '24mm', '48mm']),
  P('architecture-glass-tapes', '60 mm EPE Foam Backer Rod', '₹2 / Meter', 'Closed-cell 60mm backer rod for controlling sealant depth in wide expansion joints.', [{ k: 'Diameter', v: '60mm' }, { k: 'Cell', v: 'Closed' }], ['60mm'], '/product-img/supreme-backer-rod-250x250.webp', ['/product-img/supreme-backer-rod-250x250.webp']),
  P('architecture-glass-tapes', 'Red Acrylic Foam Tape', '₹25 / Roll', 'Red-liner high-bond acrylic foam tape for strong permanent mounting on glass and metal.', [{ k: 'Type', v: 'Acrylic foam' }, { k: 'Liner', v: 'Red' }], ['12mm', '18mm', '24mm'], '/product-img/acrylic-foam-tapes-250x250.webp', ['/product-img/acrylic-foam-tapes-250x250.webp']),
  P('architecture-glass-tapes', '3m vhb Acrylic Foam Transparent Tape', '₹150 / Roll', 'Transparent VHB-grade acrylic foam tape for high-strength, invisible structural bonding.', [{ k: 'Grade', v: 'VHB' }, { k: 'Finish', v: 'Transparent' }], ['12mm', '19mm', '25mm'], '/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp', ['/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp']),
  P('architecture-glass-tapes', 'Debonding Strip Tape', '₹60 / Piece', 'Debonding strip tape used in structural glazing to separate sealant from incompatible surfaces.', [{ k: 'Use', v: 'Glazing separation' }], ['Custom'], '/product-img/debonding-strip-tape-250x250.webp', ['/product-img/debonding-strip-tape-250x250.webp']),
  P('architecture-glass-tapes', 'Transparent Double Sided Acrylic Foam Tapes', '₹144 / Roll', 'Clear double-sided acrylic foam tape for bonding glass, acrylic and display panels.', [{ k: 'Type', v: 'Acrylic foam' }, { k: 'Sides', v: 'Double' }], ['12mm', '18mm', '24mm'], '/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp', ['/product-img/3m-vhb-acrylic-foam-transparent-tape-250x250.webp']),
  P('architecture-glass-tapes', 'Double Sided & Single Sided Foam Tapes', '₹20 / Piece', 'Versatile single and double-sided foam tapes for gap filling, sealing and mounting.', [{ k: 'Carrier', v: 'Foam' }, { k: 'Sides', v: 'Single / Double' }], ['9mm', '12mm', '19mm'], '/product-img/double-sided-single-sided-foam.webp', ['/product-img/double-sided-single-sided-foam.webp']),
  P('architecture-glass-tapes', 'Paper Masking Tape', '₹13 / Piece', 'General-purpose paper masking tape for painting, labelling and light holding.', [{ k: 'Carrier', v: 'Paper' }, { k: 'Tack', v: 'Medium' }], ['24mm', '48mm'], '/product-img/paper-masking-tape.webp', ['/product-img/paper-masking-tape.webp']),
  P('architecture-glass-tapes', 'Dow Corning 795 Silicone Sealant', '₹500 / Piece', 'Dow Corning 795 structural glazing and weatherproofing silicone sealant for facades.', [{ k: 'Brand', v: 'Dow Corning' }, { k: 'Grade', v: '795 Structural' }], ['Cartridge'], '/product-img/dow-corning-795-silicone-sealant-250x250.webp', ['/product-img/dow-corning-795-silicone-sealant-250x250.webp']),
  P('architecture-glass-tapes', 'Dow Corning 991 Silicone Sealants', '₹725 / Piece', 'Dow Corning 991 high-performance structural glazing silicone sealant.', [{ k: 'Brand', v: 'Dow Corning' }, { k: 'Grade', v: '991 Structural' }], ['Cartridge'], '/product-img/dow-corning-991-silicone-sealants-250x250.webp', ['/product-img/dow-corning-991-silicone-sealants-250x250.webp']),
  P('architecture-glass-tapes', 'Dow Corning 789 Silicone Sealant weather Proofng', '₹300 / Unit', 'Dow Corning 789 weatherproofing silicone sealant for durable exterior joints.', [{ k: 'Brand', v: 'Dow Corning' }, { k: 'Grade', v: '789 Weatherproofing' }], ['Cartridge'], '/product-img/dow-corning-789-silicone-sealant-weather-proofng-250x250.webp', ['/product-img/dow-corning-789-silicone-sealant-weather-proofng-250x250.webp']),
  P('architecture-glass-tapes', 'Single Sided and Double Sided Eva Foam Tapes', '₹50 / Piece', 'EVA foam tapes in single and double-sided formats for cushioning, sealing and mounting.', [{ k: 'Carrier', v: 'EVA foam' }, { k: 'Sides', v: 'Single / Double' }], ['9mm', '12mm', '19mm'], '/product-img/single-sided-and-double-sided-eva-foam-tapes-250x250.webp', ['/product-img/single-sided-and-double-sided-eva-foam-tapes-250x250.webp']),
  P('architecture-glass-tapes', '3m Curtain Wall Bonding Tapes', '₹100 / Roll', 'Curtain wall bonding tape for secure, weather-resistant facade panel assembly.', [{ k: 'Use', v: 'Curtain wall' }, { k: 'Type', v: 'Bonding' }], ['12mm', '19mm'], '/product-img/curtain-wall-tapes-250x250.webp', ['/product-img/curtain-wall-tapes-250x250.webp']),
  P('architecture-glass-tapes', 'Spacer Tape', '₹50 / Piece', 'Structural glazing spacer tape providing consistent joint depth and glass support.', [{ k: 'Use', v: 'Structural glazing' }], ['6mm', '9mm', '12mm'], '/product-img/spacer-tape-250x250.webp', ['/product-img/spacer-tape-250x250.webp']),
  P('architecture-glass-tapes', 'Norton Spacer Tape', '₹60 / Piece', 'Norton-grade structural glazing spacer tape for precise joint spacing and support.', [{ k: 'Brand', v: 'Norton' }, { k: 'Use', v: 'Glazing spacer' }], ['6mm', '9mm', '12mm'], '/product-img/norton-spacer-tape-250x250.webp', ['/product-img/norton-spacer-tape-250x250.webp']),
  // tape
  P('tape', '3 Inch Transparent Tapes', '₹1,000 / Box', 'Wide transparent adhesive tape for bundling, surface covering and general sealing tasks.', [{ k: 'Width', v: '3 inch' }, { k: 'Clarity', v: 'Crystal clear' }], ['72mm'], '/product-img/3-inch-transparent.jpg', ['/product-img/3-inch-transparent.jpg']),
  P('tape', 'Double Sided Polyester Tape', '₹100 / Piece', 'High-bond double-sided polyester tape for mounting, splicing and precision assembly with clean removal.', [{ k: 'Carrier', v: 'Polyester' }, { k: 'Adhesive', v: 'Both sides' }], ['6mm', '12mm', '24mm'], '/product-img/double-sided.jpg', ['/product-img/double-sided.jpg']),
  P('tape', 'Double Sided Adhesive Tape', '₹50 / Piece', 'General-purpose double-sided adhesive tape for mounting and bonding tasks.', [{ k: 'Sides', v: 'Double' }, { k: 'Tack', v: 'High' }], ['12mm', '18mm', '24mm'], '/product-img/acrylic-foam-tapes-250x250.webp', ['/product-img/acrylic-foam-tapes-250x250.webp']),
  P('tape', '3m Double Sided Adhesive Tapes', '₹90 / Piece', '3M-grade double-sided adhesive tape for demanding mounting applications.', [{ k: 'Grade', v: 'High-bond' }, { k: 'Sides', v: 'Double' }], ['12mm', '24mm'], '/product-img/3M-grade-double-sided-adhesive-tape.jpg', ['/product-img/3M-grade-double-sided-adhesive-tape.jpg']),
  P('tape', 'Adhesive Double Sided Tape', '₹100 / Piece', 'Strong adhesive double-sided tape for reliable, residue-free bonding.', [{ k: 'Sides', v: 'Double' }, { k: 'Removal', v: 'Clean' }], ['12mm', '24mm'], '/product-img/double-sided-single-sided-foam-tapes-250x250.webp', ['/product-img/double-sided-single-sided-foam-tapes-250x250.webp']),
  P('tape', '3m Double Sided Tape', '₹200 / Piece', 'Premium 3M-grade double-sided tape for structural mounting.', [{ k: 'Grade', v: 'Premium' }, { k: 'Temp', v: 'Wide range' }], ['12mm', '24mm'], '/product-img/3m-pe-foam-tapes-250x250.webp', ['/product-img/3m-pe-foam-tapes-250x250.webp']),
  P('tape', 'Double Sided Tissue Tapes', '₹50 / Piece', 'Economical tissue-carrier double-sided tape ideal for POS displays and print finishing.', [{ k: 'Carrier', v: 'Tissue' }, { k: 'Tack', v: 'High' }], ['12mm', '18mm', '24mm'], '/product-img/double-sided-tissue-tape-with-solvent-acrylic-adhesive-jpg-250x250.webp', ['/product-img/double-sided-tissue-tape-with-solvent-acrylic-adhesive-jpg-250x250.webp']),
  P('tape', 'Double Sided Tape', '₹100 / Piece', 'Versatile double-sided tape for mounting, splicing and assembly.', [{ k: 'Sides', v: 'Double' }], ['12mm', '24mm'], '/product-img/double-sided.jpg', ['/product-img/double-sided.jpg']),
  P('tape', 'Double Sided Adhesive Tissue Tapes', '₹100 / Roll', 'Double-sided adhesive tissue tape for card mounting and light bonding.', [{ k: 'Carrier', v: 'Tissue' }, { k: 'Sides', v: 'Double' }], ['12mm', '18mm'], '/product-img/3m-tissue-tapes-250x250.webp', ['/product-img/3m-tissue-tapes-250x250.webp']),
  P('tape', 'Adhesive Double Sided Foam Tape', '₹25 / Piece', 'Cushioning double-sided foam tape for gap-filling and mounting on uneven surfaces.', [{ k: 'Carrier', v: 'Foam' }, { k: 'Sides', v: 'Double' }], ['9mm', '12mm', '19mm'], '/product-img/1000251388-jpg-250x250.webp', ['/product-img/1000251388-jpg-250x250.webp']),
  P('tape', '3m Adhesive Double Sided Tissue Tapes', '₹170 / Piece', '3M-grade double-sided tissue tape for high-performance mounting and finishing.', [{ k: 'Grade', v: 'Premium' }, { k: 'Carrier', v: 'Tissue' }], ['12mm', '18mm'], '/product-img/3m-adhesive-tissue-tapes-250x250.webp', ['/product-img/3m-adhesive-tissue-tapes-250x250.webp']),
  P('tape', 'Transparent Cello Tape', '₹1,800 / Box', 'Clear cello tape for everyday office, retail and light packaging use.', [{ k: 'Clarity', v: 'High' }, { k: 'Core', v: '1 inch' }], ['12mm', '18mm', '24mm'], '/product-img/bopp-tape-250x250.webp', ['/product-img/bopp-tape-250x250.webp']),
  P('tape', 'Marking Tapes', '₹12.5 / Box', 'Coloured marking tape for coding, identification and general marking.', [{ k: 'Type', v: 'Marking' }, { k: 'Colours', v: 'Multiple' }], ['18mm', '24mm'], '/product-img/masking-tape-250x250.webp', ['/product-img/masking-tape-250x250.webp']),
  P('tape', 'ABRO Masking Tapes', '₹10 / Roll', 'ABRO-brand general-purpose masking tape for painting and holding.', [{ k: 'Brand', v: 'ABRO' }, { k: 'Carrier', v: 'Paper' }], ['18mm', '24mm', '48mm'], '/product-img/anti-skid-and-slippery-tapes-250x250.webp', ['/product-img/anti-skid-and-slippery-tapes-250x250.webp']),
  P('tape', 'Double Sided Foam Tape', '₹40 / Roll', 'Double-sided foam tape for mounting signs, panels and fixtures on uneven surfaces.', [{ k: 'Carrier', v: 'Foam' }, { k: 'Sides', v: 'Double' }], ['12mm', '19mm', '24mm'], '/product-img/double-sided-single-sided-foam-tapes.webp', ['/product-img/double-sided-single-sided-foam-tapes.webp']),
  // label-printing-tape
  P('label-printing-tape', 'Double Sided Cotton Flexo Printing Tape', '₹75 / Roll', 'Cushioned plate-mounting tape delivering crisp registration and clean plate release for flexo presses.', [{ k: 'Density', v: 'Soft / Med / Hard' }, { k: 'Carrier', v: 'Foam' }], ['480mm roll'], '/product-img/double-sided-gum-cotton-tape-flexo-printing.jpg', ['/product-img/double-sided-gum-cotton-tape-flexo-printing.jpg']),
  P('label-printing-tape', 'Double Sided Clear Polyester Tapes', '₹140 / Piece', 'Thin, high-strength clear polyester tape for label converting and splicing.', [{ k: 'Carrier', v: 'Polyester' }, { k: 'Finish', v: 'Clear' }], ['9mm', '12mm'], '/product-img/double-sided-clear-polyester-tapes.png', ['/product-img/double-sided-clear-polyester-tapes.png']),
  P('label-printing-tape', 'Double Sided Tissue Tapes', '₹60 / Roll', 'Tissue-carrier double-sided tape for label mounting and print finishing.', [{ k: 'Carrier', v: 'Tissue' }], ['12mm', '18mm'], '/product-img/tissue-tapes-250x250.webp', ['/product-img/tissue-tapes-250x250.webp']),
  P('label-printing-tape', 'Paper Application Tape', '₹55 / Piece', 'Medium-tack paper transfer tape for graphics, labels and signage application.', [{ k: 'Carrier', v: 'Paper' }, { k: 'Tack', v: 'Medium' }], ['100mm', '300mm'], '/product-img/paper-application-tape.png', ['/product-img/paper-application-tape.png']),
  P('label-printing-tape', 'Red Polyester Tapes', '₹144 / Roll', 'Red polyester splicing tape with high tensile strength for print and converting lines.', [{ k: 'Carrier', v: 'Polyester' }, { k: 'Colour', v: 'Red' }], ['9mm', '12mm', '19mm'], '/product-img/red-polyester-tapes-250x250.webp', ['/product-img/red-polyester-tapes-250x250.webp']),
  P('label-printing-tape', 'Red Pe Release Liner', '₹120 / Kg', 'Red PE-coated release liner for adhesive tape and label manufacturing.', [{ k: 'Type', v: 'Release liner' }, { k: 'Coating', v: 'PE' }], ['Custom'], '/product-img/red-pe-release-liner-250x250.webp', ['/product-img/red-pe-release-liner-250x250.webp']),
  P('label-printing-tape', 'Silicone Coated Release Liner Paper', '₹120 / Kg', 'Silicone-coated release liner paper for label stock and self-adhesive products.', [{ k: 'Coating', v: 'Silicone' }, { k: 'Base', v: 'Paper' }], ['Custom'], '/product-img/silicone-coated-paper-for-stickers-250x250.webp', ['/product-img/silicone-coated-paper-for-stickers-250x250.webp']),
  P('label-printing-tape', 'Double Sided Paper Polyester Tapes', '₹144 / Piece', 'Double-sided paper-polyester tape for splicing and converting applications.', [{ k: 'Carrier', v: 'Paper / Polyester' }], ['12mm', '19mm'], '/product-img/double-sided-paper-polyester-tapes-250x250.webp', ['/product-img/double-sided-paper-polyester-tapes-250x250.webp']),
  P('label-printing-tape', '3m Double Sided Tissue Tape', '₹220 / Piece', '3M-grade double-sided tissue tape for premium label and print mounting.', [{ k: 'Grade', v: 'Premium' }, { k: 'Carrier', v: 'Tissue' }], ['12mm', '18mm'], '/product-img/3m-tissue-tapes-250x250.webp', ['/product-img/3m-tissue-tapes-250x250.webp']),
  P('label-printing-tape', 'Single Sided Pe Coated Paper', '₹100 / Kg', 'Single-sided PE-coated paper for release and packaging applications.', [{ k: 'Coating', v: 'PE' }, { k: 'Sides', v: 'Single' }], ['Custom'], '/product-img/single-sided-pe-coated-paper-250x250.webp', ['/product-img/single-sided-pe-coated-paper-250x250.webp']),
  P('label-printing-tape', 'Gum Transfer Paper Tape', '₹100 / Piece', 'Adhesive transfer paper tape for mounting graphics, labels and lightweight materials.', [{ k: 'Type', v: 'Transfer tape' }, { k: 'Carrier', v: 'Paper' }], ['100mm', '300mm'], '/product-img/gum-transfer-paper-tape-250x250.webp', ['/product-img/gum-transfer-paper-tape-250x250.webp']),
  P('label-printing-tape', 'Hair Wig Tape', '₹30 / Piece', 'Skin-safe double-sided tape for hair systems, wigs and cosmetic fixing.', [{ k: 'Use', v: 'Wig / hair system' }, { k: 'Sides', v: 'Double' }], ['Custom shapes'], '/product-img/hair-wig-tape-250x250.webp', ['/product-img/hair-wig-tape-250x250.webp']),
  P('label-printing-tape', 'Vinyl Film Roll', '₹5,000 / Roll', 'Printable vinyl film roll for signage, labels and graphic applications.', [{ k: 'Material', v: 'Vinyl' }, { k: 'Use', v: 'Printing / signage' }], ['Custom width'], '/product-img/vinyl-film-roll-250x250.webp', ['/product-img/vinyl-film-roll-250x250.webp']),
  P('label-printing-tape', 'Hdpe Pe Silicone Coated Release Liner', '₹120 / Kg', 'HDPE/PE silicone-coated release liner for high-performance adhesive products.', [{ k: 'Coating', v: 'Silicone' }, { k: 'Base', v: 'HDPE / PE' }], ['Custom'], '/product-img/ldpe-silicone-coated-release-liner-250x250.webp', ['/product-img/ldpe-silicone-coated-release-liner-250x250.webp']),
  // electrical-tapes
  P('electrical-tapes', 'Polyester Electric Tapes', '₹50 / Roll', 'Heat-resistant polyester insulation tape for coil wrapping and high-temperature electrical use.', [{ k: 'Material', v: 'Polyester' }, { k: 'Class', v: 'Insulation' }], ['15mm', '25mm'], '/product-img/polyester-electric-tapes.webp', ['/product-img/polyester-electric-tapes.webp']),
  P('electrical-tapes', 'Cotton Cloth Tape', '₹150 / Roll', 'Durable cotton cloth tape for harnessing, wrapping and abrasion protection.', [{ k: 'Material', v: 'Cotton cloth' }], ['19mm', '25mm']),
  P('electrical-tapes', 'HT Insulation Tape', '₹30 / Roll', 'High-temperature insulation tape for demanding electrical and coil applications.', [{ k: 'Rating', v: 'High-temp' }], ['25mm']),
  P('electrical-tapes', 'Non Adhesive P.v.c Tape', '₹15 / Roll', 'Non-adhesive PVC tape for cable wrapping, bundling and colour coding.', [{ k: 'Material', v: 'PVC' }, { k: 'Adhesive', v: 'None' }], ['18mm', '25mm'], '/product-img/non-adhesive-p-v-c-tape-250x250.webp', ['/product-img/non-adhesive-p-v-c-tape-250x250.webp']),
  P('electrical-tapes', 'Steelgrip Electrical Insulation Tapes', '₹40 / Piece', 'Steelgrip-brand flame-retardant PVC electrical insulation tape.', [{ k: 'Brand', v: 'Steelgrip' }, { k: 'Material', v: 'PVC' }], ['18mm'], '/product-img/steelgrip-electrical-insulation-tapes-250x250.webp', ['/product-img/steelgrip-electrical-insulation-tapes-250x250.webp']),
  P('electrical-tapes', 'PVC Film (Tape Grade / Electric Insulation)', '₹20 / sq ft', 'Tape-grade PVC film for electrical insulation and tape manufacturing.', [{ k: 'Material', v: 'PVC film' }, { k: 'Grade', v: 'Tape / Insulation' }], ['Custom'], '/product-img/pvc-film-tape-grade-electric-insulation-250x250.webp', ['/product-img/pvc-film-tape-grade-electric-insulation-250x250.webp']),
  P('electrical-tapes', 'Heat Resistant Teflon Tape', '₹20 / Roll', 'PTFE Teflon tape for heat sealing, high-temperature insulation and non-stick surfaces.', [{ k: 'Material', v: 'PTFE / Teflon' }, { k: 'Property', v: 'Heat resistant' }], ['15mm', '25mm'], '/product-img/heat-resistant-teflon-tape-250x250.webp', ['/product-img/heat-resistant-teflon-tape-250x250.webp']),
  P('electrical-tapes', 'Pvc Electrical Insulation Tape', '₹5 / Piece', 'Economical flame-retardant PVC insulation tape for wire and cable insulation.', [{ k: 'Material', v: 'PVC' }, { k: 'Property', v: 'Flame-retardant' }], ['18mm'], '/product-img/pvc-electrical-insulation-tape-250x250.webp', ['/product-img/pvc-electrical-insulation-tape-250x250.webp']),
  P('electrical-tapes', 'Polyimide Kapton Adhesive Tape', '₹50 / Roll', 'Polyimide Kapton tape for high-temperature electronics masking and insulation.', [{ k: 'Material', v: 'Polyimide (Kapton)' }, { k: 'Property', v: 'High-temp' }], ['10mm', '15mm', '25mm'], '/product-img/polyimide-kapton-adhesive-tape-250x250.webp', ['/product-img/polyimide-kapton-adhesive-tape-250x250.webp']),
  P('electrical-tapes', 'Conductive Adhesive Copper Foil Tape', '₹150 / Roll', 'Conductive copper foil tape for EMI shielding, grounding and repair.', [{ k: 'Material', v: 'Copper foil' }, { k: 'Adhesive', v: 'Conductive' }], ['10mm', '25mm'], '/product-img/copper-foil-adhesive-tape-250x250.webp', ['/product-img/copper-foil-adhesive-tape-250x250.webp']),
  P('electrical-tapes', 'Cotton Insulation FrictionTape', '₹300 / Piece', 'Cotton friction insulation tape for electrical and mechanical wrapping.', [{ k: 'Material', v: 'Cotton' }, { k: 'Type', v: 'Friction' }], ['19mm', '25mm'], '/product-img/cotton-friction-insulation-tape-250x250.webp', ['/product-img/cotton-friction-insulation-tape-250x250.webp']),
  P('electrical-tapes', 'Pink Rayon Tape', '₹90 / Roll', 'Pink rayon insulation tape for coil and transformer wrapping.', [{ k: 'Material', v: 'Rayon' }, { k: 'Colour', v: 'Pink' }], ['19mm', '25mm'], '/product-img/pink-rayon-tape-250x250.webp', ['/product-img/pink-rayon-tape-250x250.webp']),
  // packaging-tape
  P('packaging-tape', 'BOPP Self Adhesive Tape', '₹1,800 / Box', 'General-purpose BOPP carton sealing tape with strong acrylic adhesive for reliable box closure on high-speed lines.', [{ k: 'Material', v: 'BOPP + Acrylic' }, { k: 'Thickness', v: '40-50 micron' }, { k: 'Colour', v: 'Transparent / Brown' }], ['24mm', '48mm', '72mm', '100mm'], '/product-img/bopp1.webp', ['/product-img/bopp1.webp']),
  P('packaging-tape', 'Bopp Tape Laminated with Pearl Film', '₹35 / Roll', 'Premium pearl-laminated BOPP tape offering an upgraded matte finish and enhanced print vibrancy.', [{ k: 'Finish', v: 'Pearl Matte' }, { k: 'Thickness', v: '45-55 micron' }], ['48mm', '72mm'], '/product-img/bopp-tape-laminated.webp', ['/product-img/bopp-tape-laminated.webp']),
  P('packaging-tape', 'Bopp Stationery Tape', '₹1,800 / Box', 'Clear, easy-tear stationery tape for office, retail and light packaging use.', [{ k: 'Core', v: '1 inch' }, { k: 'Clarity', v: 'High' }], ['12mm', '18mm', '24mm'], '/product-img/bopp-stationary.webp', ['/product-img/bopp-stationary.webp']),
  P('packaging-tape', 'Printed BOPP Tapes', '₹25 / Roll', 'Custom-printed BOPP tape carrying your brand name, logo or handling message for professional, tamper-evident cartons.', [{ k: 'Print', v: '1-3 Colours' }, { k: 'Adhesive', v: 'Acrylic / Hot-melt' }], ['48mm', '72mm'], '/product-img/printed-bopp.webp', ['/product-img/printed-bopp.webp']),
  P('packaging-tape', 'Cross Filament Tapes', '₹160 / Roll', 'Cross-filament reinforced tape for heavy-duty strapping, bundling and load unitising.', [{ k: 'Type', v: 'Cross filament' }, { k: 'Strength', v: 'High tensile' }], ['18mm', '24mm', '48mm'], '/product-img/cross-filament-tapes.webp', ['/product-img/cross-filament-tapes.webp']),
  P('packaging-tape', 'Plastic Core For Tape', '₹110 / Piece', 'Plastic cores for adhesive tape winding and converting.', [{ k: 'Material', v: 'Plastic' }, { k: 'Use', v: 'Tape core' }], ['3 inch ID'], '/product-img/pvc-plastic-cores-250x250.webp', ['/product-img/pvc-plastic-cores-250x250.webp']),
  P('packaging-tape', '3m MonoFilament Tape', '₹80 / Roll', '3M-grade mono-filament strapping tape for strong unidirectional reinforcement.', [{ k: 'Type', v: 'Mono filament' }, { k: 'Grade', v: 'Premium' }], ['18mm', '24mm'], '/product-img/mono-filament-tape-250x250.webp', ['/product-img/mono-filament-tape-250x250.webp']),
  P('packaging-tape', 'Reinforced Kraft Paper Tape (Water Activated)', '₹85 / Roll', 'Water-activated reinforced kraft paper tape for secure, tamper-evident carton sealing.', [{ k: 'Type', v: 'Gummed kraft' }, { k: 'Activation', v: 'Water' }], ['48mm', '72mm'], '/product-img/reinforced-kraft-paper-tape-250x250.webp', ['/product-img/reinforced-kraft-paper-tape-250x250.webp']),
  P('packaging-tape', 'Pvc Non Adhesive Tape', '₹5 / Roll', 'Non-adhesive PVC tape for bundling, colour coding and wrapping.', [{ k: 'Material', v: 'PVC' }, { k: 'Adhesive', v: 'None' }], ['18mm', '25mm'], '/product-img/pvc-non-adhesive-tapes-250x250.webp', ['/product-img/pvc-non-adhesive-tapes-250x250.webp']),
  P('packaging-tape', 'Security Tamper Evident Void Tape', '₹40 / Piece', 'Tamper-evident void tape that leaves a VOID message when removed, for secure packaging.', [{ k: 'Type', v: 'Tamper evident' }, { k: 'Feature', v: 'VOID message' }], ['48mm'], '/product-img/void-adhesive-tape-250x250.webp', ['/product-img/void-adhesive-tape-250x250.webp']),
  P('packaging-tape', 'Book Binding Or Duct And Gaffer Tapes', '₹80 / Roll', 'Cloth-backed book binding, duct and gaffer tape for binding, sealing and repair.', [{ k: 'Backing', v: 'Cloth' }, { k: 'Use', v: 'Binding / Gaffer' }], ['48mm', '72mm'], '/product-img/book3-250x250.webp', ['/product-img/book3-250x250.webp']),
  // plastic-rods
  P('plastic-rods', '40 mm EPE Foam Backer Rod', '₹1.5 / Meter', 'Closed-cell 40mm backer rod for controlling sealant depth in wide expansion joints.', [{ k: 'Diameter', v: '40mm' }, { k: 'Cell', v: 'Closed' }], ['40mm']),
  P('plastic-rods', '80 mm EPE Foam Backer Rod', '₹2.5 / Meter', 'Large-diameter 80mm backer rod for very wide construction and civil joints.', [{ k: 'Diameter', v: '80mm' }], ['80mm'], '/product-img/80-mm-epe-foam-backer-rod-250x250.webp', ['/product-img/80-mm-epe-foam-backer-rod-250x250.webp']),
  P('plastic-rods', '12 mm EPE Foam Backer Rod', '₹2.5 / Meter', 'Slim 12mm backer rod for narrow sealant joints and gaps.', [{ k: 'Diameter', v: '12mm' }], ['12mm'], '/product-img/12-mm-epe-foam-backer-rod-250x250.webp', ['/product-img/12-mm-epe-foam-backer-rod-250x250.webp']),
  P('plastic-rods', '1 Inch Nylon Tape', '₹36 / Roll', 'Strong woven nylon reinforcement tape for binding and edge finishing.', [{ k: 'Material', v: 'Nylon' }], ['25mm'], '/product-img/1-inch-nylon-tape-250x250.webp', ['/product-img/1-inch-nylon-tape-250x250.webp']),
  P('plastic-rods', '50 mm Teflon Rod', '₹125 / Kg', 'PTFE Teflon rod for machining low-friction, chemical-resistant components.', [{ k: 'Material', v: 'PTFE / Teflon' }, { k: 'Diameter', v: '50mm' }], ['50mm'], '/product-img/50-mm-teflon-rod-250x250.webp', ['/product-img/50-mm-teflon-rod-250x250.webp']),
  P('plastic-rods', '20 mm PP Rod', '₹20 / Piece', 'Polypropylene rod for machining and fabrication of chemical-resistant parts.', [{ k: 'Material', v: 'Polypropylene' }, { k: 'Diameter', v: '20mm' }], ['20mm'], '/product-img/20-mm-pp-rod-250x250.webp', ['/product-img/20-mm-pp-rod-250x250.webp']),
  P('plastic-rods', '15mm Delrin Rod', '₹125 / Kg', 'Delrin (POM) engineering rod for precision machined components.', [{ k: 'Material', v: 'Delrin / POM' }, { k: 'Diameter', v: '15mm' }], ['15mm'], '/product-img/15mm-delrin-rod-250x250.webp', ['/product-img/15mm-delrin-rod-250x250.webp']),
  // insulation-waterproof-tapes
  P('insulation-waterproof-tapes', '2 Inch Duct Tape', '₹140 / Roll', 'Strong cloth-backed duct tape for sealing, repair and heavy-duty bundling.', [{ k: 'Backing', v: 'Cloth / PE' }], ['48mm']),
  P('insulation-waterproof-tapes', 'Waterproof Butyl Rubber Tape', '₹85 / Piece', 'Self-amalgamating butyl tape for permanent watertight sealing on roofs, pipes and joints.', [{ k: 'Material', v: 'Butyl rubber' }, { k: 'Seal', v: 'Waterproof' }], ['50mm', '75mm']),
  P('insulation-waterproof-tapes', 'Aluminum Foil Tapes', '₹60 / Piece', 'Reflective aluminium foil tape for HVAC ducting, heat shielding and insulation seaming.', [{ k: 'Material', v: 'Aluminium foil' }], ['48mm', '72mm'], '/product-img/aluminium-foil-tape.jpg', ['/product-img/aluminium-foil-tape.jpg']),
  P('insulation-waterproof-tapes', 'Butyl Rubber Tape', '₹50 / Roll', 'Conformable butyl rubber sealing tape for waterproofing and insulation.', [{ k: 'Material', v: 'Butyl rubber' }], ['50mm', '75mm'], '/product-img/butyl-tapes-250x250.webp', ['/product-img/butyl-tapes-250x250.webp']),
  P('insulation-waterproof-tapes', 'High Polymer Butyl Rubber Tape', '₹85 / Piece', 'High-polymer butyl rubber tape for durable, high-tack waterproof sealing.', [{ k: 'Material', v: 'High-polymer butyl' }], ['50mm', '75mm'], '/product-img/high-polymer-butyl-rubber-tape-250x250.webp', ['/product-img/high-polymer-butyl-rubber-tape-250x250.webp']),
  P('insulation-waterproof-tapes', 'Pipe Wrapping Rubber Tapes', '₹15 / Piece', 'Rubber pipe wrapping tape for corrosion protection and moisture sealing.', [{ k: 'Use', v: 'Pipe wrapping' }, { k: 'Material', v: 'Rubber' }], ['50mm'], '/product-img/pipe-wrapping-rubber-tapes-250x250.webp', ['/product-img/pipe-wrapping-rubber-tapes-250x250.webp']),
  P('insulation-waterproof-tapes', 'Silver color Reinforced Aluminium Tape', '₹60 / Roll', 'Reinforced silver aluminium tape for HVAC, ducting and insulation seaming.', [{ k: 'Material', v: 'Reinforced aluminium' }], ['48mm', '72mm'], '/product-img/silver-color-reinforced-aluminium-tape-250x250.webp', ['/product-img/silver-color-reinforced-aluminium-tape-250x250.webp']),
  // roads-construction
  P('roads-construction', 'Silver Grey Fabric Reflective Tape', '₹15 / Meter', 'Durable fabric reflective tape for garments and site safety wear.', [{ k: 'Type', v: 'Fabric reflective' }, { k: 'Colour', v: 'Silver grey' }], ['25mm', '50mm'], '/product-img/silver-grey-fabric-reflective-tape.webp', ['/product-img/silver-grey-fabric-reflective-tape.webp']),
  P('roads-construction', 'Caution Barricade Tape', '₹250 / Roll', 'Bright barricade tape for cordoning off hazards and work zones.', [{ k: 'Type', v: 'Barricade' }], ['75mm']),
  P('roads-construction', 'Retro Reflective Tapes', '₹280 / Roll', 'High-visibility retro-reflective tape for road safety and vehicle marking.', [{ k: 'Type', v: 'Retro-reflective' }], ['50mm'], '/product-img/Retro-Reflective-Tape.avif', ['/product-img/Retro-Reflective-Tape.avif']),
  P('roads-construction', 'Colours Fabric Reflective Tape', '₹19 / Meter', 'Coloured fabric reflective tape for high-visibility apparel and marking.', [{ k: 'Type', v: 'Fabric reflective' }, { k: 'Colours', v: 'Multiple' }], ['25mm', '50mm'], '/product-img/colours-fabric-reflective-tape-250x250.webp', ['/product-img/colours-fabric-reflective-tape-250x250.webp']),
  P('roads-construction', 'Dowel Bar Cap Pvc Sleeve', '₹2 / Piece', 'PVC dowel bar cap sleeve for concrete pavement expansion joints.', [{ k: 'Material', v: 'PVC' }, { k: 'Use', v: 'Dowel bar cap' }], ['Standard'], '/product-img/dowel-bar-cap-pvc-sleeve-250x250.webp', ['/product-img/dowel-bar-cap-pvc-sleeve-250x250.webp']),
  P('roads-construction', '3m Retro Reflective Tape', '₹3,250 / Roll', '3M-grade retro-reflective tape for premium road safety and conspicuity marking.', [{ k: 'Brand', v: '3M' }, { k: 'Type', v: 'Retro-reflective' }], ['50mm'], '/product-img/3m-retro-reflective-tape-250x250.webp', ['/product-img/3m-retro-reflective-tape-250x250.webp']),
  P('roads-construction', 'Underground Warning Tape', '₹25 / Meter', 'Detectable underground warning tape marking buried cables and pipelines.', [{ k: 'Use', v: 'Buried utility warning' }], ['100mm', '150mm'], '/product-img/underground-warning-tape-250x250.webp', ['/product-img/underground-warning-tape-250x250.webp']),
  // expanded-polyethylene-foam
  P('expanded-polyethylene-foam', 'Expanded Polyethylene Foam Rods', '₹2 / Meter', 'Flexible closed-cell foam rods for cushioning, packing and joint filling.', [{ k: 'Cell', v: 'Closed' }], ['Various dia'], '/product-img/expanded-polyethylene-foam-rods-250x250.webp', ['/product-img/expanded-polyethylene-foam-rods-250x250.webp']),
  P('expanded-polyethylene-foam', 'Epe Pipe Insulation Tube', '₹17 / Meter', 'Thermal insulation tubes that reduce heat loss and prevent condensation on pipework.', [{ k: 'Use', v: 'Pipe insulation' }], ['15-110mm ID'], '/product-img/epe-pipe-insulation-tube-250x250.webp', ['/product-img/epe-pipe-insulation-tube-250x250.webp']),
  P('expanded-polyethylene-foam', 'Epe Foam C Section', '₹12 / Meter', 'Extruded C-profile foam for edge and corner protection during shipping.', [{ k: 'Profile', v: 'C-section' }], ['Custom']),
  P('expanded-polyethylene-foam', 'Epe Foam U Profile', '₹15 / Meter', 'U-profile foam channel for framing, edge guarding and packaging.', [{ k: 'Profile', v: 'U-profile' }], ['Custom'], '/product-img/epe-foam-u-profile-250x250.webp', ['/product-img/epe-foam-u-profile-250x250.webp']),
  P('expanded-polyethylene-foam', 'Epe Foam L Section', '₹17 / Meter', 'L-profile foam for corner and edge protection of panels and furniture.', [{ k: 'Profile', v: 'L-section' }], ['Custom'], '/product-img/epe-foam-l-section-250x250.webp', ['/product-img/epe-foam-l-section-250x250.webp']),
  // automotive-tapes
  P('automotive-tapes', '3M Pe Foam Tapes', '₹10 / Roll', '3M-grade PE foam mounting tape for emblems, badges and exterior fixtures.', [{ k: 'Grade', v: 'Premium' }, { k: 'Carrier', v: 'PE foam' }], ['9mm', '12mm'], '/product-img/3m-pe-foam-tapes-250x250.webp', ['/product-img/3m-pe-foam-tapes-250x250.webp']),
  P('automotive-tapes', 'P.e Foam Tape', '₹60 / Piece', 'Conformable PE foam tape for gasketing, sealing and gap filling in vehicles.', [{ k: 'Carrier', v: 'PE foam' }], ['9mm', '12mm', '19mm'], '/product-img/PE-FOAM-TAPE.webp', ['/product-img/PE-FOAM-TAPE.webp']),
  P('automotive-tapes', 'Panel Bonding Tape', '₹40 / Piece', 'High-strength acrylic foam tape for bonding automotive panels and trim.', [{ k: 'Type', v: 'Acrylic foam' }], ['12mm', '19mm']),
  // floor-care
  P('floor-care', 'Pvc Floor Marking Tapes', '₹55 / Roll', 'Hard-wearing PVC tape for lane marking, zoning and 5S workplace organisation.', [{ k: 'Material', v: 'PVC' }], ['48mm', '72mm'], '/product-img/pvc-floor-marking-tapes-250x250.webp', ['/product-img/pvc-floor-marking-tapes-250x250.webp']),
  P('floor-care', 'Double Sided Carpet Tape', '₹100 / Piece', 'Strong double-sided tape for fixing carpets, mats and rugs securely.', [{ k: 'Type', v: 'Double-sided' }], ['48mm', '72mm']),
  P('floor-care', 'Anti Skid And Slippery Tapes', '₹550 / Roll', 'Textured anti-slip tape improving grip on stairs, ramps and wet areas.', [{ k: 'Surface', v: 'Textured' }], ['25mm', '50mm'], '/product-img/anti-skid-and-slippery-tapes-250x250.webp', ['/product-img/anti-skid-and-slippery-tapes-250x250.webp']),
  // eva-foam
  P('eva-foam', 'Customized CNC Router Foam', '₹100 / sq ft', 'CNC-routed EVA inserts cut precisely to your product profile for tool cases and kits.', [{ k: 'Process', v: 'CNC routed' }], ['Made to order'], '/product-img/customized-cnc-cutting-foam.webp', ['/product-img/customized-cnc-cutting-foam.webp']),
  P('eva-foam', 'Die Cut House Of Foam', '₹100 / Piece', 'Die-cut EVA foam components produced to volume for consistent, repeatable parts.', [{ k: 'Process', v: 'Die-cut' }], ['Made to order'], '/product-img/Die-Cut-EVA-Foam.jpg', ['/product-img/Die-Cut-EVA-Foam.jpg']),
  P('eva-foam', 'Eva Foam Rolls', '₹70 / Meter', 'EVA foam supplied in rolls for lining, cushioning and fabrication.', [{ k: 'Format', v: 'Roll' }], ['Custom width']),
  // ldpe-sheet
  P('ldpe-sheet', 'Road Construction LDPE Sheet', '₹115 / Kg', 'LDPE curing sheet that retains moisture for proper concrete hydration.', [{ k: 'Use', v: 'Curing' }], ['Custom width'], '/product-img/road-construction-ldpe-sheet.webp', ['/product-img/road-construction-ldpe-sheet.webp']),
  P('ldpe-sheet', 'Road Constructions LDPE PQC Sheet', '₹115 / Kg', 'PQC-grade LDPE sheeting for pavement quality concrete works and barriers.', [{ k: 'Grade', v: 'PQC' }], ['Custom width'], '/product-img/road-constructions-ldpe-pqc-sheet-250x250.webp', ['/product-img/road-constructions-ldpe-pqc-sheet-250x250.webp']),
  // corporate-event-management
  P('corporate-event-management', 'Catering Table Paper Rolls', '₹55 / Kg', 'Food-grade paper rolls for events, catering and table covering.', [{ k: 'Grade', v: 'Food-safe' }], ['Custom width'], '/product-img/catering-table-paper-rolls-250x250.webp', ['/product-img/catering-table-paper-rolls-250x250.webp']),
  P('corporate-event-management', 'Epe Colour Foam Pipe And Tubes', '₹17 / Meter', 'Coloured EPE foam pipes and tubes for decor, protection and event presentation.', [{ k: 'Material', v: 'EPE foam' }, { k: 'Colours', v: 'Multiple' }], ['Custom'], '/product-img/epe-colour-foam-pipe-for-events-250x250.webp', ['/product-img/epe-colour-foam-pipe-for-events-250x250.webp']),
  // shoe-material-goods
  P('shoe-material-goods', 'Polyester Nylon Tapes', '₹37 / Roll', 'Reinforcement tape for footwear stitching and edge strengthening.', [{ k: 'Use', v: 'Footwear' }, { k: 'Material', v: 'Polyester / Nylon' }], ['Custom'], '/product-img/polyester-nylon-tapes-250x250.webp', ['/product-img/polyester-nylon-tapes-250x250.webp']),
  P('shoe-material-goods', 'Eyelet Tape, For Shoe Reinforcement', '₹60 / Roll', 'Eyelet reinforcement tape adding strength around shoe eyelets and seams.', [{ k: 'Use', v: 'Eyelet reinforcement' }], ['Custom'], '/product-img/eyelet-tape-for-shoe-reinforcement-250x250.webp', ['/product-img/eyelet-tape-for-shoe-reinforcement-250x250.webp']),
  // construction-material
  P('construction-material', 'Ldpe Sheets For Road Construction', '₹115 / Kg', 'Construction-grade LDPE sheeting for road curing, moisture barrier and site covering.', [{ k: 'Use', v: 'Road construction' }, { k: 'Grade', v: 'Civil' }], ['Custom width'], '/product-img/ldpe-sheets-for-road-construction-250x250.webp', ['/product-img/ldpe-sheets-for-road-construction-250x250.webp']),
  // silicone-sealant
  P('silicone-sealant', '260 ml Silicone Sealant', '₹50 / Piece', 'Neutral-cure silicone sealant for weatherproof glazing, sanitary and general sealing.', [{ k: 'Volume', v: '260 ml' }, { k: 'Cure', v: 'Neutral' }], ['260ml cartridge'], '/product-img/silicone-sealant-250x250.webp', ['/product-img/silicone-sealant-250x250.webp']),
];

// helpers
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (cat: string, slug: string) =>
  products.find((p) => p.category === cat && p.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const relatedProducts = (cat: string, slug: string, n = 3) =>
  products.filter((p) => p.category === cat && p.slug !== slug).slice(0, n);
export const featuredProducts = (n = 6) => {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const c of categories) {
    const p = products.find((x) => x.category === c.slug && !seen.has(x.slug));
    if (p) { seen.add(p.slug); out.push(p); }
    if (out.length >= n) break;
  }
  return out;
};