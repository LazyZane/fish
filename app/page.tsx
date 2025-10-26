"use client";

import { useEffect, useState } from "react";
import { Clock, TrendingUp, Heart, MessageCircle, Newspaper } from "lucide-react";
import Link from "next/link";
import { getFishRecords, getEmotionRecords } from "@/lib/storage";
import { mockNews } from "@/lib/mockData";

export default function Home() {
  const [todayStats, setTodayStats] = useState({
    fishTime: 0,
    earnings: 0,
    fishRatio: 0,
    emotion: "平静",
    emotionEmoji: "😌"
  });

  useEffect(() => {
    // 加载今日统计数据
    const records = getFishRecords();
    const emotions = getEmotionRecords();
    
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => r.date === today);
    const totalMinutes = todayRecords.reduce((sum, r) => sum + r.duration, 0);
    const totalEarnings = todayRecords.reduce((sum, r) => sum + r.earnings, 0);
    
    // 获取最新情绪
    const latestEmotion = emotions[0];
    const emotionMap: Record<string, string> = {
      happy: "😊 快乐",
      sad: "😢 悲伤",
      angry: "😡 愤怒",
      anxious: "😰 焦虑",
      calm: "😌 平静",
      depressed: "😔 沮丧"
    };

    setTodayStats({
      fishTime: totalMinutes,
      earnings: totalEarnings,
      fishRatio: Math.round((totalMinutes / (8 * 60)) * 100),
      emotion: latestEmotion ? emotionMap[latestEmotion.emotion]?.split(' ')[1] || "平静" : "平静",
      emotionEmoji: latestEmotion ? emotionMap[latestEmotion.emotion]?.split(' ')[0] || "😌" : "😌"
    });
  }, []);

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}小时${m}分钟`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <span className="animate-float">🐟</span>
          <span>FishTime</span>
        </h1>
        <p className="text-xl text-gray-600 italic">
          "摸鱼不是偷懒，而是职场自我修复的一部分"
        </p>
      </div>

      {/* 今日概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-medium">今日摸鱼时长</h3>
            <Clock className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {todayStats.fishTime > 0 ? formatTime(todayStats.fishTime) : "0分钟"}
          </p>
          <p className="text-sm text-gray-500 mt-2">继续保持节奏~</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-green-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-medium">摸鱼收益</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-green-600">
            ¥{todayStats.earnings.toFixed(1)}
          </p>
          <p className="text-sm text-gray-500 mt-2">今日摸鱼价值</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-medium">摸鱼投入比</h3>
            <div className="text-2xl">{todayStats.emotionEmoji}</div>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {todayStats.fishRatio}%
          </p>
          <p className="text-sm text-gray-500 mt-2">健康范围内</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-pink-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-medium">当前情绪</h3>
            <Heart className="text-pink-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-pink-600">
            {todayStats.emotion}
          </p>
          <p className="text-sm text-gray-500 mt-2">保持好心情</p>
        </div>
      </div>

      {/* 今日一瓜 Banner */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-3xl shadow-2xl p-8 mb-12 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🍉</span>
          <h2 className="text-2xl font-bold">今日一瓜</h2>
        </div>
        <h3 className="text-xl font-semibold mb-3">
          {mockNews.todayHighlight.title}
        </h3>
        <p className="text-white/90 mb-4 leading-relaxed">
          {mockNews.todayHighlight.content}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            🔥 热度 {mockNews.todayHighlight.heat.toLocaleString()}
          </span>
          <Link 
            href="/news" 
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            查看更多 →
          </Link>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/fish-timer">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-blue-300">
            <div className="text-5xl mb-4 text-center">⏱️</div>
            <h3 className="text-xl font-bold text-center mb-2">摸鱼计时器</h3>
            <p className="text-gray-600 text-center text-sm">
              记录你的摸鱼时间，计算收益
            </p>
          </div>
        </Link>

        <Link href="/emotion">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-purple-300">
            <div className="text-5xl mb-4 text-center">😊</div>
            <h3 className="text-xl font-bold text-center mb-2">情绪分析</h3>
            <p className="text-gray-600 text-center text-sm">
              AI帮你分析情绪，给出建议
            </p>
          </div>
        </Link>

        <Link href="/complaints">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-pink-300">
            <div className="text-5xl mb-4 text-center">💬</div>
            <h3 className="text-xl font-bold text-center mb-2">吐槽吧</h3>
            <p className="text-gray-600 text-center text-sm">
              匿名分享职场经历，避雷指南
            </p>
          </div>
        </Link>

        <Link href="/games">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-300">
            <div className="text-5xl mb-4 text-center">🎮</div>
            <h3 className="text-xl font-bold text-center mb-2">游戏厅</h3>
            <p className="text-gray-600 text-center text-sm">
              解压小游戏，快速放松
            </p>
          </div>
        </Link>
      </div>

      {/* 最新吐槽预览 */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MessageCircle className="text-pink-500" />
            最新吐槽
          </h2>
          <Link href="/complaints" className="text-blue-600 hover:text-blue-700 font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm text-gray-500">匿名摸鱼人#{1000 + idx}</span>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">互联网</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">北京</span>
                  </div>
                </div>
                <span className="text-xl">😤</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {idx === 0 ? "画饼一流，兑现无能。说好的期权呢？🙄" : "天天开会，会议开完工作就下班了，实际工作时间为零..."}
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span>👍 {234 + idx * 100}</span>
                <span>💬 {45 + idx * 10}</span>
                <span>2小时前</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 热门八卦预览 */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="text-orange-500" />
            热门八卦
          </h2>
          <Link href="/news" className="text-blue-600 hover:text-blue-700 font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockNews.news.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-6xl">
                {item.category === "明星八卦" ? "⭐" : item.category === "职场趣闻" ? "💼" : "🎬"}
              </div>
              <div className="p-4">
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  {item.category}
                </span>
                <h3 className="font-semibold mt-2 text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>⏱️ {item.readTime}分钟</span>
                  <span>🔥 {item.heat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

