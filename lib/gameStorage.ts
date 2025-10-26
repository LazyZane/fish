// 游戏数据存储

export interface GameScore {
  id: string;
  gameId: string;
  gameName: string;
  score: number;
  fishPoints: number; // 兑换的摸鱼积分
  timestamp: string;
}

export interface CatStatus {
  name: string;
  level: number;
  exp: number;
  hunger: number;
  happiness: number;
  lastFeedTime: string;
  items: string[];
}

const STORAGE_KEYS = {
  GAME_SCORES: 'fishtime_game_scores',
  CAT_STATUS: 'fishtime_cat_status',
  MERIT_COUNT: 'fishtime_merit_count', // 功德值
};

// 游戏分数
export function getGameScores(): GameScore[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.GAME_SCORES);
  return data ? JSON.parse(data) : [];
}

export function saveGameScore(score: GameScore): void {
  const scores = getGameScores();
  scores.unshift(score);
  // 保留最近100条记录
  if (scores.length > 100) {
    scores.splice(100);
  }
  localStorage.setItem(STORAGE_KEYS.GAME_SCORES, JSON.stringify(scores));
}

// 猫咪状态
export function getCatStatus(): CatStatus {
  if (typeof window === 'undefined') {
    return {
      name: '摸鱼喵',
      level: 1,
      exp: 0,
      hunger: 100,
      happiness: 100,
      lastFeedTime: new Date().toISOString(),
      items: []
    };
  }
  const data = localStorage.getItem(STORAGE_KEYS.CAT_STATUS);
  return data ? JSON.parse(data) : {
    name: '摸鱼喵',
    level: 1,
    exp: 0,
    hunger: 100,
    happiness: 100,
    lastFeedTime: new Date().toISOString(),
    items: []
  };
}

export function saveCatStatus(status: CatStatus): void {
  localStorage.setItem(STORAGE_KEYS.CAT_STATUS, JSON.stringify(status));
}

// 功德值
export function getMeritCount(): number {
  if (typeof window === 'undefined') return 0;
  const data = localStorage.getItem(STORAGE_KEYS.MERIT_COUNT);
  return data ? parseInt(data) : 0;
}

export function addMerit(count: number): number {
  const current = getMeritCount();
  const newCount = current + count;
  localStorage.setItem(STORAGE_KEYS.MERIT_COUNT, newCount.toString());
  return newCount;
}

// 统计游戏总时长
export function getTotalGameTime(): number {
  const scores = getGameScores();
  return scores.length * 3; // 假设每局游戏平均3分钟
}

// 获取游戏排行榜
export function getGameRanking(gameId: string, limit: number = 10): GameScore[] {
  const scores = getGameScores();
  return scores
    .filter(s => s.gameId === gameId)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

