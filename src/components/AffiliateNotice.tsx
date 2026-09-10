import { useState } from "react";
import { readStored, writeStored } from "../utils/storage";
import { AFFILIATE_CONFIG } from "../affiliate";

export default function AffiliateNotice() {
  const [hidden, setHidden] = useState(() => readStored<string>("affiliate-notice", "show") === "dismissed");
  if (hidden) return null;
  const dismiss = () => { writeStored("affiliate-notice", "dismissed"); setHidden(true); };
  return (
    <div className="affiliate-banner" role="note">
      <p>{AFFILIATE_CONFIG.disclosureShort} <a href="/affiliate-disclosure">Details</a></p>
      <button type="button" onClick={dismiss} aria-label="Dismiss affiliate notice">OK</button>
    </div>
  );
}
