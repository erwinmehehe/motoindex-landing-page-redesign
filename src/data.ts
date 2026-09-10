import aerox from "./assets/images/bike-aerox.jpg";
import nmax from "./assets/images/bike-nmax.jpg";
import adv from "./assets/images/bike-adv.jpg";
import click from "./assets/images/bike-click.jpg";
import pcx from "./assets/images/bike-pcx.jpg";
import duke from "./assets/images/bike-duke.jpg";
import ninja from "./assets/images/bike-ninja.jpg";
import dualsport from "./assets/images/bike-dualsport.jpg";
import heroBike from "./assets/images/hero-bike.jpg";
import lifestyle from "./assets/images/lifestyle-ride.jpg";

export const images = { aerox, nmax, adv, click, pcx, duke, ninja, dualsport, heroBike, lifestyle };

export type Bike = {
  id: string;
  brand: string;
  model: string;
  year: string;
  priceFrom: number;
  priceTo?: number;
  cc: number;
  hp: number;
  seat: number;
  transmission: "Automatic" | "Manual";
  category: ("Scooter" | "Adventure" | "Naked" | "Sport" | "Off-road" | "Commuter" | "Underbone" | "Cruiser" | "Touring")[];
  budget: "under100" | "100to175" | "175plus";
  image?: string;
  tag?: string;
  accent: string;
  slug?: string;
};

export const bikes: Bike[] = [
  {
    id: "yamaha-aerox-v3",
    brand: "Yamaha",
    model: "Mio Aerox V3",
    year: "2026",
    priceFrom: 125900,
    priceTo: 163900,
    cc: 155,
    hp: 15.4,
    seat: 790,
    transmission: "Automatic",
    category: ["Scooter", "Sport"],
    budget: "100to175",
    image: images.aerox,
    tag: "Best seller",
    accent: "from-sky-500/15 to-blue-600/10",
    slug: "yamaha/aerox-v3",
  },
  {
    id: "honda-adv-160",
    brand: "Honda",
    model: "ADV 160",
    year: "2026",
    priceFrom: 166900,
    priceTo: 176000,
    cc: 157,
    hp: 15.8,
    seat: 780,
    transmission: "Automatic",
    category: ["Adventure", "Scooter"],
    budget: "100to175",
    image: images.adv,
    tag: "Adventure scooter",
    accent: "from-zinc-500/15 to-slate-600/10",
    slug: "honda/adv-160",
  },
  {
    id: "yamaha-nmax-v3",
    brand: "Yamaha",
    model: "NMAX V3",
    year: "2026",
    priceFrom: 155900,
    priceTo: 175900,
    cc: 155,
    hp: 15.1,
    seat: 770,
    transmission: "Automatic",
    category: ["Scooter", "Commuter"],
    budget: "100to175",
    image: images.nmax,
    tag: "Touring commuter",
    accent: "from-neutral-500/15 to-zinc-700/10",
    slug: "yamaha/nmax-v3",
  },
  {
    id: "kawasaki-ninja-500",
    brand: "Kawasaki",
    model: "Ninja 500",
    year: "2026",
    priceFrom: 325000,
    cc: 451,
    hp: 45.0,
    seat: 785,
    transmission: "Manual",
    category: ["Sport"],
    budget: "175plus",
    image: images.ninja,
    tag: "Sport",
    accent: "from-racer-500/15 to-rose-600/10",
  },
  {
    id: "ktm-390-duke",
    brand: "KTM",
    model: "390 Duke",
    year: "2026",
    priceFrom: 269000,
    cc: 373,
    hp: 43.5,
    seat: 823,
    transmission: "Manual",
    category: ["Naked"],
    budget: "175plus",
    image: images.duke,
    tag: "Naked street",
    accent: "from-orange-500/15 to-amber-600/10",
  },
  {
    id: "honda-pcx-160",
    brand: "Honda",
    model: "PCX 160",
    year: "2026",
    priceFrom: 133400,
    priceTo: 154900,
    cc: 157,
    hp: 15.8,
    seat: 764,
    transmission: "Automatic",
    category: ["Scooter", "Commuter"],
    budget: "100to175",
    image: images.pcx,
    tag: "Premium commuter",
    accent: "from-stone-400/15 to-amber-500/10",
    slug: "honda/pcx-160",
  },
  {
    id: "honda-click-160",
    brand: "Honda",
    model: "Click 160",
    year: "2026",
    priceFrom: 116900,
    cc: 157,
    hp: 15.2,
    seat: 778,
    transmission: "Automatic",
    category: ["Scooter", "Commuter"],
    budget: "100to175",
    image: images.click,
    tag: "Fuel miser",
    accent: "from-red-500/15 to-orange-500/10",
    slug: "honda/click-160",
  },
  {
    id: "kawasaki-klx-150",
    brand: "Kawasaki",
    model: "KLX 150",
    year: "2026",
    priceFrom: 135000,
    cc: 144,
    hp: 11.9,
    seat: 865,
    transmission: "Manual",
    category: ["Off-road", "Adventure"],
    budget: "100to175",
    image: images.dualsport,
    tag: "Dual-sport",
    accent: "from-lime-500/15 to-green-600/10",
  },
  {
    id: "yamaha-mio-gear",
    brand: "Yamaha",
    model: "Mio Gear",
    year: "2026",
    priceFrom: 79400,
    priceTo: 82400,
    cc: 125,
    hp: 9.3,
    seat: 750,
    transmission: "Automatic",
    category: ["Scooter", "Commuter"],
    budget: "under100",
    tag: "Under ₱100K",
    accent: "from-amber-500/15 to-yellow-600/10",
    slug: "yamaha/mio-gear",
  },
  {
    id: "honda-click-125i",
    brand: "Honda",
    model: "Click 125i",
    year: "2026",
    priceFrom: 81900,
    cc: 125,
    hp: 11.0,
    seat: 769,
    transmission: "Automatic",
    category: ["Scooter", "Commuter"],
    budget: "under100",
    tag: "Under ₱100K",
    accent: "from-sky-500/15 to-cyan-600/10",
    slug: "honda/click-125i",
  },
  {
    id: "yamaha-fazzio",
    brand: "Yamaha",
    model: "Mio Fazzio",
    year: "2026",
    priceFrom: 92400,
    priceTo: 95400,
    cc: 125,
    hp: 8.2,
    seat: 750,
    transmission: "Automatic",
    category: ["Scooter", "Commuter"],
    budget: "under100",
    tag: "Style pick",
    accent: "from-violet-500/15 to-fuchsia-600/10",
    slug: "yamaha/fazzio",
  },
  {
    id: "suzuki-burgman-street-ex",
    brand: "Suzuki",
    model: "Burgman Street EX",
    year: "2026",
    priceFrom: 92400,
    cc: 124,
    hp: 8.6,
    seat: 780,
    transmission: "Automatic",
    category: ["Scooter", "Commuter"],
    budget: "under100",
    tag: "Under ₱100K",
    accent: "from-teal-500/15 to-emerald-600/10",
    slug: "suzuki/burgman-street-ex",
  },
];

export const priceLabel = (b: Bike) =>
  b.priceTo
    ? `₱${(b.priceFrom / 1000).toFixed(0)}K–₱${(b.priceTo / 1000).toFixed(0)}K`
    : `₱${b.priceFrom.toLocaleString("en-PH")}`;

export type Category = {
  name: string;
  blurb: string;
  count: number;
  icon: string;
};

export const categories: Category[] = [
  { name: "Scooters", blurb: "Automatic, effortless city rides", count: 34, icon: "scooter" },
  { name: "Underbone", blurb: "Lightweight, frugal commuters", count: 22, icon: "underbone" },
  { name: "Naked", blurb: "Upright street bikes with attitude", count: 18, icon: "naked" },
  { name: "Sport", blurb: "Full-fairing thrills on road & track", count: 16, icon: "sport" },
  { name: "Adventure", blurb: "Long rides, rough roads, big views", count: 14, icon: "adventure" },
  { name: "Cruiser", blurb: "Relaxed ergonomics, classic style", count: 9, icon: "cruiser" },
  { name: "Off-road", blurb: "Dual-sport and enduro machines", count: 8, icon: "offroad" },
  { name: "Electric", blurb: "Zero-emission e-bikes & e-scooters", count: 12, icon: "electric" },
];

export const brands = ["Honda", "Yamaha", "Suzuki", "Kawasaki", "KTM", "CFMoto", "Motorstar", "Vespa"];

export const stats = [
  { value: 127, suffix: "", label: "Current motorcycles", decimals: 0 },
  { value: 20, suffix: "", label: "Head-to-head comparisons", decimals: 0 },
  { value: 175, suffix: "", label: "Helmets across 19 brands", decimals: 0 },
  { value: 60, suffix: "+", label: "Free guides & tools", decimals: 0 },
];

export type Feature = {
  title: string;
  body: string;
  icon: string;
};

export const features: Feature[] = [
  {
    title: "Side-by-side comparison",
    body: "Line up up to three bikes with consistent units — price, power, weight, seat height, brakes — and toggle 'differences only'.",
    icon: "compare",
  },
  {
    title: "Transparent loan calculator",
    body: "See down payment, amount financed, term, fees, monthly estimate and total payable — never a low number without its context.",
    icon: "calculator",
  },
  {
    title: "Ownership cost modeling",
    body: "Plan fuel, servicing, insurance, LTO registration and tires, modeled to your actual daily distance and traffic.",
    icon: "wallet",
  },
  {
    title: "Rider fit check",
    body: "Compare seat heights and curb weights against your inseam and experience — guidance, not guesswork, before you visit a dealer.",
    icon: "ruler",
  },
  {
    title: "Verified, sourced prices",
    body: "Every SRP lists its source and the date it was checked, so SRP, dealer pricing and estimates are never mixed up.",
    icon: "shield",
  },
  {
    title: "Saved shortlist, no signup",
    body: "Heart bikes and build a shortlist instantly on any device. Accounts are optional — browsing always comes first.",
    icon: "heart",
  },
];

export const tools = [
  {
    title: "Motorcycle loan calculator",
    body: "Monthly payments and total payable with fees and interest disclosed.",
    icon: "calculator",
    meta: "Most used",
    href: "/tools/motorcycle-loan-calculator",
  },
  {
    title: "Ownership cost estimator",
    body: "Fuel, oil, service, insurance, registration and tires per month.",
    icon: "wallet",
    meta: null,
    href: "/ownership/cost-calculator",
  },
  {
    title: "LTO registration fees",
    body: "Renewal schedules and fee planning for your exact model year.",
    icon: "doc",
    meta: null,
    href: "/tools/lto-registration-fee-calculator",
  },
  {
    title: "Commute cost calculator",
    body: "Compare two wheels against your daily commute in Metro traffic.",
    icon: "route",
    meta: null,
    href: "/commute/cost-calculator",
  },
  {
    title: "EV range & charging tools",
    body: "Estimate real-world range and charging cost for electric bikes.",
    icon: "bolt",
    meta: "New",
    href: "/tools/electric-motorcycle-range-calculator",
  },
  {
    title: "Insurance calculator",
    body: "CTPL and comprehensive cover estimates for any displacement.",
    icon: "shield",
    meta: null,
    href: "/tools/motorcycle-insurance-calculator",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  role: string;
  initials: string;
  tone: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I almost bought on impulse in the dealer's parking lot. The compare page showed the Aerox and NMAX differences in five minutes — seat height, tank range, even the fees. I left with the right one for my 22 km daily ride.",
    name: "Marco Dela Peña",
    location: "Quezon City",
    role: "Daily commuter · Yamaha Aerox V3",
    initials: "MP",
    tone: "from-sky-500 to-blue-600",
  },
  {
    quote:
      "At 5'1\", half the bikes I liked didn't fit me. MotoIndex's fit check and the short-riders shortlist saved me countless showroom visits. I finally sat on bikes I could actually flat-foot.",
    name: "Angelica Soriano",
    location: "Cebu City",
    role: "New rider · Honda Click 125i",
    initials: "AS",
    tone: "from-rose-500 to-racer-600",
  },
  {
    quote:
      "The loan calculator never hides the total. Down payment, term, fees — it showed exactly why the cheapest monthly wasn't the cheapest bike. That transparency is rare here.",
    name: "Reynaldo Cruz",
    location: "Pampanga",
    role: "First-time owner · Suzuki Burgman",
    initials: "RC",
    tone: "from-amber-500 to-orange-600",
  },
  {
    quote:
      "As a delivery rider, fuel and maintenance are my real monthly cost. The ownership estimator modeled my 120 km days and confirmed the Click 160 pays for itself in under a year.",
    name: "Jomar Bautista",
    location: "Manila",
    role: "Delivery rider · Honda Click 160",
    initials: "JB",
    tone: "from-emerald-500 to-green-600",
  },
  {
    quote:
      "I'm from Jakarta but I'm buying a bike while based in Manila. The registration, insurance and ownership guides explained everything local dealers assumed I already knew.",
    name: "Dewi Lestari",
    location: "Taguig · expat rider",
    role: "Adventure rider · Honda ADV 160",
    initials: "DL",
    tone: "from-violet-500 to-purple-600",
  },
  {
    quote:
      "The head-to-head between the Ninja 500 and 450SR didn't just dump specs — it explained the trade-offs honestly, without crowning the biggest engine. That's how you earn trust.",
    name: "Kenneth Villanueva",
    location: "Davao City",
    role: "Weekend rider · Kawasaki Ninja 500",
    initials: "KV",
    tone: "from-red-500 to-rose-700",
  },
];

export type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  cta: string;
  featured?: boolean;
  features: string[];
  finePrint: string;
};

export const plans: Plan[] = [
  {
    name: "Rider",
    tagline: "Everything you need to choose with confidence.",
    monthly: 0,
    annual: 0,
    cta: "Start free — no signup",
    features: [
      "All 127 motorcycles with full specs",
      "Compare up to 3 bikes side by side",
      "Saved shortlist on this device",
      "Loan, ownership & LTO calculators",
      "Buying, maintenance and safety guides",
      "Dealer directory and inquiry forms",
    ],
    finePrint: "Free forever. No credit card.",
  },
  {
    name: "MotoIndex+",
    tagline: "For riders who want the complete decision edge.",
    monthly: 199,
    annual: 1990,
    cta: "Go MotoIndex+",
    featured: true,
    features: [
      "Everything in Rider, plus:",
      "Unlimited bike comparisons",
      "Price-drop and new-model alerts",
      "Advanced Find My Match reports",
      "Ownership dashboard for up to 3 bikes",
      "Ad-free research experience",
      "Early access to new tools & data",
    ],
    finePrint: "Cancel anytime. Prices in PHP, inclusive of VAT where applicable.",
  },
  {
    name: "Dealer Partner",
    tagline: "Meet informed buyers exactly when they're ready.",
    monthly: -1,
    annual: -1,
    cta: "Talk to our team",
    features: [
      "Verified dealership profile with badge",
      "Branded model pages and variant pricing",
      "Qualified inquiry routing & inbox",
      "Inventory spotlight placements",
      "Shopper intent and listing analytics",
      "Dedicated onboarding support",
    ],
    finePrint: "Custom plans for single branches and multi-site groups.",
  },
];

export const faqs = [
  {
    q: "Are the motorcycle prices accurate?",
    a: "Prices are dated published references, not a guarantee of today's dealer price. Some records contain manufacturer SRPs and others contain observed price ranges. Open the source on the exact model page, confirm the variant, and ask the dealer for the complete current cash price including fees.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. You can browse, compare, use calculators and save bikes or guides without registering. In this connected preview, your garage and reading list are saved in this browser. Account-based cloud sync is not implemented, so use the download and share features to keep a separate copy.",
  },
  {
    q: "How does Find My Match work?",
    a: "The full finder asks about your budget, main riding purpose, transmission preference and inseam. Budget and transmission are hard limits. Among the imported reference models that pass, your chosen riding category and seat-height proximity order the shortlist. It is a research starting point, not a physical-fit or safety guarantee.",
  },
  {
    q: "How is the monthly loan estimate calculated?",
    a: "The calculator deducts your chosen down payment, applies the selected term and disclosed interest method, then adds itemized fees to show the monthly figure and total amount payable. It is an educational estimate, not a lender offer — banks and dealer financing may quote differently.",
  },
  {
    q: "Can I buy a motorcycle directly through MotoIndex?",
    a: "No. MotoIndex is a research platform, not the seller. Use the dealer directory to contact a source-listed branch and confirm stock, price and terms. This preview does not collect payments or send dealer leads; its application form creates a clearly labeled local draft only.",
  },
  {
    q: "Which brands and bikes do you cover?",
    a: "Open Brands in the navigation for all 22 motorcycle brand guides, or switch to the 19-brand helmet directory. Brand pages include models, published price references, buying guidance and FAQs. Each page states its imported coverage and links to the complete original content; unimported details have not been silently replaced with guesses.",
  },
  {
    q: "Is MotoIndex only for Filipino riders?",
    a: "Prices, registration, insurance and dealer information are specific to the Philippines, which is what local riders need most. The gear, maintenance, safety and electric-mobility guides are useful to riders anywhere in Southeast Asia and beyond.",
  },
  {
    q: "What if I spot incorrect information?",
    a: "Check the linked source and exact variant first. Use the original site's editorial policy and contact process for a correction. Source links are retained throughout this preview, and unimported fields are marked instead of being filled with guesses.",
  },
];

export const footerNav = [
  {
    title: "Explore",
    links: ["All motorcycles", "Compare bikes", "Find My Match", "Categories", "Dealers", "Repo & used bikes"],
  },
  {
    title: "Free tools",
    links: ["Loan calculator", "Ownership costs", "LTO fee calculator", "Insurance estimator", "Commute calculator", "EV range tools"],
  },
  {
    title: "Learn",
    links: ["Buying guides", "Maintenance & parts", "Helmet & gear guides", "Riding & safety", "Commuting", "News & reviews"],
  },
  {
    title: "Company",
    links: ["About MotoIndex", "Methodology", "Data sources", "Editorial policy", "Contact us", "Corrections"],
  },
];
