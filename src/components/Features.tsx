import Icon from "./icons";
import { features } from "../data";
import { images } from "../data";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

function FeatureCard({ feature, delay = 0 }: { feature: (typeof features)[number]; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="card-sheen group flex h-full flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-racer-200 hover:shadow-lift"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50 text-ink-800 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-racer-500 group-hover:to-racer-700 group-hover:text-white group-hover:shadow-red">
        <Icon name={feature.icon} className="h-[22px] w-[22px]" />
      </span>
      <div>
        <h3 className="font-display text-lg font-bold text-ink-900">{feature.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{feature.body}</p>
      </div>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why MotoIndex"
          icon="target"
          title={
            <>
              Three great experiences — <span className="text-gradient-red">find it, understand it, compare it.</span>
            </>
          }
          copy="Everything a rider needs between 'I want a bike' and 'I'll take this one' — built on a structured, sourced and regularly re-checked data model."
        />

        {/* Top band: image + two showcase cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal variant="left" className="group relative min-h-[22rem] overflow-hidden rounded-3xl border border-ink-100 shadow-soft sm:min-h-[26rem]">
            <img
              src={images.lifestyle}
              alt="Rider overlooking a tropical Philippine coastal highway at golden hour"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-9">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">
                <Icon name="pin" className="h-3.5 w-3.5" /> Built for Philippine roads
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">
                From EDSA queues to Sierra Madre viewpoints
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                Fuel prices, LTO fees, registration rules, rain-season commuting, delivery-rider
                math and provincial dealer coverage — modeled for the Philippines, not a generic
                global catalog.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Fuel & maintenance", "LTO & insurance", "Dealer network", "Rain & traffic"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            <Reveal
              variant="right"
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-ink-950 p-7 text-white shadow-soft sm:p-8"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-racer-600/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-racer-400">
                    <Icon name="compare" className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold">{features[0].title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{features[0].body}</p>
                </div>
              </div>
              <div className="relative mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                {[
                  { k: "Seat", v: "764 – 790 mm", on: true },
                  { k: "Power", v: "15.1 – 15.8 hp", on: false },
                  { k: "Weight", v: "115 – 133 kg", on: true },
                ].map((c) => (
                  <div key={c.k}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      {c.k}
                    </p>
                    <p className="mt-1 text-[11px] font-bold tnum sm:text-xs">{c.v}</p>
                    {c.on && (
                      <p className="mt-1 inline-block rounded-full bg-racer-500/20 px-1.5 py-0.5 text-[9px] font-bold text-racer-300">
                        differs
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal
              variant="right"
              delay={120}
              className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-racer-50 text-racer-600 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-racer-500 group-hover:to-racer-700 group-hover:text-white">
                  <Icon name="calculator" className="h-[22px] w-[22px]" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink-900">
                    {features[1].title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{features[1].body}</p>
                  <div className="mt-4 flex items-baseline gap-2 rounded-xl bg-ink-50 px-4 py-3">
                    <span className="font-display text-2xl font-extrabold text-ink-900 tnum">
                      ₱3,030
                    </span>
                    <span className="text-xs font-semibold text-ink-500">
                      /mo · 36 mo · 30% down on an Aerox — term and total always shown
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Remaining features */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.slice(2).map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
