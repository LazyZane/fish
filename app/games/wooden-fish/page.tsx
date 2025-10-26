"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import { getMeritCount, addMerit } from "@/lib/gameStorage";

const blessings = [
  "功德+1",
  "心想事成",
  "工作顺利",
  "远离加班",
  "升职加薪",
  "Bug退散",
  "身体健康",
  "好运连连",
  "烦恼退散",
  "福星高照"
];

export default function WoodenFishGame() {
  const [meritCount, setMeritCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isKnocking, setIsKnocking] = useState(false);
  const [blessing, setBlessing] = useState("功德+1");
  const [showBlessing, setShowBlessing] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number }[]>([]);

  useEffect(() => {
    setMeritCount(getMeritCount());
    if (typeof window !== 'undefined') {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }
  }, []);

  const playKnockSound = () => {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 木鱼音效：低频短促
    oscillator.frequency.value = 200;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  const knockWoodenFish = (e: React.MouseEvent<HTMLDivElement>) => {
    playKnockSound();
    setIsKnocking(true);
    setTimeout(() => setIsKnocking(false), 200);

    // 震动反馈
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    // 增加功德
    const newCount = addMerit(1);
    setMeritCount(newCount);

    // 随机祝福语
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    setBlessing(randomBlessing);
    setShowBlessing(true);
    setTimeout(() => setShowBlessing(false), 800);

    // 添加漂浮文字
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newText = {
      id: Date.now(),
      text: randomBlessing,
      x: x
    };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== newText.id));
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            🔔 电子木鱼
          </h1>
          <p className="text-gray-600">敲一敲，功德+1</p>
        </div>
        <Link href="/games">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Home size={24} />
          </button>
        </Link>
      </div>

      {/* 功德计数器 */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl shadow-2xl p-8 mb-6 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={24} className="animate-pulse" />
          <h2 className="text-2xl font-bold">功德值</h2>
          <Sparkles size={24} className="animate-pulse" />
        </div>
        <p className="text-6xl font-bold mb-2">{meritCount.toLocaleString()}</p>
        <p className="text-lg opacity-90">
          {meritCount < 10 && "初心者"}
          {meritCount >= 10 && meritCount < 50 && "修行者"}
          {meritCount >= 50 && meritCount < 100 && "悟道者"}
          {meritCount >= 100 && meritCount < 500 && "大师"}
          {meritCount >= 500 && "佛系摸鱼人"}
        </p>
      </div>

      {/* 木鱼主体 */}
      <div className="relative mb-6">
        <div 
          onClick={knockWoodenFish}
          className={`relative bg-gradient-to-br from-amber-600 to-orange-700 rounded-full w-80 h-80 mx-auto shadow-2xl cursor-pointer transition-transform ${
            isKnocking ? 'scale-95' : 'scale-100 hover:scale-105'
          }`}
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 -20px 40px rgba(0,0,0,0.3)'
          }}
        >
          {/* 木鱼纹理 */}
          <div className="absolute inset-0 rounded-full opacity-20">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-orange-900 rounded-full"></div>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-2 border-orange-900 rounded-full"></div>
          </div>

          {/* 中心文字 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="relative">
              <p className="text-7xl mb-2">🔔</p>
              <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
            </div>
            <p className="text-2xl font-bold">敲我</p>
          </div>

          {/* 祝福语动画 */}
          {showBlessing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold text-yellow-300 animate-bounce">
                {blessing}
              </p>
            </div>
          )}

          {/* 漂浮文字 */}
          {floatingTexts.map(text => (
            <div
              key={text.id}
              className="absolute text-xl font-bold text-yellow-300 animate-float-up pointer-events-none"
              style={{
                left: `${text.x}px`,
                top: '50%',
                animation: 'floatUp 1.5s ease-out forwards'
              }}
            >
              +1
            </div>
          ))}
        </div>

        {/* 敲击提示 */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isKnocking ? "🎵 咚~" : "👆 点击木鱼敲击"}
          </p>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span>{soundEnabled ? "关闭音效" : "开启音效"}</span>
        </button>
      </div>

      {/* 功德榜 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          📊 功德等级
        </h3>
        <div className="space-y-3">
          {[
            { level: "初心者", min: 0, max: 9, icon: "🌱" },
            { level: "修行者", min: 10, max: 49, icon: "🌿" },
            { level: "悟道者", min: 50, max: 99, icon: "🌳" },
            { level: "大师", min: 100, max: 499, icon: "⭐" },
            { level: "佛系摸鱼人", min: 500, max: Infinity, icon: "🏆" }
          ].map(rank => (
            <div
              key={rank.level}
              className={`flex items-center justify-between p-3 rounded-lg ${
                meritCount >= rank.min && meritCount <= rank.max
                  ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-400'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{rank.icon}</span>
                <div>
                  <p className="font-semibold">{rank.level}</p>
                  <p className="text-xs text-gray-500">
                    {rank.min} - {rank.max === Infinity ? '∞' : rank.max} 功德
                  </p>
                </div>
              </div>
              {meritCount >= rank.min && meritCount <= rank.max && (
                <span className="text-amber-600 font-bold">当前等级</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 祝福语录 */}
      <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white text-center">
        <p className="text-lg font-medium">
          🙏 愿你工作顺利，远离Bug，早日财务自由
        </p>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px);
          }
        }
      `}</style>
    </div>
  );
}

