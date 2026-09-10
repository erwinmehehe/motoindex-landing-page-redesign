import { useState } from "react";
import { allPagePaths, originalSitemapPaths, originalBrandPaths, modelResearchTopics, resolveRoute, pageTitle } from "../routes";
import { catalog, bikePath } from "../catalog";
import { brandByPath, brandDirectoryPaths } from "../brands";
import { PageIntro, PageMeta, SourceNote } from "../components/PageUI";
import Icon from "../components/icons";

function groupName(path: string) {
  const kind = resolveRoute(path).kind;
  if (brandByPath.has(path) || brandDirectoryPaths.includes(path)) return "Brand guides";
  if (kind === "archive" || kind === "family") return "Model families & archives";
  if (kind === "electric-model" || kind === "electric-collection") return "Electric motorcycles";
  if (kind === "model-research") return "Model research pages";
  if (path.startsWith("/motorcycles")) return "Motorcycles";
  if (path.startsWith("/compare")) return "Motorcycle comparisons";
  if (path.startsWith("/gear") || path === "/accessories" || path === "/tires") return "Helmets, gear & fitment";
  if (path.startsWith("/recommendations")) return "Buying guides";
  if (path.startsWith("/tools") || path.includes("calculator")) return "Tools & calculators";
  if (["/guides", "/maintenance", "/ownership", "/commute"].some((prefix) => path.startsWith(prefix))) return "Riding & ownership";
  return "Explore MotoIndex";
}

export default function SiteMapPage() {
  const [query, setQuery] = useState("");
  const [includeResearch, setIncludeResearch] = useState(false);
  const [group, setGroup] = useState("All pages");
  const list = includeResearch ? [...allPagePaths, ...catalog.flatMap((bike) => modelResearchTopics.map((topic) => `${bikePath(bike)}/${topic}`))] : allPagePaths;
  const groups = [...new Set(list.map(groupName))].sort();
  const shown = list.filter((path) => (group === "All pages" || groupName(path) === group) && `${path} ${pageTitle(path)}`.toLowerCase().includes(query.toLowerCase()));
  const sourcePaths = [...originalSitemapPaths, ...originalBrandPaths];
  const uncovered = sourcePaths.filter((path) => resolveRoute(path).kind === "not-found");

  return <div className="inner-page"><div className="page-container">
    <PageMeta title="All local MotoIndex pages" description="Explore built motorcycle, brand, comparison, archive, gear, guide and calculator pages inside the connected MotoIndex application." />
    <PageIntro eyebrow="Explore the complete site" title="Every road through MotoIndex." description="Real pages for the details that matter. Find a brand, a model, an owner guide or the next useful tool without leaving the site." />
    <nav className="page-tour-links" aria-label="Try a built page"><span>Start exploring</span><a href="/motorcycles/yamaha">Yamaha brand guide<Icon name="arrowRight" className="h-3.5 w-3.5" /></a><a href="/motorcycles/yamaha/aerox-v2">Aerox V2 owner page<Icon name="arrowRight" className="h-3.5 w-3.5" /></a><a href="/recommendations/motorcycles-under-100k">Under PHP 100K guide<Icon name="arrowRight" className="h-3.5 w-3.5" /></a></nav>
    <div className="knowledge-search"><div><Icon name="search" className="h-5 w-5" /><input aria-label="Search page titles and paths" type="search" placeholder="Search a page title or URL path..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><label><input type="checkbox" checked={includeResearch} onChange={(event) => { setIncludeResearch(event.target.checked); if (!event.target.checked && group === "Model research pages") setGroup("All pages"); }} />Include model subpages</label></div>
    <div className="section-line-heading"><p aria-live="polite"><strong>{shown.length}</strong> local pages</p><label><span className="sr-only">Filter page category</span><select className="field-input" value={group} onChange={(event) => setGroup(event.target.value)}><option>All pages</option>{groups.map((name) => <option key={name}>{name}</option>)}</select></label></div>
    <div className="html-sitemap">{groups.filter((name) => shown.some((path) => groupName(path) === name)).map((name) => <section key={name}><h2>{name}</h2><ul>{shown.filter((path) => groupName(path) === name).map((path) => <li key={path}><a href={path}>{pageTitle(path)}<Icon name="arrowRight" className="h-3.5 w-3.5" /></a></li>)}</ul></section>)}</div>
    {!shown.length && <div className="empty-state"><h2>No matching pages.</h2><p>Try a broader title or another category.</p><button type="button" className="action-primary" onClick={() => { setQuery(""); setGroup("All pages"); }}>Reset search</button></div>}
    <SourceNote>{uncovered.length ? `${uncovered.length} source paths need a local page.` : `The ${originalSitemapPaths.length} fetched sitemap paths and ${originalBrandPaths.length} discovered brand paths have local destinations.`} External links are reserved for citations, calls, maps or explicitly identified third-party resources. Full live-data synchronization and production deployment are separate from the built interface.</SourceNote>
  </div></div>;
}