import Link from "next/link";
import type { DayPlan } from "@/lib/types";
import { PillarBadge } from "./PillarBadge";

export function DayCard({ day }: { day: DayPlan }) {
  return (
    <Link
      href={`/day/${day.day}`}
      className="group block bg-white rounded-2xl border border-wellora-100 card-shadow hover:card-shadow-lg hover:-translate-y-0.5 transition p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-wellora-500 to-wellora-700 text-white font-display font-extrabold flex items-center justify-center text-lg shadow-sm">
            {day.day}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-wellora-700">
              Day {day.day}
            </div>
            <PillarBadge pillar={day.pillar} />
          </div>
        </div>
        <div className="text-[11px] font-bold text-slate-400 group-hover:text-wellora-600">
          {day.posts.length} posts →
        </div>
      </div>
      <h3 className="font-display font-extrabold text-base text-wellora-950 leading-snug mb-2">
        {day.theme}
      </h3>
      <ul className="text-xs text-slate-600 space-y-1">
        {day.posts.map((p) => (
          <li key={p.id} className="flex items-start gap-2">
            <span className="text-wellora-500 font-bold">{p.postNumber}.</span>
            <span className="line-clamp-1">{p.title}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
