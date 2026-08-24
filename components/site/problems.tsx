import { PROBLEMS } from "@/content";
import { Eyebrow, SectionTitle, Wrap } from "./bits";

export function Problems() {
  return (
    <section className="pt-14 lg:pt-24">
      <Wrap>
        <Eyebrow>{PROBLEMS.eyebrow}</Eyebrow>
        <SectionTitle lines={PROBLEMS.headline} />

        <div className="mt-6 border-t border-line lg:grid lg:grid-cols-3 lg:gap-6 lg:border-t-0">
          {PROBLEMS.items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 border-b border-line py-4.5 lg:flex-col lg:gap-3 lg:border-b-0 lg:border-t-2 lg:border-t-ink lg:pt-4"
            >
              <div className="flex-1">
                <div className="font-semibold tracking-[-0.015em]">
                  {item.title}
                </div>
                <p className="mt-1 text-[14.5px] leading-relaxed text-muted-ink">
                  {item.body}
                </p>
              </div>
              <div className="pt-0.5 font-mono text-[11px] font-semibold tracking-[0.04em] whitespace-nowrap text-tally-ink lg:order-first lg:pt-0">
                {item.cost}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
