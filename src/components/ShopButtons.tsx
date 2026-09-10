import Icon from "./icons";
import { resolveShopUrl, type ShopPlatform } from "../affiliate";

function PlatformMark({ platform }: { platform: ShopPlatform }) {
  if (platform === "shopee") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
        <path d="M6.5 8.5V7.2a5.5 5.5 0 0 1 11 0v1.3h3l-1.2 12.1a1.5 1.5 0 0 1-1.5 1.4H6.2a1.5 1.5 0 0 1-1.5-1.4L3.5 8.5h3Zm2 0h7V7.2a3.5 3.5 0 0 0-7 0v1.3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M4 5.5h2.6l2.5 11.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.2L21.5 9a1 1 0 0 0-1-1.2H8.1L7.6 5.6A1 1 0 0 0 6.6 5H4v.5Zm4.7 13.2a1.6 1.6 0 1 0 0 .01v-.01Zm9.2 0a1.6 1.6 0 1 0 0 .01v-.01Z" />
    </svg>
  );
}

type Props = {
  /** Stable key for Involve overrides, e.g. helmet id or accessory id. */
  productKey?: string;
  /** Exact search text used when no override exists. */
  query: string;
  /** Accessible product name, e.g. "KYT TT-Course". */
  label: string;
  layout?: "full" | "compact" | "inline";
  className?: string;
};

/**
 * Shopee + Lazada buy buttons. Always opens in a new tab with
 * sponsored + nofollow for affiliate compliance.
 */
export default function ShopButtons({ productKey, query, label, layout = "full", className = "" }: Props) {
  const shopee = resolveShopUrl(productKey, "shopee", query);
  const lazada = resolveShopUrl(productKey, "lazada", query);

  if (layout === "inline") {
    return (
      <span className={`shop-inline ${className}`}>
        <a href={shopee.href} target="_blank" rel="sponsored nofollow noopener" aria-label={`Shop ${label} on Shopee (opens in new tab)`}>
          <PlatformMark platform="shopee" /> Shopee
        </a>
        <span aria-hidden="true">·</span>
        <a href={lazada.href} target="_blank" rel="sponsored nofollow noopener" aria-label={`Shop ${label} on Lazada (opens in new tab)`}>
          <PlatformMark platform="lazada" /> Lazada
        </a>
      </span>
    );
  }

  if (layout === "compact") {
    return (
      <div className={`shop-compact ${className}`} role="group" aria-label={`Shop ${label}`}>
        <a className="shop-btn shop-btn-shopee" href={shopee.href} target="_blank" rel="sponsored nofollow noopener" aria-label={`Check ${label} price on Shopee (opens in new tab)`}>
          <PlatformMark platform="shopee" />
          <span>Shopee</span>
        </a>
        <a className="shop-btn shop-btn-lazada" href={lazada.href} target="_blank" rel="sponsored nofollow noopener" aria-label={`Check ${label} price on Lazada (opens in new tab)`}>
          <PlatformMark platform="lazada" />
          <span>Lazada</span>
        </a>
      </div>
    );
  }

  return (
    <div className={`shop-full ${className}`} role="group" aria-label={`Where to buy ${label}`}>
      <a className="shop-btn shop-btn-shopee" href={shopee.href} target="_blank" rel="sponsored nofollow noopener">
        <PlatformMark platform="shopee" />
        <span>
          <strong>Check price on Shopee</strong>
          <small>Search: {query}</small>
        </span>
        <Icon name="external" className="h-4 w-4" />
      </a>
      <a className="shop-btn shop-btn-lazada" href={lazada.href} target="_blank" rel="sponsored nofollow noopener">
        <PlatformMark platform="lazada" />
        <span>
          <strong>Check price on Lazada</strong>
          <small>Search: {query}</small>
        </span>
        <Icon name="external" className="h-4 w-4" />
      </a>
    </div>
  );
}
