# 🐟 FishTime - 职场摸鱼解压平台

> "摸鱼不是偷懒，而是职场自我修复的一部分"

一个帮助职场人缓解焦虑、释放情绪、合理摸鱼的数据化平台。

## ✨ 核心功能

### 🕒 摸鱼计时器
- 实时计时记录摸鱼时间
- 基于时薪自动计算摸鱼收益
- 可视化展示摸鱼投入比和趋势
- 近7天数据统计和时间段分布分析

### 😊 情绪分析
- 接入Google Gemini AI进行情绪识别
- 智能分析文本情绪（快乐/悲伤/愤怒/焦虑/平静/沮丧）
- 提供个性化情绪调节建议
- 情绪日记和趋势分析

### 💬 吐槽吧
- 匿名分享职场经历
- 职场红榜：值得加入的公司特征
- 职场黑榜：最该避雷的公司特征
- 按城市/行业筛选和排序

### 🍉 摸鱼吃瓜Club
- 每日精选爆款内容
- 分类浏览（明星八卦/职场趣闻/影视综艺/搞笑段子）
- 三分钟快速阅读推荐
- 热度实时统计

### 🎮 游戏厅
- **气泡纸模拟器**：点击爆破，释放压力
- **电子木鱼**：敲击木鱼，功德+1，佛系治愈
- **打字消除**：快速打字消灭职场烦恼词汇
- **摸鱼养猫咪**：用摸鱼积分喂养专属猫咪

## 🚀 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图表**: Recharts
- **图标**: Lucide React
- **AI**: Google Gemini API
- **存储**: LocalStorage (MVP版本)
- **部署**: Vercel

## 📦 安装与运行

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd fish
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
# Google Gemini API Key (可选，不配置将使用模拟数据)
GEMINI_API_KEY=your_gemini_api_key_here
```

**获取Gemini API Key:**
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登录Google账号
3. 创建API密钥
4. 复制密钥到 `.env.local`

> 注意：不配置API Key也可正常运行，情绪分析将使用基于关键词的模拟算法

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 5. 构建生产版本

```bash
npm run build
npm start
```

## 🌐 部署到Vercel

### 方法一：通过Vercel CLI

```bash
npm install -g vercel
vercel
```

### 方法二：通过Vercel网站

1. 访问 [vercel.com](https://vercel.com)
2. 导入Git仓库
3. 配置环境变量 `GEMINI_API_KEY`
4. 点击Deploy

## 📱 功能演示

### 首页Dashboard
- 今日摸鱼概览（时长/收益/投入比/情绪）
- 今日一瓜精选
- 快捷功能入口
- 最新吐槽和热门八卦预览

### 摸鱼计时器
- 大屏计时显示
- 实时收益计算
- 今日统计卡片
- 可自定义时薪和工作时长
- 近7天趋势图和时间段分布饼图

### 情绪分析
- 文本输入（最多500字）
- AI智能分析（Gemini驱动）
- 情绪识别和强度评分
- 关键词提取
- 个性化调节建议
- 情绪日记和统计图表

### 吐槽吧
- 15+条详实的虚拟吐槽
- 按城市/行业筛选
- 按热度/时间排序
- 职场红榜TOP10
- 职场黑榜TOP10

### 吃瓜Club
- 50+条虚拟新闻内容
- 4大分类标签切换
- 三分钟快速阅读推荐
- 热度和阅读时长标识

### 游戏厅
- 4款解压小游戏
- 支持音效和震动反馈
- 游戏积分系统
- 与摸鱼时长联动

## 📊 数据说明

本MVP版本使用LocalStorage存储数据：
- **摸鱼记录**: 保存在浏览器本地
- **情绪记录**: 最多保留100条
- **用户设置**: 时薪和工作时长配置

虚拟数据包括：
- 15条吐槽数据
- 10条红榜数据
- 10条黑榜数据
- 50条新闻数据

## 🎨 设计特点

- **响应式设计**: 完美适配移动端和桌面端
- **现代UI**: 渐变色、卡片式布局、流畅动画
- **直观交互**: 清晰的视觉反馈和状态提示
- **数据可视化**: 多种图表类型展示统计数据

## 🔧 项目结构

```
fish/
├── app/
│   ├── api/
│   │   └── analyze-emotion/    # Gemini API路由
│   ├── complaints/              # 吐槽吧页面
│   ├── emotion/                 # 情绪分析页面
│   ├── fish-timer/              # 摸鱼计时器页面
│   ├── news/                    # 吃瓜Club页面
│   ├── layout.tsx               # 全局布局
│   ├── page.tsx                 # 首页
│   └── globals.css              # 全局样式
├── components/
│   └── Navigation.tsx           # 导航组件
├── lib/
│   ├── storage.ts               # LocalStorage工具
│   └── mockData.ts              # 虚拟数据
├── public/                      # 静态资源
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🌟 特色亮点

1. **真实AI集成**: 使用Google Gemini进行情绪分析
2. **丰富虚拟数据**: 100+条详实的模拟数据
3. **完整功能闭环**: 四大核心模块相互联动
4. **精美可视化**: 多种图表展示数据趋势
5. **极致用户体验**: 流畅动画和即时反馈

## 🐛 已知限制（MVP版本）

- 无用户登录系统
- 数据存储在浏览器本地（清除缓存会丢失）
- 新闻数据为虚拟数据（未接入真实API）
- 地图功能未实现

## 🚧 后续规划

- [ ] 用户认证系统
- [ ] 云端数据存储
- [ ] 真实新闻API接入
- [ ] 公司地图可视化
- [ ] 用户互动功能（点赞、评论）
- [ ] 数据导出功能
- [ ] PWA支持（离线使用）

## 📝 开发笔记

### 情绪分析API使用

```typescript
// 调用示例
const response = await fetch("/api/analyze-emotion", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "你的文本内容" })
});

const result = await response.json();
// result: { emotion, intensity, keywords, advice }
```

### LocalStorage数据结构

```typescript
// 摸鱼记录
localStorage.getItem('fishtime_fish_records')

// 情绪记录
localStorage.getItem('fishtime_emotion_records')

// 用户设置
localStorage.getItem('fishtime_user_settings')
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 💬 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 提交Issue
- 发送邮件

---

**⭐ 如果这个项目对你有帮助，请给个Star！**

**🐟 祝你摸鱼愉快！记住：适度摸鱼，健康工作！**

