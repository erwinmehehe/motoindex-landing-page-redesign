import { useEffect, useRef, useState } from "react";
import { catalog, catalogBrands, money } from "../catalog";
import { motorcycleBrands, brandPath } from "../brands";
import { useQuery } from "../router";
import BikeTile from "../components/BikeTile";
import Icon from "../components/icons";
import { EmptyState, PageIntro, PageMeta, ShareButton, SourceNote } from "../components/PageUI";
import SourceReferences from "../components/SourceReferences";

const categories = ["All", "Scooter", "Underbone", "Naked", "Sport", "Adventure", "Cruiser", "Off-road", "Touring"];
const budgetLimit = Math.ceil(Math.max(...catalog.map((bike) => bike.priceFrom)) / 100000) * 100000;
const numberParam = (value: string | null, fallback: number) => value !== null && Number.isFinite(Number(value)) ? Number(value) : fallback;

export default function CatalogPage({ brand }: { brand?: string }) {
  const { params, setQuery } = useQuery();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const query = params.get("q") || "";
  const selectedBrand = brand || params.get("brand") || "";
  const category = params.get("category") || "All";
  const transmission = params.get("transmission") || "";
  const max = Math.max(0, numberParam(params.get("max"), budgetLimit));
  const seat = numberParam(params.get("seat"), 1000);
  const sort = params.get("sort") || "featured";
  const list = params.get("view") === "list";
  const change = (key: string, value: string) => setQuery({ page: undefined, [key]: value || undefined });
  const clear = () => setQuery({ q: undefined, brand: undefined, category: undefined, transmission: undefined, max: undefined, seat: undefined, page: undefined, sort: undefined });
  const filtered = catalog.filter((bike) => `${bike.brand} ${bike.model} ${bike.category.join(" ")}`.toLowerCase().includes(query.toLowerCase()) && (!selectedBrand || bike.brand.toLowerCase() === selectedBrand.toLowerCase()) && (category === "All" || bike.category.some((c) => c === category)) && (!transmission || bike.transmission === transmission) && bike.priceFrom <= max && bike.seat <= seat);
  if (sort === "price-low") filtered.sort((a, b) => a.priceFrom - b.priceFrom);
  if (sort === "price-high") filtered.sort((a, b) => b.priceFrom - a.priceFrom);
  if (sort === "seat") filtered.sort((a, b) => a.seat - b.seat);
  const totalPages = Math.max(1, Math.ceil(filtered.length / 9));
  const page = Math.max(1, Math.min(totalPages, Math.trunc(numberParam(params.get("page"), 1))));
  const previousPage = useRef(page);
  useEffect(() => {
    if (previousPage.current !== page) document.querySelector(".results-toolbar")?.scrollIntoView({ behavior: "instant", block: "start" });
    previousPage.current = page;
  }, [page]);
  const shown = filtered.slice((page - 1) * 9, page * 9);
  const activeCount = [selectedBrand, transmission, max < budgetLimit, seat < 1000, category !== "All"].filter(Boolean).length;

  return <div className="inner-page"><div className="page-container">
    <PageMeta title={brand ? `${brand} motorcycle prices and specs` : "Motorcycle prices and specs in the Philippines"} description="Search, filter and compare motorcycles by price, brand, riding style and seat height. Save your shortlist without an account." />
    <PageIntro eyebrow="The motorcycle index" title={brand ? `Explore ${brand}. Find your ride.` : "Your next ride. Better researched."} description="Explore the specs. Understand the trade-offs. Find a motorcycle that fits your life, not just your wishlist." action={<a href="/finder" className="action-primary"><Icon name="sparkles" className="h-4 w-4" />Find my match</a>} breadcrumbs={brand ? [{ label: "Motorcycles", href: "/motorcycles" }, { label: brand }] : [{ label: "Motorcycles" }]} />
    <div className="brand-catalog-entry">
      <a href="/brands"><Icon name="layers" className="h-4 w-4" /><span><strong>Browse by brand.</strong> Models, price lists, buying guides and FAQs.</span><Icon name="arrowRight" className="h-4 w-4" /></a>
      <nav aria-label="Motorcycle brand guides">{motorcycleBrands.slice(0, 6).map((item) => <a key={item.slug} href={brandPath(item)}>{item.name}</a>)}<a href="/brands">All {motorcycleBrands.length} brands</a></nav>
    </div>
    <nav className="page-tour-links" aria-label="More motorcycle research"><span>More ways to explore</span><a href="/motorcycle-philippines-price-list">Full price list<Icon name="arrowRight" className="h-3.5 w-3.5" /></a><a href="/motorcycles/electric">Electric motorcycles<Icon name="bolt" className="h-3.5 w-3.5" /></a><a href="/motorcycles/yamaha/aerox">Aerox generations<Icon name="arrowRight" className="h-3.5 w-3.5" /></a><a href="/motorcycles/yamaha/nmax">NMAX generations<Icon name="arrowRight" className="h-3.5 w-3.5" /></a><a href="/motorcycles/honda/click">Click family<Icon name="arrowRight" className="h-3.5 w-3.5" /></a></nav>
    <div className="catalog-search"><Icon name="search" className="h-5 w-5" /><label className="sr-only" htmlFor="catalog-query">Search motorcycles</label><input id="catalog-query" type="search" placeholder="Search a brand, model, or riding style..." value={query} onChange={(e) => change("q", e.target.value)} /><span>{catalog.length} reference models</span></div>
    <nav className="category-tabs" aria-label="Motorcycle category">{categories.map((name) => <button type="button" key={name} aria-pressed={category === name} className={category === name ? "active" : ""} onClick={() => change("category", name === "All" ? "" : name)}>{name === "All" ? "All motorcycles" : name === "Scooter" ? "Scooters" : name}</button>)}</nav>
    <div className="catalog-layout">
      <button className="filter-mobile action-secondary" onClick={() => setFiltersOpen(!filtersOpen)} type="button" aria-expanded={filtersOpen} aria-controls="catalog-filters"><Icon name="layers" className="h-4 w-4" />Filters {activeCount > 0 && `(${activeCount})`}<Icon name="chevronDown" className="ml-auto h-4 w-4" /></button>
      <aside id="catalog-filters" className={`catalog-sidebar ${filtersOpen ? "filters-open" : ""}`}><div className="filter-heading"><h2>Refine your search</h2><button type="button" onClick={clear}>Reset</button></div>
        <fieldset><legend>Brand</legend><label className="sr-only" htmlFor="catalog-brand">Filter by brand</label><select id="catalog-brand" className="field-input" value={selectedBrand} disabled={!!brand} onChange={(event) => change("brand", event.target.value)}><option value="">All brands</option>{catalogBrands.map((name) => <option key={name} value={name}>{name}</option>)}</select>{selectedBrand && motorcycleBrands.some((item) => item.name === selectedBrand) && <a className="text-link mt-3" href={brandPath(motorcycleBrands.find((item) => item.name === selectedBrand)!)}>Read the brand guide<Icon name="arrowRight" className="h-3.5 w-3.5" /></a>}</fieldset>
        <fieldset><legend>Budget ceiling</legend><output htmlFor="catalog-budget" className="filter-budget">{max >= budgetLimit ? "Any budget" : money(max)}</output><input id="catalog-budget" aria-label="Maximum starting price" type="range" min="50000" max={budgetLimit} step="10000" value={Math.max(50000, Math.min(budgetLimit, max))} onChange={(e) => change("max", Number(e.target.value) >= budgetLimit ? "" : e.target.value)} className="ranger" /><div className="range-captions"><span>PHP 50K</span><span>All prices</span></div><p className="field-help">Based on published starting price. Variant prices may be higher.</p></fieldset>
        <fieldset><legend>Transmission</legend>{["", "Automatic", "Manual"].map((name) => <label className="radio-row" key={name}><input type="radio" name="transmission" checked={transmission === name} onChange={() => change("transmission", name)} />{name || "No preference"}</label>)}</fieldset>
        <label className="field-label" htmlFor="catalog-seat">Seat height ceiling</label>
        <select id="catalog-seat" className="field-input" value={String(seat)} onChange={(e) => change("seat", e.target.value)}>
          <option value="1000">Any seat height</option><option value="750">750 mm or lower</option><option value="780">780 mm or lower</option><option value="800">800 mm or lower</option><option value="850">850 mm or lower</option>
        </select>
        <a href="/fitment" className="text-link mt-3">Check your rider fit<Icon name="arrowRight" className="h-3.5 w-3.5" /></a>
        <div className="sidebar-help"><Icon name="target" className="h-5 w-5 text-racer-500" /><h3>Not sure where to start?</h3><p>Let your budget and daily ride lead the way.</p><a href="/finder" className="text-link">Find my match<Icon name="arrowRight" className="h-4 w-4" /></a></div>
      </aside>
      <div className="catalog-main"><div className="results-toolbar"><p aria-live="polite"><strong>{filtered.length}</strong> motorcycles{activeCount > 0 ? " match your filters" : " to explore"}</p><div className="results-controls"><label className="sr-only" htmlFor="catalog-sort">Sort motorcycles</label><select id="catalog-sort" value={sort} onChange={(e) => change("sort", e.target.value)}><option value="featured">Featured first</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="seat">Lowest seat first</option></select><button type="button" className="icon-control" aria-label={list ? "Switch to grid view" : "Switch to list view"} onClick={() => change("view", list ? "" : "list")}><Icon name={list ? "layers" : "menu"} className="h-4 w-4" /></button></div></div>
        {shown.length ? <div className={list ? "catalog-list" : "catalog-grid"}>{shown.map((bike, index) => <div className="page-enter" key={bike.id} style={{ animationDelay: `${index % 3 * 55}ms` }}><BikeTile bike={bike} list={list} /></div>)}</div> : <EmptyState title="No bikes in this lane." text="Try a higher budget, a different brand, or fewer filters."><button type="button" className="action-primary" onClick={clear}>Clear filters</button></EmptyState>}
        {totalPages > 1 && <nav className="pagination" aria-label="Catalog pagination"><button disabled={page === 1} type="button" onClick={() => change("page", String(page - 1))}>Previous</button>{Array.from({ length: totalPages }, (_, i) => <button type="button" key={i} aria-current={page === i + 1 ? "page" : undefined} onClick={() => setQuery({ page: String(i + 1) })}>{i + 1}</button>)}<button disabled={page === totalPages} type="button" onClick={() => setQuery({ page: String(page + 1) })}>Next</button></nav>}
        <div className="catalog-bottom"><span>Keep the same filters when you share.</span><ShareButton label="Share this search" /></div>
        <SourceNote>{catalog.length} source-linked motorcycle records are available as local detail pages. Prices are dated references, not current dealer quotations or live inventory. The list is not a guarantee of complete market coverage.</SourceNote>
        <SourceReferences sources={[{ label: "MotoIndex catalog used as the reference dataset", href: "https://motoindexph.com/motorcycles" }]} />
      </div>
    </div>
  </div></div>;
}