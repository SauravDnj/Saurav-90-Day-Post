import type { DayPlan } from "../types";

const CORE = ["#AICareer", "#TechCareer", "#BuildInPublic", "#100DaysOfCode", "#OpenSource"];

export const week13: DayPlan[] = [
  /* DAY 85 */
  {
    day: 85, theme: "Build a portfolio that lands jobs", pillar: "career",
    posts: [
      { id: "d85-p1", day: 85, postNumber: 1, slot: "morning", type: "concept", pillar: "career",
        title: "Three projects > 30 tutorials",
        copy: "Recruiters skim. Hiring managers verify.\n\nThe single best move for an AI/ML resume is three honest, polished portfolio projects:\n\n1. A classical ML project — train, evaluate, deploy. Show you know the loop.\n2. A deep learning project — train a non-trivial model on a real dataset.\n3. An LLM-powered app — RAG / agent / fine-tune. Show you can ship.\n\nEach with a public GitHub repo, a short blog post, and a 90-second demo video. That's it. More projects don't beat three great ones.",
        hashtags: [...CORE, "#Portfolio"],
        image: { template: "stat", headline: "3 projects > 30 tutorials", subhead: "Polish > volume.", stat: { number: "3", label: "honest projects beat 30 tutorials" }, accent: "violet",
          aiPrompt: "Stat poster, violet, 1:1", canvaBrief: "Violet gradient. Big 3."
        }
      },
      { id: "d85-p2", day: 85, postNumber: 2, slot: "midday", type: "deepdive", pillar: "career",
        title: "What every README must have",
        copy: "Most ML repos have a README that says 'install requirements, run main.py'. Useless.\n\nWhat I look for hiring:\n- Problem statement (1 paragraph — what does this solve?)\n- Demo gif / screenshot — show, don't tell\n- Architecture diagram — your design, simply drawn\n- How to run — copy-paste commands\n- Results — numbers vs baseline, plots\n- Trade-offs you considered + chose\n\n10 minutes of README polish lifts a project from 'student' to 'engineer'.",
        hashtags: [...CORE, "#GitHub"],
        image: { template: "list", headline: "README — 6 ingredients",
          bullets: ["Problem statement", "Demo gif / screenshot", "Architecture diagram", "Copy-paste run commands", "Results vs baseline", "Trade-offs"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 6 rows."
        }
      },
      { id: "d85-p3", day: 85, postNumber: 3, slot: "afternoon", type: "code", pillar: "career",
        title: "A README template I reuse for AI/ML projects",
        copy: "Start every repo with this skeleton. Replace placeholders. Done in 30 minutes. Recruiters get the gist in 30 seconds.",
        hashtags: [...CORE, "#GitHub"],
        image: { template: "code", headline: "README template",
          code: { language: "markdown", snippet: "# Project Name — one-line tagline\n\n![demo](docs/demo.gif)\n\n## What this does\n2-3 sentences.\n\n## Why\nProblem + who cares.\n\n## Architecture\n![arch](docs/arch.png)\n\n## Run it\n```bash\nuv venv\nuv pip install -r requirements.txt\npython app.py\n```\n\n## Results\n| Model | F1 | Latency |\n|---|---|---|\n| Baseline | 0.62 | 50ms |\n| This | 0.81 | 110ms |\n\n## Trade-offs\n- Why I chose X over Y\n\n## License\nMIT" },
          accent: "violet",
          aiPrompt: "Dark code card with markdown, violet, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d85-p4", day: 85, postNumber: 4, slot: "evening", type: "tip", pillar: "career",
        title: "Pin your three best repos on GitHub",
        copy: "Your GitHub profile is the first link recruiters click. They see your pinned repos.\n\nBy default, GitHub pins recently-updated. That includes hello-world forks. Bad signal.\n\nFix:\n1. Profile → Customize your pins\n2. Pick your three best (the portfolio above)\n3. Make their READMEs polished\n\nAdd a profile README too — one paragraph + links. Spend 30 minutes. The signal upgrade is enormous.",
        hashtags: [...CORE, "#GitHub"],
        image: { template: "tip", headline: "Pin your 3 best repos",
          bullets: ["Customize → pin manually", "Pick polished projects", "Add profile README", "30 min, big upgrade"],
          accent: "violet",
          aiPrompt: "Pro tip card, violet, 1:1", canvaBrief: "Violet header. PRO TIP."
        }
      },
      { id: "d85-p5", day: 85, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Day 85 — portfolio first",
        copy: "Day 85 done.\n\n- Three real projects > many tutorials\n- README has 6 ingredients\n- Reusable template\n- Pin your best on GitHub\n\nTomorrow (Day 86): open source. The cheapest way to learn AT scale and get noticed.",
        hashtags: [...CORE, "#Portfolio"],
        image: { template: "quote", headline: "Three projects. Polished.", subhead: "Beats every tutorial certificate.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1", canvaBrief: "Pastel violet quote card." }
      },
    ]
  },
  /* DAY 86 */
  {
    day: 86, theme: "Open source — start small, ship often", pillar: "career",
    posts: [
      { id: "d86-p1", day: 86, postNumber: 1, slot: "morning", type: "concept", pillar: "career",
        title: "Your first OSS PR doesn't need to be code",
        copy: "Common myth: I need to fix a bug to contribute.\n\nReality, what counts:\n- Doc fixes (typos, missing examples, broken links)\n- Test coverage for an edge case\n- A repro for an open issue\n- Reviewing someone else's PR helpfully\n- Triaging issues (label, ask for repro)\n\nMaintainers love these. Each gets you a 'merged-in-X' badge. Stack a few; you're now a known contributor. Then escalate to bug fixes, features.",
        hashtags: [...CORE, "#OpenSource"],
        image: { template: "list", headline: "First OSS PR — 5 paths",
          bullets: ["Doc fix", "Test coverage", "Bug repro", "Helpful PR review", "Issue triage"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d86-p2", day: 86, postNumber: 2, slot: "midday", type: "deepdive", pillar: "career",
        title: "Pick a repo where the maintainers actually merge",
        copy: "Some repos are graveyards. Stars, no merges, dead PRs.\n\nBefore you contribute, check:\n- Last commit < 30 days\n- Recent PRs merged within a week\n- Maintainer responds to issues\n- 'good first issue' label populated\n\nGreat AI/ML repos for first contributions in 2026: huggingface/transformers, langchain-ai/langchain, vllm-project/vllm, qdrant/qdrant, encode/httpx. All actively maintained, all welcome new contributors.",
        hashtags: [...CORE, "#OpenSource"],
        image: { template: "list", headline: "Find an alive repo",
          bullets: ["Recent commits (<30d)", "Recent merged PRs", "Responsive issues", "Good-first-issue list"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d86-p3", day: 86, postNumber: 3, slot: "afternoon", type: "code", pillar: "career",
        title: "A clean OSS contribution workflow",
        copy: "git workflow that respects upstream. fork, branch, fix, PR. Maintainers love clean diffs.\n\nKey: rebase, don't merge. Squash if asked. Always reference the issue you're closing.",
        hashtags: [...CORE, "#git"],
        image: { template: "code", headline: "OSS PR workflow",
          code: { language: "bash", snippet: "# 1. fork on GitHub, then\ngit clone git@github.com:you/repo.git\ncd repo\ngit remote add upstream git@github.com:owner/repo.git\n\n# 2. branch from latest main\ngit fetch upstream\ngit checkout -b fix/typo-readme upstream/main\n\n# 3. make change, commit, push\ngit commit -am 'docs: fix typo in retrieval section (closes #123)'\ngit push -u origin fix/typo-readme\n\n# 4. open PR. Reference the issue. Brief description." },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d86-p4", day: 86, postNumber: 4, slot: "evening", type: "tip", pillar: "career",
        title: "Write the PR description like a story",
        copy: "Bad PR: 'fix bug'\n\nGood PR:\n- 1-line summary\n- Why this change is needed (link to issue / user report)\n- What you changed (bullet list)\n- How to test (commands or screenshots)\n- Any risks / trade-offs\n\nMaintainers read PR descriptions before code. A great description gets your PR reviewed faster, merged sooner.",
        hashtags: [...CORE, "#GitHub"],
        image: { template: "tip", headline: "PR description = a short story",
          bullets: ["Summary", "Why (link issue)", "What changed", "How to test", "Risks / trade-offs"],
          accent: "violet",
          aiPrompt: "Pro tip card, violet, 1:1", canvaBrief: "Violet header. PRO TIP."
        }
      },
      { id: "d86-p5", day: 86, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Day 86 — open source, started",
        copy: "Day 86 done.\n\n- First PR doesn't have to be code\n- Pick living repos\n- Clean fork → branch → PR workflow\n- PR descriptions like a story\n\nTomorrow (Day 87): the resume + LinkedIn page that gets the interview.",
        hashtags: [...CORE, "#OpenSource"],
        image: { template: "quote", headline: "Start small. Ship often.", subhead: "Doc fixes count.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1", canvaBrief: "Pastel violet quote card." }
      },
    ]
  },
  /* DAY 87 */
  {
    day: 87, theme: "Resume + LinkedIn — recruiter-ready", pillar: "career",
    posts: [
      { id: "d87-p1", day: 87, postNumber: 1, slot: "morning", type: "concept", pillar: "career",
        title: "Resume is a 30-second highlight reel",
        copy: "A recruiter spends 10-30 seconds on a resume on average. Optimise for that.\n\nWhat works:\n- One page (two if 8+ years experience)\n- 3-5 bullets per role, each starting with a verb\n- Each bullet has a NUMBER (improved X by Y%, shipped to N users, reduced cost by $Z)\n- Top: name, link to GitHub + portfolio + LinkedIn\n- No photo, no objective statement, no skills bar charts\n\nThe number per bullet is the single biggest upgrade. 'Built RAG pipeline' becomes 'Built RAG pipeline serving 5k queries/day, p99 latency 1.2s'.",
        hashtags: [...CORE, "#Resume"],
        image: { template: "list", headline: "Resume essentials",
          bullets: ["1 page (or 2)", "Verb-first bullets", "Numbers in every bullet", "Links at top", "No photo / objective"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d87-p2", day: 87, postNumber: 2, slot: "midday", type: "deepdive", pillar: "career",
        title: "LinkedIn — the headline + about section",
        copy: "Recruiters search LinkedIn by keyword. The headline + about are your SEO.\n\nHeadline (220 chars max):\n- Role + tech stack + outcome focus\n- 'AI/ML Engineer · LLMs · RAG · Python · shipping production agents'\n- Not 'Aspiring AI Engineer'\n\nAbout (3-4 short paragraphs):\n- One sentence about who you are\n- 2-3 sentences about projects + impact\n- 1 sentence about what you're looking for\n- Links to GitHub + portfolio\n\nUpdate when your work changes. Don't let it drift.",
        hashtags: [...CORE, "#LinkedIn"],
        image: { template: "list", headline: "LinkedIn — what to optimise",
          bullets: ["Headline = role + stack", "About = 3-4 short paras", "Links to GitHub / portfolio", "Update quarterly"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d87-p3", day: 87, postNumber: 3, slot: "afternoon", type: "code", pillar: "career",
        title: "A LaTeX resume template (small repo)",
        copy: "PDF resumes from LaTeX or Markdown beat Word every time. Consistent typography, clean version control, easy diffs.\n\nMy default is rxresume / Awesome-CV / a small custom LaTeX template. Source on GitHub. Build one PDF per JD where the bullet order changes.",
        hashtags: [...CORE, "#LaTeX"],
        image: { template: "code", headline: "Resume in LaTeX (excerpt)",
          code: { language: "latex", snippet: "\\documentclass[10pt,a4paper]{article}\n\\usepackage[margin=1.5cm]{geometry}\n\\usepackage{enumitem}\n\\setlist{leftmargin=*,nosep}\n\n\\begin{document}\n\\noindent{\\Huge \\bfseries Saurav Danej} \\hfill\n  \\href{https://linkedin.com/in/sauravdnj}{linkedin.com/in/sauravdnj}\\\\\n\\href{https://github.com/SauravDnj}{github.com/SauravDnj} \\hfill saurav@example.com\n\n\\section*{Selected projects}\n\\textbf{Production RAG over docs} — \\href{https://github.com/SauravDnj/rag-prod}{repo}\\\\\n\\begin{itemize}\n  \\item Hybrid (BM25+dense) retrieval; reranker; agentic fallback. p99 1.2s.\n  \\item 5\\% answer-correctness lift over vanilla RAG on internal eval.\n\\end{itemize}\n\\end{document}" },
          accent: "violet",
          aiPrompt: "Dark code card, violet, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d87-p4", day: 87, postNumber: 4, slot: "evening", type: "tip", pillar: "career",
        title: "Tailor resume per job — change ONE thing",
        copy: "Don't rewrite your resume for every job. Recruiters can spot the over-tailored copy.\n\nDo: rotate the order of your projects so the most-relevant one is first. Tweak the top bullet of each role to use the JD's verbs.\n\nThat 5-minute edit beats both 'send the same one' and 'rewrite everything'. Cover letters don't move the needle for ML roles. Time spent on a good portfolio repo will.",
        hashtags: [...CORE, "#JobSearch"],
        image: { template: "tip", headline: "Tailor lightly — rotate projects",
          bullets: ["Reorder to match JD", "Tweak top bullet's verbs", "Skip cover letters", "Polish portfolio instead"],
          accent: "violet",
          aiPrompt: "Pro tip card, violet, 1:1", canvaBrief: "Violet header. PRO TIP."
        }
      },
      { id: "d87-p5", day: 87, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Day 87 — recruiter-ready",
        copy: "Day 87 done.\n\n- Resume = highlight reel + numbers\n- LinkedIn keywords matter\n- LaTeX for clean PDFs\n- Tailor lightly per JD\n\nTomorrow (Day 88): the ML interview prep loop that actually works.",
        hashtags: [...CORE, "#Resume"],
        image: { template: "quote", headline: "Add a number to every bullet.", subhead: "Single biggest resume upgrade.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1", canvaBrief: "Pastel violet quote card." }
      },
    ]
  },
  /* DAY 88 */
  {
    day: 88, theme: "ML interview prep — the focused 30-day plan", pillar: "career",
    posts: [
      { id: "d88-p1", day: 88, postNumber: 1, slot: "morning", type: "concept", pillar: "career",
        title: "ML interview = 4 rounds (usually)",
        copy: "Most ML interviews have:\n\n1. Coding (DSA) — 1-2 rounds. Leetcode-style.\n2. ML breadth — 1 round. Concepts, trade-offs, math at the level you'd ace whiteboard.\n3. ML depth / system design — 1 round. Design a recommender, RAG, classifier pipeline.\n4. Behavioural — 1 round. STAR-format stories.\n\nMix varies by company:\n- Big tech: heavy DSA + ML system design\n- Startups: more code + ship-it-on-a-laptop demo\n- Research-leaning: depth + a 30-min paper grilling\n\nKnow the format before you prep.",
        hashtags: [...CORE, "#MLInterview"],
        image: { template: "list", headline: "4 rounds of an ML interview",
          bullets: ["Coding (DSA)", "ML breadth", "ML depth / system design", "Behavioural"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d88-p2", day: 88, postNumber: 2, slot: "midday", type: "deepdive", pillar: "career",
        title: "30-day prep — 1 hour a day",
        copy: "Days 1-7: DSA. The 8 patterns from week 4. 2 problems/day.\n\nDays 8-14: ML breadth. Hands-On ML chapters; for each, write a 1-page summary + an honest 'I don't get this part' note.\n\nDays 15-21: ML system design. 'How would you build X?' — pick from real prompts (RAG, ranking, fraud, ETA). Write your design before reading examples.\n\nDays 22-28: Mock interviews. interviewing.io, friends, Discord. Real-time pressure changes what you 'know'.\n\nDays 29-30: STAR stories — 5 prepared. About impact, conflict, failure, ambiguity, leadership.",
        hashtags: [...CORE, "#MLInterview"],
        image: { template: "list", headline: "30-day prep plan",
          bullets: ["Days 1-7 — DSA", "Days 8-14 — ML breadth", "Days 15-21 — system design", "Days 22-28 — mocks", "Days 29-30 — STAR stories"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d88-p3", day: 88, postNumber: 3, slot: "afternoon", type: "code", pillar: "career",
        title: "ML system design — the canvas I draw every time",
        copy: "Same skeleton, every system design question. Adapt boxes to the problem.\n\nUser → API → Feature pipeline → Model → Output cache → Logging\n                              ↓\n                    Offline training pipeline → Eval → Model registry → Deploy\n\nDraw it on the whiteboard. Walk through each box. Talk trade-offs at each step. The interviewer is grading your structure, not your perfect answer.",
        hashtags: [...CORE, "#SystemDesign"],
        image: { template: "code", headline: "ML system design canvas",
          code: { language: "text", snippet: "[user] -> [API] -> [feature pipeline]\n                       |\n                       v\n              [feature store] <- [training pipeline]\n                       |                  |\n                       v                  v\n                   [model] <-- [registry] <- [eval]\n                       |\n                       v\n              [output cache] -> [logging] -> [monitoring]" },
          accent: "violet",
          aiPrompt: "Dark code card with diagram, violet, 1:1", canvaBrief: "Dark gradient code window with ASCII diagram."
        }
      },
      { id: "d88-p4", day: 88, postNumber: 4, slot: "evening", type: "tip", pillar: "career",
        title: "Talk MORE than you think you should",
        copy: "ML interviewers grade thinking, not just answers.\n\nMy rule: 80% of solving a problem out loud, 20% silent.\n\n- Restate the problem before solving\n- Talk through brute force; state Big-O\n- Pick the pattern out loud\n- Code, narrating each line\n- Test, narrating edge cases\n\nSilent solving costs you. Even if you reach the right answer, the interviewer didn't see how. Show the process.",
        hashtags: [...CORE, "#MLInterview"],
        image: { template: "tip", headline: "Narrate 80% of the time",
          bullets: ["Restate problem aloud", "Brute force + Big-O", "Pick the pattern", "Code while narrating", "Test edge cases aloud"],
          accent: "violet",
          aiPrompt: "Pro tip card, violet, 1:1", canvaBrief: "Violet header. PRO TIP."
        }
      },
      { id: "d88-p5", day: 88, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Day 88 — interview ready",
        copy: "Day 88 done.\n\n- 4 rounds, know the mix\n- 30-day plan, 1hr/day\n- ML system design canvas\n- Talk 80% of the time\n\nTomorrow (Day 89): the learning loop that keeps you sharp after the interview.",
        hashtags: [...CORE, "#MLInterview"],
        image: { template: "quote", headline: "Talk through the problem.", subhead: "Silent solving doesn't pass.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1", canvaBrief: "Pastel violet quote card." }
      },
    ]
  },
  /* DAY 89 */
  {
    day: 89, theme: "The learning loop — staying sharp", pillar: "career",
    posts: [
      { id: "d89-p1", day: 89, postNumber: 1, slot: "morning", type: "concept", pillar: "career",
        title: "Three habits separate growing engineers from stuck ones",
        copy: "After this 90-day sprint, the habit that matters most isn't 'read a paper a week'. It's:\n\n1. Build something monthly — even tiny. Code is how you internalise.\n2. Write monthly — blog post, README, internal doc. Forces you to compress what you learned.\n3. Teach quarterly — talk, workshop, mentor a junior. Teaching exposes every fuzzy concept.\n\nThree to five hours a month, sustained. Beats 50 hours of passive reading every time.",
        hashtags: [...CORE, "#LearningInPublic"],
        image: { template: "list", headline: "3 sustaining habits",
          bullets: ["Build monthly", "Write monthly", "Teach quarterly", "5h / month, sustained"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d89-p2", day: 89, postNumber: 2, slot: "midday", type: "deepdive", pillar: "career",
        title: "How to read AI papers without burning out",
        copy: "Don't read every paper. Read the right one, deeply.\n\nMy filter:\n1. arxiv-sanity / paperswithcode top-of-week\n2. Threads from people I trust on the topic (Twitter / LinkedIn)\n3. The original paper for the model I'm using right now\n\nWhen reading: 3 passes.\n- Pass 1 — abstract, intro, figures, conclusion. Decide if relevant.\n- Pass 2 — methods, results. Skim math.\n- Pass 3 — math, code, ablations. Only on the 1 paper a month you want to deeply understand.\n\nMost papers stop at pass 1. That's fine.",
        hashtags: [...CORE, "#AIResearch"],
        image: { template: "list", headline: "3-pass paper reading",
          bullets: ["Pass 1 — abstract / fig / conclusion", "Pass 2 — methods / results", "Pass 3 — math / code / ablations", "Most papers stop at 1"],
          accent: "violet",
          aiPrompt: "List card, violet, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d89-p3", day: 89, postNumber: 3, slot: "afternoon", type: "code", pillar: "career",
        title: "A 'learning log' template I keep in a file",
        copy: "Every week, log: what I learned, what I built, what I tried and failed at.\n\n5 minutes/week. After a year, you have 50 entries. Reviewing them in December tells you exactly what you learned that year.\n\nBeats 'I read a paper a day' as a forcing function — that turns into doomscrolling. The log measures actual outputs.",
        hashtags: [...CORE, "#LearningInPublic"],
        image: { template: "code", headline: "Weekly learning log",
          code: { language: "markdown", snippet: "## Week of 2026-05-04\n\n### Built\n- Tiny RAG over my notes; 80 lines.\n- Tested 3 embedding models on 30-pair eval; bge-small wins for me.\n\n### Learned\n- HyDE: generate hypothetical answer, embed THAT.\n- Adam vs AdamW — never use Adam + weight_decay together.\n\n### Tried, failed\n- Self-hosted vLLM on Llama-3-8B; OOM on 16GB. Dropped to 1B.\n\n### Read\n- Lilian Weng on agent memory (skim).\n- LangGraph docs (deep). Will use." },
          accent: "violet",
          aiPrompt: "Dark markdown card, violet, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d89-p4", day: 89, postNumber: 4, slot: "evening", type: "tip", pillar: "career",
        title: "One newsletter, one podcast, one Twitter list",
        copy: "Information overload isn't a learning hack. It's a procrastination habit.\n\nMy diet:\n- Newsletter: The Batch (Andrew Ng's) OR Import AI (Jack Clark)\n- Podcast: Latent Space, Cognitive Revolution, or DwarkeshPatel\n- Twitter list: 30 ML engineers / researchers I respect — checked once a day\n\nSubtract more than you add. The signal-to-noise on AI Twitter is awful — a curated list helps. If a source isn't earning its slot, drop it.",
        hashtags: [...CORE, "#LearningInPublic"],
        image: { template: "tip", headline: "Curate inputs ruthlessly",
          bullets: ["1 newsletter", "1 podcast", "1 curated Twitter list", "Subtract often"],
          accent: "violet",
          aiPrompt: "Pro tip card, violet, 1:1", canvaBrief: "Violet header. PRO TIP."
        }
      },
      { id: "d89-p5", day: 89, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Day 89 — the loop that lasts",
        copy: "Day 89 done.\n\n- Build / write / teach\n- 3-pass paper reading\n- Weekly learning log\n- Ruthlessly curated inputs\n\nTomorrow (Day 90): the wrap. Thank you, what's next, where to find me.",
        hashtags: [...CORE, "#LearningInPublic"],
        image: { template: "quote", headline: "Build. Write. Teach.", subhead: "The compounding loop.", accent: "violet",
          aiPrompt: "Pastel violet quote, 1:1", canvaBrief: "Pastel violet quote card." }
      },
    ]
  },
  /* DAY 90 — FINAL */
  {
    day: 90, theme: "Day 90 — the wrap-up", pillar: "career",
    posts: [
      { id: "d90-p1", day: 90, postNumber: 1, slot: "morning", type: "recap", pillar: "career",
        title: "90 days. 450 posts. What I actually learned.",
        copy: "Day 90.\n\nWhat I'm taking with me:\n\n- Public learning makes you a sharper engineer. The version of me that explains is more rigorous than the one that consumes.\n- Tiny end-to-end projects > theory chapters. 100 lines that run beat 100 pages that don't.\n- The default tools matter more than people admit — uv, ruff, AdamW, LightGBM, LangGraph, Qdrant. Pick well once.\n- Most production AI is 60% data + 30% engineering + 10% model.\n- The community shows up if you do. Thank you.\n\nIf this series helped you, the best thank-you is start your own.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "stat", headline: "Day 90 / 90", subhead: "450 posts. 90 days. Done.", stat: { number: "450", label: "posts shipped over 90 days" }, accent: "violet",
          aiPrompt: "Stat poster celebratory, violet-cyan, 1:1", canvaBrief: "Violet→cyan gradient. Big 450. Confetti glyphs."
        }
      },
      { id: "d90-p2", day: 90, postNumber: 2, slot: "midday", type: "deepdive", pillar: "career",
        title: "The 90-day index — every topic, in one post",
        copy: "Weeks 1-2 — Python: setup, types, OOP, decorators, generators, context, types, errors\n\nWeeks 3-4 — DSA: Big-O, arrays, strings, lists, hash, stacks, recursion, search, sort, trees, graphs, DP\n\nWeek 5 — Data: NumPy, broadcasting, pandas, EDA, cleaning\n\nWeek 6 — ML: framing, regression, classification, trees, boosting, clustering, SVM\n\nWeek 7 — DL: neurons, backprop, PyTorch, CNNs, RNNs, regularisation, training tricks\n\nWeek 8 — NLP: tokens, embeddings, attention, transformers, BERT, GPT, fine-tuning\n\nWeeks 9-10 — RAG: chunking, vectors, retrieval, rerankers, query rewriting, multi-hop, agentic, GraphRAG\n\nWeek 11 — Agents: ReAct, tools, planning, multi-agent, frameworks, memory\n\nWeek 12 — Automation: scraping, browsers, schedulers, notifications, files, APIs, serverless\n\nWeek 13 — Career: portfolio, OSS, resume, interviews, learning loop\n\nFull index pinned on my GitHub.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "list", headline: "13 weeks · 90 days · 7 pillars",
          bullets: ["Python (W1-2)", "DSA (W3-4)", "Data (W5)", "ML (W6)", "DL (W7)", "NLP (W8)", "RAG (W9-10)", "Agents (W11)", "Automation (W12)", "Career (W13)"],
          accent: "violet",
          aiPrompt: "10-row index card, violet, 1:1", canvaBrief: "White grid. 10 rows."
        }
      },
      { id: "d90-p3", day: 90, postNumber: 3, slot: "afternoon", type: "code", pillar: "career",
        title: "What I'm building next — a public repo of every snippet",
        copy: "All 450 posts' code snippets are going into one open repo. Searchable. Each post links to its commit. You can clone the whole thing and run any snippet.\n\nHand-on-keyboard learning beats reading. If you've followed for 90 days, the repo is where you turn 'I know this' into 'I can do this'.",
        hashtags: [...CORE, "#OpenSource"],
        image: { template: "code", headline: "github.com/SauravDnj/90-days-ai",
          code: { language: "bash", snippet: "git clone https://github.com/SauravDnj/90-days-ai\ncd 90-days-ai\nuv venv\nuv pip install -r requirements.txt\n\n# every snippet is a runnable file\nls week-09/d57-rag-naive\npython week-09/d57-rag-naive/main.py" },
          accent: "violet",
          aiPrompt: "Dark code card with celebratory style, violet, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d90-p4", day: 90, postNumber: 4, slot: "evening", type: "tip", pillar: "career",
        title: "The next 90 — what I want from YOU",
        copy: "If this series gave you something, three asks:\n\n1. Pick ONE concept and ship a 30-line repo. Tag me.\n2. Share the post that helped you with one friend who could use it.\n3. Tell me what to cover next — DM open.\n\nThe series scales beyond me only because of you. The next 90 days, I'm picking topics from what you ask. Let's go.",
        hashtags: [...CORE, "#BuildInPublic"],
        image: { template: "cta", headline: "Pick one. Ship a repo. Tag me.",
          subhead: "linkedin.com/in/sauravdnj · github.com/SauravDnj",
          bullets: ["Build something tiny", "Share with one friend", "Tell me what's next", "DMs open"],
          accent: "violet",
          aiPrompt: "Bold CTA poster, violet-cyan gradient with confetti, 1:1", canvaBrief: "Violet gradient with shimmer. Big headline. White inclusions card. CTA button: 'Follow @sauravdnj'."
        }
      },
      { id: "d90-p5", day: 90, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Day 90 — thank you. Genuinely.",
        copy: "Last post.\n\nTo everyone who reposted, commented, saved, DMed, or just quietly read — thank you. This sprint was an experiment in public. You made it work.\n\nI'll keep posting. Less daily, more deeply. The 90-day archive stays online. The repo goes public this weekend.\n\nIf you started your own learning sprint because of this — please tell me. That's the win.\n\nSaurav.\nlinkedin.com/in/sauravdnj · github.com/SauravDnj · @saurav_dnj_24",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "quote", headline: "90 down.", subhead: "The next 90 starts when you do.", accent: "violet",
          aiPrompt: "Pastel violet quote with 90/90 progress, confetti glyphs, premium, 1:1", canvaBrief: "Pastel violet→cyan gradient. Big '90 down.' headline. Italic subhead. 90/90 progress bar full. Brand pill, footer with all three handles."
        }
      },
    ]
  },
];
