"use client";

import { useRef, useState } from "react";
import { FORM } from "@/content";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { trackLeadSubmitted } from "@/lib/analytics";
import { Eyebrow, SectionTitle, Wrap } from "./bits";

/* 어두운 패널 위에 올라가는 입력칸 공통 모양 */
const fieldClass =
  "h-12 w-full rounded-sm border border-white/18 bg-white/6 px-3.5 text-base text-white transition-colors placeholder:text-white/50 focus-visible:border-white/50 focus-visible:ring-0 md:text-base";

const labelClass =
  "mb-2 block font-mono text-[11px] font-medium tracking-[0.1em] text-white/55 uppercase";

type Status = "idle" | "sending" | "done";

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [scale, setScale] = useState("");
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState(""); // 봇이 채우는 미끼 칸
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const onPhoneChange = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 11);
    if (d.length > 7)
      setPhone(`${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`);
    else if (d.length > 3) setPhone(`${d.slice(0, 3)}-${d.slice(3)}`);
    else setPhone(d);
  };

  const toggleChannel = (v: string) =>
    setChannels((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (trap) return; // 봇

    if (name.trim().length < 2) {
      setError(FORM.errors.name);
      nameRef.current?.focus();
      return;
    }
    if (!/^01[016-9]-?\d{3,4}-?\d{4}$/.test(phone.trim())) {
      setError(FORM.errors.phone);
      phoneRef.current?.focus();
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(FORM.errors.email);
      emailRef.current?.focus();
      return;
    }
    if (!consent) {
      setError(FORM.errors.consent);
      return;
    }

    setStatus("sending");
    const source =
      new URLSearchParams(window.location.search).get("src") ||
      new URLSearchParams(window.location.search).get("utm_source") ||
      "direct";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          brand: brand.trim() || null,
          channels,
          scale: scale || null,
          source,
          referrer: document.referrer || null,
          page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      // 어느 유입경로가 실제 신청까지 이어졌는지 기록
      trackLeadSubmitted({ source, channels: channels.length, scale });
    } catch {
      setStatus("idle");
      setError(FORM.errors.send);
    }
  }

  return (
    <section id="apply" className="mt-14 bg-console py-9 lg:mt-24 lg:py-16">
      <Wrap>
        {status === "done" ? (
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-signal-bright uppercase">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-signal-bright"
              />
              {FORM.done.badge}
            </div>
            <h2 className="mt-3 text-[25px] font-bold tracking-[-0.03em] text-white lg:text-[32px]">
              {FORM.done.headline}
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-white/70">
              {FORM.done.body}
            </p>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-16">
            <div>
              <Eyebrow tone="dark">{FORM.eyebrow}</Eyebrow>
              <SectionTitle lines={FORM.headline} tone="dark" />
              <p className="mt-2.5 max-w-[36ch] text-[15px] text-white/65">
                {FORM.lead}
              </p>
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-6 lg:mt-0">
              <div>
                <Label htmlFor="f-name" className={labelClass}>
                  {FORM.labels.name} <span className="text-tally-bright">*</span>
                </Label>
                <Input
                  id="f-name"
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={FORM.placeholders.name}
                  autoComplete="name"
                  className={fieldClass}
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="f-phone" className={labelClass}>
                  {FORM.labels.phone} <span className="text-tally-bright">*</span>
                </Label>
                <Input
                  id="f-phone"
                  ref={phoneRef}
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  placeholder={FORM.placeholders.phone}
                  autoComplete="tel"
                  className={cn(fieldClass, "tnum")}
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="f-email" className={labelClass}>
                  {FORM.labels.email}{" "}
                  <span className="opacity-50">{FORM.labels.optional}</span>
                </Label>
                <Input
                  id="f-email"
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={FORM.placeholders.email}
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="f-brand" className={labelClass}>
                  {FORM.labels.brand}{" "}
                  <span className="opacity-50">{FORM.labels.optional}</span>
                </Label>
                <Input
                  id="f-brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder={FORM.placeholders.brand}
                  autoComplete="organization"
                  className={fieldClass}
                />
              </div>

              <fieldset className="mt-4">
                <legend className={labelClass}>
                  {FORM.labels.channels}{" "}
                  <span className="opacity-50">
                    {FORM.labels.optionalMulti}
                  </span>
                </legend>
                <div className="flex flex-wrap gap-1.5">
                  {FORM.channelOptions.map((opt) => {
                    const active = channels.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleChannel(opt)}
                        className={cn(
                          "cursor-pointer rounded-sm border px-3 py-2.5 text-sm transition-colors",
                          active
                            ? "border-signal bg-signal text-white"
                            : "border-white/18 bg-white/6 text-white/75 hover:bg-white/12",
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-4">
                <Label htmlFor="f-scale" className={labelClass}>
                  {FORM.labels.scale}{" "}
                  <span className="opacity-50">{FORM.labels.optional}</span>
                </Label>
                <select
                  id="f-scale"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className={cn(fieldClass, "select-caret appearance-none")}
                >
                  {FORM.scaleOptions.map((o) => (
                    <option key={o.value} value={o.value} className="text-ink">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 봇 미끼 — 사람 눈에는 보이지 않습니다 */}
              <input
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                className="absolute -left-[9999px] h-0 opacity-0"
              />

              <div className="mt-5 flex items-start gap-3">
                <Checkbox
                  id="f-consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  className="mt-1 border-white/30 data-checked:border-tally data-checked:bg-tally"
                />
                <Label
                  htmlFor="f-consent"
                  className="block text-[13.5px] leading-[1.6] font-normal text-white/72"
                >
                  <span className="block">
                    {FORM.consentLabel} <span className="text-tally-bright">*</span>
                    <br />
                    <span className="text-white/55">{FORM.consent}</span>
                  </span>
                </Label>
              </div>

              {error && (
                <p role="alert" className="mt-3.5 text-[13.5px] text-[#ff9080]">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 h-auto w-full rounded-sm bg-tally px-5 py-4 text-[16.5px] font-semibold tracking-[-0.01em] text-white hover:bg-tally-deep disabled:opacity-55"
              >
                {status === "sending" ? FORM.submittingLabel : FORM.submitLabel}
              </Button>
              <p className="mt-2.5 text-center font-mono text-[11.5px] text-white/60">
                {FORM.submitNote}
              </p>
            </form>
          </div>
        )}
      </Wrap>
    </section>
  );
}
