export type Helmet = {
  id: string;
  brand: string;
  model: string;
  type: string;
  price: number | null;
  slug: string;
  sizes?: string;
  photoPending?: boolean;
  mediaId?: string;
};

type Row = [slug: string, model: string, type: string, price: number | null, sizes?: string, media?: string];
const full = "Full face";
const modular = "Modular";
const open = "Open face";
const adventure = "Adventure";
const offroad = "Off-road";
const xs2 = "XS / S / M / L / XL / XXL";
const xsTwo = "XS / S / M / L / XL / 2XL";
const xs3 = "XS / S / M / L / XL / 2XL / 3XL";
const xxs3 = "2XS / XS / S / M / L / XL / 2XL / 3XL";
const xxs4 = "2XS / XS / S / M / L / XL / 2XL / 3XL / 4XL";
const ml = "M / L / XL";
const ml2 = "M / L / XL / 2XL";
const sml = "S / M / L / XL";
const sml2 = "S / M / L / XL / 2XL";
const xsxl = "XS / S / M / L / XL";

// All 175 detail records listed at /gear/helmets. Null prices and absent photos remain explicit.
const byBrand: { slug: string; brand: string; rows: Row[] }[] = [
  { slug: "kyt", brand: "KYT", rows: [
    ["tt-course", "TT-Course", full, 4300, xs2, "kyt-tt-course"],
    ["r2r", "R2R", full, null, xs2, "kyt-r2r"],
    ["tt-revo", "TT-Revo", full, null, xs2],
    ["kx-1-race-gp", "KX-1 Race GP", full, null, xs2, "kyt-kx-1-race-gp"],
    ["nz-race", "NZ Race", full, null, xs2, "kyt-nz-race"],
    ["r1r", "R1R", full, null, xs2, "kyt-r1r"],
    ["ttr-jet", "TTR-Jet", open, null, xs2, "kyt-ttr-jet"],
    ["d-city", "D-City", full, null, xsxl, "kyt-d-city"],
    ["ballistic", "Ballistic", modular, null, xsxl, "kyt-ballistic"],
  ] },
  { slug: "spyder", brand: "Spyder", rows: [
    ["fury-rapid-s8", "Fury Rapid S8", full, 4195, ml, "spyder-fury-rapid-s8"],
    ["neo-icon", "Neo Icon", modular, 3695, ml, "spyder-neo-icon"],
    ["neo-blade", "Neo Blade", open, 2795, ml, "spyder-neo-blade"],
    ["reboot-2", "Reboot 2.0", "Half face", 2695, ml, "spyder-reboot-2"],
    ["neo-ace", "Neo Ace", "Hybrid", 4195, ml2, "spyder-neo-ace"],
    ["recon-2-plain-a", "Recon 2.0 Plain A+", full, 4695, ml, "spyder-recon-2"],
    ["force-v2", "Force+ Plain V2", modular, 4895, ml2],
    ["rogue", "Rogue+ Plain V2", full, 3795, sml2],
    ["shift", "Shift+ Plain", full, 3795, ml],
    ["nf1", "NF1 Plain", full, 3695, ml2],
  ] },
  { slug: "gille", brand: "Gille", rows: [
    ["883-falcon", "883 Falcon", full, 4500, ml, "gille-883-falcon"],
    ["vertix-z501", "ILM-Z501 Vertix", modular, 6799, undefined, "gille-vertix-z501"],
    ["135-two-tone", "135 Two Tone", full, 3990, ml2, "gille-135"],
    ["843-circuit", "843 Circuit", full, 3850, ml2, "gille-843-circuit"],
    ["863-medusa-forged", "863 Medusa Forged", full, 9900, ml2, "gille-863-medusa"],
    ["873-celeste-forged", "873 Celeste Forged", full, 11999, ml2, "gille-873-celeste"],
    ["a118-2-adira", "A118-2 Adira", full, 4199, ml2, "gille-a118-2-adira"],
    ["a5009-phoenix", "A5009 Phoenix", full, 4290, ml2, "gille-a5009-phoenix"],
    ["adira-eclipse", "Adira Eclipse", full, 4399, ml2, "gille-adira-eclipse"],
  ] },
  { slug: "evo", brand: "EVO", rows: [
    ["m2", "M2", full, 3980, undefined, "evo-m2"],
    ["vxr-8000", "VXR-8000", modular, 4480, undefined, "evo-vxr-8000"],
    ["sr-09", "SR-09", full, 4480, undefined, "evo-sr-09"],
    ["tr-x", "TR-X", open, 3280, undefined, "evo-tr-x"],
    ["gt-pro-rr", "GT-Pro RR", full, 3800, undefined, "evo-gt-pro-rr"],
    ["sr-x-mono", "SR-X Mono Colors", full, 3780, undefined, "evo-sr-x-mono"],
    ["tourer-180-flip", "Tourer 180-degree Flip", modular, 5980, undefined, "evo-tourer"],
  ] },
  { slug: "sec", brand: "SEC", rows: [
    ["odyssey", "Odyssey", modular, 2600, sml, "sec-odyssey"],
    ["breach", "Breach", full, 2800, undefined, "sec-breach"],
    ["pilot-2025", "Pilot 2025", modular, 3100, undefined, "sec-pilot-2025"],
    ["carbon-mamba", "Carbon Mamba", full, 11000, ml, "sec-carbon-mamba"],
    ["carbon-chronos", "Carbon Chronos", full, 10000, ml, "sec-carbon-chronos"],
    ["nomad", "Nomad", full, 9000, sml, "sec-nomad"],
    ["atmos-scorpio", "ATMOS Scorpio", modular, 3980, ml, "sec-atmos"],
    ["saga", "SAGA", modular, 3900, ml, "sec-saga"],
  ] },
  { slug: "arai", brand: "Arai", rows: [
    ["rapide-neo", "Rapide Neo", full, 33000, sml2, "arai-rapide-neo"],
    ["tour-cross-v", "Tour Cross V", full, 32000, sml, "arai-tour-cross-v"],
    ["quantic", "Quantic", full, null, xsxl],
    ["concept-xe", "Concept-XE", full, null, xsxl],
    ["tour-x5", "Tour-X5", adventure, null],
    ["rx-7v-evo", "RX-7V EVO", full, null, "XS / S / M / L / XL / XXL / XXXL"],
  ] },
  { slug: "hjc", brand: "HJC", rows: [
    ["f71", "F71", full, null],
    ["rpha-12", "RPHA 12", full, null],
    ["rpha-91", "RPHA 91", modular, null, xsTwo],
    ["c10", "C10", full, 5390, "3XS / 2XS / XS / S / M / L / XL / 2XL", "hjc-c10"],
    ["i71", "i71", full, 11190, sml2, "hjc-i71"],
    ["i31", "i31", open, 7590, xsTwo, "hjc-i31"],
  ] },
  { slug: "rook", brand: "Rook", rows: [
    ["v152-mono", "V152 Mono", full, 4500, sml, "rook-v152-mono"],
  ] },
  { slug: "shoei", brand: "Shoei", rows: [
    ["x-spr-pro", "X-SPR Pro", full, null],
    ["gt-air-3", "GT-Air 3", full, null, xs2],
    ["neotec-3", "Neotec 3", modular, null, xs2],
    ["j-cruise-3", "J-Cruise 3", open, null, xs2],
    ["glamster-06", "Glamster 06", full, null, xs2],
    ["hornet-adv-06", "Hornet-ADV 06", adventure, null],
    ["vfx-wr-06", "VFX-WR 06", offroad, null, xs2],
    ["nxr2", "NXR2", full, null, "XXS / XS / S / M / L / XL / XXL / XXXL", "shoei-nxr2"],
  ] },
  { slug: "zebra", brand: "Zebra", rows: [
    ["atlas-2026", "Atlas 2026", full, 2799, undefined, "zebra-atlas-2026"],
    ["a113-ritzy", "A113 Ritzy", modular, 2999, undefined, "zebra-a113-ritzy"],
    ["alistair-2024", "Alistair 2024", full, 2500, ml, "zebra-alistair-2024"],
  ] },
  { slug: "hnj", brand: "HNJ", rows: [
    ["a119", "A119", modular, 2095, ml, "hnj-a119"],
    ["983", "983", full, 1999, undefined, "hnj-983"],
    ["818a", "818A", "Half face", 959],
    ["a607", "A607", full, null],
  ] },
  { slug: "agv", brand: "AGV", rows: [
    ["pista-gp-rr", "Pista GP RR", full, null, xs2],
    ["k7", "K7", full, null],
    ["ax9", "AX9", adventure, null, xs2],
    ["tourmodular", "Tourmodular", modular, null, xs2],
    ["k1-s", "K1 S", full, 10980, xs2, "agv-k1-s"],
    ["k3", "K3", full, 8960, sml2, "agv-k3"],
    ["k6-s", "K6 S", full, 17480, xs2, "agv-k6-s"],
    ["eteres", "Eteres", open, 8990, sml2, "agv-eteres"],
    ["streetmodular", "Streetmodular", modular, 15990, sml2, "agv-streetmodular"],
  ] },
  { slug: "mt", brand: "MT", rows: [
    ["thunder-4-sv", "Thunder 4 SV", full, null, xs3],
    ["atom-2-sv", "Atom 2 SV", modular, null, xsTwo],
    ["braker-sv", "Braker SV", full, null, xs2],
    ["streetfighter-sv", "Streetfighter SV", modular, null, xsTwo],
    ["thunder-4-sv-pd-solid", "Thunder 4 SV PD Solid", full, 6800, undefined, "mt-thunder-4-sv-pd-solid"],
    ["atom-2-sv-pd-pure", "Atom 2 SV PD Pure", modular, 7200, undefined, "mt-atom-2-sv-pd-pure"],
    ["stinger-2", "Stinger 2", full, null, "XXS / XS / S / M / L / XL / XXL"],
    ["targo-s", "Targo S", full, null, "XXS / XS / S / M / L / XL / XXL"],
  ] },
  { slug: "bell", brand: "Bell", rows: [
    ["eliminator", "Eliminator", full, null, "XS / S / M / L / XL / XXL / XXXL"],
    ["lithium-mips", "Lithium MIPS", full, null],
    ["race-star-dlx-flex", "Race Star DLX Flex", full, null, xs2],
    ["qualifier-dlx-mips", "Qualifier DLX MIPS", full, 15090, "XS / S / M / L / XL / XXL / XXXL", "bell-qualifier-dlx-mips"],
    ["custom-500", "Custom 500", open, 10570, xs2, "bell-custom-500"],
    ["srt-modular", "SRT-Modular", modular, null, "XS / S / M / L / XL / XXL / XXXL"],
    ["mx-9-adv-mips", "MX-9 ADV MIPS", adventure, null, "XS / S / M / L / XL / XXL / XXXL"],
  ] },
  { slug: "shark", brand: "Shark", rows: [
    ["skwal-i3", "Skwal i3", full, null, xs2],
    ["spartan-gt-pro", "Spartan GT Pro", full, null, xs2],
    ["spartan-gt-pro-carbon", "Spartan GT Pro Carbon", full, null, xs2],
    ["aeron-gp-fim", "Aeron GP FIM", full, null, xs2],
    ["skwal-i3-rhad", "SKWAL i3 Rhad", full, 17499, xsTwo, "shark-skwal-i3-rhad"],
    ["spartan-gt-pro-carbon-dokhta", "Spartan GT Pro Carbon Dokhta", full, 40599, xsTwo, "shark-spartan-gt-pro-carbon-dokhta"],
    ["d-skwal-3", "D-SKWAL 3", full, null, xs2],
    ["ridill-2", "RIDILL 2", full, null, xs2],
  ] },
  { slug: "ls2", brand: "LS2", rows: [
    ["of606-drifter", "OF606 Drifter", "Hybrid", null, xsTwo],
    ["of620-classy", "OF620 Classy", open, null, xs3],
    ["of600-copter-ii", "OF600 Copter II", open, null, xsTwo],
    ["of599-spitfire-ii", "OF599 Spitfire II", open, null, xsTwo],
    ["of558-sphere-lux-ii", "OF558 Sphere Lux II", open, null, xsTwo],
    ["of616-airflow-ii", "OF616 Airflow II", open, null, xs3],
    ["of558-sphere-ii", "OF558 Sphere II", open, null, xsTwo],
    ["mx701-explorer-carbon", "MX701 Explorer Carbon", adventure, null, xs3],
    ["mx701-explorer", "MX701 Explorer", adventure, null, xs3],
    ["mx702-pioneer-ii", "MX702 Pioneer II", adventure, null, xs3],
    ["mx703-x-force-pro", "MX703 X-Force Pro", offroad, null, xs3],
    ["mx703-x-force", "MX703 X-Force", offroad, null, xs3],
    ["mx700-subverter-evo-ii", "MX700 Subverter Evo II", offroad, null, xs3],
    ["mx708-fast-ii", "MX708 Fast II", offroad, null, xxs3],
    ["ff812-kid", "FF812 Kid", full, null, "S / M / L"],
    ["of622-funny-ii", "OF622 Funny II", open, null, "S / M / L"],
    ["mx437-fast-evo-ii-mini", "MX437 Fast Evo II Mini", offroad, null, "S / M / L"],
    ["ff805-thunder-gp-aero", "FF805 Thunder GP Aero", full, null, xsTwo],
    ["ff811-vector-ii-carbon", "FF811 Vector II Carbon", full, null, xxs4],
    ["ff817-challenger-ii", "FF817 Challenger II", full, null, xxs3],
    ["ff811-vector-ii", "FF811 Vector II", full, null, xxs4],
    ["ff818-storm-iii", "FF818 Storm III", full, null, xxs3],
    ["ff808-stream-ii", "FF808 Stream II", full, null, xxs3],
    ["ff820-rapid-iii", "FF820 Rapid III", full, null, xxs3],
    ["ff901-advant-x-carbon", "FF901 Advant X Carbon", modular, null, xs3],
    ["ff901-advant-x", "FF901 Advant X", modular, null, xs3],
    ["ff906-advant", "FF906 Advant", modular, null, xs3],
    ["ff902-scope-ii", "FF902 Scope II", modular, null, xs3],
    ["ff908-strobe-ii", "FF908 Strobe II", modular, null, xs3],
    ["of601-bob-ii-carbon", "OF601 Bob II Carbon", open, null, xsTwo],
    ["of601-bob-ii", "OF601 Bob II", open, null, xsTwo],
    ["of603-infinity-ii-carbon", "OF603 Infinity II Carbon", open, null, xs3],
    ["of603-infinity-ii", "OF603 Infinity II", open, null, xs3],
    ["of618-verso-ii", "OF618 Verso II", open, null, xxs3],
    ["ff805-thunder-gp-pro", "FF805 Thunder GP Pro", full, 25990, xsTwo],
    ["ff807-dragon", "FF807 Dragon", full, 20990, xxs3],
    ["ff910-advant-ii", "FF910 Advant II", modular, 14990, xxs3],
  ] },
  { slug: "nhk", brand: "NHK", rows: [
    ["gp-r-tech-street", "GP R Tech Street", full, null, "XS / S / M / M-L / L / XL / XXL"],
    ["rx-9", "RX-9", full, null, sml],
    ["race-pro", "Race Pro", full, null, ml],
    ["terminator-2v", "Terminator 2V", full, null, ml],
    ["tr-one-1v", "TR-One 1V", full, null, sml],
    ["tr-one-2v", "TR-One 2V", full, null, sml],
    ["s2-gp-pro", "S2 GP Pro", open, null, sml],
    ["s1-gp-pro", "S1 GP Pro", open, null, sml],
    ["gp-r-tech-race", "GP R Tech Race", full, null, "XXXS / XXS / XS / S / M / L / XL / XXL"],
    ["terminator-tt", "Terminator TT", full, null, xsxl],
    ["k5r", "K5R", full, null, xs2],
    ["gp-prime", "GP Prime", full, null, sml],
  ] },
  { slug: "smk", brand: "SMK", rows: [
    ["bionic-youth", "Bionic Youth", full, null],
    ["bionic-adult", "Bionic Adult", full, null],
    ["agnar", "Agnar", full, null],
    ["titan", "Titan", full, null],
    ["titan-carbon", "Titan Carbon", full, null, xs2],
    ["allterra", "Allterra", offroad, null],
    ["ares", "Ares", adventure, null],
    ["laminar", "Laminar", open, null],
    ["retro-jet", "Retro Jet", open, null],
    ["gtj", "GTJ", open, null],
    ["delta-tour", "Delta Tour", open, null],
    ["stellar-sport", "Stellar Sport", full, null],
    ["nova", "Nova", full, null],
    ["retro", "Retro", full, null],
    ["delta-city", "Delta City", open, null],
    ["stellar", "Stellar", full, null, xs2],
    ["cygnus", "Cygnus", modular, null],
    ["typhoon", "Typhoon", full, null],
    ["gullwing", "Gullwing", modular, null],
  ] },
  { slug: "alpinestars", brand: "Alpinestars", rows: [
    ["supertech-r10", "Supertech R10", full, null, xsTwo],
    ["supertech-m10", "Supertech M10", offroad, null, xsTwo],
    ["supertech-m8", "Supertech M8", offroad, null, xsTwo],
    ["sm5", "SM5", offroad, null, xsTwo],
  ] },
];

export const helmets: Helmet[] = byBrand.flatMap(({ slug: brandSlug, brand, rows }) => rows.map(([slug, model, type, price, sizes, mediaId]) => ({
  id: `${brandSlug}-${slug}`, brand, model, type, price, slug: `${brandSlug}/${slug}`,
  ...(sizes ? { sizes } : {}), ...(mediaId ? { mediaId } : { photoPending: true }),
})));

export const helmetCatalogSource = "https://motoindexph.com/gear/helmets";
export const expectedHelmetCounts: Record<string, number> = { KYT: 9, Spyder: 10, Gille: 9, EVO: 7, SEC: 8, Arai: 6, HJC: 6, Rook: 1, Shoei: 8, Zebra: 3, HNJ: 4, AGV: 9, MT: 8, Bell: 7, Shark: 8, LS2: 37, NHK: 12, SMK: 19, Alpinestars: 4 };
export const helmetCoverage = Object.entries(expectedHelmetCounts).map(([brand, expected]) => ({ brand, expected, loaded: helmets.filter((h) => h.brand === brand).length, priced: helmets.filter((h) => h.brand === brand && h.price !== null).length }));