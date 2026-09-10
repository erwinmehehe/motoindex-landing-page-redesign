import { useState, type FormEvent } from "react";
import Icon from "./icons";
import { url } from "../seo";
import { useRouter } from "../router";
import { Container } from "./ui";
import { Reveal } from "./Reveal";

export default function FinalCTA() {
  const [query, setQuery] = useState("");
  const { navigate } = useRouter();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/guides${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  return (
    <section id="cta" className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div className="grid-fade absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-racer-600/25 blur-[140px]" />
      <div className="absolute bottom-0 left-10 h-72 w-72 animate-float-slow rounded-full bg-blue-700/15 blur-[110px]" />
      <div className="absolute bottom-10 right-10 h-72 w-72 animate-float-slower rounded-full bg-orange-500/10 blur-[110px]" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="scale">
            <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-racer-500" />
              Free forever · No signup to start
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl">
              Find the right bike.
              <br />
              <span className="text-gradient-red">Not just the shiniest one.</span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              Compare your contenders, plan your ownership budget, and walk into a
              dealer with the right questions and a clearer shortlist.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={url("/motorcycles")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-racer-500 px-8 py-4 text-base font-bold text-white shadow-red transition-all duration-300 hover:-translate-y-0.5 hover:bg-racer-400 sm:w-auto"
              >
                Explore motorcycles
                <Icon
                  name="external"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <a
                href="/finder"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 sm:w-auto"
              >
                <Icon name="sparkles" className="h-5 w-5" />
                Find my motorcycle match
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
              <form
                onSubmit={submit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="cta-library-search" className="sr-only">
                  Search the rider knowledge library
                </label>
                <input
                  id="cta-library-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Helmet fit, financing, rainy-season riding..."
                  className="w-full grow rounded-full border border-white/15 bg-white/8 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-ink-900 transition-all duration-200 hover:bg-racer-500 hover:text-white active:scale-95"
                >
                  Find a guide
                </button>
              </form>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <Icon name="pin" className="h-4 w-4 text-racer-400" /> Metro Manila · Cebu · Davao & nationwide dealers
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
              <a
                href={url("/dealers/join")}
                className="flex items-center gap-2 font-semibold text-white/70 transition-colors hover:text-white"
              >
                <Icon name="award" className="h-4 w-4 text-racer-400" />
                Are you a dealer? Join the directory
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
