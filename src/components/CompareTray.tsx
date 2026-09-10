import { useApp } from "../state";
import { useRouter } from "../router";
import { catalogById } from "../catalog";
import Icon from "./icons";

export default function CompareTray() {
  const { compareIds, toggleCompare, setComparison } = useApp();
  const { pathname } = useRouter();
  if (!compareIds.length || pathname.startsWith("/compare")) return null;
  return <aside className="global-compare-tray" aria-label="Your comparison shortlist"><div className="compare-tray-label"><Icon name="compare" className="h-5 w-5 text-racer-400" /><span><strong>{compareIds.length} of 3</strong><small>Ready to compare</small></span></div><div className="compare-tray-bikes">{compareIds.map((id) => <span key={id}>{catalogById.get(id)?.model}<button type="button" aria-label={`Remove ${catalogById.get(id)?.model} from comparison`} onClick={() => toggleCompare(id)}><Icon name="x" className="h-3.5 w-3.5" /></button></span>)}</div><a className="action-primary" href={`/compare?bikes=${compareIds.join(",")}`}>Compare<span className="hidden sm:inline"> bikes</span><Icon name="arrowRight" className="h-4 w-4" /></a><button type="button" className="tray-clear" aria-label="Clear comparison" onClick={() => setComparison([])}><Icon name="x" className="h-4 w-4" /></button></aside>;
}