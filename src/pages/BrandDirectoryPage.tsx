import { motorcycleBrands, helmetBrands, brandPath, type BrandProfile } from "../brands";
import { useQuery } from "../router";
import { PageIntro, PageMeta, EmptyState, SourceNote } from "../components/PageUI";
import { money } from "../catalog";
import Icon from "../components/icons";

export function brandPriceBand(brand: BrandProfile) {
  if (brand.priceFrom === undefined) return "Check individual model prices";
  return brand.priceFrom === brand.priceTo ? money(brand.priceFrom) : `${money(brand.priceFrom)} - ${money(brand.priceTo!)}`;
}

export default function BrandDirectoryPage({ helmets = false }: { helmets?: boolean }) {
  const { params, setQuery } = useQuery();
  const query = params.get("q") || "";
  const order = params.get("sort") || "featured";
  const category = params.get("category") || "";
  const brands = helmets ? helmetBrands : motorcycleBrands;
  const categories = [...new Set(brands.flatMap((brand) => brand.categories))].sort();
  const filtered = brands.filter((brand) => `${brand.name} ${brand.description}`.toLowerCase().includes(query.trim().toLowerCase()) && (!category || brand.categories.includes(category)));
  if (order === "az") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (order === "price") filtered.sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));

  return (
    <div className="inner-page brand-directory-page"><div className="page-container">
      <PageMeta title={helmets ? "Helmet brands Philippines: models, fit and prices" : "Motorcycle brands in the Philippines: models, prices and guides"} description="Explore dedicated MotoIndex brand pages with published price references, models, buying guidance, FAQs and links to the original sources." />
      <PageIntro
        eyebrow="The MotoIndex brand directory"
        title={helmets ? "The name is a starting point. The fit is personal." : "Your favourite brands. A little better understood."}
        description={helmets ? "Compare helmet brands, then make the choice at model level. Clear price context, practical fit guidance and no brand-based safety rankings." : "From your first city scooter to your next big adventure. Explore the models, compare the prices and get to know the details behind each name."}
        breadcrumbs={[{ label: "Brands", ...(helmets ? { href: "/brands" } : {}) }, ...(helmets ? [{ label: "Helmet brands" }] : [])]}
      />
      <nav className="brand-directory-tabs" aria-label="Brand directory type">
        <a href="/brands" aria-current={!helmets ? "page" : undefined}><Icon name="scooter" className="h-4 w-4" />Motorcycle brands<span>{motorcycleBrands.length}</span></a>
        <a href="/gear/helmets/brands" aria-current={helmets ? "page" : undefined}><Icon name="helmet" className="h-4 w-4" />Helmet brands<span>{helmetBrands.length}</span></a>
      </nav>
      <div className="brand-directory-controls">
        <label className="brand-search"><Icon name="search" className="h-4 w-4" /><span className="sr-only">Search brands</span><input type="search" placeholder={helmets ? "Find KYT, LS2, Shoei..." : "Find Honda, Yamaha, Royal Enfield..."} value={query} onChange={(event) => setQuery({ q: event.target.value || undefined })} /></label>
        <label><span className="sr-only">Filter brands by category</span><select value={category} onChange={(event) => setQuery({ category: event.target.value || undefined })}><option value="">All riding categories</option>{categories.map((name) => <option key={name}>{name}</option>)}</select></label>
        <label><span className="sr-only">Order brands</span><select value={order} onChange={(event) => setQuery({ sort: event.target.value === "featured" ? undefined : event.target.value })}><option value="featured">Featured first</option><option value="az">Name: A to Z</option><option value="price">Lowest reference price</option></select></label>
      </div>
      <p className="brand-directory-count" aria-live="polite">{filtered.length} {helmets ? "helmet" : "motorcycle"} brands to explore</p>
      {filtered.length ? (
        <div className="brand-directory-grid">
          {filtered.map((brand, index) => (
            <a className="brand-directory-entry page-enter" style={{ animationDelay: `${index % 3 * 50}ms` }} href={brandPath(brand)} key={brand.slug}>
              <div className="brand-entry-name"><span className={`brand-wordmark wordmark-${brand.slug}`} style={{ color: brand.color }}>{brand.name}</span><Icon name="arrowUpRight" className="h-5 w-5" /></div>
              <p>{brand.description}</p>
              <div className="brand-entry-bottom"><span>{brand.sourceCount} {helmets ? "tracked models" : "source-listed models"}</span><strong>{brand.priceFrom === undefined ? "Price not recorded" : `From ${money(brand.priceFrom)}`}</strong></div>
            </a>
          ))}
        </div>
      ) : <EmptyState title="No brands in this search." text="Try another name or remove the category filter."><button type="button" className="action-primary" onClick={() => setQuery({ q: undefined, category: undefined })}>Reset search</button></EmptyState>}
      <section className="brand-directory-editorial">
        <div><p className="page-eyebrow">More than a logo</p><h2>{helmets ? "Choose the helmet. Not just the name." : "Keep the whole ownership picture in view."}</h2></div>
        <div><p>{helmets ? "A familiar name cannot compensate for the wrong head shape or size. Use each brand guide to narrow the choice, then inspect the exact model's fit, certification and Philippine conformity markings." : "Each brand page brings the model research, published prices, buying advice and frequently asked questions together. Compare the exact local variant, then check rider fit, financing, service support and the final dealer quote."}</p><a href={helmets ? "/guides/motorcycle-helmet-size-guide" : "/ownership/cost-calculator"} className="text-link">{helmets ? "Read the helmet fit guide" : "Plan your ownership budget"}<Icon name="arrowRight" className="h-4 w-4" /></a></div>
      </section>
      <SourceNote>Brand counts and price bands describe the fetched original MotoIndex brand pages. They are not a promise of stock or a complete manufacturer lineup. Each page distinguishes the imported model records from the broader source coverage.</SourceNote>
    </div></div>
  );
}