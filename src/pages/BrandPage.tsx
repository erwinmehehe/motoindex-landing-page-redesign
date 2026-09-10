import { useMemo } from "react";
import { brandPath, type BrandProfile } from "../brands";
import { catalog, bikePath, money, publishedPrice } from "../catalog";
import { helmets } from "../resources";
import { pageByPath } from "../content";
import { sourceUrl } from "../seo";
import { useQuery } from "../router";
import { useApp } from "../state";
import { downloadText } from "../utils/storage";
import BikeTile from "../components/BikeTile";
import { helmetPrice } from "../components/HelmetTile";
import ShopButtons from "../components/ShopButtons";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { brandShopQuery, OFFICIAL_STORES } from "../affiliate";
import { Breadcrumbs, PageMeta, ShareButton, SourceNote } from "../components/PageUI";
import Icon from "../components/icons";
import { brandPriceBand } from "./BrandDirectoryPage";
import SourceReferences from "../components/SourceReferences";
import { modelFamilies } from "../model-history";
import HelmetBrowser from "../components/HelmetBrowser";

const resourceLinks: Record<string, { label: string; href: string }> = {
  honda: { label: "Honda Philippines maintenance planner", href: "https://www.hondaph.com/service-calculator" },
  yamaha: { label: "Yamaha Philippines After Sales", href: "https://aftersales.yamaha-motor.com.ph/" },
  suzuki: { label: "Suzuki Philippines After Sales", href: "https://mc.suzuki.com.ph/after-sales/" },
  ktm: { label: "KTM Philippines service resources", href: "https://www.ktm.com/en-ph/service.html" },
};
const shortDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : date;

export default function BrandPage({ brand }: { brand: BrandProfile }) {
  const { params, setQuery } = useQuery();
  const { compareIds, toggleCompare, bookmarks, toggleBookmark, notify } = useApp();
  const isHelmet = brand.kind === "helmet";
  const path = brandPath(brand);
  const query = params.get("q") || "";
  const selectedCategory = params.get("category") || params.get("format") || "";
  const maxPrice = params.get("max") && Number.isFinite(Number(params.get("max"))) ? Number(params.get("max")) : Infinity;
  const onlyPriced = params.get("priced") === "1";
  const sort = params.get("sort") === "price-high" ? "price-high" : "price-low";
  const bikeModels = useMemo(() => catalog.filter((bike) => bike.brand === brand.name), [brand.name]);
  const helmetModels = useMemo(() => helmets.filter((helmet) => helmet.brand === brand.name), [brand.name]);
  const importedCount = isHelmet ? helmetModels.length : bikeModels.length;
  const displayedBikes = bikeModels.filter((bike) => bike.model.toLowerCase().includes(query.trim().toLowerCase()) && (!selectedCategory || bike.category.some((category) => category === selectedCategory))).sort((a, b) => sort === "price-high" ? b.priceFrom - a.priceFrom : a.priceFrom - b.priceFrom);
  const displayedHelmets = helmetModels.filter((helmet) => helmet.model.toLowerCase().includes(query.trim().toLowerCase()) && (!selectedCategory || helmet.type === selectedCategory) && (!onlyPriced || helmet.price !== null) && (maxPrice === Infinity || (helmet.price !== null && helmet.price <= maxPrice))).sort((a, b) => {
    if (a.price === null) return b.price === null ? 0 : 1;
    if (b.price === null) return -1;
    return sort === "price-high" ? b.price - a.price : a.price - b.price;
  });
  const shownCount = isHelmet ? displayedHelmets.length : displayedBikes.length;
  const rawSource = sourceUrl(path);
  const resource = resourceLinks[brand.slug];
  const families = isHelmet ? [] : modelFamilies.filter((family) => family.brand === brand.name);
  const intro = isHelmet
    ? `Compare ${brand.name} helmet models, types, sizes and published price references. Open an individual model to check fit, certification and the exact local unit before buying.`
    : `Compare current ${brand.name} motorcycle prices, engine specifications, seat heights and ownership details in one place. Open a model for financing estimates, rider fit, maintenance and alternatives.`;
  const faq = isHelmet ? [
    { q: `How much is a ${brand.name} helmet in the Philippines?`, a: brand.priceFrom === undefined ? "The original brand index does not list a published price band for this brand. Check the exact product and seller; a pending price is not a zero price or a claim that a helmet is unavailable." : `The fetched brand index reports observed prices of ${brandPriceBand(brand)} across priced records. Graphics, visor bundles, size, seller and promotions can change what you pay. These are published observations, not guaranteed manufacturer SRPs.` },
    { q: `How many ${brand.name} helmets can I explore here?`, a: `This application includes ${importedCount} local ${brand.name} model ${importedCount === 1 ? "page" : "pages"}, with price context, fit checks and a saved reading list. The broader source index tracks ${brand.sourceCount} models. A tracked model and a model with a published price are not the same thing.` },
    { q: `What types of ${brand.name} helmets are listed?`, a: `The original index lists ${brand.categories.join(", ").toLowerCase()} formats. Check the exact model's coverage, weight, ventilation, visor arrangement and certification rather than assuming all helmets from a brand are equivalent.` },
    { q: `Are ${brand.name} helmets certified for the Philippines?`, a: "Certification can vary by model, market and production unit. Check the applicable PS or ICC marking and certification label on the actual helmet sold locally. A brand-level page is not verification of an individual unit." },
    { q: `How do I choose my ${brand.name} helmet size?`, a: "Use the manufacturer's chart and measuring instructions for the exact model, then try it on when possible. Head shape, crown fit and cheek pads matter. A familiar letter size does not guarantee the same fit across shell families." },
  ] : [
    { q: `Is this the complete ${brand.name} motorcycle lineup in the Philippines?`, a: `This page contains ${importedCount} locally available model records. The source brand snapshot lists ${brand.sourceCount}, and the manufacturer's lineup may be broader or change over time. Every model shown opens a full local detail page; missing model coverage is not treated as proof that a bike is unavailable.` },
    { q: `How many ${brand.name} motorcycles are covered here?`, a: `There are ${importedCount} imported current-model records on this redesigned page. The fetched original brand hub lists ${brand.sourceCount}.${brand.archives ? ` Older ${brand.name} model references remain linked in a separate archive, so their historical prices are not mixed with the current lineup.` : ""}` },
    { q: `How much are ${brand.name} motorcycles in the Philippines?`, a: `The original brand-page snapshot reports published pricing of ${brandPriceBand(brand)}, with its latest source check listed as ${shortDate(brand.checked!)}. Variant, dealer, location, added fees and financing can change the amount paid. The price table here labels the source date for every imported model.` },
    { q: `What is the lowest-priced imported ${brand.name} motorcycle?`, a: (() => { const lowest = [...bikeModels].sort((a, b) => a.priceFrom - b.priceFrom)[0]; return lowest ? `${brand.name} ${lowest.model} is the lowest-priced model in this imported set, starting at ${money(lowest.priceFrom)}. This is a dated reference, not a claim about all current dealer offers. Open the original source before purchase.` : "Check the original dated brand price table; there are no imported prices to rank."; })() },
    { q: `Are these ${brand.name} prices official dealer quotes?`, a: "No. Published references can be manufacturer SRPs, dealer observations or comparison-site prices. They are not guaranteed transaction quotes. Open the exact model source and confirm the variant, cash price, processing fees, registration and current promotions with the seller." },
  ];

  const exportPrices = () => {
    const rows: (string | number)[][] = isHelmet
      ? [["Model", "Format", "Published starting PHP", "Model URL"], ...displayedHelmets.map((helmet) => [helmet.model, helmet.type, helmet.price ?? "Price pending", `${window.location.origin}/gear/helmets/${helmet.slug}`])]
      : [["Model", "Published from PHP", "Published to PHP", "Engine cc", "Seat mm", "Transmission", "Source date", "Model URL"], ...displayedBikes.map((bike) => [bike.model, bike.priceFrom, bike.priceTo || bike.priceFrom, bike.cc, bike.seat, bike.transmission, bike.checked, `${window.location.origin}${bikePath(bike)}`])];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    downloadText(`motoindex-${brand.slug}-${isHelmet ? "helmet" : "motorcycle"}-price-references.csv`, csv, "text/csv;charset=utf-8");
    notify("Dated price references downloaded. Confirm current seller quotes.");
  };

  return (
    <div className="inner-page brand-profile-page"><div className="page-container">
      <PageMeta title={`${brand.name} ${isHelmet ? "helmet prices, models and buying guide" : "motorcycle prices and models"} Philippines`} description={intro} />
      <Breadcrumbs items={[{ label: isHelmet ? "Helmet brands" : "Motorcycle brands", href: isHelmet ? "/gear/helmets/brands" : "/brands" }, { label: brand.name }]} />
      <header className="brand-profile-heading">
        <div>
          <p className="page-eyebrow">The {brand.name} index</p>
          <h1><span className={`brand-wordmark wordmark-${brand.slug}`} style={{ color: brand.color }}>{brand.name}</span>{" "}<span>{isHelmet ? "Helmet prices & models" : "Motorcycles"} in the Philippines.</span></h1>
          <p>{intro}</p>
          <div className="brand-profile-actions"><a href="#models" className="action-primary">Explore {brand.name} models<Icon name="arrowRight" className="h-4 w-4" /></a><a href="#price-list" className="action-secondary">See the price list</a></div>
        </div>
        <div className="brand-profile-aside"><p>{brand.description}</p><a href={isHelmet ? "/gear/helmets/brands" : "/brands"} className="text-link">Explore another brand<Icon name="arrowUpRight" className="h-4 w-4" /></a></div>
      </header>

      <nav className="brand-section-nav" aria-label={`On this ${brand.name} page`}>
        {[['models', 'Models'], ['price-list', 'Price list'], ['categories', 'Riding categories'], ['research', 'Buying guide'], ['support', isHelmet ? 'Fit & care' : 'Ownership support'], ...(brand.archives ? [['archive', 'Older models']] : []), ['faq', 'FAQs']].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section className="brand-page-section" id="models">
        <div className="section-line-heading"><div><p className="page-eyebrow">Get to know the lineup</p><h2>{brand.name} models to explore.</h2></div><a href={`${isHelmet ? "/gear/helmets" : "/motorcycles"}?brand=${encodeURIComponent(brand.name)}`} className="text-link">Browse with all filters<Icon name="arrowRight" className="h-4 w-4" /></a></div>
        <p className="brand-section-copy">{isHelmet ? `All ${importedCount} detailed ${brand.name} records from the source catalog are available here. The broader tracked brand list contains ${brand.sourceCount} names; not all have a detailed product record or a published price.` : importedCount === brand.sourceCount ? `${importedCount} model records from the fetched brand snapshot.` : `${importedCount} imported model records from a source catalog tracking ${brand.sourceCount}.`} {isHelmet ? "Fit and certification still need checking on the exact unit." : "Compare price, engine size, seat height and transmission before narrowing your shortlist."}</p>
        {isHelmet ? <HelmetBrowser brand={brand.name} /> : <div className="brand-model-preview">{bikeModels.slice(0, 3).map((bike) => <BikeTile bike={bike} key={bike.id} />)}</div>}
        <a href="#price-list" className="text-link brand-all-models-link">View all {importedCount} imported models in the price table<Icon name="chevronDown" className="h-4 w-4" /></a>
      </section>

      <section className="brand-page-section" id="price-list">
        <div className="section-line-heading"><div><p className="page-eyebrow">The numbers, in context</p><h2>{brand.name} {isHelmet ? "helmet" : "motorcycle"} price list.</h2></div><div className="brand-table-actions"><ShareButton label="Share page" /><button type="button" className="action-secondary" onClick={exportPrices}><Icon name="doc" className="h-4 w-4" />Export prices</button></div></div>
        <p className="brand-section-copy">Use these published references as a dated comparison starting point, not a current dealer quote. {brand.checked ? `The original brand page lists its latest update as ${shortDate(brand.checked)}.` : "The broader tracked helmet catalog and the set of priced model records are not the same thing."}</p>
        {isHelmet && (() => { const store = OFFICIAL_STORES.find((s) => s.brand.toLowerCase() === brand.name.toLowerCase()); return (
          <div className="brand-shop-box">
            <div>
              <p className="page-eyebrow">Shop {brand.name}</p>
              <p className="brand-shop-copy">Compare live {brand.name} listings on both platforms. Prefer official stores and check the exact model, size and PS/ICC markings.</p>
            </div>
            <ShopButtons productKey={`brand:${brand.slug}`} query={brandShopQuery(brand.name)} label={`${brand.name} helmets`} layout="compact" />
            {store && <a className="official-store-link" href={store.href} target="_blank" rel="sponsored nofollow noopener"><Icon name="shield" className="h-4 w-4" />{store.label}<Icon name="external" className="h-3.5 w-3.5" /></a>}
            <AffiliateDisclosure compact />
          </div>
        ); })()}
        <div className="brand-table-filter"><label><Icon name="search" className="h-4 w-4" /><span className="sr-only">Find a {brand.name} model in the price table</span><input type="search" placeholder={`Find a ${brand.name} model...`} value={query} onChange={(event) => setQuery({ q: event.target.value || undefined })} /></label><span aria-live="polite">{shownCount} of {importedCount} models{selectedCategory ? ` / ${selectedCategory}` : ""}</span>{(query || selectedCategory) && <button type="button" className="text-link" onClick={() => setQuery({ q: undefined, category: undefined })}>Clear filters</button>}</div>
        <div className="brand-price-table-wrap" role="region" aria-label={`${brand.name} price comparison table`} tabIndex={0}>
          <table className="brand-price-table"><caption className="sr-only">Dated {brand.name} model references in the redesign preview</caption><thead><tr>
            <th scope="col">Model</th>
            <th scope="col" aria-sort={sort === "price-high" ? "descending" : "ascending"}><button type="button" onClick={() => setQuery({ sort: sort === "price-low" ? "price-high" : "price-low" })}>Published price<Icon name="chevronDown" className={`h-3.5 w-3.5 ${sort === "price-high" ? "rotate-180" : ""}`} /></button></th>
            {isHelmet ? <><th scope="col">Format</th><th scope="col">Size range</th></> : <><th scope="col">Engine</th><th scope="col">Seat</th><th scope="col">Transmission</th></>}
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr></thead><tbody>
            {isHelmet ? displayedHelmets.map((helmet) => <tr key={helmet.id}><th scope="row"><a href={`/gear/helmets/${helmet.slug}`}>{helmet.model}<Icon name="arrowUpRight" className="h-3.5 w-3.5" /></a></th><td>{helmetPrice(helmet)}<small>{helmet.price === null ? "No priced record imported" : "Starting seller reference"}</small></td><td>{helmet.type}</td><td>{helmet.sizes || "Check the exact model"}</td><td><button type="button" className="brand-table-save" aria-pressed={bookmarks.includes(`/gear/helmets/${helmet.slug}`)} aria-label={`Save ${helmet.brand} ${helmet.model}`} onClick={() => toggleBookmark(`/gear/helmets/${helmet.slug}`)}><Icon name={bookmarks.includes(`/gear/helmets/${helmet.slug}`) ? "heartFill" : "heart"} className="h-4 w-4" /></button></td></tr>)
              : displayedBikes.map((bike) => <tr key={bike.id}><th scope="row"><a href={bikePath(bike)}>{bike.model}<Icon name="arrowUpRight" className="h-3.5 w-3.5" /></a><small>{bike.category[0]}</small></th><td>{publishedPrice(bike)}<small>Source: {shortDate(bike.checked)}</small></td><td>{bike.cc} cc</td><td>{bike.seat} mm</td><td>{bike.transmission}</td><td><button type="button" className="brand-table-compare" aria-pressed={compareIds.includes(bike.id)} onClick={() => toggleCompare(bike.id)}><Icon name={compareIds.includes(bike.id) ? "check" : "plus"} className="h-4 w-4" />{compareIds.includes(bike.id) ? "Added" : "Compare"}</button></td></tr>)}
            {!shownCount && <tr><td colSpan={isHelmet ? 5 : 6} className="brand-table-empty">No local model records match this filter. <button type="button" onClick={() => setQuery({ q: undefined, category: undefined })}>Clear your filters</button> or <a href={isHelmet ? "/gear/helmets" : "/motorcycles"}>explore all models.</a></td></tr>}
          </tbody></table>
        </div>
        <p className="brand-table-source"><Icon name="shield" className="h-4 w-4" /><span>{importedCount} local model pages. Published prices are dated references, not current dealer quotations. Source citations are available at the end of this page.</span></p>
      </section>

      <section className="brand-page-section" id="categories"><div className="brand-editorial-columns"><div><p className="page-eyebrow">Start with how you ride</p><h2>{isHelmet ? `${brand.name} helmet formats.` : `Categories in the ${brand.name} coverage.`}</h2><p className="brand-section-copy">{isHelmet ? "A higher price or a familiar name does not, by itself, prove better fit or protection. Compare the exact format and model." : "The original brand coverage spans these riding categories. Select one to focus the imported model table; the source catalog may include more models."}</p></div><ul className="brand-category-list">{brand.categories.map((category) => <li key={category}><a href={`${path}?${new URLSearchParams({ category })}#price-list`}>{category}<Icon name="arrowRight" className="h-4 w-4" /></a></li>)}</ul></div></section>

      <section className="brand-page-section" id="research"><div className="brand-editorial-columns"><div><p className="page-eyebrow">The {brand.name} buying guide</p><h2>{isHelmet ? "Fit first. Details always." : `Before choosing a ${brand.name} motorcycle.`}</h2><p className="brand-section-copy">{isHelmet ? "Use the brand as a starting point, then make the buying decision at exact-model level." : "Start with your budget and intended use, then compare engine size, seat height, transmission and local ownership support."}</p></div>
        <div className="brand-buying-steps">{(isHelmet ? [
          ["Understand why prices differ", "Graphics, shell materials, visor bundles, size availability and promotions can change a helmet's price. Compare the exact variant and seller instead of treating a brand-wide price band as a quote."],
          ["Check the model's fit and size", `Follow the manufacturer's measuring instructions and size chart for the exact ${brand.name} model. Check even crown support, secure retention and cheek-pad contact. A pressure point may be a shape mismatch, not a reason to simply size up.`],
          ["Inspect the local unit's markings", "Inspect the applicable PS or ICC conformity marking and the actual certification label. Different market versions or batches may differ; a listing photograph is not enough to verify the helmet in front of you."],
          ["Confirm what is included", "Check whether a spare visor is included, which sizes are in stock and whether replacement liners, cheek pads and visor parts are available. Inspect the retention strap and visor latch before leaving the shop."],
        ] : [
          ["Check the price date", "Prices are dated reference points. Open the model page to see the source and confirm the current cash price, fees and variant with the seller."],
          ["Compare fit and use", "Engine size, seat height, weight, transmission and tire data help narrow the shortlist, but actual rider fit and comfort still need an in-person check."],
          ["Confirm local support", "Dealer reach, parts, service intervals and warranty support matter after purchase. Use the official brand resources referenced by the original page when available."],
        ]).map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      </div></section>

      <section className="brand-page-section" id="support"><div className="brand-editorial-columns"><div><p className="page-eyebrow">After the purchase</p><h2>{isHelmet ? `${brand.name} fit, spares & care.` : `${brand.name} dealers, service & owner resources.`}</h2></div><div className="brand-support-copy"><p>{brand.support}</p>{isHelmet ? <><p>Follow the manufacturer guidance after an impact and for replacement intervals. Inspect condition, retention and fit regularly; the receipt date alone does not establish the helmet's service life.</p><a href="/guides/motorcycle-helmet-size-guide" className="text-link">Use the helmet-fit checklist<Icon name="arrowRight" className="h-4 w-4" /></a></> : <><a href={`/dealers?brand=${encodeURIComponent(brand.name)}`} className="text-link">Find a dealer in this directory<Icon name="arrowRight" className="h-4 w-4" /></a><a className="text-link" href="/maintenance">Explore maintenance & owner guides<Icon name="arrowRight" className="h-4 w-4" /></a><a className="text-link" href="/ownership/safety-campaigns">Check service-campaign guidance<Icon name="arrowRight" className="h-4 w-4" /></a></>}</div></div></section>

      {brand.archives && <section className="brand-page-section" id="archive"><div className="section-line-heading"><div><p className="page-eyebrow">Still useful. Clearly separate.</p><h2>Older {brand.name} models.</h2></div><span>Local owner & used-bike guides</span></div><p className="brand-section-copy">Explore the historical price, full specifications, running-cost planner and used-bike checklist for each generation, right here.</p><div className="brand-archive-links">{brand.archives.map((archive) => <a href={archive.path} key={archive.path}><div><h3>{brand.name} {archive.name}</h3><p>{archive.context}</p></div><Icon name="arrowRight" className="h-5 w-5" /></a>)}</div>{families.length > 0 && <div className="brand-family-links">{families.map((family) => <a key={family.path} href={family.path}>{family.brand} {family.name} generation guide<Icon name="arrowRight" className="h-4 w-4" /></a>)}</div>}</section>}

      <section className="brand-page-section" id="faq"><div className="brand-editorial-columns"><div><p className="page-eyebrow">A few good questions</p><h2>{brand.name} {isHelmet ? "helmet" : "motorcycle"} FAQs.</h2><p className="brand-section-copy">Price context, model coverage and the checks worth doing before you buy.</p></div><div className="brand-faq">{faq.map((item) => <details key={item.q}><summary>{item.q}<Icon name="plus" className="h-4 w-4" /></summary><p>{item.a}</p></details>)}</div></div></section>

      <section className="brand-page-section brand-related-guides"><div className="section-line-heading"><h2>Keep the research connected.</h2><a href="/guides" className="text-link">All guides<Icon name="arrowRight" className="h-4 w-4" /></a></div><div>{brand.guides.map((href) => <a key={href} href={href}><Icon name={pageByPath.get(href)?.icon || "doc"} className="h-5 w-5 text-racer-500" /><span>{pageByPath.get(href)?.title || (href === "/recommendations" ? "Motorcycle buying guides" : "Maintenance & parts guides")}</span><Icon name="arrowUpRight" className="h-4 w-4" /></a>)}</div></section>
      <SourceNote>Model details, comparisons, archive guides and planning tools open locally in this application. Prices and specifications remain dated reference records; verify the exact local variant and current seller quote before buying.</SourceNote>
      <SourceReferences sources={[{ label: `${brand.name} brand record used as a source`, href: rawSource }, ...(resource ? [resource] : [])]} note="The brand guide, price table, model links, FAQs and ownership guidance are built into this page. External resources are citations only." />
    </div></div>
  );
}