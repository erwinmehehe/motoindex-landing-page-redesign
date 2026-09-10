import { useState } from "react";
import { bikePath, money, type CatalogBike } from "../catalog";
import { useApp } from "../state";
import Icon from "./icons";

export function BikeImage({ bike, className = "", eager = false }: { bike: CatalogBike; className?: string; eager?: boolean }) {
  const [failedSource, setFailedSource] = useState("");
  const mediaId = bike.id === "kawasaki-klx-150" ? "kawasaki-klx150" : bike.id;
  const source = bike.photo || `https://motoindexph.com/media/motorcycles/${mediaId}.webp`;
  if (failedSource === source) return <div className={`bike-image-placeholder ${className}`}><Icon name={bike.category.includes("Scooter") ? "scooter" : "naked"} className="h-20 w-20" /><span>Photo not available</span></div>;
  return <img src={source} alt={`${bike.brand} ${bike.model}`} className={className} onError={() => setFailedSource(source)} loading={eager ? "eager" : "lazy"} />;
}

export default function BikeTile({ bike, list = false }: { bike: CatalogBike; list?: boolean }) {
  const { savedIds, compareIds, toggleSaved, toggleCompare } = useApp();
  const saved = savedIds.includes(bike.id);
  const compared = compareIds.includes(bike.id);
  return <article className={`bike-tile ${list ? "bike-tile-list" : ""}`}>
    <div className="bike-tile-media"><a href={bikePath(bike)} aria-label={`Explore ${bike.brand} ${bike.model}`}><BikeImage bike={bike} /></a><button type="button" className={`bike-save ${saved ? "is-saved" : ""}`} aria-label={`${saved ? "Unsave" : "Save"} ${bike.model}`} aria-pressed={saved} onClick={() => toggleSaved(bike.id)}><Icon name={saved ? "heartFill" : "heart"} className="h-[19px] w-[19px]" /></button></div>
    <div className="bike-tile-info"><div className="bike-tile-brand"><span>{bike.brand}</span><span>{bike.category[0]}</span></div><h3><a href={bikePath(bike)}>{bike.model}</a></h3><p className="bike-tile-price">{money(bike.priceFrom)}<span>{bike.priceTo ? " starting price" : " published price"}</span></p><div className="bike-tile-specs"><span>{bike.cc} cc</span><span>{bike.transmission}</span><span>{bike.seat} mm seat</span></div><div className="bike-tile-actions"><a href={bikePath(bike)}>Explore bike<Icon name="arrowRight" className="h-4 w-4" /></a><button type="button" onClick={() => toggleCompare(bike.id)} aria-pressed={compared}><Icon name={compared ? "check" : "plus"} className="h-4 w-4" />{compared ? "Added" : "Compare"}</button></div></div>
  </article>;
}