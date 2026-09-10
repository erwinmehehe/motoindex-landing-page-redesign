import { catalog, catalogByPath, comparisonPairs, bikePath, type CatalogBike } from "./catalog";
import { allBrands, brandByPath, brandPath, brandDirectoryPaths, type BrandProfile } from "./brands";
import { pageByPath, pages, hubs, articles, type ResearchPage } from "./content";
import { toolDefinitions } from "./tools";
import { helmets, type Helmet } from "./resources";
import sourcePaths from "./original-sitemap.txt?raw";
import brandSourcePaths from "./original-brand-paths.txt?raw";
import { archiveByPath, familyByPath, archivedMotorcycles, modelFamilies, type ArchivedMotorcycle, type ModelFamily } from "./model-history";
import { collections, type Collection } from "./collections";
import { electricMotorcycles, electricPath, type ElectricMotorcycle } from "./electric";
import { colorById, colorRecords, type ColorRecord } from "./color-records";
import { helmetCollections, type HelmetCollectionDef } from "./helmet-collections";

export type PageRoute =
  | { kind: "home" | "saved" | "finder" | "fitment" | "tool" | "hub" | "dealers" | "dealer-join" | "repo" | "tires" | "accessories" | "privacy" | "sitemap" | "not-found" }
  | { kind: "catalog"; brand?: string }
  | { kind: "brand-directory"; helmets?: boolean }
  | { kind: "brand"; brand: BrandProfile }
  | { kind: "bike"; bike: CatalogBike }
  | { kind: "compare"; slug?: string }
  | { kind: "helmets"; brand?: string }
  | { kind: "helmet"; helmet: Helmet }
  | { kind: "article"; article: ResearchPage };
  
export type ExtendedPageRoute = PageRoute
  | { kind: "archive"; bike: ArchivedMotorcycle }
  | { kind: "family"; family: ModelFamily }
  | { kind: "collection"; page: ResearchPage; definition: Collection }
  | { kind: "electric-model"; bike: ElectricMotorcycle }
  | { kind: "electric-collection" | "helmet-compare" | "corrections" }
  | { kind: "model-research"; bike: CatalogBike; topic: string };
export type CompleteRoute = ExtendedPageRoute | { kind: "colors"; bike: CatalogBike; record: ColorRecord } | { kind: "coverage" | "price-list" | "contact" } | { kind: "helmet-collection"; definition: HelmetCollectionDef };

export const modelResearchTopics = ["specs", "price", "installment", "fuel-consumption", "tire-size", "maintenance", "top-speed", "ownership-cost", "used-price"];

export function resolveRoute(input: string): CompleteRoute {
  const path = input.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (path === "/") return { kind: "home" };
  if (path === "/motorcycles") return { kind: "catalog" };
  if (path === "/motorcycles/electric" || path === "/recommendations/electric-motorcycles-philippines") return { kind: "electric-collection" };
  const electricBike = electricMotorcycles.find((bike) => electricPath(bike) === path);
  if (electricBike) return { kind: "electric-model", bike: electricBike };
  const archived = archiveByPath.get(path);
  if (archived) return { kind: "archive", bike: archived };
  const family = familyByPath.get(path);
  if (family) return { kind: "family", family };
  if (collections[path] && pageByPath.has(path)) return { kind: "collection", page: pageByPath.get(path)!, definition: collections[path] };
  const parts = path.split("/");
  const parent = parts.slice(0, -1).join("/");
  const modelTopic = parts[parts.length - 1];
  if (modelTopic === "colors" && catalogByPath.has(parent)) {
    const bike = catalogByPath.get(parent)!;
    const record = colorById.get(bike.id);
    if (record) return { kind: "colors", bike, record };
  }
  if (path === "/research/coverage") return { kind: "coverage" };
  if (path === "/motorcycle-philippines-price-list" || path === "/price-list") return { kind: "price-list" };
  if (path === "/contact") return { kind: "contact" };
  const helmetSet = helmetCollections.find((item) => item.path === path);
  if (helmetSet) return { kind: "helmet-collection", definition: helmetSet };
  if (modelResearchTopics.includes(modelTopic) && catalogByPath.has(parent)) return { kind: "model-research", bike: catalogByPath.get(parent)!, topic: modelTopic };
  if (path === "/gear/helmets/compare") return { kind: "helmet-compare" };
  if (path === "/gear/helmets/finder") return { kind: "helmets" };
  if (path === "/corrections") return { kind: "corrections" };
  if (path === "/brands" || path === "/motorcycles/brands") return { kind: "brand-directory" };
  if (path === "/gear/helmets/brands") return { kind: "brand-directory", helmets: true };
  const profile = brandByPath.get(path);
  if (profile) return { kind: "brand", brand: profile };
  const bike = catalogByPath.get(path);
  if (bike) return { kind: "bike", bike };
  if (path === "/saved") return { kind: "saved" };
  if (path === "/finder") return { kind: "finder" };
  if (path === "/fitment") return { kind: "fitment" };
  if (path === "/compare") return { kind: "compare" };
  const slug = path.replace("/compare/", "");
  if (path.startsWith("/compare/") && comparisonPairs[slug]) return { kind: "compare", slug };
  if (toolDefinitions[path]) return { kind: "tool" };
  if (hubs[path]) return { kind: "hub" };
  if (path === "/dealers") return { kind: "dealers" };
  if (path === "/dealers/join") return { kind: "dealer-join" };
  if (path === "/gear/helmets") return { kind: "helmets" };
  const helmet = helmets.find((h) => path === `/gear/helmets/${h.slug}`);
  if (helmet) return { kind: "helmet", helmet };
  if (path === "/tires") return { kind: "tires" };
  if (path === "/accessories") return { kind: "accessories" };
  if (path === "/used-motorcycles/repo") return { kind: "repo" };
  if (path === "/privacy") return { kind: "privacy" };
  if (path === "/sitemap") return { kind: "sitemap" };
  const article = pageByPath.get(path);
  if (article && articles[path]) return { kind: "article", article };
  return { kind: "not-found" };
}

export const originalSitemapPaths = sourcePaths.trim().split(/\r?\n/).filter(Boolean);
export const uncoveredSitemapPaths = originalSitemapPaths.filter((path) => resolveRoute(path).kind === "not-found");
export const originalBrandPaths = brandSourcePaths.trim().split(/\r?\n/).filter(Boolean);
export const uncoveredBrandPaths = originalBrandPaths.filter((path) => resolveRoute(path).kind === "not-found");
export const allPagePaths = [...new Set([...originalSitemapPaths, ...originalBrandPaths, ...pages.map((p) => p.href), ...Object.keys(hubs), ...Object.keys(toolDefinitions), ...catalog.map(bikePath), ...allBrands.map(brandPath), ...brandDirectoryPaths, ...helmets.map((h) => `/gear/helmets/${h.slug}`), ...archivedMotorcycles.map((bike) => bike.path), ...modelFamilies.map((family) => family.path), ...electricMotorcycles.map(electricPath), ...colorRecords.map((record) => `${bikePath(catalog.find((bike) => bike.id === record.bikeId)!)}/colors`), "/motorcycles/electric", "/gear/helmets/compare", "/gear/helmets/finder", "/corrections", "/saved", "/sitemap"])];

export function pageTitle(path: string): string {
  const route = resolveRoute(path);
  if (route.kind === "colors") return `${route.bike.brand} ${route.bike.model} colors`;
  if (route.kind === "coverage") return "Content coverage and keyword research";
  if (route.kind === "price-list") return "Motorcycle Philippines price list";
  if (route.kind === "contact") return "Contact MotoIndex";
  if (route.kind === "helmet-collection") return route.definition.title;
  if (route.kind === "archive") return `${route.bike.brand} ${route.bike.name} historical specs & owner guide`;
  if (route.kind === "family") return `${route.family.brand} ${route.family.name} generations`;
  if (route.kind === "collection") return route.page.title;
  if (route.kind === "electric-model") return `${route.bike.name} price & specifications`;
  if (route.kind === "electric-collection") return "Electric motorcycle models & battery plans";
  if (route.kind === "model-research") return `${route.bike.brand} ${route.bike.model} ${route.topic.replace(/-/g, " ")}`;
  if (route.kind === "helmet-compare") return "Compare motorcycle helmets";
  if (route.kind === "corrections") return "Prepare a correction report";
  if (route.kind === "brand-directory") return route.helmets ? "All helmet brands" : "All motorcycle brands";
  if (route.kind === "brand") return `${route.brand.name} ${route.brand.kind === "helmet" ? "helmet" : "motorcycle"} brand guide, prices & models`;
  if (route.kind === "bike") return `${route.bike.brand} ${route.bike.model}`;
  if (route.kind === "helmet") return `${route.helmet.brand} ${route.helmet.model}`;
  if (route.kind === "catalog") return route.brand ? `${route.brand} motorcycles` : "Motorcycle catalog";
  if (route.kind === "helmets") return route.brand ? `${route.brand} helmets` : "Helmet catalog";
  if (pageByPath.has(path)) return pageByPath.get(path)!.title;
  if (toolDefinitions[path]) return toolDefinitions[path].eyebrow;
  const titles: Record<string, string> = { "/": "Home", "/saved": "My garage & reading list", "/finder": "Find my match", "/compare": "Compare motorcycles", "/sitemap": "All pages", "/guides": "Rider knowledge library", "/recommendations": "Motorcycle buying guides", "/ownership": "Ownership hub", "/ownership/maintenance": "Ownership maintenance", "/maintenance": "Maintenance hub", "/commute": "Commuting hub", "/tools": "All planning tools" };
  return titles[path] || path.split("/").filter(Boolean).slice(-1)[0]?.replace(/-/g, " ") || "MotoIndex";
}