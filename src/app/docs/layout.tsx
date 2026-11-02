import { DocsNav } from "@/components/docs-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="max-lg:hidden">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-2">
          <DocsNav />
        </div>
      </aside>
      <details className="mb-6 rounded-lg border border-line bg-surface lg:hidden">
        <summary className="cursor-pointer px-4 py-3 font-semibold">Mục lục tài liệu</summary>
        <div className="border-t border-line px-4 py-3">
          <DocsNav />
        </div>
      </details>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
