import { ANALYTICS } from "@/content";

/** 구글 애널리틱스를 쓰는 중인지 (content.ts 의 gaId 가 채워져 있으면 true) */
export const gaEnabled = ANALYTICS.gaId.length > 0;

/**
 * "사전 신청이 완료됐다"를 구글 애널리틱스에 알립니다.
 * generate_lead 는 구글이 정해둔 표준 전환 이벤트 이름이라,
 * GA 화면에서 별도 설정 없이 전환으로 잡힙니다.
 */
export function trackLeadSubmitted(params: {
  source: string;
  channels: number;
  scale: string;
}) {
  if (!gaEnabled) return;
  if (typeof window === "undefined") return;

  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "generate_lead", {
    // 어느 경로로 들어온 방문자가 신청까지 갔는지
    source: params.source,
    // 지금 방송 중인 채널 수 / 매출 규모 — 리드 품질을 나눠 보기 위한 값
    channels_selected: params.channels,
    monthly_scale: params.scale || "미선택",
  });
}
