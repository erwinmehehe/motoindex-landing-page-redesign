import Icon from "./icons";
import { categories } from "../data";
import { url } from "../seo";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const linkMap: Record<string, string> = {
  Scooters: "/recommendations/best-scooters-philippines",
  Underbone: "/recommendations/best-underbone-motorcycles-philippines",
  Naked: "/recommendations/naked-motorcycles-philippines",
  Sport: "/recommendations/sport-motorcycles-philippines",
  Adventure: "/recommendations/adventure-touring-motorcycles-philippines",
  Cruiser: "/motorcycles?category=Cruiser",
  "Off-road": "/recommendations/dual-sport-motorcycles-philippines",
  Electric: "/recommendations/electric-motorcycles-philippines",
};

export default function Categories() {
  const go = (name: string) => url(linkMap[name] ?? "/recommendations");

  return (
    <section id="categories" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Browse by category"
          icon="layers"
          title={
            <>
              Eight ways to ride. <span className="text-gradient-red">One catalog.</span>
            </>
          }
          copy="From step-through scooters built for Manila rain to big-bore adventurers built for the Cordillera — start with the kind of riding you actually do."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal
              as="a"
              key={cat.name}
              href={go(cat.name)}
              delay={(i % 4) * 80}
              className="card-sheen group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-racer-200 hover:shadow-lift sm:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-50 text-ink-800 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-racer-500 group-hover:to-racer-700 group-hover:text-white group-hover:shadow-red">
                <Icon name={cat.icon} className="h-7 w-7" />
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-display text-lg font-bold text-ink-900">
                  {cat.name}
                  <Icon
                    name="arrowUpRight"
                    className="h-4 w-4 -translate-x-1 text-racer-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-ink-500">
                  {cat.blurb}
                </span>
              </span>
              <span className="mt-auto rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-bold text-ink-500 transition-colors group-hover:bg-racer-50 group-hover:text-racer-600">
                Explore the guide
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
