import HelmetBrowser from "../components/HelmetBrowser";
import { PageIntro, PageMeta, SourceNote } from "../components/PageUI";
import SourceReferences from "../components/SourceReferences";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import Icon from "../components/icons";
import { helmets, helmetCatalogSource } from "../helmet-catalog";
import { OFFICIAL_STORES } from "../affiliate";

export default function HelmetCatalogPage({ brand }: { brand?: string }) {
  return <div className="inner-page helmet-catalog-page"><div className="page-container">
    <PageMeta title="Motorcycle helmets Philippines: all models, brands and prices" description={`Explore all ${helmets.length} source-listed helmet detail records across 19 brands. Search by brand, format and price, including models whose prices are pending.`} />
    <PageIntro eyebrow="The complete helmet index" title="Every model. A better-informed fit." description="The full source-listed helmet catalog, not a handful of samples. Explore the model, understand the format and check the exact unit before buying." breadcrumbs={[{ label: "Helmets" }]} action={<a href="/gear/helmets/compare" className="action-primary"><Icon name="compare" className="h-4 w-4" />Compare helmets</a>} />
    <nav className="helmet-discovery-links" aria-label="Helmet discovery"><a href="/gear/helmets/brands">Browse all brands<Icon name="arrowRight" className="h-4 w-4" /></a><a href="/gear/helmets/under-3000">Under PHP 3,000<Icon name="arrowRight" className="h-4 w-4" /></a><a href="/gear/helmets/under-5000">Under PHP 5,000<Icon name="arrowRight" className="h-4 w-4" /></a><a href="/guides/buy-helmet-online-philippines">Buy online checklist<Icon name="arrowRight" className="h-4 w-4" /></a><a href="/guides/motorcycle-helmet-size-guide">Get the fit right<Icon name="ruler" className="h-4 w-4" /></a></nav>
    <section id="models" className="helmet-catalog-section" aria-label="All helmet models"><HelmetBrowser brand={brand} /></section>
    <div className="official-stores-strip" aria-label="Verified official stores">{OFFICIAL_STORES.map((store) => <a key={store.href} href={store.href} target="_blank" rel="sponsored nofollow noopener"><Icon name="shield" className="h-4 w-4" />{store.label}<Icon name="external" className="h-3 w-3" /></a>)}</div>
    <AffiliateDisclosure compact />
    <section className="brand-directory-editorial"><div><p className="page-eyebrow">The details that matter</p><h2>Price pending does not mean model missing.</h2></div><div><p>Some brands have many published model records but few recorded Philippine prices. Those models stay in the index. We do not invent a price, stock status or certification badge to fill a gap.</p><a href="/guides/motorcycle-helmet-certification-philippines" className="text-link">Understand Philippine conformity checks<Icon name="arrowRight" className="h-4 w-4" /></a></div></section>
    <SourceNote>All {helmets.length} detailed model records from the fetched MotoIndex helmet catalog are available locally. Broader brand tracking lists can contain additional names without detailed source pages. Physical fit, labels, price and availability still need checking on the exact unit.</SourceNote>
    <SourceReferences sources={[{ label: "MotoIndex helmet catalog and existing model URLs", href: helmetCatalogSource }]} />
  </div></div>;
}