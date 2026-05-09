"use client";

import { useState } from "react";
import type { ImageSpec, Pillar } from "@/lib/types";
import { ImageTemplate } from "./ImageTemplate";

export function EditableImagePanel({
  original,
  pillar,
  postId,
}: {
  original: ImageSpec;
  pillar: Pillar;
  postId: string;
}) {
  const [spec, setSpec] = useState<ImageSpec>(original);
  const reset = () => setSpec(original);

  const update = <K extends keyof ImageSpec>(key: K, value: ImageSpec[K]) =>
    setSpec((s) => ({ ...s, [key]: value }));

  const updateBullet = (i: number, v: string) => {
    const next = [...(spec.bullets ?? [])];
    next[i] = v;
    update("bullets", next);
  };
  const addBullet = () =>
    update("bullets", [...(spec.bullets ?? []), "New point"]);
  const removeBullet = (i: number) => {
    const next = [...(spec.bullets ?? [])];
    next.splice(i, 1);
    update("bullets", next);
  };

  const updateStat = (k: "number" | "label", v: string) =>
    update("stat", {
      number: spec.stat?.number ?? "",
      label: spec.stat?.label ?? "",
      [k]: v,
    });

  const updateMyth = (k: "myth" | "truth", v: string) =>
    update("myth", {
      myth: spec.myth?.myth ?? "",
      truth: spec.myth?.truth ?? "",
      [k]: v,
    });

  const updateCompareLabel = (side: "leftLabel" | "rightLabel", v: string) =>
    update("compare", {
      leftLabel: spec.compare?.leftLabel ?? "",
      leftItems: spec.compare?.leftItems ?? [],
      rightLabel: spec.compare?.rightLabel ?? "",
      rightItems: spec.compare?.rightItems ?? [],
      [side]: v,
    });

  const updateCode = (k: "language" | "snippet", v: string) =>
    update("code", {
      language: spec.code?.language ?? "python",
      snippet: spec.code?.snippet ?? "",
      [k]: v,
    });

  const updateCompareItem = (
    side: "leftItems" | "rightItems",
    i: number,
    v: string
  ) => {
    const items = [...(spec.compare?.[side] ?? [])];
    items[i] = v;
    update("compare", {
      leftLabel: spec.compare?.leftLabel ?? "",
      leftItems: spec.compare?.leftItems ?? [],
      rightLabel: spec.compare?.rightLabel ?? "",
      rightItems: spec.compare?.rightItems ?? [],
      [side]: items,
    });
  };

  const addCompareItem = (side: "leftItems" | "rightItems") => {
    const items = [...(spec.compare?.[side] ?? []), "New point"];
    update("compare", {
      leftLabel: spec.compare?.leftLabel ?? "",
      leftItems: spec.compare?.leftItems ?? [],
      rightLabel: spec.compare?.rightLabel ?? "",
      rightItems: spec.compare?.rightItems ?? [],
      [side]: items,
    });
  };

  const removeCompareItem = (side: "leftItems" | "rightItems", i: number) => {
    const items = [...(spec.compare?.[side] ?? [])];
    items.splice(i, 1);
    update("compare", {
      leftLabel: spec.compare?.leftLabel ?? "",
      leftItems: spec.compare?.leftItems ?? [],
      rightLabel: spec.compare?.rightLabel ?? "",
      rightItems: spec.compare?.rightItems ?? [],
      [side]: items,
    });
  };

  const t = spec.template;

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Image preview */}
      <div>
        <ImageTemplate spec={spec} pillar={pillar} postId={postId} />
        <div className="mt-2 text-[11px] text-slate-500 leading-relaxed">
          What you see here is exactly what the exported PNG/SVG will look like
          — high-resolution (2160×2160), no animation, ready to post.
        </div>
      </div>

      {/* Editor panel */}
      <div className="bg-wellora-50/40 border border-wellora-100 rounded-xl p-4 max-h-[640px] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-wellora-700">
            ✎ Edit image content
          </div>
          <button
            onClick={reset}
            className="text-[11px] font-bold text-wellora-700 hover:text-wellora-900 underline-offset-2 hover:underline"
          >
            Reset
          </button>
        </div>

        <Field label="Headline">
          <textarea
            value={spec.headline}
            onChange={(e) => update("headline", e.target.value)}
            rows={2}
            className={inputCls}
          />
        </Field>

        <Field label="Subhead (optional)">
          <textarea
            value={spec.subhead ?? ""}
            onChange={(e) => update("subhead", e.target.value)}
            rows={2}
            className={inputCls}
            placeholder="Sub-headline shown below the main headline"
          />
        </Field>

        {/* Stat fields */}
        {t === "stat" && (
          <>
            <Field label="Stat number">
              <input
                value={spec.stat?.number ?? ""}
                onChange={(e) => updateStat("number", e.target.value)}
                className={inputCls}
                placeholder="e.g. 95% or −12kg"
              />
            </Field>
            <Field label="Stat label">
              <textarea
                value={spec.stat?.label ?? ""}
                onChange={(e) => updateStat("label", e.target.value)}
                rows={2}
                className={inputCls}
                placeholder="What the number means"
              />
            </Field>
          </>
        )}

        {/* Myth fields */}
        {t === "myth" && (
          <>
            <Field label="Myth statement">
              <textarea
                value={spec.myth?.myth ?? ""}
                onChange={(e) => updateMyth("myth", e.target.value)}
                rows={3}
                className={inputCls}
              />
            </Field>
            <Field label="Truth statement">
              <textarea
                value={spec.myth?.truth ?? ""}
                onChange={(e) => updateMyth("truth", e.target.value)}
                rows={3}
                className={inputCls}
              />
            </Field>
          </>
        )}

        {/* Compare fields */}
        {t === "compare" && spec.compare && (
          <>
            <Field label="Left column label">
              <input
                value={spec.compare.leftLabel}
                onChange={(e) =>
                  updateCompareLabel("leftLabel", e.target.value)
                }
                className={inputCls}
              />
            </Field>
            <Field label="Left items">
              <ItemList
                items={spec.compare.leftItems}
                onChange={(i, v) => updateCompareItem("leftItems", i, v)}
                onAdd={() => addCompareItem("leftItems")}
                onRemove={(i) => removeCompareItem("leftItems", i)}
              />
            </Field>
            <Field label="Right column label">
              <input
                value={spec.compare.rightLabel}
                onChange={(e) =>
                  updateCompareLabel("rightLabel", e.target.value)
                }
                className={inputCls}
              />
            </Field>
            <Field label="Right items">
              <ItemList
                items={spec.compare.rightItems}
                onChange={(i, v) => updateCompareItem("rightItems", i, v)}
                onAdd={() => addCompareItem("rightItems")}
                onRemove={(i) => removeCompareItem("rightItems", i)}
              />
            </Field>
          </>
        )}

        {/* Bullets — for list / tip / cta */}
        {(t === "list" || t === "tip" || t === "cta") && (
          <Field label="Bullets / inclusions">
            <ItemList
              items={spec.bullets ?? []}
              onChange={updateBullet}
              onAdd={addBullet}
              onRemove={removeBullet}
            />
          </Field>
        )}

        {/* Code fields */}
        {t === "code" && (
          <>
            <Field label="Language">
              <input
                value={spec.code?.language ?? "python"}
                onChange={(e) => updateCode("language", e.target.value)}
                className={inputCls}
                placeholder="python, typescript, sql, bash..."
              />
            </Field>
            <Field label="Code snippet">
              <textarea
                value={spec.code?.snippet ?? ""}
                onChange={(e) => updateCode("snippet", e.target.value)}
                rows={10}
                className={inputCls + " font-mono text-[13px]"}
                placeholder="Paste a short snippet (max ~16 lines for clean rendering)"
              />
            </Field>
          </>
        )}

        <div className="mt-4 text-[11px] text-slate-500 leading-relaxed">
          Edits update the preview instantly. Click <b>↓ PNG</b> below the image
          to download your edited version.
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-wellora-200 bg-white text-sm text-slate-800 leading-snug focus:outline-none focus:ring-2 focus:ring-wellora-300 focus:border-wellora-400";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-wellora-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function ItemList({
  items,
  onChange,
  onAdd,
  onRemove,
}: {
  items: string[];
  onChange: (i: number, v: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => onChange(i, e.target.value)}
            className={inputCls + " flex-1"}
          />
          <button
            onClick={() => onRemove(i)}
            className="px-2 rounded-lg border border-rose-200 bg-white text-rose-600 text-xs font-bold hover:bg-rose-50"
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full px-3 py-1.5 rounded-lg border border-dashed border-wellora-300 bg-white text-wellora-700 text-xs font-bold hover:bg-wellora-50"
      >
        + Add item
      </button>
    </div>
  );
}
