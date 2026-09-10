import { useEffect } from "react";
import { catalog, catalogById, comparisonPairs, bikePath, publishedPrice, money, type CatalogBike } from "../catalog";
import { useApp } from "../state";
import { useQuery } from "../router";
import { pageByPath } from "../content";
import { BikeImage } from "../components/BikeTile";
import { EmptyState, PageIntro, PageMeta, ShareButton, SourceNote } from "../components/PageUI";
import Icon from "../components/icons";
import { downloadText } from "../utils/storage";

export default function ComparePage({ slug }: { slug?: string }) {
  const { compareIds, setComparison } = useApp();
  const { params, setQuery } = useQuery();
  const queryIds = params.get("bikes");
  const diffOnly = params.get("differences") === "1";
  const record = slug ? pageByPath.get(`/compare/${slug}`) : undefined;
  useEffect(() => {
    if (queryIds !== null) setComparison(queryIds.split(","));
    else if (slug && comparisonPairs[slug]) setComparison(comparisonPairs[slug]);
  }, [slug, queryIds, setComparison]);
  const selected = compareIds.map((id) => catalogById.get(id)).filter((bike): bike is CatalogBike => !!bike);
  const changeBike = (index: number, id: string) => {
    const next = [...compareIds]; next[index] = id;
    const clean = next.filter(Boolean);
    setComparison(clean); setQuery({ bikes: clean.join(",") || "none" });
  };
  const rows: { name: string; value: (bike: CatalogBike) => string }[] = [
    { name: "Published price", value: publishedPrice }, { name: "Displacement", value: (b) => `${b.cc} cc` },
    { name: "Power", value: (b) => `${b.hp} hp` }, { name: "Transmission", value: (b) => b.transmission },
    { name: "Seat height", value: (b) => `${b.seat} mm` }, { name: "Curb weight", value: (b) => b.weight ? `${b.weight} kg` : "Not imported" },
    { name: "Fuel capacity", value: (b) => b.tank ? `${b.tank} L` : "Not imported" }, { name: "Body type", value: (b) => b.category[0] },
    { name: "Brakes / ABS", value: (b) => b.brakes || "Confirm exact variant" }, { name: "Source date", value: (b) => b.checked },
  ];
  const visibleRows = diffOnly ? rows.filter((row) => new Set(selected.map(row.value)).size > 1) : rows;
  const exportCsv = () => {
    const csv = [["Specification", ...selected.map((b) => `${b.brand} ${b.model}`)], ...rows.map((row) => [row.name, ...selected.map(row.value)])].map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    downloadText("motoindex-comparison.csv", csv, "text/csv;charset=utf-8");
  };
  const suggestions = ["aerox-v3-vs-nmax-v3", "adv-160-vs-pcx-160", "ninja-500-vs-450sr"];

  return <div className="inner-page"><div className="page-container">
    <PageMeta title={record?.title || "Compare motorcycles side by side"} description={record?.desc || "Compare up to three motorcycles, highlight differences and share or export your shortlist."} />
    <PageIntro eyebrow="Side by side" title={record?.title || "The details make the difference."} description={record?.desc || "Your contenders. The same units. A clearer picture of what matters to your ride."} breadcrumbs={[{ label: "Motorcycles", href: "/motorcycles" }, { label: "Compare" }]} action={<ShareButton path={`/compare?bikes=${compareIds.join(",")}${diffOnly ? "&differences=1" : ""}`} label="Share comparison" />} />
    <div className="compare-selectors">{[0, 1, 2].map((index) => <div className={`compare-selector ${selected[index] ? "has-bike" : ""}`} key={index}><label htmlFor={`compare-${index}`}><span>0{index + 1}</span>{index === 2 ? "One more perspective (optional)" : "Choose a motorcycle"}</label><select id={`compare-${index}`} className="field-input" value={compareIds[index] || ""} onChange={(e) => changeBike(index, e.target.value)}><option value="">Select a motorcycle</option>{catalog.map((bike) => <option key={bike.id} value={bike.id} disabled={compareIds.includes(bike.id) && compareIds[index] !== bike.id}>{bike.brand} {bike.model}</option>)}</select></div>)}</div>
    {selected.length < 2 ? <EmptyState title={selected.length ? "Add a second bike to see the differences." : "Two bikes. One informed decision."} text="Choose contenders above, or start with one of the rider comparisons below." href="/motorcycles" label="Explore the catalog" /> : <>
      <div className="compare-toolbar"><label className="toggle-label"><input type="checkbox" checked={diffOnly} onChange={(e) => setQuery({ differences: e.target.checked ? "1" : undefined })} /><span className="switch-track" />Show differences only</label><div className="flex flex-wrap gap-2"><button type="button" onClick={exportCsv} className="action-secondary"><Icon name="doc" className="h-4 w-4" />Export CSV</button><button type="button" onClick={() => window.print()} className="action-secondary">Print</button></div></div>
      <div className="compare-table-scroll" tabIndex={0} role="region" aria-label="Motorcycle specification comparison, scroll horizontally on smaller screens"><table className="compare-table"><caption className="sr-only">Published specifications for your selected motorcycles</caption><thead><tr><th scope="col"><p className="page-eyebrow">Your shortlist</p><p className="table-corner">Look beyond<br />the headline.</p></th>{selected.map((bike) => <th scope="col" key={bike.id}><a href={bikePath(bike)}><BikeImage bike={bike} /><span className="table-brand">{bike.brand}</span><span className="table-model">{bike.model}</span></a></th>)}</tr></thead><tbody>{visibleRows.map((row) => <tr key={row.name}><th scope="row">{row.name}</th>{selected.map((bike) => <td key={bike.id}>{row.value(bike)}</td>)}</tr>)}</tbody><tfoot><tr><th scope="row">Keep researching</th>{selected.map((bike) => <td key={bike.id}><a href={bikePath(bike)} className="text-link">Full bike details<Icon name="arrowRight" className="h-3 w-3" /></a></td>)}</tr></tfoot></table></div>
      <div className="comparison-insight"><Icon name="target" className="h-6 w-6 text-racer-500" /><div><h2>A difference is not automatically an advantage.</h2><p>The starting-price spread is {money(Math.max(...selected.map((b) => b.priceFrom)) - Math.min(...selected.map((b) => b.priceFrom)))}. Check the exact equipment, your riding position and the full cost to own before deciding.</p></div><a href="/ownership/cost-calculator" className="text-link">Plan ownership<Icon name="arrowRight" className="h-4 w-4" /></a></div>
    </>}
    {slug === "aerox-vs-nmax" && <SourceNote>This interactive table uses the current V3 records. Do not assign these figures to a V2. Explore the local <a href="/motorcycles/yamaha/aerox">Aerox generation guide</a> and <a href="/motorcycles/yamaha/nmax">NMAX generation guide</a> for older models and historical price context.</SourceNote>}
    <section className="related-section"><div className="section-line-heading"><h2>Often compared. Always individual.</h2><a href="/guides?topic=compare" className="text-link">All 20 comparisons<Icon name="arrowRight" className="h-4 w-4" /></a></div><div className="comparison-suggestions">{suggestions.map((pair) => <a href={`/compare/${pair}`} key={pair}><span>{pageByPath.get(`/compare/${pair}`)?.title}</span><Icon name="arrowUpRight" className="h-5 w-5" /></a>)}</div></section>
    <SourceNote>Prices are dated references, not dealer quotes. Missing imported data is shown explicitly. Confirm the exact Philippine model generation, variant and equipment before buying.</SourceNote>
  </div></div>;
}