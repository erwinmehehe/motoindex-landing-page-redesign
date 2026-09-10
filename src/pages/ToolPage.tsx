import { useState } from "react";
import { catalogById, money } from "../catalog";
import { toolDefinitions } from "../tools";
import { useQuery, useRouter } from "../router";
import { useApp } from "../state";
import { PageIntro, PageMeta, ShareButton, SourceNote } from "../components/PageUI";
import Icon from "../components/icons";
import { downloadText } from "../utils/storage";

export default function ToolPage() {
  const { pathname } = useRouter();
  const { params } = useQuery();
  const { notify } = useApp();
  const tool = toolDefinitions[pathname];
  const bike = catalogById.get(params.get("bike") || "");
  const initial = Object.fromEntries(tool.fields.map((field) => [field.key, params.get(field.key) ?? String(field.key === "price" && bike ? bike.priceFrom : field.value)]));
  const [form, setForm] = useState<Record<string, string>>(initial);
  const [method, setMethod] = useState(params.get("method") === "flat" ? "flat" : "amortized");
  const values = Object.fromEntries(tool.fields.map((field) => [field.key, Number(form[field.key])]));
  const invalid = tool.fields.filter((field) => form[field.key]?.trim() === "" || !Number.isFinite(values[field.key]) || values[field.key] < field.min || values[field.key] > field.max || (field.key === "months" && !Number.isInteger(values[field.key])));
  const result = invalid.length ? null : tool.calculate(values, method);
  const shareParams = new URLSearchParams({ ...form, ...(pathname.includes("loan") ? { method } : {}), ...(bike ? { bike: bike.id } : {}) });
  const reset = () => { setForm(Object.fromEntries(tool.fields.map((field) => [field.key, String(field.value)]))); setMethod("amortized"); notify("Planning assumptions reset"); };
  const exportPlan = () => {
    if (!result) return;
    const text = [tool.eyebrow, "MotoIndex PH - planning estimate, not a quote", "", ...tool.fields.map((field) => `${field.label}: ${form[field.key]} ${field.unit || ""}`), "", `${result.label}: ${result.unit ? result.value.toFixed(1) + " " + result.unit : money(result.value)}`, ...result.rows.map(([label, amount, unit]) => `${label}: ${unit ? amount.toFixed(1) + " " + unit : money(amount)}`), "", result.explanation].join("\n");
    downloadText("motoindex-planning-estimate.txt", text);
  };

  return <div className="inner-page"><div className="page-container">
    <PageMeta title={tool.eyebrow} description={tool.description} />
    <PageIntro eyebrow={tool.eyebrow} title={tool.title} description={tool.description} breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: tool.eyebrow }]} action={<ShareButton label="Share these numbers" path={`${pathname}?${shareParams}`} />} />
    <div className="planner-layout"><section className="planner-form" aria-labelledby="planner-input-heading"><div className="section-line-heading"><h2 id="planner-input-heading">Make the numbers yours.</h2><button type="button" className="text-link" onClick={reset}>Reset</button></div>{bike && <p className="planner-bike"><Icon name="scooter" className="h-4 w-4" />Starting with your {bike.brand} {bike.model}. Every assumption is editable.</p>}
      <div className="planner-fields">{tool.fields.map((field) => <label className="planner-field" key={field.key}><span>{field.label}</span><div className="number-input"><input type="number" inputMode="decimal" min={field.min} max={field.max} step={field.step || 1} value={form[field.key]} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} aria-invalid={invalid.some((f) => f.key === field.key)} aria-describedby={`help-${field.key}`} /><span>{field.unit}</span></div><small id={`help-${field.key}`}>{invalid.some((f) => f.key === field.key) ? `Enter ${field.min} to ${field.max}${field.key === "months" ? " whole months" : ""}.` : " "}</small></label>)}</div>
      {pathname.includes("loan") && <fieldset className="interest-method"><legend>Interest method</legend><label><input type="radio" name="method" checked={method === "amortized"} onChange={() => setMethod("amortized")} /><span><strong>Diminishing balance</strong><small>Interest on the remaining loan balance.</small></span></label><label><input type="radio" name="method" checked={method === "flat"} onChange={() => setMethod("flat")} /><span><strong>Flat / add-on</strong><small>Interest on the original financed amount.</small></span></label></fieldset>}
      <SourceNote>Inputs are planning assumptions, not current dealer, bank, insurer or government quotations. Replace them with the exact figures you receive.</SourceNote>
    </section>
    <aside className="planner-result" aria-label="Calculated estimate"><div className="planner-result-top"><span className="page-eyebrow">Your estimate</span><Icon name={tool.icon} className="h-6 w-6 text-racer-400" /></div>{result ? <><p className="result-label">{result.label}</p><p className="result-number" aria-live="polite">{result.unit ? `${result.value.toLocaleString("en-PH", { maximumFractionDigits: 1 })}` : money(result.value)}{result.unit && <span> {result.unit}</span>}</p>{result.suffix && <p className="result-suffix">{result.suffix}</p>}<dl>{result.rows.map(([name, value, unit]) => <div key={name}><dt>{name}</dt><dd>{unit ? `${value.toLocaleString("en-PH", { maximumFractionDigits: 1 })} ${unit}` : money(value)}</dd></div>)}</dl><p className="result-explanation">{result.explanation}</p><button type="button" className="action-primary" onClick={exportPlan}><Icon name="doc" className="h-4 w-4" />Download my estimate</button></> : <div className="result-invalid" role="status"><h2>A few numbers need a second look.</h2><p>Check the highlighted fields. We will calculate your estimate when they are valid.</p></div>}</aside></div>
    <section className="related-section"><div className="section-line-heading"><h2>Keep the whole picture in view.</h2><a className="text-link" href="/tools">All tools<Icon name="arrowRight" className="h-4 w-4" /></a></div><div className="tool-crosslinks">{Object.entries(toolDefinitions).filter(([path]) => path !== pathname).slice(0, 3).map(([path, item]) => <a href={path} key={path}><Icon name={item.icon} className="h-5 w-5 text-racer-500" /><div><h3>{item.eyebrow}</h3><p>{item.description}</p></div><Icon name="arrowUpRight" className="h-5 w-5" /></a>)}</div></section>
  </div></div>;
}