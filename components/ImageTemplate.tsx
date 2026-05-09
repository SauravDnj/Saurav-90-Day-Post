"use client";

import { useEffect, useRef, useState } from "react";
import { toPng, toSvg } from "html-to-image";
import type { ImageSpec, Pillar } from "@/lib/types";
import {
  CheckIcon,
  CodeIcon,
  CrossIcon,
  PillarIcon,
  QuoteGlyph,
  SparkleIcon,
  pillarLabel,
} from "./Icons";

/* ────────────────────────────────────────────────────────────────── */
/* Public component                                                   */
/* ────────────────────────────────────────────────────────────────── */

export function ImageTemplate({
  spec,
  pillar,
  postId,
}: {
  spec: ImageSpec;
  pillar: Pillar;
  postId: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.4);
  const [busy, setBusy] = useState<null | "png" | "svg">(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const compute = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.clientWidth;
      setScale(Math.max(0.2, Math.min(1, w / 1080)));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const exportImage = async (format: "png" | "svg") => {
    if (!cardRef.current) return;
    setBusy(format);
    try {
      const opts = {
        width: 1080,
        height: 1080,
        pixelRatio: 2,
        cacheBust: true,
        style: {
          transform: "none",
          transformOrigin: "top left",
          margin: "0",
        } as Partial<CSSStyleDeclaration>,
      };
      const dataUrl =
        format === "png"
          ? await toPng(cardRef.current, opts)
          : await toSvg(cardRef.current, opts);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `sauravdnj-${postId}.${format}`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("Could not export image. Try the SVG download instead.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={wrapRef}
        className="relative rounded-xl overflow-hidden border border-wellora-100 card-shadow bg-slate-50"
        style={{ aspectRatio: "1 / 1" }}
      >
        <div
          ref={cardRef}
          style={{
            width: 1080,
            height: 1080,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {renderTemplate(spec, pillar)}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => exportImage("png")}
          disabled={busy !== null}
          className="flex-1 px-3 py-2 rounded-lg bg-wellora-600 text-white text-xs font-semibold hover:bg-wellora-700 disabled:opacity-60"
        >
          {busy === "png" ? "Exporting..." : "↓ PNG (high-res)"}
        </button>
        <button
          onClick={() => exportImage("svg")}
          disabled={busy !== null}
          className="flex-1 px-3 py-2 rounded-lg border border-wellora-200 bg-white text-wellora-800 text-xs font-semibold hover:bg-wellora-50 disabled:opacity-60"
        >
          {busy === "svg" ? "Exporting..." : "↓ SVG"}
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* Template dispatcher                                                */
/* ────────────────────────────────────────────────────────────────── */

function renderTemplate(s: ImageSpec, pillar: Pillar) {
  switch (s.template) {
    case "stat":
      return <StatTemplate s={s} pillar={pillar} />;
    case "quote":
      return <QuoteTemplate s={s} pillar={pillar} />;
    case "list":
      return <ListTemplate s={s} pillar={pillar} />;
    case "tip":
      return <TipTemplate s={s} pillar={pillar} />;
    case "myth":
      return <MythTemplate s={s} pillar={pillar} />;
    case "cta":
      return <CtaTemplate s={s} pillar={pillar} />;
    case "compare":
      return <CompareTemplate s={s} pillar={pillar} />;
    case "code":
      return <CodeTemplate s={s} pillar={pillar} />;
    default:
      return null;
  }
}

/* ────────────────────────────────────────────────────────────────── */
/* Shared building blocks                                             */
/* ────────────────────────────────────────────────────────────────── */

const FONT_DISPLAY =
  '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif';
const FONT_BODY =
  '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';
const FONT_MONO =
  '"JetBrains Mono", "Menlo", monospace';

const COLORS = {
  ink: "#150538",
  inkSoft: "#2a0e76",
  brandDeep: "#4818c4",
  brand: "#5a23ee",
  brandLight: "#8b6bff",
  brandSoft: "#c8baff",
  brandPale: "#e6e0ff",
  brandWhisper: "#f3f0ff",
  white: "#ffffff",
  cyan: "#22d3ee",
  cyanDeep: "#0891b2",
  violet: "#8b5cf6",
  magenta: "#ec4899",
  red: "#dc2626",
  redSoft: "#fee2e2",
  redDeep: "#7f1d1d",
  green: "#10b981",
  amber: "#f59e0b",
};

/** Pillar -> accent color */
function pillarAccent(p: Pillar): string {
  switch (p) {
    case "ai-ml": return COLORS.violet;
    case "python": return COLORS.green;
    case "rag": return COLORS.cyan;
    case "dsa": return COLORS.amber;
    case "automation": return COLORS.magenta;
    case "agents": return "#a855f7";
    case "career":
    default: return COLORS.brand;
  }
}

function BrandPill({ light = false }: { light?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 48,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 18px 10px 12px",
        borderRadius: 999,
        background: light ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        border: light ? "1px solid rgba(255,255,255,0.25)" : "1px solid #ece6ff",
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        fontSize: 22,
        color: light ? COLORS.white : COLORS.ink,
        zIndex: 5,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: light
            ? `linear-gradient(135deg, ${COLORS.brandLight}, ${COLORS.cyan})`
            : `linear-gradient(135deg, ${COLORS.brand}, ${COLORS.brandDeep})`,
          color: COLORS.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 20,
        }}
      >
        S
      </div>
      Saurav Danej
    </div>
  );
}

function PillarTag({
  pillar,
  light = false,
}: {
  pillar: Pillar;
  light?: boolean;
}) {
  const accent = pillarAccent(pillar);
  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        right: 48,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 18px",
        borderRadius: 999,
        background: light ? "rgba(255,255,255,0.16)" : COLORS.brandWhisper,
        border: light
          ? "1px solid rgba(255,255,255,0.25)"
          : `1px solid ${COLORS.brandPale}`,
        color: light ? COLORS.white : COLORS.inkSoft,
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        zIndex: 5,
      }}
    >
      <PillarIcon
        pillar={pillar}
        size={22}
        color={light ? COLORS.white : accent}
        strokeWidth={6}
      />
      {pillarLabel[pillar]}
    </div>
  );
}

function FooterBar({ light = false }: { light?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: 22,
        color: light ? COLORS.brandSoft : COLORS.inkSoft,
        letterSpacing: "0.02em",
        zIndex: 5,
      }}
    >
      <span style={{ opacity: 0.95 }}>linkedin.com/in/sauravdnj</span>
      <span style={{ margin: "0 12px", opacity: 0.4 }}>·</span>
      <span style={{ opacity: 0.85 }}>github.com/SauravDnj</span>
    </div>
  );
}

/** Animated floating decorative blobs for the preview */
function BlobLayer({ tint = "#5a23ee", tint2 = "#22d3ee" }: { tint?: string; tint2?: string }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: 540,
          height: 540,
          borderRadius: "50%",
          left: -180,
          bottom: -200,
          background: `radial-gradient(circle, ${tint}55 0%, ${tint}00 70%)`,
          filter: "blur(20px)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          right: -120,
          top: -100,
          background: `radial-gradient(circle, ${tint2}40 0%, ${tint2}00 70%)`,
          filter: "blur(20px)",
          zIndex: 1,
        }}
      />
    </>
  );
}

/** Subtle dotted grid pattern */
function DotPattern({
  color = COLORS.brand,
  opacity = 0.07,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
        backgroundSize: "26px 26px",
        opacity,
        zIndex: 1,
      }}
    />
  );
}

/** Particle dots, small */
function Particles({ count = 30, color = "#ffffff", opacity = 0.4 }) {
  const seeds = Array.from({ length: count }, (_, i) => i);
  return (
    <>
      {seeds.map((i) => {
        const x = (i * 71) % 1080;
        const y = (i * 113) % 1080;
        const size = 2 + (i % 3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity,
              zIndex: 1,
            }}
          />
        );
      })}
    </>
  );
}

/** Decorative circuit-board lines */
function CircuitLines({ color = COLORS.brandLight, opacity = 0.18 }) {
  return (
    <svg
      viewBox="0 0 1080 1080"
      style={{ position: "absolute", inset: 0, zIndex: 1, opacity }}
    >
      <g stroke={color} strokeWidth="2" fill="none">
        <path d="M0 200 H300 V340 H540" />
        <path d="M1080 280 H760 V400 H540" />
        <path d="M0 720 H260 V820 H560" />
        <path d="M1080 700 H820 V780 H540" />
        <circle cx="300" cy="200" r="4" fill={color} />
        <circle cx="540" cy="340" r="6" fill={color} />
        <circle cx="760" cy="280" r="4" fill={color} />
        <circle cx="540" cy="400" r="6" fill={color} />
        <circle cx="260" cy="720" r="4" fill={color} />
        <circle cx="560" cy="820" r="6" fill={color} />
        <circle cx="820" cy="700" r="4" fill={color} />
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 1. STAT — big number + animated donut + topic icon                 */
/* ────────────────────────────────────────────────────────────────── */

function StatTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const num = s.stat?.number ?? s.headline;
  const label = s.stat?.label ?? s.subhead ?? "";
  const accent = pillarAccent(pillar);

  const pctMatch = num.match(/(-?\d+(?:\.\d+)?)\s*%/);
  const ringPct = pctMatch
    ? Math.min(100, Math.abs(parseFloat(pctMatch[1])))
    : 78;
  const ringR = 410;
  const ringC = 2 * Math.PI * ringR;
  const ringDash = (ringPct / 100) * ringC;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        background: `linear-gradient(135deg, ${COLORS.ink} 0%, ${COLORS.brandDeep} 60%, ${accent} 100%)`,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <BlobLayer tint={accent} tint2={COLORS.cyan} />
      <CircuitLines color="#ffffff" opacity={0.12} />
      <Particles count={36} color="#ffffff" opacity={0.35} />
      <DotPattern color="#ffffff" opacity={0.05} />

      <BrandPill light />
      <PillarTag pillar={pillar} light />

      <svg
        viewBox="0 0 1080 1080"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.35,
        }}
      >
        <circle
          cx="540"
          cy="560"
          r={ringR}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="6"
        />
        <circle
          cx="540"
          cy="560"
          r={ringR}
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeDasharray={`${ringDash} ${ringC}`}
          strokeLinecap="round"
          transform="rotate(-90 540 560)"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          padding: "180px 80px",
          zIndex: 3,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: num.length > 6 ? 200 : 280,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            background: `linear-gradient(180deg, #ffffff 0%, ${COLORS.brandSoft} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "#fff",
            textShadow: "0 8px 40px rgba(139,107,255,0.4)",
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontWeight: 500,
            fontSize: 36,
            color: COLORS.brandSoft,
            maxWidth: 800,
            lineHeight: 1.3,
          }}
        >
          {label}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 320,
          right: 140,
          color: COLORS.brandLight,
          opacity: 0.7,
          zIndex: 3,
        }}
      >
        <SparkleIcon size={36} color={COLORS.cyan} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 130,
          opacity: 0.6,
          zIndex: 3,
        }}
      >
        <SparkleIcon size={28} color="#ffffff" />
      </div>

      <FooterBar light />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 2. QUOTE                                                           */
/* ────────────────────────────────────────────────────────────────── */

function QuoteTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const accent = pillarAccent(pillar);
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        background: `linear-gradient(160deg, ${COLORS.brandWhisper} 0%, ${COLORS.brandPale} 50%, #ffffff 100%)`,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          right: -260,
          top: -260,
          background: `radial-gradient(circle, ${accent}28 0%, transparent 65%)`,
          filter: "blur(20px)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          left: -200,
          bottom: -200,
          background: `radial-gradient(circle, ${COLORS.cyan}1f 0%, transparent 65%)`,
          filter: "blur(20px)",
          zIndex: 1,
        }}
      />

      <DotPattern color={COLORS.brand} opacity={0.05} />
      <BrandPill />
      <PillarTag pillar={pillar} />

      <div
        style={{
          position: "absolute",
          top: 130,
          left: 70,
          opacity: 0.12,
          zIndex: 2,
          color: accent,
        }}
      >
        <QuoteGlyph size={260} color={accent} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "200px 110px 200px",
          zIndex: 3,
          textAlign: "center",
          gap: 36,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: s.headline.length > 80 ? 56 : 68,
            lineHeight: 1.18,
            color: COLORS.ink,
            letterSpacing: "-0.01em",
          }}
        >
          {s.headline}
        </div>
        {s.subhead && (
          <div
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 30,
              color: COLORS.inkSoft,
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            {s.subhead}
          </div>
        )}
        <div
          style={{
            width: 120,
            height: 5,
            borderRadius: 3,
            background: `linear-gradient(90deg, ${COLORS.brand}, ${accent})`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 110,
          right: 70,
          opacity: 0.18,
          zIndex: 2,
        }}
      >
        <PillarIcon
          pillar={pillar}
          size={140}
          color={accent}
          strokeWidth={4}
        />
      </div>

      <FooterBar />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 3. LIST                                                            */
/* ────────────────────────────────────────────────────────────────── */

function ListTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const items = s.bullets ?? [];
  const accent = pillarAccent(pillar);
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        background: "#ffffff",
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <DotPattern color={COLORS.brand} opacity={0.04} />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 12,
          background: `linear-gradient(90deg, ${COLORS.brand}, ${accent}, ${COLORS.cyan})`,
          zIndex: 4,
        }}
      />

      <BrandPill />
      <PillarTag pillar={pillar} />

      <div
        style={{
          position: "absolute",
          top: 200,
          left: 80,
          right: 80,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 60,
            color: COLORS.ink,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: 18,
          }}
        >
          {s.headline}
        </div>
        {s.subhead && (
          <div
            style={{
              fontWeight: 500,
              fontSize: 26,
              color: COLORS.inkSoft,
              marginBottom: 24,
            }}
          >
            {s.subhead}
          </div>
        )}
        <div
          style={{
            width: 80,
            height: 5,
            borderRadius: 3,
            background: accent,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 460,
          left: 80,
          right: 80,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 3,
        }}
      >
        {items.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "18px 22px",
              borderRadius: 16,
              background:
                i % 2 === 0 ? COLORS.brandWhisper : "rgba(230,224,255,0.45)",
              border: `1px solid ${COLORS.brandPale}`,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${COLORS.brand}, ${accent})`,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: 26,
                flexShrink: 0,
                boxShadow: `0 8px 24px ${accent}55`,
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 30,
                color: COLORS.ink,
                lineHeight: 1.25,
              }}
            >
              {b}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          right: -40,
          bottom: -40,
          opacity: 0.08,
          zIndex: 2,
        }}
      >
        <PillarIcon
          pillar={pillar}
          size={420}
          color={accent}
          strokeWidth={3}
        />
      </div>

      <FooterBar />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 4. TIP                                                             */
/* ────────────────────────────────────────────────────────────────── */

function TipTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const items = s.bullets ?? [];
  const accent = pillarAccent(pillar);
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        background: `linear-gradient(180deg, #ffffff 0%, ${COLORS.brandWhisper} 100%)`,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 360,
          background: `linear-gradient(135deg, ${COLORS.brandDeep} 0%, ${accent} 100%)`,
          zIndex: 1,
        }}
      />
      <Particles count={20} color="#ffffff" opacity={0.25} />

      <BrandPill light />
      <PillarTag pillar={pillar} light />

      <div
        style={{
          position: "absolute",
          top: 170,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 16px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: "0.16em",
          zIndex: 3,
        }}
      >
        <SparkleIcon size={18} color="#ffffff" /> PRO TIP
      </div>

      <div
        style={{
          position: "absolute",
          top: 230,
          left: 80,
          right: 80,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 64,
            color: "#fff",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        >
          {s.headline}
        </div>
        {s.subhead && (
          <div
            style={{
              fontWeight: 500,
              fontSize: 26,
              color: COLORS.brandSoft,
              marginTop: 14,
              maxWidth: 880,
            }}
          >
            {s.subhead}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 80,
            right: 80,
            background: "#fff",
            borderRadius: 28,
            padding: 36,
            boxShadow: "0 30px 60px rgba(21,5,56,0.18)",
            zIndex: 4,
            border: `1px solid ${COLORS.brandPale}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: items.length > 4 ? "1fr 1fr" : "1fr",
              gap: 16,
            }}
          >
            {items.map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  fontWeight: 700,
                  fontSize: 26,
                  color: COLORS.ink,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: COLORS.brandWhisper,
                    color: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon size={22} color={accent} strokeWidth={9} />
                </div>
                {b}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          right: -40,
          bottom: 80,
          opacity: 0.14,
          zIndex: 2,
        }}
      >
        <PillarIcon
          pillar={pillar}
          size={300}
          color={accent}
          strokeWidth={3}
        />
      </div>

      <FooterBar />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 5. MYTH                                                            */
/* ────────────────────────────────────────────────────────────────── */

function MythTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const accent = pillarAccent(pillar);
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 540,
          background: `linear-gradient(135deg, #fff5f5 0%, #ffe2e2 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 540,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${COLORS.brandDeep} 0%, ${accent} 100%)`,
        }}
      />

      <BrandPill />
      <PillarTag pillar={pillar} />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 540,
          transform: "translate(-50%, -50%)",
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: COLORS.ink,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: "0.08em",
          boxShadow: "0 14px 40px rgba(21,5,56,0.4)",
          zIndex: 5,
          border: "6px solid #fff",
        }}
      >
        VS
      </div>

      <div
        style={{
          position: "absolute",
          top: 160,
          left: 80,
          right: 80,
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: COLORS.red,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CrossIcon size={26} color="#fff" strokeWidth={9} />
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: 32,
              color: COLORS.red,
              letterSpacing: "0.12em",
            }}
          >
            MYTH
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.redDeep,
            lineHeight: 1.22,
            textDecoration: "line-through",
            textDecorationColor: "rgba(220,38,38,0.45)",
            textDecorationThickness: 4,
          }}
        >
          {s.myth?.myth ?? s.headline}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 620,
          left: 80,
          right: 80,
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon size={28} color={accent} strokeWidth={9} />
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: 32,
              color: COLORS.brandSoft,
              letterSpacing: "0.12em",
            }}
          >
            TRUTH
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 38,
            color: "#fff",
            lineHeight: 1.3,
          }}
        >
          {s.myth?.truth ?? s.subhead}
        </div>
      </div>

      <FooterBar light />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 6. CTA                                                             */
/* ────────────────────────────────────────────────────────────────── */

function CtaTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const items = s.bullets ?? [];
  const accent = pillarAccent(pillar);
  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        background: `linear-gradient(135deg, ${accent} 0%, ${COLORS.brandDeep} 60%, ${COLORS.ink} 100%)`,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <BlobLayer tint={accent} tint2={COLORS.cyan} />
      <CircuitLines color="#ffffff" opacity={0.16} />
      <Particles count={50} color="#ffffff" opacity={0.4} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)`,
          backgroundSize: "200% 100%",
          zIndex: 2,
        }}
      />

      <BrandPill light />
      <PillarTag pillar={pillar} light />

      <div
        style={{
          position: "absolute",
          top: 220,
          left: 60,
          right: 60,
          zIndex: 3,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: s.headline.length > 24 ? 76 : 100,
            color: "#fff",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            textShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          {s.headline}
        </div>
        {s.subhead && (
          <div
            style={{
              fontWeight: 500,
              fontSize: 28,
              color: COLORS.brandSoft,
              marginTop: 22,
              maxWidth: 800,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {s.subhead}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 530,
            left: 160,
            right: 160,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 28,
            padding: 32,
            zIndex: 4,
          }}
        >
          {items.map((b, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                color: "#fff",
                fontSize: 28,
                fontWeight: 700,
                padding: "10px 0",
                borderBottom:
                  i < items.length - 1
                    ? "1px solid rgba(255,255,255,0.12)"
                    : undefined,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: COLORS.cyan,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CheckIcon size={18} color={COLORS.ink} strokeWidth={10} />
              </div>
              {b}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 130,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "20px 38px",
            borderRadius: 999,
            background: "#fff",
            color: COLORS.ink,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 32,
            boxShadow: "0 18px 40px rgba(0,0,0,0.3)",
            letterSpacing: "-0.01em",
          }}
        >
          Follow @sauravdnj
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: accent,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            →
          </span>
        </div>
      </div>

      <FooterBar light />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 7. COMPARE                                                         */
/* ────────────────────────────────────────────────────────────────── */

function CompareTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const c = s.compare;
  const left = c?.leftItems ?? [];
  const right = c?.rightItems ?? [];
  const accent = pillarAccent(pillar);

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 540,
          background: `linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 540,
          background: `linear-gradient(180deg, ${COLORS.brandDeep} 0%, ${accent} 100%)`,
        }}
      />

      <BrandPill />
      <PillarTag pillar={pillar} light />

      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 4,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 50,
            color: COLORS.ink,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            display: "inline-block",
            background: "rgba(255,255,255,0.92)",
            padding: "16px 28px",
            borderRadius: 18,
            boxShadow: "0 12px 30px rgba(21,5,56,0.18)",
          }}
        >
          {s.headline}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: COLORS.ink,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: "0.08em",
          zIndex: 5,
          border: "6px solid #fff",
          boxShadow: "0 14px 40px rgba(21,5,56,0.4)",
        }}
      >
        VS
      </div>

      <div
        style={{
          position: "absolute",
          top: 320,
          left: 60,
          width: 420,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 36,
            color: "#475569",
            marginBottom: 22,
          }}
        >
          {c?.leftLabel ?? "Before"}
        </div>
        {left.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
              color: "#475569",
              fontWeight: 600,
              fontSize: 26,
              lineHeight: 1.3,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CrossIcon size={14} color="#475569" strokeWidth={9} />
            </div>
            {b}
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 320,
          right: 60,
          width: 420,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 36,
            color: "#fff",
            marginBottom: 22,
          }}
        >
          {c?.rightLabel ?? "After"}
        </div>
        {right.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
              color: "#fff",
              fontWeight: 600,
              fontSize: 26,
              lineHeight: 1.3,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: COLORS.cyan,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CheckIcon size={16} color={COLORS.ink} strokeWidth={10} />
            </div>
            {b}
          </div>
        ))}
      </div>

      <FooterBar light />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/* 8. CODE — terminal/IDE style                                       */
/* ────────────────────────────────────────────────────────────────── */

function CodeTemplate({ s, pillar }: { s: ImageSpec; pillar: Pillar }) {
  const code = s.code?.snippet ?? "# code snippet\nprint('hello, world')";
  const lang = s.code?.language ?? "python";
  const accent = pillarAccent(pillar);
  const lines = code.split("\n");

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        background: `linear-gradient(135deg, ${COLORS.ink} 0%, #1c0a4e 50%, ${COLORS.brandDeep} 100%)`,
        overflow: "hidden",
        fontFamily: FONT_BODY,
      }}
    >
      <CircuitLines color={accent} opacity={0.18} />
      <Particles count={28} color="#ffffff" opacity={0.3} />

      <BrandPill light />
      <PillarTag pillar={pillar} light />

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 80,
          right: 80,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: s.headline.length > 36 ? 48 : 56,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {s.headline}
        </div>
        {s.subhead && (
          <div
            style={{
              fontWeight: 500,
              fontSize: 24,
              color: COLORS.brandSoft,
              marginTop: 12,
            }}
          >
            {s.subhead}
          </div>
        )}
      </div>

      {/* Terminal window */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 60,
          right: 60,
          background: "#0b0228",
          borderRadius: 22,
          padding: "0 0 28px 0",
          boxShadow: `0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px ${accent}55`,
          zIndex: 4,
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#bcb3da",
              fontFamily: FONT_MONO,
              fontSize: 18,
            }}
          >
            <CodeIcon size={18} color={accent} strokeWidth={5} />
            {lang}
          </div>
        </div>

        {/* Code content */}
        <div
          style={{
            padding: "26px 28px 14px",
            fontFamily: FONT_MONO,
            fontSize: lines.length > 14 ? 22 : lines.length > 10 ? 26 : 30,
            lineHeight: 1.5,
            color: "#e6e0ff",
          }}
        >
          {lines.map((ln, i) => (
            <div key={i} style={{ display: "flex", gap: 18 }}>
              <div
                style={{
                  width: 36,
                  textAlign: "right",
                  color: "rgba(200,186,255,0.4)",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ whiteSpace: "pre", color: highlightLine(ln, accent) ? accent : "#e6e0ff" }}>
                {ln || " "}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterBar light />
    </div>
  );
}

function highlightLine(ln: string, _accent: string) {
  return /^\s*(def |class |from |import |@)/.test(ln);
}
