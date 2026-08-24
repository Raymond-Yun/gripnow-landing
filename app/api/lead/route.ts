import { NextResponse } from "next/server";

/**
 * 사전 신청 접수 창구.
 *
 * 신청 내용을 그대로 LEAD_WEBHOOK_URL(구글 스프레드시트의 앱스 스크립트 주소)로
 * 넘깁니다. 주소는 서버에만 두므로 방문자에게 노출되지 않습니다.
 * 주소가 비어 있으면 "데모 모드"로 동작합니다 — 접수는 성공으로 처리하되
 * 어디에도 저장되지 않고 서버 로그에만 남습니다.
 */

type Lead = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  brand?: unknown;
  channels?: unknown;
  scale?: unknown;
  source?: unknown;
  referrer?: unknown;
  page?: unknown;
};

const str = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = str(body.name, 60);
  const phone = str(body.phone, 20);

  // 서버에서도 한 번 더 검사합니다 (브라우저 검사는 우회될 수 있으므로)
  if (name.length < 2 || !/^01[016-9]-?\d{3,4}-?\d{4}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "invalid_input" },
      { status: 422 },
    );
  }

  const lead = {
    /* 이 신청 한 건을 가리키는 고유 번호.
       앱스 스크립트가 이 번호를 기억해서, 같은 신청이 두 번 오면 무시합니다.
       (아래 재시도가 중복 행을 만들지 않게 하는 장치) */
    leadId: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    name,
    phone,
    email: str(body.email, 120),
    brand: str(body.brand, 80),
    channels: Array.isArray(body.channels)
      ? body.channels.map((c) => str(c, 20)).filter(Boolean).slice(0, 10)
      : [],
    scale: str(body.scale, 40),
    source: str(body.source, 60),
    referrer: str(body.referrer, 300),
    page: str(body.page, 300),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    console.log("[lead:데모모드] 저장되지 않았습니다:", lead);
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  /* 구글 앱스 스크립트는 "줄은 정상적으로 쓰고 응답만 실패"하는 경우가 있어서,
     그냥 다시 보내면 같은 신청이 두 줄 들어갑니다.
     그래서 위 leadId 를 함께 보내고, 앱스 스크립트가 이미 처리한 번호면
     건너뛰도록 해두었습니다. 그 덕에 아래 재시도가 안전합니다. */
  const ATTEMPTS = 3;
  const TIMEOUT_MS = 9000;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        // charset 을 반드시 붙입니다. 없으면 구글 앱스 스크립트가 본문을
        // UTF-8 이 아닌 다른 인코딩으로 읽어서 한글이 깨집니다.
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(lead),
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      if (attempt > 1) console.warn(`[lead:재시도성공] ${attempt}번째에 성공`);
      return NextResponse.json({ ok: true, mode: "webhook", attempt });
    } catch (e) {
      lastError = e;
      console.warn(`[lead:전송실패 ${attempt}/${ATTEMPTS}]`, e);
      if (attempt < ATTEMPTS) {
        await new Promise((r) => setTimeout(r, attempt * 600));
      }
    }
  }

  /* 3번 다 실패 — 신청 내용을 로그에 남깁니다. Vercel → 프로젝트 → Logs 에서
     "lead:최종실패" 로 검색하면 내용을 그대로 복구할 수 있습니다. */
  console.error("[lead:최종실패]", lastError, JSON.stringify(lead));
  return NextResponse.json(
    { ok: false, error: "webhook_failed" },
    { status: 502 },
  );
}
