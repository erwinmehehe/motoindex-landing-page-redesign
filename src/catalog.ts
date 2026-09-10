import { bikes as originalBikes, type Bike } from "./data";
import { additionalBrandModels } from "./brand-models";
import { gapModels } from "./gap-models";

export type CatalogBike = Bike & { checked: string; photo?: string; weight?: number; tank?: number; torque?: number; brakes?: string; absListed?: boolean; economy?: number; economyBasis?: "published" | "estimate"; tires?: [string, string]; note?: string; sources?: { label: string; href: string }[] };
export const money = (value: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value);
export const bikePath = (bike: Bike) => `/motorcycles/${bike.slug || bike.id.replace("-", "/")}`;

const overrides: Record<string, Partial<CatalogBike>> = {
  "yamaha-aerox-v3": { model: "Aerox V3", weight: 124, tank: 5.5, torque: 14.2, brakes: "Variant-dependent; SP references list ABS and traction control.", tires: ["110/80-14", "140/70-14"], note: "A sport-oriented automatic scooter with a 790 mm seat and separate Standard and SP configurations." },
  "yamaha-fazzio": { model: "Fazzio" },
  "kawasaki-ninja-500": { priceFrom: 353800, hp: 51.3, weight: 170, tank: 14, torque: 42.6, slug: "kawasaki/ninja-500", brakes: "Confirm the exact variant; ABS is not asserted at model level.", tires: ["110/70-17", "150/60-17"], note: "A 451cc parallel-twin sport bike. Account for its 170 kg curb weight during parking and low-speed maneuvers." },
  "ktm-390-duke": { priceFrom: 289000, hp: 43, seat: 800, weight: 139, tank: 11, torque: 37, slug: "ktm/390-duke", brakes: "ABS listed; confirm the Philippine variant.", checked: "2026-08-27", tires: ["110/70-17", "150/60-17"], note: "This source record is the 373cc generation. Do not substitute specifications from newer 399cc versions." },
  "kawasaki-klx-150": { model: "KLX150", priceFrom: 134900, hp: 11.53, seat: 866, slug: "kawasaki/klx150" },
  "yamaha-nmax-v3": { weight: 131, tank: 7.1, torque: 14.2, brakes: "Dual-channel ABS listed; confirm the exact local variant.", absListed: true, economy: 40, economyBasis: "estimate", tires: ["110/70-13", "130/70-13"], note: "A 155cc maxi-scooter with a 770 mm seat, 131 kg curb weight and separate Standard / Tech Max configurations." },
  "honda-adv-160": { weight: 133, tank: 8.1, absListed: true, brakes: "ABS listed on source configurations. Verify the exact ABS / RoadSync variant." },
  "honda-pcx-160": { weight: 131, tank: 8.1, absListed: true, brakes: "ABS is variant-dependent. Confirm the exact Standard / RoadSync configuration." },
  "honda-click-160": { weight: 116, tank: 5.5, economy: 46.7, economyBasis: "published" },
  "yamaha-mio-gear": { weight: 96 },
};

type Seed = [string, string, string, number, number | null, number, number, number, Bike["transmission"], Bike["category"], string];
// Reference snapshot from the published MotoIndex catalog, not a live dealer inventory feed.
const additional: Seed[] = [
  ["yamaha", "Yamaha", "Sniper 155", 125900, 148400, 155, 17.7, 795, "Manual", ["Underbone"], "sniper-155"],
  ["suzuki", "Suzuki", "Raider R150 Fi", 121900, null, 147, 18.2, 765, "Manual", ["Underbone"], "raider-r150"],
  ["honda", "Honda", "Winner X", 123900, 131900, 149, 15.4, 795, "Manual", ["Underbone"], "winner-x"],
  ["honda", "Honda", "Wave RSX", 62900, 64900, 109, 8.6, 760, "Manual", ["Underbone", "Commuter"], "wave-rsx"],
  ["honda", "Honda", "TMX125 Alpha", 56900, null, 125, 9.6, 759, "Manual", ["Commuter"], "tmx125-alpha"],
  ["yamaha", "Yamaha", "YTX 125", 57900, null, 125, 8, 800, "Manual", ["Commuter"], "ytx-125"],
  ["honda", "Honda", "Giorno+", 101900, null, 125, 11.38, 780, "Automatic", ["Scooter", "Commuter"], "giorno-plus"],
  ["suzuki", "Suzuki", "Burgman Street", 84400, null, 124, 8.58, 780, "Automatic", ["Scooter", "Commuter"], "burgman-street"],
  ["suzuki", "Suzuki", "Avenis", 81400, null, 124, 8.58, 780, "Automatic", ["Scooter", "Commuter"], "avenis"],
  ["suzuki", "Suzuki", "Skydrive Sport", 73900, null, 113, 8.98, 740, "Automatic", ["Scooter", "Commuter"], "skydrive-sport"],
  ["honda", "Honda", "CB150X", 173900, 174900, 149, 15, 817, "Manual", ["Adventure"], "cb150x"],
  ["yamaha", "Yamaha", "WR155R", 180000, 180900, 155, 16.49, 880, "Manual", ["Off-road", "Adventure"], "wr155r"],
  ["suzuki", "Suzuki", "Gixxer 155", 106400, null, 155, 13.94, 795, "Manual", ["Naked"], "gixxer-155"],
  ["cfmoto", "CFMOTO", "450SR", 299900, null, 449.5, 51, 795, "Manual", ["Sport"], "450sr"],
  ["ktm", "KTM", "RC 390", 335000, null, 373, 43.5, 824, "Manual", ["Sport"], "rc-390"],
  ["honda", "Honda", "Rebel 500", 399000, null, 471, 45.5, 690, "Manual", ["Cruiser"], "rebel-500"],
  ["yamaha", "Yamaha", "XMAX", 311000, null, 292, 27.62, 795, "Automatic", ["Scooter"], "xmax"],
  ["suzuki", "Suzuki", "DR160", 129000, null, 162, 14.08, 845, "Manual", ["Off-road"], "dr160"],
  ["yamaha", "Yamaha", "XSR155", 182000, 184500, 155, 19, 808, "Manual", ["Naked"], "xsr155"],
  ["suzuki", "Suzuki", "Raider J Crossover", 71900, null, 113, 9.12, 765, "Manual", ["Underbone"], "raider-j-crossover"],
];

export const catalog: CatalogBike[] = [
  ...originalBikes.map((bike) => ({ ...bike, year: "Current record", checked: "2026-08-25", ...overrides[bike.id] })),
  ...additional.map(([brandSlug, brand, model, priceFrom, priceTo, cc, hp, seat, transmission, category, slug]): CatalogBike => ({
    id: `${brandSlug}-${slug}`, brand, model, slug: `${brandSlug}/${slug}`, year: "Current record", priceFrom,
    ...(priceTo ? { priceTo } : {}), cc, hp, seat, transmission, category,
    budget: priceFrom < 100000 ? "under100" : priceFrom < 175000 ? "100to175" : "175plus",
    accent: "from-ink-50 to-white", checked: ["RC 390", "Rebel 500"].includes(model) ? "2026-09-09" : brand === "CFMOTO" ? "2026-08-27" : "2026-08-25",
  })),
  ...additionalBrandModels,
  ...gapModels,
];

export const catalogById = new Map(catalog.map((bike) => [bike.id, bike]));
const externalPhotos: Record<string, string> = {
  "cfmoto-450sr": "https://www.motorrad-bilder.at/slideshows/291/021705/CFMOTO_450SR_StudioRight45_ZirconBlack.jpg",
  "ktm-rc-390": "https://www.todocircuito.com/ckfinder/userfiles/images/KTM-RC390-2022-4.jpg",
  "honda-rebel-500": "https://cdn.riderly.com/storage/media/img/bikes/honda__rebel%20500.png",
};
catalog.forEach((bike) => { if (externalPhotos[bike.id]) bike.photo = externalPhotos[bike.id]; });
const referenceEvidence: Record<string, Partial<CatalogBike>> = {
  "yamaha-aerox-v3": { absListed: true, economy: 40, economyBasis: "estimate" },
  "yamaha-fazzio": { weight: 95 },
  "yamaha-mio-i-125": { weight: 92, tank: 4.2 },
  "suzuki-avenis": { weight: 106, economy: 54, economyBasis: "published", brakes: "Combined braking listed; do not equate CBS with ABS." },
  "suzuki-burgman-street": { weight: 110, tank: 5.5, economy: 54.9, economyBasis: "published" },
  "suzuki-access": { weight: 106, economy: 57.3, economyBasis: "published" },
  "honda-wave-rsx": { weight: 98, economy: 69.5, economyBasis: "published" },
  "suzuki-smash-fi": { weight: 94, economy: 68, economyBasis: "published" },
  "suzuki-raider-j-crossover": { weight: 96, economy: 52.6, economyBasis: "published" },
  "suzuki-skydrive-sport": { weight: 93 },
  "honda-giorno-plus": { weight: 116, economy: 47, economyBasis: "published" },
  "ktm-390-duke": { absListed: true, economy: 28, economyBasis: "published" },
  "suzuki-v-strom-160": { tank: 13, absListed: true, brakes: "Dual-channel ABS listed; confirm the local unit.", economy: 50, economyBasis: "published" },
  "kymco-sky-town-150": { tank: 7, absListed: true, brakes: "Dual ABS listed in the source record." },
  "sym-cruisym-150": { tank: 7.5, absListed: true, brakes: "Standard and Dual ABS variants; do not assume every trim has ABS." },
  "sym-jet-x150": { tank: 7.5, absListed: true, brakes: "ABS listed; confirm the exact variant." },
};
catalog.forEach((bike) => Object.assign(bike, referenceEvidence[bike.id] || {}));
export const catalogByPath = new Map(catalog.map((bike) => [bikePath(bike), bike]));
export const publishedPrice = (bike: Bike) => bike.priceTo ? `${money(bike.priceFrom)} - ${money(bike.priceTo)}` : money(bike.priceFrom);
export const catalogBrands = [...new Set(catalog.map((bike) => bike.brand))].sort();
export const modelSources = (bike: CatalogBike) => bike.sources || [{ label: "MotoIndex model source record", href: `https://motoindexph.com${bikePath(bike)}` }];

const y = (s: string) => `yamaha-${s}`;
const h = (s: string) => `honda-${s}`;
const s = (s: string) => `suzuki-${s}`;
export const comparisonPairs: Record<string, string[]> = {
  "aerox-vs-nmax": [y("aerox-v3"), y("nmax-v3")],
  "aerox-v3-vs-nmax-v3": [y("aerox-v3"), y("nmax-v3")],
  "adv-160-vs-pcx-160": [h("adv-160"), h("pcx-160")],
  "click-160-vs-aerox-v3": [h("click-160"), y("aerox-v3")],
  "raider-r150-vs-sniper-155": [s("raider-r150"), y("sniper-155")],
  "click-125i-vs-mio-gear": [h("click-125i"), y("mio-gear")],
  "click-125i-vs-burgman-street": [h("click-125i"), s("burgman-street")],
  "adv-160-vs-nmax-v3": [h("adv-160"), y("nmax-v3")],
  "adv-160-vs-aerox-v3": [h("adv-160"), y("aerox-v3")],
  "fazzio-vs-giorno-plus": [y("fazzio"), h("giorno-plus")],
  "tmx125-alpha-vs-ytx-125": [h("tmx125-alpha"), y("ytx-125")],
  "click-160-vs-nmax-v3": [h("click-160"), y("nmax-v3")],
  "click-125i-vs-click-160": [h("click-125i"), h("click-160")],
  "fazzio-vs-mio-gear": [y("fazzio"), y("mio-gear")],
  "winner-x-vs-sniper-155": [h("winner-x"), y("sniper-155")],
  "pcx-160-vs-nmax-v3": [h("pcx-160"), y("nmax-v3")],
  "click-160-vs-pcx-160": [h("click-160"), h("pcx-160")],
  "ninja-500-vs-450sr": ["kawasaki-ninja-500", "cfmoto-450sr"],
  "390-duke-vs-ninja-500": ["ktm-390-duke", "kawasaki-ninja-500"],
  "rc-390-vs-ninja-500": ["ktm-rc-390", "kawasaki-ninja-500"],
};