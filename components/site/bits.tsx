import { cn } from "@/lib/utils";

/** 가로 폭을 잡아주는 껍데기. 모바일은 좁게, 큰 화면은 넓게. */
export function Wrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[600px] px-5 lg:max-w-[1060px] lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** 섹션 위에 붙는 작은 대문자 라벨 + 가느다란 선 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.14em] uppercase",
        tone === "light" ? "text-muted-ink" : "text-white/50",
        className,
      )}
    >
      <span className="shrink-0">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "h-px flex-1",
          tone === "light" ? "bg-line" : "bg-white/15",
        )}
      />
    </div>
  );
}

/** 섹션 제목. 두 줄로 나눠 씁니다. */
export function SectionTitle({
  lines,
  tone = "light",
  className,
}: {
  lines: readonly string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3.5 text-[25px] leading-[1.3] font-bold tracking-[-0.03em] lg:text-[32px]",
        tone === "dark" && "text-white",
        className,
      )}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}

/** 온에어 표시용 빨간 점 (움직이지 않는 정적 표시) */
export function TallyDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("size-2 shrink-0 rounded-full bg-tally", className)}
    />
  );
}
