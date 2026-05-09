import type { Pillar } from "@/lib/types";

const pillarStyles: Record<Pillar, { label: string; bg: string; text: string }> = {
  "ai-ml": { label: "AI/ML", bg: "bg-violet-50", text: "text-violet-700" },
  python: { label: "Python", bg: "bg-emerald-50", text: "text-emerald-700" },
  rag: { label: "RAG", bg: "bg-cyan-50", text: "text-cyan-700" },
  dsa: { label: "DSA", bg: "bg-amber-50", text: "text-amber-700" },
  automation: { label: "Automation", bg: "bg-rose-50", text: "text-rose-700" },
  agents: { label: "Agents", bg: "bg-fuchsia-50", text: "text-fuchsia-700" },
  career: { label: "Career", bg: "bg-wellora-50", text: "text-wellora-700" },
};

export function PillarBadge({ pillar }: { pillar: Pillar }) {
  const s = pillarStyles[pillar];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}
