import type { Pillar } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* SVG icon library — pillar icons (tech), utility icons              */
/* All icons are 100x100 viewBox so they scale uniformly             */
/* ------------------------------------------------------------------ */

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
};

const Base = ({
  size = 24,
  className,
  children,
  viewBox = "0 0 100 100",
}: IconProps & { children: React.ReactNode; viewBox?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    className={className}
    style={{ display: "block" }}
  >
    {children}
  </svg>
);

/** Neural network — AI/ML */
export const NeuralIcon = ({ size = 24, color = "currentColor", strokeWidth = 4 }: IconProps) => (
  <Base size={size}>
    <circle cx="20" cy="25" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="20" cy="50" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="20" cy="75" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="50" cy="35" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="50" cy="65" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="80" cy="50" r="6" stroke={color} strokeWidth={strokeWidth} />
    <line x1="26" y1="25" x2="44" y2="35" stroke={color} strokeWidth={strokeWidth} />
    <line x1="26" y1="50" x2="44" y2="35" stroke={color} strokeWidth={strokeWidth} />
    <line x1="26" y1="50" x2="44" y2="65" stroke={color} strokeWidth={strokeWidth} />
    <line x1="26" y1="75" x2="44" y2="65" stroke={color} strokeWidth={strokeWidth} />
    <line x1="56" y1="35" x2="74" y2="50" stroke={color} strokeWidth={strokeWidth} />
    <line x1="56" y1="65" x2="74" y2="50" stroke={color} strokeWidth={strokeWidth} />
  </Base>
);

/** Python — snake glyph stylized */
export const PythonIcon = ({ size = 24, color = "currentColor", strokeWidth = 5 }: IconProps) => (
  <Base size={size}>
    <path
      d="M30 18 Q50 18 50 32 Q50 42 36 42 Q22 42 22 56 Q22 68 36 68 H64 Q78 68 78 54 Q78 44 64 44 Q50 44 50 58 Q50 70 70 70"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="38" cy="28" r="3" fill={color} />
    <circle cx="62" cy="76" r="3" fill={color} />
  </Base>
);

/** RAG — document + search/database stack */
export const RagIcon = ({ size = 24, color = "currentColor", strokeWidth = 5 }: IconProps) => (
  <Base size={size}>
    <ellipse cx="50" cy="22" rx="28" ry="8" stroke={color} strokeWidth={strokeWidth} />
    <path d="M22 22 v18 a28 8 0 0 0 56 0 v-18" stroke={color} strokeWidth={strokeWidth} />
    <path d="M22 40 v18 a28 8 0 0 0 56 0 v-18" stroke={color} strokeWidth={strokeWidth} />
    <path d="M22 58 v16 a28 8 0 0 0 56 0 v-16" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="74" cy="78" r="8" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <line x1="80" y1="84" x2="86" y2="90" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Base>
);

/** DSA — graph nodes + tree */
export const DsaIcon = ({ size = 24, color = "currentColor", strokeWidth = 4 }: IconProps) => (
  <Base size={size}>
    <circle cx="50" cy="20" r="7" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="25" cy="55" r="7" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="75" cy="55" r="7" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="15" cy="85" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="40" cy="85" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="65" cy="85" r="6" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="88" cy="85" r="6" stroke={color} strokeWidth={strokeWidth} />
    <line x1="46" y1="26" x2="29" y2="49" stroke={color} strokeWidth={strokeWidth} />
    <line x1="54" y1="26" x2="71" y2="49" stroke={color} strokeWidth={strokeWidth} />
    <line x1="22" y1="61" x2="17" y2="79" stroke={color} strokeWidth={strokeWidth} />
    <line x1="28" y1="61" x2="38" y2="79" stroke={color} strokeWidth={strokeWidth} />
    <line x1="72" y1="61" x2="67" y2="79" stroke={color} strokeWidth={strokeWidth} />
    <line x1="78" y1="61" x2="86" y2="79" stroke={color} strokeWidth={strokeWidth} />
  </Base>
);

/** Automation — gear + arrow loop */
export const AutomationIcon = ({ size = 24, color = "currentColor", strokeWidth = 4 }: IconProps) => (
  <Base size={size}>
    <circle cx="50" cy="50" r="14" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="50" cy="50" r="4" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r1 = 18, r2 = 26;
      const rad = (a * Math.PI) / 180;
      const x1 = 50 + r1 * Math.cos(rad);
      const y1 = 50 + r1 * Math.sin(rad);
      const x2 = 50 + r2 * Math.cos(rad);
      const y2 = 50 + r2 * Math.sin(rad);
      return (
        <line
          key={a}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={strokeWidth + 2}
          strokeLinecap="round"
        />
      );
    })}
  </Base>
);

/** Agents — robot head with antenna */
export const AgentsIcon = ({ size = 24, color = "currentColor", strokeWidth = 4 }: IconProps) => (
  <Base size={size}>
    <rect x="22" y="32" width="56" height="46" rx="10" stroke={color} strokeWidth={strokeWidth} />
    <circle cx="38" cy="52" r="5" fill={color} />
    <circle cx="62" cy="52" r="5" fill={color} />
    <line x1="40" y1="68" x2="60" y2="68" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="50" y1="20" x2="50" y2="32" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <circle cx="50" cy="16" r="4" fill={color} />
    <line x1="14" y1="56" x2="22" y2="56" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="78" y1="56" x2="86" y2="56" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Base>
);

/** Career / spark */
export const CareerIcon = ({ size = 24, color = "currentColor", strokeWidth = 4 }: IconProps) => (
  <Base size={size}>
    <path
      d="M14 80 L36 56 L52 70 L86 28"
      stroke={color}
      strokeWidth={strokeWidth + 1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M70 28 H86 V44" stroke={color} strokeWidth={strokeWidth + 1} strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

/** Check */
export const CheckIcon = ({ size = 24, color = "currentColor", strokeWidth = 7 }: IconProps) => (
  <Base size={size}>
    <path
      d="M20 52 L42 72 L82 28"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Base>
);

/** Cross */
export const CrossIcon = ({ size = 24, color = "currentColor", strokeWidth = 7 }: IconProps) => (
  <Base size={size}>
    <path
      d="M28 28 L72 72 M72 28 L28 72"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Base>
);

/** Sparkle */
export const SparkleIcon = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Base size={size}>
    <path
      d="M50 10 L56 44 L90 50 L56 56 L50 90 L44 56 L10 50 L44 44 Z"
      fill={color}
    />
  </Base>
);

/** Arrow Down */
export const ArrowDownIcon = ({ size = 24, color = "currentColor", strokeWidth = 7 }: IconProps) => (
  <Base size={size}>
    <path
      d="M50 16 V80 M30 60 L50 84 L70 60"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Base>
);

/** Open quote glyph */
export const QuoteGlyph = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Base size={size}>
    <path
      d="M20 64 V52 a16 16 0 0 1 16 -16 V24 a28 28 0 0 0 -28 28 V76 H32 V64 Z M58 64 V52 a16 16 0 0 1 16 -16 V24 a28 28 0 0 0 -28 28 V76 H70 V64 Z"
      fill={color}
    />
  </Base>
);

/** Code brackets */
export const CodeIcon = ({ size = 24, color = "currentColor", strokeWidth = 5 }: IconProps) => (
  <Base size={size}>
    <path d="M34 26 L14 50 L34 74" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M66 26 L86 50 L66 74" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <line x1="58" y1="22" x2="42" y2="78" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Base>
);

/** Pillar mapping */
export const PillarIcon = ({ pillar, ...props }: IconProps & { pillar: Pillar }) => {
  switch (pillar) {
    case "ai-ml":
      return <NeuralIcon {...props} />;
    case "python":
      return <PythonIcon {...props} />;
    case "rag":
      return <RagIcon {...props} />;
    case "dsa":
      return <DsaIcon {...props} />;
    case "automation":
      return <AutomationIcon {...props} />;
    case "agents":
      return <AgentsIcon {...props} />;
    case "career":
    default:
      return <CareerIcon {...props} />;
  }
};

export const pillarLabel: Record<Pillar, string> = {
  "ai-ml": "AI/ML",
  python: "Python",
  rag: "RAG",
  dsa: "DSA",
  automation: "Automation",
  agents: "Agents",
  career: "Career",
};
