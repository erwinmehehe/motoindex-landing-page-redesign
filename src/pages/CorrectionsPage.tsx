import { useState, type FormEvent } from "react";
import { useQuery } from "../router";
import { useApp } from "../state";
import { writeStored, readStored, downloadText } from "../utils/storage";
import { PageIntro, PageMeta } from "../components/PageUI";
import Icon from "../components/icons";

type Correction = { page: string; claim: string; correction: string; evidence: string };
export default function CorrectionsPage() {
  const { params } = useQuery();
  const { notify } = useApp();
  const [form, setForm] = useState<Correction>(() => {
    const fallback = { page: params.get("page") || "", claim: "", correction: "", evidence: "" };
    const stored = readStored<unknown>("correction-draft", null);
    if (stored && typeof stored === "object" && !params.get("page")) Object.keys(fallback).forEach((key) => { const value = (stored as Record<string, unknown>)[key]; if (typeof value === "string") fallback[key as keyof Correction] = value; });
    return fallback;
  });
  const [prepared, setPrepared] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); const stored = writeStored("correction-draft", form); setPrepared(true); notify(stored ? "Correction draft saved on this device. It has not been submitted." : "Draft ready to download. Browser storage is unavailable."); };
  const download = () => downloadText("motoindex-correction-report.txt", ["MotoIndex correction report", "Prepared locally; not submitted", "", ...Object.entries(form).map(([name, value]) => `${name.toUpperCase()}\n${value}\n`)].join("\n"));
  return <div className="inner-page"><div className="page-container"><PageMeta title="Report a data correction" description="Prepare a source-supported correction report for a MotoIndex model, price or guide. Save a local draft and download the details." /><PageIntro eyebrow="Better data starts with a clear record" title="Spotted something worth checking?" description="Identify the exact claim and the supporting evidence. Keep specifications, prices and generations separate." breadcrumbs={[{ label: "Editorial policy", href: "/editorial-policy" }, { label: "Corrections" }]} /><div className="planner-layout"><form onSubmit={submit} className="planner-form"><h2>Prepare a correction report.</h2><p className="field-help mb-6">This local tool saves and exports a draft. It does not send a report, email or private information to a server.</p>{([
    ["page", "Page path or address", "For example: /motorcycles/yamaha/nmax-v3"], ["claim", "The claim you want checked", "Include the exact model, variant or dated price."], ["correction", "Your suggested correction", "Explain what differs and why."], ["evidence", "Supporting source", "Manufacturer, manual, government source, or identifiable dated retailer evidence."],
  ] as const).map(([key, label, placeholder]) => <label className="correction-field" key={key}><span>{label}</span><textarea required className="field-input" maxLength={3000} rows={key === "page" ? 2 : 4} placeholder={placeholder} value={form[key]} onChange={(event) => { setForm({ ...form, [key]: event.target.value }); setPrepared(false); }} /></label>)}<button className="action-primary" type="submit">Prepare my report<Icon name="arrowRight" className="h-4 w-4" /></button>{prepared && <div className="draft-success" role="status"><strong>Your report is prepared, not submitted.</strong><button type="button" className="action-secondary mt-4" onClick={download}><Icon name="doc" className="h-4 w-4" />Download correction report</button></div>}</form><aside className="application-aside"><Icon name="shield" className="h-7 w-7 text-racer-500" /><h2>The source should match the claim.</h2><p>A manual can establish a specification. A current retailer page can establish an asking price. Neither automatically proves exact accessory fitment or a universal manufacturer price.</p><p>Do not include ID documents, full frame numbers, payment details or other sensitive personal information in a correction draft.</p><a className="text-link" href="/methodology">Read the full methodology<Icon name="arrowRight" className="h-4 w-4" /></a><a className="text-link mt-4" href="/data-sources">Understand our source types<Icon name="arrowRight" className="h-4 w-4" /></a></aside></div></div></div>;
}