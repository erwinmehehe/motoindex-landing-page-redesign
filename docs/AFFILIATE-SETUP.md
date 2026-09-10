# Involve Asia Affiliate Setup (Shopee PH + Lazada PH)

## What Is Already Built

Every helmet model page, helmet tile, helmet brand page, the helmet
comparison tool and the accessories guide now have Shopee + Lazada
**Shop buttons**:

- Helmet detail pages: full “Where to buy” section + compact buttons
  near the top (`src/pages/HelmetDetails.tsx`)
- Helmet tiles everywhere (catalog, brand pages, comparisons)
- Helmet brand pages: brand-level shop box + 2 verified official stores
- Helmet comparison table: per-model shop row
- `/accessories`: curated Shopee/Lazada picks per category
  (top boxes, phone mounts, intercoms, rain gear)

By default each button opens a **Shopee PH / Lazada PH search for the
exact product name** in a new tab, e.g.:

- `https://shopee.ph/search?keyword=KYT%20TT-Course%20helmet`
- `https://www.lazada.com.ph/catalog/?q=KYT%20TT-Course%20helmet`

Search links never go stale, unlike pasted product URLs. They earn
commission only after you connect Involve Asia (below).

## Step 1 — Join Involve Asia

1. Sign up as a Publisher at involve.asia and add `motoindexph.com`
   as your property.
2. In Advertiser Directory, apply to **Shopee Philippines** and
   **Lazada Philippines** (plus Lazada Talent PH if eligible).
3. Approval typically takes 1–3 days.

## Step 2 — Generate Deeplinks

For each product or search page you want to monetise:

1. Open the Shopee PH / Lazada PH product or search URL.
2. Copy it into Involve Dashboard → **Deeplink Generator**.
3. Select your MotoIndex property → Generate Deeplink.
4. Copy the `https://invol.co/...` tracking URL.

Prioritise by traffic: Spyder, EVO, KYT, SEC, HJC, top boxes,
then the long tail.

## Step 3 — Paste Overrides (No Code Changes Needed)

Open `src/affiliate.ts` → `AFFILIATE_OVERRIDES` and paste:

```ts
export const AFFILIATE_OVERRIDES = {
  "spyder-fury-rapid-s8": {
    shopee: "https://invol.co/PASTE-SHOPEE-DEEPLINK",
    lazada: "https://invol.co/PASTE-LAZADA-DEEPLINK",
  },
  "acc-sec-45l-alloy": {
    shopee: "https://invol.co/PASTE-SHOPEE-DEEPLINK",
  },
  "brand:evo": {
    lazada: "https://invol.co/PASTE-EVO-STORE-DEEPLINK",
  },
};
```

Keys:

- Helmet id: `brandslug-modelslug`, e.g. `kyt-tt-course`
  (see `src/helmet-catalog.ts`)
- Accessory id: `acc-*` (see `ACCESSORY_PICKS` in `src/affiliate.ts`)
- Brand box: `brand:{slug}`, e.g. `brand:spyder`

`resolveShopUrl()` prefers the override and falls back to search.

## Step 4 — Verify

- Click Shop buttons → new tab, correct product/search page.
- Check Involve dashboard clicks within a few hours.
- Confirm `rel="sponsored nofollow noopener"` is present
  (it is — see `src/components/ShopButtons.tsx`).

## Compliance Rules (Do Not Skip)

- Affiliate disclosure is rendered next to every Shop button group
  (`AffiliateDisclosure`) and in the editorial policy. Keep it.
- Never let commissions reorder rankings, prices or fitment notes.
- Never claim a search link is an official store unless verified.
  Only the two links in `OFFICIAL_STORES` are store-verified.
- Prices on Shopee/Lazada change constantly — always say
  “live prices vary by seller”, never copy a marketplace price
  as your recorded reference.
- Test purchases should use your own links sparingly; self-dealing
  can violate programme terms.

## Maintenance

- Quarterly: re-check top 20 product links and official stores.
- When a model is discontinued, keep the research page but note
  availability in the Where-to-buy section.
- Track clicks → garage saves → outbound shops as your funnel
  before optimising commission copy.
