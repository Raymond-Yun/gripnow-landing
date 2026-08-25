# 그립나우 랜딩페이지

셀러용 라이브 방송 OS "그립나우"의 사전 신청 랜딩페이지.

| | |
|---|---|
| **사이트 주소** | https://gripnow-landing.vercel.app |
| **코드 저장소** | https://github.com/Raymond-Yun/gripnow-landing |
| **내 컴퓨터 폴더** | `C:\Users\grip_301\Desktop\AI 프로덕트\그립나우랜딩` |
| **기술** | Next.js 16 + Tailwind CSS v4 + shadcn/ui |

---

## 고치는 법 (3줄)

1. 위 폴더에서 `content.ts` 를 열어 문구·숫자·연락처를 고친다. (색은 `app/globals.css` 맨 위 10줄)
2. 터미널(PowerShell)에서 그 폴더로 가 `npm run build` 를 돌려 통과하는지 본다.
3. `git add . && git commit -m "문구 수정" && git push` — 1~2분 뒤 사이트에 반영된다.

미리 눈으로 보고 싶으면 2번 대신 `npm run dev` 를 켜고 브라우저에서 http://localhost:3000 을 연다. (끄려면 터미널에서 Ctrl+C)

---

## 무엇을 고치려면 어디를 보나

| 고치고 싶은 것 | 볼 파일 | 찾을 이름 |
|---|---|---|
| 탭 제목 · 검색결과 설명 · 공유 문구 | `content.ts` | `SITE` |
| 상단 바 버튼 글씨 | `content.ts` | `NAV` |
| 맨 위 큰 문구 · 첫 버튼 | `content.ts` | `HERO` |
| 송출 콘솔의 채널 이름·시청자 숫자 | `content.ts` | `CONSOLE.channels` |
| "지금 벌어지는 일" 3가지 | `content.ts` | `PROBLEMS` |
| 기능 4칸 | `content.ts` | `FEATURES` |
| 신청 후 진행 순서 3단계 | `content.ts` | `STEPS` |
| 요금 (기본료·수수료) | `content.ts` | `PRICING` |
| 신청 폼의 항목·오류 문구·동의 문구 | `content.ts` | `FORM` |
| 맨 아래 이메일 · 연락처 | `content.ts` | `FOOTER` |
| 색 (바탕·글자·빨강·초록) | `app/globals.css` | 맨 위 `:root` 10줄 |
| 로고 모양 | `components/site/wordmark.tsx` | — |
| 탭에 뜨는 작은 아이콘 | `app/icon.svg` | — |
| 섹션 순서 (위아래 바꾸기) | `app/page.tsx` | — |
| 신청 데이터를 받는 곳 | `app/api/lead/route.ts` | `LEAD_WEBHOOK_URL` |
| 구글 애널리틱스 측정 ID | `content.ts` | `ANALYTICS.gaId` |

> 표에 없는 것을 고치려면 `components/site/` 안의 파일 이름을 보면 됩니다.
> 파일 하나가 화면의 한 덩어리입니다. (`hero` = 맨 위, `pricing` = 요금, `lead-form` = 신청 폼 …)

---

## 사전 신청이 들어오면 어디로 가나

**구글 스프레드시트에 한 줄씩 쌓입니다.**
→ [그립나우 사전신청 시트](https://docs.google.com/spreadsheets/d/1GKa9ExwkkgkyrQWEH2K94xUdZr2tU-gkTRD-zm1qzh8/edit)

경로는 이렇습니다.

```
방문자가 폼 제출
  → /api/lead (우리 서버, 이름·번호 형식을 한 번 더 검사)
  → 앱스 스크립트 웹앱 (주소는 Vercel 환경변수 LEAD_WEBHOOK_URL 에만 있음)
  → 시트에 한 줄 추가
```

- 웹앱 주소는 **서버에만** 있어서 사이트 방문자에게 노출되지 않습니다.
- 전송이 실패하면 신청자에게 "계속 안 되면 rayyun@gripcorp.co 로 연락 주세요" 가 뜨고,
  실패한 신청 내용은 Vercel 로그에 남습니다. (Vercel → 프로젝트 → Logs)
- 주소를 바꾸거나 다시 연결해야 하면 → [`docs/구글시트-연결하기.md`](docs/구글시트-연결하기.md)

---

## 이 페이지가 지키고 있는 것

- **모바일 우선** — 320px·375px 폭에서 가로 스크롤 0, 글자 잘림 0
- **외부 요청 최소** — 이미지·글꼴은 전부 우리 서버에서 나갑니다. 남의 서버로 나가는 요청은 구글 애널리틱스를 켰을 때의 구글 스크립트 하나뿐입니다
- **글자 명암비** — 화면의 글자 113곳 전부 웹 접근성 기준(4.5:1) 통과
- **다크모드 / 로그인 / 요란한 애니메이션 없음** — 의도적으로 뺐습니다
- **개인정보** — 이름·연락처·이메일·상호·판매채널만 받고, 수집 안내와 동의 체크를 필수로 둡니다

## 방문자 통계는 어디서 보나

두 가지가 붙어 있습니다. 보는 곳이 다릅니다.

| | 어디서 보나 | 뭘 알려주나 |
|---|---|---|
| **Vercel Analytics** | [Vercel → Analytics 탭](https://vercel.com/ray-422c/gripnow-landing/analytics) | 방문자 수, 인기 페이지, 어디서 타고 왔는지 |
| **구글 애널리틱스(GA4)** | analytics.google.com | **전환율** — 유입경로별로 몇 명이 실제 신청까지 갔는지 |

- Vercel Analytics 는 쿠키를 쓰지 않아 동의 배너가 필요 없습니다. 별도 설정 없이 켜져 있습니다.
- GA4 는 `content.ts` 의 `ANALYTICS.gaId` 에 측정 ID(`G-` 로 시작)를 넣어야 동작합니다.
  **비워두면 구글 스크립트를 아예 싣지 않고 쿠키도 만들지 않습니다.**
  ID 를 넣으면 푸터에 쿠키 사용 안내 문구가 자동으로 함께 표시됩니다.
- 신청이 완료되면 GA4 로 `generate_lead` 전환 이벤트가 갑니다.
  같이 보내는 값: `source`(유입경로), `channels_selected`(고른 채널 수), `monthly_scale`(매출 규모).

### 유입경로 나눠 보기

링크 뒤에 `?src=` 를 붙여 뿌리면, 그 값이 **구글 시트의 `유입경로` 칸**과 **GA4 전환 이벤트**에 함께 기록됩니다.

```
https://gripnow-landing.vercel.app/?src=인스타DM
https://gripnow-landing.vercel.app/?src=카톡채널
```

---

## 나중에 하면 좋은 것

- 카카오톡·문자로 링크를 보냈을 때 뜨는 **미리보기 이미지**(OG 이미지)가 아직 없습니다. 지금은 제목·설명만 뜹니다.
- 신청이 들어올 때 메일로 알림을 받고 싶으면, 시트에서 **도구 → 알림 설정** 을 켜면 됩니다.

---

## 명령어 모음

```bash
npm run dev     # 내 컴퓨터에서 미리보기 (http://localhost:3000)
npm run build   # 배포 전 검사 — 여기서 통과해야 사이트가 정상 배포됩니다
npm run lint    # 코드 문법 검사
```
