export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const resolveImage = (image?: string) => {
  if (!image) return "";
  if (image.startsWith("/") || image.startsWith("http")) return image;
  return img(image);
};

export const blogs: Blog[] = [
  {
    slug: "choosing-the-right-bopp-packaging-tape",
    title: "How to Choose the Right BOPP Packaging Tape for Your Dispatch Line",
    excerpt:
      "Adhesive type, film thickness and width all affect carton sealing performance. Here is a practical guide to selecting the right BOPP tape.",
    category: "Packaging",
    date: "2026-06-18",
    readTime: "5 min read",
    image: '/product-img/bopp.jpg',
    content: [
      "BOPP (bi-axially oriented polypropylene) tape is the workhorse of modern dispatch operations, but not every roll is built the same. Choosing correctly means matching adhesive chemistry, film thickness and width to your cartons and throughput.",
      "Adhesive is the first decision. Acrylic adhesives offer excellent ageing, clarity and value for general cartons, while hot-melt grades deliver higher instant tack for heavier or recycled boxes. For cold-storage dispatch, a low-temperature adhesive prevents lifting.",
      "Film thickness typically ranges from 40 to 55 microns. Heavier cartons and export consignments benefit from thicker film that resists splitting, while lighter e-commerce parcels can run economically on thinner grades.",
      "Finally, consider width and branding. A 48mm roll suits most cartons; wider 72mm improves seal security on heavy cases. Printed tape adds tamper-evidence and turns every parcel into brand real estate.",
      "At Vardhman Packaging, we help you trial the right combination so your line runs faster with fewer failed seals. Reach out for a sample recommendation tailored to your cartons.",
    ],
  },
  {
    slug: "epe-vs-eva-foam-packaging",
    title: "EPE vs EVA Foam: Which Protective Packaging Is Right for You?",
    excerpt:
      "Both foams protect products, but their structure and cost differ. Learn when to specify EPE and when EVA is the smarter choice.",
    category: "Materials",
    date: "2026-05-30",
    readTime: "6 min read",
    image: '/product-img/eva-and-epe.webp',
    content: [
      "Protective foam is central to damage-free shipping, and the two most common options — EPE and EVA — each have distinct strengths. Understanding the difference helps you protect products without over-spending.",
      "EPE (expanded polyethylene) is lightweight, resilient and cost-effective. Its closed-cell structure absorbs shock and vibration, making it ideal for edge protection, void fill and general cushioning of furniture, appliances and electronics.",
      "EVA foam has a finer, denser cell structure and a premium feel. It is the material of choice for CNC-routed tool-case inserts, gaskets and presentation packaging where precision and appearance matter.",
      "Cost usually favours EPE for bulk cushioning, while EVA earns its place where fit, finish and repeatable die-cut parts are required. Many customers use both across a single product line.",
      "We manufacture custom profiles in both materials — from EPE C-sections and pipe insulation to CNC-cut EVA inserts. Share your product dimensions and we will recommend the most economical protective solution.",
    ],
  },
  {
    slug: "reflective-tapes-road-safety",
    title: "The Role of Reflective Tapes in Road and Site Safety",
    excerpt:
      "Retro-reflective and barricade tapes save lives on construction sites and highways. Here is how to specify them correctly.",
    category: "Safety",
    date: "2026-05-12",
    readTime: "4 min read",
    image: '/product-img/Reflective-Tapes.webp',
    content: [
      "Visibility is a frontline defence in road construction and industrial safety. Reflective and barricade tapes make hazards obvious in low light, reducing accidents for workers and the public alike.",
      "Retro-reflective tapes bounce vehicle headlights back toward the driver, dramatically improving night-time conspicuity on barriers, cones and vehicles. Fabric reflective grades add the same benefit to safety garments.",
      "Barricade and caution tapes work in daylight, using high-contrast colour to cordon off open trenches, wet floors and restricted zones. Durability matters — cheap tape fades and tears within days.",
      "When specifying, match the tape to exposure: choose weather-stabilised grades for outdoor use and abrasion-resistant films for high-traffic areas.",
      "Vardhman supplies a full range of reflective, barricade and LDPE curing products for construction sites. Talk to us about a safety package for your project.",
    ],
  },
  {
    slug: "double-sided-tapes-industrial-bonding",
    title: "A Practical Guide to Double-Sided Tapes for Industrial Bonding",
    excerpt:
      "From tissue carriers to high-bond acrylic foam, double-sided tapes replace screws and rivets in modern assembly.",
    category: "Bonding",
    date: "2026-04-22",
    readTime: "5 min read",
    image: '/product-img/Double-Sided-Tapes.jpg',
    content: [
      "Double-sided tapes have quietly replaced mechanical fasteners across countless assemblies, offering cleaner aesthetics, faster production and better vibration damping.",
      "Tissue-carrier tapes are ideal for lightweight mounting like POS displays and card fixing. Polyester-carrier tapes step up strength and temperature resistance for splicing and precision work.",
      "For structural jobs — bonding automotive panels or exterior signage — acrylic foam tapes distribute stress across the joint and absorb movement, outperforming rivets in fatigue resistance.",
      "Surface preparation is key: clean, dry and dust-free substrates ensure full adhesive contact and long-term bond strength.",
      "Our team can match the right carrier and adhesive to your substrates and load. Request a sample to test bond performance in your own application.",
    ],
  },
];

export const blogCategories = [
  "All",
  "Packaging",
  "Materials",
  "Safety",
  "Bonding",
];
export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);
