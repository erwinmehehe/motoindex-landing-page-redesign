import { useEffect, useRef, useState } from "react";
import Icon from "./icons";
import { tools } from "../data";
import { url } from "../seo";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    const t0 = performance.now();
    const dur = 420;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <span className="tnum">₱{Math.round(display).toLocaleString("en-PH")}</span>;
}

const php = (n: number) => `₱${Math.round(n).toLocaleString("en-PH")}`;

export default function Tools() {
  const [price, setPrice] = useState(125900);
  const [dpPct, setDpPct] = useState(30);
  const [term, setTerm] = useState(36);

  const monthlyRate = 0.012; // illustrative 1.2% per month, diminishing balance
  const fees = 3500;
  const dp = price * (dpPct / 100);
  const financed = price - dp;
  const factor = Math.pow(1 + monthlyRate, term);
  const monthly = (financed * monthlyRate * factor) / (factor - 1 || 1);
  const totalPayable = dp + monthly * term + fees;

  return (
    <section
      id="tools"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-20 text-white sm:py-28"
    >
      <div className="grid-fade absolute inset-0" />
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-racer-700/20 blur-[130px]" />

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Cost & ownership tools"
          icon="wallet"
          title={
            <>
              Know the monthly reality <span className="text-gradient-red">before you sign.</span>
            </>
          }
          copy="A low monthly number without its term and down payment is a trick. Our calculators show the full picture — fees, fuel, registration and all."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          {/* Tool list */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {tools.map((t, i) => (
              <Reveal
                as="a"
                href={url(t.href)}
                key={t.title}
                delay={(i % 3) * 80}
                className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-racer-400 transition-colors group-hover:bg-racer-500 group-hover:text-white">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold leading-tight">{t.title}</h3>
                    {t.meta && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          t.meta === "New"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-racer-500/15 text-racer-300"
                        }`}
                      >
                        {t.meta}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-white/55">{t.body}</p>
                </div>
                <Icon
                  name="external"
                  className="ml-auto h-4 w-4 shrink-0 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-racer-400"
                />
              </Reveal>
            ))}
          </div>

          {/* Calculator */}
          <Reveal variant="scale" delay={120}>
            <div className="rounded-3xl bg-white p-6 text-ink-800 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
                  <Icon name="calculator" className="h-5 w-5 text-racer-600" />
                  Motorcycle loan planner
                </h3>
                <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                  Estimate
                </span>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="price-range" className="text-sm font-bold text-ink-700">
                      Cash price (SRP)
                    </label>
                    <span className="font-display text-lg font-extrabold text-ink-900">
                      <AnimatedNumber value={price} />
                    </span>
                  </div>
                  <input
                    id="price-range"
                    type="range"
                    min={60000}
                    max={400000}
                    step={1000}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="ranger mt-3"
                    style={{ ["--fill" as string]: `${((price - 60000) / 340000) * 100}%` }}
                  />
                  <div className="mt-1 flex justify-between text-[11px] font-semibold text-ink-400">
                    <span>₱60K</span>
                    <span>₱400K</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="dp-range" className="text-sm font-bold text-ink-700">
                      Down payment
                    </label>
                    <span className="font-display text-lg font-extrabold text-ink-900 tnum">
                      {dpPct}% · {php(dp)}
                    </span>
                  </div>
                  <input
                    id="dp-range"
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={dpPct}
                    onChange={(e) => setDpPct(Number(e.target.value))}
                    className="ranger mt-3"
                    style={{ ["--fill" as string]: `${((dpPct - 10) / 50) * 100}%` }}
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-ink-700">Term</p>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[12, 24, 36, 48].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTerm(m)}
                        aria-pressed={term === m}
                        className={`rounded-xl border py-2.5 text-sm font-bold transition-all active:scale-95 ${
                          term === m
                            ? "border-ink-900 bg-ink-900 text-white"
                            : "border-ink-200 bg-white text-ink-600 hover:border-ink-400"
                        }`}
                      >
                        {m} mo
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-ink-950 p-5 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">
                    Estimated monthly payment
                  </p>
                  <p className="mt-1 font-display text-4xl font-extrabold text-white">
                    <AnimatedNumber value={monthly} />
                    <span className="ml-1 text-base font-bold text-white/50">/ month</span>
                  </p>
                  <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
                    {[
                      ["Down payment", php(dp)],
                      ["Amount financed", php(financed)],
                      ["One-time fees (est.)", php(fees)],
                      ["Total amount payable", php(totalPayable)],
                    ].map(([k, v], i) => (
                      <div
                        key={k}
                        className={`flex items-center justify-between ${
                          i === 3 ? "border-t border-white/10 pt-3 font-bold" : "text-white/70"
                        }`}
                      >
                        <dt>{k}</dt>
                        <dd className="tnum">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-500">
                  <Icon name="shield" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-racer-500" />
                  Illustrative estimate at 1.2% monthly (diminishing balance), not a lender offer.
                  Rates, promos and fees vary by bank and dealer — MotoIndex shows assumptions,
                  never hidden fine print.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
