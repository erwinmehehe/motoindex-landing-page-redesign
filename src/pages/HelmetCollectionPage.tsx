import { helmets } from "../helmet-catalog";
import HelmetTile from "../components/HelmetTile";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import { PageIntro, PageMeta, SourceNote } from "../components/PageUI";
import ShopButtons from "../components/ShopButtons";
import { money } from "../catalog";
import Icon from "../components/icons";

import { helmetCollections, type HelmetCollectionDef } from "../helmet-collections";
export type { HelmetCollectionDef };
export { helmetCollections };

export default function HelmetCollectionPage({ definition }: { definition: HelmetCollectionDef }) {
  const list = helmets.filter(definition.filter).sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) || a.model.localeCompare(b.model));
  const priced = list.filter((h) => h.price !== null);
  return <div className="inner-page"><div className="page-container">
    <PageMeta title={`${definition.title} | Prices and models`} description={definition.description} />
    <PageIntro eyebrow="The gear shortlist" title={definition.title} description={definition.description} breadcrumbs={[{ label: "Helmets", href: "/gear/helmets" }, { label: definition.title }]} action={<a className="action-primary" href="/guides/buy-helmet-online-philippines">How to buy online<Icon name="arrowRight" className="h-4 w-4" /></a>} />
    <p className="brand-directory-count" aria-live="polite"><strong>{list.length}</strong> matching records{priced.length ? ` · from ${money(Math.min(...priced.map((h) => h.price!)))}` : ""}</p>
    {list.length ? <div className="helmet-grid">{list.map((helmet) => <HelmetTile key={helmet.id} helmet={helmet} />)}</div> : <p>No priced records currently match this band. Browse the full catalog, including pending prices.</p>}
    <div className="brand-shop-box"><p className="page-eyebrow">Compare live marketplace prices</p><p className="brand-shop-copy">{definition.note} Use exact-model shop links rather than a generic “helmet” search.</p><ShopButtons query="motorcycle helmet Philippines" label="motorcycle helmets" layout="compact" /><AffiliateDisclosure compact /></div>
    <nav className="page-tour-links"><span>Other helmet shortlists</span>{helmetCollections.filter((item) => item.path !== definition.path).map((item) => <a key={item.path} href={item.path}>{item.title.replace("Motorcycle helmets ", "").replace(" in the Philippines", "")}<Icon name="arrowRight" className="h-3.5 w-3.5" /></a>)}</nav>
    <SourceNote>{definition.note} Open each model page for fit, certification checks and Shopee / Lazada buttons.</SourceNote>
  </div></div>;
}
