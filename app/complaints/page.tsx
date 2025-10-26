"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp, MapPin, Filter, TrendingUp, TrendingDown, Trophy, AlertTriangle } from "lucide-react";
import { mockComplaints, mockRedList, mockBlackList } from "@/lib/mockData";

type Tab = "complaints" | "red" | "black";
type SortBy = "hot" | "time";

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("complaints");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortBy>("hot");

  // 获取城市和行业列表
  const cities = ["all", ...Array.from(new Set(mockComplaints.map(c => c.city)))];
  const industries = ["all", ...Array.from(new Set(mockComplaints.map(c => c.industry)))];

  // 筛选和排序
  let filteredComplaints = mockComplaints.filter(c => {
    if (selectedCity !== "all" && c.city !== selectedCity) return false;
    if (selectedIndustry !== "all" && c.industry !== selectedIndustry) return false;
    return true;
  });

  if (sortBy === "hot") {
    filteredComplaints.sort((a, b) => b.likes - a.likes);
  } else {
    filteredComplaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date().getTime();
    const date = new Date(dateString).getTime();
    const diff = now - date;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "刚刚";
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}天前`;
    return `${Math.floor(days / 7)}周前`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <MessageCircle className="text-pink-500" size={40} />
          吐槽吧
        </h1>
        <p className="text-gray-600">匿名分享职场经历，建立职场透明圈</p>
      </div>

      {/* 标签页 */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("complaints")}
          className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
            activeTab === "complaints"
              ? "bg-pink-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          💬 最新吐槽
        </button>
        <button
          onClick={() => setActiveTab("red")}
          className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
            activeTab === "red"
              ? "bg-green-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          🏆 职场红榜
        </button>
        <button
          onClick={() => setActiveTab("black")}
          className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
            activeTab === "black"
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          ⚠️ 职场黑榜
        </button>
      </div>

      {/* 吐槽列表 */}
      {activeTab === "complaints" && (
        <>
          {/* 筛选栏 */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">筛选：</span>
              </div>
              
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">全部城市</option>
                {cities.slice(1).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">全部行业</option>
                {industries.slice(1).map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => setSortBy("hot")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    sortBy === "hot"
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🔥 最热
                </button>
                <button
                  onClick={() => setSortBy("time")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    sortBy === "time"
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🕒 最新
                </button>
              </div>
            </div>
          </div>

          {/* 吐槽卡片列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredComplaints.map(complaint => (
              <div
                key={complaint.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-sm text-gray-500">{complaint.author}</span>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {complaint.industry}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded flex items-center gap-1">
                        <MapPin size={12} />
                        {complaint.city}
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                        {complaint.company}
                      </span>
                    </div>
                  </div>
                  <span className="text-3xl">{complaint.emoji}</span>
                </div>

                <p className="text-gray-800 leading-relaxed mb-4">
                  {complaint.content}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                    <ThumbsUp size={16} />
                    <span>{complaint.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageCircle size={16} />
                    <span>{complaint.comments}</span>
                  </button>
                  <span className="ml-auto">{getTimeAgo(complaint.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🤷</div>
              <p className="text-gray-500 text-lg">暂无符合条件的吐槽</p>
            </div>
          )}
        </>
      )}

      {/* 红榜 */}
      {activeTab === "red" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-lg p-6 text-white mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Trophy size={28} />
              职场红榜 - 值得加入的公司特征
            </h2>
            <p>根据{mockRedList.reduce((sum, item) => sum + item.votes, 0).toLocaleString()}位打工人投票统计</p>
          </div>

          {mockRedList.map((item) => (
            <div
              key={item.rank}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    item.rank === 1 ? "bg-yellow-400 text-yellow-900" :
                    item.rank === 2 ? "bg-gray-300 text-gray-700" :
                    item.rank === 3 ? "bg-orange-400 text-orange-900" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {item.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{item.type}</h3>
                    <div className="flex items-center gap-2 text-green-600">
                      <TrendingUp size={20} />
                      <span className="font-bold">{item.votes.toLocaleString()}票</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 黑榜 */}
      {activeTab === "black" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <AlertTriangle size={28} />
              职场黑榜 - 最该避雷的公司特征
            </h2>
            <p>根据{mockBlackList.reduce((sum, item) => sum + item.votes, 0).toLocaleString()}位打工人投票统计</p>
          </div>

          {mockBlackList.map((item) => (
            <div
              key={item.rank}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-red-500"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xl font-bold">
                    {item.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{item.type}</h3>
                    <div className="flex items-center gap-2 text-red-600">
                      <TrendingDown size={20} />
                      <span className="font-bold">{item.votes.toLocaleString()}票</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

