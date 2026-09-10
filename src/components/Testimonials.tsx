import Icon from "./icons";
import { testimonials } from "../data";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export default function Testimonials() {
  return (
    <section id="reviews" className="relative scroll-mt-24 bg-cream py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Rider stories"
          icon="quote"
          title={
            <>
              Chosen by first-timers. <span className="text-gradient-red">Trusted by lifers.</span>
            </>
          }
          copy="Illustrative rider stories for the design concept, not verified customer testimonials. These show the everyday decisions the connected tools are designed to support."
        />

        <Reveal delay={120} className="mx-auto mt-8 flex w-fit flex-col items-center gap-2">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" className="h-5 w-5" fill="currentColor" stroke="none" />
            ))}
          </div>
          <p className="text-sm font-semibold text-ink-500">
            Sample stories for the preview. Replace with verified feedback before publishing.
          </p>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 3) * 90}
              className="mb-5 break-inside-avoid rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" className="h-3.5 w-3.5" fill="currentColor" stroke="none" />
                  ))}
                </div>
                <Icon name="quote" className="h-7 w-7 text-ink-100" />
              </div>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.tone} text-xs font-extrabold text-white`}
                >
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink-900">{t.name}</span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-1 text-xs text-ink-500">
                    <Icon name="pin" className="h-3 w-3" />
                    {t.location} · {t.role}
                  </span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
