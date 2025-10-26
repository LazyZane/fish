"use client";

import { useState, useEffect, useRef } from "react";
import { Home, Play, Pause, Volume2, VolumeX, Moon, Sun, Cloud, Droplets, Wind, Waves } from "lucide-react";
import Link from "next/link";

interface SoundOption {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
  frequency?: number; // 用于生成音效的频率
}

const soundOptions: SoundOption[] = [
  {
    id: "rain",
    name: "雨声",
    icon: Droplets,
    description: "淅淅沥沥的雨声",
    color: "from-blue-400 to-cyan-400",
    frequency: 200
  },
  {
    id: "ocean",
    name: "海浪",
    icon: Waves,
    description: "平静的海浪声",
    color: "from-blue-500 to-indigo-500",
    frequency: 150
  },
  {
    id: "wind",
    name: "风声",
    icon: Wind,
    description: "轻柔的风吹过",
    color: "from-gray-400 to-slate-500",
    frequency: 100
  },
  {
    id: "night",
    name: "夜晚虫鸣",
    icon: Moon,
    description: "宁静的夏夜",
    color: "from-indigo-600 to-purple-600",
    frequency: 300
  },
  {
    id: "white",
    name: "白噪音",
    icon: Cloud,
    description: "纯净的白噪音",
    color: "from-gray-300 to-gray-400",
    frequency: 0
  }
];

const breathingExercises = [
  {
    name: "4-7-8呼吸法",
    description: "吸气4秒，憋气7秒，呼气8秒",
    pattern: [
      { phase: "吸气", duration: 4, color: "bg-blue-500" },
      { phase: "屏息", duration: 7, color: "bg-purple-500" },
      { phase: "呼气", duration: 8, color: "bg-green-500" }
    ]
  },
  {
    name: "正念呼吸",
    description: "吸气5秒，呼气5秒",
    pattern: [
      { phase: "吸气", duration: 5, color: "bg-blue-500" },
      { phase: "呼气", duration: 5, color: "bg-green-500" }
    ]
  },
  {
    name: "放松呼吸",
    description: "吸气3秒，呼气6秒",
    pattern: [
      { phase: "吸气", duration: 3, color: "bg-blue-500" },
      { phase: "呼气", duration: 6, color: "bg-green-500" }
    ]
  }
];

const sleepTips = [
  "🌙 睡前1小时远离电子设备",
  "☕ 下午3点后避免咖啡因",
  "🛏️ 保持卧室凉爽、黑暗、安静",
  "⏰ 保持规律的作息时间",
  "🧘 睡前冥想或深呼吸",
  "📱 不要在床上工作或看手机",
  "🌡️ 室温保持在18-22℃最佳",
  "💤 感到困倦时再上床"
];

export default function SleepAidPage() {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(0); // 0表示无限播放
  const [timeLeft, setTimeLeft] = useState(0);
  
  // 呼吸练习
  const [breathingActive, setBreathingActive] = useState(false);
  const [selectedBreathing, setSelectedBreathing] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [breathingProgress, setBreathingProgress] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;
    }

    return () => {
      stopSound();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying && timer > 0) {
      setTimeLeft(timer * 60);
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, timer]);

  const generateNoise = (type: string) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const soundOption = soundOptions.find(s => s.id === type);
    
    if (type === "white") {
      // 白噪音
      const bufferSize = 4096;
      const whiteNoise = ctx.createScriptProcessor(bufferSize, 1, 1);
      whiteNoise.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      };

      const gainNode = ctx.createGain();
      gainNode.gain.value = isMuted ? 0 : volume * 0.3;
      gainNodeRef.current = gainNode;

      whiteNoise.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      return;
    }

    // 其他音效使用振荡器模拟
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = soundOption?.frequency || 200;
    
    gainNode.gain.value = isMuted ? 0 : volume * 0.2;
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();

    // 添加一些变化让声音更自然
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.5;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 20;
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    lfo.start();
  };

  const playSound = (soundId: string) => {
    stopSound();
    setSelectedSound(soundId);
    setIsPlaying(true);
    generateNoise(soundId);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else if (selectedSound) {
      playSound(selectedSound);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.value = newVolume * 0.2;
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newMuted ? 0 : volume * 0.2;
    }
  };

  // 呼吸练习
  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingPhase(0);
    setBreathingProgress(0);
    runBreathingCycle();
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }
  };

  const runBreathingCycle = () => {
    const exercise = breathingExercises[selectedBreathing];
    let currentPhase = 0;
    let progress = 0;

    breathingIntervalRef.current = setInterval(() => {
      const phase = exercise.pattern[currentPhase];
      progress += 0.1;

      if (progress >= phase.duration) {
        progress = 0;
        currentPhase = (currentPhase + 1) % exercise.pattern.length;
      }

      setBreathingPhase(currentPhase);
      setBreathingProgress((progress / phase.duration) * 100);
    }, 100);
  };

  useEffect(() => {
    if (breathingActive) {
      runBreathingCycle();
    }
    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [breathingActive, selectedBreathing]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            😴 助眠中心
          </h1>
          <p className="text-gray-600">白噪音、呼吸练习，帮你快速入睡</p>
        </div>
        <Link href="/games">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Home size={24} />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：白噪音 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 音效选择 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">🎵 舒缓音效</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {soundOptions.map(sound => {
                const Icon = sound.icon;
                const isSelected = selectedSound === sound.id;
                return (
                  <button
                    key={sound.id}
                    onClick={() => playSound(sound.id)}
                    className={`p-6 rounded-xl transition-all ${
                      isSelected
                        ? `bg-gradient-to-br ${sound.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={32} className="mx-auto mb-2" />
                    <p className="font-semibold">{sound.name}</p>
                    <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {sound.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 播放控制 */}
          {selectedSound && (
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90">正在播放</p>
                  <p className="text-2xl font-bold">
                    {soundOptions.find(s => s.id === selectedSound)?.name}
                  </p>
                </div>
                {timer > 0 && timeLeft > 0 && (
                  <div className="text-right">
                    <p className="text-sm opacity-90">剩余时间</p>
                    <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={togglePlay}
                  className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>

                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* 定时器设置 */}
              <div>
                <p className="text-sm mb-2">定时关闭</p>
                <div className="flex gap-2">
                  {[0, 15, 30, 60].map(time => (
                    <button
                      key={time}
                      onClick={() => setTimer(time)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        timer === time
                          ? 'bg-white text-indigo-600'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {time === 0 ? '无限' : `${time}分钟`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 呼吸练习 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">🧘 呼吸练习</h3>
            
            <div className="flex gap-2 mb-6">
              {breathingExercises.map((exercise, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedBreathing(idx)}
                  className={`flex-1 p-3 rounded-lg transition-all ${
                    selectedBreathing === idx
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <p className="font-semibold text-sm">{exercise.name}</p>
                  <p className={`text-xs mt-1 ${
                    selectedBreathing === idx ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {exercise.description}
                  </p>
                </button>
              ))}
            </div>

            {/* 呼吸动画 */}
            {breathingActive && (
              <div className="relative h-64 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-48 h-48 rounded-full ${
                      breathingExercises[selectedBreathing].pattern[breathingPhase].color
                    } transition-all duration-300`}
                    style={{
                      transform: `scale(${0.5 + breathingProgress / 200})`,
                      opacity: 0.7
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-gray-800 mb-2">
                    {breathingExercises[selectedBreathing].pattern[breathingPhase].phase}
                  </p>
                  <p className="text-6xl font-bold text-blue-600">
                    {Math.ceil((breathingExercises[selectedBreathing].pattern[breathingPhase].duration * (100 - breathingProgress)) / 100)}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={breathingActive ? stopBreathing : startBreathing}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                  breathingActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white'
                }`}
              >
                {breathingActive ? '停止练习' : '开始练习'}
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：助眠小贴士 */}
        <div className="space-y-6">
          {/* 睡眠小贴士 */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Moon size={20} />
              睡眠小贴士
            </h3>
            <ul className="space-y-2 text-sm">
              {sleepTips.map((tip, idx) => (
                <li key={idx} className="opacity-90">{tip}</li>
              ))}
            </ul>
          </div>

          {/* 使用说明 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-3">📖 使用说明</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 选择喜欢的白噪音音效</li>
              <li>• 调节合适的音量</li>
              <li>• 设置定时关闭时间</li>
              <li>• 配合呼吸练习效果更佳</li>
              <li>• 建议戴上耳机获得更好体验</li>
            </ul>
          </div>

          {/* 快速入睡技巧 */}
          <div className="bg-blue-50 rounded-2xl shadow p-6">
            <h3 className="font-bold text-lg mb-3 text-blue-900">💤 快速入睡</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="bg-white rounded-lg p-3">
                <p className="font-semibold text-blue-900 mb-1">4-7-8呼吸法</p>
                <p className="text-xs">据说2分钟就能入睡</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-semibold text-blue-900 mb-1">身体扫描</p>
                <p className="text-xs">从头到脚依次放松肌肉</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-semibold text-blue-900 mb-1">想象放松场景</p>
                <p className="text-xs">沙滩、森林、星空...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

