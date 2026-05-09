import type { DayPlan } from "../types";

const CORE = ["#Automation", "#Python", "#WebScraping", "#AI", "#100DaysOfCode"];

export const week12: DayPlan[] = [
  /* DAY 78 */
  {
    day: 78, theme: "Web scraping with requests + BeautifulSoup", pillar: "automation",
    posts: [
      { id: "d78-p1", day: 78, postNumber: 1, slot: "morning", type: "concept", pillar: "automation",
        title: "Most scraping is HTTP + parse, not browsers",
        copy: "If a page renders content server-side, you don't need Selenium. You need:\n\n- requests / httpx — fetch HTML\n- BeautifulSoup / lxml — parse it\n- pandas / json — store it\n\nThis is 80% of all scraping you'll ever do. Faster, cheaper, more reliable than launching a browser. Reach for browsers (tomorrow's topic) only when JS is required for content to appear.",
        hashtags: [...CORE, "#WebScraping"],
        image: { template: "list", headline: "Most scraping = HTTP + parse",
          bullets: ["requests / httpx", "BeautifulSoup / lxml", "pandas / json", "Reach for browsers only when JS-required"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d78-p2", day: 78, postNumber: 2, slot: "midday", type: "deepdive", pillar: "automation",
        title: "Scrape ethically — robots, rate, identify",
        copy: "Three rules I follow on every scraper:\n\n1. Respect robots.txt — read it; honour Disallow.\n2. Rate limit — sleep 0.5-2s between requests; back off on errors.\n3. Identify yourself — User-Agent: 'YourBot/1.0 (contact: you@x.com)'. Sites can block, but they can also reach you.\n\nFor public data this keeps you on the right side of TOS. For paid APIs / private data, get permission first. The 'I scraped LinkedIn' story rarely ends well.",
        hashtags: [...CORE, "#Ethics"],
        image: { template: "list", headline: "Scrape ethically",
          bullets: ["Read robots.txt", "Rate limit + back off", "Identify in User-Agent", "Get permission for private data"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d78-p3", day: 78, postNumber: 3, slot: "afternoon", type: "code", pillar: "automation",
        title: "A polite scraper template",
        copy: "Reusable. Sets a User-Agent, retries with backoff, parses with BS4, returns dicts. Drop in URLs and a parse_fn. Most one-off scrapes are 50 lines on top of this.",
        hashtags: [...CORE, "#Python"],
        image: { template: "code", headline: "Polite scraper template",
          code: { language: "python", snippet: "import time, random, requests\nfrom bs4 import BeautifulSoup\nfrom requests.adapters import HTTPAdapter, Retry\n\nUA = 'SauravBot/1.0 (saurav@example.com)'\n\ndef session():\n    s = requests.Session()\n    r = Retry(total=4, backoff_factor=1.0, status_forcelist=[429,500,502,503,504])\n    s.mount('https://', HTTPAdapter(max_retries=r))\n    s.headers['User-Agent'] = UA\n    return s\n\ndef fetch(s, url):\n    time.sleep(random.uniform(0.5, 1.5))\n    r = s.get(url, timeout=15)\n    r.raise_for_status()\n    return BeautifulSoup(r.text, 'lxml')" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d78-p4", day: 78, postNumber: 4, slot: "evening", type: "tip", pillar: "automation",
        title: "Cache responses while developing",
        copy: "Don't re-hit a server every time you fix a parser bug. Cache responses locally:\n\n- requests-cache library — drop-in cache for requests\n- Or write to disk by hash(url)\n\nFaster iteration. Kinder to the site. Survives flaky networks. Once the parser is right, run live.\n\nSet TTL based on how stale data is acceptable — minutes for prices, hours for product info, days for static content.",
        hashtags: [...CORE, "#PythonTips"],
        image: { template: "tip", headline: "Cache while developing",
          bullets: ["requests-cache library", "Or hash(url) to disk", "Faster iteration", "Kinder to the site"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d78-p5", day: 78, postNumber: 5, slot: "night", type: "recap", pillar: "automation",
        title: "Day 78 — scraping, done politely",
        copy: "Day 78 done.\n\n- HTTP + parse covers most cases\n- Rate limit, robots, UA\n- Polite scraper template\n- Cache while developing\n\nTomorrow (Day 79): Playwright. When JS rendering is required.",
        hashtags: [...CORE, "#WebScraping"],
        image: { template: "quote", headline: "Most scraping is HTTP. Not browsers.", subhead: "Faster. Cheaper. Politer.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 79 */
  {
    day: 79, theme: "Playwright — when JS rendering is required", pillar: "automation",
    posts: [
      { id: "d79-p1", day: 79, postNumber: 1, slot: "morning", type: "concept", pillar: "automation",
        title: "Playwright > Selenium in 2026",
        copy: "If a page won't show its content without JS, you need a real browser. Playwright is the modern default:\n\n- Faster than Selenium (modern protocol, less polling)\n- Auto-waits — fewer flaky 'element not found' errors\n- One API across Chromium / Firefox / WebKit\n- Native async support\n\nSelenium still wins on legacy ecosystem and some IE/edge cases. For new projects in 2026 — Playwright.",
        hashtags: [...CORE, "#Playwright"],
        image: { template: "compare", headline: "Playwright vs Selenium",
          compare: { leftLabel: "Selenium", leftItems: ["Older API", "Manual waits", "Flakier", "Bigger ecosystem"], rightLabel: "Playwright", rightItems: ["Modern protocol", "Auto-waits", "Reliable", "Async-first"] },
          accent: "magenta", aiPrompt: "Compare poster, 1:1", canvaBrief: "Split. Grey vs magenta."
        }
      },
      { id: "d79-p2", day: 79, postNumber: 2, slot: "midday", type: "deepdive", pillar: "automation",
        title: "Headless vs headed — debug visually",
        copy: "Default to headed (visible browser) when developing. You see what's happening. Bug fixed in minutes.\n\nSwitch to headless for production / scheduled runs. Faster, less RAM.\n\nPlaywright trick: page.pause() opens DevTools paused at that line. Step through the script interactively. Saves hours of 'why doesn't this selector work' guessing.",
        hashtags: [...CORE, "#Playwright"],
        image: { template: "list", headline: "Headed vs headless — when",
          bullets: ["Headed for development", "Headless for production", "page.pause() to inspect", "Switch by env var"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d79-p3", day: 79, postNumber: 3, slot: "afternoon", type: "code", pillar: "automation",
        title: "Playwright async script",
        copy: "From install to scraping in 20 lines. Use playwright codegen to record actions and emit Python — way faster than reading docs.",
        hashtags: [...CORE, "#Playwright"],
        image: { template: "code", headline: "Playwright async — 20 lines",
          code: { language: "python", snippet: "import asyncio\nfrom playwright.async_api import async_playwright\n\nasync def scrape(url: str) -> str:\n    async with async_playwright() as p:\n        browser = await p.chromium.launch(headless=True)\n        page = await browser.new_page()\n        await page.goto(url)\n        await page.wait_for_selector('h1')\n        title = await page.locator('h1').inner_text()\n        await browser.close()\n        return title\n\nprint(asyncio.run(scrape('https://example.com')))" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d79-p4", day: 79, postNumber: 4, slot: "evening", type: "tip", pillar: "automation",
        title: "Use page.codegen — let Playwright write the script",
        copy: "Don't hand-write selectors. Run:\n\nplaywright codegen https://target.com\n\nA browser opens; click around; Playwright records every action and emits Python. Copy. Paste. Edit minor parts.\n\nFor scraping, this gets you 80% there in minutes. Combine with Playwright's locator selectors (text=, role=) — they're more robust than CSS / XPath.",
        hashtags: [...CORE, "#Playwright"],
        image: { template: "tip", headline: "playwright codegen writes your script",
          bullets: ["Records clicks", "Emits Python", "Use role=/text= selectors", "Edit minor; ship"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d79-p5", day: 79, postNumber: 5, slot: "night", type: "recap", pillar: "automation",
        title: "Day 79 — browsers, when needed",
        copy: "Day 79 done.\n\n- Playwright > Selenium for new code\n- Headed for dev, headless for prod\n- 20-line async script\n- codegen records for you\n\nTomorrow (Day 80): scheduling. cron, APScheduler, Airflow — pick by ops fit.",
        hashtags: [...CORE, "#Playwright"],
        image: { template: "quote", headline: "Use a browser only when JS demands it.", subhead: "Otherwise it's overkill.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 80 */
  {
    day: 80, theme: "Scheduling — cron, APScheduler, Airflow", pillar: "automation",
    posts: [
      { id: "d80-p1", day: 80, postNumber: 1, slot: "morning", type: "concept", pillar: "automation",
        title: "Pick a scheduler by ops complexity",
        copy: "Three picks:\n\n- cron — single server, linear jobs, no UI. Set-and-forget for personal automation.\n- APScheduler — Python-native, runs in your app, persistent jobs. Mid-complexity.\n- Airflow / Prefect / Dagster — DAGs, retries, monitoring, multi-server. Real production data pipelines.\n\nDon't reach for Airflow for a single nightly script. Cron + a Python script is enough until it isn't.",
        hashtags: [...CORE, "#Scheduling"],
        image: { template: "list", headline: "Pick a scheduler",
          bullets: ["cron — small, simple", "APScheduler — Python-native", "Airflow — DAGs + monitoring", "Match to ops budget"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d80-p2", day: 80, postNumber: 2, slot: "midday", type: "deepdive", pillar: "automation",
        title: "Cron syntax in 30 seconds",
        copy: "cron uses 5 fields: minute hour day-of-month month day-of-week.\n\n- 0 9 * * 1-5 — every weekday 9am\n- */15 * * * * — every 15 minutes\n- 0 0 1 * * — first of every month, midnight\n- @daily — shorthand for 0 0 * * *\n\nAlways set a logfile and a fail alert. A silent cron job that's been failing for a year is nobody's friend. Use crontab.guru if syntax confuses you.",
        hashtags: [...CORE, "#cron"],
        image: { template: "list", headline: "cron — 4 examples",
          bullets: ["0 9 * * 1-5 — weekdays 9am", "*/15 * * * * — every 15 min", "0 0 1 * * — monthly", "@daily — daily midnight"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d80-p3", day: 80, postNumber: 3, slot: "afternoon", type: "code", pillar: "automation",
        title: "APScheduler in 12 lines",
        copy: "Runs inside your Python app. Persists jobs to a DB / file. Survives restarts. Great for FastAPI / Flask apps that need scheduled tasks without an external scheduler.",
        hashtags: [...CORE, "#APScheduler"],
        image: { template: "code", headline: "APScheduler — minimum viable",
          code: { language: "python", snippet: "from apscheduler.schedulers.blocking import BlockingScheduler\nfrom apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore\n\nsched = BlockingScheduler(jobstores={\n    'default': SQLAlchemyJobStore(url='sqlite:///jobs.db')\n})\n\n@sched.scheduled_job('cron', hour=9, minute=0, day_of_week='mon-fri')\ndef morning_brief():\n    print('running morning brief...')\n\nsched.start()" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d80-p4", day: 80, postNumber: 4, slot: "evening", type: "tip", pillar: "automation",
        title: "Always send a heartbeat alert when a job DOESN'T run",
        copy: "Most monitoring catches failures. The harder bug: the job stopped running entirely (machine off, cron disabled, container died).\n\nFix: dead-man's switch. Job pings a service every run. If service doesn't see a ping in N minutes, it alerts you.\n\nFree services: healthchecks.io, dead-mans-snitch. Or a tiny endpoint of your own. One-line addition; saves you from silent stale data.",
        hashtags: [...CORE, "#Monitoring"],
        image: { template: "tip", headline: "Dead-man's switch",
          bullets: ["Ping on every run", "Alert if no ping in N min", "healthchecks.io / DMS", "Catches stopped jobs"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d80-p5", day: 80, postNumber: 5, slot: "night", type: "recap", pillar: "automation",
        title: "Day 80 — scheduled, monitored, alive",
        copy: "Day 80 done.\n\n- cron / APScheduler / Airflow by ops fit\n- cron syntax in 30s\n- 12-line APScheduler\n- Dead-man's switch saves silent failures\n\nTomorrow (Day 81): Slack / email automation. The notifications that close the loop.",
        hashtags: [...CORE, "#Scheduling"],
        image: { template: "quote", headline: "A silent cron is a dead cron.", subhead: "Always heartbeat.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 81 */
  {
    day: 81, theme: "Slack & email — close the loop", pillar: "automation",
    posts: [
      { id: "d81-p1", day: 81, postNumber: 1, slot: "morning", type: "concept", pillar: "automation",
        title: "Automation without notification is invisible",
        copy: "An automation that silently does work has no audience. Adding a Slack post or email turns it into a daily ritual.\n\nGood notifications:\n- One message per run\n- Includes a one-sentence summary\n- Has a link to the full output\n- Calls out exceptions / errors\n- Doesn't spam\n\nMake notifications first-class. They're how the human in the loop stays in the loop.",
        hashtags: [...CORE, "#Automation"],
        image: { template: "list", headline: "Good notifications",
          bullets: ["One message per run", "1-sentence summary", "Link to full output", "Errors highlighted"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d81-p2", day: 81, postNumber: 2, slot: "midday", type: "deepdive", pillar: "automation",
        title: "Slack incoming webhooks — 5-minute setup",
        copy: "Easiest: incoming webhook URL.\n\n1. Slack → Apps → Incoming Webhooks → Add to a channel\n2. Copy the URL (treat as secret; put in env var)\n3. POST JSON to it from your script\n\nFor richer messages, use Block Kit (markdown-ish blocks) — formatted summaries, action buttons, dividers. For interactive bots (responding to commands), step up to Bolt SDK or Slack's events API.\n\n90% of automations need just the webhook.",
        hashtags: [...CORE, "#Slack"],
        image: { template: "list", headline: "Slack — 4 levels",
          bullets: ["Incoming webhook (90%)", "Block Kit for formatting", "Bolt SDK for bots", "Events API for full apps"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d81-p3", day: 81, postNumber: 3, slot: "afternoon", type: "code", pillar: "automation",
        title: "Slack notifier in 10 lines",
        copy: "POST JSON to the webhook. Block Kit for nice formatting. One reusable function for every script.",
        hashtags: [...CORE, "#Slack"],
        image: { template: "code", headline: "Slack notifier",
          code: { language: "python", snippet: "import os, requests\n\ndef slack(text: str, *, error: bool = False):\n    url = os.environ['SLACK_WEBHOOK']\n    color = '#dc2626' if error else '#22c55e'\n    payload = {\n        'attachments': [{\n            'color': color,\n            'blocks': [{'type': 'section', 'text': {'type': 'mrkdwn', 'text': text}}],\n        }]\n    }\n    requests.post(url, json=payload, timeout=5).raise_for_status()\n\nslack('*Daily brief* succeeded. 12 articles ingested.')" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d81-p4", day: 81, postNumber: 4, slot: "evening", type: "tip", pillar: "automation",
        title: "Use Postmark or Resend for transactional email",
        copy: "smtplib works for simple emails. For anything user-visible (alerts, reports, password resets) use Postmark or Resend:\n\n- Better deliverability (won't end up in spam)\n- Templates with HTML + plaintext\n- Open / bounce tracking\n- Reasonable free tiers\n\nDon't use Gmail SMTP for production email — it's rate-limited and Gmail will throttle you. Free tier of Postmark / Resend covers most personal automations.",
        hashtags: [...CORE, "#Email"],
        image: { template: "tip", headline: "Use Postmark / Resend for email",
          bullets: ["Better deliverability", "Templates + tracking", "Free tiers reasonable", "Skip Gmail SMTP for prod"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d81-p5", day: 81, postNumber: 5, slot: "night", type: "recap", pillar: "automation",
        title: "Day 81 — close the loop",
        copy: "Day 81 done.\n\n- Notifications close the automation loop\n- Slack webhooks for 90% of cases\n- 10-line notifier\n- Postmark / Resend for email\n\nTomorrow (Day 82): PDF and Excel automation. The unsexy stuff that pays bills.",
        hashtags: [...CORE, "#Automation"],
        image: { template: "quote", headline: "Notify or it didn't happen.", subhead: "Make your bots visible.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 82 */
  {
    day: 82, theme: "PDF & Excel — the boring automations that pay", pillar: "automation",
    posts: [
      { id: "d82-p1", day: 82, postNumber: 1, slot: "morning", type: "concept", pillar: "automation",
        title: "PDFs aren't text. Pick the right tool.",
        copy: "Three PDF flavours, three tools:\n\n1. Text-based PDFs — pdfplumber. Extracts text + tables.\n2. Scanned PDFs (images of text) — Tesseract OCR (or paid: AWS Textract, Azure Document Intelligence).\n3. Form-based PDFs — pdfminer.six or pypdfform.\n\nWrong tool = garbage extraction. Always look at the PDF first. Can you select the text in a viewer? It's text-based. Otherwise it's an image.",
        hashtags: [...CORE, "#PDF"],
        image: { template: "list", headline: "PDF tool selection",
          bullets: ["Text PDFs → pdfplumber", "Scans → Tesseract / Textract", "Forms → pdfminer.six", "Test by selecting text first"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d82-p2", day: 82, postNumber: 2, slot: "midday", type: "deepdive", pillar: "automation",
        title: "Excel: openpyxl for read/write, polars for crunch",
        copy: "openpyxl is the standard for reading and writing .xlsx. It preserves formatting, formulas, multi-sheet workbooks.\n\nFor pure number-crunching at scale, read with pandas/polars (pl.read_excel), process, write back. Don't loop over openpyxl cells — it's slow.\n\nFor templates (write data into a fixed layout), openpyxl wins — you can update specific cells without disturbing others.",
        hashtags: [...CORE, "#Excel"],
        image: { template: "compare", headline: "openpyxl vs polars (Excel)",
          compare: { leftLabel: "openpyxl", leftItems: ["Read / write .xlsx", "Preserves formatting", "Cell-level edits", "Slower for big data"], rightLabel: "polars / pandas", rightItems: ["Fast bulk ops", "DataFrame API", "Lossy on formatting", "Best for analysis"] },
          accent: "magenta", aiPrompt: "Compare poster, 1:1", canvaBrief: "Split. Grey vs magenta."
        }
      },
      { id: "d82-p3", day: 82, postNumber: 3, slot: "afternoon", type: "code", pillar: "automation",
        title: "Extract a table from a PDF in 8 lines",
        copy: "pdfplumber's extract_tables returns lists of rows. Drop straight into pandas. The code is 8 lines for a typical financial-report PDF.",
        hashtags: [...CORE, "#PDF"],
        image: { template: "code", headline: "PDF table → DataFrame",
          code: { language: "python", snippet: "import pdfplumber, pandas as pd\n\ndef pdf_tables(path: str) -> list[pd.DataFrame]:\n    out: list[pd.DataFrame] = []\n    with pdfplumber.open(path) as pdf:\n        for page in pdf.pages:\n            for table in page.extract_tables():\n                df = pd.DataFrame(table[1:], columns=table[0])\n                out.append(df)\n    return out\n\ntables = pdf_tables('report.pdf')\nprint(tables[0].head())" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d82-p4", day: 82, postNumber: 4, slot: "evening", type: "tip", pillar: "automation",
        title: "For invoice / receipt OCR, use a service",
        copy: "Hand-rolled Tesseract OCR is fine for English text. For invoices, receipts, IDs — accuracy drops fast.\n\nUse a service:\n- AWS Textract — strong for forms + tables\n- Azure Document Intelligence — best for invoices\n- Google Document AI — broad doc types\n- Veryfi / Klippa — invoice-specific\n\nAll have free tiers. The accuracy delta vs hand-rolled is significant; the time saved on QA is huge.",
        hashtags: [...CORE, "#OCR"],
        image: { template: "tip", headline: "Use a doc service for invoices",
          bullets: ["AWS Textract", "Azure Document Intelligence", "Google Document AI", "Veryfi for invoices"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d82-p5", day: 82, postNumber: 5, slot: "night", type: "recap", pillar: "automation",
        title: "Day 82 — file automations",
        copy: "Day 82 done.\n\n- Match PDF tool to PDF type\n- openpyxl vs polars for Excel\n- 8-line PDF table extraction\n- Use a service for invoice OCR\n\nTomorrow (Day 83): API integrations and the retry/backoff patterns that make scripts reliable.",
        hashtags: [...CORE, "#Automation"],
        image: { template: "quote", headline: "PDFs lie. Pick the right tool.", subhead: "Test by selecting text first.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 83 */
  {
    day: 83, theme: "API integrations — retries, timeouts, idempotency", pillar: "automation",
    posts: [
      { id: "d83-p1", day: 83, postNumber: 1, slot: "morning", type: "concept", pillar: "automation",
        title: "httpx > requests for new code",
        copy: "requests is fine. httpx is better for new code in 2026:\n\n- Sync AND async with the same API\n- HTTP/2 by default\n- Connection pooling clearer\n- Built-in timeouts (5s default — never hang forever)\n\nDrop-in replacement: import httpx as requests works for many scripts. For async jobs (parallel API calls), httpx.AsyncClient is the cleanest path.",
        hashtags: [...CORE, "#httpx"],
        image: { template: "list", headline: "httpx > requests for new code",
          bullets: ["Sync + async same API", "HTTP/2 by default", "Sane timeouts", "Drop-in for many cases"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d83-p2", day: 83, postNumber: 2, slot: "midday", type: "deepdive", pillar: "automation",
        title: "Retries that don't make things worse",
        copy: "Naïve retry on every error makes a flaky API into a stampede.\n\nRules:\n- Retry only on 5xx, 429, network errors\n- Exponential backoff with jitter (1s, 2s, 4s + random)\n- Cap at 3-5 retries\n- Idempotent calls only (GET, idempotency-key on POST)\n- Respect Retry-After header on 429\n\ntenacity library or stamina library handle this cleanly. Don't roll your own loop unless you enjoy debugging.",
        hashtags: [...CORE, "#Retries"],
        image: { template: "list", headline: "Retries — 5 rules",
          bullets: ["Only on 5xx / 429 / net err", "Exponential backoff + jitter", "Cap retries at 3-5", "Idempotent calls only", "Respect Retry-After"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 5 rows."
        }
      },
      { id: "d83-p3", day: 83, postNumber: 3, slot: "afternoon", type: "code", pillar: "automation",
        title: "Production-grade API client",
        copy: "httpx + tenacity. Timeouts. Selective retries. Reusable.\n\nDrop into any project. Set BASE_URL and TOKEN; you have a robust client in 20 lines.",
        hashtags: [...CORE, "#httpx"],
        image: { template: "code", headline: "Robust API client",
          code: { language: "python", snippet: "import httpx\nfrom tenacity import retry, wait_exponential_jitter, stop_after_attempt, retry_if_exception_type\n\nclient = httpx.Client(timeout=10.0, headers={'Authorization': f'Bearer {TOKEN}'})\n\nclass Retryable(Exception): pass\n\ndef _check(r: httpx.Response):\n    if r.status_code >= 500 or r.status_code == 429:\n        raise Retryable(r.status_code)\n    r.raise_for_status()\n    return r\n\n@retry(wait=wait_exponential_jitter(1, 16), stop=stop_after_attempt(4),\n       retry=retry_if_exception_type((httpx.RequestError, Retryable)))\ndef get(path: str, **params):\n    return _check(client.get(path, params=params)).json()" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d83-p4", day: 83, postNumber: 4, slot: "evening", type: "tip", pillar: "automation",
        title: "Idempotency keys for any state-changing call",
        copy: "Network retry on a POST without an idempotency key = 'created the order twice'.\n\nPattern: client generates a uuid; sends it as Idempotency-Key header (or in body); server treats requests with same key as duplicate of the first.\n\nStripe, GitHub, AWS APIs all support this. For your own APIs, add it. Saves the 'why are there two of these' postmortem.",
        hashtags: [...CORE, "#APIDesign"],
        image: { template: "tip", headline: "Idempotency-Key on every POST",
          bullets: ["Client generates uuid", "Send as header", "Server dedupes", "Or you'll regret"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d83-p5", day: 83, postNumber: 5, slot: "night", type: "recap", pillar: "automation",
        title: "Day 83 — APIs that don't lie",
        copy: "Day 83 done.\n\n- httpx > requests for new code\n- Retries with backoff + jitter\n- 20-line robust client\n- Idempotency keys\n\nTomorrow (Day 84): cloud automation — Lambda, scheduled functions, the serverless cron. Then we wrap week 12.",
        hashtags: [...CORE, "#httpx"],
        image: { template: "quote", headline: "Timeout. Retry. Idempotent.", subhead: "Three words for sane API code.", accent: "magenta", aiPrompt: "Pastel magenta quote, 1:1", canvaBrief: "Pastel magenta quote card." }
      },
    ]
  },
  /* DAY 84 */
  {
    day: 84, theme: "Serverless automation + week 12 wrap", pillar: "automation",
    posts: [
      { id: "d84-p1", day: 84, postNumber: 1, slot: "morning", type: "concept", pillar: "automation",
        title: "Lambda + EventBridge = a serverless cron",
        copy: "For automation that should run without a server you maintain:\n\n- AWS Lambda — runs your Python on demand\n- EventBridge schedule — triggers Lambda on cron expressions\n\nNo VM. No cron. Pay per execution (free tier covers most personal use). Cold starts (~500ms) are fine for scheduled jobs.\n\nGCP Cloud Functions + Cloud Scheduler is the same idea. Cloudflare Workers Cron is the lowest-overhead option for HTTP-shaped tasks.",
        hashtags: [...CORE, "#Lambda"],
        image: { template: "list", headline: "Serverless cron — 3 stacks",
          bullets: ["AWS Lambda + EventBridge", "GCP Functions + Scheduler", "Cloudflare Workers Cron", "All have free tiers"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d84-p2", day: 84, postNumber: 2, slot: "midday", type: "deepdive", pillar: "automation",
        title: "Deploy with SAM, AWS CDK, or Serverless Framework",
        copy: "Don't click in the AWS console — version control everything.\n\n- SAM (AWS Serverless Application Model) — YAML, simple, tight to AWS\n- AWS CDK — Python / TS, programmatic infra, more flexible\n- Serverless Framework — multi-cloud, mature, plugin ecosystem\n\nFor personal automations, SAM is fastest (one yaml + one python file). For team / production, CDK gives more leverage.",
        hashtags: [...CORE, "#IaC"],
        image: { template: "list", headline: "Deployment tools",
          bullets: ["SAM — fastest for AWS", "CDK — programmatic infra", "Serverless Framework — multi-cloud", "Never click the console"],
          accent: "magenta", aiPrompt: "List card, magenta, 1:1", canvaBrief: "White grid, 4 rows."
        }
      },
      { id: "d84-p3", day: 84, postNumber: 3, slot: "afternoon", type: "code", pillar: "automation",
        title: "Lambda handler — minimum viable",
        copy: "lambda_handler(event, context) is the entrypoint. Wrap your existing function. Read secrets from env vars (set in console / SAM template). Log to CloudWatch.\n\nSAM template attaches a schedule. Deploy with sam deploy. 10 minutes from script to scheduled cloud function.",
        hashtags: [...CORE, "#Lambda"],
        image: { template: "code", headline: "Lambda handler + SAM",
          code: { language: "python", snippet: "# handler.py\nimport os, json\n\ndef lambda_handler(event, context):\n    do_work(api_key=os.environ['API_KEY'])\n    return {'statusCode': 200, 'body': json.dumps('ok')}\n\n# template.yaml (excerpt)\n# Resources:\n#   DailyJob:\n#     Type: AWS::Serverless::Function\n#     Properties:\n#       Handler: handler.lambda_handler\n#       Runtime: python3.12\n#       Events:\n#         DailyAt9:\n#           Type: Schedule\n#           Properties: { Schedule: 'cron(0 9 * * ? *)' }" },
          accent: "magenta", aiPrompt: "Dark code card, magenta, 1:1", canvaBrief: "Dark gradient code window."
        }
      },
      { id: "d84-p4", day: 84, postNumber: 4, slot: "evening", type: "tip", pillar: "automation",
        title: "Watch for Lambda's hidden costs",
        copy: "Lambda is cheap until it isn't.\n\nWatch for:\n- Long timeouts → memory * duration explodes\n- Calling other paid APIs in a loop\n- CloudWatch log retention (default = forever, costs add up)\n- VPC-attached Lambdas (cold starts + ENI creation)\n\nSet a CloudWatch budget alarm at $5/month. If a runaway hits, you find out before the bill does.",
        hashtags: [...CORE, "#AWS"],
        image: { template: "tip", headline: "Watch Lambda's hidden costs",
          bullets: ["Long timeouts blow up", "API calls in loops", "CloudWatch retention", "Set $5 alarm"],
          accent: "magenta", aiPrompt: "Pro tip card, magenta, 1:1", canvaBrief: "Magenta header. PRO TIP."
        }
      },
      { id: "d84-p5", day: 84, postNumber: 5, slot: "night", type: "recap", pillar: "career",
        title: "Week 12 done — automation that runs itself",
        copy: "Week 12 done. 84 days, 420 posts in.\n\nThis week:\n- HTTP scraping done politely\n- Playwright when JS demands\n- cron / APScheduler / Airflow\n- Slack + email notifications\n- PDF + Excel automations\n- API integrations with retries\n- Serverless cron with Lambda\n\nNext week (final): build, ship, career. The 6-day wrap-up to land what you've learned.",
        hashtags: [...CORE, "#90DaysOfAI"],
        image: { template: "quote", headline: "12 weeks down. 1 to go.", subhead: "Next: career + projects + farewell.", accent: "magenta", aiPrompt: "Pastel magenta quote with 84/90 progress, 1:1", canvaBrief: "Pastel magenta quote with 84/90 magenta bar." }
      },
    ]
  },
];
