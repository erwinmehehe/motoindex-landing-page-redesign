import { useEffect, useState, type ReactNode } from "react";
import Icon from "./icons";
import { useRouter } from "../router";
import { useApp } from "../state";
import { BASE } from "../seo";

export function PageMeta({ title, description }: { title: string; description: string }) {
  const { pathname } = useRouter();
  useEffect(() => {
    document.title = `${title} | MotoIndex PH`;
    const meta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attr, name); document.head.appendChild(element); }
      element.content = content;
    };
    meta("description", description);
    meta("og:title", `${title} | MotoIndex PH`, true);
    meta("og:description", description, true);
    meta("og:url", BASE + pathname, true);
    // Production pages are crawlable and indexable.
    meta("robots", "index, follow");
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = BASE + pathname;
  }, [title, description, pathname]);
  return null;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const { pathname } = useRouter();
  const all = [{ label: "Home", href: "/" }, ...items];
  const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: BASE + (item.href || pathname) })) });
  useEffect(() => {
    const element = document.createElement("script");
    element.id = "motoindex-breadcrumbs";
    element.type = "application/ld+json";
    element.textContent = schema;
    document.head.appendChild(element);
    return () => element.remove();
  }, [schema]);
  return <nav aria-label="Breadcrumb" className="page-breadcrumb"><ol>{all.map((item, i) => <li key={i}>{i > 0 && <span aria-hidden="true">/</span>}{item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}

export function PageIntro({ eyebrow, title, description, action, breadcrumbs }: { eyebrow: string; title: string; description: string; action?: ReactNode; breadcrumbs?: { label: string; href?: string }[] }) {
  return <header className="page-intro"><Breadcrumbs items={breadcrumbs ?? [{ label: eyebrow }]} /><div className="page-intro-line"><div><p className="page-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{action && <div className="page-intro-action">{action}</div>}</div></header>;
}

export function EmptyState({ title, text, href = "/motorcycles", label = "Explore motorcycles", children }: { title: string; text: string; href?: string; label?: string; children?: ReactNode }) {
  return <div className="empty-state"><Icon name="search" className="h-8 w-8 text-ink-400" /><h2>{title}</h2><p>{text}</p>{children || <a href={href} className="action-primary">{label}<Icon name="arrowRight" className="h-4 w-4" /></a>}</div>;
}

export function ShareButton({ path, label = "Share", className = "action-secondary" }: { path?: string; label?: string; className?: string }) {
  const { notify } = useApp();
  const [fallback, setFallback] = useState(false);
  const link = new URL(path || window.location.pathname + window.location.search, window.location.origin).href;
  const share = async () => {
    try { if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable"); await navigator.clipboard.writeText(link); notify("Link copied. Your current selection is included."); }
    catch { setFallback(true); }
  };
  return <div className="share-control"><button type="button" className={className} onClick={share}><Icon name="external" className="h-4 w-4" />{label}</button>{fallback && <label className="share-fallback">Copy this link<input aria-label="Link to copy" readOnly value={link} onFocus={(event) => event.target.select()} /><button type="button" onClick={() => setFallback(false)}>Close</button></label>}</div>;
}

export function SourceNote({ children }: { children: ReactNode }) {
  return <div className="source-note"><Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" /><p>{children}</p></div>;
}