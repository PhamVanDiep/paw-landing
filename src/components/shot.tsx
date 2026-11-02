import Image from "next/image";

/** A real screenshot in both themes, inside a plain window frame. */
export function Shot({ name, alt, priority, className = "" }: { name: "board" | "runs"; alt: string; priority?: boolean; className?: string }) {
  const common = { width: 2880, height: 1800, sizes: "(max-width: 1024px) 100vw, 60vw", priority };
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-28px_rgb(16_36_79/0.45)] ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-line px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
      </div>
      <Image {...common} src={`/shots/${name}-light.webp`} alt={alt} className="only-light h-auto w-full" />
      <Image {...common} src={`/shots/${name}-dark.webp`} alt={alt} className="only-dark h-auto w-full" />
    </div>
  );
}
