export const BASE = "https://motoindexph.com";

export const url = (path: string) => path;
export const sourceUrl = (path: string) => `${BASE}${path}`;

export type SeoCard = {
  title: string;
  desc: string;
  href: string;
  icon: string;
  badge?: string;
};

export type SeoGroup = {
  id: string;
  label: string;
  icon: string;
  blurb: string;
  archive: { label: string; href: string };
  cards: SeoCard[];
};

export const library: SeoGroup[] = [
  {
    id: "guides",
    label: "Buying guides",
    icon: "target",
    blurb: "Objective, criteria-driven shortlists for every budget, body type and rider.",
    archive: { label: "All buying guides", href: "/recommendations" },
    cards: [
      {
        title: "Motorcycles under ₱100K",
        desc: "Every current bike below ₱100,000, compared by price, engine, weight, seat height and equipment.",
        href: "/recommendations/motorcycles-under-100k",
        icon: "wallet",
        badge: "Popular",
      },
      {
        title: "Automatic motorcycles under ₱100K",
        desc: "Twist-and-go bikes below ₱100K with weight, tank capacity, ABS and published fuel economy.",
        href: "/recommendations/automatic-motorcycles-under-100k",
        icon: "scooter",
      },
      {
        title: "Motorcycles ₱100K–₱150K",
        desc: "The country's best-selling segment across scooters, underbones and manual bikes.",
        href: "/recommendations/motorcycles-100k-to-150k",
        icon: "wallet",
      },
      {
        title: "Motorcycles ₱150K–₱250K",
        desc: "Premium scooters and entry big bikes with published starting prices.",
        href: "/recommendations/motorcycles-150k-to-250k",
        icon: "wallet",
      },
      {
        title: "Motorcycles under ₱80K",
        desc: "The most affordable current bikes, including workhorse underbones from ₱56,900.",
        href: "/recommendations/motorcycles-under-80k",
        icon: "tag",
      },
      {
        title: "Best scooters in the Philippines",
        desc: "Commuter, sport and maxi-scooters compared on objective price and specification data.",
        href: "/recommendations/best-scooters-philippines",
        icon: "scooter",
      },
      {
        title: "Daily commuting shortlist",
        desc: "Bikes ranked on a transparent city-commute profile: weight, transmission, fit and fuel.",
        href: "/recommendations/best-motorcycles-for-daily-commute-philippines",
        icon: "route",
      },
      {
        title: "Beginner-friendly bikes",
        desc: "Lower seats, lighter weights and manageable output — without confusing specs for skill.",
        href: "/recommendations/beginner-friendly-motorcycles-philippines",
        icon: "shield",
      },
      {
        title: "Bikes for shorter riders",
        desc: "Current models ordered by published seat height, then curb weight, with fit caveats.",
        href: "/recommendations/best-motorcycles-for-short-riders",
        icon: "ruler",
      },
      {
        title: "Bikes for long rides",
        desc: "Larger tanks and touring layouts measured for provincial trips and two-up travel.",
        href: "/recommendations/best-motorcycles-for-long-rides",
        icon: "adventure",
      },
      {
        title: "Lightweight motorcycles",
        desc: "Current bikes ordered by published curb weight, with seat height and power for context.",
        href: "/recommendations/lightweight-motorcycles-philippines",
        icon: "feather",
      },
      {
        title: "Motorcycles with ABS",
        desc: "Models whose records list ABS on at least one configuration, wording kept visible.",
        href: "/recommendations/motorcycles-with-abs-philippines",
        icon: "shield",
      },
      {
        title: "Fuel-efficient motorcycles",
        desc: "Bikes ordered by sourced published fuel figures, with tank size and theoretical range.",
        href: "/recommendations/fuel-efficient-motorcycles-philippines",
        icon: "fuel",
      },
      {
        title: "Maxi scooters",
        desc: "Burgman Street to Burgman 400 — maxi-scooters compared by price, tank and ABS.",
        href: "/recommendations/maxi-scooters-philippines",
        icon: "scooter",
      },
      {
        title: "Naked street motorcycles",
        desc: "Gixxer 155 through KTM Duke — naked bikes with price, power, weight and ABS data.",
        href: "/recommendations/naked-motorcycles-philippines",
        icon: "naked",
      },
      {
        title: "Sport motorcycles",
        desc: "Full-fairing sport bikes from the Gixxer SF 155 to the CBR150R and beyond.",
        href: "/recommendations/sport-motorcycles-philippines",
        icon: "sport",
      },
      {
        title: "Adventure touring bikes",
        desc: "V-Strom, CB150X and TRK-class machines compared by tank, seat height and equipment.",
        href: "/recommendations/adventure-touring-motorcycles-philippines",
        icon: "adventure",
      },
      {
        title: "Dual-sport motorcycles",
        desc: "DR160, KLX150 and WR155R with ground clearance, weight and braking data.",
        href: "/recommendations/dual-sport-motorcycles-philippines",
        icon: "offroad",
      },
      {
        title: "Big bikes & 400cc+",
        desc: "CFMOTO 400NK, Guerrilla 450 and up — price, weight, power, tank and ABS in one table.",
        href: "/recommendations/motorcycles-400cc-plus-philippines",
        icon: "gauge",
      },
      {
        title: "Café racer & modern classics",
        desc: "Cafe Racer 152, Rusi Classic and MotorStar Cafe 400 measured objectively.",
        href: "/recommendations/cafe-racer-motorcycles-philippines",
        icon: "cruiser",
      },
      {
        title: "Yamaha scooters",
        desc: "Mio i 125, Mio Gear, Fazzio, Lexi and the Mio family compared model by model.",
        href: "/recommendations/yamaha-scooters-philippines",
        icon: "scooter",
      },
      {
        title: "Honda scooters",
        desc: "Click 125i, Giorno+, Click 160, PCX and ADV across the Honda scooter lineup.",
        href: "/recommendations/honda-scooters-philippines",
        icon: "scooter",
      },
      {
        title: "KTM Duke lineup",
        desc: "200 Duke, 390 Duke and 790 Duke by displacement, power, weight and seat height.",
        href: "/recommendations/ktm-duke-motorcycles-philippines",
        icon: "naked",
      },
      {
        title: "CFMOTO SR sport bikes",
        desc: "300SR, 450SR and 675SR-R price and specification differences.",
        href: "/recommendations/cfmoto-sr-motorcycles-philippines",
        icon: "sport",
      },
    ],
  },
  {
    id: "compare",
    label: "Head-to-head",
    icon: "compare",
    blurb: "Real buying alternatives — same units, same generations, trade-offs explained.",
    archive: { label: "All comparison pairs", href: "/compare" },
    cards: [
      {
        title: "Aerox vs NMAX",
        desc: "Yamaha's two most cross-shopped automatic scooter families, compared.",
        href: "/compare/aerox-vs-nmax",
        icon: "compare",
        badge: "Popular",
      },
      {
        title: "Aerox V3 vs NMAX V3",
        desc: "Version-specific data — V3 figures kept strictly separate from older V2 specs.",
        href: "/compare/aerox-v3-vs-nmax-v3",
        icon: "compare",
      },
      {
        title: "ADV 160 vs PCX 160",
        desc: "Honda's two 160cc-class premium scooters: adventure style versus maxi comfort.",
        href: "/compare/adv-160-vs-pcx-160",
        icon: "compare",
      },
      {
        title: "Click 160 vs Aerox V3",
        desc: "Similar engines, noticeably different price, weight and positioning.",
        href: "/compare/click-160-vs-aerox-v3",
        icon: "compare",
      },
      {
        title: "ADV 160 vs NMAX V3",
        desc: "A cross-brand premium scooter decision for comfort-first commuters.",
        href: "/compare/adv-160-vs-nmax-v3",
        icon: "compare",
      },
      {
        title: "ADV 160 vs Aerox V3",
        desc: "Adventure-style scooter against a sport-oriented one — where your money goes.",
        href: "/compare/adv-160-vs-aerox-v3",
        icon: "compare",
      },
      {
        title: "PCX 160 vs NMAX V3",
        desc: "Honda maxi-scooter comfort versus Yamaha's premium-scooter technology.",
        href: "/compare/pcx-160-vs-nmax-v3",
        icon: "compare",
      },
      {
        title: "Click 160 vs PCX 160",
        desc: "A lighter city commuter format against a larger premium scooter.",
        href: "/compare/click-160-vs-pcx-160",
        icon: "compare",
      },
      {
        title: "Click 125i vs Click 160",
        desc: "125cc commuting value against stronger 160cc performance within the Click family.",
        href: "/compare/click-125i-vs-click-160",
        icon: "compare",
      },
      {
        title: "Click 125i vs Mio Gear",
        desc: "Affordable automatic commuter buyers comparing cost and everyday practicality.",
        href: "/compare/click-125i-vs-mio-gear",
        icon: "compare",
      },
      {
        title: "Click 125i vs Burgman Street",
        desc: "Compact commuter scooter versus a practicality-focused maxi-style format.",
        href: "/compare/click-125i-vs-burgman-street",
        icon: "compare",
      },
      {
        title: "Fazzio vs Giorno+",
        desc: "Retro and classic-styled automatic scooters for style-led buyers.",
        href: "/compare/fazzio-vs-giorno-plus",
        icon: "compare",
      },
      {
        title: "Fazzio vs Mio Gear",
        desc: "Retro city style against practical, budget-first commuting.",
        href: "/compare/fazzio-vs-mio-gear",
        icon: "compare",
      },
      {
        title: "Raider R150 vs Sniper 155",
        desc: "The performance-underbone buyer's perennial dilemma.",
        href: "/compare/raider-r150-vs-sniper-155",
        icon: "underbone",
      },
      {
        title: "Winner X vs Sniper 155",
        desc: "Sport underbone alternatives with different price and brake packages.",
        href: "/compare/winner-x-vs-sniper-155",
        icon: "underbone",
      },
      {
        title: "TMX125 Alpha vs YTX 125",
        desc: "Utility, business and work-riding buyers — the ₱57K workhorse decision.",
        href: "/compare/tmx125-alpha-vs-ytx-125",
        icon: "underbone",
      },
      {
        title: "Ninja 500 vs CFMOTO 450SR",
        desc: "Two current Philippine-market parallel-twin sport bikes, head to head.",
        href: "/compare/ninja-500-vs-450sr",
        icon: "sport",
        badge: "New",
      },
      {
        title: "390 Duke vs Ninja 500",
        desc: "A lightweight naked against a larger parallel-twin sport bike.",
        href: "/compare/390-duke-vs-ninja-500",
        icon: "naked",
      },
      {
        title: "RC 390 vs Ninja 500",
        desc: "KTM's single-cylinder sport bike against Kawasaki's parallel-twin Ninja.",
        href: "/compare/rc-390-vs-ninja-500",
        icon: "sport",
      },
    ],
  },
  {
    id: "ownership",
    label: "Ownership & legal",
    icon: "doc",
    blurb: "Paperwork, financing and recurring costs — the stuff after the showroom.",
    archive: { label: "Ownership hub", href: "/ownership" },
    cards: [
      {
        title: "Ownership cost calculator",
        desc: "Model fuel, servicing, insurance, registration and tires against your daily distance.",
        href: "/ownership/cost-calculator",
        icon: "wallet",
        badge: "Calculator",
      },
      {
        title: "Motorcycle loan calculator",
        desc: "Down payment, financed amount, term, fees, monthly estimate and total payable.",
        href: "/tools/motorcycle-loan-calculator",
        icon: "calculator",
        badge: "Calculator",
      },
      {
        title: "LTO registration fee calculator",
        desc: "Current renewal schedules and fee planning for your exact model year.",
        href: "/tools/lto-registration-fee-calculator",
        icon: "doc",
        badge: "Calculator",
      },
      {
        title: "Motorcycle insurance calculator",
        desc: "CTPL and comprehensive cover estimates for any displacement class.",
        href: "/tools/motorcycle-insurance-calculator",
        icon: "shield",
        badge: "Calculator",
      },
      {
        title: "LTO registration renewal",
        desc: "Current renewal requirements, schedules and fee-planning guidance.",
        href: "/ownership/registration-renewal",
        icon: "calendar",
      },
      {
        title: "Transfer of ownership",
        desc: "The step-by-step LTO transfer path when buying second-hand or repo units.",
        href: "/ownership/transfer-of-ownership",
        icon: "doc",
      },
      {
        title: "Deed of sale guide",
        desc: "What a notarized deed needs to contain for a Philippine motorcycle sale.",
        href: "/ownership/deed-of-sale-motorcycle-philippines",
        icon: "doc",
      },
      {
        title: "Can you ride a motorcycle with DL Code B?",
        desc: "Code B alone does not authorize motorcycle riding. Check Code A and your transmission authorization.",
        href: "/ownership/dl-code-b-motorcycle-philippines",
        icon: "shield",
      },
      {
        title: "Motorcycle insurance guide",
        desc: "CTPL versus comprehensive cover, and what lenders actually require.",
        href: "/ownership/motorcycle-insurance",
        icon: "shield",
      },
      {
        title: "Road safety campaigns",
        desc: "Current Philippine riding-safety programs and rider resources.",
        href: "/ownership/safety-campaigns",
        icon: "shield",
      },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance & gear",
    icon: "wrench",
    blurb: "Model-specific service knowledge plus 175 helmets and accessory research.",
    archive: { label: "Maintenance hub", href: "/maintenance" },
    cards: [
      {
        title: "Parts of a motorcycle",
        desc: "The main systems every rider should know — and which need model-specific checks.",
        href: "/maintenance/parts-of-motorcycle",
        icon: "wrench",
      },
      {
        title: "Motorcycle battery guide",
        desc: "Fitment, warning signs and safe replacement checks matched to your exact model.",
        href: "/maintenance/motorcycle-battery",
        icon: "bolt",
      },
      {
        title: "Coolant guide",
        desc: "Correct specification checks, service intervals and common topping-up mistakes.",
        href: "/maintenance/coolant-for-motorcycle",
        icon: "fuel",
      },
      {
        title: "Sprockets & drive chain",
        desc: "How sprockets work with the chain, what wear looks like, and gearing-change checks.",
        href: "/maintenance/sprocket-motorcycle",
        icon: "wrench",
      },
      {
        title: "Change oil guide",
        desc: "Intervals, oil types and pre-service checks with model-specific warnings.",
        href: "/maintenance/change-oil-motorcycle",
        icon: "fuel",
      },
      {
        title: "Scooter CVT guide",
        desc: "V-belts, rollers and why inspection intervals are model specific.",
        href: "/maintenance/cvt-motorcycle",
        icon: "wrench",
      },
      {
        title: "Choosing engine oil",
        desc: "Match the owner's-manual specification instead of buying by brand or viscosity.",
        href: "/maintenance/motorcycle-oil",
        icon: "fuel",
      },
      {
        title: "Helmet catalog: 175 models",
        desc: "19 brands from ₱959 to ₱40,599 with certification, shell, visor and size data.",
        href: "/gear/helmets",
        icon: "helmet",
        badge: "175 models",
      },
      {
        title: "Helmet size & fit guide",
        desc: "Measure your head correctly and understand size charts before buying.",
        href: "/guides/motorcycle-helmet-size-guide",
        icon: "ruler",
      },
      {
        title: "Helmet certification in the PH",
        desc: "ICC/PS markings, ECE 22.06 and what to inspect on the exact unit sold.",
        href: "/guides/motorcycle-helmet-certification-philippines",
        icon: "shield",
      },
      {
        title: "Tire fitment data",
        desc: "Factory tire sizes and fitment references across the current catalog.",
        href: "/tires",
        icon: "gauge",
      },
      {
        title: "Accessory categories",
        desc: "Top boxes, locks, covers and riding accessories organized by category.",
        href: "/accessories",
        icon: "layers",
      },
    ],
  },
  {
    id: "commute",
    label: "Commuting",
    icon: "route",
    blurb: "Built around 20 km days, EDSA queues, monsoon rains and delivery mileage.",
    archive: { label: "Commuting hub", href: "/commute" },
    cards: [
      {
        title: "Daily commute cost calculator",
        desc: "Fuel, maintenance reserve, parking and cost per workday for any current bike.",
        href: "/commute/cost-calculator",
        icon: "calculator",
        badge: "Calculator",
      },
      {
        title: "Affordability ceiling",
        desc: "Set take-home pay, a monthly cap, reserve, down payment, APR and term.",
        href: "/commute/affordability",
        icon: "wallet",
        badge: "Calculator",
      },
      {
        title: "Bikes for heavy traffic",
        desc: "Stop-go commuting measured on curb weight, transmission, fuel and seat height.",
        href: "/commute/heavy-traffic",
        icon: "route",
      },
      {
        title: "Commuters under ₱80K",
        desc: "Current bikes observed below ₱80,000, ordered by practical commuting factors.",
        href: "/commute/affordable-under-80k",
        icon: "tag",
      },
      {
        title: "Delivery & work riders",
        desc: "High-mileage utility compared on fuel economy, weight, layout and price.",
        href: "/commute/delivery-riders",
        icon: "route",
      },
      {
        title: "Frequent passenger commuting",
        desc: "Two-up use measured by engine class, brakes, fuel capacity and layout.",
        href: "/commute/passenger-commute",
        icon: "scooter",
      },
      {
        title: "Rainy-season prep checklist",
        desc: "Visibility, tires, braking, rain gear and what ground clearance doesn't tell you.",
        href: "/commute/rainy-season",
        icon: "shield",
      },
      {
        title: "Quick motorcycle finder",
        desc: "Filter by traffic, inseam, passenger use, transmission, weight, seat and budget.",
        href: "/finder",
        icon: "search",
      },
    ],
  },
  {
    id: "electric",
    label: "Electric",
    icon: "bolt",
    blurb: "Zero-emission bikes with Philippine registration and charging math.",
    archive: { label: "Electric guide hub", href: "/guides/electric-scooters-philippines" },
    cards: [
      {
        title: "Electric motorcycles in the PH",
        desc: "Verified models by price, battery, claimed range, charging time and top speed.",
        href: "/recommendations/electric-motorcycles-philippines",
        icon: "bolt",
        badge: "New",
      },
      {
        title: "Electric scooter buying guide",
        desc: "What Filipino buyers should check before going all-electric in the city.",
        href: "/guides/electric-scooters-philippines",
        icon: "electric",
      },
      {
        title: "E-bike vs motorcycle",
        desc: "Classification, use cases and total cost differences in the Philippine market.",
        href: "/guides/e-bike-vs-motorcycle",
        icon: "compare",
      },
      {
        title: "EV registration in the PH",
        desc: "Current registration classification and LTO requirements for electric two-wheelers.",
        href: "/guides/electric-motorcycle-registration-philippines",
        icon: "doc",
      },
      {
        title: "Electric vs gas motorcycles",
        desc: "Running costs, charging versus fuel, range reality and ownership trade-offs.",
        href: "/guides/electric-motorcycle-vs-gas-motorcycle",
        icon: "fuel",
      },
      {
        title: "EV charging-cost calculator",
        desc: "Cost per full charge, per 100 km and monthly electricity at your own rate.",
        href: "/tools/electric-motorcycle-charging-cost",
        icon: "calculator",
        badge: "Calculator",
      },
      {
        title: "EV range calculator",
        desc: "Estimate real-world range from battery size, speed, load and riding conditions.",
        href: "/tools/electric-motorcycle-range-calculator",
        icon: "route",
        badge: "Calculator",
      },
    ],
  },
  {
    id: "used",
    label: "Used & dealers",
    icon: "pin",
    blurb: "Repo price boards, used-bike checks and 35 verified dealer branches nationwide.",
    archive: { label: "Dealer directory", href: "/dealers" },
    cards: [
      {
        title: "Repo motorcycle price board",
        desc: "15 seller-published listings from ₱57,920 to ₱141,680 with sources and checks.",
        href: "/used-motorcycles/repo",
        icon: "tag",
        badge: "Updated Aug 2026",
      },
      {
        title: "Used-bike buying checklist",
        desc: "Documents, OR/CR, HPG clearance and unit checks before you pay a peso.",
        href: "/used-motorcycles/buying-checklist",
        icon: "shield",
      },
      {
        title: "Checked dealer directory",
        desc: "35 verified branches across Manila, Pampanga, Cebu and Davao with contacts.",
        href: "/dealers",
        icon: "pin",
      },
      {
        title: "Join as a dealer",
        desc: "Verified profiles, variant pricing and qualified buyer inquiry routing.",
        href: "/dealers/join",
        icon: "award",
      },
    ],
  },
];

export const trustPages: SeoCard[] = [
  { title: "About MotoIndex", desc: "Who builds the index and why", href: "/about", icon: "shield" },
  {
    title: "Methodology",
    desc: "How rankings and scores are computed",
    href: "/methodology",
    icon: "target",
  },
  {
    title: "Data sources",
    desc: "Where every price and spec comes from",
    href: "/data-sources",
    icon: "doc",
  },
  {
    title: "Editorial policy",
    desc: "Independence, corrections and sponsorships",
    href: "/editorial-policy",
    icon: "ad",
  },
  {
    title: "Meet the author",
    desc: "Erwin Valles — rider and reviewer",
    href: "/authors/erwin-valles",
    icon: "award",
  },
  { title: "Privacy & local data", desc: "How the preview stores your research", href: "/privacy", icon: "shield" },
];

export const megaColumns = [
  {
    title: "Choose your bike",
    links: [
      { label: "All 127 motorcycles", href: "/motorcycles", icon: "gauge" },
      { label: "Quick motorcycle finder", href: "/finder", icon: "search" },
      { label: "Rider fitment check", href: "/fitment", icon: "ruler" },
      { label: "Head-to-head compare", href: "/compare", icon: "compare" },
      { label: "Buying guides", href: "/recommendations", icon: "target" },
    ],
  },
  {
    title: "Own & ride",
    links: [
      { label: "Ownership hub", href: "/ownership", icon: "doc" },
      { label: "Maintenance & parts", href: "/maintenance", icon: "wrench" },
      { label: "Commuting tools", href: "/commute", icon: "route" },
      { label: "Helmets & gear", href: "/gear/helmets", icon: "helmet" },
      { label: "Dealers & repo bikes", href: "/dealers", icon: "pin" },
    ],
  },
];

export const popularComparisons = [
  { label: "Aerox vs NMAX V3", href: "/compare/aerox-v3-vs-nmax-v3" },
  { label: "ADV 160 vs PCX 160", href: "/compare/adv-160-vs-pcx-160" },
  { label: "Ninja 500 vs 450SR", href: "/compare/ninja-500-vs-450sr" },
];
