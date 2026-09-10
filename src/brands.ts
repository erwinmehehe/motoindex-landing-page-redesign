export type BrandProfile = {
  kind: "motorcycle" | "helmet";
  slug: string;
  name: string;
  description: string;
  categories: string[];
  sourceCount: number;
  detailedCount?: number;
  priceFrom?: number;
  priceTo?: number;
  checked?: string;
  support: string;
  guides: string[];
  color: string;
  archives?: { name: string; path: string; context: string }[];
};

// Counts and price bands describe the fetched live brand pages, not imported model coverage.
type MotorRow = [string, string, number, number, number, string, string, string[], string];
const motorRows: MotorRow[] = [
  ["honda", "Honda", 18, 56900, 2100000, "2026-09-09", "Everyday scooters, useful workhorses and bigger weekend plans.", ["Scooter", "Underbone", "Adventure", "Sport", "Cruiser", "Naked", "Touring"], "Check the exact local variant, dealer fees, service schedule and warranty arrangements. Honda's budget commuters and big-bike range serve very different ownership needs."],
  ["yamaha", "Yamaha", 16, 57900, 1769000, "2026-09-09", "From the daily Mio to the next open-road adventure.", ["Scooter", "Underbone", "Naked", "Sport", "Off-road", "Commuter"], "Keep Aerox and NMAX generations separate. Use the Yamaha after-sales and owner-manual resources for exact model-year service requirements, rather than applying a generic CVT or oil interval."],
  ["suzuki", "Suzuki", 17, 68400, 566000, "2026-09-08", "Practical commuters, the Raider family and roads beyond the city.", ["Scooter", "Underbone", "Naked", "Sport", "Adventure", "Off-road"], "Distinguish Burgman Street, Street EX and Burgman 400 records, and check the exact Raider version. Confirm parts and service availability through Suzuki's Philippine after-sales network."],
  ["kawasaki", "Kawasaki", 10, 91500, 1917200, "2026-09-09", "Workday capability. Weekend character. A different kind of green.", ["Commuter", "Off-road", "Naked", "Sport", "Touring"], "The Barako, KLX, Z and Ninja families have different intended uses. Verify the exact brake package and generation, then check a local service point before placing a reservation."],
  ["ktm", "KTM", 5, 178000, 599000, "2026-09-09", "Duke roadsters and RC sport bikes, researched model by model.", ["Naked", "Sport", "Adventure"], "KTM's Philippine service hub links manuals, maintenance, spare-parts tools and safety checks. The 390 name spans different engine generations; match the exact model year before comparing."],
  ["cfmoto", "CFMOTO", 6, 165000, 438900, "2026-09-09", "SR sport bikes, NK roadsters and a longer way home.", ["Sport", "Naked", "Adventure"], "Use the Philippine dealer and service network for model-specific parts, warranty and servicing. An SR, NK and MT with similar displacement can have very different ergonomics and equipment."],
  ["kymco", "Kymco", 6, 82500, 229000, "2026-09-08", "Automatic choices for the daily ride and the longer commute.", ["Scooter"], "KYMCO publishes Philippine dealer and service-center locators. Verify local after-sales support, the exact scooter variant and the applicable service schedule before purchase."],
  ["benelli", "Benelli", 5, 129900, 399000, "2026-09-09", "Street motorcycles and touring possibilities worth a closer look.", ["Naked", "Adventure"], "Confirm the current Philippine Benelli dealer and after-sales contact, particularly parts lead times and the service schedule for the exact motorcycle."],
  ["royal-enfield", "Royal Enfield", 5, 230000, 445000, "2026-09-09", "Modern classics, roadsters and a more considered pace.", ["Naked", "Cruiser", "Adventure"], "Royal Enfield publishes Philippine store, service-center and owner-manual entry points. Use the exact model and year manual for servicing, not a general classic-bike schedule."],
  ["rusi", "Rusi", 5, 75000, 270000, "2026-09-09", "Value-focused choices across city, classic and adventure styles.", ["Scooter", "Naked", "Adventure"], "RUSI's site lists parts, repair and maintenance services. Confirm the branch, exact model, current cash price and parts availability rather than assuming uniform branch coverage."],
  ["bmw-motorrad", "BMW Motorrad", 4, 300000, 1675000, "2026-09-08", "City scooters, roadsters and the GS route to somewhere new.", ["Scooter", "Naked", "Adventure"], "BMW Motorrad Philippines lists authorized motorcycle contacts across Luzon, Visayas and Mindanao. Confirm the equipment package and local service support for the exact motorcycle."],
  ["bristol", "Bristol", 4, 128800, 368000, "2026-09-09", "Research the local scooter lineup, from Basilica to Maxie.", ["Scooter"], "Bristol publishes a Philippine branch network. Confirm that the branch services the exact model and clarify parts availability, warranty coverage and the full delivered price."],
  ["ducati", "Ducati", 4, 785000, 1995000, "2026-09-09", "Scrambler character and performance-focused Italian machines.", ["Naked", "Sport"], "Use Ducati's dealer locator to confirm a Philippine sales and service point. Ask about the exact model-year maintenance program and consumable costs, not only the monthly payment."],
  ["husqvarna", "Husqvarna", 4, 175000, 950000, "2026-09-09", "Distinctive roadsters and a route into adventure touring.", ["Naked", "Adventure"], "Use Husqvarna Motorcycles' Philippines dealer search and service resources. These are different from Husqvarna Forest & Garden support; make sure the service contact handles your motorcycle."],
  ["triumph", "Triumph", 4, 299000, 870000, "2026-09-08", "Modern classics and triple-cylinder roadsters with their own character.", ["Naked", "Adventure"], "Triumph's Philippine owner support includes servicing, dealer search and recall-check support through authorized dealers. Verify the service requirements and warranty for the exact model."],
  ["vespa", "Vespa", 4, 210000, 425000, "2026-09-08", "Primavera, Sprint, GTS and GTV. Find your kind of city ride.", ["Scooter"], "Vespa Philippines links service centers, scheduled-maintenance information, manuals and recall resources. Compare the exact trim, paint and engine configuration before treating prices as equivalent."],
  ["aprilia", "Aprilia", 3, 248000, 660000, "2026-09-08", "From SR GT city riding to the RS sport-bike family.", ["Scooter", "Sport"], "Confirm the current Philippine Aprilia importer or dealer for model-specific service, parts and warranty support. The SR GT scooter and RS motorcycles should be researched as separate ownership choices."],
  ["motorstar", "MotorStar", 2, 69000, 140000, "2026-08-27", "Explore the Xplorer and Cafe records with the numbers in view.", ["Adventure", "Naked"], "Use MotorStar's Philippine network directly for current stock, parts and service availability. Branch support can vary by model, so check the exact unit before purchasing."],
  ["sym", "SYM", 2, 103800, 135800, "2026-08-27", "Cruisym and Jet X. Two different approaches to automatic riding.", ["Scooter"], "SYM lists Philippine distributors in its global distributor directory. Confirm the current local distributor and the service point that supports the exact unit."],
  ["bajaj", "Bajaj", 1, 208888, 208888, "2026-09-09", "A closer look at the Philippine-market Dominar 400 record.", ["Naked"], "Confirm the exact registered displacement, model year, dealer warranty and parts support. A model name alone does not establish toll-road eligibility or current equipment."],
  ["keeway", "Keeway", 1, 69900, 69900, "2026-09-09", "Cafe Racer 152: classic styling, practical research.", ["Naked"], "Check the exact local configuration, dated price source and service support. Budget for gear, registration and maintenance in addition to the motorcycle's purchase price."],
  ["zontes", "Zontes", 1, 408800, 408800, "2026-09-09", "Get to know the 400G beyond the headline specification.", ["Scooter"], "Verify the current Philippine distributor, exact variant, warranty and service arrangements. Source pricing is a reference, not a guarantee of stock or a final cash quote."],
];

const guideMap: Record<string, string[]> = {
  honda: ["/recommendations/honda-scooters-philippines", "/compare/adv-160-vs-pcx-160", "/compare/click-125i-vs-click-160"],
  yamaha: ["/recommendations/yamaha-scooters-philippines", "/recommendations/yamaha-mio-motorcycles-philippines", "/compare/aerox-v3-vs-nmax-v3"],
  suzuki: ["/recommendations/suzuki-burgman-motorcycles-philippines", "/recommendations/suzuki-raider-motorcycles-philippines", "/compare/raider-r150-vs-sniper-155"],
  kawasaki: ["/recommendations/kawasaki-ninja-motorcycles-philippines", "/compare/ninja-500-vs-450sr", "/recommendations/dual-sport-motorcycles-philippines"],
  ktm: ["/recommendations/ktm-duke-motorcycles-philippines", "/compare/390-duke-vs-ninja-500", "/compare/rc-390-vs-ninja-500"],
  cfmoto: ["/recommendations/cfmoto-sr-motorcycles-philippines", "/compare/ninja-500-vs-450sr", "/recommendations/motorcycles-400cc-plus-philippines"],
};
const colors: Record<string, string> = { honda: "#bb2027", yamaha: "#294c91", suzuki: "#225388", kawasaki: "#285c3b", ktm: "#b34814", cfmoto: "#23666a", vespa: "#276755", ducati: "#b42127", "royal-enfield": "#8a3e25" };

export const motorcycleBrands: BrandProfile[] = motorRows.map(([slug, name, sourceCount, priceFrom, priceTo, checked, description, categories, support]) => ({
  kind: "motorcycle", slug, name, sourceCount, priceFrom, priceTo, checked, description, categories, support,
  color: colors[slug] || "#333d49", guides: guideMap[slug] || ["/recommendations", "/ownership/cost-calculator", "/maintenance"],
  ...(slug === "yamaha" ? { archives: [
    { name: "Aerox V2", path: "/motorcycles/yamaha/aerox-v2", context: "Previous generation. Historical launch price, not current V3 pricing." },
    { name: "NMAX V2", path: "/motorcycles/yamaha/nmax-v2", context: "Previous generation. Keep its specifications separate from the NMAX V3." },
  ] } : slug === "honda" ? { archives: [
    { name: "Click 150i", path: "/motorcycles/honda/click-150i", context: "Previous-generation reference. Not interchangeable with the Click 160." },
    { name: "ADV 150", path: "/motorcycles/honda/adv-150", context: "Historical model record, kept separate from the current ADV 160." },
  ] } : {}),
}));

type HelmetRow = [string, string, number, number, string, string[], number | null, number | null];
const helmetRows: HelmetRow[] = [
  ["kyt", "KYT", 14, 9, "Race-inspired full-face, modular and open-face helmets.", ["Full face", "Modular", "Open face"], 4300, 4300],
  ["spyder", "Spyder", 22, 10, "Philippine commuter and touring helmet research.", ["Full face", "Modular", "Open face", "Half face", "Hybrid"], 2695, 4895],
  ["gille", "Gille", 24, 9, "Street-focused full-face and modular helmet models.", ["Full face", "Modular"], 3850, 11999],
  ["evo", "EVO", 17, 7, "Accessible road helmets across several formats.", ["Full face", "Modular", "Open face"], 3280, 5980],
  ["sec", "SEC", 18, 8, "Full-face and modular choices alongside a broad luggage range.", ["Full face", "Modular"], 2600, 11000],
  ["arai", "Arai", 8, 6, "Japanese full-face and adventure helmet models.", ["Full face", "Adventure"], 32000, 33000],
  ["hjc", "HJC", 6, 6, "Road, touring and open-face helmet references.", ["Full face", "Modular", "Open face"], 5390, 11190],
  ["rook", "Rook", 4, 1, "Retro and lifestyle-focused full-face helmets.", ["Full face"], 4500, 4500],
  ["shoei", "Shoei", 8, 8, "Japanese road, touring, adventure and off-road helmets.", ["Full face", "Modular", "Open face", "Adventure", "Off-road"], null, null],
  ["zebra", "Zebra", 5, 3, "Value-focused city, full-face and modular models.", ["Full face", "Modular"], 2500, 2999],
  ["hnj", "HNJ", 4, 4, "Value-focused modular, full-face and half-face models.", ["Modular", "Full face", "Half face"], 959, 2095],
  ["agv", "AGV", 9, 9, "Italian road, sport and touring helmet research.", ["Full face", "Adventure", "Modular", "Open face"], 8960, 17480],
  ["mt", "MT", 8, 8, "Full-face and modular models with Philippine retail references.", ["Full face", "Modular"], 6800, 7200],
  ["bell", "Bell", 7, 7, "Road helmets, classic open-face styles and adventure formats.", ["Full face", "Open face", "Modular", "Adventure"], 10570, 15090],
  ["shark", "Shark", 8, 8, "French road and sport-touring helmet models.", ["Full face"], 17499, 40599],
  ["ls2", "LS2", 37, 37, "Road, modular, adventure and off-road helmet choices.", ["Hybrid", "Open face", "Adventure", "Off-road", "Full face", "Modular"], 14990, 25990],
  ["nhk", "NHK", 23, 12, "Race-inspired, street and open-face helmet models.", ["Full face", "Open face"], null, null],
  ["smk", "SMK", 19, 19, "Full-face, modular, adventure and open-face formats.", ["Full face", "Off-road", "Adventure", "Open face", "Modular"], null, null],
  ["alpinestars", "Alpinestars", 4, 4, "Road-racing and motocross helmet research.", ["Full face", "Off-road"], null, null],
];

export const helmetBrands: BrandProfile[] = helmetRows.map(([slug, name, sourceCount, detailedCount, description, categories, priceFrom, priceTo]) => ({
  kind: "helmet", slug, name, sourceCount, detailedCount, description, categories,
  ...(priceFrom !== null ? { priceFrom, priceTo: priceTo! } : {}),
  color: "#303b48", support: `Check ${name} visor, liner, cheek-pad and replacement-part availability for the exact model. A familiar brand name does not guarantee that every size or market version fits the same way.`,
  guides: ["/guides/motorcycle-helmet-size-guide", "/guides/motorcycle-helmet-certification-philippines"],
  ...(slug === "kyt" ? { checked: "2026-09-04" } : {}),
}));

export const brandPath = (brand: BrandProfile) => brand.kind === "motorcycle" ? `/motorcycles/${brand.slug}` : `/gear/helmets/${brand.slug}`;
export const allBrands = [...motorcycleBrands, ...helmetBrands];
export const brandByPath = new Map(allBrands.map((brand) => [brandPath(brand), brand]));
export const brandSearchEntries = allBrands.map((brand) => ({ title: `${brand.name} ${brand.kind === "motorcycle" ? "motorcycles" : "helmets"}: brand guide & prices`, href: brandPath(brand), category: "Brand page" }));
export const brandDirectoryPaths = ["/brands", "/gear/helmets/brands"];