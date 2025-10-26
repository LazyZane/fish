// LocalStorage工具类

export interface FishRecord {
  id: string;
  startTime: string;
  endTime: string;
  duration: number; // 分钟
  earnings: number;
  date: string;
}

export interface EmotionRecord {
  id: string;
  text: string;
  emotion: string;
  intensity: number;
  keywords: string[];
  advice: string;
  timestamp: string;
}

export interface UserSettings {
  hourlyRate: number;
  workHours: number;
}

const STORAGE_KEYS = {
  FISH_RECORDS: 'fishtime_fish_records',
  EMOTION_RECORDS: 'fishtime_emotion_records',
  USER_SETTINGS: 'fishtime_user_settings',
};

// Fish Records
export function getFishRecords(): FishRecord[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.FISH_RECORDS);
  return data ? JSON.parse(data) : [];
}

export function saveFishRecord(record: FishRecord): void {
  const records = getFishRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEYS.FISH_RECORDS, JSON.stringify(records));
}

export function deleteFishRecord(id: string): void {
  const records = getFishRecords();
  const filtered = records.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.FISH_RECORDS, JSON.stringify(filtered));
}

// Emotion Records
export function getEmotionRecords(): EmotionRecord[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.EMOTION_RECORDS);
  return data ? JSON.parse(data) : [];
}

export function saveEmotionRecord(record: EmotionRecord): void {
  const records = getEmotionRecords();
  records.unshift(record);
  // 保留最近100条记录
  if (records.length > 100) {
    records.splice(100);
  }
  localStorage.setItem(STORAGE_KEYS.EMOTION_RECORDS, JSON.stringify(records));
}

// User Settings
export function getUserSettings(): UserSettings {
  if (typeof window === 'undefined') return { hourlyRate: 50, workHours: 8 };
  const data = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
  return data ? JSON.parse(data) : { hourlyRate: 50, workHours: 8 };
}

export function saveUserSettings(settings: UserSettings): void {
  localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
}

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

