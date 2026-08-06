# Code Review — Sandeep Kumar Portfolio Site

**Date:** 7 August 2026  
**Scope:** Full local codebase (`app/`, `components/`, `lib/`, config)  
**Review type:** Defect-first with remedial actions  
**Code changes from this review:** None (report only)

---

## Summary

The site is a well-structured Next.js 15 portfolio with a clear content layer (`lib/data.ts`), strong visual design, streaming AI chat, and LinkedIn embeds. It is suitable for local demos. Before public deployment, several **security and reliability** issues must be fixed — especially around the unprotected `/api/chat` endpoint. Accessibility, content consistency, and basic engineering hygiene (lint, tests, CI) are the next priorities.

| Severity | Count |
|----------|------:|
| Critical | 3 |
| High     | 5 |
| Medium   | 9 |
| Low      | 6 |

---

## Critical

### C1. Unprotected chat API — quota / cost abuse

**Where:** `app/api/chat/route.ts`  
**Issue:** `POST /api/chat` accepts unauthenticated requests with no rate limit, no CAPTCHA, and no per-IP throttle. Anyone who discovers the URL can flood OpenRouter and exhaust free-tier quota (or burn paid credits if the model changes).

**Remedial action:**
1. Add rate limiting (e.g. Upstash Redis, Vercel KV, or in-memory for single-instance) — recommend ≤ 10 requests / IP / 10 minutes.
2. Cap request body size and message length (e.g. max 12 messages, max 1,000 chars per user message).
3. Optionally require a short-lived session token or Cloudflare Turnstile before chat unlocks.
4. Add monitoring/alerts on OpenRouter usage.

---

### C2. Weak request validation — malformed / malicious payloads

**Where:** `app/api/chat/route.ts` (lines 75–78)  
**Issue:** Body is cast with `(body.messages as ChatMessage[])` without checking that `messages` is an array, that roles are only `user`/`assistant`, or that `content` is a string. A client can send huge payloads, inject `system` roles, or crash the handler.

**Remedial action:**
1. Validate with Zod (or similar): `{ messages: z.array(z.object({ role: z.enum(["user","assistant"]), content: z.string().max(1000) })).max(12) }`.
2. Reject with `400` on validation failure.
3. Never forward a `system` role from the client (already avoided by construction — keep it that way).

---

### C3. Upstream error details leaked to clients

**Where:** `app/api/chat/route.ts` (lines 98–103)  
**Issue:** On OpenRouter failure, the response includes `detail.slice(0, 300)` from the upstream body. That can expose API error internals, model names, or provider diagnostics to end users (and scrapers).

**Remedial action:**
1. Log the full upstream error server-side only.
2. Return a generic client message: `{ error: "Chat is temporarily unavailable." }`.
3. Map known status codes (429, 401, 503) to safe, distinct UX messages without raw provider text.

---

## High

### H1. No timeout or abort on OpenRouter fetch

**Where:** `app/api/chat/route.ts`  
**Issue:** The upstream `fetch` has no `AbortSignal` / timeout. A hung provider can leave the server stream open indefinitely and tie up resources.

**Remedial action:**
1. Use `AbortSignal.timeout(30000)` (or similar) on the OpenRouter request.
2. On abort, return a clean 504 / stream end with a short error for the UI.
3. In `DigitalTwin.tsx`, abort the client fetch on unmount / panel close so readers don’t update a dead component.

---

### H2. Hardcoded `HTTP-Referer: http://localhost:3000`

**Where:** `app/api/chat/route.ts` (line 88)  
**Issue:** OpenRouter attribution header is fixed to localhost. In production this misattributes traffic and may conflict with OpenRouter app settings / allowlists.

**Remedial action:**
1. Set `HTTP-Referer` from `process.env.NEXT_PUBLIC_SITE_URL` (or `VERCEL_URL`).
2. Document the env var in README.
3. Keep a localhost default only for `NODE_ENV === "development"`.

---

### H3. Chat stream has no client-side abort / retry UX

**Where:** `components/DigitalTwin.tsx`  
**Issue:** If the user closes the panel mid-stream, or navigation occurs, the reader loop may continue calling `setMessages`. Failed requests show an error string but no **Retry** button; the user must retype.

**Remedial action:**
1. Store `AbortController` in a ref; abort in `useEffect` cleanup and when closing the panel.
2. On error, render a “Retry last question” control that re-sends the last user message.
3. Disable the launcher / input clearly while streaming (partially done — extend to suggestion chips).

---

### H4. LinkedIn embeds — performance and failure modes

**Where:** `components/LinkedInFeed.tsx`, `lib/data.ts`  
**Issue:** Five iframes load eagerly into a horizontal rail (lazy per iframe helps, but all near-viewport). Private/invalid URNs show LinkedIn’s error UI inside the card with no fallback. No `sandbox` attribute.

**Remedial action:**
1. Load only the first 1–2 iframes; hydrate others when scrolled into view (`IntersectionObserver`).
2. Validate URN format (`/^urn:li:(share|ugcPost):\d+$/`) before render.
3. Add a fallback card if iframe fails to load (timeout + placeholder + link to LinkedIn).
4. Consider `sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"` after verifying LinkedIn embed requirements.

---

### H5. Production readiness gap — secrets & uncommitted features

**Where:** repo hygiene / `.env` / git status  
**Issue:**
- Digital Twin, LinkedIn feed, and tutorial are largely uncommitted relative to `origin/main`.
- `.env` is correctly gitignored, but the API key must never appear in chat logs, screenshots, or commits.
- If the key was ever shared outside the machine, it should be rotated in the OpenRouter dashboard.

**Remedial action:**
1. Commit and push the feature set when ready (excluding `.env` and PDFs).
2. Rotate `OPENROUTER_API_KEY` if it may have been exposed.
3. On the host (Vercel/etc.), set `OPENROUTER_API_KEY` as a server-only secret — never `NEXT_PUBLIC_*`.

---

## Medium

### M1. Accessibility — motion, focus, live regions

**Where:** `globals.css`, Framer Motion components, `DigitalTwin.tsx`  
**Issue:** No `prefers-reduced-motion` handling. Chat panel does not trap focus, has no `role="dialog"` / `aria-modal`, and new messages are not announced (`aria-live`). Low-contrast text (`text-white/30`, `/40`) may fail WCAG AA.

**Remedial action:**
1. Wrap animations in a reduced-motion check; shorten or disable marquee/float/pulse.
2. Add dialog semantics + Escape-to-close + focus trap for the chat panel.
3. Add `aria-live="polite"` on the message list.
4. Raise contrast on secondary labels to at least ~4.5:1 against `void`.

---

### M2. No mobile navigation

**Where:** `components/Nav.tsx`  
**Issue:** Nav links are `hidden md:flex`. On small screens users only get the logo and (from `sm`) the CTA — no way to jump to Journey / Portfolio / Feed.

**Remedial action:**
1. Add a hamburger / sheet menu for `< md` breakpoints.
2. Ensure focus management and Escape close for the mobile menu.

---

### M3. Content not fully centralized

**Where:** `components/Journey.tsx`, `components/Expertise.tsx`, `components/Hero.tsx`, `components/DigitalTwin.tsx`  
**Issue:** `education` and `publications` exist in `lib/data.ts` but Journey hardcodes education/publication copy. Expertise pillars and chat suggestions are local constants. Hero hardcodes “Senior Development Manager @ Finastra”.

**Remedial action:**
1. Render education/publications from `lib/data.ts` in Journey.
2. Move pillars + chat suggestions into `data.ts` (or a `content.ts`).
3. Derive current role line from `roles.find(r => r.current)`.

---

### M4. Suspicious Tailwind class `bottom-22`

**Where:** `components/DigitalTwin.tsx` (panel positioning)  
**Issue:** `bottom-22` is not a default Tailwind spacing step (scale jumps 20 → 24). Depending on Tailwind v4 theme, this may generate nothing useful and place the panel incorrectly relative to the launcher.

**Remedial action:**
1. Verify computed style in DevTools.
2. Replace with an explicit value, e.g. `bottom-24` or `bottom-[5.5rem]`, so the panel clears the floating button.

---

### M5. Film-grain overlay sits above UI (`z-index: 60`)

**Where:** `app/globals.css` (`.noise::after`)  
**Issue:** Noise layer is `z-index: 60` while Nav / chat are `z-50`. Grain is `pointer-events: none` so clicks work, but visually it can soften text/UI contrast on the chat and nav.

**Remedial action:**
1. Lower noise to `z-10` (above page background, below interactive chrome), **or**
2. Exclude noise from covering `z-50` surfaces.

---

### M6. Spotlight updates style on every `mousemove`

**Where:** `components/Spotlight.tsx`  
**Issue:** Unthrottled style writes can cause unnecessary layout/paint work on low-end devices. Spotlight `z-40` sits under chrome but over content — fine with `pointer-events: none`, but still a cost.

**Remedial action:**
1. Throttle updates with `requestAnimationFrame` (one write per frame).
2. Disable Spotlight when `prefers-reduced-motion` or on coarse pointers (`matchMedia('(pointer: coarse)')`).

---

### M7. List keys use array index in chat

**Where:** `components/DigitalTwin.tsx` (`key={i}`)  
**Issue:** Index keys are fragile if messages are ever reordered/removed; can cause subtle React reconciliation bugs.

**Remedial action:**
1. Give each message a stable `id` (`crypto.randomUUID()` when created).

---

### M8. Timeline / data accuracy nits

**Where:** `lib/data.ts`  
**Issue:** Finastra duration says `3+ yrs` from Aug 2023 (accurate near Aug 2026, but will rot). LinkedIn vs CV previously disagreed on DWS; site follows CV. Phone formatting differs from CV alternate numbers.

**Remedial action:**
1. Prefer computing tenure from start dates, or revisit durations periodically.
2. Document the source of truth (CV vs LinkedIn) in `data.ts` comments.
3. Confirm the public phone/email you want published (Yahoo vs Gmail).

---

### M9. No SEO / social metadata beyond title & description

**Where:** `app/layout.tsx`  
**Issue:** Missing Open Graph / Twitter card images and canonical URL. Shares on LinkedIn/Twitter will look plain.

**Remedial action:**
1. Add `openGraph` and `twitter` fields to `metadata`.
2. Add a 1200×630 OG image and `metadataBase`.

---

## Low

### L1. No ESLint / Prettier / CI

**Where:** `package.json`  
**Issue:** Scripts are only `dev` / `build` / `start`. No lint, typecheck script, or GitHub Action.

**Remedial action:**
1. Add `eslint-config-next`, `"lint": "next lint"`, `"typecheck": "tsc --noEmit"`.
2. CI: install → lint → typecheck → build on every PR.

---

### L2. No automated tests

**Where:** project-wide  
**Issue:** SSE parsing and chat validation are easy to break silently.

**Remedial action:**
1. Unit-test a pure `parseSseDelta(chunk)` helper extracted from the route.
2. One Playwright test: homepage 200 + Digital Twin open + mock `/api/chat`.

---

### L3. Marquee accessibility / duplication

**Where:** `components/Marquee.tsx`  
**Issue:** Skills list is duplicated in the DOM for the CSS loop; screen readers may hear everything twice.

**Remedial action:**
1. Mark the duplicate strip `aria-hidden="true"`.
2. Provide a static list alternative for reduced-motion users.

---

### L4. Design-system font choice

**Where:** `app/layout.tsx` (Inter for body)  
**Issue:** Inter is a common “default AI portfolio” face; the display font (Space Grotesk) carries the brand, but body typography is generic.

**Remedial action (optional polish):**
1. Swap body to a less ubiquitous sans (e.g. IBM Plex Sans, Source Sans 3) if differentiating from template look matters.

---

### L5. Contact exposes phone on a public page + to the LLM

**Where:** `lib/data.ts`, chat system prompt  
**Issue:** Intentional for a portfolio, but phone + email are injected into every chat system prompt (token cost + broader exposure surface if logs are retained).

**Remedial action:**
1. Confirm you want phone public; otherwise keep email + LinkedIn only.
2. Optionally omit phone from the chat system prompt and only show it on the Contact section.

---

### L6. Documentation drift

**Where:** `README.md` vs features  
**Issue:** README may lag Digital Twin / LinkedIn feed / env requirements.

**Remedial action:**
1. Document `OPENROUTER_API_KEY`, model name, LinkedIn URN workflow, and `npm run build` before deploy.

---

## What Is Working Well

- Clear separation of content (`lib/data.ts`) from presentation.
- Streaming chat architecture (server holds the API key; client only sees text deltas).
- Cohesive visual system (tokens in `@theme`, glass, timeline, marquee).
- LinkedIn feed as a horizontal snap rail is a good UX fit for many posts.
- PDFs and `.env*` correctly excluded via `.gitignore`.

---

## Suggested Fix Order

| Priority | Item | Effort |
|----------|------|--------|
| 1 | C1 + C2 + C3 — secure & harden `/api/chat` | Medium |
| 2 | H1 + H3 — timeouts, abort, retry | Small–Medium |
| 3 | H2 + H5 — production URL + secret hygiene | Small |
| 4 | M2 + M1 — mobile nav + a11y basics | Medium |
| 5 | H4 — LinkedIn lazy-load + fallbacks | Medium |
| 6 | M3 — finish data centralization | Small |
| 7 | L1 + L2 — lint, CI, smoke tests | Medium |

---

## Out of Scope / Notes

- This review did **not** modify any application code.
- LinkedIn does not offer a public “member feed API”; manual URN curation remains the correct approach unless you pursue LinkedIn partner APIs.
- Free-tier model latency (~15–25s) is a product constraint, not a code bug — consider a faster paid model for production UX.
