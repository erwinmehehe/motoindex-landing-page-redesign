import { useState } from "react";
import { catalog, bikePath, money } from "../catalog";
import { pages } from "../content";
import { helmets } from "../resources";
import { archivedMotorcycles, modelFamilies } from "../model-history";
import { electricMotorcycles, electricPath } from "../electric";
import { useApp } from "../state";
import { useRouter } from "../router";
import BikeTile from "../components/BikeTile";
import { EmptyState, PageIntro, PageMeta } from "../components/PageUI";
import Icon from "../components/icons";
import { readStored, writeStored, downloadText } from "../utils/storage";

export default function GaragePage() {
  const { savedIds, bookmarks, recentIds, toggleBookmark, setComparison, notify } = useApp();
  const { navigate } = useRouter();
  const [tab, setTab] = useState("bikes");
  const [note, setNote] = useState(() => { const v = readStored<unknown>("garage-note", ""); return typeof v === "string" ? v : ""; });
  const [comparisonState, setLocalComparison] = useState<string[]>(savedIds.slice(0, 3));
  const comparison = comparisonState.filter((id) => savedIds.includes(id));
  const saved = catalog.filter((bike) => savedIds.includes(bike.id));
  const reading = [...pages,
    ...helmets.map((helmet) => ({ href: `/gear/helmets/${helmet.slug}`, title: `${helmet.brand} ${helmet.model}`, desc: `${helmet.type} helmet. Confirm the exact size, certification and seller price.`, icon: "helmet" })),
    ...archivedMotorcycles.map((bike) => ({ href: bike.path, title: `${bike.brand} ${bike.name}`, desc: "Historical specifications, owner guidance and used-bike budget planning.", icon: "scooter" })),
    ...modelFamilies.map((family) => ({ href: family.path, title: `${family.brand} ${family.name} generations`, desc: family.intro, icon: "layers" })),
    ...electricMotorcycles.map((bike) => ({ href: electricPath(bike), title: bike.name, desc: "Electric model research, battery options and registration context.", icon: "bolt" })),
  ].filter((page) => bookmarks.includes(page.href));
  const recent = recentIds.map((id) => catalog.find((bike) => bike.id === id)).filter((bike) => !!bike);
  const saveNote = () => { const saved = writeStored("garage-note", note); notify(saved ? "Your notes are saved on this device" : "Browser storage is unavailable; notes remain in this session", saved ? "dark" : "red"); };
  const exportShortlist = () => downloadText("my-motoindex-shortlist.txt", ["My MotoIndex shortlist", "", ...saved.map((b) => `${b.brand} ${b.model} | ${money(b.priceFrom)} | ${window.location.origin}${bikePath(b)}`), "", "Notes", note].join("\n"));

  return <div className="inner-page"><div className="page-container"><PageMeta title="My garage and reading list" description="Your saved motorcycles, bookmarked guides, personal shopping notes and recently viewed bikes, stored on this device." /><PageIntro eyebrow="My garage" title="Your next ride, taking shape." description="A home for the bikes you love, the answers you need and the notes you want to bring to the dealer." action={<a href="/motorcycles" className="action-primary">Find another contender<Icon name="plus" className="h-4 w-4" /></a>} />
    <nav className="category-tabs" aria-label="Garage sections">{[["bikes", `Saved motorcycles (${saved.length})`], ["reading", `Reading list (${reading.length})`], ["recent", "Recently viewed"]].map(([key, label]) => <button key={key} type="button" aria-pressed={tab === key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label}</button>)}</nav>
    <div className="garage-layout"><section>
      {tab === "bikes" && (saved.length ? <><div className="garage-compare-builder"><div><h2>Ready for a closer look?</h2><p>Select up to three saved bikes to compare.</p></div><div className="garage-select-list">{saved.map((bike) => <label key={bike.id}><input type="checkbox" checked={comparison.includes(bike.id)} disabled={!comparison.includes(bike.id) && comparison.length >= 3} onChange={(e) => setLocalComparison(e.target.checked ? [...comparison, bike.id] : comparison.filter((id) => id !== bike.id))} />{bike.model}</label>)}</div><button type="button" disabled={comparison.filter((id) => savedIds.includes(id)).length < 2} className="action-primary" onClick={() => { const ids = comparison.filter((id) => savedIds.includes(id)); setComparison(ids); navigate(`/compare?bikes=${ids.join(",")}`); }}>Compare selected bikes</button></div><div className="garage-bike-grid">{saved.map((bike) => <BikeTile key={bike.id} bike={bike} />)}</div></> : <EmptyState title="Every great ride starts with a shortlist." text="Tap the heart on a motorcycle to save it here. No account needed." />)}
      {tab === "reading" && (reading.length ? <div className="reading-list">{reading.map((page) => <div key={page.href}><Icon name={page.icon} className="h-6 w-6 text-racer-500" /><a href={page.href}><h2>{page.title}</h2><p>{page.desc}</p></a><button type="button" className="icon-control" aria-label={`Remove ${page.title} from reading list`} onClick={() => toggleBookmark(page.href)}><Icon name="x" className="h-4 w-4" /></button></div>)}</div> : <EmptyState title="Save an answer for later." text="Bookmark a guide to keep it close when you need it." href="/guides" label="Explore the guides" />)}
      {tab === "recent" && (recent.length ? <div className="garage-bike-grid">{recent.map((bike) => <BikeTile key={bike.id} bike={bike} />)}</div> : <EmptyState title="Your research trail starts here." text="Open a motorcycle's details and it will appear in your recently viewed list." />)}
    </section><aside className="garage-notes"><p className="page-eyebrow">A little preparation</p><h2>Your shopping notes.</h2><p>Questions, a budget ceiling, or the one thing you will not compromise on.</p><label htmlFor="garage-note" className="sr-only">Personal shopping notes</label><textarea id="garage-note" rows={8} maxLength={4000} placeholder="Ask about ABS on the exact variant...\nCheck registration and processing fees..." value={note} onChange={(e) => setNote(e.target.value)} /><button type="button" className="action-primary" onClick={saveNote}>Save my notes</button><button type="button" className="action-secondary" onClick={exportShortlist}><Icon name="doc" className="h-4 w-4" />Download shortlist</button><small>Saved only in this browser. No account or cloud sync. Avoid storing sensitive information.</small></aside></div>
  </div></div>;
}