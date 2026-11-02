"use client";

import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";

const KEY = "paw-quickstart";
const listeners = new Set<() => void>();

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function parse(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export type Step = { id: string; title: string; detail: string; href: string };

export function Checklist({ steps }: { steps: Step[] }) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const done = parse(raw);
  const toggle = useCallback(
    (id: string) => {
      const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // Blocked storage: the steps stay readable, only the ticks do not stick.
      }
      listeners.forEach((l) => l());
    },
    [done],
  );

  return (
    <div className="not-prose mt-6">
      <p className="text-sm font-medium text-muted" aria-live="polite">
        Đã xong {steps.filter((s) => done.includes(s.id)).length} trên {steps.length} bước
      </p>
      <ol className="mt-3 !list-none !pl-0">
        {steps.map((s, i) => {
          const checked = done.includes(s.id);
          return (
            <li key={s.id} className="!mt-0 flex gap-3 border-t border-line py-4">
              <input
                id={`step-${s.id}`}
                type="checkbox"
                checked={checked}
                onChange={() => toggle(s.id)}
                className="mt-1 size-5 shrink-0 accent-[var(--amber)]"
              />
              <div>
                <label htmlFor={`step-${s.id}`} className={`font-semibold ${checked ? "text-muted line-through" : ""}`}>
                  {i + 1}. {s.title}
                </label>
                <p className="!mt-0.5 text-muted">{s.detail}</p>
                <Link href={s.href} className="text-[0.95rem]">Xem hướng dẫn</Link>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
