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

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true, mode: "webhook" });
  } catch (e) {
    // 접수는 잃어버리지 않게 로그로 남깁니다
    console.error("[lead:전송실패]", e, lead);
    return NextResponse.json(
      { ok: false, error: "webhook_failed" },
      { status: 502 },
    );
  }
}
