"use client";

import { useState } from "react";
import { CONSOLE } from "@/content";
import { cn } from "@/lib/utils";

/**
 * 송출 콘솔 — 채널을 눌러서 끄면 합계 시청자 수가 줄어듭니다.
 * "채널 하나를 안 하면 이만큼을 놓친다"를 손으로 확인시키는 장치입니다.
 */
export function BroadcastConsole() {
  const [on, setOn] = useState<boolean[]>(() => CONSOLE.channels.map(() => true));

  const total = CONSOLE.channels.reduce(
    (sum, ch, i) => sum + (on[i] ? ch.viewers : 0),
    0,
  );
  const liveCount = on.filter(Boolean).length;

  const toggle = (i: number) =>
    setOn((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="overflow-hidden rounded-sm bg-console text-[#e9eeec] shadow-[0_18px_40px_-24px_rgba(20,24,27,0.55)]">
      {/* 머리말 */}
      <div className="flex items-center gap-2.5 border-b border-white/12 px-4 py-3.5">
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-full bg-tally"
        />
        <b className="text-[13px] font-medium tracking-[0.02em]">
          {CONSOLE.title}
        </b>
        <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase">
          {CONSOLE.subtitle}
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.1em] text-tally-bright">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-tally"
          />
          {CONSOLE.onAirLabel}
        </span>
      </div>

      {/* 채널 목록 — 왼쪽 세로선에서 가지가 뻗는 패치베이 모양 */}
      <div className="relative px-4 pt-2 pb-1">
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-[26px] left-[19px] w-px bg-white/18"
        />
        {CONSOLE.channels.map((ch, i) => {
          const live = on[i];
          return (
            <button
              key={ch.name}
              type="button"
              aria-pressed={live}
              onClick={() => toggle(i)}
              className="relative flex w-full cursor-pointer items-center gap-3 rounded-sm py-2.5 pl-[22px] text-left transition-colors hover:bg-white/4"
            >
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-[3px] h-px w-[13px] bg-white/18"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "size-2.5 shrink-0 rounded-full transition-colors",
                  live
                    ? "bg-tally shadow-[0_0_10px_rgba(229,57,31,0.7)]"
                    : "bg-white/20",
                )}
              />
              <span
                className={cn(
                  "text-[14.5px] font-medium tracking-[-0.01em] transition-colors",
                  live ? "text-[#e9eeec]" : "text-white/55",
                )}
              >
                {ch.name}
              </span>
              <span
                className={cn(
                  "ml-auto font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase transition-colors",
                  live ? "text-tally-bright" : "text-white/50",
                )}
              >
                {live ? CONSOLE.onLabel : CONSOLE.offLabel}
              </span>
              <span
                className={cn(
                  "tnum min-w-[44px] text-right font-mono text-[13px] font-medium transition-colors",
                  live ? "text-white/85" : "text-white/50",
                )}
              >
                {ch.viewers.toLocaleString("ko-KR")}
              </span>
            </button>
          );
        })}
      </div>

      {/* 합계 */}
      <div className="mx-4 flex items-baseline gap-2.5 border-t border-white/12 pt-3.5 pb-4">
        <span className="font-mono text-[11px] tracking-[0.1em] text-white/50 uppercase">
          {CONSOLE.totalLabel}
        </span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-white/50">
          {liveCount} / {CONSOLE.channels.length}
        </span>
        <span
          className="tnum ml-auto font-mono text-[30px] leading-none font-semibold tracking-[-0.02em]"
          aria-live="polite"
        >
          {total.toLocaleString("ko-KR")}
        </span>
        <span className="font-mono text-xs text-white/50">{CONSOLE.unit}</span>
      </div>

      <p className="px-4 pb-3 font-mono text-xs text-white/60">
        {CONSOLE.hint}
      </p>
      <p className="px-4 pb-3.5 text-[11px] text-white/55">
        {CONSOLE.disclaimer}
      </p>
    </div>
  );
}
