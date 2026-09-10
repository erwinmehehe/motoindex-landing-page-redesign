import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "../router";
import { useApp } from "../state";
import { catalog, bikePath } from "../catalog";
import { pages } from "../content";
import { helmets } from "../resources";
import { brandSearchEntries } from "../brands";
import { archivedMotorcycles, modelFamilies } from "../model-history";
import { electricMotorcycles, electricPath } from "../electric";
import { colorRecords } from "../color-records";
import Icon from "./icons";

const navItems = [{ label: "Motorcycles", href: "/motorcycles" }, { label: "Brands", href: "/brands" }, { label: "Compare", href: "/compare" }, { label: "Guides", href: "/guides" }, { label: "Tools", href: "/tools" }];
const moreItems = [
  { label: "Electric motorcycles", href: "/motorcycles/electric", icon: "bolt", desc: "Battery plans and model research" },
  { label: "Helmet brands", href: "/gear/helmets/brands", icon: "helmet", desc: "All 19 brand guides" },
  { label: "Helmets & gear", href: "/gear/helmets", icon: "helmet", desc: "Fit comes first" },
  { label: "Find a dealer", href: "/dealers", icon: "pin", desc: "Plan the next step" },
  { label: "Maintenance", href: "/maintenance", icon: "wrench", desc: "Know your motorcycle" },
  { label: "Ownership", href: "/ownership", icon: "wallet", desc: "Beyond the showroom" },
  { label: "Commuting", href: "/commute", icon: "route", desc: "The everyday, considered" },
  { label: "Price list", href: "/motorcycle-philippines-price-list", icon: "tag", desc: "All published starting prices" },
  { label: "Buying guides", href: "/recommendations", icon: "target", desc: "Find a better shortlist" },
  { label: "Rider fit check", href: "/fitment", icon: "ruler", desc: "A starting point for comfort" },
  { label: "Used & repo", href: "/used-motorcycles/repo", icon: "tag", desc: "Inspect before you invest" },
];

export function BrandLogo() {
  return <a className="site-logo" href="/" aria-label="MotoIndex home"><span className="site-logo-mark"><Icon name="gauge" className="h-5 w-5" /></span><span>Moto<span>Index</span><small>PH</small></span></a>;
}

export default function SiteNav() {
  const { pathname, navigate } = useRouter();
  const { savedIds } = useApp();
  const [scrolled, setScrolled] = useState(window.scrollY > 24);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const mobile = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLDialogElement>(null);
  const more = useRef<HTMLDetailsElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const openSearch = () => { setQuery(""); setSelected(0); search.current?.showModal(); requestAnimationFrame(() => searchInput.current?.focus()); };
  const shortcuts = [{ title: "Browse motorcycle brands", href: "/brands", category: "Brand directory" }, { title: "Explore motorcycles", href: "/motorcycles", category: "Motorcycles" }, { title: "Find my match", href: "/finder", category: "Rider tools" }, { title: "Compare motorcycles", href: "/compare", category: "Comparison" }, { title: "My garage & reading list", href: "/saved", category: "Saved research" }];
  const searchable = [...brandSearchEntries, ...modelFamilies.map((family) => ({ title: `${family.brand} ${family.name} generations`, href: family.path, category: "Model family" })), ...catalog.map((b) => ({ title: `${b.brand} ${b.model}`, href: bikePath(b), category: "Motorcycle" })), ...colorRecords.map((record) => { const bike = catalog.find((item) => item.id === record.bikeId)!; return { title: `${bike.brand} ${bike.model} colors`, href: `${bikePath(bike)}/colors`, category: "Color guide" }; }), ...archivedMotorcycles.map((bike) => ({ title: `${bike.brand} ${bike.name}`, href: bike.path, category: "Archive / previous generation" })), ...electricMotorcycles.map((bike) => ({ title: bike.name, href: electricPath(bike), category: "Electric motorcycle" })), ...pages.map((p) => ({ title: p.title, href: p.href, category: "Guide / tool" })), ...helmets.map((h) => ({ title: `${h.brand} ${h.model}`, href: `/gear/helmets/${h.slug}`, category: "Helmet" }))];
  const results = query.trim() ? searchable.filter((item) => item.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 9) : shortcuts;

  useEffect(() => {
    const update = () => { setScrolled(window.scrollY > 24); const height = document.documentElement.scrollHeight - window.innerHeight; setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0); };
    const keyboard = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); if (search.current?.open) search.current.close(); else openSearch(); } };
    const outside = (event: PointerEvent) => { if (more.current && !more.current.contains(event.target as Node)) more.current.open = false; };
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("keydown", keyboard);
    document.addEventListener("pointerdown", outside);
    update();
    return () => { window.removeEventListener("scroll", update); document.removeEventListener("keydown", keyboard); document.removeEventListener("pointerdown", outside); };
  }, []);
  useEffect(() => { mobile.current?.close(); search.current?.close(); if (more.current) more.current.open = false; setProgress(0); }, [pathname]);
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => { if (event.target === event.currentTarget) event.currentTarget.close(); };

  return <>
    <div className="site-progress" aria-hidden="true"><div style={{ transform: `scaleX(${progress})` }} /></div>
    <header className={`site-header ${pathname !== "/" || scrolled ? "solid" : ""}`}><nav className="site-nav" aria-label="Main navigation"><BrandLogo /><div className="site-desktop-links">{navItems.map((item) => <a key={item.href} href={item.href} className={pathname.startsWith(item.href) ? "active" : ""} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</a>)}<details ref={more} className="site-more" onKeyDown={(event) => { if (event.key === "Escape" && more.current) { more.current.open = false; more.current.querySelector("summary")?.focus(); } }}><summary>More<Icon name="chevronDown" className="h-3.5 w-3.5" /></summary><div className="site-mega"><p className="site-mega-heading">More ways to make the right call.</p><div>{moreItems.map((item) => <a href={item.href} key={item.href}><Icon name={item.icon} className="h-5 w-5 text-racer-400" /><span><strong>{item.label}</strong><small>{item.desc}</small></span><Icon name="arrowUpRight" className="h-4 w-4" /></a>)}</div><a className="site-mega-footer" href="/guides">Explore the complete rider library<Icon name="arrowRight" className="h-4 w-4" /></a></div></details></div><div className="site-nav-actions"><button className="site-search-trigger" type="button" aria-label="Search MotoIndex, Control or Command K" onClick={openSearch}><Icon name="search" className="h-[18px] w-[18px]" /><kbd>Ctrl K</kbd></button><a href="/saved" className="site-garage-link" aria-label={`My garage, ${savedIds.length} saved motorcycles`}><Icon name="heart" className="h-[18px] w-[18px]" />{savedIds.length > 0 && <span>{savedIds.length}</span>}</a><a href="/finder" className="site-match-link">Find my match<Icon name="arrowRight" className="h-4 w-4" /></a><button type="button" className="site-menu-trigger" aria-label="Open navigation menu" onClick={() => mobile.current?.showModal()}><Icon name="menu" className="h-5 w-5" /></button></div></nav></header>

    <dialog ref={search} className="site-search-dialog" aria-labelledby="site-search-title" onClick={closeOnBackdrop}><div className="site-search-content"><div className="search-dialog-heading"><h2 id="site-search-title">Find your next answer.</h2><button type="button" className="icon-control" aria-label="Close search" onClick={() => search.current?.close()}><Icon name="x" className="h-5 w-5" /></button></div><div className="global-search-input"><Icon name="search" className="h-5 w-5" /><input ref={searchInput} aria-label="Search motorcycles, guides, tools and gear" placeholder="Try Aerox, helmet fit, or registration..." value={query} onChange={(e) => { setQuery(e.target.value); setSelected(0); }} role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="site-search-results" aria-activedescendant={results[selected] ? `search-result-${selected}` : undefined} onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setSelected((i) => Math.min(i + 1, results.length - 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setSelected((i) => Math.max(0, i - 1)); } if (e.key === "Enter" && results[selected]) { e.preventDefault(); search.current?.close(); navigate(results[selected].href); } }} /></div><p className="search-results-label">{query ? `${results.length} suggested results` : "A good place to start"}</p><ul id="site-search-results" role="listbox" aria-label="Search results">{results.map((item, index) => <li key={item.href} id={`search-result-${index}`} role="option" aria-selected={selected === index}><a href={item.href} onMouseEnter={() => setSelected(index)} onClick={() => search.current?.close()} tabIndex={-1}><span><small>{item.category}</small><strong>{item.title}</strong></span><Icon name="arrowRight" className="h-4 w-4" /></a></li>)}</ul>{!results.length && <p className="search-empty">No matching records yet. Try a brand, model, or shorter topic.</p>}<div className="search-dialog-footer"><span>Arrow keys to explore / Enter to open</span><span>Esc to close</span></div></div></dialog>

    <dialog ref={mobile} className="site-mobile-dialog" aria-labelledby="mobile-menu-title" onClick={closeOnBackdrop}><div><div className="mobile-dialog-heading"><h2 id="mobile-menu-title">Explore MotoIndex</h2><button type="button" aria-label="Close menu" className="icon-control" onClick={() => mobile.current?.close()}><Icon name="x" className="h-5 w-5" /></button></div><nav aria-label="Mobile main navigation">{[...navItems, { label: "My garage", href: "/saved" }, { label: "Find my match", href: "/finder" }].map((item) => <a href={item.href} key={item.href} onClick={() => mobile.current?.close()}>{item.label}<Icon name="arrowUpRight" className="h-5 w-5" /></a>)}</nav><div className="mobile-more-links">{moreItems.map((item) => <a href={item.href} key={item.href} onClick={() => mobile.current?.close()}><Icon name={item.icon} className="h-4 w-4 text-racer-400" />{item.label}</a>)}</div><p className="mobile-dialog-note">Research freely. Save locally. Ride your own ride.</p></div></dialog>

    <nav className="site-mobile-tabs" aria-label="Mobile quick navigation">{[{ label: "Explore", href: "/motorcycles", icon: "search" }, { label: "Compare", href: "/compare", icon: "compare" }, { label: "Saved", href: "/saved", icon: "heart" }].map((item) => <a key={item.label} href={item.href} className={pathname.startsWith(item.href) ? "active" : ""}><Icon name={item.icon} className="h-5 w-5" /><span>{item.label}</span></a>)}<button type="button" onClick={() => mobile.current?.showModal()}><Icon name="menu" className="h-5 w-5" /><span>Menu</span></button></nav>
  </>;
}