import { AppProvider } from "./state";
import { SiteRouter, useRouter } from "./router";
import Navbar from "./components/SiteNav";
import Hero from "./components/Hero";
import BrandShelf from "./components/BrandShelf";
import Categories from "./components/Categories";
import Showcase from "./components/LandingShowcase";
import FindMyMatch from "./components/FindMyMatch";
import Features from "./components/Features";
import Tools from "./components/Tools";
import ContentHub from "./components/ContentHub";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import CompareTray from "./components/CompareTray";
import { PageMeta } from "./components/PageUI";
import CatalogPage from "./pages/CatalogPage";
import BikeDetailPage from "./pages/BikeDetailPage";
import ComparePage from "./pages/ComparePage";
import FinderPage from "./pages/FinderPage";
import GaragePage from "./pages/GaragePage";
import ToolPage from "./pages/ToolPage";
import { HubPage, ArticlePage } from "./pages/GuidePages";
import { DealerPage, DealerJoinPage, RepoPage, FitmentResources } from "./pages/ResourcePages";
import HelmetCatalogPage from "./pages/HelmetCatalogPage";
import HelmetDetails from "./pages/HelmetDetails";
import { PrivacyPage, NotFoundPage } from "./pages/InfoPages";
import SiteMapPage from "./pages/SiteMapPage";
import BrandDirectoryPage from "./pages/BrandDirectoryPage";
import BrandPage from "./pages/BrandPage";
import { resolveRoute } from "./routes";
import { ArchivePage, FamilyPage } from "./pages/HistoryPages";
import CollectionPage from "./pages/CollectionPage";
import ElectricPage, { ElectricCollectionPage } from "./pages/ElectricPage";
import ModelResearchPage from "./pages/ModelResearchPage";
import HelmetComparePage from "./pages/HelmetComparePage";
import CorrectionsPage from "./pages/CorrectionsPage";
import ColorsPage from "./pages/ColorsPage";
import ContentCoveragePage from "./pages/ContentCoveragePage";
import PriceListPage from "./pages/PriceListPage";
import HelmetCollectionPage from "./pages/HelmetCollectionPage";
import ContactPage from "./pages/ContactPage";
import AffiliateNotice from "./components/AffiliateNotice";

function HomePage() {
  return <><PageMeta title="Find your next motorcycle" description="Explore motorcycle prices, compare your shortlist, plan ownership and research your next ride with MotoIndex PH." /><Hero /><BrandShelf /><Categories /><Showcase /><FindMyMatch /><Features /><Tools /><ContentHub /><FAQ /><FinalCTA /></>;
}

function CurrentPage() {
  const { pathname, search } = useRouter();
  const route = resolveRoute(pathname);
  switch (route.kind) {
    case "home": return <HomePage />;
    case "colors": return <ColorsPage key={route.bike.id} bike={route.bike} record={route.record} />;
    case "coverage": return <ContentCoveragePage />;
    case "price-list": return <PriceListPage />;
    case "contact": return <ContactPage />;
    case "helmet-collection": return <HelmetCollectionPage key={route.definition.path} definition={route.definition} />;
    case "archive": return <ArchivePage key={route.bike.id} bike={route.bike} />;
    case "family": return <FamilyPage key={route.family.path} family={route.family} />;
    case "collection": return <CollectionPage key={route.page.href} page={route.page} definition={route.definition} />;
    case "electric-model": return <ElectricPage key={route.bike.id} bike={route.bike} />;
    case "electric-collection": return <ElectricCollectionPage />;
    case "model-research": return <ModelResearchPage key={pathname} bike={route.bike} topic={route.topic} />;
    case "helmet-compare": return <HelmetComparePage />;
    case "corrections": return <CorrectionsPage />;
    case "catalog": return <CatalogPage key={route.brand || "all"} brand={route.brand} />;
    case "brand-directory": return <BrandDirectoryPage key={route.helmets ? "helmet-brands" : "bike-brands"} helmets={route.helmets} />;
    case "brand": return <BrandPage key={`${route.brand.kind}:${route.brand.slug}`} brand={route.brand} />;
    case "bike": return <BikeDetailPage key={route.bike.id} bike={route.bike} />;
    case "compare": return <ComparePage key={route.slug || "custom"} slug={route.slug} />;
    case "saved": return <GaragePage />;
    case "finder": case "fitment": return <FinderPage key={pathname} fitOnly={route.kind === "fitment"} />;
    case "tool": return <ToolPage key={pathname + search} />;
    case "hub": return <HubPage key={pathname} />;
    case "dealers": return <DealerPage />;
    case "dealer-join": return <DealerJoinPage />;
    case "helmets": return <HelmetCatalogPage key={route.brand || "helmets"} brand={route.brand} />;
    case "helmet": return <HelmetDetails key={route.helmet.id} helmet={route.helmet} />;
    case "tires": case "accessories": return <FitmentResources key={pathname} accessories={route.kind === "accessories"} />;
    case "repo": return <RepoPage />;
    case "privacy": return <PrivacyPage />;
    case "article": return <ArticlePage key={pathname} page={route.article} />;
    case "sitemap": return <SiteMapPage />;
    default: return <NotFoundPage />;
  }
}

function ConnectedSite() {
  return (
    <AppProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-racer-500 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <CurrentPage />
      </main>
      <Footer />
      <AffiliateNotice />
      <CompareTray />
    </AppProvider>
  );
}

export default function App() {
  return <SiteRouter><ConnectedSite /></SiteRouter>;
}
