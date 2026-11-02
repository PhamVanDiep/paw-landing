import Link from "next/link";
import { ISSUES_URL, RELEASES_URL } from "@/lib/releases";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-8 text-sm text-muted sm:px-6">
        <span className="mr-auto font-semibold text-ink">PMIS Auto Work</span>
        <Link href="/docs/tong-quan" className="hover:text-ink">Tài liệu</Link>
        <Link href="/docs/xu-ly-su-co" className="hover:text-ink">Xử lý sự cố</Link>
        <a href={ISSUES_URL} className="hover:text-ink">Báo lỗi và góp ý</a>
        <a href={RELEASES_URL} className="hover:text-ink">Các bản phát hành</a>
      </div>
    </footer>
  );
}
