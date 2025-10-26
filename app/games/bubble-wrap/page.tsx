"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { saveGameScore, generateId } from "@/lib/storage";

const GRID_SIZE = 8; // 8x8网格

export default function BubbleWrapGame() {
  const [bubbles, setBubbles] = useState<boolean[][]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    initBubbles();
    if (typeof window !== 'undefined') {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }
  }, []);

  const initBubbles = () => {
    const newBubbles = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(true)
    );
    setBubbles(newBubbles);
    setPoppedCount(0);
  };

  const playPopSound = () => {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800 + Math.random() * 200;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);

    // 震动反馈
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const popBubble = (row: number, col: number) => {
    if (!bubbles[row][col]) return;

    playPopSound();

    const newBubbles = bubbles.map((r, ri) => 
      r.map((cell, ci) => (ri === row && ci === col) ? false : cell)
    );
    setBubbles(newBubbles);
    setPoppedCount(prev => prev + 1);

    // 全部爆完自动重置
    if (poppedCount + 1 === GRID_SIZE * GRID_SIZE) {
      setTimeout(() => {
        saveGameScore({
          id: generateId(),
          gameId: 'bubble-wrap',
          gameName: '气泡纸',
          score: GRID_SIZE * GRID_SIZE,
          fishPoints: 10,
          timestamp: new Date().toISOString()
        });
        alert('🎉 全部爆完！解压成功！');
        initBubbles();
      }, 500);
    }
  };

  const allPopped = poppedCount === GRID_SIZE * GRID_SIZE;
  const progress = (poppedCount / (GRID_SIZE * GRID_SIZE)) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            💥 气泡纸
          </h1>
          <p className="text-gray-600">点击爆破，释放压力</p>
        </div>
        <Link href="/games">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Home size={24} />
          </button>
        </Link>
      </div>

      {/* 控制栏 */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-sm text-gray-600">已爆破</span>
              <p className="text-2xl font-bold text-blue-600">
                {poppedCount} / {GRID_SIZE * GRID_SIZE}
              </p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <span className="text-sm text-gray-600">完成度</span>
              <p className="text-2xl font-bold text-green-600">
                {progress.toFixed(0)}%
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={initBubbles}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 气泡网格 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-6">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
          {bubbles.map((row, ri) => 
            row.map((bubble, ci) => (
              <button
                key={`${ri}-${ci}`}
                onClick={() => popBubble(ri, ci)}
                disabled={!bubble}
                className={`aspect-square rounded-2xl transition-all duration-200 ${
                  bubble
                    ? 'bg-gradient-to-br from-blue-400 to-purple-400 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-gray-200 cursor-not-allowed opacity-50'
                }`}
                style={{
                  boxShadow: bubble ? 'inset 0 -4px 8px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {bubble && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white/30"></div>
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* 提示 */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          💡 提示：点击气泡爆破，全部爆完自动重置
        </p>
        {soundEnabled && (
          <p className="text-green-600 text-xs mt-1">
            🔊 音效已开启
          </p>
        )}
      </div>

      {/* 解压语录 */}
      <div className="mt-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white text-center">
        <p className="text-lg font-medium">
          {allPopped 
            ? "🎉 全部爆完！压力释放完毕！" 
            : progress > 50 
            ? "💪 继续！一半以上了！"
            : "🎯 加油！让压力通通爆破！"}
        </p>
      </div>
    </div>
  );
}

