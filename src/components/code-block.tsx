"use client";

import { useRef, useState } from "react";

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mt-4">
      <pre ref={ref} className="overflow-x-auto rounded-lg bg-[var(--code-bg)] p-4 pr-24 font-mono text-[0.85rem] leading-6 text-[var(--code-ink)]">
        {children}
      </pre>
      <button
        type="button"
        className="absolute right-2 top-2 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/20"
        onClick={async () => {
          await navigator.clipboard.writeText(ref.current?.innerText.trim() ?? "");
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Đã sao chép" : "Sao chép"}
      </button>
    </div>
  );
}
