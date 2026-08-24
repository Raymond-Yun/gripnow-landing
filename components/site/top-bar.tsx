import { NAV } from "@/content";
import { TallyDot } from "./bits";
import { Wordmark } from "./wordmark";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[600px] items-center justify-between gap-3 px-5 py-3 lg:max-w-[1060px] lg:px-8">
        <a
          href="#top"
          className="-my-1 flex items-center gap-2.5 py-2.5 text-ink"
          aria-label="그립나우 홈"
        >
          <TallyDot />
          <Wordmark className="h-[17px] w-auto" />
        </a>
        <a
          href="#apply"
          className="rounded-sm bg-tally px-3.5 py-2.5 font-mono text-xs font-semibold tracking-[0.02em] whitespace-nowrap text-white transition-colors hover:bg-tally-deep"
        >
          {NAV.ctaLabel}
        </a>
      </div>
    </header>
  );
}
