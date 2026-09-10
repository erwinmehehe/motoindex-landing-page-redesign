import { useState } from "react";
import Icon from "./icons";
import { library, trustPages, url, type SeoCard } from "../seo";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

function LibCard({ card, delay }: { card: SeoCard; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={url(card.href)}
        className="card-sheen group flex h-full flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-racer-200 hover:shadow-lift"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-50 text-ink-700 transition-colors duration-300 group-hover:bg-racer-500 group-hover:text-white">
            <Icon name={card.icon} className="h-5 w-5" />
          </span>
          {card.badge ? (
            <span className="rounded-full bg-racer-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-racer-600">
              {card.badge}
            </span>
          ) : (
            <Icon
              name="external"
              className="h-4 w-4 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-racer-500"
            />
          )}
        </div>
        <h3 className="font-display text-[15px] font-bold leading-snug text-ink-900">
          {card.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-ink-500">{card.desc}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-[13px] font-bold text-racer-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
          Open guide
          <Icon name="arrowRight" className="h-3.5 w-3.5" />
        </span>
      </a>
    </Reveal>
  );
}

export default function ContentHub() {
  const [active, setActive] = useState(library[0].id);
  const group = library.find((g) => g.id === active) ?? library[0];
  const visible = group.cards.slice(0, 6);

  return (
    <section id="library" className="relative scroll-mt-24 bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Rider knowledge library"
          icon="layers"
          title={
            <>
              Sixty-plus researched guides. <span className="text-gradient-red">All free.</span>
            </>
          }
          copy="Every page is built on checkable, dated product data — from budget shortlists and head-to-head comparisons to LTO paperwork, maintenance, commuting math and the 175-helmet catalog."
        />

        {/* Tabs */}
        <Reveal delay={100} className="mt-10">
          <div
            role="group"
            aria-label="Content library sections"
            className="thin-scroll flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
          >
            {library.map((g) => {
              const isActive = g.id === active;
              return (
                <button
                  key={g.id}
                  aria-pressed={isActive}
                  type="button"
                  onClick={() => setActive(g.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "border-ink-900 bg-ink-900 text-white shadow-soft"
                      : "border-ink-200 bg-white text-ink-600 hover:border-ink-400 hover:text-ink-900"
                  }`}
                >
                  <Icon name={g.icon} className="h-4 w-4" />
                  {g.label}
                  <span
                    className={`rounded-full px-1.5 text-[11px] tnum ${
                      isActive ? "bg-white/15 text-white" : "bg-ink-50 text-ink-400"
                    }`}
                  >
                    {g.cards.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 text-center text-sm text-ink-500">{group.blurb}</p>
        </Reveal>

        {/* Cards */}
        <div key={group.id} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((card, i) => (
            <LibCard key={card.href} card={card} delay={(i % 3) * 70} />
          ))}

        </div>
        <div className="mt-8 flex justify-center">
          <a href={group.id === "compare" ? "/guides?topic=compare" : url(group.archive.href)} className="text-link">
            {group.archive.label}<Icon name="arrowRight" className="h-4 w-4" />
          </a>
        </div>

        {/* Trust strip */}
        <Reveal delay={120}>
          <div className="mt-16 rounded-3xl border border-ink-100 bg-white p-7 shadow-soft sm:p-9">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-sm">
                <h3 className="font-display text-xl font-bold text-ink-900">
                  Trust is a product feature
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  Our methodology, sources and corrections log are public. Sponsored content is
                  labeled, and recommendations never mix variants, years or countries.
                </p>
              </div>
              <div className="grid w-full flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3">
                {trustPages.map((t) => (
                  <a
                    key={t.href}
                    href={url(t.href)}
                    className="group flex items-center gap-2.5 rounded-xl border border-ink-100 bg-ink-50/60 px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-racer-200 hover:bg-white hover:shadow-soft"
                  >
                    <Icon name={t.icon} className="h-4 w-4 shrink-0 text-racer-500" />
                    <span className="text-[13px] font-bold leading-tight text-ink-800">
                      {t.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
