import { useState, type FormEvent } from "react";
import { useApp } from "../state";
import { writeStored, downloadText } from "../utils/storage";
import { PageIntro, PageMeta } from "../components/PageUI";
import Icon from "../components/icons";

export default function ContactPage() {
  const { notify } = useApp();
  const [form, setForm] = useState({ name: "", email: "", topic: "research", message: "" });
  const [ready, setReady] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const stored = writeStored("contact-draft", form);
    setReady(true);
    notify(stored ? "Message draft saved on this device. It has not been emailed." : "Draft ready to download. Nothing was sent.");
  };
  return <div className="inner-page"><div className="page-container">
    <PageMeta title="Contact MotoIndex" description="Prepare a local message draft for research questions, corrections or dealer enquiries. This preview does not send email until a delivery service is connected." />
    <PageIntro eyebrow="Talk to the research desk" title="Tell us what to check." description="Corrections, unclear prices and broken shop links help the index. This form stores a draft in your browser; it does not submit to a server yet." breadcrumbs={[{ label: "About", href: "/about" }, { label: "Contact" }]} />
    <div className="planner-layout"><form className="planner-form" onSubmit={submit}><h2>Prepare a message</h2>
      <label className="planner-field"><span>Your name</span><input className="field-input" required maxLength={120} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setReady(false); }} /></label>
      <label className="planner-field"><span>Email</span><input className="field-input" type="email" required maxLength={200} value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setReady(false); }} /></label>
      <label className="planner-field"><span>Topic</span><select className="field-input" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}><option value="research">Research / data question</option><option value="correction">Correction</option><option value="affiliate">Shop link / affiliate</option><option value="dealer">Dealer listing</option><option value="other">Other</option></select></label>
      <label className="correction-field"><span>Message</span><textarea className="field-input" required rows={6} maxLength={4000} value={form.message} onChange={(e) => { setForm({ ...form, message: e.target.value }); setReady(false); }} placeholder="Include the page path, model and the source you checked." /></label>
      <label className="consent-row"><input type="checkbox" required />I understand this draft stays in this browser and is not sent until a mail service is connected.</label>
      <button className="action-primary" type="submit">Save message draft<Icon name="arrowRight" className="h-4 w-4" /></button>
      {ready && <div className="draft-success" role="status"><strong>Draft saved locally. Nothing was emailed.</strong><button type="button" className="action-secondary mt-4" onClick={() => downloadText("motoindex-contact.txt", Object.entries(form).map(([k, v]) => `${k}: ${v}`).join("\n"))}><Icon name="doc" className="h-4 w-4" />Download draft</button><a className="text-link mt-3" href="/corrections">Use the structured correction form instead</a></div>}
    </form>
    <aside className="application-aside"><Icon name="shield" className="h-8 w-8 text-racer-500" /><h2>Faster paths</h2><p>For a wrong specification or price, the corrections tool keeps the claim and evidence together.</p><a className="text-link" href="/corrections">Prepare a correction<Icon name="arrowRight" className="h-4 w-4" /></a><a className="text-link mt-4" href="/dealers/join">Dealer profile draft<Icon name="arrowRight" className="h-4 w-4" /></a><a className="text-link mt-4" href="/affiliate-disclosure">Affiliate disclosure<Icon name="arrowRight" className="h-4 w-4" /></a></aside></div>
  </div></div>;
}
