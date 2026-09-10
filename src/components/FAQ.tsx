import { useState } from "react";
import Icon from "./icons";
import { faqs } from "../data";
import { Container, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Good questions"
              icon="doc"
              title={
                <>
                  Honest answers, <span className="text-gradient-red">no fine print.</span>
                </>
              }
            />
            <Reveal delay={150} className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-racer-50 text-racer-600">
                  <Icon name="doc" className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-bold text-ink-900">
                  Still spot something off?
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                Our methodology, data sources and corrections log are public. Every spec page
                links its sources and its last-checked date — because a comparison site is only
                as good as its data.
              </p>
              <a
                href="/corrections"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-racer-600 underline-offset-4 hover:underline"
              >
                Prepare a correction report
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 55}>
                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                      isOpen ? "border-racer-200 shadow-soft" : "border-ink-100 hover:border-ink-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="font-display text-[15px] font-bold leading-snug text-ink-900 sm:text-base">
                        {item.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? "rotate-180 bg-racer-500 text-white" : "bg-ink-50 text-ink-600"
                        }`}
                      >
                        <Icon name="chevronDown" className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.4s cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500 sm:px-6 sm:pb-6 sm:text-[15px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
