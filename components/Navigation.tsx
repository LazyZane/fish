"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Heart, MessageCircle, Newspaper, Home, Gamepad2 } from "lucide-react";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/fish-timer", label: "计时器", icon: Clock },
  { href: "/emotion", label: "情绪", icon: Heart },
  { href: "/complaints", label: "吐槽", icon: MessageCircle },
  { href: "/news", label: "吃瓜", icon: Newspaper },
  { href: "/games", label: "游戏", icon: Gamepad2 },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* 桌面端顶部导航 */}
      <nav className="hidden lg:block bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
              <span className="text-3xl">🐟</span>
              <span>FishTime</span>
            </Link>
            <div className="flex gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      isActive
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* 移动端底部导航 */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

