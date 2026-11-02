import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, isValidElement, type ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { slugify } from "@/lib/docs";

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === "string" ? c : isValidElement(c) ? textOf((c.props as { children?: ReactNode }).children) : ""))
    .join("");
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
    a: ({ href = "", children }) =>
      href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} rel="noreferrer">{children}</a>,
    Note: ({ children }: { children: ReactNode }) => (
      <aside className="mt-5 rounded-r-lg border-l-4 border-amber bg-tint px-4 py-3 [&>p:first-child]:mt-0">{children}</aside>
    ),
  };
}
