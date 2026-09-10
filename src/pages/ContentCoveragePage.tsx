import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { actionLabels, auditKeyword, keywordExportUrl, reviewedKeywords, sheetUrl, spreadsheetScope, type AuditedKeyword, type GapAction } from "../keyword-audit";
import { keywordRows, csvCell } from "../utils/keyword-csv";
import { downloadText } from "../utils/storage";
import { helmets, helmetCoverage } from "../helmet-catalog";
import { PageIntro, PageMeta } from "../components/PageUI";
import Icon from "../components/icons";

export default function ContentCoveragePage() {
  const [rows, setRows] = useState<AuditedKeyword[]>(reviewedKeywords);
  const [dataset, setDataset] = useState("Reviewed priority clusters");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<GapAction | "all">("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSources, setShowSources] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; controller.current?.abort(); }; }, []);
  const counts = useMemo(() => Object.fromEntries(Object.keys(actionLabels).map((key) => [key, rows.filter((row) => row.action === key).length])) as Record<GapAction, number>, [rows]);
  const filtered = useMemo(() => rows.filter((row) => (filter === "all" || row.action === filter) && `${row.keyword} ${row.path || ""} ${row.reason}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => (b.volume ?? -1) - (a.volume ?? -1)), [rows, filter, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / 40));
  const currentPage = Math.min(page, totalPages);
  const displayed = filtered.slice((currentPage - 1) * 40, currentPage * 40);
  const builtUrls = [...new Set(reviewedKeywords.filter((row) => row.action === "new").map((row) => row.path).filter(Boolean))];
  const restoreUrls = [...new Set(reviewedKeywords.filter((row) => row.action === "restored").map((row) => row.path).filter(Boolean))];

  const loadShared = async () => {
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    setLoading(true); setError("");
    const timeout = setTimeout(() => abort.abort(), 60000);
    try {
      const response = await fetch(keywordExportUrl, { signal: abort.signal, credentials: "omit" });
      if (!response.ok) throw new Error(`Sheet request returned HTTP ${response.status}.`);
      const text = await response.text();
      const parsed = keywordRows(text);
      const audited = parsed.map(auditKeyword);
      if (!mounted.current || abort.signal.aborted) return;
      setRows(audited); setDataset(`Shared keyword tab / ${parsed.length.toLocaleString()} rows`); setPage(1); setFilter("all");
    } catch (cause) {
      if (mounted.current && controller.current === abort) setError(abort.signal.aborted ? "Sheet loading stopped or timed out. You can export the keyword tab as CSV and upload it below." : `${cause instanceof Error ? cause.message : "Unable to load the sheet."} If the browser blocks the Google export, use Upload CSV. No rows have been published.`);
    } finally { clearTimeout(timeout); if (mounted.current && controller.current === abort) setLoading(false); }
  };
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    controller.current?.abort();
    controller.current = null;
    setLoading(false); setError("");
    try {
      if (file.size > 25000000) throw new Error("Choose a CSV or TSV smaller than 25 MB.");
      const parsed = keywordRows(await file.text());
      if (!mounted.current) return;
      setRows(parsed.map(auditKeyword)); setDataset(`${file.name} / ${parsed.length.toLocaleString()} rows`); setPage(1); setFilter("all");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to read the file."); }
    event.target.value = "";
  };
  const exportAudit = () => {
    const data = [["Keyword", "Country", "Export volume estimate", "Export KD", "Decision", "Destination", "Reason", "Review basis", "Competitor URL"], ...filtered.map((row) => [row.keyword, row.country, row.volume, row.kd, actionLabels[row.action], row.path || "", row.reason, row.basis, row.competitorUrl])];
    downloadText("motoindex-keyword-coverage.csv", data.map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
  };

  return <div className="inner-page coverage-page"><div className="page-container">
    <PageMeta title="Content coverage and competitor keyword review" description="Review the helmet catalog restoration, keyword-to-page mappings, built content gaps, excluded queries and topics requiring further evidence." />
    <PageIntro eyebrow="MotoIndex research desk" title="Fill the real gaps. Keep the useful pages." description="A transparent record of what was restored, what was built and what still needs evidence. A keyword match is not a ranking guarantee." breadcrumbs={[{ label: "All pages", href: "/sitemap" }, { label: "Content coverage" }]} action={<a href={sheetUrl} className="action-secondary" target="_blank" rel="noreferrer">Open source spreadsheet<Icon name="external" className="h-4 w-4" /></a>} />

    <section className="coverage-helmet-summary"><div><p className="page-eyebrow">The helmet issue, resolved</p><h2>{helmets.length} local model pages. Not 22 samples.</h2><p>The old app contained a partial catalog and a three-tile brand preview. All detail records in the fetched helmet catalog are now included, with pagination, search and explicit pending prices.</p><a className="text-link" href="/gear/helmets">Explore the complete helmet catalog<Icon name="arrowRight" className="h-4 w-4" /></a></div><details><summary>Check coverage by brand<Icon name="chevronDown" className="h-4 w-4" /></summary><div className="helmet-coverage-table"><table><caption className="sr-only">Local helmet pages compared with source detail records</caption><thead><tr><th scope="col">Brand</th><th scope="col">Local / source details</th><th scope="col">Priced</th></tr></thead><tbody>{helmetCoverage.map((item) => <tr key={item.brand}><th scope="row"><a href={`/gear/helmets/${item.brand.toLowerCase()}`}>{item.brand}</a></th><td>{item.loaded} / {item.expected}</td><td>{item.priced}</td></tr>)}</tbody></table></div></details></section>

    <section className="coverage-scope"><div><p className="page-eyebrow">What the spreadsheet actually contains</p><h2>30,000 rows is not 30,000 new pages.</h2></div><div><p>The export has <strong>{spreadsheetScope.philippinesRows.toLocaleString()} PH rows</strong>. A server-side relevance screen returns <strong>{spreadsheetScope.candidateRows.toLocaleString()} candidates</strong>; many are duplicate wordings, existing pages or ambiguous products. The first 600 volume-sorted candidates plus targeted clusters were reviewed for this first batch.</p><p>The default tab returned no readable keyword rows. The populated tab is <strong>1933668074</strong>. No helmet keywords were returned by the keyword-column query, so the helmet expansion is a catalog restoration, not a finding from this competitor export.</p><small>{spreadsheetScope.note} Volume and KD below are values from your export, not live metrics, forecasts or independent rank measurements.</small></div></section>
    <div className="coverage-delivery"><span><strong>{builtUrls.length}</strong> prioritized new destinations built</span><span><strong>{restoreUrls.length}</strong> existing live destinations restored locally</span><span>No original URLs removed</span></div>

    <section className="keyword-workspace" aria-label="Keyword review workspace"><div className="section-line-heading"><div><p className="page-eyebrow">Keyword to destination</p><h2>One intent. One useful home.</h2><p>{dataset}</p></div><button className="action-secondary" type="button" onClick={exportAudit}><Icon name="doc" className="h-4 w-4" />Export this review</button></div>
      <div className="coverage-import"><div><button type="button" className="action-primary" disabled={loading} onClick={loadShared}>{loading ? "Loading shared sheet..." : "Analyze the full shared tab"}<Icon name="arrowRight" className="h-4 w-4" /></button>{loading && <button type="button" className="action-secondary" onClick={() => controller.current?.abort()}>Cancel</button>}<label className="action-secondary upload-csv">Upload CSV / TSV<input type="file" accept=".csv,.tsv,text/csv,text/tab-separated-values" onChange={upload} /></label><button className="text-link" type="button" onClick={() => { controller.current?.abort(); setRows(reviewedKeywords); setDataset("Reviewed priority clusters"); setError(""); setPage(1); setFilter("all"); }}>Reset to reviewed clusters</button></div><p>Full-tab and uploaded-file mappings are suggestions, not a completed manual audit. Unknown terms stay in Needs research; importing never creates or publishes pages. Data stays in this browser session.</p>{error && <p className="coverage-error" role="alert">{error}</p>}</div>
      <nav className="category-tabs coverage-tabs" aria-label="Keyword decision filter"><button type="button" aria-pressed={filter === "all"} className={filter === "all" ? "active" : ""} onClick={() => { setFilter("all"); setPage(1); }}>All rows ({rows.length.toLocaleString()})</button>{(Object.keys(actionLabels) as GapAction[]).map((key) => <button type="button" key={key} aria-pressed={filter === key} className={filter === key ? "active" : ""} onClick={() => { setFilter(key); setPage(1); }}>{actionLabels[key]} ({counts[key].toLocaleString()})</button>)}</nav>
      <div className="coverage-table-controls"><label><Icon name="search" className="h-4 w-4" /><span className="sr-only">Search keyword review</span><input type="search" placeholder="Find a keyword, page or decision..." value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} /></label><label className="priced-only"><input type="checkbox" checked={showSources} onChange={(event) => setShowSources(event.target.checked)} />Show competitor URLs</label><span aria-live="polite">{filtered.length.toLocaleString()} rows</span></div>
      <div className="keyword-table-wrap" role="region" tabIndex={0} aria-label="Keyword coverage table"><table className="keyword-table"><caption className="sr-only">Reviewed or suggested keyword destinations and research decisions</caption><thead><tr><th scope="col">Keyword / market</th><th scope="col">Export volume</th><th scope="col">KD</th><th scope="col">Decision</th><th scope="col">Destination & reasoning</th></tr></thead><tbody>{displayed.map((row, index) => <tr key={`${row.keyword}-${row.country}-${index}`}><th scope="row">{row.keyword}<small>{row.country || "Unspecified market"} / {row.basis}</small>{showSources && row.competitorUrl && <a href={row.competitorUrl} target="_blank" rel="noreferrer" className="competitor-reference">Competitor result<Icon name="external" className="h-3 w-3" /></a>}</th><td>{row.volume === null ? "Not supplied" : row.volume.toLocaleString()}</td><td>{row.kd ?? "-"}</td><td><span className={`audit-decision decision-${row.action}`}>{actionLabels[row.action]}</span></td><td>{row.path && <a className="audit-destination" href={row.path}>{row.path}<Icon name="arrowUpRight" className="h-3.5 w-3.5" /></a>}<p>{row.reason}</p></td></tr>)}</tbody></table>{!displayed.length && <div className="empty-state"><h3>No rows match.</h3><p>Change the decision filter or clear the search.</p></div>}</div>
      <nav className="pagination" aria-label="Keyword review pages"><button type="button" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>Previous</button><span className="audit-page-label">Page {currentPage} of {totalPages}</span><button type="button" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>Next</button></nav>
    </section>
    <section className="coverage-boundaries"><h2>What remains before publishing.</h2><p>The first batch is implemented, not the entire 30,000-row opportunity set. Review the remaining product identities, original live pages, exact-market evidence and search intent before adding more pages. Car keywords, competitor navigation and other-market queries are not turned into irrelevant motorcycle articles.</p><p>The application is configured for search indexing. Continue validating production rendering, deployment and real-browser QA before publishing major content changes.</p></section>
  </div></div>;
}