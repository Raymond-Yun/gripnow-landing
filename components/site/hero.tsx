import { HERO } from "@/content";
import { BroadcastConsole } from "./broadcast-console";
import { Eyebrow, Wrap } from "./bits";

function HeroCta() {
  return (
    <>
      <a
        href="#apply"
        className="block w-full rounded-sm bg-tally px-5 py-4 text-center text-[16.5px] font-semibold tracking-[-0.01em] text-white transition-colors hover:bg-tally-deep lg:max-w-[340px]"
      >
        {HERO.ctaLabel}
      </a>
      <p className="mt-2.5 text-center font-mono text-[11.5px] tracking-[0.02em] text-muted-ink lg:max-w-[340px]">
        {HERO.ctaNote}
      </p>
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="pt-10 pb-2 lg:pt-16 lg:pb-8">
      <Wrap>
        <div className="lg:grid lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-[clamp(32px,9vw,46px)] leading-[1.12] font-bold tracking-[-0.035em] lg:text-[54px]">
              {HERO.headlineBefore}
              <br />
              {HERO.headlineMid}
              <em className="text-tally not-italic">{HERO.highlight}</em>
              {HERO.headlineAfter}
            </h1>
            <p className="mt-4 max-w-[44ch] text-[16.5px] text-[#3a4245]">
              {HERO.body}
            </p>
            <div className="mt-8 hidden lg:block">
              <HeroCta />
            </div>
          </div>

          <div className="mt-7 lg:mt-0">
            <BroadcastConsole />
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <HeroCta />
        </div>
      </Wrap>
    </section>
  );
}
