"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_GROUPS } from "@/lib/docs";

export function DocsNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Tài liệu" className="space-y-6 text-[0.95rem]">
      {DOC_GROUPS.map((g) => (
        <div key={g.title}>
          <p className="mb-1 font-bold">{g.title}</p>
          <ul>
            {g.pages.map((p) => {
              const href = `/docs/${p.slug}`;
              const active = pathname === href;
              return (
                <li key={p.slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md border-l-2 px-3 py-1.5 ${active ? "border-amber bg-tint font-semibold" : "border-transparent text-muted hover:text-ink"}`}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
