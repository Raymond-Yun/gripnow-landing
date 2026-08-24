import { STEPS } from "@/content";
import { Eyebrow, SectionTitle, Wrap } from "./bits";

export function Steps() {
  return (
    <section className="pt-14 lg:pt-24">
      <Wrap>
        <Eyebrow>{STEPS.eyebrow}</Eyebrow>
        <SectionTitle lines={STEPS.headline} />

        <ol className="mt-6 grid gap-2.5 lg:grid-cols-3">
          {STEPS.items.map((s) => (
            <li
              key={s.n}
              className="flex gap-4 rounded-sm border border-line bg-card-paper p-4.5 lg:flex-col lg:gap-2"
            >
              <span className="font-mono text-[13px] font-semibold tracking-[0.08em] text-tally-ink">
                {s.n}
              </span>
              <div>
                <div className="font-semibold tracking-[-0.015em]">
                  {s.title}
                </div>
                <p className="mt-1 text-[14.5px] leading-relaxed text-muted-ink">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
