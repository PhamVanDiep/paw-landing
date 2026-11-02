import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DOC_CONTENT } from "@/content/docs";
import { DOC_PAGES, slugify } from "@/lib/docs";

type Params = Promise<{ slug: string }>;
type Props = { params: Params };

export function generateStaticParams() {
  return DOC_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = DOC_PAGES.find((p) => p.slug === slug);
  return page ? { title: page.title, description: page.description } : {};
}

function outline(slug: string) {
  const src = fs.readFileSync(path.join(process.cwd(), "src/content/docs", `${slug}.mdx`), "utf8");
  return [...src.matchAll(/^## (.+)$/gm)].map((m) => ({ title: m[1].trim(), id: slugify(m[1]) }));
}

/** Holds the layout still while a page streams in; every known page is prerendered, so this is brief. */
function DocFallback() {
  return (
    <div className="max-w-[72ch] animate-pulse" aria-hidden>
      <div className="h-11 w-2/3 rounded-lg bg-tint" />
      <div className="mt-4 h-6 w-full rounded bg-tint" />
    </div>
  );
}

// Reading params must stay inside Suspense so a click between docs paints at once.
async function DocBody({ params }: { params: Params }) {
  const { slug } = await params;
  const index = DOC_PAGES.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const page = DOC_PAGES[index];
  const Content = DOC_CONTENT[slug];
  const headings = outline(slug);
  const prev = DOC_PAGES[index - 1];
  const next = DOC_PAGES[index + 1];

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-10">
      <div className="min-w-0">
        <article className="prose-doc">
          <h1>{page.title}</h1>
          <p className="text-lg text-muted">{page.description}</p>
          <Content />
        </article>
        <nav aria-label="Trang kế tiếp" className="mt-12 flex max-w-[72ch] flex-wrap justify-between gap-3 border-t border-line pt-6">
          {prev ? <Link href={`/docs/${prev.slug}`} className="btn btn-ghost">Trước: {prev.title}</Link> : <span />}
          {next && <Link href={`/docs/${next.slug}`} className="btn btn-ghost">Tiếp: {next.title}</Link>}
        </nav>
      </div>
      {headings.length > 1 && (
        <aside className="max-xl:hidden">
          <nav aria-label="Trong trang này" className="sticky top-24 text-sm">
            <p className="mb-2 font-bold">Trong trang này</p>
            <ul className="space-y-2 text-muted">
              {headings.map((h) => (
                <li key={h.id}><a href={`#${h.id}`} className="hover:text-ink">{h.title}</a></li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}

export default function DocPage({ params }: Props) {
  return (
    <Suspense fallback={<DocFallback />}>
      <DocBody params={params} />
    </Suspense>
  );
}
