"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Trophy, Clock, Star } from "lucide-react";
import Link from "next/link";
import { getGameScores, getTotalGameTime } from "@/lib/gameStorage";

const games = [
  {
    id: "bubble-wrap",
    name: "气泡纸",
    emoji: "💥",
    description: "点击爆破气泡，释放压力",
    color: "from-blue-400 to-cyan-400",
    time: "1分钟",
    difficulty: "简单"
  },
  {
    id: "wooden-fish",
    name: "敲木鱼",
    emoji: "🔔",
    description: "电子木鱼，功德+1",
    color: "from-amber-400 to-orange-400",
    time: "随心",
    difficulty: "治愈"
  },
  {
    id: "typing-game",
    name: "打字消除",
    emoji: "⌨️",
    description: "消灭工作烦恼词汇",
    color: "from-purple-400 to-pink-400",
    time: "3分钟",
    difficulty: "中等"
  },
  {
    id: "cat",
    name: "养猫咪",
    emoji: "🐱",
    description: "陪伴你的摸鱼喵",
    color: "from-green-400 to-emerald-400",
    time: "持续",
    difficulty: "休闲"
  }
];

export default function GamesPage() {
  const [stats, setStats] = useState({
    totalGames: 0,
    totalTime: 0,
    topScore: 0
  });

  useEffect(() => {
    const scores = getGameScores();
    const totalTime = getTotalGameTime();
    const topScore = scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0;

    setStats({
      totalGames: scores.length,
      totalTime,
      topScore
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* 头部 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Gamepad2 className="text-purple-500" size={40} />
          摸鱼游戏厅
        </h1>
        <p className="text-gray-600">轻松小游戏，快速解压放松</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Trophy size={24} />
            <span className="text-3xl font-bold">{stats.totalGames}</span>
          </div>
          <p className="text-sm opacity-90">游戏局数</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Clock size={24} />
            <span className="text-3xl font-bold">{stats.totalTime}</span>
          </div>
          <p className="text-sm opacity-90">游戏时长(分钟)</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Star size={24} />
            <span className="text-3xl font-bold">{stats.topScore}</span>
          </div>
          <p className="text-sm opacity-90">最高分数</p>
        </div>
      </div>

      {/* 游戏列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`}>
            <div className={`bg-gradient-to-br ${game.color} rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group`}>
              <div className="text-center">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                  {game.emoji}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {game.name}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {game.description}
                </p>
                <div className="flex justify-center gap-3 text-xs text-white/80">
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    ⏱️ {game.time}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {game.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 温馨提示 */}
      <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          💡 温馨提示
        </h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>• 所有游戏默认静音，可在游戏内开启音效</li>
          <li>• 玩游戏可获得摸鱼积分，用于兑换猫咪道具</li>
          <li>• 建议每次游戏时间控制在3-5分钟，适度摸鱼更健康</li>
          <li>• 移动端体验更佳，支持触摸操作和震动反馈</li>
        </ul>
      </div>
    </div>
  );
}

