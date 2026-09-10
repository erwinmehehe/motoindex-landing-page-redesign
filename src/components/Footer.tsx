import Icon from "./icons";
import { url } from "../seo";
import { Container } from "./ui";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "All motorcycles", href: "/motorcycles" },
      { label: "All motorcycle brands", href: "/brands" },
      { label: "Electric motorcycles", href: "/motorcycles/electric" },
      { label: "Quick motorcycle finder", href: "/finder" },
      { label: "Rider fitment check", href: "/fitment" },
      { label: "Compare bikes", href: "/compare" },
      { label: "Buying guides", href: "/recommendations" },
      { label: "Dealer directory", href: "/dealers" },
      { label: "Join as a dealer", href: "/dealers/join" },
      { label: "Repo & used bikes", href: "/used-motorcycles/repo" },
    ],
  },
  {
    title: "Free tools",
    links: [
      { label: "Loan calculator", href: "/tools/motorcycle-loan-calculator" },
      { label: "Ownership cost estimator", href: "/ownership/cost-calculator" },
      { label: "LTO fee calculator", href: "/tools/lto-registration-fee-calculator" },
      { label: "Insurance calculator", href: "/tools/motorcycle-insurance-calculator" },
      { label: "Commute cost calculator", href: "/commute/cost-calculator" },
      { label: "EV charging-cost tool", href: "/tools/electric-motorcycle-charging-cost" },
      { label: "EV range calculator", href: "/tools/electric-motorcycle-range-calculator" },
      { label: "Tire fitment data", href: "/tires" },
    ],
  },
  {
    title: "Brand guides",
    links: [
      { label: "Honda motorcycles", href: "/motorcycles/honda" },
      { label: "Yamaha motorcycles", href: "/motorcycles/yamaha" },
      { label: "Suzuki motorcycles", href: "/motorcycles/suzuki" },
      { label: "Kawasaki motorcycles", href: "/motorcycles/kawasaki" },
      { label: "KTM motorcycles", href: "/motorcycles/ktm" },
      { label: "CFMOTO motorcycles", href: "/motorcycles/cfmoto" },
      { label: "All 22 motorcycle brands", href: "/brands" },
      { label: "All 19 helmet brands", href: "/gear/helmets/brands" },
    ],
  },
  {
    title: "Learn & gear",
    links: [
      { label: "All guides", href: "/guides" },
      { label: "Motorcycle price list", href: "/motorcycle-philippines-price-list" },
      { label: "Helmet catalog", href: "/gear/helmets" },
      { label: "Compare helmets", href: "/gear/helmets/compare" },
      { label: "Ownership & paperwork", href: "/ownership" },
      { label: "Maintenance & parts", href: "/maintenance" },
      { label: "Helmet size guide", href: "/guides/motorcycle-helmet-size-guide" },
      { label: "Helmet certification PH", href: "/guides/motorcycle-helmet-certification-philippines" },
      { label: "Accessories", href: "/accessories" },
      { label: "Commuting guides", href: "/commute" },
      { label: "Electric motorcycle guides", href: "/guides/electric-scooters-philippines" },
      { label: "Used-bike buying checklist", href: "/used-motorcycles/buying-checklist" },
    ],
  },
];

const legal = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Data sources", href: "/data-sources" },
  { label: "Editorial policy", href: "/editorial-policy" },
  { label: "Corrections", href: "/corrections" },
  { label: "Content coverage", href: "/research/coverage" },
  { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950 pb-28 pt-16 text-white lg:pb-12">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <a href="/" className="flex items-center gap-2.5" aria-label="MotoIndex home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-racer-400 to-racer-700 shadow-red">
                <Icon name="gauge" className="h-5 w-5 text-white" strokeWidth={2} />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                Moto<span className="text-racer-400">Index</span>
                <span className="ml-1.5 rounded bg-white/10 px-1 py-0.5 text-[10px] font-bold tracking-wider text-white/70">
                  PH
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              The independent motorcycle decision engine for the Philippines. Published SRPs,
              honest comparisons, ownership math, helmet research and checked dealer records —
              with sources and dates on every page.
            </p>
            <div className="mt-6 flex flex-wrap gap-5 text-xs font-bold text-white/70">
              <a href="/saved" className="inline-flex items-center gap-2 hover:text-white"><Icon name="heart" className="h-4 w-4" />My garage</a>
              <a href="/sitemap" className="inline-flex items-center gap-2 hover:text-white"><Icon name="layers" className="h-4 w-4" />All pages</a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/60">
              <span className="h-2.5 w-4 rounded-sm bg-gradient-to-b from-blue-400 via-white to-racer-500" />
              Philippine prices &amp; paperwork · guides for riders everywhere
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={url(link.href)}
                        className="group inline-flex items-start gap-1.5 text-[13px] leading-snug text-white/60 transition-colors hover:text-white"
                      >
                        <span className="mt-[7px] h-px w-0 shrink-0 bg-racer-400 transition-all duration-300 group-hover:w-3" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/8 pt-7 text-xs text-white/40 sm:flex-row">
          <p>© 2026 MotoIndexPH · Published references, not current seller quotations. Shop links may earn us a commission via Involve Asia at no extra cost to you.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.label}>
                <a
                  href={url(l.href)}
                  className="transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#main-content"
            className="group flex items-center gap-1.5 font-bold text-white/60 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-transform group-hover:-translate-y-0.5">
              <Icon name="chevronDown" className="h-3.5 w-3.5 rotate-180" />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
