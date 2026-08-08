# Deploying the Portfolio to Vercel — Step-by-Step Tutorial

This guide walks you from "site running on localhost" to "site live on the internet" using **Vercel**, written for a deployment beginner. It is specific to this project — including the one secret (`OPENROUTER_API_KEY`) the Digital Twin chat needs to work in production.

**Good news up front:** the production build (`npm run build`) already passes locally with zero errors, so Vercel should build it without surprises.

---

## Why Vercel?

Vercel is the company that makes Next.js, and their hosting platform is purpose-built for it:

- **Free tier** — a personal portfolio fits comfortably in the free "Hobby" plan.
- **Zero configuration** — Vercel detects Next.js and knows how to build and serve it, including the `/api/chat` server route (it becomes a serverless function automatically).
- **Git-connected** — every `git push` to `main` deploys automatically. No manual uploads, ever.
- **Free HTTPS + domain** — you get `your-project.vercel.app` with a certificate out of the box.

---

## Prerequisites

1. Your code is on GitHub — ✅ already done: `https://github.com/sandeepkmehta9086-lab/site`
2. All changes are committed and pushed — ✅ done in earlier steps (run `git status` to confirm it says "working tree clean" and "up to date with origin/main").
3. Your OpenRouter API key — it's in your local `.env` file. Keep it handy; you'll paste it into Vercel in Step 4. (`.env` is gitignored, which is correct — secrets never travel through GitHub. That's exactly why Vercel needs its own copy.)

---

## Step 1: Create a Vercel account

1. Go to [vercel.com/signup](https://vercel.com/signup).
2. Choose **"Continue with GitHub"** and sign in with the same GitHub account that owns the `site` repository (`sandeepkmehta9086-lab`).
3. Authorize Vercel when GitHub asks. Pick the **Hobby** (free) plan.

Signing up via GitHub matters: it's what lets Vercel see your repositories and deploy on every push.

---

## Step 2: Import the repository

1. From the Vercel dashboard, click **"Add New… → Project"**.
2. You'll see a list of your GitHub repositories. Find **`site`** and click **"Import"**.
   - If it's not listed, click **"Adjust GitHub App Permissions"** and grant Vercel access to the `site` repository.

---

## Step 3: Configure the project

Vercel now shows a configuration screen. It will have auto-detected almost everything:

| Setting | Value | Action |
|---|---|---|
| Framework Preset | Next.js | Leave as detected |
| Root Directory | `./` | Leave as is |
| Build Command | `next build` | Leave as is |
| Output Directory | (managed by Next.js) | Leave as is |
| Install Command | `npm install` | Leave as is |

You don't need to change any of these. The only thing you must do manually is Step 4.

---

## Step 4: Add the environment variable (critical)

Without this, the site will deploy fine but the Digital Twin chat will answer every question with an error.

Still on the configuration screen (or later under **Project → Settings → Environment Variables**):

1. Expand **"Environment Variables"**.
2. Add:
   - **Key:** `OPENROUTER_API_KEY`
   - **Value:** paste the key from your local `.env` file (it starts with `sk-or-v1-...`)
   - **Environments:** leave all three checked (Production, Preview, Development).
3. Click **"Add"**.

Two security notes:

- Never name it `NEXT_PUBLIC_OPENROUTER_API_KEY`. The `NEXT_PUBLIC_` prefix tells Next.js to expose a variable to the browser — that would leak your secret key to every visitor. The plain name keeps it server-only, which is what `app/api/chat/route.ts` expects.
- If you believe the key has ever been shared or pasted anywhere public, generate a fresh key at [openrouter.ai/keys](https://openrouter.ai/keys) first and use that.

---

## Step 5: Deploy

1. Click **"Deploy"**.
2. Watch the build log — you'll see the same steps as running `npm run build` locally: install, compile, generate pages. It typically takes 1–2 minutes.
3. When it finishes you'll get a celebration screen with your live URL, something like:

```
https://site-sandeepkmehta9086-lab.vercel.app
```

Click **"Visit"** and your portfolio is on the internet.

---

## Step 6: Verify everything works in production

Go through this checklist on the live URL:

- [ ] **Homepage** loads with the dark theme, hero animation and stats count-up.
- [ ] **Career timeline, expertise, portfolio** sections render as they do locally.
- [ ] **LinkedIn feed** — the five embedded posts load in the horizontal rail. (Embeds are served by LinkedIn, so they behave the same as localhost.)
- [ ] **Digital Twin chat** — open it, ask "What does Sandeep do at Finastra?" and confirm a streamed answer arrives. This proves the environment variable is set correctly.
   - If the chat replies with "OPENROUTER_API_KEY is not configured", the variable is missing — add it (Step 4) and **redeploy** (Deployments tab → "…" menu on the latest deployment → Redeploy). Env var changes only take effect on a new deployment.
- [ ] **Mobile check** — open the URL on your phone; sections should stack cleanly.

---

## Step 7: Automatic deployments from now on

This is the part that makes Vercel pleasant: the pipeline is already set up.

- Every **push to `main`** → production deploys automatically.
- Every **pull request** → gets its own preview URL to test before merging.

Your workflow from now on is just:

```bash
git add <files>
git commit -m "Describe the change"
git push
```

…and the live site updates itself a minute or two later. Update a role in `lib/data.ts`, push, done.

---

## Step 8 (optional): A custom domain

The default `*.vercel.app` URL is fine, but `sandeepkumar.dev` (or similar) looks better on a CV:

1. Buy a domain from any registrar (Namecheap, GoDaddy, Cloudflare — roughly ₹800–1,500/year).
2. In Vercel: **Project → Settings → Domains → Add**, and type your domain.
3. Vercel shows you the DNS records to set at your registrar (usually one `A` record and one `CNAME`).
4. Wait for DNS to propagate (minutes to a few hours). HTTPS is issued automatically.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Build fails on Vercel but works locally | Version drift or a file you forgot to push | Check the build log's first red line; run `git status` locally to confirm nothing is uncommitted |
| Chat returns "not configured" error | Env var missing or added after deploy | Add `OPENROUTER_API_KEY` in Settings, then Redeploy |
| Chat is very slow (15–25s) | The `:free` model tier is slow by nature | Expected; switch `MODEL` in `app/api/chat/route.ts` to a faster paid model if it matters |
| Chat fails intermittently with 429 | Free-tier rate limits on OpenRouter | Wait and retry, or upgrade the OpenRouter plan |
| LinkedIn posts show an error card | Post is private or URN is wrong | Confirm each URN in `lib/data.ts` and that the posts are public |

---

## Before you share the URL widely — one warning

`review.md` in this repo flagged the chat API as its top finding (**C1**): `/api/chat` has **no rate limiting**, so anyone with the URL can hammer it and exhaust your OpenRouter quota. With the free model the damage is capped (it's free), but if you ever switch to a paid model, add rate limiting **first**. For a quiet personal-portfolio launch this is an acceptable known risk — just be aware of it.

---

## Recap

1. Sign up at Vercel with GitHub → import the `site` repo.
2. Add `OPENROUTER_API_KEY` as an environment variable — the one manual step that matters.
3. Deploy, then verify the chat and the LinkedIn feed on the live URL.
4. From now on, `git push` = deploy.
