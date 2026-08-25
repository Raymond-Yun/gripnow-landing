import { FOOTER } from "@/content";
import { gaEnabled } from "@/lib/analytics";
import { Wordmark } from "./wordmark";

/** 전화번호를 숫자만 남긴 형태(tel: 링크용) */
const telHref = `tel:${FOOTER.phone.replace(/[^0-9+]/g, "")}`;

export function SiteFooter() {
  return (
    <footer className="pt-7 pb-10 text-xs leading-[1.8] text-muted-ink">
      <div className="mx-auto w-full max-w-[600px] px-5 lg:max-w-[1060px] lg:px-8">
        <div className="h-px bg-line" />
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Wordmark className="h-[15px] w-auto text-ink" />
            <p className="mt-2">{FOOTER.company}</p>
            <p className="mt-1">{FOOTER.note}</p>
            {gaEnabled ? (
              <p className="mt-1">{FOOTER.cookieNote}</p>
            ) : null}
          </div>
          <div className="lg:text-right">
            <p>
              문의{" "}
              <a
                href={`mailto:${FOOTER.email}`}
                className="text-ink underline decoration-line underline-offset-2"
              >
                {FOOTER.email}
              </a>
            </p>
            <p className="mt-1">
              연락처{" "}
              <a
                href={telHref}
                className="tnum font-mono text-ink underline decoration-line underline-offset-2"
              >
                {FOOTER.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
