import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image src="/logo.png" alt="" width={32} height={32} />
          <span className="max-sm:hidden">PMIS Auto Work</span>
          <span className="sm:hidden">PAW</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-[0.95rem] font-medium sm:gap-3">
          <Link href="/docs/bat-dau-nhanh" className="rounded-md px-2 py-1.5 hover:text-amber-text">
            Hướng dẫn
          </Link>
          <Link href="/#tai-ve" className="rounded-md px-2 py-1.5 hover:text-amber-text">
            Tải về
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
