import Icon from "./icons";

export type Reference = { label: string; href: string; note?: string };

export default function SourceReferences({ sources, note }: { sources: Reference[]; note?: string }) {
  if (!sources.length && !note) return null;
  return <details className="source-references"><summary><Icon name="shield" className="h-4 w-4" /><span>Sources & evidence</span><Icon name="plus" className="h-4 w-4" /></summary><div>{note && <p>{note}</p>}<ul>{sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" data-source-link="true">{source.label}<Icon name="external" className="h-3.5 w-3.5" /></a>{source.note && <small>{source.note}</small>}</li>)}</ul><p className="source-external-note">These external links are citations, not the next step in your browsing journey.</p></div></details>;
}