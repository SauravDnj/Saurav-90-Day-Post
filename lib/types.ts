export type Pillar =
  | "ai-ml"
  | "python"
  | "rag"
  | "dsa"
  | "automation"
  | "agents"
  | "career";

export type PostType =
  | "concept"
  | "deepdive"
  | "code"
  | "tip"
  | "recap"
  | "myth"
  | "story"
  | "question"
  | "checklist"
  | "compare"
  | "project"
  | "cta";

export type Slot = "morning" | "midday" | "afternoon" | "evening" | "night";

export type ImageTemplate =
  | "quote"
  | "stat"
  | "tip"
  | "list"
  | "myth"
  | "cta"
  | "compare"
  | "code";

export interface ImageSpec {
  template: ImageTemplate;
  headline: string;
  subhead?: string;
  bullets?: string[];
  stat?: { number: string; label: string };
  myth?: { myth: string; truth: string };
  compare?: {
    leftLabel: string;
    leftItems: string[];
    rightLabel: string;
    rightItems: string[];
  };
  code?: { language: string; snippet: string };
  /** Ready-to-paste prompt for Midjourney / DALL-E / Leonardo / Canva AI */
  aiPrompt: string;
  /** Step-by-step Canva / designer brief */
  canvaBrief: string;
  /** Optional accent for the rendered HTML/SVG template */
  accent?: "blue" | "indigo" | "teal" | "violet" | "cyan" | "magenta" | "amber" | "rose" | "emerald";
}

export interface Post {
  id: string;
  day: number;
  postNumber: 1 | 2 | 3 | 4 | 5;
  slot: Slot;
  type: PostType;
  pillar: Pillar;
  title: string;
  copy: string;
  hashtags: string[];
  image: ImageSpec;
}

export interface DayPlan {
  day: number;
  theme: string;
  pillar: Pillar;
  posts: Post[];
}
