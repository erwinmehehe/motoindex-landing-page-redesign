import { useState } from "react";
import type { Helmet } from "../resources";
import { money } from "../catalog";
import { useApp } from "../state";
import { helmetShopQuery } from "../affiliate";
import ShopButtons from "./ShopButtons";
import Icon from "./icons";

export const helmetPrice = (helmet: Helmet) => helmet.price === null ? "Price pending" : money(helmet.price);

export function HelmetImage({ helmet }: { helmet: Helmet }) {
  const [failed, setFailed] = useState(false);
  if (helmet.photoPending || failed) return <div className="helmet-placeholder"><Icon name="helmet" className="h-20 w-20" /><span>Photo not available</span></div>;
  return <img src={`https://motoindexph.com/media/helmets/${helmet.mediaId || helmet.id}.webp`} alt={`${helmet.brand} ${helmet.model}`} loading="lazy" onError={() => setFailed(true)} />;
}

export default function HelmetTile({ helmet }: { helmet: Helmet }) {
  const { bookmarks, toggleBookmark } = useApp();
  const path = `/gear/helmets/${helmet.slug}`;
  const saved = bookmarks.includes(path);
  const shopQuery = helmetShopQuery(helmet.brand, helmet.model);
  return <article className="helmet-tile"><div className="helmet-tile-media"><a href={path}><HelmetImage helmet={helmet} /></a><button type="button" className={`bike-save ${saved ? "is-saved" : ""}`} aria-label={`${saved ? "Unsave" : "Save"} ${helmet.model}`} aria-pressed={saved} onClick={() => toggleBookmark(path)}><Icon name={saved ? "heartFill" : "heart"} className="h-4 w-4" /></button></div><div className="helmet-tile-info"><p>{helmet.brand} / {helmet.type}</p><h3><a href={path}>{helmet.model}</a></h3><strong>{helmetPrice(helmet)}{helmet.price !== null && <small> published from</small>}</strong><div className="tile-actions"><a className="text-link" href={path}>Explore this helmet<Icon name="arrowRight" className="h-4 w-4" /></a><ShopButtons productKey={helmet.id} query={shopQuery} label={`${helmet.brand} ${helmet.model}`} layout="inline" /></div></div></article>;
}