import { FEATURES } from "@/content";
import { Eyebrow, SectionTitle, Wrap } from "./bits";

export function Features() {
  return (
    <section className="pt-14 lg:pt-24">
      <Wrap>
        <Eyebrow>{FEATURES.eyebrow}</Eyebrow>
        <SectionTitle lines={FEATURES.headline} />

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.items.map((item) => (
            <div
              key={item.key}
              className="rounded-sm border border-line bg-card-paper p-4.5"
            >
              <div className="font-mono text-[10.5px] tracking-[0.12em] text-signal uppercase">
                {item.key}
              </div>
              <div className="mt-1.5 text-[17px] font-semibold tracking-[-0.02em]">
                {item.title}
              </div>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-ink">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
