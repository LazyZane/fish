import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "请输入文本内容" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // 如果没有API Key，返回模拟数据
      return NextResponse.json({
        emotion: getSimulatedEmotion(text),
        intensity: Math.floor(Math.random() * 5) + 5,
        keywords: extractKeywords(text),
        advice: getSimulatedAdvice(text)
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `你是一位专业的职场心理咨询师。请分析以下文本的情绪状态：

文本：${text}

请以JSON格式返回，不要包含markdown代码块标记，直接返回纯JSON：
{
  "emotion": "情绪类型(只能是以下之一: happy, sad, angry, anxious, calm, depressed)",
  "intensity": 情绪强度(0-10的数字),
  "keywords": ["关键词1", "关键词2", "关键词3"],
  "advice": "简短的情绪调节建议(50字内)"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // 清理响应文本，移除可能的markdown标记
    let cleanText = responseText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/, '').replace(/```\n?$/, '');
    }
    
    const analysis = JSON.parse(cleanText);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Emotion analysis error:", error);
    
    // 出错时返回模拟数据
    const { text } = await request.json();
    return NextResponse.json({
      emotion: getSimulatedEmotion(text),
      intensity: Math.floor(Math.random() * 5) + 5,
      keywords: extractKeywords(text),
      advice: getSimulatedAdvice(text)
    });
  }
}

// 模拟情绪识别
function getSimulatedEmotion(text: string): string {
  const negativeWords = ["累", "烦", "气", "恨", "讨厌", "垃圾", "糟糕", "差", "烂", "无聊"];
  const anxiousWords = ["担心", "焦虑", "紧张", "害怕", "压力", "忐忑", "不安"];
  const happyWords = ["开心", "高兴", "快乐", "幸福", "哈哈", "笑", "棒", "好", "赞"];
  const sadWords = ["难过", "伤心", "失望", "沮丧", "郁闷", "孤独"];
  
  const lowerText = text.toLowerCase();
  
  if (anxiousWords.some(w => lowerText.includes(w))) return "anxious";
  if (sadWords.some(w => lowerText.includes(w))) return "sad";
  if (negativeWords.some(w => lowerText.includes(w))) return "angry";
  if (happyWords.some(w => lowerText.includes(w))) return "happy";
  
  return "calm";
}

// 提取关键词
function extractKeywords(text: string): string[] {
  const words = text.split(/[\s,，。.!！?？]+/).filter(w => w.length > 1);
  return words.slice(0, 5);
}

// 模拟建议
function getSimulatedAdvice(text: string): string {
  const emotion = getSimulatedEmotion(text);
  
  const adviceMap: Record<string, string> = {
    anxious: "检测到焦虑情绪，试试5-4-3-2-1正念练习：找出5个看到的、4个摸到的、3个听到的、2个闻到的、1个尝到的东西。",
    angry: "深呼吸三次，每次吸气4秒、屏息4秒、呼气4秒。暂时离开让你生气的环境，喝杯水冷静一下。",
    sad: "允许自己难过，这是正常的情绪。适当运动可以改善心情，找信任的人聊聊天也会有帮助。",
    depressed: "长期情绪低落需要重视。保持规律作息，适度运动，必要时寻求专业心理咨询师的帮助。",
    happy: "太好了！保持这份好心情，可以记录下让你快乐的事情，在低落时回顾它们。",
    calm: "平静的心态很棒！继续保持内心的平和，定期做些让自己放松的事情。"
  };
  
  return adviceMap[emotion] || "保持积极心态，关注自己的情绪变化。";
}

