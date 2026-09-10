import { useEffect, useRef } from "react";
import { helmets } from "../helmet-catalog";
import { helmetBrands } from "../brands";
import { useQuery } from "../router";
import { money } from "../catalog";
import HelmetTile from "./HelmetTile";
import Icon from "./icons";

export default function HelmetBrowser({ brand }: { brand?: string }) {
  const { params, setQuery } = useQuery();
  const selectedBrand = brand || params.get("brand") || "";
  const q = params.get("q") || "";
  const format = params.get("category") || params.get("format") || "";
  const maxRaw = params.get("max");
  const max = maxRaw && Number.isFinite(Number(maxRaw)) && Number(maxRaw) >= 0 ? Number(maxRaw) : Infinity;
  const pricedOnly = params.get("priced") === "1";
  const sort = params.get("sort") || "featured";
  const records = helmets.filter((helmet) => !selectedBrand || helmet.brand.toLowerCase() === selectedBrand.toLowerCase());
  const filtered = records.filter((helmet) => (!format || helmet.type === format) && (!pricedOnly || helmet.price !== null) && (max === Infinity || (helmet.price !== null && helmet.price <= max)) && `${helmet.brand} ${helmet.model}`.toLowerCase().includes(q.trim().toLowerCase()));
  filtered.sort((a, b) => {
    if (sort === "featured") return Number(!!a.photoPending) - Number(!!b.photoPending);
    if (sort === "price-low" || sort === "price-high") {
      if (a.price === null) return b.price === null ? a.model.localeCompare(b.model) : 1;
      if (b.price === null) return -1;
      return (sort === "price-high" ? b.price - a.price : a.price - b.price) || a.model.localeCompare(b.model);
    }
    return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / 12));
  const rawPage = Number(params.get("page") || 1);
  const page = Number.isFinite(rawPage) ? Math.max(1, Math.min(totalPages, Math.trunc(rawPage))) : 1;
  const previousPage = useRef(page);
  const resultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (previousPage.current !== page) resultsRef.current?.scrollIntoView({ block: "start", behavior: "instant" }); previousPage.current = page; }, [page]);
  const update = (change: Record<string, string | undefined>) => setQuery({ page: undefined, ...change });
  const clear = () => update({ q: undefined, brand: undefined, category: undefined, format: undefined, max: undefined, priced: undefined, sort: undefined });
  const shown = filtered.slice((page - 1) * 12, page * 12);
  const pricedCount = records.filter((helmet) => helmet.price !== null).length;
  const pageButtons = [...new Set([1, ...[page - 1, page, page + 1].filter((p) => p > 1 && p < totalPages), totalPages])].sort((a, b) => a - b);

  return <div className="helmet-browser">
    <div className="helmet-browser-heading"><p><strong>{records.length}</strong> {brand ? `${brand} model pages` : "helmet model pages"}<span>{pricedCount} with recorded prices / {records.length - pricedCount} price pending</span></p><a href="/gear/helmets/compare" className="text-link">Compare helmets<Icon name="arrowRight" className="h-4 w-4" /></a></div>
    <div className={`helmet-browser-filters ${brand ? "brand-locked" : ""}`}>
      <label className="helmet-browser-search"><span>Find a model</span><div><Icon name="search" className="h-4 w-4" /><input type="search" placeholder={brand ? `Search all ${brand} models...` : "Brand, model or model code..."} value={q} onChange={(event) => update({ q: event.target.value || undefined })} /></div></label>
      {!brand && <label><span>Brand</span><select value={selectedBrand} onChange={(event) => update({ brand: event.target.value || undefined, category: undefined, format: undefined })}><option value="">All 19 brands</option>{helmetBrands.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>}
      <label><span>Format</span><select value={format} onChange={(event) => update({ category: event.target.value || undefined, format: undefined })}><option value="">Every format</option>{[...new Set(records.map((helmet) => helmet.type))].sort().map((type) => <option key={type}>{type}</option>)}</select></label>
      <label><span>Budget</span><select value={max === Infinity ? "" : String(max)} onChange={(event) => update({ max: event.target.value || undefined })}><option value="">Any price, including pending</option>{[3000,5000,10000,20000,50000].map((price) => <option key={price} value={price}>Up to {money(price)}</option>)}{max !== Infinity && ![3000,5000,10000,20000,50000].includes(max) && <option value={max}>Up to {money(max)}</option>}</select></label>
    </div>
    <div className="helmet-browser-toolbar" ref={resultsRef}><p aria-live="polite">{filtered.length ? `${(page - 1) * 12 + 1}-${Math.min(page * 12, filtered.length)} of ${filtered.length} models` : "No matching models"}</p><div><label className="priced-only"><input type="checkbox" checked={pricedOnly} onChange={(event) => update({ priced: event.target.checked ? "1" : undefined })} />Recorded prices only</label><label><span className="sr-only">Sort helmet models</span><select value={sort} onChange={(event) => update({ sort: event.target.value })}><option value="featured">Photos first</option><option value="name">Name: A to Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div></div>
    {shown.length ? <div className={`helmet-grid ${brand ? "helmet-brand-grid" : ""}`}>{shown.map((helmet) => <HelmetTile key={helmet.id} helmet={helmet} />)}</div> : <div className="empty-state"><Icon name="helmet" className="h-8 w-8 text-ink-400" /><h3>No models match those filters.</h3><p>Try another format or include models with pending prices. A pending price is not a missing model.</p><button type="button" className="action-primary" onClick={clear}>Reset filters</button></div>}
    {totalPages > 1 && <nav className="pagination helmet-pagination" aria-label={`${brand || "Helmet"} model pages`}><a aria-disabled={page === 1} href={`?${new URLSearchParams({ ...Object.fromEntries(params), page: String(Math.max(1, page - 1)) })}#models`} onClick={(event) => { if (page === 1) event.preventDefault(); }}>Previous</a>{pageButtons.map((p, index) => <span key={p}>{index > 0 && p - pageButtons[index - 1] > 1 && <span className="pagination-gap">...</span>}<a href={`?${new URLSearchParams({ ...Object.fromEntries(params), page: String(p) })}#models`} aria-current={page === p ? "page" : undefined}>{p}</a></span>)}<a aria-disabled={page === totalPages} href={`?${new URLSearchParams({ ...Object.fromEntries(params), page: String(Math.min(totalPages, page + 1)) })}#models`} onClick={(event) => { if (page === totalPages) event.preventDefault(); }}>Next</a></nav>}
    <p className="helmet-browser-note">All models have local detail pages. Missing prices or photographs do not remove them from the catalog. A budget filter includes only models with a recorded price.</p>
  </div>;
}