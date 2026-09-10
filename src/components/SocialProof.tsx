import Icon from "./icons";
import { brands, stats } from "../data";
import { Container } from "./ui";
import { CountUp, Reveal } from "./Reveal";

export default function SocialProof() {
  return (
    <section id="proof" className="relative bg-paper pb-4 pt-2">
      <Container>
        <Reveal variant="scale">
          <div className="relative -mt-16 overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-racer-500/5 blur-3xl" />
            <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center gap-2 text-center sm:px-4 ${
                    i < stats.length - 1 ? "sm:border-r sm:border-ink-100" : ""
                  }`}
                >
                  <dt className="order-2 max-w-[12rem] text-xs font-semibold uppercase tracking-wider text-ink-500 sm:text-[13px]">
                    {s.label}
                  </dt>
                  <dd className="order-1 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
                    <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-14">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
            Researched across every major brand sold in the Philippines
          </p>
          <div
            className="marquee-paused group relative mt-7 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            }}
          >
            <div className="marquee-track items-center gap-14 pr-14">
              {[...brands, ...brands].map((brand, i) => (
                <span
                  key={`${brand}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 text-2xl font-extrabold tracking-tight text-ink-300 transition-colors hover:text-ink-700"
                >
                  <Icon name="gauge" className="h-5 w-5 opacity-60" />
                  {brand}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-7 flex items-center justify-center gap-2 text-center text-sm text-ink-500">
            <Icon name="shield" className="h-4 w-4 text-racer-500" />
            Independent and ad-labeled — recommendations are never paid placements without
            disclosure.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
