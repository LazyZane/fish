"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, StopCircle, Clock, TrendingUp, Settings2 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getFishRecords, saveFishRecord, getUserSettings, saveUserSettings, generateId } from "@/lib/storage";
import type { FishRecord } from "@/lib/storage";

export default function FishTimerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [records, setRecords] = useState<FishRecord[]>([]);
  const [settings, setSettings] = useState({ hourlyRate: 50, workHours: 8 });
  const [showSettings, setShowSettings] = useState(false);
  const startTimeRef = useRef<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setRecords(getFishRecords());
    setSettings(getUserSettings());
  }, []);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = new Date().toISOString();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    if (seconds > 0) {
      const minutes = Math.floor(seconds / 60);
      const earnings = (settings.hourlyRate / 60) * minutes;
      const record: FishRecord = {
        id: generateId(),
        startTime: startTimeRef.current,
        endTime: new Date().toISOString(),
        duration: minutes,
        earnings: parseFloat(earnings.toFixed(2)),
        date: new Date().toISOString().split('T')[0]
      };
      saveFishRecord(record);
      setRecords([record, ...records]);
    }
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentEarnings = ((settings.hourlyRate / 3600) * seconds).toFixed(2);

  // 统计数据
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = records.filter(r => r.date === today);
  const todayTotal = todayRecords.reduce((sum, r) => sum + r.duration, 0);
  const todayEarnings = todayRecords.reduce((sum, r) => sum + r.earnings, 0);
  const fishRatio = Math.round((todayTotal / (settings.workHours * 60)) * 100);

  // 近7天数据
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const weeklyData = last7Days.map(date => {
    const dayRecords = records.filter(r => r.date === date);
    const total = dayRecords.reduce((sum, r) => sum + r.duration, 0);
    const earnings = dayRecords.reduce((sum, r) => sum + r.earnings, 0);
    return {
      date: date.slice(5),
      minutes: total,
      earnings: parseFloat(earnings.toFixed(1))
    };
  });

  // 时间段分布
  const timeDistribution = [
    { name: "上午(9-12)", value: 0, color: "#3b82f6" },
    { name: "下午(12-18)", value: 0, color: "#8b5cf6" },
    { name: "晚上(18-24)", value: 0, color: "#ec4899" }
  ];

  records.forEach(r => {
    const hour = new Date(r.startTime).getHours();
    if (hour >= 9 && hour < 12) timeDistribution[0].value += r.duration;
    else if (hour >= 12 && hour < 18) timeDistribution[1].value += r.duration;
    else if (hour >= 18) timeDistribution[2].value += r.duration;
  });

  const handleSaveSettings = () => {
    saveUserSettings(settings);
    setShowSettings(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Clock className="text-blue-500" size={40} />
          摸鱼计时器
        </h1>
        <p className="text-gray-600">记录你的摸鱼时间，计算真实收益</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 计时器主区域 */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="text-7xl font-bold mb-4 font-mono tracking-wider">
                {formatTime(seconds)}
              </div>
              <div className="text-2xl mb-2">
                本次摸鱼收益：<span className="font-bold">¥{currentEarnings}</span>
              </div>
              <div className="text-sm opacity-90">
                时薪：¥{settings.hourlyRate}/小时
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Play size={24} />
                  开始摸鱼
                </button>
              ) : (
                <>
                  <button
                    onClick={handlePause}
                    className="bg-white/90 text-purple-600 px-6 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-all shadow-lg"
                  >
                    <Pause size={20} />
                    {isPaused ? "继续" : "暂停"}
                  </button>
                  <button
                    onClick={handleStop}
                    className="bg-red-500 text-white px-6 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg"
                  >
                    <StopCircle size={20} />
                    结束
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 今日统计 */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-gray-600 text-sm mb-2">今日摸鱼</div>
              <div className="text-3xl font-bold text-blue-600">
                {Math.floor(todayTotal / 60)}h {todayTotal % 60}m
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-gray-600 text-sm mb-2">今日收益</div>
              <div className="text-3xl font-bold text-green-600">
                ¥{todayEarnings.toFixed(1)}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-gray-600 text-sm mb-2">摸鱼投入比</div>
              <div className="text-3xl font-bold text-purple-600">
                {fishRatio}%
              </div>
            </div>
          </div>
        </div>

        {/* 设置和历史 */}
        <div className="space-y-6">
          {/* 设置卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Settings2 size={20} className="text-gray-600" />
                设置
              </h3>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-blue-600 text-sm hover:text-blue-700"
              >
                {showSettings ? "收起" : "展开"}
              </button>
            </div>
            {showSettings && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    时薪 (元/小时)
                  </label>
                  <input
                    type="number"
                    value={settings.hourlyRate}
                    onChange={(e) => setSettings({ ...settings, hourlyRate: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    每日工作时长 (小时)
                  </label>
                  <input
                    type="number"
                    value={settings.workHours}
                    onChange={(e) => setSettings({ ...settings, workHours: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  保存设置
                </button>
              </div>
            )}
          </div>

          {/* 今日摸鱼记录 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">今日记录</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {todayRecords.length > 0 ? (
                todayRecords.map(record => (
                  <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{record.duration}分钟</div>
                      <div className="text-xs text-gray-500">
                        {new Date(record.startTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">
                      +¥{record.earnings}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  还没有摸鱼记录呢~
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 数据可视化 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 近7天趋势 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-500" size={20} />
            近7天摸鱼趋势
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="minutes" stroke="#3b82f6" fill="#93c5fd" name="摸鱼时长(分钟)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 近7天收益 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4">近7天摸鱼收益</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" fill="#10b981" name="收益(元)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 时间段分布 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-lg mb-4">摸鱼时间段分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={timeDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {timeDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

