"use client";

import { useState, useEffect, useRef } from "react";
import { Home, Play, Pause, RotateCcw } from "lucide-react";
import Link from "next/link";
import { saveGameScore } from "@/lib/gameStorage";
import { generateId } from "@/lib/storage";

const negativeWords = [
  "加班", "996", "007", "PUA", "内卷", "裁员", "画饼",
  "开会", "PPT", "甩锅", "背锅", "催促", "延期", "Bug",
  "需求变更", "临时任务", "周末加班", "通宵", "赶工期",
  "无效沟通", "形式主义", "领导", "KPI", "考核", "打卡"
];

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

export default function TypingGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const gameLoopRef = useRef<number>();
  const spawnTimerRef = useRef<number>();

  useEffect(() => {
    if (isPlaying && !gameOver) {
      // 游戏循环
      gameLoopRef.current = window.setInterval(() => {
        setFallingWords(prev => 
          prev.map(word => ({
            ...word,
            y: word.y + word.speed
          })).filter(word => word.y < 500) // 移除超出屏幕的词
        );
      }, 50);

      // 生成新词
      spawnTimerRef.current = window.setInterval(() => {
        spawnWord();
      }, 2000);

      // 倒计时
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(gameLoopRef.current);
        clearInterval(spawnTimerRef.current);
        clearInterval(timer);
      };
    }
  }, [isPlaying, gameOver]);

  const spawnWord = () => {
    const word: FallingWord = {
      id: Date.now(),
      text: negativeWords[Math.floor(Math.random() * negativeWords.length)],
      x: Math.random() * 80 + 10, // 10% - 90%
      y: 0,
      speed: 2 + Math.random() * 2
    };
    setFallingWords(prev => [...prev, word]);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCombo(0);
    setTimeLeft(60);
    setFallingWords([]);
    setInputValue("");
    inputRef.current?.focus();
    
    // 初始生成几个词
    setTimeout(() => spawnWord(), 500);
    setTimeout(() => spawnWord(), 1500);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    clearInterval(gameLoopRef.current);
    clearInterval(spawnTimerRef.current);

    // 保存分数
    saveGameScore({
      id: generateId(),
      gameId: 'typing-game',
      gameName: '打字消除',
      score: score,
      fishPoints: Math.floor(score / 10),
      timestamp: new Date().toISOString()
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 检查是否匹配任何掉落的词
    const matchedWord = fallingWords.find(word => word.text === value);
    if (matchedWord) {
      // 消除词汇
      setFallingWords(prev => prev.filter(w => w.id !== matchedWord.id));
      setScore(prev => prev + 10 + combo * 2);
      setCombo(prev => prev + 1);
      setInputValue("");

      // 震动反馈
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
  };

  const resetCombo = () => {
    if (combo > 0) {
      setTimeout(() => setCombo(0), 2000);
    }
  };

  useEffect(() => {
    resetCombo();
  }, [combo]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            ⌨️ 打字消除
          </h1>
          <p className="text-gray-600">快速打字消灭工作烦恼</p>
        </div>
        <Link href="/games">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Home size={24} />
          </button>
        </Link>
      </div>

      {/* 游戏统计 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">分数</p>
          <p className="text-3xl font-bold text-blue-600">{score}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">连击</p>
          <p className="text-3xl font-bold text-purple-600">x{combo}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">剩余时间</p>
          <p className="text-3xl font-bold text-red-600">{timeLeft}s</p>
        </div>
      </div>

      {/* 游戏区域 */}
      <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-2xl overflow-hidden" style={{ height: '500px' }}>
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
            <div className="text-6xl mb-4">⌨️</div>
            <h2 className="text-2xl font-bold mb-4">打字消除游戏</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              输入掉落的词汇消灭它们！<br/>
              消除越多，分数越高！
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all"
            >
              <Play size={24} />
              开始游戏
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">游戏结束！</h2>
            <p className="text-5xl font-bold text-purple-600 mb-4">{score}分</p>
            <p className="text-gray-600 mb-6">
              最高连击: x{combo}
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:shadow-lg transition-all"
            >
              <RotateCcw size={24} />
              再来一局
            </button>
          </div>
        )}

        {/* 掉落的词汇 */}
        {isPlaying && fallingWords.map(word => (
          <div
            key={word.id}
            className="absolute bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all"
            style={{
              left: `${word.x}%`,
              top: `${word.y}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {word.text}
          </div>
        ))}

        {/* 连击提示 */}
        {combo > 2 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-6 py-2 rounded-full font-bold text-lg animate-bounce">
            🔥 {combo}连击！
          </div>
        )}
      </div>

      {/* 输入框 */}
      <div className="mt-6">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInput}
          disabled={!isPlaying}
          placeholder={isPlaying ? "输入上方的词汇..." : "点击开始游戏"}
          className="w-full px-6 py-4 text-2xl text-center border-4 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-500 disabled:bg-gray-100 font-bold"
        />
      </div>

      {/* 玩法说明 */}
      <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-lg mb-3">📖 玩法说明</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 屏幕上方会掉落工作相关的负面词汇</li>
          <li>• 在输入框快速打字，完全匹配后词汇消失</li>
          <li>• 连续消除可获得连击加分</li>
          <li>• 60秒内尽可能消除更多词汇</li>
          <li>• 词汇掉到底部不会扣分，但会消失</li>
        </ul>
      </div>

      {/* 词汇列表参考 */}
      <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="font-bold text-lg mb-3">💡 常见词汇参考</h3>
        <div className="flex flex-wrap gap-2">
          {negativeWords.slice(0, 15).map(word => (
            <span key={word} className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

