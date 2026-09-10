import type { CatalogBike } from "./catalog";

export const gapModels: CatalogBike[] = [
  {
    id: "honda-navi", slug: "honda/navi", brand: "Honda", model: "Navi", year: "Source record", priceFrom: 53900,
    cc: 109, hp: 7.8, seat: 765, transmission: "Automatic", category: ["Commuter"], budget: "under100", accent: "from-ink-50 to-white", checked: "2026-08-24",
    weight: 104, tank: 3.8, torque: 8.9, brakes: "No ABS listed; confirm the exact local unit.", tires: ["90/90-12", "90/100-10"], economy: 48, economyBasis: "estimate",
    note: "A compact 109cc automatic mini-commuter. The reference price is from the existing MotoIndex record; actual stock and the complete dealer quote need confirmation.",
    sources: [{ label: "Existing MotoIndex Honda Navi record", href: "https://motoindexph.com/motorcycles/honda/navi" }],
  },
  {
    id: "honda-beat", slug: "honda/beat", brand: "Honda", model: "BeAT", year: "Source record", priceFrom: 72400,
    cc: 110, hp: 8.9, seat: 740, transmission: "Automatic", category: ["Scooter", "Commuter"], budget: "under100", accent: "from-ink-50 to-white", checked: "2026-08-24",
    weight: 90, tank: 4.2, torque: 9.3, brakes: "No ABS listed in this source record; confirm the exact configuration.", tires: ["80/90-14", "90/90-14"], economy: 44, economyBasis: "estimate",
    note: "A 110cc automatic scooter with a 740 mm seat and 90 kg recorded curb weight. Keep model-year and variant differences separate; the fuel figure is a planning assumption, not a measured result.",
    sources: [{ label: "Existing MotoIndex Honda BeAT record", href: "https://motoindexph.com/motorcycles/honda/beat" }],
  },
  {
    id: "kawasaki-ninja-400", slug: "kawasaki/ninja-400", brand: "Kawasaki", model: "Ninja 400", year: "Source record", priceFrom: 340900,
    cc: 399, hp: 45, seat: 785, transmission: "Manual", category: ["Sport"], budget: "175plus", accent: "from-ink-50 to-white", checked: "2026-08-24",
    weight: 168, tank: 14, torque: 37, absListed: true, brakes: "Dual-channel ABS listed; verify the exact model year and unit.", tires: ["110/70-17", "150/60-17"], economy: 29, economyBasis: "estimate",
    note: "The 399cc parallel-twin Ninja 400 is not the 451cc Ninja 500. This restored reference record does not guarantee current new-bike inventory, used value or toll-road eligibility.",
    sources: [{ label: "Existing MotoIndex Ninja 400 record", href: "https://motoindexph.com/motorcycles/kawasaki/ninja-400" }],
  },
  {
    id: "yamaha-mio-gravis", slug: "yamaha/mio-gravis", brand: "Yamaha", model: "Mio Gravis", year: "Standard reference", priceFrom: 84900,
    cc: 125, hp: 9.3, seat: 780, transmission: "Automatic", category: ["Scooter", "Commuter"], budget: "under100", accent: "from-ink-50 to-white", checked: "Undated comparison-page reference",
    weight: 102, tank: 4.2, torque: 9.5, brakes: "Front disc / rear drum; ABS not listed for this Standard record.", tires: ["100/90-12", "110/90-12"],
    photo: "https://imgcdn.zigwheels.ph/medium/gallery/exterior/86/2170/yamaha-mio-gravis-53549.jpg",
    note: "A 125cc CVT scooter. This record follows the cited Standard listing, not every Gravis generation. MotoDeal lists a wider price range up to PHP 92,900, so ask which configuration a quote describes.",
    sources: [{ label: "Zigwheels: Mio Gravis Standard specifications and PHP 84,900 reference", href: "https://www.zigwheels.ph/new-motorcycles/yamaha/mio-gravis/standard" }, { label: "MotoDeal: separate Gravis variant price references", href: "https://www.motodeal.com.ph/motorcycles/yamaha/mio-gravis/price-list" }],
  },
  {
    id: "yamaha-mio-soul-i-125", slug: "yamaha/mio-soul-i-125", brand: "Yamaha", model: "Mio Soul i125", year: "Standard / S references", priceFrom: 79900, priceTo: 83900,
    cc: 125, hp: 9.4, seat: 775, transmission: "Automatic", category: ["Scooter", "Commuter"], budget: "under100", accent: "from-ink-50 to-white", checked: "Undated comparison-page reference",
    weight: 98, tank: 4.2, torque: 9.6,
    note: "A 125cc CVT scooter with separate Standard and S price references. The chassis and output figures here follow MotoDeal's S record; confirm the actual year, trim and equipment before buying.",
    sources: [{ label: "MotoDeal: Mio Soul i125 Standard and S price list", href: "https://www.motodeal.com.ph/motorcycles/yamaha/mio-soul-i125/price-list" }, { label: "MotoDeal: S specification record", href: "https://www.motodeal.com.ph/motorcycles/yamaha/mio-soul-i125/s" }],
  },
];