# Saurav Danej · 90-Day AI/ML LinkedIn Content System

A Next.js app that holds 90 days × 5 posts = **450 ready-to-ship LinkedIn + Instagram posts** on AI/ML, Python, RAG, DSA, Automation, Agents and Career.

Every post comes with:
- ✍️ Full post copy (200–300 words, human voice, emojis)
- 🏷️ Curated hashtags
- 🖼️ A unique 1080×1080 image you can download as PNG or SVG
- 🤖 An AI prompt for Midjourney / DALL-E / Leonardo / Canva AI
- 🎨 A step-by-step Canva design brief

Built by [Saurav Danej](https://linkedin.com/in/sauravdnj) · [GitHub](https://github.com/SauravDnj) · [@saurav_dnj_24](https://www.instagram.com/saurav_dnj_24)

---

## ✨ Features

- **90 days, 450 posts.** A complete content calendar — concept → deep-dive → code → tip → recap, every day.
- **7 content pillars** colour-coded across the UI:
  - 🟣 AI/ML
  - 🟢 Python
  - 🔵 RAG
  - 🟡 DSA
  - 🌸 Automation
  - 🟪 Agents
  - 💜 Career
- **8 image templates** rendered as React components, exported at 2160×2160 PNG/SVG:
  - `stat` · `quote` · `list` · `tip` · `myth` · `cta` · `compare` · `code`
- **Editable images.** Tweak the headline, bullets, code snippet, etc. live in the browser before downloading.
- **Static animations.** Preview matches the export exactly — no animated frames hidden in the live view.
- **Pillar-aware styling.** Each pillar has its own accent colour that flows from badges through the image accents.
- **Static-export ready.** All 90 day-pages prerender at build time; deploy to any static host.

---

## 🧰 Tech stack

- **Next.js 14** (app router, static export)
- **React 18**
- **TypeScript 5.5** (strict)
- **Tailwind CSS 3.4** with a custom electric-violet/cyan palette
- **html-to-image** for client-side PNG/SVG export
- **Plus Jakarta Sans + Inter + JetBrains Mono** (Google Fonts)

---

## 📦 Installation

Requires **Node.js 18+** (20+ recommended).

```bash
# Clone
git clone https://github.com/SauravDnj/<this-repo>.git
cd <this-repo>

# Install
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🚀 Scripts

| Command           | What it does                                           |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start the Next.js dev server on `localhost:3000`       |
| `npm run build`   | Build the production app (prerenders all 90 day pages) |
| `npm run start`   | Start the production server after `build`              |
| `npm run lint`    | Run Next's ESLint check                                |

---

## 🗂 Project structure

```
.
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Home page — 90-day grid
│   ├── globals.css         # Tailwind + custom utilities
│   └── day/[id]/page.tsx   # Per-day page (1 of 90)
├── components/
│   ├── Header.tsx          # Top nav (LinkedIn / GitHub / Instagram)
│   ├── DayCard.tsx         # Day card on home grid
│   ├── PostCard.tsx        # Post card on day page (Post / Image / AI / Canva tabs)
│   ├── PillarBadge.tsx     # Coloured pillar tag
│   ├── Icons.tsx           # SVG icons (per pillar + utilities)
│   ├── ImageTemplate.tsx   # 8 image templates rendered to PNG/SVG
│   ├── EditableImagePanel.tsx  # Live editor for image fields
│   └── CopyButton.tsx      # Clipboard helper
├── lib/
│   ├── types.ts            # Pillar, PostType, Slot, ImageSpec, Post, DayPlan
│   ├── data.ts             # Aggregates all weeks into `plan` + `allPosts`
│   └── posts/
│       ├── week-01.ts      # Days 1–7   (Foundations + Python warm-up)
│       ├── week-02.ts      # Days 8–14  (Python intermediate)
│       ├── week-03.ts      # Days 15–21 (DSA basics)
│       ├── week-04.ts      # Days 22–28 (DSA deep)
│       ├── week-05.ts      # Days 29–35 (NumPy, Pandas, EDA)
│       ├── week-06.ts      # Days 36–42 (Classical ML)
│       ├── week-07.ts      # Days 43–49 (Deep Learning)
│       ├── week-08.ts      # Days 50–56 (NLP & Transformers)
│       ├── week-09.ts      # Days 57–63 (RAG basics)
│       ├── week-10.ts      # Days 64–70 (RAG advanced)
│       ├── week-11.ts      # Days 71–77 (Agents)
│       ├── week-12.ts      # Days 78–84 (Automation)
│       └── week-13.ts      # Days 85–90 (Career & wrap)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🧠 Data model

Every post in `lib/posts/week-XX.ts` follows this shape (`lib/types.ts`):

```ts
interface Post {
  id: string;                                  // e.g. "d1-p1"
  day: number;                                 // 1..90
  postNumber: 1 | 2 | 3 | 4 | 5;
  slot: "morning" | "midday" | "afternoon" | "evening" | "night";
  type: "concept" | "deepdive" | "code" | "tip" | "recap"
      | "myth" | "story" | "question" | "checklist"
      | "compare" | "project" | "cta";
  pillar: "ai-ml" | "python" | "rag" | "dsa"
        | "automation" | "agents" | "career";
  title: string;
  copy: string;             // 200-300 words, human voice, with emojis
  hashtags: string[];       // 4-6 tags
  image: ImageSpec;         // template + headline + bullets + AI prompt + Canva brief
}
```

Each day groups 5 posts in a `DayPlan` and the full plan is exported as `plan` from `lib/data.ts`.

---

## 🎨 Image templates

| Template  | Best for                                |
| --------- | --------------------------------------- |
| `stat`    | Big numbers, hooks, headline statements |
| `quote`   | Short opinion / thesis cards            |
| `list`    | 4–7 bullet rundowns                     |
| `tip`     | "Pro tip" with action items             |
| `myth`    | Myth vs truth split                     |
| `cta`     | Follow / subscribe / launch posts       |
| `compare` | Two-column "X vs Y" comparisons         |
| `code`    | Dark IDE-style code snippets            |

The accent colour of each image is auto-picked from the post's pillar, so a Python post gets a green accent, a RAG post gets cyan, an Automation post gets magenta, and so on.

Exports are **2160×2160 PNG or SVG**, sized for LinkedIn and Instagram square posts.

---

## 🛠 Customising

### Edit a post
Open the relevant `lib/posts/week-XX.ts`, find the post by `id` (e.g. `d12-p3`), edit `title`, `copy`, `hashtags`, or any field of `image`. Save — the dev server hot-reloads.

### Edit an image at runtime
On any day page, click the **Image** tab on a post card. The right-hand editor lets you tweak the headline, subhead, bullets, code snippet, etc., and the preview updates live. Click `↓ PNG` or `↓ SVG` to download.

### Change branding colours
The Tailwind palette key is still named `wellora` (kept stable across the rewrite); the actual hex values now form an electric violet/cyan tech palette. Edit `tailwind.config.ts` to retune.

### Change the "S" wordmark
Update `components/Header.tsx` and `components/ImageTemplate.tsx`'s `BrandPill` component.

---

## 🌍 Deployment

Build outputs static HTML for every day page (`/day/1`, `/day/2`, …, `/day/90`):

```bash
npm run build
```

Deploy the contents of `.next/` (or use `next export` for fully static output) to:
- **Vercel** — zero-config (`vercel deploy`)
- **Netlify** — zero-config
- **Cloudflare Pages**
- Any static-file host

---

## 📅 Daily posting workflow

For each day:
1. Open the day's page in the app.
2. For each of the 5 posts: copy the **post + hashtags** to LinkedIn / Instagram.
3. Click **↓ PNG** to download the image. Drop it into the post.
4. (Optional) Use the **AI prompt** tab to regenerate a different visual in Midjourney/DALL-E.
5. (Optional) Hand the **Canva brief** to a designer for a custom version.

5 posts = roughly 5 minutes of posting time per day.

---

## 📊 What's inside the 90-day plan

| Weeks | Pillar focus                                    |
| ----- | ----------------------------------------------- |
| 1–2   | Python foundations + intermediate (OOP, decorators, generators, types) |
| 3–4   | DSA — Big-O, arrays, strings, hash maps, trees, graphs, DP |
| 5     | Data stack — NumPy, Pandas, plotting, EDA, cleaning |
| 6     | Classical ML — regression, trees, ensembles, k-means |
| 7     | Deep Learning — neurons, backprop, CNNs, RNNs, training tricks |
| 8     | NLP & Transformers — tokens, embeddings, attention, BERT, GPT |
| 9–10  | RAG — chunking, vectors, retrieval, reranking, query rewriting, GraphRAG |
| 11    | Agents — ReAct, tools, planning, multi-agent, LangGraph |
| 12    | Automation — scraping, schedulers, Slack/email, APIs, serverless |
| 13    | Career — portfolio, OSS, resume, interviews, learning loop |

---

## 🤝 Contact

- 💼 LinkedIn — [linkedin.com/in/sauravdnj](https://linkedin.com/in/sauravdnj)
- 💻 GitHub — [github.com/SauravDnj](https://github.com/SauravDnj)
- 📸 Instagram — [@saurav_dnj_24](https://www.instagram.com/saurav_dnj_24)

If this saves you time, the best thank-you is to start your own 90-day public sprint and tag me. 🚀
