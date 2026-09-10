import { useMemo } from "react";
import { catalog, bikePath, publishedPrice, money } from "../catalog";
import { motorcycleBrands, brandPath } from "../brands";
import { useQuery } from "../router";
import { useApp } from "../state";
import { PageIntro, PageMeta, ShareButton, SourceNote } from "../components/PageUI";
import SourceReferences from "../components/SourceReferences";
import Icon from "../components/icons";

export default function PriceListPage() {
  const { params, setQuery } = useQuery();
  const { compareIds, toggleCompare } = useApp();
  const brand = params.get("brand") || "";
  const q = params.get("q") || "";
  const sort = params.get("sort") || "price-low";
  const rows = useMemo(() => {
    const list = catalog.filter((bike) => (!brand || bike.brand === brand) && `${bike.brand} ${bike.model}`.toLowerCase().includes(q.toLowerCase()));
    return list.sort((a, b) => sort === "az" ? `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`) : sort === "price-high" ? b.priceFrom - a.priceFrom : a.priceFrom - b.priceFrom);
  }, [brand, q, sort]);
  const lowest = rows[0];

  return <div className="inner-page"><div className="page-container">
    <PageMeta title="Motorcycle Philippines price list: current published references" description={`Compare ${catalog.length} dated motorcycle price references by brand, model and engine. Not a live dealer quotation.`} />
    <PageIntro eyebrow="The numbers, side by side" title="Motorcycle price list in the Philippines." description="Published starting prices from the local reference catalog. Open a model for variants, financing and the exact source date — then confirm the current cash quote with a dealer." breadcrumbs={[{ label: "Motorcycles", href: "/motorcycles" }, { label: "Price list" }]} action={<ShareButton />} />
    <div className="directory-filters"><label><span>Find a model</span><input className="field-input" type="search" value={q} onChange={(e) => setQuery({ q: e.target.value || undefined })} placeholder="Aerox, Click, Ninja..." /></label><label><span>Brand</span><select className="field-input" value={brand} onChange={(e) => setQuery({ brand: e.target.value || undefined })}><option value="">All brands</option>{motorcycleBrands.filter((item) => catalog.some((bike) => bike.brand === item.name)).map((item) => <option key={item.slug}>{item.name}</option>)}</select></label><label><span>Order</span><select className="field-input" value={sort} onChange={(e) => setQuery({ sort: e.target.value })}><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="az">Name A–Z</option></select></label></div>
    <p className="brand-directory-count" aria-live="polite">{rows.length} models{lowest ? ` · lowest published start ${money(Math.min(...rows.map((bike) => bike.priceFrom)))}` : ""}</p>
    <div className="brand-price-table-wrap" role="region" tabIndex={0} aria-label="Motorcycle price list"><table className="brand-price-table"><caption className="sr-only">Dated motorcycle price references</caption><thead><tr><th scope="col">Model</th><th scope="col">Published price</th><th scope="col">Engine</th><th scope="col">Seat</th><th scope="col">Transmission</th><th scope="col">Compare</th></tr></thead><tbody>{rows.map((bike) => <tr key={bike.id}><th scope="row"><a href={bikePath(bike)}>{bike.brand} {bike.model}</a><small>{bike.category[0]} · source {bike.checked}</small></th><td>{publishedPrice(bike)}</td><td>{bike.cc} cc</td><td>{bike.seat} mm</td><td>{bike.transmission}</td><td><button type="button" className="brand-table-compare" aria-pressed={compareIds.includes(bike.id)} onClick={() => toggleCompare(bike.id)}><Icon name={compareIds.includes(bike.id) ? "check" : "plus"} className="h-4 w-4" />{compareIds.includes(bike.id) ? "Added" : "Add"}</button></td></tr>)}</tbody></table></div>
    <div className="brand-family-links">{motorcycleBrands.slice(0, 8).map((item) => <a key={item.slug} href={brandPath(item)}>{item.name} brand guide<Icon name="arrowRight" className="h-4 w-4" /></a>)}</div>
    <SourceNote>A price list is a comparison aid. Variant, location, fees and promotions change the amount paid. Historical launch prices for older generations live on their own archive pages.</SourceNote>
    <SourceReferences sources={[{ label: "MotoIndex motorcycle catalog", href: "https://motoindexph.com/motorcycles" }]} />
  </div></div>;
}
