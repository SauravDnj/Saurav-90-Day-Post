"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // best-effort clipboard
    }
  };
  return (
    <button
      onClick={onCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-wellora-200 bg-white text-wellora-800 text-xs font-semibold hover:bg-wellora-50 transition ${className}`}
    >
      {copied ? "✓ Copied" : label}
    </button>
  );
}
