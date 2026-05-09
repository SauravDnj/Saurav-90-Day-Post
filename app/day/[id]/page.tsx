import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { PillarBadge } from "@/components/PillarBadge";
import { getDay, plan } from "@/lib/data";

export function generateStaticParams() {
  return plan.map((d) => ({ id: String(d.day) }));
}

export default function DayPage({ params }: { params: { id: string } }) {
  const dayNum = Number(params.id);
  const day = getDay(dayNum);
  if (!day) notFound();

  const prev = plan.find((d) => d.day === dayNum - 1);
  const next = plan.find((d) => d.day === dayNum + 1);

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-wider text-wellora-700 hover:text-wellora-900 inline-flex items-center gap-1.5"
        >
          ← All days
        </Link>

        <div className="mt-4 mb-8 flex items-end gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-wellora-500 to-wellora-700 text-white font-display font-extrabold flex items-center justify-center text-4xl shadow-lg">
            {day.day}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-wellora-700">
                Day {day.day} of 90
              </span>
              <PillarBadge pillar={day.pillar} />
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-wellora-950 leading-tight">
              {day.theme}
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          {day.posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>

        <nav className="mt-10 flex items-center justify-between gap-3 pt-6 border-t border-wellora-100">
          {prev ? (
            <Link
              href={`/day/${prev.day}`}
              className="flex-1 p-4 rounded-xl border border-wellora-100 bg-white hover:bg-wellora-50 transition"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-wellora-700">
                ← Day {prev.day}
              </div>
              <div className="font-display font-bold text-wellora-950 truncate">
                {prev.theme}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/day/${next.day}`}
              className="flex-1 p-4 rounded-xl border border-wellora-100 bg-white hover:bg-wellora-50 transition text-right"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-wellora-700">
                Day {next.day} →
              </div>
              <div className="font-display font-bold text-wellora-950 truncate">
                {next.theme}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </main>
    </>
  );
}
