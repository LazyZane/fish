// 虚拟数据

export interface Complaint {
  id: string;
  author: string;
  company: string;
  city: string;
  industry: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  emoji: string;
}

export interface RankItem {
  rank: number;
  type: string;
  votes: number;
  description: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  heat: number;
  readTime: number;
}

// 吐槽数据
export const mockComplaints: Complaint[] = [
  {
    id: "c001",
    author: "匿名摸鱼人#1234",
    company: "某互联网大厂",
    city: "北京",
    industry: "互联网",
    content: "画饼一流，兑现无能。说好的期权呢？🙄",
    likes: 1234,
    comments: 89,
    createdAt: "2025-10-26T14:30:00Z",
    emoji: "😤"
  },
  {
    id: "c002",
    author: "匿名摸鱼人#5678",
    company: "某金融公司",
    city: "上海",
    industry: "金融",
    content: "天天开会，会议开完工作就下班了，实际工作时间为零。领导还问为什么进度慢？",
    likes: 2156,
    comments: 145,
    createdAt: "2025-10-26T10:15:00Z",
    emoji: "😩"
  },
  {
    id: "c003",
    author: "匿名摸鱼人#9012",
    company: "某制造企业",
    city: "深圳",
    industry: "制造业",
    content: "加班到深夜是常态，周末还要开会。HR说这是企业文化，我看是企业文化钱包...",
    likes: 3421,
    comments: 234,
    createdAt: "2025-10-25T22:45:00Z",
    emoji: "😡"
  },
  {
    id: "c004",
    author: "匿名摸鱼人#3456",
    company: "某创业公司",
    city: "杭州",
    industry: "互联网",
    content: "老板说公司是大家的，然后只有他开豪车。员工提加薪就说共度时艰 🤡",
    likes: 4567,
    comments: 312,
    createdAt: "2025-10-25T18:20:00Z",
    emoji: "🤡"
  },
  {
    id: "c005",
    author: "匿名摸鱼人#7890",
    company: "某传统企业",
    city: "广州",
    industry: "服务业",
    content: "领导微信语音轰炸，不秒回就是态度有问题。已经24小时待命了还要怎样？",
    likes: 2890,
    comments: 178,
    createdAt: "2025-10-25T15:30:00Z",
    emoji: "😫"
  },
  {
    id: "c006",
    author: "匿名摸鱼人#2468",
    company: "某咨询公司",
    city: "北京",
    industry: "咨询",
    content: "PPT改了38版，最后还是用的第一版。我的时间就这么不值钱？",
    likes: 1876,
    comments: 92,
    createdAt: "2025-10-25T12:10:00Z",
    emoji: "🙃"
  },
  {
    id: "c007",
    author: "匿名摸鱼人#1357",
    company: "某游戏公司",
    city: "成都",
    industry: "互联网",
    content: "做游戏的不让玩游戏，说会影响工作。那你们做食品的是不是也不吃饭？",
    likes: 5234,
    comments: 401,
    createdAt: "2025-10-25T09:00:00Z",
    emoji: "😒"
  },
  {
    id: "c008",
    author: "匿名摸鱼人#9753",
    company: "某外企",
    city: "上海",
    industry: "制造业",
    content: "外企的光环早没了，现在就剩下繁文缛节和低薪。还不如国内企业...",
    likes: 3142,
    comments: 267,
    createdAt: "2025-10-24T20:30:00Z",
    emoji: "😮‍💨"
  },
  {
    id: "c009",
    author: "匿名摸鱼人#8642",
    company: "某电商平台",
    city: "杭州",
    industry: "互联网",
    content: "双11前每天凌晨下班，双11后直接裁员。资本真是冷血！",
    likes: 6789,
    comments: 523,
    createdAt: "2025-10-24T17:45:00Z",
    emoji: "😠"
  },
  {
    id: "c010",
    author: "匿名摸鱼人#7531",
    company: "某国企",
    city: "北京",
    industry: "能源",
    content: "关系户横行，有能力的被打压。领导子女空降管理层，专业人士反而要听他们的。",
    likes: 4321,
    comments: 345,
    createdAt: "2025-10-24T14:20:00Z",
    emoji: "😤"
  },
  {
    id: "c011",
    author: "匿名摸鱼人#1593",
    company: "某教育机构",
    city: "深圳",
    industry: "教育",
    content: "双减之后日子不好过，各种克扣工资。说好的教育情怀呢？",
    likes: 2456,
    comments: 156,
    createdAt: "2025-10-24T11:00:00Z",
    emoji: "😔"
  },
  {
    id: "c012",
    author: "匿名摸鱼人#7412",
    company: "某物流公司",
    city: "广州",
    industry: "物流",
    content: "天天催货催货，系统的锅要我背，客户的气要我受。工资还特别低。",
    likes: 1987,
    comments: 98,
    createdAt: "2025-10-24T08:30:00Z",
    emoji: "😣"
  },
  {
    id: "c013",
    author: "匿名摸鱼人#9638",
    company: "某房地产公司",
    city: "成都",
    industry: "房地产",
    content: "行业不景气，公司还在盲目扩张。现在工资都发不出来了，还画饼说明年上市。",
    likes: 5678,
    comments: 432,
    createdAt: "2025-10-23T19:00:00Z",
    emoji: "🤦"
  },
  {
    id: "c014",
    author: "匿名摸鱼人#3214",
    company: "某AI创业公司",
    city: "北京",
    industry: "互联网",
    content: "天天喊AI革命，结果产品就是套壳ChatGPT。投资人的钱烧完就准备跑路。",
    likes: 4567,
    comments: 289,
    createdAt: "2025-10-23T16:20:00Z",
    emoji: "😏"
  },
  {
    id: "c015",
    author: "匿名摸鱼人#8527",
    company: "某医疗器械公司",
    city: "上海",
    industry: "医疗",
    content: "销售任务完全不合理，完不成就扣钱。疫情期间赚够了，现在开始压榨员工。",
    likes: 3890,
    comments: 234,
    createdAt: "2025-10-23T13:40:00Z",
    emoji: "😖"
  }
];

// 红榜数据
export const mockRedList: RankItem[] = [
  {
    rank: 1,
    type: "弹性工作制公司",
    votes: 8765,
    description: "真正的不打卡，工作成果导向。可以早上10点到，也可以下午2点到，只要完成工作就行。"
  },
  {
    rank: 2,
    type: "技术氛围浓厚",
    votes: 7543,
    description: "鼓励技术创新，定期技术分享。每周有技术沙龙，还有技术图书预算。"
  },
  {
    rank: 3,
    type: "福利待遇优厚",
    votes: 7234,
    description: "五险一金按最高基数交，年终奖说到做到。还有各种节日福利和团建经费。"
  },
  {
    rank: 4,
    type: "领导专业靠谱",
    votes: 6789,
    description: "领导懂技术会管理，不瞎指挥。能为团队争取资源，也能为员工背锅。"
  },
  {
    rank: 5,
    type: "晋升通道透明",
    votes: 6234,
    description: "晋升标准明确，不靠关系靠能力。每半年一次晋升机会，流程公开透明。"
  },
  {
    rank: 6,
    type: "工作生活平衡",
    votes: 5876,
    description: "很少加班，即使加班也有调休或加班费。周末从不打扰，年假可以随时请。"
  },
  {
    rank: 7,
    type: "股权激励实在",
    votes: 5432,
    description: "期权不是画饼，真的能兑现。上市后员工都实现了财务自由。"
  },
  {
    rank: 8,
    type: "培训学习机会多",
    votes: 5123,
    description: "公司报销培训费用，鼓励考证和进修。每年有外部培训名额和在线学习平台账号。"
  },
  {
    rank: 9,
    type: "团队氛围和谐",
    votes: 4789,
    description: "同事之间没有勾心斗角，大家互相帮助。定期团建不强制参加，活动都很有意思。"
  },
  {
    rank: 10,
    type: "远程办公友好",
    votes: 4567,
    description: "支持远程办公，工具齐全流程完善。疫情后一直保持混合办公模式。"
  }
];

// 黑榜数据
export const mockBlackList: RankItem[] = [
  {
    rank: 1,
    type: "无限加班文化",
    votes: 12890,
    description: "996是福报？007才是常态！不加班就是不努力，领导不走你也别想走。"
  },
  {
    rank: 2,
    type: "画饼充饥专业户",
    votes: 11234,
    description: "期权、股票、年终奖，什么都承诺就是不兑现。明年一定、以后一定，反正永远等不到。"
  },
  {
    rank: 3,
    type: "PUA式管理",
    votes: 10567,
    description: "你不行是因为你不够努力，公司给你机会是你的福报。动不动就威胁裁员。"
  },
  {
    rank: 4,
    type: "薪资严重倒挂",
    votes: 9876,
    description: "新人工资比老员工高一倍，老员工涨薪难如登天。公司宁愿花大价钱招新人。"
  },
  {
    rank: 5,
    type: "克扣工资福利",
    votes: 9234,
    description: "五险一金按最低标准交，迟到1分钟扣半天工资。各种莫名其妙的罚款制度。"
  },
  {
    rank: 6,
    type: "毫无加班费概念",
    votes: 8765,
    description: "加班理所当然，还想要加班费？调休？不存在的，加班是对公司的奉献。"
  },
  {
    rank: 7,
    type: "领导瞎指挥",
    votes: 8456,
    description: "外行领导内行，专业建议从不听。拍脑袋决策，背锅全是员工的。"
  },
  {
    rank: 8,
    type: "裁员补偿缩水",
    votes: 7890,
    description: "N+1变成N，甚至直接威胁让你自己离职。能拖就拖，能少给就少给。"
  },
  {
    rank: 9,
    type: "会议特别多",
    votes: 7456,
    description: "一天8小时6小时在开会，会议没结论，结论没人执行。开会就是为了开会。"
  },
  {
    rank: 10,
    type: "办公环境差",
    votes: 7123,
    description: "工位拥挤像网吧，空调不舍得开。厕所少还脏，连饮用水都要自己买。"
  }
];

// 新闻数据
export const mockNews = {
  todayHighlight: {
    title: "打工人的一天：从迟到开始的连锁反应",
    content: "早上闹钟没响→地铁延误→打卡迟到→被领导点名→客户投诉→背锅→加班到深夜→回家路上又看到招聘广告。有网友评论：'这不就是我的真实写照吗？'引发30万打工人共鸣...",
    heat: 156789
  },
  news: [
    {
      id: "n001",
      category: "明星八卦",
      title: "某顶流明星恋情曝光？工作室紧急回应",
      summary: "网友偶遇两人深夜共同出入高档餐厅，举止亲密。工作室回应：只是普通朋友聚餐...",
      image: "/placeholder-news-1.jpg",
      heat: 234567,
      readTime: 2
    },
    {
      id: "n002",
      category: "职场趣闻",
      title: "00后整顿职场：拒绝无效加班，直接怼领导",
      summary: "某公司00后员工当场拒绝周末加班，并质问领导'紧急任务为什么提前不说'。网友：年轻人有血性！",
      image: "/placeholder-news-2.jpg",
      heat: 189234,
      readTime: 3
    },
    {
      id: "n003",
      category: "影视综艺",
      title: "新综艺爆笑来袭：明星体验打工生活",
      summary: "多位明星挑战一个月打工生活，从送外卖到做客服。网友：终于知道打工人的不容易了吧！",
      image: "/placeholder-news-3.jpg",
      heat: 145678,
      readTime: 2
    },
    {
      id: "n004",
      category: "搞笑段子",
      title: "领导：明天周六来加个班。我：周六我有事",
      summary: "领导：什么事这么重要？我：休息。全网打工人集体点赞支持！",
      image: "/placeholder-news-4.jpg",
      heat: 298765,
      readTime: 1
    },
    {
      id: "n005",
      category: "职场趣闻",
      title: "公司年会抽奖内幕曝光：大奖都是托儿",
      summary: "某员工爆料公司年会一等奖iPhone全是内定给关系户，普通员工最多抽到笔记本。HR回应：纯属巧合...",
      image: "/placeholder-news-5.jpg",
      heat: 176543,
      readTime: 3
    },
    {
      id: "n006",
      category: "明星八卦",
      title: "影帝离婚内幕：女方出轨经纪人？",
      summary: "知情人透露两人已分居半年，女方疑似与经纪人关系暧昧。律师团队已介入...",
      image: "/placeholder-news-6.jpg",
      heat: 312456,
      readTime: 2
    },
    {
      id: "n007",
      category: "搞笑段子",
      title: "HR面试问：你的缺点是什么？神回复亮了",
      summary: "应届生回答：我的缺点是太诚实。HR：诚实不是缺点啊。应届生：我TM不在乎你怎么想！",
      image: "/placeholder-news-7.jpg",
      heat: 245678,
      readTime: 1
    },
    {
      id: "n008",
      category: "职场趣闻",
      title: "员工离职后发现前公司老板朋友圈屏蔽了自己",
      summary: "离职三年后偶然发现，原来老板的鸡汤朋友圈从来没给在职员工看过。网友：在职都是工具人？",
      image: "/placeholder-news-8.jpg",
      heat: 156789,
      readTime: 2
    },
    {
      id: "n009",
      category: "影视综艺",
      title: "新剧爆了：打工人都市生存图鉴",
      summary: "真实还原职场打工人的日常，从通勤地狱到办公室政治，每个场景都让人破防。豆瓣评分9.2！",
      image: "/placeholder-news-9.jpg",
      heat: 198765,
      readTime: 3
    },
    {
      id: "n010",
      category: "搞笑段子",
      title: "同事请假理由盘点：奶奶去世了8次",
      summary: "网友统计同事三年请假理由，奶奶去世8次、自己发烧23次、家里进小偷5次...HR：你当我傻吗？",
      image: "/placeholder-news-10.jpg",
      heat: 223456,
      readTime: 2
    },
    {
      id: "n011",
      category: "明星八卦",
      title: "某流量小生塌房：吸毒被抓现行",
      summary: "警方深夜突击某高档酒店，当场查获多人吸毒。某流量明星在场，经纪公司连夜删博...",
      image: "/placeholder-news-11.jpg",
      heat: 456789,
      readTime: 3
    },
    {
      id: "n012",
      category: "职场趣闻",
      title: "老板画饼三年，员工离职当天公司倒闭",
      summary: "坚守三年等期权的员工离职当天，公司宣布破产。网友：这就是忠诚的代价？",
      image: "/placeholder-news-12.jpg",
      heat: 187654,
      readTime: 2
    },
    {
      id: "n013",
      category: "搞笑段子",
      title: "上班第一天就想辞职的理由TOP10",
      summary: "网友票选：第一名'领导第一天就让我加班'、第二名'发现公司厕所比工位还脏'、第三名'午饭难吃到怀疑人生'...",
      image: "/placeholder-news-13.jpg",
      heat: 201234,
      readTime: 2
    },
    {
      id: "n014",
      category: "影视综艺",
      title: "爆款网剧：程序员的爱情与代码",
      summary: "两位程序员从互怼到互爱的故事，真实还原互联网公司生态。网友：终于有部不悬浮的职场剧了！",
      image: "/placeholder-news-14.jpg",
      heat: 178901,
      readTime: 3
    },
    {
      id: "n015",
      category: "职场趣闻",
      title: "公司要求员工自愿降薪，全员拒绝后老板傻眼",
      summary: "某公司以'共度时艰'为由要求员工自愿降薪20%，结果无一人同意。老板：没有集体荣誉感！",
      image: "/placeholder-news-15.jpg",
      heat: 265432,
      readTime: 2
    },
    {
      id: "n016",
      category: "明星八卦",
      title: "影后宣布结婚：老公竟是圈外富豪",
      summary: "突然官宣结婚，对象是某上市公司CEO。网友扒出豪门背景，真·嫁入豪门...",
      image: "/placeholder-news-16.jpg",
      heat: 345678,
      readTime: 2
    },
    {
      id: "n017",
      category: "搞笑段子",
      title: "面试官：你有什么想问我的吗？高情商回答",
      summary: "低情商：有加班费吗？高情商：公司如何平衡员工工作与生活？网友：学到了！",
      image: "/placeholder-news-17.jpg",
      heat: 189456,
      readTime: 1
    },
    {
      id: "n018",
      category: "职场趣闻",
      title: "员工吐槽公司抠门，老板回怼：嫌弃可以走",
      summary: "员工匿名吐槽公司连打印纸都要控制用量，没想到被老板看到。老板：不满意可以离职。结果三天后10人集体离职...",
      image: "/placeholder-news-18.jpg",
      heat: 234567,
      readTime: 3
    },
    {
      id: "n019",
      category: "影视综艺",
      title: "选秀节目黑幕：选手实力不如拼资本",
      summary: "爆料选手透露内幕，出道位早已内定，投票只是走过场。网友：又一个坑钱节目...",
      image: "/placeholder-news-19.jpg",
      heat: 212345,
      readTime: 2
    },
    {
      id: "n020",
      category: "明星八卦",
      title: "顶流女星被曝耍大牌：剧组工作人员集体吐槽",
      summary: "助理要20个、化妆间要最大、对手戏演员不能比她红。剧组：再也不合作了！",
      image: "/placeholder-news-20.jpg",
      heat: 287654,
      readTime: 3
    },
    {
      id: "n021",
      category: "职场趣闻",
      title: "95后辞职信走红：世界这么大，我想去看看",
      summary: "某95后员工一封辞职信刷屏，表示人生不只有工作还有诗和远方。已经启程去西藏...",
      image: "/placeholder-news-21.jpg",
      heat: 198234,
      readTime: 2
    },
    {
      id: "n022",
      category: "搞笑段子",
      title: "老板：公司不是家。员工：那我回家了",
      summary: "老板开会强调：公司不是家，要有职业精神。员工当场收拾东西：既然不是家那我准时下班。老板：...",
      image: "/placeholder-news-22.jpg",
      heat: 276543,
      readTime: 1
    },
    {
      id: "n023",
      category: "影视综艺",
      title: "综艺新秀：明星挑战极限职业",
      summary: "明星体验高空清洁、深海潜水、矿井作业等极限职业。网友：终于有有意义的综艺了！",
      image: "/placeholder-news-23.jpg",
      heat: 167890,
      readTime: 2
    },
    {
      id: "n024",
      category: "职场趣闻",
      title: "公司年会节目：员工集体辞职舞",
      summary: "某公司年会上，员工自编'辞职舞'讽刺公司。老板当场黑脸，第二天HR找所有参与者谈话...",
      image: "/placeholder-news-24.jpg",
      heat: 245678,
      readTime: 3
    },
    {
      id: "n025",
      category: "明星八卦",
      title: "男星被曝出轨：小三竟是妻子闺蜜",
      summary: "狗仔拍到男星与妻子闺蜜深夜幽会。妻子发长文：相信了错误的人。网友：狗血剧照进现实...",
      image: "/placeholder-news-25.jpg",
      heat: 389012,
      readTime: 2
    },
    {
      id: "n026",
      category: "搞笑段子",
      title: "打工人穿搭准则：永远准备两套衣服",
      summary: "一套上班穿给老板看，一套下班穿做自己。网友：这就是打工人的双面人生...",
      image: "/placeholder-news-26.jpg",
      heat: 156789,
      readTime: 1
    },
    {
      id: "n027",
      category: "职场趣闻",
      title: "员工因拒绝加班被开除，仲裁获赔10万",
      summary: "某员工拒绝违法加班被公司开除，劳动仲裁判定公司违法。律师：拒绝加班是员工的权利！",
      image: "/placeholder-news-27.jpg",
      heat: 223456,
      readTime: 3
    },
    {
      id: "n028",
      category: "影视综艺",
      title: "新剧官宣：全明星阵容打造职场复仇记",
      summary: "三位影帝影后加盟，讲述职场人如何反击职场霸凌的故事。网友：终于等到了！",
      image: "/placeholder-news-28.jpg",
      heat: 198765,
      readTime: 2
    },
    {
      id: "n029",
      category: "明星八卦",
      title: "某小鲜肉被曝数据造假：转发全是僵尸粉",
      summary: "微博转发破百万，实际真人互动不到1000。营销公司：这个价格只能做到这样了...",
      image: "/placeholder-news-29.jpg",
      heat: 267890,
      readTime: 2
    },
    {
      id: "n030",
      category: "职场趣闻",
      title: "HR吐槽：现在的00后太难招了",
      summary: "某HR抱怨00后面试问题太多：加班费怎么算？有没有午休？能不能远程？网友：这不是正常诉求吗？",
      image: "/placeholder-news-30.jpg",
      heat: 187654,
      readTime: 2
    },
    {
      id: "n031",
      category: "搞笑段子",
      title: "老板开会：我们是一家人。员工：那能借点钱吗？",
      summary: "老板画饼说大家是一家人要共同奋斗。员工：既然是一家人那我急用钱你能借吗？老板：...",
      image: "/placeholder-news-31.jpg",
      heat: 312456,
      readTime: 1
    },
    {
      id: "n032",
      category: "影视综艺",
      title: "纪录片爆红：真实记录都市打工人24小时",
      summary: "跟拍10位不同行业打工人的一天，从凌晨到深夜。豆瓣9.5分，网友：看哭了...",
      image: "/placeholder-news-32.jpg",
      heat: 245678,
      readTime: 3
    },
    {
      id: "n033",
      category: "职场趣闻",
      title: "公司禁止员工摸鱼，结果工作效率反而下降",
      summary: "某公司安装监控软件禁止摸鱼，结果员工集体消极怠工。专家：适当休息才能提高效率。",
      image: "/placeholder-news-33.jpg",
      heat: 209876,
      readTime: 2
    },
    {
      id: "n034",
      category: "明星八卦",
      title: "流量女星被曝学历造假：根本没上过大学",
      summary: "自称名校毕业的女星被曝学历造假，连高中都没读完。工作室：艺名生平，不代表本人...",
      image: "/placeholder-news-34.jpg",
      heat: 334567,
      readTime: 2
    },
    {
      id: "n035",
      category: "搞笑段子",
      title: "面试被问：你的理想是什么？神回复",
      summary: "低情商：赚钱。高情商：实现个人价值与社会价值的统一。超高情商：不上班。",
      image: "/placeholder-news-35.jpg",
      heat: 278901,
      readTime: 1
    },
    {
      id: "n036",
      category: "职场趣闻",
      title: "员工入职发现公司全是创始人亲戚",
      summary: "某员工入职后发现，从前台到高管全是老板亲戚。网友：这是家族企业还是骗子公司？",
      image: "/placeholder-news-36.jpg",
      heat: 196543,
      readTime: 3
    },
    {
      id: "n037",
      category: "影视综艺",
      title: "某综艺被批：强行煽情太尴尬",
      summary: "明星选手动不动就哭，导演疯狂剪煽情画面。网友：能不能好好唱歌跳舞？",
      image: "/placeholder-news-37.jpg",
      heat: 167890,
      readTime: 2
    },
    {
      id: "n038",
      category: "明星八卦",
      title: "某男星官宣出柜：终于可以做自己了",
      summary: "知名男星社交平台官宣出柜，公布男友照片。网友纷纷祝福：爱情不分性别！",
      image: "/placeholder-news-38.jpg",
      heat: 421234,
      readTime: 2
    },
    {
      id: "n039",
      category: "职场趣闻",
      title: "公司强制统一发型，员工集体剃光头抗议",
      summary: "某公司要求男员工必须寸头，女员工不能染发。结果全体员工第二天集体剃光头上班...",
      image: "/placeholder-news-39.jpg",
      heat: 256789,
      readTime: 2
    },
    {
      id: "n040",
      category: "搞笑段子",
      title: "打工人版《本草纲目》：咖啡、奶茶、外卖",
      summary: "网友改编歌词：如果华佗再世，崇洋都被医治，外邦来学的是咖啡...打工人三宝引发共鸣！",
      image: "/placeholder-news-40.jpg",
      heat: 298765,
      readTime: 1
    },
    {
      id: "n041",
      category: "影视综艺",
      title: "新电影定档：讲述互联网创业的残酷真相",
      summary: "改编自真实事件，揭露创业公司从融资到破产的全过程。网友：这就是现实版故事...",
      image: "/placeholder-news-41.jpg",
      heat: 187654,
      readTime: 3
    },
    {
      id: "n042",
      category: "职场趣闻",
      title: "老板朋友圈晒豪车，员工评论：什么时候发工资",
      summary: "某老板朋友圈炫耀新买的保时捷，员工在下面评论询问拖欠两个月的工资。老板秒删评论并拉黑...",
      image: "/placeholder-news-42.jpg",
      heat: 276543,
      readTime: 2
    },
    {
      id: "n043",
      category: "明星八卦",
      title: "某天后演唱会翻车：全程假唱还跑调",
      summary: "演唱会门票最贵8888元，结果全程假唱。网友：还不如听CD...",
      image: "/placeholder-news-43.jpg",
      heat: 345678,
      readTime: 2
    },
    {
      id: "n044",
      category: "搞笑段子",
      title: "同事离职，老板问：是不是钱没给够？",
      summary: "同事：不是。老板：那是哪里做得不好？同事：钱没给够还要我说哪里不好？？？",
      image: "/placeholder-news-44.jpg",
      heat: 312456,
      readTime: 1
    },
    {
      id: "n045",
      category: "职场趣闻",
      title: "公司组织团建，员工集体请病假",
      summary: "某公司周末强制团建且自费，结果当天80%员工请病假。老板：一定是空调开太冷了...",
      image: "/placeholder-news-45.jpg",
      heat: 234567,
      readTime: 2
    },
    {
      id: "n046",
      category: "影视综艺",
      title: "某导演新作上映：被批剧情悬浮不接地气",
      summary: "职场剧女主住豪宅开豪车，月薪3000？网友：导演你出来，我保证不打死你！",
      image: "/placeholder-news-46.jpg",
      heat: 198765,
      readTime: 2
    },
    {
      id: "n047",
      category: "明星八卦",
      title: "某男星被曝家暴：妻子晒出伤痕照片",
      summary: "妻子深夜发文控诉男星长期家暴，并晒出多张伤痕照片。律师：已经收集证据准备起诉。",
      image: "/placeholder-news-47.jpg",
      heat: 456789,
      readTime: 3
    },
    {
      id: "n048",
      category: "职场趣闻",
      title: "00后员工上班第一天就教老板用chatGPT",
      summary: "00后新人入职发现公司还在用老旧流程，主动教老板用AI工具。老板:感觉自己已经out了...",
      image: "/placeholder-news-48.jpg",
      heat: 223456,
      readTime: 2
    },
    {
      id: "n049",
      category: "搞笑段子",
      title: "HR：我们这里就像大学校园。员工：那考试不及格会怎样？",
      summary: "HR：...会辞退。员工：那大学还能重修呢，你们直接开除？",
      image: "/placeholder-news-49.jpg",
      heat: 267890,
      readTime: 1
    },
    {
      id: "n050",
      category: "影视综艺",
      title: "新综艺创意十足：素人对决演技派",
      summary: "普通素人和专业演员同台飙戏，盲评谁演得更好。网友：有些素人是真的有天赋！",
      image: "/placeholder-news-50.jpg",
      heat: 178901,
      readTime: 2
    }
  ]
};

