# Sandeep Kumar — Portfolio

Personal portfolio site for Sandeep Kumar, Senior Development Manager at Finastra.
Dark, futuristic "enterprise meets edgy" design built with Next.js.

## Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `lib/data.ts` — all profile content (roles, skills, certifications, contact). Edit this file to update the site.
- To show LinkedIn posts in the feed section: on LinkedIn, open a post → "..." menu → "Embed this post" → copy the `urn:li:share:...` (or `urn:li:ugcPost:...`) part from the iframe src, and add it to `linkedinPosts` in `lib/data.ts`. Posts must be public.
- `components/` — one component per section (Hero, Journey, Expertise, Portfolio, Contact).
- `app/globals.css` — theme tokens and custom effects (grid, orbs, marquee, glass).
