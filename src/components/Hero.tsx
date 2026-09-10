import { useState, type FormEvent } from "react";
import Icon from "./icons";
import { images } from "../data";
import { url } from "../seo";
import { useRouter } from "../router";
import { Reveal } from "./Reveal";
import { Container } from "./ui";

const quickChips = [
  { label: "Automatic scooters", filter: "Automatic" },
  { label: "Daily commuters", filter: "Commuter" },
  { label: "Sport & naked", filter: "Sport" },
  { label: "Adventure & off-road", filter: "Adventure" },
];

export default function Hero() {
  const { navigate } = useRouter();
  const [query, setQuery] = useState("");

  const goBikes = (filter: string) => {
    navigate(filter === "Automatic" ? "/motorcycles?transmission=Automatic" : `/motorcycles?category=${encodeURIComponent(filter)}`);
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/motorcycles${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-28 pb-24 text-white sm:pt-32 lg:pb-20"
    >
      {/* Ambient background */}
      <div className="grid-fade absolute inset-0" />
      <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-racer-600/25 blur-[140px]" />
      <div className="absolute -right-52 bottom-[-10rem] h-[38rem] w-[38rem] rounded-full bg-blue-700/20 blur-[150px]" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 animate-float-slower rounded-full bg-orange-500/10 blur-[110px]" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          {/* Copy */}
          <div className="max-w-2xl">
            <Reveal>
              <span className="glass-dark inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-semibold text-white/85 sm:text-sm">
                <span className="flex items-center gap-1 rounded-full bg-racer-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Icon name="bolt" className="h-3 w-3" /> New
                </span>
                The independent motorcycle decision engine
                <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
                <span className="hidden items-center gap-1.5 sm:flex">
                  <span className="h-2 w-3 rounded-sm bg-gradient-to-b from-blue-400 via-white to-racer-500" />
                  Philippines
                </span>
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-[2.7rem] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem]">
                Your next <span className="text-gradient-red">motorcycle</span>
                <br />
                starts here.
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                Research current motorcycles in the Philippines — compare specs and published
                SRPs, model the real cost of ownership, and find the bike that fits your life,
                your budget and your inseam.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <form
                onSubmit={onSearch}
                role="search"
                className="glass-dark mt-8 flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center"
              >
                <label htmlFor="hero-search" className="sr-only">
                  Search motorcycles by brand, model or type
                </label>
                <Icon
                  name="search"
                  className="ml-2.5 hidden h-5 w-5 shrink-0 text-white/50 sm:block"
                />
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by brand, model, or type — e.g. Aerox, ADV, scooter"
                  className="w-full grow bg-transparent px-3 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-racer-500 px-6 py-3 text-sm font-bold text-white shadow-red transition-all duration-300 hover:bg-racer-400 active:scale-[0.98]"
                >
                  <Icon name="search" className="h-4 w-4" />
                  Search bikes
                </button>
              </form>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Popular:
                </span>
                {quickChips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => goBikes(chip.filter)}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-racer-400/60 hover:bg-racer-500/15 hover:text-white"
                  >
                    {chip.label}
                  </button>
                ))}
                <a
                  href={url("/recommendations/motorcycles-under-100k")}
                  className="rounded-full border border-dashed border-white/25 px-3.5 py-1.5 text-[13px] font-semibold text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:text-white"
                >
                  Under ₱100K ↗
                </a>
              </div>
            </Reveal>

            <Reveal delay={390}>
              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/60">
                {["No signup needed", "Source-linked model records", "Save your shortlist"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal variant="scale" delay={200} className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative">
              {/* glow */}
              <div className="absolute inset-6 scale-95 rounded-full bg-gradient-to-tr from-racer-600/40 via-transparent to-blue-500/30 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <img
                  src={images.heroBike}
                  alt="Modern sport maxi-scooter in race blue under dramatic studio lighting"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating: current model badge */}
              <div className="glass-dark absolute left-4 top-4 flex animate-float-slow items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                2026 current model
              </div>

              {/* Floating: rating */}
              <div className="glass-dark absolute right-4 top-16 animate-float-slower rounded-2xl px-4 py-3 text-white">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="h-3.5 w-3.5" fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="mt-1 text-xs font-semibold text-white/70">Most-researched maxi-scooter</p>
              </div>

              {/* Floating: specs */}
              <div className="glass-dark absolute bottom-5 left-4 animate-float-slow rounded-2xl px-4 py-3 text-white [animation-delay:1.2s]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Yamaha Aerox V3
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-[13px] font-bold">
                  <span className="tnum">155 cc</span>
                  <span className="h-3 w-px bg-white/20" />
                  <span className="tnum">15.4 hp</span>
                  <span className="h-3 w-px bg-white/20" />
                  <span className="tnum">790 mm</span>
                </div>
              </div>

              {/* Floating: price */}
              <div className="glass-dark absolute bottom-20 right-4 animate-float-slower rounded-2xl px-4 py-3 text-white [animation-delay:.6s]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  SRP from
                </p>
                <p className="font-display text-xl font-extrabold text-white tnum">₱125,900</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#proof"
        aria-label="Scroll to learn more"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white lg:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </span>
      </a>
    </section>
  );
}
