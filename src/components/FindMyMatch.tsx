import { useMemo, useState } from "react";
import Icon from "./icons";
import { priceLabel, type Bike } from "../data";
import { catalog as bikes } from "../catalog";
import { url } from "../seo";
import { Container } from "./ui";
import { Reveal, useInView } from "./Reveal";
import { useApp } from "../state";

const budgetOptions = [
  { id: "under100", label: "Under ₱100K", sub: "Starters & frugal commuters" },
  { id: "100to175", label: "₱100K–175K", sub: "The Philippines' sweet spot" },
  { id: "175plus", label: "₱175K+", sub: "Big bikes & premium machines" },
];

const rideOptions = [
  { id: "commute", label: "Daily city commute", sub: "Traffic, queues, rain", icon: "route", cats: ["Commuter", "Scooter"] },
  { id: "tour", label: "Open roads & touring", sub: "Provinces, passengers, luggage", icon: "adventure", cats: ["Adventure", "Scooter"] },
  { id: "sport", label: "Weekend fun & sport", sub: "Twisties, pace, presence", icon: "sport", cats: ["Sport", "Naked"] },
  { id: "trail", label: "Trails & off-road", sub: "Fire roads, farms, highlands", icon: "offroad", cats: ["Off-road", "Adventure"] },
];

const transOptions = [
  { id: "Automatic", label: "Automatic", sub: "Twist-and-go, stop-and-go friendly" },
  { id: "Manual", label: "Manual", sub: "Gears and engagement" },
  { id: "Either", label: "No preference", sub: "Show me both" },
];

const steps = ["Budget", "Your ride", "Transmission"];

type Answers = { budget: string | null; ride: string | null; trans: string | null };

function rankBikes(a: Answers) {
  const ride = rideOptions.find((r) => r.id === a.ride)!;
  const trans = a.trans!;
  return bikes
    .filter((b) => b.budget === a.budget && (trans === "Either" || b.transmission === trans))
    .map((b) => {
      const budgetScore = b.budget === a.budget ? 42 : 20;
      const rideScore = b.category.some((c) => ride.cats.includes(c)) ? 38 : 12;
      const transScore = trans === "Either" || b.transmission === trans ? 20 : 6;
      const score = budgetScore + rideScore + transScore;
      return { bike: b, score, ride };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, 3);
}

function ScoreBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-[11px] font-semibold text-white/55">
        <span>{label}</span>
        <span className="tnum">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-racer-500 to-orange-400 transition-[width] duration-1000 ease-out"
          style={{ width: inView ? `${value}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function ResultRow({
  bike,
  score,
  index,
  rideLabel,
}: {
  bike: Bike;
  score: number;
  index: number;
  rideLabel: string;
}) {
  const { compareIds, savedIds, toggleCompare, toggleSaved } = useApp();
  const compared = compareIds.includes(bike.id);
  const saved = savedIds.includes(bike.id);

  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
      style={{ animation: `quizIn .5s cubic-bezier(.22,1,.36,1) ${index * 120}ms both` }}
    >
      <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-800">
        {bike.image ? (
          <img src={bike.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/30">
            <Icon name="scooter" className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-bold text-white">
            {bike.brand} {bike.model}
          </p>
          <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400 tnum">
            {score >= 95 ? "Category fit" : "Alternative"}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-white/50">
          {priceLabel(bike)} · {bike.cc}cc · {bike.seat}mm seat
        </p>
        <p className="mt-1 truncate text-[11px] text-white/40">
          Within budget. {score >= 95 ? rideLabel : "An alternative riding category"}.
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          onClick={() => toggleSaved(bike.id)}
          aria-label={saved ? "Unsave" : "Save"}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            saved ? "bg-racer-500 text-white" : "bg-white/10 text-white/70 hover:text-white"
          }`}
        >
          <Icon name={saved ? "heartFill" : "heart"} className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => toggleCompare(bike.id)}
          aria-label={compared ? "Remove from comparison" : "Add to comparison"}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            compared ? "bg-emerald-500 text-white" : "bg-white/10 text-white/70 hover:text-white"
          }`}
        >
          <Icon name={compared ? "check" : "compare"} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function FindMyMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ budget: null, ride: null, trans: null });
  const [done, setDone] = useState(false);

  const results = useMemo(
    () => (done ? rankBikes(answers) : []),
    [done, answers],
  );

  const choose = (key: keyof Answers, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    window.setTimeout(() => {
      if (step < 2) setStep(step + 1);
      else setDone(true);
    }, 260);
  };

  const restart = () => {
    setAnswers({ budget: null, ride: null, trans: null });
    setStep(0);
    setDone(false);
  };

  const rideLabel =
    rideOptions.find((r) => r.id === answers.ride)?.label ?? "your riding";

  return (
    <section
      id="match"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-20 text-white sm:py-28"
    >
      <div className="grid-fade absolute inset-0" />
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-racer-600/20 blur-[130px]" />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-blue-700/15 blur-[130px]" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Left: story */}
          <div>
            <Reveal>
              <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
                <Icon name="sparkles" className="h-3.5 w-3.5 text-racer-400" />
                Decision engine
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Don't start with a list. <br />
                Start with <span className="text-gradient-red">your life.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                Set budget, fit, traffic and daily use — then see each bike ranked with visible
                factor scores and honest watch-outs, alongside a transparent monthly
                ownership-planning estimate.
              </p>
            </Reveal>

            <ol className="mt-9 space-y-5">
              {[
                { n: "01", t: "Set your constraints", d: "Budget, inseam, traffic and daily distance." },
                { n: "02", t: "See why each bike ranks", d: "Visible factor scores and clear watch-outs." },
                { n: "03", t: "Check monthly reality", d: "Loan planning plus modeled running costs." },
              ].map((s, i) => (
                <Reveal as="li" key={s.n} delay={220 + i * 90} className="flex gap-4">
                  <span className="font-display text-2xl font-extrabold text-racer-500/70 tnum">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-bold">{s.t}</p>
                    <p className="mt-0.5 text-sm text-white/55">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={500}>
              <div className="glass-dark mt-9 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Live factor scores — example
                </p>
                <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                  <ScoreBar label="Budget fit" value={94} delay={0} />
                  <ScoreBar label="City ergonomics" value={88} delay={120} />
                  <ScoreBar label="Fuel economy" value={91} delay={240} />
                  <ScoreBar label="Seat-height fit" value={82} delay={360} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: quiz panel */}
          <Reveal variant="scale" delay={150}>
            <div className="glass-dark relative rounded-3xl border border-white/10 p-6 shadow-2xl sm:p-8">
              {!done ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/45">
                      Find My Match · Step {step + 1} of 3
                    </p>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="text-xs font-bold text-white/55 underline-offset-2 hover:text-white hover:underline"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {steps.map((s, i) => (
                      <div key={s} className="flex-1">
                        <div className="h-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-racer-500 transition-all duration-500 ${
                              i <= step ? "w-full" : "w-0"
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-1.5 text-[10px] font-bold uppercase tracking-wider ${
                            i <= step ? "text-white/70" : "text-white/30"
                          }`}
                        >
                          {s}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div key={step} style={{ animation: "quizIn .45s cubic-bezier(.22,1,.36,1) both" }}>
                    {step === 0 && (
                      <>
                        <h3 className="mt-6 font-display text-2xl font-bold">What's your budget?</h3>
                        <p className="mt-1 text-sm text-white/55">
                          Published SRP — we'll separate dealer prices and financing later.
                        </p>
                        <div className="mt-5 space-y-2.5">
                          {budgetOptions.map((o) => {
                            const active = answers.budget === o.id;
                            return (
                              <button
                                key={o.id}
                                type="button"
                                onClick={() => choose("budget", o.id)}
                                className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.99] ${
                                  active
                                    ? "border-racer-400 bg-racer-500/15"
                                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                                }`}
                              >
                                <span>
                                  <span className="block font-bold">{o.label}</span>
                                  <span className="block text-xs text-white/50">{o.sub}</span>
                                </span>
                                <span
                                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                    active ? "border-racer-400 bg-racer-500" : "border-white/25"
                                  }`}
                                >
                                  {active && <Icon name="check" className="h-3 w-3 text-white" strokeWidth={3.5} />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <h3 className="mt-6 font-display text-2xl font-bold">
                          What will you ride most?
                        </h3>
                        <p className="mt-1 text-sm text-white/55">
                          Pick the life the bike needs to fit — not the aspirational weekend.
                        </p>
                        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {rideOptions.map((o) => {
                            const active = answers.ride === o.id;
                            return (
                              <button
                                key={o.id}
                                type="button"
                                onClick={() => choose("ride", o.id)}
                                className={`rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                                  active
                                    ? "border-racer-400 bg-racer-500/15"
                                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                                }`}
                              >
                                <Icon
                                  name={o.icon}
                                  className={`h-7 w-7 ${active ? "text-racer-400" : "text-white/60"}`}
                                />
                                <span className="mt-2 block font-bold leading-tight">
                                  {o.label}
                                </span>
                                <span className="mt-0.5 block text-[11px] text-white/50">
                                  {o.sub}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h3 className="mt-6 font-display text-2xl font-bold">
                          Automatic or manual?
                        </h3>
                        <p className="mt-1 text-sm text-white/55">
                          Most Filipino commuters go automatic for traffic. The choice is yours.
                        </p>
                        <div className="mt-5 space-y-2.5">
                          {transOptions.map((o) => {
                            const active = answers.trans === o.id;
                            return (
                              <button
                                key={o.id}
                                type="button"
                                onClick={() => choose("trans", o.id)}
                                className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.99] ${
                                  active
                                    ? "border-racer-400 bg-racer-500/15"
                                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                                }`}
                              >
                                <span>
                                  <span className="block font-bold">{o.label}</span>
                                  <span className="block text-xs text-white/50">{o.sub}</span>
                                </span>
                                <span
                                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                    active ? "border-racer-400 bg-racer-500" : "border-white/25"
                                  }`}
                                >
                                  {active && <Icon name="check" className="h-3 w-3 text-white" strokeWidth={3.5} />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ animation: "quizIn .5s cubic-bezier(.22,1,.36,1) both" }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-racer-400">
                        Your shortlist
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold">
                        Your top matches
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={restart}
                      className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-bold text-white/70 transition-colors hover:border-white/40 hover:text-white"
                    >
                      Restart
                    </button>
                  </div>
                  <div className="mt-5 space-y-2.5">
                    {results.length === 0 && <p className="text-sm leading-relaxed text-white/70">No exact matches in this preview. Try a different budget or transmission, or use the full finder below.</p>}
                    {results.map((r, i) => (
                      <ResultRow
                        key={r.bike.id}
                        bike={r.bike}
                        score={r.score}
                        index={i}
                        rideLabel={rideLabel}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-white/45">
                    <Icon name="ruler" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Fit guidance is a starting point, not a guarantee. Sit on or test-ride
                    shortlisted bikes at a dealer where possible — your inseam and posture matter.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a
                      href={url("/finder")}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-white/80 transition-colors hover:border-racer-400/60 hover:text-white"
                    >
                      <Icon name="search" className="h-3.5 w-3.5 text-racer-400" />
                      Full finder
                      <Icon name="external" className="h-3 w-3" />
                    </a>
                    <a
                      href={url("/fitment")}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-white/80 transition-colors hover:border-racer-400/60 hover:text-white"
                    >
                      <Icon name="ruler" className="h-3.5 w-3.5 text-racer-400" />
                      Fitment check
                      <Icon name="external" className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
