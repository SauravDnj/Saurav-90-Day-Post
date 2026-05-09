"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { EditableImagePanel } from "./EditableImagePanel";
import { PillarBadge } from "./PillarBadge";

const slotLabel: Record<Post["slot"], { label: string; icon: string; color: string }> = {
  morning: { label: "Morning", icon: "☀", color: "text-amber-600 bg-amber-50" },
  midday: { label: "Midday", icon: "◑", color: "text-emerald-600 bg-emerald-50" },
  afternoon: { label: "Afternoon", icon: "◐", color: "text-blue-600 bg-blue-50" },
  evening: { label: "Evening", icon: "◒", color: "text-violet-600 bg-violet-50" },
  night: { label: "Night", icon: "☾", color: "text-fuchsia-600 bg-fuchsia-50" },
};

const typeLabel: Record<Post["type"], string> = {
  concept: "Concept",
  deepdive: "Deep dive",
  code: "Code",
  tip: "Tip",
  recap: "Recap",
  myth: "Myth-bust",
  story: "Story",
  question: "Question",
  checklist: "Checklist",
  compare: "Compare",
  project: "Project",
  cta: "CTA",
};

export function PostCard({ post }: { post: Post }) {
  const [tab, setTab] = useState<"post" | "image" | "ai" | "canva">("post");
  const slot = slotLabel[post.slot];
  const fullPostText = `${post.copy}\n\n${post.hashtags.join(" ")}`;

  return (
    <article className="bg-white rounded-2xl border border-wellora-100 card-shadow overflow-hidden">
      <header className="px-6 pt-5 pb-4 border-b border-wellora-50">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-wellora-600 text-white text-[11px] font-bold tracking-wide">
            POST {post.postNumber} of 5
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${slot.color}`}
          >
            <span aria-hidden>{slot.icon}</span> {slot.label}
          </span>
          <PillarBadge pillar={post.pillar} />
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
            {typeLabel[post.type]}
          </span>
        </div>
        <h3 className="font-display font-extrabold text-xl text-wellora-950 leading-snug">
          {post.title}
        </h3>
      </header>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <div className="flex gap-1 bg-wellora-50 p-1 rounded-xl text-xs font-semibold">
          {[
            { k: "post", label: "Post" },
            { k: "image", label: "Image" },
            { k: "ai", label: "AI prompt" },
            { k: "canva", label: "Canva brief" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as typeof tab)}
              className={`flex-1 px-3 py-1.5 rounded-lg transition ${
                tab === t.k
                  ? "bg-white text-wellora-700 shadow-sm"
                  : "text-wellora-700/70 hover:text-wellora-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-5">
        {tab === "post" && (
          <div>
            <pre className="font-sans whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800 bg-wellora-50/40 p-4 rounded-lg">
              {post.copy}
            </pre>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.hashtags.map((h) => (
                <span
                  key={h}
                  className="px-2 py-0.5 rounded-md bg-wellora-50 text-wellora-700 text-xs font-semibold"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <CopyButton text={fullPostText} label="Copy post + hashtags" />
              <CopyButton text={post.copy} label="Copy post only" />
              <CopyButton text={post.hashtags.join(" ")} label="Copy hashtags" />
            </div>
          </div>
        )}

        {tab === "image" && (
          <EditableImagePanel
            original={post.image}
            pillar={post.pillar}
            postId={post.id}
          />
        )}

        {tab === "ai" && (
          <div>
            <p className="text-xs text-slate-600 mb-2">
              Paste this into Midjourney / DALL-E / Leonardo / Canva AI to generate the
              image.
            </p>
            <pre className="font-sans whitespace-pre-wrap text-[14px] leading-relaxed text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-200">
              {post.image.aiPrompt}
            </pre>
            <div className="mt-3">
              <CopyButton text={post.image.aiPrompt} label="Copy AI prompt" />
            </div>
          </div>
        )}

        {tab === "canva" && (
          <div>
            <p className="text-xs text-slate-600 mb-2">
              Hand this brief to a designer or follow it in Canva.
            </p>
            <pre className="font-sans whitespace-pre-wrap text-[14px] leading-relaxed text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-200">
              {post.image.canvaBrief}
            </pre>
            <div className="mt-3">
              <CopyButton text={post.image.canvaBrief} label="Copy Canva brief" />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
