import { useState } from "react";
import Icon from "./icons";
import { plans } from "../data";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Plans & partnerships"
          icon="wallet"
          title={
            <>
              Research free. <span className="text-gradient-red">Go deeper for less</span> than a tank of gas.
            </>
          }
          copy="Every core tool — catalog, comparison, calculators and guides — stays free, forever. MotoIndex+ adds alerts and advanced planning for serious shoppers; dealers get a verified storefront."
        />

        <Reveal delay={120} className="mt-9 flex items-center justify-center">
          <div
            className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white p-1 shadow-soft"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
                !annual ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all ${
                annual ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900"
              }`}
            >
              Annual
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                  annual ? "bg-racer-500 text-white" : "bg-racer-50 text-racer-600"
                }`}
              >
                Save 17%
              </span>
            </button>
          </div>
        </Reveal>

        <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-relaxed text-ink-500">Memberships shown here are design concepts, not active offers. All implemented research tools and the garage are free in this preview. There is no checkout or paid account.</p>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const isCustom = plan.monthly === -1;
            const price = isCustom ? null : annual ? Math.round(plan.annual / 12) : plan.monthly;
            return (
              <Reveal
                key={plan.name}
                delay={i * 110}
                variant="up"
                className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 sm:p-8 ${
                  plan.featured
                    ? "border-racer-500/40 bg-ink-950 text-white shadow-2xl lg:-translate-y-3 lg:scale-[1.02]"
                    : "border-ink-100 bg-white text-ink-800 shadow-soft hover:-translate-y-1.5 hover:shadow-lift"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-racer-500 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-red">
                    <Icon name="sparkles" className="h-3.5 w-3.5" /> Most popular
                  </span>
                )}
                <h3 className={`font-display text-xl font-bold ${plan.featured ? "text-white" : "text-ink-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1.5 min-h-10 text-sm leading-snug ${plan.featured ? "text-white/60" : "text-ink-500"}`}>
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-end gap-1.5">
                  {isCustom ? (
                    <span className={`font-display text-4xl font-extrabold ${plan.featured ? "text-white" : "text-ink-900"}`}>
                      Custom
                    </span>
                  ) : price === 0 ? (
                    <span className={`font-display text-4xl font-extrabold ${plan.featured ? "text-white" : "text-ink-900"}`}>
                      ₱0
                    </span>
                  ) : (
                    <>
                      <span className={`font-display text-4xl font-extrabold tnum ${plan.featured ? "text-white" : "text-ink-900"}`}>
                        ₱{price}
                      </span>
                      <span className={`pb-1.5 text-sm font-semibold ${plan.featured ? "text-white/55" : "text-ink-400"}`}>
                        /month
                      </span>
                    </>
                  )}
                </div>
                <p className={`mt-1 h-5 text-xs font-semibold ${plan.featured ? "text-white/50" : "text-ink-400"}`}>
                  {!isCustom && price !== 0 && annual ? `Billed ₱${plan.annual.toLocaleString("en-PH")} yearly` : plan.finePrint}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f, fi) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.featured
                            ? fi === 0
                              ? "bg-white/15 text-white/70"
                              : "bg-racer-500/20 text-racer-300"
                            : "bg-racer-50 text-racer-600"
                        }`}
                      >
                        <Icon name="check" className="h-3 w-3" strokeWidth={3.2} />
                      </span>
                      <span className={plan.featured ? "text-white/80" : "text-ink-600"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={isCustom ? "/dealers/join" : plan.featured ? "/saved" : "/motorcycles"}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300 ${
                    plan.featured
                      ? "bg-racer-500 text-white shadow-red hover:-translate-y-0.5 hover:bg-racer-400"
                      : "border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white"
                  }`}
                >
                  {plan.featured ? "Try the free garage" : isCustom ? "Prepare an application" : "Explore free"}
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
                <p className={`mt-3 text-center text-[11px] ${plan.featured ? "text-white/40" : "text-ink-400"}`}>
                  {isCustom ? "Local draft tool; no submission without the live application." : "No payment collected in this preview."}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-[13px] text-ink-500">
            <span className="flex items-center gap-1.5">
              <Icon name="shield" className="h-4 w-4 text-racer-500" /> Free tools never disappear
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-ink-300 sm:block" />
            <span className="flex items-center gap-1.5">
              <Icon name="doc" className="h-4 w-4 text-racer-500" /> Data privacy compliant (DPA)
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-ink-300 sm:block" />
            <span className="flex items-center gap-1.5">
              <Icon name="x" className="h-4 w-4 text-racer-500" /> Cancel anytime
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
