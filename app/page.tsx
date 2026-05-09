import { Header } from "@/components/Header";
import { DayCard } from "@/components/DayCard";
import { plan, allPosts } from "@/lib/data";

export default function HomePage() {
  const totalPosts = allPosts.length;
  const totalImages = allPosts.length;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-wellora-100 text-wellora-800 text-xs font-bold uppercase tracking-wider mb-4">
            90-Day AI/ML Content System
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-wellora-950 leading-tight mb-3">
            Saurav Danej · <span className="gradient-text">90 days. 450 posts.</span>{" "}
            <br className="hidden md:block" />
            450 unique tech images. Ready to ship.
          </h1>
          <p className="text-slate-600 max-w-3xl text-lg leading-relaxed">
            A daily content engine on AI/ML, Python, RAG, DSA, Automation and
            Agents — built for LinkedIn (
            <a
              href="https://www.linkedin.com/in/sauravdnj"
              target="_blank"
              rel="noreferrer"
              className="text-wellora-700 font-semibold hover:underline"
            >
              in/sauravdnj
            </a>
            ) and Instagram (
            <a
              href="https://www.instagram.com/saurav_dnj_24"
              target="_blank"
              rel="noreferrer"
              className="text-wellora-700 font-semibold hover:underline"
            >
              @saurav_dnj_24
            </a>
            ). Every post: copy, hashtags, an SVG/PNG image you can download, an
            AI prompt for Midjourney/DALL-E, and a Canva design brief.
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            <Stat n="90" label="Days planned" />
            <Stat n={String(totalPosts)} label="Posts" />
            <Stat n={String(totalImages)} label="Unique images" />
            <Stat n="7" label="Pillars covered" />
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-display font-extrabold text-2xl text-wellora-950">
              The 90-day plan
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Click any day to view 5 posts &amp; images
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {plan.map((d) => (
              <DayCard key={d.day} day={d} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-white rounded-xl border border-wellora-100 p-4 card-shadow">
      <div className="font-display font-extrabold text-3xl gradient-text leading-none">
        {n}
      </div>
      <div className="text-xs text-slate-600 mt-1 font-semibold uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-wellora-100 text-sm text-slate-500">
      <div className="flex flex-col md:flex-row md:justify-between gap-3">
        <div>
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/sauravdnj"
            target="_blank"
            rel="noreferrer"
            className="text-wellora-700 font-semibold hover:underline"
          >
            Saurav Danej
          </a>{" "}
          · AI/ML · Python · RAG · DSA · Automation · Agents
        </div>
        <div className="flex gap-3">
          <a
            href="https://github.com/SauravDnj"
            target="_blank"
            rel="noreferrer"
            className="text-wellora-700 font-semibold hover:underline"
          >
            github.com/SauravDnj
          </a>
          <a
            href="https://www.instagram.com/saurav_dnj_24"
            target="_blank"
            rel="noreferrer"
            className="text-wellora-700 font-semibold hover:underline"
          >
            @saurav_dnj_24
          </a>
        </div>
      </div>
    </footer>
  );
}
