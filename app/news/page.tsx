"use client";

import { useState } from "react";
import { Newspaper, Clock, Flame, Star } from "lucide-react";
import { mockNews } from "@/lib/mockData";

type Category = "all" | "明星八卦" | "职场趣闻" | "影视综艺" | "搞笑段子";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  const categories: { value: Category; label: string; emoji: string }[] = [
    { value: "all", label: "全部", emoji: "📰" },
    { value: "明星八卦", label: "明星八卦", emoji: "⭐" },
    { value: "职场趣闻", label: "职场趣闻", emoji: "💼" },
    { value: "影视综艺", label: "影视综艺", emoji: "🎬" },
    { value: "搞笑段子", label: "搞笑段子", emoji: "😂" }
  ];

  // 筛选新闻
  const filteredNews = selectedCategory === "all"
    ? mockNews.news
    : mockNews.news.filter(n => n.category === selectedCategory);

  // 三分钟摸鱼推荐（阅读时长≤3分钟）
  const quickReads = mockNews.news.filter(n => n.readTime <= 3).slice(0, 6);

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "明星八卦": "bg-yellow-100 text-yellow-700",
      "职场趣闻": "bg-blue-100 text-blue-700",
      "影视综艺": "bg-purple-100 text-purple-700",
      "搞笑段子": "bg-pink-100 text-pink-700"
    };
    return colorMap[category] || "bg-gray-100 text-gray-700";
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      "明星八卦": "⭐",
      "职场趣闻": "💼",
      "影视综艺": "🎬",
      "搞笑段子": "😂"
    };
    return iconMap[category] || "📰";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Newspaper className="text-orange-500" size={40} />
          摸鱼吃瓜 Club
        </h1>
        <p className="text-gray-600">轻松娱乐，缓解职场压力</p>
      </div>

      {/* 今日一瓜 Banner */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-3xl shadow-2xl p-8 mb-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🍉</span>
          <div>
            <h2 className="text-2xl font-bold">今日一瓜</h2>
            <p className="text-white/90 text-sm">每日精选爆款内容</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">
          {mockNews.todayHighlight.title}
        </h3>
        <p className="text-white/95 leading-relaxed mb-4">
          {mockNews.todayHighlight.content}
        </p>
        <div className="flex items-center gap-4">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Flame size={16} />
            热度 {mockNews.todayHighlight.heat.toLocaleString()}
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Star size={16} />
            今日必看
          </span>
        </div>
      </div>

      {/* 三分钟摸鱼推荐 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">三分钟摸鱼推荐</h2>
          <span className="text-sm text-gray-500">快速浏览，轻松一刻</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickReads.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
            >
              <div className="h-32 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {getCategoryIcon(item.category)}
              </div>
              <div className="p-4">
                <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <h3 className="font-bold mt-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {item.readTime}分钟
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={14} />
                    {item.heat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 分类标签 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.value
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 新闻列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
            onClick={() => setExpandedNews(expandedNews === item.id ? null : item.id)}
          >
            {/* 封面图 */}
            <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform relative">
              {getCategoryIcon(item.category)}
              {item.heat > 200000 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                  <Flame size={14} />
                  爆款
                </div>
              )}
            </div>

            {/* 内容 */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={14} />
                  {item.readTime}min
                </span>
              </div>

              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>

              <p className={`text-gray-600 text-sm leading-relaxed ${
                expandedNews === item.id ? "" : "line-clamp-2"
              }`}>
                {item.summary}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-orange-600">
                  <Flame size={16} />
                  <span className="text-sm font-semibold">{item.heat.toLocaleString()}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  {expandedNews === item.id ? "收起" : "查看详情"} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 没有数据 */}
      {filteredNews.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🤷</div>
          <p className="text-gray-500 text-lg">该分类暂无内容</p>
        </div>
      )}

      {/* 底部统计 */}
      <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">📊 今日数据统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold mb-1">{mockNews.news.length}</div>
            <div className="text-sm opacity-90">热门内容</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">
              {mockNews.news.reduce((sum, n) => sum + n.heat, 0).toLocaleString()}
            </div>
            <div className="text-sm opacity-90">总热度</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">
              {mockNews.news.filter(n => n.readTime <= 3).length}
            </div>
            <div className="text-sm opacity-90">快速阅读</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">4</div>
            <div className="text-sm opacity-90">内容分类</div>
          </div>
        </div>
      </div>
    </div>
  );
}

