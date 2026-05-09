import type { DayPlan, Post } from "./types";
import { week01 } from "./posts/week-01";
import { week02 } from "./posts/week-02";
import { week03 } from "./posts/week-03";
import { week04 } from "./posts/week-04";
import { week05 } from "./posts/week-05";
import { week06 } from "./posts/week-06";
import { week07 } from "./posts/week-07";
import { week08 } from "./posts/week-08";
import { week09 } from "./posts/week-09";
import { week10 } from "./posts/week-10";
import { week11 } from "./posts/week-11";
import { week12 } from "./posts/week-12";
import { week13 } from "./posts/week-13";

export const plan: DayPlan[] = [
  ...week01,
  ...week02,
  ...week03,
  ...week04,
  ...week05,
  ...week06,
  ...week07,
  ...week08,
  ...week09,
  ...week10,
  ...week11,
  ...week12,
  ...week13,
];

export const allPosts: Post[] = plan.flatMap((d) => d.posts);

export function getDay(day: number): DayPlan | undefined {
  return plan.find((d) => d.day === day);
}
