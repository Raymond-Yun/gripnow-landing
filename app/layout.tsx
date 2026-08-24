import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content";

/* 숫자·영문 강조용 글꼴. next/font 는 빌드할 때 글꼴 파일을 우리 사이트에
   같이 올려주므로, 방문자가 외부 서버에 요청을 보내지 않습니다. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.ogTitle,
    description: SITE.description,
    type: "website",
    locale: "ko_KR",
    siteName: "그립나우",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.ogTitle,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f1f3f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
