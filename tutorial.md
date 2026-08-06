# Building a Futuristic Portfolio Site — A Beginner's Tutorial

This tutorial walks through the portfolio website in this folder, written for someone completely new to frontend development. By the end you should understand what every technology in the stack does, how the pieces fit together, and how the most interesting parts of the code actually work.

The site itself: a dark, animated, single-page portfolio for Sandeep Kumar with a career timeline, skills, a project showcase, an embedded LinkedIn feed, and an AI "Digital Twin" chatbot that answers questions about his career.

---

## Part 1: The Technology Stack

Before reading any code, here is what each tool in the project does and why it exists.

### HTML, CSS and JavaScript (the foundation)

Every website is ultimately made of three languages the browser understands:

- **HTML** — the *structure*: headings, paragraphs, buttons, images.
- **CSS** — the *appearance*: colors, sizes, spacing, animations.
- **JavaScript** — the *behavior*: what happens when you click, scroll, or type.

Everything below is a layer on top of these three.

### React

Writing raw HTML and JavaScript gets unmanageable quickly. **React** lets you build a page out of **components** — small, reusable pieces of UI written as JavaScript functions that return HTML-like code (called **JSX**). Our site has a `Hero` component, a `Journey` component, a `DigitalTwin` component, and so on. A component can hold **state** (data that changes, like the messages in the chat) and React automatically re-draws the screen when state changes.

### Next.js

React on its own is just a library for building UI. **Next.js** is a *framework* around React that handles everything else a real website needs:

- **Routing** — files in the `app/` folder become pages (`app/page.tsx` is the homepage).
- **A development server** — `npm run dev` serves the site at `http://localhost:3000` and hot-reloads when you save a file.
- **Server code** — files like `app/api/chat/route.ts` run on the server, not in the browser. That's where we safely use the secret API key.
- **Optimizations** — fonts, code-splitting, and production builds are handled for you.

### TypeScript

**TypeScript** is JavaScript plus *types*. Instead of `function greet(name)`, you write `function greet(name: string)`. The compiler then catches mistakes (passing a number where a string belongs) before the code ever runs. Files end in `.ts` (logic) or `.tsx` (components containing JSX).

### Tailwind CSS

Instead of writing CSS in separate files, **Tailwind** gives you tiny utility classes you compose directly in your HTML: `mt-8` (margin-top), `text-white`, `rounded-full`, `hover:bg-neon/10`. It looks noisy at first, but you never have to invent class names or hunt for the CSS file that styles a button. We use Tailwind v4, where the theme (custom colors, fonts) is defined inside the CSS file itself.

### Framer Motion

A React animation library. Wrap an element in `<motion.div>` and describe where it starts and ends — Framer Motion tweens between them. It powers the fade-up reveals, the staggered hero text, and the chat panel's pop-in.

### OpenRouter

**OpenRouter** is a gateway that gives one API for many AI models. Our server sends it a conversation plus a "system prompt" containing Sandeep's career data, and the model `openai/gpt-oss-20b:free` writes the answer. The key lives in `.env`, which is deliberately never committed to git.

### Node.js and npm

**Node.js** runs JavaScript outside the browser (it powers the dev server). **npm** is its package manager — `package.json` lists our dependencies, and `npm install` downloads them into `node_modules/`.

---

## Part 2: High-Level Walkthrough

### The folder structure

```
site/
├── app/
│   ├── layout.tsx        # Root wrapper: fonts, metadata, <body>
│   ├── page.tsx          # The homepage: assembles all sections
│   ├── globals.css       # Tailwind theme + custom effects
│   └── api/
│       └── chat/
│           └── route.ts  # Server endpoint for the AI chat
├── components/
│   ├── Nav.tsx           # Fixed top navigation
│   ├── Hero.tsx          # Big name, tagline, stats
│   ├── Counter.tsx       # Animated count-up numbers
│   ├── Marquee.tsx       # Infinite scrolling skills ticker
│   ├── Journey.tsx       # Career timeline
│   ├── Expertise.tsx     # Pillars, skills, certifications
│   ├── Portfolio.tsx     # Project showcase cards
│   ├── LinkedInFeed.tsx  # Horizontal rail of embedded posts
│   ├── Contact.tsx       # Contact cards + footer
│   ├── DigitalTwin.tsx   # Floating AI chat widget
│   ├── Spotlight.tsx     # Cursor-following glow
│   └── Reveal.tsx        # Reusable scroll-in animation helpers
├── lib/
│   └── data.ts           # ALL the content, in one file
├── .env                  # Secret API key (never committed)
└── package.json          # Dependencies and scripts
```

### The single most important design decision

**All content lives in `lib/data.ts`** — every job, project, skill, certification and contact detail. Components never hardcode career facts; they *map over* this data and render it. Updating the site means editing one file. The AI chat reads the *same* file to build its knowledge base, so the chatbot and the visible page can never disagree.

### How a visit works

1. You open `http://localhost:3000`. Next.js renders `app/layout.tsx` (fonts, dark background) wrapping `app/page.tsx`.
2. `page.tsx` stacks the sections in order: `Nav`, `Hero`, `Marquee`, `Journey`, `Expertise`, `Portfolio`, `LinkedInFeed`, `Contact`, `Footer`, plus the floating `DigitalTwin` and `Spotlight`.
3. As you scroll, Framer Motion notices sections entering the viewport and plays their entrance animations.
4. When you ask the Digital Twin a question, the browser POSTs your message to `/api/chat`; the server forwards it (plus the career data) to OpenRouter and *streams* the answer back word by word.

---

## Part 3: Detailed Code Review

### 3.1 The data layer — `lib/data.ts`

A TypeScript `type` describes the shape of a career role, and the data must match it:

```typescript
export type Role = {
  company: string;
  title: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  current?: boolean;   // "?" means optional
};

export const roles: Role[] = [
  {
    company: "Finastra",
    title: "Senior Development Manager",
    period: "Aug 2023 — Present",
    // ...
    current: true,
  },
  // ... six more roles
];
```

If you added a role and misspelled `compnay`, TypeScript would refuse to compile — that's types earning their keep.

### 3.2 The root layout — `app/layout.tsx`

Next.js downloads Google Fonts at build time and exposes each as a CSS variable:

```tsx
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
```

The layout then applies the variables to `<body>`, so CSS anywhere can say "use the display font". The `metadata` export sets the browser tab title and the description search engines see.

### 3.3 The theme — `app/globals.css`

Tailwind v4 lets us define the design system in CSS. These lines create *new Tailwind classes*:

```css
@theme inline {
  --font-display: var(--font-space-grotesk);
  --color-void: #050507;   /* near-black background */
  --color-neon: #22d3ee;   /* cyan accent */
  --color-pulse: #a78bfa;  /* violet accent */
  --color-ember: #f472b6;  /* pink accent */
}
```

Because of this, components can write `text-neon`, `bg-void/70` (70% opacity), or `font-display` like any built-in class.

The file also defines the signature visual effects. The gradient headline text works like this:

```css
.text-gradient {
  background: linear-gradient(100deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%);
  -webkit-background-clip: text;   /* clip the gradient to the letters */
  color: transparent;               /* hide the text color so gradient shows */
}
```

And the glassmorphism card style:

```css
.glass {
  background: rgba(255, 255, 255, 0.03);   /* barely-there white tint */
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);              /* frost whatever is behind it */
}
```

### 3.4 Reusable animation — `components/Reveal.tsx`

Rather than repeating animation code in every section, one component wraps anything that should fade up when scrolled into view:

```tsx
export function Reveal({ children, delay = 0, className }: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}          // start: invisible, 28px lower
      whileInView={{ opacity: 1, y: 0 }}       // end: visible, in place
      viewport={{ once: true, margin: "-80px" }} // trigger once, 80px early
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
```

`children` is React's way of saying "whatever you put between my tags" — so `<Reveal><h2>Hello</h2></Reveal>` animates the heading. This one 20-line component powers most of the motion on the page.

### 3.5 The hero — `components/Hero.tsx`

The `"use client"` directive at the top matters: Next.js components run on the *server* by default, but anything interactive (animations, clicks, state) must run in the *browser*. This line opts the component into browser-land.

The staggered entrance uses Framer Motion **variants** — named animation states shared by a parent and its children:

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};
```

The parent `motion.div` uses `container`, each child uses `item`, and `staggerChildren: 0.12` makes each child start 0.12s after the previous one — the cascade you see on page load.

### 3.6 Count-up numbers — `components/Counter.tsx`

This tiny component demonstrates three core React **hooks**:

```tsx
export function Counter({ target, duration = 1600 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);          // a handle to the DOM element
  const inView = useInView(ref, { once: true });      // true once it scrolls into view
  const [value, setValue] = useState(0);              // state: the displayed number

  useEffect(() => {                                   // side effect: run when inView flips
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);    // decelerate near the end
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);         // cleanup if unmounted mid-count
  }, [inView, target, duration]);

  return <span ref={ref}>{value}</span>;
}
```

`requestAnimationFrame` asks the browser to call `tick` before every screen repaint (~60 times per second), which is smoother than a timer. Each `setValue` call makes React re-render the number.

### 3.7 The timeline — `components/Journey.tsx`

The timeline is data-driven: it maps over `roles` and alternates cards left/right of a central rail using the index:

```tsx
{roles.map((role, i) => {
  const left = i % 2 === 0;   // even indexes on the left, odd on the right
  return (
    <motion.div
      initial={{ opacity: 0, x: left ? -40 : 40 }}   // slide in from its own side
      whileInView={{ opacity: 1, x: 0 }}
      className={`glass glass-hover ... ${left ? "md:mr-auto" : "md:ml-auto"}`}
    >
      ...
    </motion.div>
  );
})}
```

Note the backtick template string mixing fixed classes with a conditional one — an extremely common React pattern.

### 3.8 The skills ticker — `components/Marquee.tsx`

No JavaScript animation here — just CSS. The list is rendered **twice** (`[...skills, ...skills]`), and a keyframe animation slides the whole strip left by exactly 50%:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

When the first copy has fully scrolled out, the second copy is exactly where the first began — the loop is seamless. `animation-play-state: paused` on hover lets visitors stop it to read.

### 3.9 The AI chat server — `app/api/chat/route.ts`

This file runs **only on the server**. It builds the chatbot's knowledge base from the same `data.ts` used by the visible page:

```typescript
const careerContext = `
EXPERIENCE (most recent first)
${roles.map((r) =>
  `- ${r.title} at ${r.company} (${r.period}, ${r.location})
  ${r.description}
  ${r.highlights.map((h) => `• ${h}`).join("\n  ")}`
).join("\n")}
...`;
```

The **system prompt** wraps that data in rules (answer in first person, never invent facts, deflect off-topic questions). Then the request goes to OpenRouter:

```typescript
const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "openai/gpt-oss-20b:free",
    stream: true,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  }),
});
```

`stream: true` is the interesting part. Instead of waiting for the whole answer, OpenRouter sends it in fragments using **Server-Sent Events** — lines like `data: {"choices":[{"delta":{"content":"Hello"}}]}`. The route parses each line, extracts just the text fragment, and forwards it to the browser as a plain text stream:

```typescript
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:")) continue;
  const payload = trimmed.slice(5).trim();
  if (payload === "[DONE]") continue;
  const json = JSON.parse(payload);
  const delta = json.choices?.[0]?.delta?.content;
  if (delta) controller.enqueue(encoder.encode(delta));
}
```

The API key never reaches the browser — visitors talk to *our* server, and only our server talks to OpenRouter.

### 3.10 The chat widget — `components/DigitalTwin.tsx`

The browser side keeps the conversation in state and reads the stream chunk by chunk:

```tsx
const reader = res.body.getReader();
const decoder = new TextDecoder();
let answer = "";
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  answer += decoder.decode(value, { stream: true });
  setMessages([...history, { role: "assistant", content: answer }]);
}
```

Every chunk updates the last message, so the reply appears to type itself. Note the pattern: `history` was captured *before* the loop, so each update replaces the assistant message rather than appending duplicates. Errors are caught and rendered as a chat bubble instead of crashing the widget.

### 3.11 The LinkedIn rail — `components/LinkedInFeed.tsx`

LinkedIn has no public "give me this person's feed" API, so the site uses LinkedIn's official *post embeds*: each URN in `linkedinPosts` becomes an iframe pointed at LinkedIn's embed URL. The horizontal scrolling comes from a handful of Tailwind classes:

```tsx
<div
  ref={railRef}
  onScroll={updateArrows}
  className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth"
>
```

- `flex` puts cards in a row; `overflow-x-auto` makes the row scrollable.
- `snap-x snap-mandatory` (with `snap-start` on cards) makes scrolling click into place per card.
- `no-scrollbar` is our custom class hiding the scrollbar.

The arrow buttons scroll the container programmatically and disable themselves at either end by comparing `scrollLeft` against the maximum scroll distance.

---

## Part 4: Five Improvements From a Self-Review

Honest critiques of the current code, roughly in priority order:

1. **The chat API is unprotected.** Anyone who discovers `/api/chat` can call it as fast as they like, burning through the OpenRouter quota (and money, on a paid model). There is also no cap on message length. Adding rate limiting (e.g. a few requests per minute per IP), a maximum input size, and an abort timeout on the upstream fetch would make it production-safe.

2. **Accessibility is incomplete.** The site animates heavily but never checks the user's `prefers-reduced-motion` setting — some visitors need animation minimized. The chat panel doesn't trap keyboard focus while open or announce new messages to screen readers (`aria-live`), and some low-contrast text (`text-white/30`) falls below WCAG contrast guidelines.

3. **Content is not fully centralized.** Despite the "everything in `data.ts`" principle, some copy still lives inside components: the expertise pillars, the chat's suggested questions, the hero tagline, and the education block in `Journey.tsx` (which duplicates the `education` array that already exists in `data.ts` but is never imported). Finishing the migration would make the data file the true single source of truth.

4. **No tests or linting are configured.** The project has no ESLint setup, no unit tests (the SSE parser in `route.ts` is a prime candidate — malformed stream chunks are silently swallowed), and no end-to-end test verifying the page renders and the chat responds. A CI pipeline running `next build` plus a couple of Playwright tests would catch regressions before they reach GitHub.

5. **Failure states could be more graceful.** If a LinkedIn post URN is wrong or the post is private, the iframe renders an ugly LinkedIn error with no fallback. The chat has no retry button — a failed request forces the user to retype. And the `Spotlight` component updates a style on every mousemove event; throttling with `requestAnimationFrame` would reduce wasted work on slow machines.

---

## Appendix: Running the Project

```bash
npm install    # one-time: download dependencies
npm run dev    # start the dev server → http://localhost:3000
```

Requires a `.env` file in the project root containing `OPENROUTER_API_KEY=...` for the Digital Twin chat to work.
