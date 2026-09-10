/**
 * Involve Asia affiliate shopping for MotoIndex PH.
 *
 * How it works:
 * 1. By default every Shop button links to a Shopee PH / Lazada PH *search*
 *    for the exact product name (stable, never a dead product URL).
 * 2. After approval in Involve Asia, paste generated deeplinks into
 *    AFFILIATE_OVERRIDES below (or a CMS field with the same shape).
 *    Overrides take precedence automatically — no component changes needed.
 * 3. All affiliate anchors must use rel="sponsored nofollow noopener"
 *    (handled by <ShopButtons />) plus the on-page disclosure.
 */

export type ShopPlatform = "shopee" | "lazada";

export const AFFILIATE_CONFIG = {
  network: "Involve Asia",
  disclosureShort:
    "Affiliate links: MotoIndex may earn a commission if you buy through Shopee or Lazada links, at no extra cost to you.",
  disclosureLong:
    "MotoIndex participates in affiliate programmes via Involve Asia. Shop buttons open Shopee PH or Lazada PH in a new tab. If you complete a purchase, MotoIndex may earn a commission at no extra cost to you. Rankings, prices and recommendations are editorial and are never sold — commissions do not change model order, specifications or fitment notes.",
} as const;

/** Verified official / flagship stores found during research (Feb 2026). */
export const OFFICIAL_STORES: { brand: string; platform: ShopPlatform; label: string; href: string }[] = [
  {
    brand: "EVO",
    platform: "lazada",
    label: "EVO Helmets Philippines — Lazada flagship store",
    href: "https://www.lazada.com.ph/shop/evo-helmets-philippines/",
  },
  {
    brand: "Spyder",
    platform: "lazada",
    label: "Spyder Adventure Outlets — Lazada official store",
    href: "https://www.lazada.com.ph/shop/spyder-adventure-outlets",
  },
];

/**
 * Paste Involve Asia deeplinks here once generated.
 * Key = helmet id (e.g. "spyder-fury-rapid-s8"), accessory id
 * (e.g. "acc-sec-45l-alloy") or brand key (e.g. "brand:evo").
 * Value = full Involve tracking URL per platform.
 */
export const AFFILIATE_OVERRIDES: Record<string, Partial<Record<ShopPlatform, string>>> = {
  // Example (replace with your real Involve deeplinks):
  // "spyder-fury-rapid-s8": {
  //   shopee: "https://invol.co/xxxxxx",
  //   lazada: "https://invol.co/yyyyyy",
  // },
};

export const shopeeSearchUrl = (query: string) =>
  `https://shopee.ph/search?keyword=${encodeURIComponent(query)}`;

export const lazadaSearchUrl = (query: string) =>
  `https://www.lazada.com.ph/catalog/?q=${encodeURIComponent(query)}`;

/** Exact-match-first query: brand + model + "helmet" keeps results relevant. */
export const helmetShopQuery = (brand: string, model: string) => `${brand} ${model} helmet`;

export const brandShopQuery = (brand: string) => `${brand} helmet official store`;

export function resolveShopUrl(
  productKey: string | undefined,
  platform: ShopPlatform,
  fallbackQuery: string,
): { href: string; isAffiliateOverride: boolean } {
  const override = productKey ? AFFILIATE_OVERRIDES[productKey]?.[platform] : undefined;
  if (override) return { href: override, isAffiliateOverride: true };
  const href = platform === "shopee" ? shopeeSearchUrl(fallbackQuery) : lazadaSearchUrl(fallbackQuery);
  return { href, isAffiliateOverride: false };
}

export type AccessoryProduct = {
  id: string;
  name: string;
  blurb: string;
  query: string;
  priceHint?: string;
  badge?: string;
};

/** Curated accessory picks per tab on /accessories. Queries target PH listings. */
export const ACCESSORY_PICKS: Record<string, AccessoryProduct[]> = {
  "Top boxes": [
    {
      id: "acc-sec-45l-alloy",
      name: "SEC 45L Alloy Top Box with backrest",
      blurb: "The default Filipino touring setup. Confirm the exact bracket for your model year.",
      query: "SEC 45L alloy top box Philippines",
      priceHint: "≈ ₱3,400–₱5,000",
      badge: "Most popular",
    },
    {
      id: "acc-sec-32l",
      name: "SEC 32L Top Box",
      blurb: "Lighter city option for daily commuting. Check base-plate compatibility.",
      query: "SEC top box 32L motorcycle Philippines",
      priceHint: "≈ ₱2,400–₱3,200",
    },
    {
      id: "acc-topbox-bracket",
      name: "Model-specific top box bracket",
      blurb: "Search with your exact model (e.g. “NMAX V3 top box bracket”) — brackets are not universal.",
      query: "motorcycle top box bracket Philippines",
      badge: "Fitment first",
    },
  ],
  "Phone mounts": [
    {
      id: "acc-motowolf-mount",
      name: "Motowolf vibration-damp phone holder",
      blurb: "The common PH pick. Verify handlebar diameter and steering clearance.",
      query: "Motowolf phone holder motorcycle Philippines",
      priceHint: "≈ ₱600–₱1,200",
      badge: "Rider favourite",
    },
    {
      id: "acc-mirror-mount",
      name: "Mirror-stem phone mount",
      blurb: "Alternative when the handlebar has no free space. Check mirror thread size.",
      query: "motorcycle mirror phone mount Philippines",
    },
  ],
  Intercoms: [
    {
      id: "acc-freedconn",
      name: "FreedConn / budget Bluetooth intercom",
      blurb: "Entry pairing and music. Confirm speaker-pocket fit in your exact helmet.",
      query: "FreedConn intercom helmet Philippines",
      priceHint: "≈ ₱1,500–₱3,500",
      badge: "Best value",
    },
    {
      id: "acc-intercom-mesh",
      name: "Mid-range mesh intercom",
      blurb: "For group rides. Check battery life, waterproof rating and clamp vs adhesive mount.",
      query: "motorcycle intercom headset Philippines",
    },
  ],
  "Rain gear": [
    {
      id: "acc-raincoat-set",
      name: "Two-piece motorcycle raincoat set",
      blurb: "Size over your riding gear. Look for sealed seams and reflective strips.",
      query: "motorcycle raincoat set Philippines",
      priceHint: "≈ ₱500–₱1,500",
      badge: "Monsoon essential",
    },
    {
      id: "acc-waterproof-gloves",
      name: "Waterproof riding gloves",
      blurb: "Cold, wet hands lose grip. Check touchscreen tips and cuff length.",
      query: "waterproof motorcycle gloves Philippines",
    },
    {
      id: "acc-boot-covers",
      name: "Waterproof boot covers",
      blurb: "Cheap insurance for flooded EDSA commutes. Confirm sole grip.",
      query: "motorcycle rain boot cover Philippines",
    },
  ],
};
