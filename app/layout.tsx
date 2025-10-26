import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "FishTime - 职场摸鱼解压平台",
  description: "摸鱼不是偷懒，而是职场自我修复的一部分",
  keywords: ["职场", "摸鱼", "解压", "情绪管理", "心理健康"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navigation />
        <main className="pb-20 lg:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}

