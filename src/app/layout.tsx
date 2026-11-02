import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const vietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vietnam",
});
const jetbrains = JetBrains_Mono({ subsets: ["vietnamese", "latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: { default: "PMIS Auto Work", template: "%s | PMIS Auto Work" },
  description: "Ứng dụng desktop đưa work item Azure DevOps lên bảng Kanban và chạy Claude Code ngay trong thư mục project trên máy bạn.",
  // People arrive through internal links; the site stays out of search engines.
  robots: { index: false, follow: false },
};

// Runs before paint so a saved theme never flashes the other one.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${vietnam.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
