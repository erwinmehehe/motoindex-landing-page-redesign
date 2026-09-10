import { useEffect, useState } from "react";
import { articles, articleFor, hubs, pages, topicNames, isCalculatorPath, type ResearchPage } from "../content";
import { catalog, type CatalogBike } from "../catalog";
import { toolDefinitions } from "../tools";
import { useQuery, useRouter } from "../router";
import { useApp } from "../state";
import { sourceUrl } from "../seo";
import { images } from "../data";
import { readStored, writeStored } from "../utils/storage";
import BikeTile from "../components/BikeTile";
import Icon from "../components/icons";
import { EmptyState, PageIntro, PageMeta, ShareButton, SourceNote } from "../components/PageUI";
import SourceReferences from "../components/SourceReferences";

export function HubPage() {
  const { pathname } = useRouter();
  const { params, setQuery } = useQuery();
  const { bookmarks, toggleBookmark } = useApp();
  const hub = hubs[pathname] || hubs["/guides"];
  const topic = hub.topic || params.get("topic") || "all";
  const query = params.get("q") || "";
  const onlySaved = params.get("saved") === "1";
  const rows = topic === "tools" ? Object.entries(toolDefinitions).map(([href, item]): ResearchPage => ({ href, title: item.eyebrow, desc: item.description, icon: item.icon, topic: "tools" })) : pages.filter((page) => !hubs[page.href] && page.topic !== "about");
  const filtered = rows.filter((page) => (topic === "all" || page.topic === topic || (topic === "tools" && isCalculatorPath(page.href))) && `${page.title} ${page.desc}`.toLowerCase().includes(query.toLowerCase()) && (!onlySaved || bookmarks.includes(page.href)));

  return <div className="inner-page"><div className="page-container"><PageMeta title={topic === "all" ? "Motorcycle guides and rider research" : topicNames[topic] || "Motorcycle planning tools"} description={hub.subtitle} /><PageIntro eyebrow={topic === "all" ? "The rider knowledge library" : topicNames[topic] || "Free planning tools"} title={hub.title} description={hub.subtitle} action={<a href="/saved" className="action-secondary"><Icon name="heart" className="h-4 w-4" />My reading list</a>} breadcrumbs={pathname === "/guides" ? [{ label: "Guides" }] : [{ label: "Guides", href: "/guides" }, { label: topicNames[topic] || "Tools" }]} />
    {!hub.topic && !query && topic === "all" && !onlySaved && <section className="featured-reading"><a className="featured-reading-image" href="/commute/rainy-season"><img src={images.lifestyle} alt="A rider taking in the Philippine coast" /><span>Made for the roads you ride</span></a><div><p className="page-eyebrow">A little knowledge goes a long way</p><h2>Better prepared.<br />Better adventures.</h2><p>From your first helmet to your next provincial ride, make room for the details that matter.</p><a className="text-link" href="/guides/motorcycle-helmet-size-guide">Start with the helmet fit guide<Icon name="arrowRight" className="h-4 w-4" /></a></div></section>}
    {!hub.topic && <nav className="category-tabs" aria-label="Guide topic">{[["all", "All research"], ["guides", "Buying guides"], ["compare", "Comparisons"], ["ownership", "Ownership"], ["maintenance", "Maintenance & gear"], ["commute", "Commuting"], ["electric", "Electric"]].map(([key, label]) => <button type="button" className={topic === key ? "active" : ""} aria-pressed={topic === key} key={key} onClick={() => setQuery({ topic: key === "all" ? undefined : key })}>{label}</button>)}</nav>}
    <div className="knowledge-search"><div><Icon name="search" className="h-5 w-5" /><label className="sr-only" htmlFor="guide-search">Search this library</label><input type="search" id="guide-search" placeholder="Find a guide, a topic, or your next answer..." value={query} onChange={(e) => setQuery({ q: e.target.value || undefined })} /></div><label><input type="checkbox" checked={onlySaved} onChange={(e) => setQuery({ saved: e.target.checked ? "1" : undefined })} />Saved only</label></div>
    <div className="section-line-heading knowledge-count"><p aria-live="polite"><strong>{filtered.length}</strong> {topic === "tools" ? "planning tools" : "research pages"}</p><span>Explore. Bookmark. Come back anytime.</span></div>
    {filtered.length ? <div className="knowledge-grid">{filtered.map((page) => <article className="knowledge-row" key={page.href}><div className="knowledge-row-icon"><Icon name={page.icon} className="h-5 w-5" /></div><div><p className="knowledge-row-topic">{topicNames[page.topic]}{articles[page.href]?.sourced ? " / Source-adapted guide" : ""}</p><h2><a href={page.href}>{page.title}<Icon name="arrowUpRight" className="h-4 w-4" /></a></h2><p>{page.desc}</p></div><button type="button" className={`icon-control ${bookmarks.includes(page.href) ? "saved-action" : ""}`} aria-label={`${bookmarks.includes(page.href) ? "Unsave" : "Save"} ${page.title}`} aria-pressed={bookmarks.includes(page.href)} onClick={() => toggleBookmark(page.href)}><Icon name={bookmarks.includes(page.href) ? "heartFill" : "heart"} className="h-4 w-4" /></button></article>)}</div> : <EmptyState title="Let's try a different search." text="Try a broader term or turn off the saved-only filter."><button type="button" className="action-primary" onClick={() => setQuery({ q: undefined, saved: undefined })}>Clear this search</button></EmptyState>}
    <SourceNote>These links open local guide and research pages. Selection criteria, source dates, useful checklists and related tools stay with the content. Prices and rules are dated references, not promises of a current offer or official assessment.</SourceNote>
  </div></div>;
}

function relatedBikes(page: ResearchPage): CatalogBike[] {
  const slug = page.href;
  let candidates = [...catalog];
  if (slug.includes("under-100k")) candidates = candidates.filter((b) => b.priceFrom < 100000);
  if (slug.includes("under-80k")) candidates = candidates.filter((b) => b.priceFrom < 80000);
  if (slug.includes("under-150k")) candidates = candidates.filter((b) => b.priceFrom < 150000);
  if (slug.includes("100k-to-150k")) candidates = candidates.filter((b) => b.priceFrom >= 100000 && b.priceFrom <= 150000);
  if (slug.includes("150k-to-250k")) candidates = candidates.filter((b) => b.priceFrom >= 150000 && b.priceFrom <= 250000);
  if (slug.includes("automatic") || slug.includes("scooters")) candidates = candidates.filter((b) => b.transmission === "Automatic");
  if (slug.includes("400cc-plus")) candidates = candidates.filter((b) => b.cc >= 400);
  if (slug.includes("under-400cc")) candidates = candidates.filter((b) => b.cc < 400);
  if (slug.includes("125cc")) candidates = candidates.filter((b) => b.cc >= 120 && b.cc <= 125);
  if (slug.includes("150cc")) candidates = candidates.filter((b) => b.cc >= 145 && b.cc <= 155);
  if (slug.includes("160cc")) candidates = candidates.filter((b) => b.cc > 155 && b.cc <= 165);
  for (const brand of ["honda", "yamaha", "suzuki", "ktm", "kawasaki", "cfmoto"]) if (slug.includes(brand)) candidates = candidates.filter((b) => b.brand.toLowerCase() === brand);
  for (const [key, category] of [["underbone", "Underbone"], ["naked", "Naked"], ["adventure-touring", "Adventure"], ["dual-sport", "Off-road"], ["sport-motorcycles", "Sport"]]) if (slug.includes(key)) candidates = candidates.filter((b) => b.category.some((c) => c === category));
  if (slug.includes("short-riders")) candidates.sort((a, b) => a.seat - b.seat);
  if (slug.includes("with-abs")) candidates = candidates.filter((b) => b.id === "ktm-390-duke");
  if (slug.includes("fuel-efficient") || slug.includes("lightweight") || slug.includes("electric") || slug.includes("cafe-racer")) return [];
  for (const family of ["burgman", "raider", "duke", "ninja"]) if (slug.includes(family)) candidates = candidates.filter((b) => b.model.toLowerCase().includes(family));
  return candidates.slice(0, 3);
}

export function ArticlePage({ page }: { page: ResearchPage }) {
  const { bookmarks, toggleBookmark, notify } = useApp();
  const article = articleFor(page);
  const [largeText, setLargeText] = useState(false);
  const checklistKey = `checklist:${page.href}`;
  const [checked, setChecked] = useState<string[]>(() => { const v = readStored<unknown>(checklistKey, []); return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []; });
  const [activeSection, setActiveSection] = useState(0);
  const allChecks = article.sections.flatMap((section) => section.checks || []);
  const completed = checked.filter((check) => allChecks.includes(check)).length;
  const saved = bookmarks.includes(page.href);
  const recommended = page.topic === "guides" ? relatedBikes(page) : [];
  const related = pages.filter((p) => p.topic === page.topic && p.href !== page.href && !hubs[p.href]).slice(0, 3);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(Number((entry.target as HTMLElement).dataset.section)); }), { rootMargin: "-110px 0px -55% 0px" });
    document.querySelectorAll("[data-section]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [page.href]);
  const check = (value: string) => { const next = checked.includes(value) ? checked.filter((s) => s !== value) : [...checked, value]; setChecked(next); if (!writeStored(checklistKey, next)) notify("Checklist is available for this session only", "red"); };

  return <div className={`inner-page article-page ${largeText ? "reading-large" : ""}`}><div className="page-container"><PageMeta title={page.title} description={page.desc} /><PageIntro eyebrow={topicNames[page.topic] || "Rider research"} title={page.title} description={page.desc} breadcrumbs={[{ label: "Guides", href: "/guides" }, { label: topicNames[page.topic] || "About" }]} />
    <div className="article-meta"><div><span className="article-mark"><Icon name={page.icon} className="h-5 w-5" /></span><span><strong>MotoIndex research</strong><small>{article.checked ? `Source check: ${article.checked}` : "Rider research & editorial guidance"} / {Math.max(2, Math.ceil(article.sections.reduce((count, section) => count + section.text.join(" ").split(/\s+/).length, 0) / 200))} min read</small></span></div><div className="article-actions"><button type="button" className="action-secondary" onClick={() => setLargeText(!largeText)} aria-pressed={largeText} aria-label="Toggle larger reading text">Aa</button><button type="button" className={`action-secondary ${saved ? "saved-action" : ""}`} onClick={() => toggleBookmark(page.href)} aria-pressed={saved}><Icon name={saved ? "heartFill" : "heart"} className="h-4 w-4" />{saved ? "Saved" : "Save guide"}</button><ShareButton /></div></div>
    <div className="article-layout"><aside className="article-toc"><p>IN THIS GUIDE</p><nav aria-label="Article table of contents">{article.sections.map((section, i) => <a className={activeSection === i ? "active" : ""} href={`#article-section-${i}`} key={section.title}>{String(i + 1).padStart(2, "0")}<span>{section.title}</span></a>)}{recommended.length > 0 && <a href="#related-models"><Icon name="scooter" className="h-4 w-4" /><span>Related models</span></a>}<a href="#article-sources"><Icon name="shield" className="h-4 w-4" /><span>Sources & next steps</span></a></nav>{allChecks.length > 0 && <div className="checklist-progress"><strong>{completed} of {allChecks.length}</strong><p>Personal checks completed</p><progress max={allChecks.length} value={completed} /><small>Stored on this device</small></div>}<button type="button" className="text-link mt-7" onClick={() => window.print()}><Icon name="doc" className="h-4 w-4" />Print this guide</button></aside>
    <article className="article-body">
      {article.takeaways && <div className="article-takeaways"><p className="page-eyebrow">The short version</p><ul>{article.takeaways.map((text) => <li key={text}><Icon name="check" className="h-4 w-4" />{text}</li>)}</ul></div>}
      {article.sections.map((section, index) => <section id={`article-section-${index}`} data-section={index} key={section.title}><p className="article-section-number">{String(index + 1).padStart(2, "0")}</p><h2>{section.title}</h2>{section.text.map((text) => <p key={text}>{text}</p>)}{section.checks && <fieldset className="article-checklist"><legend>Your practical checklist</legend>{section.checks.map((item) => <label key={item} className={checked.includes(item) ? "complete" : ""}><input type="checkbox" checked={checked.includes(item)} onChange={() => check(item)} /><span>{item}</span></label>)}</fieldset>}</section>)}
      {recommended.length > 0 && <section id="related-models"><p className="article-section-number">Explore the index</p><h2>Put the research into practice.</h2><p>Related models from the imported reference catalog, not the full original ranked shortlist. Open each record to check price, sources and the exact variant.</p><div className="article-bike-grid">{recommended.map((bike) => <BikeTile key={bike.id} bike={bike} />)}</div></section>}
      {article.faqs && <section className="article-local-faq"><h2>Frequently asked questions</h2><div className="brand-faq">{article.faqs.map((faq) => <details key={faq.q}><summary>{faq.q}<Icon name="plus" className="h-4 w-4" /></summary><p>{faq.a}</p></details>)}</div></section>}
      {article.related && <section className="article-next-steps"><h2>Explore the exact models and tools.</h2><div>{article.related.map((link) => <a key={link.href} href={link.href}>{link.label}<Icon name="arrowRight" className="h-4 w-4" /></a>)}</div></section>}
      <section id="article-sources" className="article-next-steps"><h2>Put the research to work.</h2><p>Keep the next step close. Your guide, shortlist and planning tools all work here in MotoIndex.</p><div>{[
        [page.topic === "maintenance" ? "/maintenance" : page.topic === "about" ? "/methodology" : "/guides", page.topic === "maintenance" ? "More maintenance guidance" : page.topic === "about" ? "Read our methodology" : "Explore the guide library"],
        [page.topic === "electric" ? "/motorcycles/electric" : page.topic === "about" ? "/corrections" : page.href.includes("helmet") ? "/gear/helmets" : "/ownership/cost-calculator", page.topic === "electric" ? "Explore electric motorcycles" : page.topic === "about" ? "Prepare a correction report" : page.href.includes("helmet") ? "Explore helmet models" : "Plan your ownership budget"],
      ].map(([href, title]) => <a href={href} key={href}>{title}<Icon name="arrowRight" className="h-4 w-4" /></a>)}</div><SourceReferences sources={[...(article.sources || []), ...(article.originalSource === false ? [] : [{ label: "MotoIndex editorial source record", href: sourceUrl(page.href) }])]} note="Requirements and published facts may change. External links are retained as citations so you can verify the evidence; you do not need to leave this page to read the guide." /></section>
    </article></div>
    <section className="related-section"><div className="section-line-heading"><h2>Your next useful read.</h2><a className="text-link" href="/guides">Back to the library<Icon name="arrowRight" className="h-4 w-4" /></a></div><div className="related-reading">{related.map((item) => <a href={item.href} key={item.href}><span>{topicNames[item.topic]}</span><h3>{item.title}</h3><p>{item.desc}</p><Icon name="arrowRight" className="h-5 w-5" /></a>)}</div></section>
  </div></div>;
}