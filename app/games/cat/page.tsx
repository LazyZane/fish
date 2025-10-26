"use client";

import { useState, useEffect } from "react";
import { Home, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { getCatStatus, saveCatStatus } from "@/lib/gameStorage";
import { getFishRecords } from "@/lib/storage";

const catMoods = [
  { mood: "happy", emoji: "😸", text: "今天又是快乐的摸鱼日~" },
  { mood: "sleepy", emoji: "😴", text: "Zz...让我再睡一会..." },
  { mood: "hungry", emoji: "😿", text: "好饿...给我小鱼干吧！" },
  { mood: "playful", emoji: "😼", text: "陪我玩会儿游戏吧！" },
  { mood: "lazy", emoji: "😹", text: "摸鱼真是太爽了~" }
];

const wisdoms = [
  "工作再忙，也要记得摸鱼哦~",
  "适度休息，效率更高！",
  "老板不在，快来摸鱼！",
  "今天的你，依然很棒！",
  "加班有害健康，摸鱼才是王道！",
  "放松一下，明天会更好~",
  "摸鱼不是偷懒，是战略性休息！"
];

export default function CatGame() {
  const [cat, setCat] = useState(getCatStatus());
  const [currentMood, setCurrentMood] = useState(catMoods[0]);
  const [wisdom, setWisdom] = useState("");
  const [fishPoints, setFishPoints] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    // 计算摸鱼积分
    const records = getFishRecords();
    const totalMinutes = records.reduce((sum, r) => sum + r.duration, 0);
    setFishPoints(Math.floor(totalMinutes / 10)); // 每10分钟摸鱼时间 = 1积分

    // 更新猫咪状态
    updateCatMood();
    
    // 随机显示毒鸡汤
    setWisdom(wisdoms[Math.floor(Math.random() * wisdoms.length)]);

    // 定时更新
    const interval = setInterval(() => {
      updateCatMood();
      setWisdom(wisdoms[Math.floor(Math.random() * wisdoms.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const updateCatMood = () => {
    const newMood = catMoods[Math.floor(Math.random() * catMoods.length)];
    setCurrentMood(newMood);
  };

  const feedCat = () => {
    if (fishPoints < 10) {
      showFeedbackMessage("积分不足！需要10积分才能喂食");
      return;
    }

    const newCat = { ...cat };
    newCat.hunger = Math.min(100, cat.hunger + 30);
    newCat.happiness = Math.min(100, cat.happiness + 20);
    newCat.exp += 10;
    newCat.lastFeedTime = new Date().toISOString();

    // 升级检查
    const expNeeded = cat.level * 100;
    if (newCat.exp >= expNeeded) {
      newCat.level += 1;
      newCat.exp = 0;
      showFeedbackMessage(`🎉 恭喜！${cat.name}升到${newCat.level}级了！`);
    } else {
      showFeedbackMessage("😋 喵~ 好吃！");
    }

    setCat(newCat);
    saveCatStatus(newCat);
    setFishPoints(prev => prev - 10);
  };

  const petCat = () => {
    const newCat = { ...cat };
    newCat.happiness = Math.min(100, cat.happiness + 10);
    newCat.exp += 5;

    setCat(newCat);
    saveCatStatus(newCat);
    showFeedbackMessage("😸 喵呜~ 好舒服！");
  };

  const showFeedbackMessage = (text: string) => {
    setFeedbackText(text);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const getHungerColor = () => {
    if (cat.hunger > 70) return "bg-green-500";
    if (cat.hunger > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getHappinessColor = () => {
    if (cat.happiness > 70) return "bg-pink-500";
    if (cat.happiness > 30) return "bg-purple-500";
    return "bg-gray-500";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            🐱 摸鱼养猫咪
          </h1>
          <p className="text-gray-600">陪伴你的专属摸鱼喵</p>
        </div>
        <Link href="/games">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Home size={24} />
          </button>
        </Link>
      </div>

      {/* 积分显示 */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-lg p-4 mb-6 text-white flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">摸鱼积分</p>
          <p className="text-3xl font-bold">{fishPoints}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">获取方式</p>
          <p className="text-xs">每摸鱼10分钟 = 1积分</p>
        </div>
      </div>

      {/* 猫咪信息卡 */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{cat.name}</h2>
            <p className="text-gray-600">Lv.{cat.level}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">经验值</p>
            <p className="text-lg font-bold text-purple-600">
              {cat.exp}/{cat.level * 100}
            </p>
          </div>
        </div>

        {/* 经验进度条 */}
        <div className="mb-6">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(cat.exp / (cat.level * 100)) * 100}%` }}
            />
          </div>
        </div>

        {/* 猫咪主体 */}
        <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 mb-6">
          <div className="text-center">
            <div className="text-9xl mb-4 animate-bounce">
              {currentMood.emoji}
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg inline-block">
              <p className="text-lg font-medium">{currentMood.text}</p>
            </div>
          </div>

          {/* 反馈提示 */}
          {showFeedback && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-6 py-3 rounded-full font-bold animate-bounce z-10">
              {feedbackText}
            </div>
          )}
        </div>

        {/* 状态栏 */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1">
                🍖 饱食度
              </span>
              <span className="text-sm font-bold">{cat.hunger}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getHungerColor()} transition-all duration-500`}
                style={{ width: `${cat.hunger}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1">
                ❤️ 快乐度
              </span>
              <span className="text-sm font-bold">{cat.happiness}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getHappinessColor()} transition-all duration-500`}
                style={{ width: `${cat.happiness}%` }}
              />
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={feedCat}
            disabled={fishPoints < 10}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>🍖</span>
            <span>喂食 (10积分)</span>
          </button>

          <button
            onClick={petCat}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            <Heart size={20} />
            <span>抚摸</span>
          </button>
        </div>
      </div>

      {/* 毒鸡汤 */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white text-center mb-6">
        <Sparkles className="inline-block mb-2" size={24} />
        <p className="text-lg font-medium italic">"{wisdom}"</p>
      </div>

      {/* 说明 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-lg mb-3">📖 养猫说明</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>• <strong>获取积分：</strong>通过摸鱼计时器记录摸鱼时间，每10分钟=1积分</li>
          <li>• <strong>喂食：</strong>消耗10积分，增加饱食度和快乐度，获得经验值</li>
          <li>• <strong>抚摸：</strong>免费互动，增加快乐度和少量经验值</li>
          <li>• <strong>升级：</strong>经验值满后自动升级，等级越高需要的经验越多</li>
          <li>• <strong>状态：</strong>饱食度和快乐度会随时间缓慢下降（暂未实现）</li>
        </ul>
      </div>
    </div>
  );
}

