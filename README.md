# Wellora Fit · 90-Day LinkedIn Content System

A Next.js + React + Tailwind app that generates **90 days × 3 posts/day = 270 unique LinkedIn posts** for [Wellora Fit](https://wellorafit.com), India's doctor-led integrated weight-loss program.

Each post comes with:
- Full LinkedIn copy + hashtags
- Live, **editable** image preview (1080×1080, animated)
- Ready-to-paste AI image prompt (Midjourney / DALL-E / Leonardo / Canva AI)
- Step-by-step Canva design brief
- One-click PNG (high-res) and SVG export

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's inside

### 90 days, 13 themed weeks

| Week | Days | Theme |
|------|------|-------|
| 1 | 1-7 | Foundation · why diets fail · 4-pillar method |
| 2 | 8-14 | Nutrition · Indian thali rebalanced |
| 3 | 15-21 | Fitness · NEAT, walking, strength |
| 4 | 22-28 | Lifestyle · sleep, stress, hormones, mindset |
| 5 | 29-30 | First-month transformations + CTA |
| 6 | 31-37 | Indian regional foods (South, North, Bengali, Maharashtra, Punjabi, Gujarati, festival) |
| 7 | 38-44 | Hormones · insulin, cortisol, thyroid, estrogen, testosterone, leptin, GH |
| 8 | 45-51 | Conditions · fatty liver, diabetes, Apo B, BP, sleep apnea, GERD, joints |
| 9 | 52-58 | Movement · yoga, Zone 2, fundamentals, mobility, HIIT, sport, 50+ |
| 10 | 59-65 | Behavior · identity, habits, accountability, social, kitchen, time, systems |
| 11 | 66-72 | Populations · women 30s/40s, postpartum, IT men, seniors, students, shift workers |
| 12 | 73-79 | Recipes · breakfasts, lunches, dinners, snacks, festivals, travel, eating out |
| 13 | 80-86 | Myth-busting · detox, supplements, fad diets, apps, scales, labels, trends |
| 13b | 87-90 | Final transformations + 90-day recap + final CTA |

### Image templates

Each image renders one of 7 professionally designed templates with topic-relevant pillar icons (medical · nutrition · fitness · lifestyle · general):

1. **stat** — big number + animated donut ring + sparkles
2. **quote** — editorial quote with decorative quote glyph
3. **list** — numbered cards with gradient badges
4. **tip** — gradient header + glassmorphism inclusions card
5. **myth** — split contrast (red MYTH / blue TRUTH) with VS badge
6. **cta** — vibrant blue gradient with shimmer + CTA button
7. **compare** — split halves with checkmark/cross icons + center VS

### Inline image editor

Each post's **Image** tab shows the live preview alongside an input panel:
- Edit headline / subhead
- Edit stat number + label
- Edit myth / truth pair
- Add / remove / reorder list bullets and compare items
- **Reset** to restore original
- **↓ PNG (high-res)** exports at 2× pixel ratio (effectively 2160×2160)
- **↓ SVG** exports vector

## File structure

```
.
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx            # 90-day grid home
│   ├── globals.css         # Tailwind + animations
│   └── day/[id]/page.tsx   # day detail with 3 posts
├── components/
│   ├── Header.tsx
│   ├── DayCard.tsx
│   ├── PostCard.tsx
│   ├── ImageTemplate.tsx   # SVG/HTML rendering + PNG export
│   ├── EditableImagePanel.tsx
│   ├── PillarBadge.tsx
│   ├── CopyButton.tsx
│   └── Icons.tsx           # pillar + utility SVG icons
├── lib/
│   ├── types.ts
│   ├── data.ts             # assembles all 90 days
│   └── posts/
│       ├── week-05.ts      # Days 31-37
│       ├── week-06.ts      # Days 38-44
│       ├── week-07.ts      # Days 45-51
│       ├── week-08.ts      # Days 52-58
│       ├── week-09.ts      # Days 59-65
│       ├── week-10.ts      # Days 66-72
│       ├── week-11.ts      # Days 73-79
│       ├── week-12.ts      # Days 80-86
│       └── week-13.ts      # Days 87-90
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── postcss.config.js
```

## Tech stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript 5**
- **Tailwind CSS 3** (custom Wellora blue palette)
- **html-to-image** for high-res PNG/SVG export

## Editing content

Open any `lib/posts/week-XX.ts` (or `lib/data.ts` for Days 1-30). Each post has `title`, `copy`, `hashtags`, and an `image` spec. Changes hot-reload in dev.

## Brand

- **Wellora Fit** — India's integrated wellness system
- **Tagline:** Weight Loss That Finally Works — The WelloraFit Way
- **Approach:** 4 pillars · Medical + Nutrition + Fitness + Lifestyle
- **Entry point:** Initiate Plan ₹1,699 (71+ marker bloodwork + doctor consult)
- **Website:** [wellorafit.com](https://wellorafit.com)
- **LinkedIn:** [@wellorafit](https://www.linkedin.com/company/wellorafit)
- **Instagram:** [@wellora_fit](https://www.instagram.com/wellora_fit)
