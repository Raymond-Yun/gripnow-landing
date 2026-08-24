import { PRICING } from "@/content";
import { Eyebrow, SectionTitle, Wrap } from "./bits";

/** 수수료 차이를 눈으로 보여주는 막대. 폭은 수수료 비율에 비례합니다. */
function CompareBars() {
  return (
    <div className="mt-2.5 rounded-sm border border-line bg-card-paper p-4.5">
      <div className="font-mono text-[10.5px] tracking-[0.12em] text-muted-ink uppercase">
        거래 수수료 비교
      </div>

      <div className="mt-3.5">
        <div className="flex items-baseline justify-between text-[13.5px]">
          <span className="font-medium">그립나우</span>
          <span className="tnum font-mono font-semibold">0.5%</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full rounded-sm bg-[#e6eae8]">
          <div className="h-full w-[3%] rounded-sm bg-signal" />
        </div>
      </div>

      <div className="mt-3.5">
        <div className="flex items-baseline justify-between text-[13.5px]">
          <span className="font-medium text-muted-ink">대형 플랫폼</span>
          <span className="tnum font-mono font-semibold text-tally-ink">
            10~20%
          </span>
        </div>
        <div className="mt-1.5 h-2.5 w-full rounded-sm bg-[#e6eae8]">
          <div className="h-full w-full rounded-sm bg-tally/85" />
        </div>
      </div>

      <p className="mt-3 text-[11.5px] text-muted-ink">
        막대 길이는 수수료 비율을 그대로 옮긴 것입니다.
      </p>
    </div>
  );
}

export function Pricing() {
  return (
    <section className="pt-14 lg:pt-24">
      <Wrap>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <Eyebrow>{PRICING.eyebrow}</Eyebrow>
            <SectionTitle lines={PRICING.headline} />
            <p className="mt-4 hidden max-w-[42ch] text-[14.5px] leading-relaxed text-muted-ink lg:block">
              {PRICING.fine}
            </p>
          </div>

          <div className="mt-6 lg:mt-0">
            <div className="overflow-hidden rounded-sm border border-line bg-card-paper">
              {PRICING.rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-baseline gap-3 px-4.5 py-4 ${
                    i < PRICING.rows.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <span className="text-[14.5px] text-muted-ink">
                    {row.label}
                  </span>
                  <span className="tnum ml-auto font-mono text-[19px] font-semibold tracking-[-0.02em]">
                    {row.value}
                    <small className="ml-1 text-xs font-normal tracking-normal text-muted-ink">
                      {row.unit}
                    </small>
                  </span>
                </div>
              ))}
            </div>

            <CompareBars />

            <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-ink lg:hidden">
              {PRICING.fine}
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
