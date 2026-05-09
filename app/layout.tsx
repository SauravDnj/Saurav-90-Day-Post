import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saurav Danej · 90-Day AI/ML LinkedIn Content Plan",
  description:
    "90 days · 5 posts/day · 450 LinkedIn + Instagram posts and editable images on AI/ML, Python, RAG, DSA, Automation and Agents — by Saurav Danej.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen scrollbar-thin">{children}</body>
    </html>
  );
}
