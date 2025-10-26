"use client";

import { useState, useEffect } from "react";
import { Heart, Send, TrendingUp, Smile, Frown, Meh, AlertCircle, Loader2 } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getEmotionRecords, saveEmotionRecord, generateId } from "@/lib/storage";
import type { EmotionRecord } from "@/lib/storage";

const emotionConfig = {
  happy: { emoji: "😊", label: "快乐", color: "#10b981" },
  sad: { emoji: "😢", label: "悲伤", color: "#6366f1" },
  angry: { emoji: "😡", label: "愤怒", color: "#ef4444" },
  anxious: { emoji: "😰", label: "焦虑", color: "#f59e0b" },
  calm: { emoji: "😌", label: "平静", color: "#8b5cf6" },
  depressed: { emoji: "😔", label: "沮丧", color: "#64748b" }
};

export default function EmotionPage() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<EmotionRecord | null>(null);
  const [records, setRecords] = useState<EmotionRecord[]>([]);
  const [showAdvice, setShowAdvice] = useState(false);

  useEffect(() => {
    setRecords(getEmotionRecords());
  }, []);

  const handleAnalyze = async () => {
    if (text.trim().length === 0) {
      alert("请输入一些文字");
      return;
    }

    setIsAnalyzing(true);
    setShowAdvice(false);

    try {
      const response = await fetch("/api/analyze-emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      const record: EmotionRecord = {
        id: generateId(),
        text: text,
        emotion: result.emotion,
        intensity: result.intensity,
        keywords: result.keywords || [],
        advice: result.advice,
        timestamp: new Date().toISOString()
      };

      saveEmotionRecord(record);
      setCurrentAnalysis(record);
      setRecords([record, ...records]);
      setShowAdvice(true);
      setText("");
    } catch (error) {
      console.error("分析失败:", error);
      alert("分析失败，请重试");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 统计数据
  const emotionStats = Object.keys(emotionConfig).map(emotion => ({
    name: emotionConfig[emotion as keyof typeof emotionConfig].label,
    value: records.filter(r => r.emotion === emotion).length,
    color: emotionConfig[emotion as keyof typeof emotionConfig].color
  })).filter(item => item.value > 0);

  // 近7天情绪趋势
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const weeklyEmotions = last7Days.map(date => {
    const dayRecords = records.filter(r => r.timestamp.startsWith(date));
    const avgIntensity = dayRecords.length > 0
      ? dayRecords.reduce((sum, r) => sum + r.intensity, 0) / dayRecords.length
      : 0;
    
    return {
      date: date.slice(5),
      intensity: parseFloat(avgIntensity.toFixed(1)),
      count: dayRecords.length
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Heart className="text-pink-500" size={40} />
          情绪分析
        </h1>
        <p className="text-gray-600">AI帮你分析情绪，给出专业建议</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 输入分析区 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 输入框 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">说说你的感受</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="在这里写下你的想法和感受吧...&#10;比如：今天被领导批评了，心里很不舒服..."
              className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">{text.length}/500</span>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || text.trim().length === 0}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    分析中...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    分析我的情绪
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 分析结果 */}
          {currentAnalysis && showAdvice && (
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white animate-fade-in">
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">
                  {emotionConfig[currentAnalysis.emotion as keyof typeof emotionConfig].emoji}
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  {emotionConfig[currentAnalysis.emotion as keyof typeof emotionConfig].label}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-lg">情绪强度：</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-6 rounded ${
                          i < currentAnalysis.intensity ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold">{currentAnalysis.intensity}/10</span>
                </div>
                {currentAnalysis.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {currentAnalysis.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">💡 情绪调节建议</h4>
                    <p className="leading-relaxed">{currentAnalysis.advice}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 情绪日记 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">情绪日记</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {records.length > 0 ? (
                records.slice(0, 10).map(record => (
                  <div key={record.id} className="border-l-4 pl-4 py-3" style={{ borderColor: emotionConfig[record.emotion as keyof typeof emotionConfig].color }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {emotionConfig[record.emotion as keyof typeof emotionConfig].emoji}
                        </span>
                        <span className="font-semibold">
                          {emotionConfig[record.emotion as keyof typeof emotionConfig].label}
                        </span>
                        <span className="text-xs text-gray-500">
                          强度: {record.intensity}/10
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(record.timestamp).toLocaleString('zh-CN', {
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                      {record.text}
                    </p>
                    {record.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {record.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  还没有情绪记录，快来记录你的第一条吧~
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 统计图表 */}
        <div className="space-y-6">
          {/* 情绪统计卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="text-purple-500" size={20} />
              情绪统计
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(emotionConfig).map(([key, config]) => {
                const count = records.filter(r => r.emotion === key).length;
                return (
                  <div key={key} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl mb-1">{config.emoji}</div>
                    <div className="text-xs text-gray-600">{config.label}</div>
                    <div className="text-lg font-bold" style={{ color: config.color }}>
                      {count}次
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 情绪分布饼图 */}
          {emotionStats.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">情绪分布</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={emotionStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emotionStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* 情绪小贴士 */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-3">💡 情绪管理小贴士</h3>
            <ul className="space-y-2 text-sm">
              <li>• 每天记录情绪有助于自我觉察</li>
              <li>• 适度运动能有效改善心情</li>
              <li>• 深呼吸是最简单的放松方式</li>
              <li>• 与信任的人分享感受很重要</li>
              <li>• 持续低落时请寻求专业帮助</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 近7天情绪强度趋势 */}
      {records.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4">近7天情绪强度趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyEmotions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="intensity"
                stroke="#8b5cf6"
                strokeWidth={3}
                name="情绪强度"
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

