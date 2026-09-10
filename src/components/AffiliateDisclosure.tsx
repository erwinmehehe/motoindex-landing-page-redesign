import Icon from "./icons";
import { AFFILIATE_CONFIG } from "../affiliate";

export default function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="affiliate-note affiliate-note-compact">
        <Icon name="tag" className="h-3.5 w-3.5" />
        <span>{AFFILIATE_CONFIG.disclosureShort}</span>
      </p>
    );
  }
  return (
    <aside className="affiliate-note" aria-label="Affiliate disclosure">
      <Icon name="shield" className="h-4 w-4" />
      <p>
        <strong>Why you can trust this:</strong> {AFFILIATE_CONFIG.disclosureLong}{" "}
        <a href="/editorial-policy">Read our editorial policy</a>.
      </p>
    </aside>
  );
}
