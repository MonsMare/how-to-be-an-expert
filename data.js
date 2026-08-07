/* ====================================================================
 * how-to-be-an-expert · 结构化数据集（v2）
 * 数据源已收紧：仅保留 16 位纯非中国专家（排除任何有中国学习/工作经历者）。
 * 每条观点新增真实性核验：auth = 亲历 / 借鉴 / 共识；verify = 判定依据。
 * 被 wiki / analysis / index.html 共同引用。
 * ==================================================================== */

const CAT = {
  C1:  "刻意练习与高质量训练",
  C2:  "时间投入与长期积累（复利）",
  C3:  "专注深度与置心一处",
  C4:  "反馈测量与闭环",
  C5:  "导师教练与系统工具",
  C6:  "心智模型与第一性原理（底层思维）",
  C7:  "成长思维与拥抱失败（复原力）",
  C8:  "坚毅坚持与长期主义",
  C9:  "方向选择与做对的事（能力圈）",
  C10: "不可替代与特定知识（世界最好）",
  C11: "阅读与持续学习（学习机器）",
  C12: "跨界通才与类比迁移",
  C13: "内驱热爱与目的感",
  C14: "杠杆与时间自由（减法）",
  C15: "过程导向与身份认同",
  C16: "教学外化与诚实不自欺（行动）",
  C17: "环境机遇与系统性条件",
};

// 观点真实性核验等级
const AUTH = {
  亲历: "基于自身经历/研究/实践的原创思考，非人云亦云",
  借鉴: "显式借用他人观点（已注明出处），非原创但非盲目附和",
  共识: "接近通用常识/人云亦云，缺乏独特个人经验支撑",
};

const SCHOOLS = {
  practice:  "练习学派（高质量重复）",
  thinking:  "思维学派（心智模型·第一性原理）",
  mindset:   "心性学派（成长·坚毅·脆弱）",
  strategy:  "战略学派（方向·杠杆·不可替代）",
  generalist:"通才学派（跨界·采样·类比）",
  action:    "行动学派（外化·交付·不自欺）",
  system:    "系统学派（反馈·导师·清单）",
};

const EXPERTS = [
  {
    id:"ericsson", name:"Anders Ericsson", nameZh:"安德斯·埃里克森",
    file:"experts/Anders-Ericsson.md",
    gender:"男", birth:1947, died:2020, age:72, ageBracket:"65+",
    field:"心理与认知科学", income:"学者薪级（15–25万美元）", incomeTier:1, region:"西方",
    bio:"瑞典裔心理学家，'刻意练习'理论之父，毕生研究世界级专家如何达成卓越绩效。",
    schools:["practice","system"],
    viewpoints:[
      {t:"刻意练习而非简单重复", c:["C1"], d:"练习质量（目标·反馈·舒适区突破）决定专家诞生。", auth:"亲历", verify:"其30年专家绩效研究的核心结论"},
      {t:"心理表征是专家的核心资产", c:["C1"], d:"专家与新手的根本差别是脑中更精细的心理表征。", auth:"亲历", verify:"其研究提炼的专家-新手本质差异"},
      {t:"走出舒适区是进步的必要条件", c:["C1"], d:"持续挑战'刚好超出当前能力'的任务。", auth:"亲历", verify:"其实验研究揭示的进步机制"},
      {t:"即时且高质量的反馈是闭环关键", c:["C4"], d:"无反馈的练习是盲目重复。", auth:"亲历", verify:"其练习方法学的实证要素"},
      {t:"导师/教练不可或缺", c:["C5"], d:"世界级专家关键阶段几乎都有优秀导师。", auth:"亲历", verify:"基于其对世界级专家师承的系统观察"},
      {t:"天赋神话可以解构", c:["C1","C7"], d:"所谓天才背后皆有大量结构化训练。", auth:"亲历", verify:"其对莫扎特、棋坛神童等案例的追溯研究"},
      {t:"突破瓶颈靠方法变换而非蛮力", c:["C1"], d:"换策略而非加量，是跨越高原期的核心路径。", auth:"亲历", verify:"其高原期研究的方法论结论"},
      {t:"脑可塑性是终身学习的生理基础", c:["C7","C11"], d:"长期练习重塑大脑回路。", auth:"借鉴", verify:"引用神经科学研究综合，非其原创实验结论"},
    ]
  },
  {
    id:"gladwell", name:"Malcolm Gladwell", nameZh:"马尔科姆·格拉德威尔",
    file:"experts/Malcolm-Gladwell.md",
    gender:"男", birth:1963, died:null, age:62, ageBracket:"50-64",
    field:"思想写作与传播", income:"数百万至千万级（300–800万美元）", incomeTier:3, region:"西方",
    bio:"加拿大裔英国记者作家，将社会心理学转化为大众叙事，提出'一万小时定律'。",
    schools:["practice"],
    viewpoints:[
      {t:"一万小时是通往精通的魔力数字", c:["C2"], d:"约一万小时高质量实践是达到世界级的入门门槛。", auth:"借鉴", verify:"自Ericsson研究提炼并简化为公众标签，非其原创"},
      {t:"实践先于天赋", c:["C2","C1"], d:"是先投入大量练习人才变优秀，而非因优秀才去练习。", auth:"借鉴", verify:"颠倒Ericsson的前提为其叙事化"},
      {t:"机遇与时机是成功的隐形变量", c:["C17"], d:"卓越不仅靠个人努力，更靠出生在对的时代、获得对的机会。", auth:"亲历", verify:"其Outliers的结构性原创论点"},
      {t:"累积优势（马太效应）塑造专家路径", c:["C17","C2"], d:"微小先行优势被时间放大成巨大差距。", auth:"借鉴", verify:"借用社会学家Robert Merton的马太效应概念"},
      {t:"文化与社区背景为勤奋提供土壤", c:["C17"], d:"勤奋实践的习惯根植于文化传统与社区结构。", auth:"亲历", verify:"其罗塞托人、稻田文化的原创案例分析"},
      {t:"环境条件决定谁有可能累积练习时间", c:["C17"], d:"资源可达性与个人意愿同等重要。", auth:"亲历", verify:"其结构性可达性论点"},
      {t:"成功者不是异类", c:["C17","C2"], d:"卓越是社会结构×时机×实践的合奏。", auth:"亲历", verify:"其全书核心论点"},
    ]
  },
  {
    id:"duckworth", name:"Angela Duckworth", nameZh:"安吉拉·达克沃斯",
    file:"experts/Angela-Duckworth.md",
    gender:"女", birth:1970, died:null, age:56, ageBracket:"50-64",
    field:"心理与认知科学", income:"十万至百万美元级（30–60万美元）", incomeTier:2, region:"西方",
    bio:"美国心理学家，'坚毅'（grit）理论提出者，研究什么让人在长期目标上坚持到底。",
    schools:["mindset"],
    viewpoints:[
      {t:"坚毅＝激情＋坚持", c:["C8"], d:"对长期目标的持久热忱比IQ更能预测成就。", auth:"亲历", verify:"其原创心理构念与西点/拼字比赛等实证研究"},
      {t:"努力比天赋重要两倍", c:["C8","C2"], d:"天赋×努力=技能，技能×努力=成就。", auth:"亲历", verify:"其原创成就等式"},
      {t:"天赋的陷阱", c:["C7","C8"], d:"被夸'聪明'反而消磨坚毅。", auth:"亲历", verify:"其研究与Dweck成长型思维对接的发现"},
      {t:"兴趣是坚毅的情感起点", c:["C13"], d:"能在长期目标上坚持的人有发自内心的好奇。", auth:"亲历", verify:"其四要素研究中的实证发现"},
      {t:"目的感为坚毅注入意义", c:["C13"], d:"将个人兴趣与社会价值连接，增强逆境中坚持。", auth:"亲历", verify:"其实证发现"},
      {t:"希望是坚毅的韧性引擎", c:["C7","C8"], d:"相信'我的行动可改善未来'的人失败后继续。", auth:"亲历", verify:"其与成长思维对接的研究"},
      {t:"坚毅可培养", c:["C8"], d:"兴趣·练习·目的·希望四要素构成可操作框架。", auth:"亲历", verify:"其原创四要素培养框架"},
    ]
  },
  {
    id:"dweck", name:"Carol Dweck", nameZh:"卡罗尔·德韦克",
    file:"experts/Carol-Dweck.md",
    gender:"女", birth:1946, died:null, age:79, ageBracket:"65+",
    field:"心理与认知科学", income:"十万至百万美元级（30–60万美元）", incomeTier:2, region:"西方",
    bio:"美国心理学家，'成长型思维'理论提出者，揭示对能力的隐含信念如何决定成长路径。",
    schools:["mindset"],
    viewpoints:[
      {t:"思维模式决定成就天花板", c:["C7"], d:"对'能力是否可变'的信念先于技能练习而决定路径。", auth:"亲历", verify:"其30年隐含智力理论研究的核心结论"},
      {t:"成长型思维让努力变得有价值", c:["C7"], d:"努力是通往精通的路径而非'能力不足'的信号。", auth:"亲历", verify:"其原创理论"},
      {t:"'尚未'的力量", c:["C7"], d:"将失败重定义为过程中的暂态。", auth:"亲历", verify:"其教育实践的概念创造（Not Yet）"},
      {t:"夸过程而非夸天赋", c:["C7"], d:"反馈方式在潜移默化中塑造能否走向卓越。", auth:"亲历", verify:"其实验研究结论"},
      {t:"成长型思维与脑可塑性同构", c:["C7","C11"], d:"学习真的改变大脑。", auth:"借鉴", verify:"引用神经科学佐证，非其原创实验"},
      {t:"拥抱挑战而非回避挑战", c:["C7","C1"], d:"挑战是信息的来源。", auth:"亲历", verify:"其实验观察"},
      {t:"让批评与他人成功成为养料", c:["C7"], d:"卓越需要开放的信息吸收。", auth:"亲历", verify:"其实验观察"},
    ]
  },
  {
    id:"newport", name:"Cal Newport", nameZh:"卡尔·纽波特",
    file:"experts/Cal-Newport.md",
    gender:"男", birth:1982, died:null, age:44, ageBracket:"30-49",
    field:"计算机与工程科技", income:"十万至百万美元级（100–300万美元）", incomeTier:2, region:"西方",
    bio:"乔治城大学计算机科学副教授，'深度工作'方法论倡导者。",
    schools:["strategy","action"],
    viewpoints:[
      {t:"深度工作是元技能", c:["C3"], d:"无干扰高强度认知劳动既稀缺又值钱。", auth:"亲历", verify:"其面向知识工作的原创论点"},
      {t:"匠人式思维优于激情式思维", c:["C9"], d:"始于'为世界贡献价值'而非'找到完美工作'。", auth:"亲历", verify:"其原创心态对比框架"},
      {t:"职业资本：稀有且有价值的能力", c:["C10","C9"], d:"难以复制、市场认可的能力才构成职业资本。", auth:"亲历", verify:"其原创概念"},
      {t:"激情是精通的副产品而非起点", c:["C13","C9"], d:"先精通后热爱，顺序倒置让人放弃。", auth:"亲历", verify:"其反主流原创论点"},
      {t:"快速学习复杂事物的能力", c:["C11","C12"], d:"快速学习本身就是核心竞争力。", auth:"亲历", verify:"其方法论主张"},
      {t:"排除浅层工作、保护注意力", c:["C3","C14"], d:"注意力是需要被刻意保护的资产。", auth:"亲历", verify:"其日程工程方法"},
      {t:"以'少而精'取代忙碌", c:["C14","C3"], d:"反对用数量与时间填充来衡量价值。", auth:"亲历", verify:"其Slow Productivity原创论点"},
    ]
  },
  {
    id:"waitzkin", name:"Josh Waitzkin", nameZh:"乔什·维茨金",
    file:"experts/Josh-Waitzkin.md",
    gender:"男", birth:1976, died:null, age:49, ageBracket:"30-49",
    field:"体育·竞技与修行", income:"十万至百万美元级（30–100万美元）", incomeTier:2, region:"西方",
    bio:"国际象棋神童与太极拳推手世界冠军，'两次从零到顶尖'的学习方法论者。",
    schools:["practice","mindset","action"],
    viewpoints:[
      {t:"投资于失败", c:["C7"], d:"愿意在能力边缘反复失败，让错误成为信息源。", auth:"亲历", verify:"源自其象棋+太极双域竞技经历"},
      {t:"以原则内化超越表面记忆", c:["C1","C16"], d:"把基本原则内化到直觉。", auth:"亲历", verify:"其竞技内化经验"},
      {t:"画更小的圆——深度优于广度", c:["C3","C12"], d:"把少数技术压缩到极高分辨率。", auth:"亲历", verify:"其从竞技提炼的技术观"},
      {t:"过程优先于结果", c:["C15"], d:"把自我价值绑在结果上会让表现脆弱。", auth:"亲历", verify:"其挫败后的反思"},
      {t:"身心一体", c:["C15"], d:"呼吸、紧张、姿态都会影响认知表现。", auth:"亲历", verify:"其太极竞技的身体经验"},
      {t:"建立内在雷达", c:["C15","C7"], d:"发展对自身状态的内部觉察。", auth:"亲历", verify:"其压力下自我调节的竞技训练"},
      {t:"用伤痛做燃料", c:["C7"], d:"把失败与创伤转化为更深层学习的燃料。", auth:"亲历", verify:"其创伤转化的个人经验"},
    ]
  },
  {
    id:"leonard", name:"George Leonard", nameZh:"乔治·伦纳德",
    file:"experts/George-Leonard.md",
    gender:"男", birth:1923, died:2010, age:86, ageBracket:"65+",
    field:"体育·竞技与修行", income:"学者薪级（已故）", incomeTier:1, region:"西方",
    bio:"美国记者、合气道五段，《Mastery》作者，把武术修行哲学提炼为普适精通之道。",
    schools:["practice","mindset","system"],
    viewpoints:[
      {t:"热爱高原期", c:["C2","C15"], d:"精通是一系列高原期，学会与'看不到进步'和解。", auth:"亲历", verify:"其合气道修行与观察的原创洞见"},
      {t:"练习即道路本身", c:["C15"], d:"练习不是通往目标的工具，练习就是道路。", auth:"亲历", verify:"其修行哲学的原创表述"},
      {t:"终身旅程而非终点", c:["C15","C2"], d:"Master是日复一日留在道路上的人。", auth:"亲历", verify:"其精通观"},
      {t:"五大精通之钥", c:["C5","C1","C15"], d:"师承·练习·臣服·意向·边缘，五者缺一不可。", auth:"亲历", verify:"其原创框架"},
      {t:"三种非精通者原型", c:["C8","C15"], d:"浅尝者·痴迷者·因循者——怕停滞·急功近利·满足平庸。", auth:"亲历", verify:"其原创类型学"},
      {t:"当下的练习", c:["C15"], d:"练习只存在于当下。", auth:"借鉴", verify:"呼应东方正念/禅修传统，非纯原创"},
      {t:"反速成神话", c:["C2"], d:"承诺捷径的叙事都是对学习者的欺骗。", auth:"亲历", verify:"其对速成文化的批判"},
    ]
  },
  {
    id:"epstein", name:"David Epstein", nameZh:"大卫·爱泼斯坦",
    file:"experts/David-Epstein.md",
    gender:"男", birth:1980, died:null, age:46, ageBracket:"30-49",
    field:"思想写作与传播", income:"十万至百万美元级（30–100万美元）", incomeTier:2, region:"西方",
    bio:"美国科学记者，《Range》作者，论证在大多数真实领域里通才比早期专才更胜出。",
    schools:["generalist","strategy"],
    viewpoints:[
      {t:"学习环境的'友好'与'恶劣'", c:["C9","C17"], d:"先识别所在领域属于友好还是恶劣环境。", auth:"借鉴", verify:"借用Hogarth的kind/wicked learning environments概念"},
      {t:"通才在恶劣环境中胜出", c:["C12"], d:"在大多数真实领域里通才比早期专才更可能胜出。", auth:"亲历", verify:"其Range核心原创论点"},
      {t:"晚期专精优于早期专精", c:["C12","C9"], d:"先广泛采样再选方向，长期成就往往更高。", auth:"亲历", verify:"其原创实证论点"},
      {t:"采样期的价值", c:["C12"], d:"做出长期承诺前主动尝试多种领域。", auth:"亲历", verify:"其论点"},
      {t:"类比思维是通才的核心武器", c:["C12","C16"], d:"把A领域概念迁移到B领域是创新突破的主要来源。", auth:"亲历", verify:"其论点"},
      {t:"匹配质量先于承诺", c:["C9","C13"], d:"延迟承诺、多次切换的人最终匹配度更高。", auth:"借鉴", verify:"借用劳动经济学的match quality概念"},
      {t:"早期专精的隐性风险", c:["C12","C9"], d:"过度专精可能在规则变化的世界成为负担。", auth:"亲历", verify:"其反主流论点"},
    ]
  },
  {
    id:"gawande", name:"Atul Gawande", nameZh:"阿图·葛文德",
    file:"experts/Atul-Gawande.md",
    gender:"男", birth:1965, died:null, age:60, ageBracket:"50-64",
    field:"医学与自然科学", income:"十万至百万美元级（50–200万美元）", incomeTier:2, region:"西方",
    bio:"哈佛外科医生、作家、Ariadne Labs联合创始人，将医学实践的系统改进转化为精通之道。",
    schools:["system","mindset"],
    viewpoints:[
      {t:"勤勉而非天才", c:["C2","C8"], d:"成为专家的首要条件不是天赋而是稳定认真的持续投入。", auth:"亲历", verify:"源自其外科实践与Better研究"},
      {t:"精通是相对而非绝对的", c:["C15","C7"], d:"不是'是否变得伟大'而是'是否比过去的自己更好'。", auth:"亲历", verify:"其后记的原创反思"},
      {t:"勤勉≠完美主义", c:["C8"], d:"勤勉是稳定而认真的努力，不是对无错的执念。", auth:"亲历", verify:"其概念区分"},
      {t:"卓越三要素：勤勉·守正·创新", c:["C2","C9"], d:"positive deviants共有的三个特质。", auth:"亲历", verify:"其原创框架"},
      {t:"系统优于个人英雄主义", c:["C5","C14"], d:"复杂性超过个人上限时掌握清单与流程而非靠记忆。", auth:"亲历", verify:"其清单实践与TED论点"},
      {t:"测量与反馈是精进的引擎", c:["C4"], d:"追踪自己的结果数据，没有反馈闭环的练习是盲目的。", auth:"亲历", verify:"其追踪结果的主张"},
      {t:"向其他领域借力", c:["C12"], d:"从航空、建筑业借鉴已被验证的系统化做法。", auth:"亲历", verify:"其跨业借鉴实践"},
    ]
  },
  {
    id:"godin", name:"Seth Godin", nameZh:"塞斯·戈丁",
    file:"experts/Seth-Godin.md",
    gender:"男", birth:1960, died:null, age:65, ageBracket:"65+",
    field:"思想写作与传播", income:"数百万至千万级（100–500万美元）", incomeTier:3, region:"西方",
    bio:"美国营销思想家、多产作家，《The Dip》《Linchpin》作者。",
    schools:["strategy","action","mindset"],
    viewpoints:[
      {t:"精通必须穿过'低谷期'", c:["C2","C8"], d:"从初学者运气到真正精通的漫长艰难期。", auth:"亲历", verify:"其The Dip原创概念"},
      {t:"战略性放弃是精通的前提", c:["C9","C14"], d:"放弃不值得投入的事，把资源集中到能成为最好的方向。", auth:"亲历", verify:"其原创论点"},
      {t:"只有'世界最好'才有超额回报", c:["C10"], d:"在选定微观领域成为最佳选择，稀缺性是价值来源。", auth:"亲历", verify:"其市场逻辑论点"},
      {t:"交付（Shipping）是精通的标志", c:["C16","C15"], d:"真正的专家能克服恐惧反复完成并发布工作。", auth:"借鉴", verify:"借用乔布斯'Real artists ship'理念"},
      {t:"情感投入定义'真正的工作'", c:["C13","C7"], d:"愿意做可能失败、慷慨的、有人性的工作。", auth:"亲历", verify:"其对'艺术'的原创重新定义"},
      {t:"精通是实践而非天赋", c:["C1","C15"], d:"创造性精通来自日复一日的实践。", auth:"亲历", verify:"其The Practice论点"},
      {t:"选择值得精进的领域", c:["C9"], d:"辨别你身处的是Dip还是死胡同。", auth:"亲历", verify:"其战略论点"},
    ]
  },
  {
    id:"brown", name:"Brené Brown", nameZh:"布琳·布朗",
    file:"experts/Brene-Brown.md",
    gender:"女", birth:1965, died:null, age:60, ageBracket:"50-64",
    field:"心理与认知科学", income:"数百万至千万级（200–800万美元）", incomeTier:3, region:"西方",
    bio:"休斯顿大学研究教授，脆弱、羞耻与勇气研究学者，TED史上最高观看演讲者之一。",
    schools:["mindset","action"],
    viewpoints:[
      {t:"脆弱是精通的起点", c:["C7"], d:"愿意暴露在不确定中是创造力与突破性精进的诞生地。", auth:"亲历", verify:"其定性研究的核心发现"},
      {t:"进入竞技场比旁观批评更接近卓越", c:["C7","C16"], d:"精通属于满身尘土、屡次失败仍在场上的人。", auth:"借鉴", verify:"借用罗斯福'The Man in the Arena'演讲为精神支柱"},
      {t:"跌倒后复原是一种可训练的实践", c:["C7"], d:"清算→搏斗→革命，把跌倒转化为精进的燃料。", auth:"亲历", verify:"其Rising Strong原创三步法"},
      {t:"'我已足够'是持续成长的心性基础", c:["C7","C15"], d:"成长来自完整感而非匮乏感。", auth:"亲历", verify:"其wholeheartedness研究"},
      {t:"脆弱是一种可练习的日常行为", c:["C7","C15"], d:"把'愿意被看见'作为日常实践。", auth:"亲历", verify:"其研究"},
      {t:"连接与求助是精通之路的必需", c:["C7","C5"], d:"求助、连接、归属感是必要条件而非软弱。", auth:"亲历", verify:"其研究结论"},
      {t:"羞耻是精进的最大障碍", c:["C7"], d:"学会识别和应对'我不够好'的恐惧。", auth:"亲历", verify:"其羞耻研究的核心"},
    ]
  },
  {
    id:"angelou", name:"Maya Angelou", nameZh:"玛雅·安吉洛",
    file:"experts/Maya-Angelou.md",
    gender:"女", birth:1928, died:2014, age:86, ageBracket:"65+",
    field:"艺术与设计", income:"数百万至千万级（100–500万美元）", incomeTier:3, region:"西方",
    bio:"美国诗人、自传作家、民权活动家，以七部自传体作品闻名，2010年获总统自由勋章。",
    schools:["action","mindset"],
    viewpoints:[
      {t:"精进的本质是认知迭代闭环", c:["C4","C15"], d:"尽力做到知道的最好；知道得更好后就做得更好。", auth:"亲历", verify:"其格言化的生活智慧"},
      {t:"不投入则一切方法无效", c:["C16","C2"], d:"任何天赋、工具、机会，离开个人投入都是空谈。", auth:"共识", verify:"接近通用常识性表述，虽为她说但缺乏独特经验支撑"},
      {t:"创造力是用得越多越多的正向循环", c:["C15","C2"], d:"把创造力视为肌肉——越练越强。", auth:"亲历", verify:"其创作经验提炼"},
      {t:"纪律比灵感更可靠", c:["C2","C3"], d:"每天到场不论有无灵感，仪式化环境支撑纪律。", auth:"亲历", verify:"其每日酒店房间写作仪式的实证"},
      {t:"未表达的故事是一种痛苦", c:["C13"], d:"内在的'必须表达'比外在奖励更持久。", auth:"亲历", verify:"其创作内驱"},
      {t:"精进是为了优雅地生存", c:["C15","C13"], d:"用最好的手艺对抗命运不公、赋予生命尊严。", auth:"亲历", verify:"其存在性命题"},
      {t:"在沉默中积累，在表达中精进", c:["C2","C16"], d:"在'不被看见'的阶段积蓄，等待找到声音的时机。", auth:"亲历", verify:"其童年失语经历的提炼"},
    ]
  },
  {
    id:"munger", name:"Charlie Munger", nameZh:"查理·芒格",
    file:"experts/Charlie-Munger.md",
    gender:"男", birth:1924, died:2023, age:99, ageBracket:"65+",
    field:"投资与金融", income:"亿美元以上（约26亿美元）", incomeTier:5, region:"西方",
    bio:"巴菲特长期搭档，Berkshire副主席，以跨学科心智模型与'人类误判心理学'著称。",
    schools:["thinking","generalist","action"],
    viewpoints:[
      {t:"跨学科心智模型网格", c:["C6","C12"], d:"掌握多学科核心模型并编织成网格。", auth:"亲历", verify:"其投资实践提炼的原创框架"},
      {t:"成为学习机器", c:["C11"], d:"聪明不是关键，持续学习的能力才是。", auth:"亲历", verify:"其观察的原创表述"},
      {t:"持续精进，每日复利", c:["C2"], d:"每天比醒来时更明智一点，几十年差距惊人。", auth:"亲历", verify:"其复利哲学"},
      {t:"广泛阅读是必要条件", c:["C11"], d:"几乎所有在广义领域内明智的人都终日阅读。", auth:"亲历", verify:"其断言"},
      {t:"逆向思考", c:["C9","C14"], d:"想成功先想如何避免失败。", auth:"借鉴", verify:"引用数学家Jacobi的'Invert, always invert'"},
      {t:"掌握人类误判心理学", c:["C6"], d:"认清认知偏差是做出高质量决策的前提。", auth:"亲历", verify:"其原创演讲框架（受Cialdini影响）"},
      {t:"配得上你想要的", c:["C8","C15"], d:"卓越不是窍门，而是先让自己值得。", auth:"亲历", verify:"其伦理论点"},
      {t:"用模型挂接经验", c:["C6","C16"], d:"把经验挂接到心智模型网格，否则经验零散无效。", auth:"亲历", verify:"其方法论"},
    ]
  },
  {
    id:"musk", name:"Elon Musk", nameZh:"埃隆·马斯克",
    file:"experts/Elon-Musk.md",
    gender:"男", birth:1971, died:null, age:55, ageBracket:"50-64",
    field:"计算机与工程科技", income:"亿美元以上（千亿美元级）", incomeTier:5, region:"西方",
    bio:"SpaceX、Tesla、xAI创始人，把第一性原理从思维方式变成工程与商业实践。",
    schools:["thinking","generalist","action"],
    viewpoints:[
      {t:"第一性原理思维", c:["C6"], d:"把问题分解到最基本的物理真理再向上推理。", auth:"亲历", verify:"术语虽古典，为其真实思考模式并以火箭成本分解验证"},
      {t:"语义树式学习", c:["C6","C11"], d:"先掌握树干与大枝（基本原理），叶子才有可挂接之处。", auth:"亲历", verify:"其Reddit AMA原创比喻"},
      {t:"质疑假设与自我", c:["C6","C16"], d:"不断追问'还能怎么做得更好'，拒绝默认假设。", auth:"亲历", verify:"其工程实践"},
      {t:"极致工时密度", c:["C2"], d:"用远超常人的工时密度压缩学习曲线。", auth:"亲历", verify:"其亲身实践（虽可争议）"},
      {t:"跨域迁移原理", c:["C12"], d:"掌握一门学科的根本原理后可跨域迁移。", auth:"亲历", verify:"其跨域创业实践"},
      {t:"把成本分解到原子级", c:["C6"], d:"把'它就是这么贵'的假设拆到原材料层面。", auth:"亲历", verify:"其SpaceX工程实践"},
      {t:"未来信念驱动行动", c:["C13","C7"], d:"相信未来会更好的人会把它变得更好。", auth:"共识", verify:"接近通用自助式信念，缺乏独特实践支撑"},
    ]
  },
  {
    id:"feynman", name:"Richard Feynman", nameZh:"理查德·费曼",
    file:"experts/Richard-Feynman.md",
    gender:"男", birth:1918, died:1988, age:69, ageBracket:"65+",
    field:"医学与自然科学", income:"学者薪级（中产）", incomeTier:1, region:"西方",
    bio:"1965年诺贝尔物理学奖得主，费曼图创始人，被誉为'最伟大的解释者'。",
    schools:["thinking","action"],
    viewpoints:[
      {t:"区分命名与理解", c:["C6","C16"], d:"知道事物的名字不等于知道事物。", auth:"亲历", verify:"源自其父亲观鸟的童年经验"},
      {t:"不欺骗自己", c:["C16"], d:"成为专家的第一原则是不要自欺。", auth:"亲历", verify:"其科学认识论原创原则"},
      {t:"实验高于理论", c:["C16","C4"], d:"再漂亮的理论与实验不符就是错的。", auth:"亲历", verify:"其科学精神"},
      {t:"理解式学习而非死记", c:["C6","C11"], d:"靠死记得来的知识脆弱，无法迁移。", auth:"亲历", verify:"其巴西教学经验"},
      {t:"持续思考的攻势", c:["C2","C3"], d:"没有问题能抵挡持续思考的攻势。", auth:"借鉴", verify:"该格言归属存疑（常归于伏尔泰），非其确证原创"},
      {t:"以最不正统的方式深挖兴趣", c:["C13"], d:"好奇心驱动的非线性探索是精通的引擎。", auth:"亲历", verify:"其致学生信"},
      {t:"教与辩以使知识扎根", c:["C16"], d:"通过讨论、争辩、冲突学习才使知识留下。", auth:"亲历", verify:"其学习实践"},
      {t:"现实优先于公关", c:["C16"], d:"自然无法被糊弄，专家要敢于承认'错了'。", auth:"亲历", verify:"其挑战者号调查结论"},
    ]
  },
  {
    id:"naval", name:"Naval Ravikant", nameZh:"纳瓦尔·拉维坎特",
    file:"experts/Naval-Ravikant.md",
    gender:"男", birth:1974, died:null, age:52, ageBracket:"50-64",
    field:"投资与金融", income:"千万至亿美元级", incomeTier:4, region:"西方",
    bio:"AngelList创始人、硅谷天使投资人，以推文与播客传播财富、特定知识与杠杆的哲学。",
    schools:["strategy","action"],
    viewpoints:[
      {t:"特定知识不可被训练", c:["C10"], d:"社会还无法培训、无法外包、无法替代的知识才是真正专长。", auth:"亲历", verify:"其原创概念（呼应比较优势但为其表述）"},
      {t:"成为世界最好并不断重定义", c:["C10","C9"], d:"不断收窄并重定义你做的事直到你是世界最好。", auth:"亲历", verify:"其推文原创论点"},
      {t:"玩感即指南", c:["C13"], d:"让你感觉像玩、别人觉得是苦工的事藏着你的特定知识。", auth:"亲历", verify:"其原创'雷达'比喻"},
      {t:"追随真好奇而非风口", c:["C13","C9"], d:"特定知识由真实好奇与热爱发现。", auth:"亲历", verify:"其论点"},
      {t:"杠杆放大专长", c:["C14"], d:"零边际复制成本的代码与媒体最强，可在睡眠时持续工作。", auth:"亲历", verify:"其原创杠杆分类学"},
      {t:"靠真实逃离竞争", c:["C10"], d:"用真实自我构建独特组合才能逃离竞争。", auth:"亲历", verify:"其论点"},
      {t:"先养成阅读的瘾", c:["C11"], d:"读你爱的直到你爱上阅读。", auth:"亲历", verify:"其个人经验表述"},
      {t:"追求长期自我而非短期回报", c:["C2","C13"], d:"特定知识需长期积累与承担不确定性。", auth:"亲历", verify:"其论点"},
    ]
  },
  {
    id:"csikszentmihalyi", name:"Mihaly Csikszentmihalyi", nameZh:"米哈里·契克森米哈伊",
    file:"experts/Mihaly-Csikszentmihalyi.md",
    gender:"男", birth:1934, died:2021, age:87, ageBracket:"65+",
    field:"心理与认知科学", income:"学者薪级（15–25万美元）", incomeTier:1, region:"西方",
    bio:"匈牙利裔美国心理学家，'心流'(Flow)理论提出者，研究最优体验与创造力。",
    schools:["mindset","practice"],
    viewpoints:[
      {t:"挑战与技能的动态平衡——心流只在能力边缘发生", c:["C1","C7"], d:"心流在挑战与技能恰好匹配时出现，进步即不断抬升天花板。", auth:"亲历", verify:"其心流研究的核心发现"},
      {t:"最优体验来自主动施压而非被动享受", c:["C7","C1"], d:"最好的时刻是主动将身心推向极限去做困难有价值之事。", auth:"亲历", verify:"其Flow核心的反直觉主张"},
      {t:"注意力是最稀缺的心理资源", c:["C3","C14"], d:"生活质量取决于如何投资注意力，管理注意力比管理时间更根本。", auth:"亲历", verify:"其注意力投资论"},
      {t:"精通某领域是通往深层心流的门票", c:["C2","C15"], d:"深层心流最易发生于已精通一门技艺者身上。", auth:"亲历", verify:"其心流与精通关系的论述"},
      {t:"十年准备期是创造性贡献的前提", c:["C2"], d:"做出被领域认可的创造性贡献前须先约十年内化规则。", auth:"借鉴", verify:"呼应Simon&Chase十年规则，非纯原创"},
      {t:"自得其乐的人格——内在动机", c:["C13"], d:"因活动本身而非外在奖赏行动者更易长期精进。", auth:"亲历", verify:"其autotelic人格原创概念"},
      {t:"复杂性是精通的方向——差异化与整合", c:["C12","C15"], d:"既越来越独特专业又越来越能与他人意义相连。", auth:"亲历", verify:"其复杂性理论"},
    ]
  },
  {
    id:"kahneman", name:"Daniel Kahneman", nameZh:"丹尼尔·卡尼曼",
    file:"experts/Daniel-Kahneman.md",
    gender:"男", birth:1934, died:2024, age:90, ageBracket:"65+",
    field:"心理与认知科学", income:"十万至百万美元级（50–100万美元）", incomeTier:2, region:"西方",
    bio:"以色列裔美国心理学家，2002诺贝尔经济学奖得主，研究专家直觉何时可信。",
    schools:["thinking","system"],
    viewpoints:[
      {t:"直觉即模式识别——而非神秘第六感", c:["C1","C6"], d:"专家直觉是大量经验后对熟悉模式的自动识别。", auth:"借鉴", verify:"发扬Herbert Simon的洞见，非其原创"},
      {t:"环境效度决定直觉可信度", c:["C17","C9"], d:"只有稳定规律、可学习线索的高效度环境中直觉才可靠。", auth:"亲历", verify:"其与Klein合作的专家直觉条件研究"},
      {t:"快速且高质量的反馈是习得专业技能的必要条件", c:["C4"], d:"反馈越快越准越可重复，经验越能转化为专长。", auth:"亲历", verify:"其专业技能习得条件论述"},
      {t:"自信与能力不等价", c:["C16"], d:"信心是判断不是证据，低效度领域尤危。", auth:"亲历", verify:"其认知偏差研究核心"},
      {t:"真正的专家知道自己的知识边界", c:["C9","C16"], d:"真专家能识别直觉何时可信何时不可信并乐于说'我不知道'。", auth:"亲历", verify:"其专家与虚假专家区分论点"},
      {t:"经验不等于专长——时间堆砌可能加固错误", c:["C1","C7"], d:"低效度环境中经验会强化错误判断，十年经验不等于十年专长。", auth:"亲历", verify:"其低效度环境研究结论"},
    ]
  },
  {
    id:"coyle", name:"Daniel Coyle", nameZh:"丹尼尔·科伊尔",
    file:"experts/Daniel-Coyle.md",
    gender:"男", birth:1968, died:null, age:58, ageBracket:"50-64",
    field:"思想写作与传播", income:"十万至百万美元级（10–30万美元）", incomeTier:2, region:"西方",
    bio:"美国科学记者，《The Talent Code》作者，实地走访全球天赋热区提炼深练习模型。",
    schools:["practice","system"],
    viewpoints:[
      {t:"天赋是培养出来的而非天生的", c:["C7","C1"], d:"天才是深练习+点燃+大师教练协同的产物，非基因馈赠。", auth:"亲历", verify:"其Talent Code核心命题"},
      {t:"深练习发生在能力边缘——甜区", c:["C1"], d:"进步最快的练习在'恰好够不着'的边缘反复触及-失误-修正。", auth:"亲历", verify:"其实地观察天赋热区的提炼"},
      {t:"髓鞘是技能的神经印记", c:["C1"], d:"反复精确激活包绕神经纤维使信号更快更强更准。", auth:"借鉴", verify:"引用神经科学髓鞘论，非其原创实验"},
      {t:"分块-重复-感受是深练习三步法", c:["C1"], d:"拆分小块、高密度重复、全感官感受错误与修正。", auth:"亲历", verify:"其深练习三规则的提炼"},
      {t:"点燃是启动剂——情绪火花", c:["C13"], d:"深练习需要被目标/偶像/身份认同点燃的情绪燃料。", auth:"亲历", verify:"其点燃概念"},
      {t:"大师教练用极简信号精准纠偏", c:["C5"], d:"好教练用最短最准的语言点燃学生并纠正偏差。", auth:"亲历", verify:"其对热区教练的观察"},
      {t:"练习质量以触及-停顿-修正次数衡量而非时长", c:["C4","C1"], d:"深练习单位是进入够不着-停顿-修正循环的次数。", auth:"亲历", verify:"其深练习度量论"},
    ]
  },
  {
    id:"konnikova", name:"Maria Konnikova", nameZh:"玛丽亚·科尼科娃",
    file:"experts/Maria-Konnikova.md",
    gender:"女", birth:1984, died:null, age:42, ageBracket:"30-49",
    field:"心理与认知科学", income:"十万至百万美元级（15–40万美元）", incomeTier:2, region:"西方",
    bio:"俄裔美国心理学家与职业扑克选手，以从零学扑克一年夺冠验证复杂技能习得。",
    schools:["mindset","system"],
    viewpoints:[
      {t:"决策质量与结果可分离", c:["C15","C16"], d:"正确决策可能输、错误决策可能赢，只评估当时信息下是否最优。", auth:"亲历", verify:"其扑克亲历+心理学解读"},
      {t:"注意力是稀缺资源——而非智力", c:["C3","C14"], d:"区分顶尖者的是能否持续把注意力精确投到当下关键信息。", auth:"亲历", verify:"其从零学扑克的实证"},
      {t:"自我控制比读心术更重要", c:["C7","C15"], d:"瓶颈是管不住自己的情绪而非看不见对手的牌。", auth:"亲历", verify:"其扑克亲历发现"},
      {t:"承认无知是精通的前提——贝叶斯更新", c:["C16","C9"], d:"高手最快承认'这条信息让我该改信念'并持续更新。", auth:"亲历", verify:"其贝叶斯思维论"},
      {t:"不完全信息博弈更接近真实精通", c:["C17","C9"], d:"扑克比国际象棋更接近人生商业医疗的真实决策。", auth:"亲历", verify:"其扑克vs象棋论点"},
      {t:"从零到精通可被设计——师承+理论+反馈+实战闭环", c:["C5","C4","C1"], d:"选世界级导师、学理论、每手复盘、真实赛场接受反馈。", auth:"亲历", verify:"其一年从零到冠军的亲历验证"},
      {t:"情绪与认知不可分", c:["C15","C7"], d:"把情绪当信息源而非敌人，识别它、解读它、不让它越权。", auth:"亲历", verify:"其心理学家视角"},
    ]
  },
  {
    id:"kasparov", name:"Garry Kasparov", nameZh:"加里·卡斯帕罗夫",
    file:"experts/Garry-Kasparov.md",
    gender:"男", birth:1963, died:null, age:63, ageBracket:"50-64",
    field:"体育·竞技与修行", income:"数百万至千万级（数百万美元）", incomeTier:3, region:"西方",
    bio:"俄罗斯前国际象棋世界冠军，将棋艺决策提炼为《How Life Imitates Chess》。",
    schools:["thinking","practice","action"],
    viewpoints:[
      {t:"直觉是海量经验内化后的模式识别", c:["C1","C6"], d:"棋感是多年积累的心智数据库在潜意识自动比对。", auth:"亲历", verify:"其棋手生涯的心智数据库论"},
      {t:"对自己残忍地诚实是精进的分水岭", c:["C16"], d:"客观复盘失误不被胜负和自尊蒙蔽。", auth:"亲历", verify:"其赛后复盘方法论"},
      {t:"战略与战术必须共生", c:["C9","C1"], d:"长期愿景与短期精确计算缺一不可。", auth:"亲历", verify:"其棋艺战略战术论"},
      {t:"复盘重于实战", c:["C4","C16"], d:"赛后逐手拆解是把经验转化为专长的关键机制。", auth:"亲历", verify:"其对弈复盘实践"},
      {t:"每一刻都做当时最优决策", c:["C9","C6"], d:"养成在任何信息约束下做当前最优判断的习惯。", auth:"亲历", verify:"其决策论"},
      {t:"人机协作而非人机对抗", c:["C5","C12"], d:"把工具当放大器而非替代者，把创造力投向机器做不到处。", auth:"亲历", verify:"其Deep Blue对弈后的反思"},
      {t:"跨界迁移是检验真精通的试金石", c:["C12","C16"], d:"真掌握的是决策与思维框架而非棋招，能从棋盘迁移到商业政治。", auth:"亲历", verify:"其从棋到商业政治迁移论"},
    ]
  },
  {
    id:"kobe", name:"Kobe Bryant", nameZh:"科比·布莱恩特",
    file:"experts/Kobe-Bryant.md",
    gender:"男", birth:1978, died:2020, age:41, ageBracket:"30-49",
    field:"体育·竞技与修行", income:"亿美元以上（约6亿美元）", incomeTier:5, region:"西方",
    bio:"NBA湖人队巨星，5次总冠军，《Mamba Mentality》作者，以偏执训练著称。",
    schools:["practice","action"],
    viewpoints:[
      {t:"精通是过程的偏执，而非结果的奖赏", c:["C15","C8"], d:"把全部注意力锁在过程上，结果是过程做对的副产品。", auth:"亲历", verify:"其Mamba Mentality核心"},
      {t:"以偏执对抗熵增", c:["C8","C2"], d:"把对退步的恐惧当持续训练的燃料，松一口气就开始滑落。", auth:"亲历", verify:"其自述训练驱动"},
      {t:"苦工压倒天赋", c:["C2","C1"], d:"天赋只给起点优势，天花板由谁训练更久更细更狠决定。", auth:"亲历", verify:"其反复主张"},
      {t:"要的是效果，不是好看", c:["C16","C4"], d:"对形式美观但无效的动作零容忍，以结果为唯一裁判。", auth:"亲历", verify:"其训练实效论"},
      {t:"单目标全押", c:["C9","C3"], d:"挑一只兔子全押，放弃分散的安全感。", auth:"亲历", verify:"其聚焦论"},
      {t:"细节是精通的真正战场", c:["C1","C3"], d:"专家与高手的差距在别人看不见的细节颗粒度。", auth:"亲历", verify:"其退役后毫米级细节研究"},
      {t:"把精通当终生的手艺而非职业", c:["C15"], d:"把手艺本身放在身份之上，精通没有退役一刻。", auth:"亲历", verify:"其身份认同"},
    ]
  },
  {
    id:"serena", name:"Serena Williams", nameZh:"塞雷娜·威廉姆斯",
    file:"experts/Serena-Williams.md",
    gender:"女", birth:1981, died:null, age:45, ageBracket:"30-49",
    field:"体育·竞技与修行", income:"亿美元以上（约3亿美元）", incomeTier:5, region:"西方",
    bio:"美国网球运动员，23个大满贯单打冠军（公开赛年代纪录），以力量打法改写女子网球。",
    schools:["mindset","practice"],
    viewpoints:[
      {t:"冠军由练习而非比赛定义", c:["C1","C2"], d:"你怎样训练就怎样比赛，精通在无人观看的训练馆。", auth:"亲历", verify:"其训练论"},
      {t:"无人相信时仍要自信", c:["C7","C8"], d:"资源不对等时自我信念是唯一可调动的资产。", auth:"亲历", verify:"其资源不对等时的信念论"},
      {t:"朝向不可达的完美无限逼近", c:["C1","C8"], d:"明知永不可达完美却永不停止尝试。", auth:"亲历", verify:"其完美主义"},
      {t:"从失败中恢复的能力才是冠军", c:["C7","C8"], d:"冠军衡量在跌倒后如何爬起而非赢多少。", auth:"亲历", verify:"其伤病产后重返赛场的亲历"},
      {t:"苦工是人人能做的差异化变量", c:["C2","C1"], d:"身体技术差距被拉平后勤奋专注是仅剩可控变量。", auth:"亲历", verify:"其勤奋论"},
      {t:"先把'我是冠军'设定为事实再让能力追上信念", c:["C15","C7"], d:"自我设定是能力建设的起点而非结果。", auth:"亲历", verify:"其父Richard的身份先行训练法"},
      {t:"精通是进化而非谢幕", c:["C15","C2"], d:"把已掌握能力迁移到新战场，终身不设上限。", auth:"亲历", verify:"其Vogue退役自述"},
    ]
  },
  {
    id:"federer", name:"Roger Federer", nameZh:"罗杰·费德勒",
    file:"experts/Roger-Federer.md",
    gender:"男", birth:1981, died:null, age:45, ageBracket:"30-49",
    field:"体育·竞技与修行", income:"亿美元以上（约5.5亿美元）", incomeTier:5, region:"西方",
    bio:"瑞士网球运动员，20大满贯，以'举重若轻'球风与晚专精、可持续著称。",
    schools:["practice","mindset"],
    viewpoints:[
      {t:"举重若轻是苦工的投影，不是天赋的证明", c:["C2","C7"], d:"effortless is a myth，外在从容是数万小时苦工的自动化。", auth:"亲历", verify:"其达特茅斯毕业演讲"},
      {t:"练得多于赛", c:["C1","C2"], d:"精通不在参赛次数而在练习对比赛的高比例。", auth:"亲历", verify:"其达特茅斯演讲"},
      {t:"精通由那20%的输局定义", c:["C7","C4"], d:"区别专家的不是赢时多风光而是输时如何复盘不崩。", auth:"亲历", verify:"其达特茅斯演讲胜率论"},
      {t:"晚专精反而延长精通寿命", c:["C12","C2"], d:"童年玩多运动青春期后才聚焦避免早衰与倦怠。", auth:"借鉴", verify:"运动发展心理学文献以其为晚专精案例"},
      {t:"质量高于数量，休息是训练的一部分", c:["C14","C1"], d:"用练得精+恢复足换可持续，过度训练是精通的自杀。", auth:"亲历", verify:"其可持续训练论"},
      {t:"每一分都活在当下", c:["C15"], d:"打一个球时不能想上一分或下一分。", auth:"亲历", verify:"其达特茅斯演讲"},
      {t:"把苦工视为礼物而非代价", c:["C13","C2"], d:"把日复一日训练当礼物而非痛苦预付，让可持续成为可能。", auth:"亲历", verify:"其达特茅斯演讲"},
    ]
  },
  {
    id:"goodall", name:"Jane Goodall", nameZh:"简·古道尔",
    file:"experts/Jane-Goodall.md",
    gender:"女", birth:1934, died:null, age:92, ageBracket:"65+",
    field:"医学与自然科学", income:"十万至百万美元级（50–100万美元）", incomeTier:2, region:"西方",
    bio:"英国灵长类学家，26岁赴坦桑尼亚贡贝研究黑猩猩60余年，凭田野观察改写灵长类学。",
    schools:["practice","mindset"],
    viewpoints:[
      {t:"耐心是田野精通的第一前提", c:["C2","C3"], d:"以数月乃至数年静默等待换取对象信任，无即时回报地长时间坚持。", auth:"亲历", verify:"其贡贝数千小时静坐观察亲历"},
      {t:"沉浸式长期观察超越理论预设", c:["C15","C2"], d:"让对象自己说话而非用先入框架，低理论高沉浸催生颠覆性发现。", auth:"亲历", verify:"其低理论高沉浸方法论"},
      {t:"对研究对象的共情不是缺陷而是方法", c:["C13","C15"], d:"与对象建立情感联结而看见被客观视角遮蔽的模式。", auth:"亲历", verify:"其共情式观察方法论"},
      {t:"从个体到全球：精通须向使命感延伸", c:["C13","C15"], d:"理解-关怀-帮助-拯救四步闭环，只停留理解不算真正精通。", auth:"亲历", verify:"其从科学家到保护行动者的转型"},
      {t:"赋能他人是精通的最终形态", c:["C16","C15"], d:"专家终极价值在能否让他人也具备行动力而非仅展示自身卓越。", auth:"亲历", verify:"其Roots&Shoots赋能理念"},
      {t:"跨学科直觉与非传统路径可以催生突破", c:["C12","C9"], d:"非科班局外人视角恰恰是突破僵化范式的关键。", auth:"亲历", verify:"其非科班改写范式经历"},
    ]
  },
  {
    id:"rams", name:"Dieter Rams", nameZh:"迪特·拉姆斯",
    file:"experts/Dieter-Rams.md",
    gender:"男", birth:1932, died:null, age:94, ageBracket:"65+",
    field:"艺术与设计", income:"十万至百万美元级（20–50万美元）", incomeTier:2, region:"西方",
    bio:"德国工业设计师，博朗设计总监近四十年，提出最具影响力的'十大设计原则'。",
    schools:["strategy","action"],
    viewpoints:[
      {t:"减法即精通：少即更好", c:["C14","C6"], d:"反复追问哪些可去掉，知道什么不该做是专业能力最高体现。", auth:"亲历", verify:"其十大设计原则核心"},
      {t:"对使用者的深切尊重是精通的伦理基础", c:["C15","C9"], d:"专业能力首先是服务能力而非自我表达。", auth:"亲历", verify:"其设计声明"},
      {t:"诚实是精通的品质标准", c:["C16"], d:"不用包装营销虚饰成果，让成果自己说话。", auth:"亲历", verify:"其第六条设计原则"},
      {t:"细节的彻底性区分专业与业余", c:["C1","C3"], d:"在最微小决策处也不放松标准，非随意性是工艺分水岭。", auth:"亲历", verify:"其第八条设计原则"},
      {t:"持久性对抗时尚：精通追求超越时代的正确", c:["C2","C14"], d:"追求十年五十年后仍成立的正确而非当下掌声。", auth:"亲历", verify:"其第七条设计原则"},
      {t:"系统性自省：用原则清单反复校准自己", c:["C5","C16"], d:"把经验凝练为可反复检验的准则并用它持续自审。", auth:"亲历", verify:"其十大原则的自审机制"},
    ]
  },
  {
    id:"adria", name:"Ferran Adrià", nameZh:"费兰·阿德里亚",
    file:"experts/Ferran-Adria.md",
    gender:"男", birth:1962, died:null, age:64, ageBracket:"50-64",
    field:"艺术与设计", income:"数百万至千万级（300–800万美元）", incomeTier:3, region:"西方",
    bio:"西班牙加泰罗尼亚厨师，elBulli餐厅主厨，将烹饪制度化为研发实验室，连续多年世界第一。",
    schools:["practice","action"],
    viewpoints:[
      {t:"不复制是创造的第一条戒律", c:["C10","C16"], d:"在掌握传统后主动拒绝复制，追问'有没有没人做过的'。", auth:"亲历", verify:"其elBulli创造信条"},
      {t:"全身心投入：精通需要生命级别的奉献", c:["C2","C3"], d:"时间资源不对称集中近乎排他投入。", auth:"亲历", verify:"其半年歇业研发制度"},
      {t:"系统性实验是创造的方法论引擎", c:["C4","C1"], d:"制度化实验-筛选-记录，承受大量失败。", auth:"亲历", verify:"其每年数百实验的研发流程"},
      {t:"精确记录与系统编码是精通的放大器", c:["C4","C16"], d:"把个人创造外部化为可检索可传承的编码体系。", auth:"亲历", verify:"其1846道菜系统建档"},
      {t:"在巅峰时主动终止：精通要求敢于打破成功惯性", c:["C9","C15"], d:"在最高点终止以防精通退化为自我重复。", auth:"亲历", verify:"其2011巅峰关闭elBulli"},
      {t:"拒绝艺术标签：精通者须认清自己的媒介", c:["C15","C9"], d:"坚持把创造媒介作为思考边界，不因虚荣偏离本质。", auth:"亲历", verify:"其'我是厨师不是艺术家'自我定位"},
    ]
  },
  {
    id:"torvalds", name:"Linus Torvalds", nameZh:"林纳斯·托瓦兹",
    file:"experts/Linus-Torvalds.md",
    gender:"男", birth:1969, died:null, age:57, ageBracket:"50-64",
    field:"计算机与工程科技", income:"数百万至千万级（100–200万美元）", incomeTier:3, region:"西方",
    bio:"芬兰裔美国程序员，Linux内核与git创造者，Linux Foundation Fellow。",
    schools:["thinking","action","system"],
    viewpoints:[
      {t:"代码即论证：精通以可运行的实现为最终货币", c:["C16","C4"], d:"把观点变成可执行可测试可合并的对象，终结立场博弈。", auth:"亲历", verify:"其LKML'show me the code'实践"},
      {t:"数据结构优先于代码：精通看的是问题的骨架", c:["C6","C1"], d:"精通在对问题结构本质的把握而非代码行数。", auth:"亲历", verify:"其编程哲学论"},
      {t:"内在驱动是精通的可持续燃料", c:["C13"], d:"解决问题本身好玩可支撑数十年，外部激励会枯竭。", auth:"亲历", verify:"其'编程本身有趣'论"},
      {t:"从解决自己的问题开始", c:["C9","C13"], d:"精通不始于宏大愿景而始于真实切身的痛点。", auth:"亲历", verify:"其Linux/git诞生于自身需求"},
      {t:"说'不'是维护者精通的核心技术", c:["C14","C9"], d:"守护阶段核心从添加转变为甄别与拒绝。", auth:"亲历", verify:"其内核维护者拒绝补丁实践"},
      {t:"狡黠与不循常规", c:["C9"], d:"纯粹技术不够，还需在规则约束中创造性穿行。", auth:"亲历", verify:"其TED演讲sneaky bastard"},
      {t:"分布式协作与信任让精通变成群体能力", c:["C5","C16"], d:"设计让他人也能高效贡献的系统结构。", auth:"亲历", verify:"其git协作机制设计"},
    ]
  },
  {
    id:"greene", name:"Robert Greene", nameZh:"罗伯特·格林",
    file:"experts/Robert-Greene.md",
    gender:"男", birth:1959, died:null, age:67, ageBracket:"65+",
    field:"思想写作与传播", income:"数百万至千万级（200–500万美元）", incomeTier:3, region:"西方",
    bio:"美国畅销书作家，《Mastery》作者，通过历史大师个案研究提炼精通的普遍模式。",
    schools:["practice","mindset","strategy"],
    viewpoints:[
      {t:"发现并追随'人生使命'(Life's Task)", c:["C13","C9"], d:"找到内心深处的天然亲和力并全力追随。", auth:"亲历", verify:"其Mastery原创概念"},
      {t:"精通遵循三阶段路径，无捷径可走", c:["C2","C15"], d:"学徒-创造活跃-精通三不可跳过阶段。", auth:"亲历", verify:"其三阶段原创框架"},
      {t:"学徒阶段的核心是'向痛而行'", c:["C1","C7"], d:"主动走向困难与阻力，压制自我接受笨拙。", auth:"亲历", verify:"其学徒期方法论"},
      {t:"最大的障碍是'知识的幻觉'，而非无知", c:["C16"], d:"阻碍精通的是你以为自己已经知道了。", auth:"亲历", verify:"其Mastery核心论点"},
      {t:"保持灵活，拒绝僵化的自我定义", c:["C15","C9"], d:"过早确定'我就是做X的人'会限制视野。", auth:"亲历", verify:"其反僵化论"},
      {t:"精通不靠天赋基因，靠持续练习与好奇", c:["C1","C11","C13"], d:"历史大师共同点是痴迷式投入而非基因。", auth:"亲历", verify:"其反天赋论"},
      {t:"社交智力是精通的必要组成部分", c:["C5"], d:"现实世界的精通总是在社会网络中运作。", auth:"亲历", verify:"其Mastery单列社交智力维度"},
    ]
  },
  {
    id:"ferriss", name:"Tim Ferriss", nameZh:"蒂姆·费里斯",
    file:"experts/Tim-Ferriss.md",
    gender:"男", birth:1977, died:null, age:49, ageBracket:"30-49",
    field:"思想写作与传播", income:"千万至亿美元级（500–2000万美元）", incomeTier:4, region:"西方",
    bio:"美国畅销书作家与播客主，《4-Hour Chef》《Tools of Titans》作者，专研加速学习。",
    schools:["strategy","action"],
    viewpoints:[
      {t:"先学'如何学'，再学具体技能（元学习优先）", c:["C11","C6"], d:"先研究已学会的人是怎么学会的再规划学习。", auth:"亲历", verify:"其meta-learning方法论"},
      {t:"拆解为最小可学组件（Deconstruction）", c:["C6","C16"], d:"把庞大技能拆成最小可学积木块。", auth:"亲历", verify:"其DiSSS框架"},
      {t:"用80/20法则筛选高杠杆组件（Selection）", c:["C9","C14"], d:"找出带来80%效果的20%组件。", auth:"借鉴", verify:"应用帕累托法则，非其原创"},
      {t:"确定最优学习顺序（Sequencing）", c:["C6","C1"], d:"让每一步为下一步铺路减少总体时间。", auth:"亲历", verify:"其DiSSS框架"},
      {t:"设定真实后果以保障执行（Stakes）", c:["C16","C8"], d:"为不完成设定真实后果，没有利害的学习必然失败。", auth:"亲历", verify:"其DiSSS框架"},
      {t:"最小有效剂量原则（MED）", c:["C14"], d:"找到能产生效果的最小投入量，超出纯属浪费。", auth:"借鉴", verify:"借用医学最小有效剂量概念"},
      {t:"恐惧设定优于目标设定（Fear-setting）", c:["C7","C9"], d:"定义恐惧比定义目标更能推动行动。", auth:"亲历", verify:"其TED演讲原创恐惧设定法"},
      {t:"向顶尖人物要故事而非建议", c:["C5","C16"], d:"故事藏着真实路径与失败细节，建议多是幸存者偏差式通用语。", auth:"亲历", verify:"其数百次采访方法论"},
    ]
  },
  {
    id:"tharp", name:"Twyla Tharp", nameZh:"特怀拉·萨普",
    file:"experts/Twyla-Tharp.md",
    gender:"女", birth:1941, died:null, age:85, ageBracket:"65+",
    field:"艺术与设计", income:"数百万至千万级（100–300万美元）", incomeTier:3, region:"西方",
    bio:"美国现代舞编舞家，《The Creative Habit》作者，把直觉式创作拆解为可教授的习惯方法论。",
    schools:["action","practice"],
    viewpoints:[
      {t:"创造力即习惯，而非天赋", c:["C1","C13"], d:"创作是好工作习惯的产物，天才叙事掩盖了纪律与苦功。", auth:"亲历", verify:"其The Creative Habit核心命题"},
      {t:"例行仪式保护创造的起点", c:["C1","C3"], d:"仪式让启动自动化，抵御起步期的退缩。", auth:"亲历", verify:"其晨间仪式实践"},
      {t:"日常精进是专家的基本盘", c:["C2","C1"], d:"专家与业余者的差别在能否把精进变成每日例行公事。", auth:"亲历", verify:"其'习惯的民主'主张"},
      {t:"刻意练习自己的短板", c:["C1"], d:"高手搁下纯熟技能，专门攻自己的缺陷。", auth:"亲历", verify:"其'搁下强项专攻缺陷'主张"},
      {t:"精通=经验+视野+勇气+技能", c:["C15","C7"], d:"精通是复合态，目的是支持你冒更大的风险。", auth:"亲历", verify:"其Mastery章论述"},
      {t:"激情与技能缺一不可", c:["C13","C1"], d:"无技能则热切却挣扎，无激情则止于工匠。", auth:"亲历", verify:"其创作生命本质论"},
      {t:"以劳动者自居，拒绝艺术家标签", c:["C15"], d:"专业身份来自持续交付的劳动而非天赋认证。", auth:"亲历", verify:"其'我是工人'的自我定位"},
    ]
  },
  {
    id:"stanislavski", name:"Konstantin Stanislavski", nameZh:"康斯坦丁·斯坦尼斯拉夫斯基",
    file:"experts/Konstantin-Stanislavski.md",
    gender:"男", birth:1863, died:1938, age:75, ageBracket:"65+",
    field:"艺术与设计", income:"历史人物（剧院收入）", incomeTier:1, region:"西方",
    bio:"俄罗斯戏剧演员/导演，斯坦尼斯拉夫斯基表演体系创始人，让'成为专家'成为可按步骤学习的学科。",
    schools:["system","action"],
    viewpoints:[
      {t:"有意识的技艺通向无意识的创造", c:["C1","C15"], d:"灵感不可强求，但可经有意识训练稳定触发。", auth:"亲历", verify:"其表演体系最高命题"},
      {t:"灵感不可靠，技术才是底色", c:["C1","C16"], d:"有技艺者即使无灵感也能完成可信表演。", auth:"亲历", verify:"其对'个性演员'的批评"},
      {t:"身体与声音须训练成灵敏工具", c:["C1"], d:"潜意识经由身体显形，技艺精度决定表达精度。", auth:"亲历", verify:"其An Actor Prepares论述"},
      {t:"天赋与技术是加法而非替代", c:["C7","C1"], d:"天赋是必需原料，但仅靠天赋不能成事。", auth:"亲历", verify:"其系统性反驳天才论"},
      {t:"先有意识地做，再让它真诚", c:["C15","C16"], d:"自觉的分析工作触发潜意识与灵感。", auth:"亲历", verify:"其'magic if'方法论"},
      {t:"爱艺术中的自己，而非自己中的艺术", c:["C15","C7"], d:"去虚荣才能精进，把注意力放在作品上。", auth:"亲历", verify:"其反表演虚荣的实践"},
      {t:"没有小角色，只有小演员", c:["C15"], d:"专家身份取决于投入的完整度而非机会大小。", auth:"借鉴", verify:"归属存疑，传统归于其体系"},
    ]
  },
  {
    id:"gould", name:"Glenn Gould", nameZh:"格伦·古尔德",
    file:"experts/Glenn-Gould.md",
    gender:"男", birth:1932, died:1982, age:50, ageBracket:"50-64",
    field:"艺术与设计", income:"十万至百万美元级（15–40万美元）", incomeTier:2, region:"西方",
    bio:"加拿大钢琴家，32岁巅峰退出音乐会转向录音室，以对巴赫的诠释与录音哲学闻名。",
    schools:["practice","mindset"],
    viewpoints:[
      {t:"技艺的尽头是修行而非表演", c:["C15","C2"], d:"艺术是终其一生的'惊奇与宁静'的构造。", auth:"亲历", verify:"其Let's Ban Applause主张"},
      {t:"巅峰期敢于放弃旧模式", c:["C9","C15"], d:"形式可疑则弃之，自主性在于判断什么配得上技艺。", auth:"亲历", verify:"其32岁退出音乐会"},
      {t:"技艺需要环境的重构", c:["C5","C14"], d:"工具与媒介是技艺的一部分，专家应重构工作环境。", auth:"亲历", verify:"其录音室取代舞台"},
      {t:"完美主义是制作过程而非焦虑", c:["C4","C16"], d:"把完美从不可出错转化为可迭代构造的对象。", auth:"亲历", verify:"其'创造性作弊'剪辑实践"},
      {t:"孤独是燃料而非代价", c:["C13","C15"], d:"隔离评价才能保住创造产出的纯度。", auth:"亲历", verify:"其'隔离是幸福'言论"},
      {t:"以深度对抗广度", c:["C3","C2"], d:"数十年深耕巴赫，反复录制同一作品。", auth:"亲历", verify:"其哥德堡变奏曲两个版本"},
      {t:"组织与纪律是产出自由的底座", c:["C5","C14"], d:"铁意志+列清单支撑高产。", auth:"借鉴", verify:"传记转述其秩序与掌控"},
    ]
  },
  {
    id:"king", name:"Stephen King", nameZh:"斯蒂芬·金",
    file:"experts/Stephen-King.md",
    gender:"男", birth:1947, died:null, age:78, ageBracket:"65+",
    field:"思想写作与传播", income:"千万至亿美元级（2000–4000万美元）", incomeTier:4, region:"西方",
    bio:"美国'恐怖之王'，65部以上小说，《On Writing》作者，把写作彻底职业化的终身纪律者。",
    schools:["practice","action"],
    viewpoints:[
      {t:"没有捷径：大量读与写是唯一通路", c:["C2","C11"], d:"输入与输出必须同时高量运转，无替代方案。", auth:"亲历", verify:"其On Writing第一法则"},
      {t:"业余者等灵感，专业者去上班", c:["C16","C15"], d:"把创作降格为职业，反而解放了创作。", auth:"亲历", verify:"其'按时上班'论"},
      {t:"每日定额与连续性纪律", c:["C2","C1"], d:"每天10页/2000词，连续性本身是质量机制。", auth:"亲历", verify:"其写作日常"},
      {t:"能力是练出来的肌肉", c:["C1","C7"], d:"想象力经日复一日锤炼，天赋只是可强化的起点。", auth:"亲历", verify:"其'想象力是肌肉'论"},
      {t:"量大本身就是学习方法", c:["C2","C11"], d:"读多少写多少是能力的一部分，只可经由做来学会。", auth:"亲历", verify:"其learn only by doing"},
      {t:"天赋的标志是乐于不计回报地练习", c:["C13","C1"], d:"天赋不是豁免练习，而是使练习不成其为负担。", auth:"亲历", verify:"其反直觉天赋判据"},
      {t:"修改是精通的另一半", c:["C4","C16"], d:"第二稿=第一稿−10%，精通是反复修正的系统。", auth:"亲历", verify:"其写作法则"},
      {t:"阅读是与产出并重的输入侧修炼", c:["C11"], d:"没时间读就没时间写，阅读是创作中枢。", auth:"亲历", verify:"其阅读论"},
    ]
  },
  {
    id:"pressfield", name:"Steven Pressfield", nameZh:"史蒂文·普莱斯菲尔德",
    file:"experts/Steven-Pressfield.md",
    gender:"男", birth:1943, died:null, age:82, ageBracket:"65+",
    field:"思想写作与传播", income:"十万至百万美元级（50–200万美元）", incomeTier:2, region:"西方",
    bio:"美国作家，《The War of Art》作者，以'阻力'与'转正'概念把成为专家重新定义为内在战争。",
    schools:["action","mindset"],
    viewpoints:[
      {t:"阻力是精通的第一对手，也是重要性的信标", c:["C7","C16"], d:"阻力越大往往越说明这正是该做的事。", auth:"亲历", verify:"其Resistance概念"},
      {t:"业余者vs专业者：一套可判定的行为清单", c:["C15","C16"], d:"区分二者不是才华而是可观察的习惯模式。", auth:"亲历", verify:"其业余/专业对照清单"},
      {t:"转正是免费的自我决定，代价在内心", c:["C15","C7"], d:"门槛是决心本身，成本是放弃舒适。", auth:"亲历", verify:"其Turning Pro主张"},
      {t:"精通标准：做到'不可能做错'", c:["C1","C15"], d:"业余者做到正确为止，专业者练到不可能错。", auth:"亲历", verify:"其精进标准定义"},
      {t:"成功是工作的副产品", c:["C15","C16"], d:"宏大幻想是业余者症候，专业者只做工作。", auth:"亲历", verify:"其副产品论"},
      {t:"你无法摆脱习惯，只能整体替换", c:["C14","C15"], d:"把业余习惯替换为专业习惯是转正的本质。", auth:"亲历", verify:"其习惯替换论"},
      {t:"内在批评声音是Resistance而非自己", c:["C7","C16"], d:"识别自我怀疑的伪装并驳回，继续工作。", auth:"亲历", verify:"其认知技能论"},
      {t:"终身在场：转正没有时间表", c:["C2","C8"], d:"17年失败与52岁出道证明转正不分早晚。", auth:"亲历", verify:"其个人经历实证"},
    ]
  },
  {
    id:"clear", name:"James Clear", nameZh:"詹姆斯·克利尔",
    file:"experts/James-Clear.md",
    gender:"男", birth:1986, died:null, age:40, ageBracket:"30-49",
    field:"思想写作与传播", income:"千万至亿美元级（500–2000万美元）", incomeTier:4, region:"西方",
    bio:"美国作家，《Atomic Habits》作者，把习惯科学翻译为可操作的行为工程。",
    schools:["system","action"],
    viewpoints:[
      {t:"你不会上升到目标高度，只会跌落到系统水平", c:["C5","C15"], d:"实际表现取决于每天运行的机制而非宣称的目标。", auth:"亲历", verify:"其Atomic Habits核心句"},
      {t:"1%复利：微小改进的指数威力", c:["C2","C1"], d:"每日改进1%一年强37倍，差距是复利结果。", auth:"亲历", verify:"其复利隐喻"},
      {t:"身份认同驱动行为：先成为再做到", c:["C15"], d:"每次行动都是身份的一票，自我叙事维持长期纪律。", auth:"亲历", verify:"其身份选票论"},
      {t:"潜能潜伏期：成果滞后于投入", c:["C2","C8"], d:"突破在临界点之后，需熬过看似无进展的阶段。", auth:"亲历", verify:"其Plateau of Latent Potential"},
      {t:"环境设计优于意志力", c:["C14","C5"], d:"改造世界而非强化自我，让正确行为毫不费力。", auth:"亲历", verify:"其环境工程论"},
      {t:"行为改变四定律", c:["C5","C1"], d:"明显、诱人、容易、满足，习惯可工程化设计。", auth:"亲历", verify:"其四大定律框架"},
      {t:"永远不要连续错过两次", c:["C8","C2"], d:"一次断档是事故，两次就是新坏习惯的开端。", auth:"亲历", verify:"其恢复能力论"},
      {t:"结果-过程-身份三层模型", c:["C15"], d:"专家的养成是一次身份迁移，不是任务完成。", auth:"亲历", verify:"其三层模型"},
    ]
  },
  {
    id:"mcclintock", name:"Barbara McClintock", nameZh:"芭芭拉·麦克林托克",
    file:"experts/Barbara-McClintock.md",
    gender:"女", birth:1902, died:1992, age:90, ageBracket:"65+",
    field:"医学与自然科学", income:"学者薪级（2–5万美元）", incomeTier:1, region:"西方",
    bio:"美国遗传学家，1983诺贝尔奖得主，以'聆听有机体'的耐心研究与转座子发现闻名。",
    schools:["mindset","practice"],
    viewpoints:[
      {t:"把观察对象当作对话伙伴", c:["C15","C3"], d:"精通始于'聆听'而非'征服'，以提问-回应关系研究材料。", auth:"亲历", verify:"其'向玉米提问'方法论"},
      {t:"'对有机体的感觉'——具身化直觉", c:["C1","C15"], d:"直觉建立在对每个个体数十年凝视之上，靠具体性取胜。", auth:"亲历", verify:"其拒绝抽象化方法"},
      {t:"耐心是方法论而非美德", c:["C2","C4"], d:"用三年核对数据才宣布发现，慢是精密结论的代价。", auth:"亲历", verify:"其转座子验证过程"},
      {t:"独立判断高于同行认可", c:["C16","C8"], d:"外部验证缺席30年仍维持判断质量。", auth:"亲历", verify:"其'没人能让你停下来'"},
      {t:"发现与享受一体", c:["C13","C2"], d:"持久的乐趣是支撑数十年孤寂研究的第一燃料。", auth:"亲历", verify:"其诺奖演讲"},
      {t:"以对象为中心胜过以成果为中心", c:["C15","C13"], d:"问题重心放在对象上，冷遇与质疑就无法劫持路线。", auth:"亲历", verify:"其生存结构论"},
    ]
  },
  {
    id:"wilson", name:"Edward O. Wilson", nameZh:"爱德华·威尔逊",
    file:"experts/Edward-O-Wilson.md",
    gender:"男", birth:1929, died:2021, age:92, ageBracket:"65+",
    field:"医学与自然科学", income:"十万至百万美元级（20–60万美元）", incomeTier:2, region:"西方",
    bio:"美国生物学家，社会生物学之父，两届普利策奖得主，《Letters to a Young Scientist》作者。",
    schools:["strategy","mindset"],
    viewpoints:[
      {t:"激情是科学的第一资本", c:["C13","C8"], d:"激情导向坚持；智力过高反而易因无聊而弃场。", auth:"亲历", verify:"其'把激情放在训练之前'"},
      {t:"选择冷门战场——远离枪声", c:["C9","C10"], d:"避开热门领域，竞争烈度由你选的位置决定。", auth:"亲历", verify:"其行军隐喻"},
      {t:"原创性源于单一个体的野心", c:["C13","C10"], d:"创造先在孤独头脑中孕育，'成为第一'是血腥味。", auth:"亲历", verify:"其原创性理论"},
      {t:"想象力优先于技术能力", c:["C6","C12"], d:"工具可外包，问题意识不能；正确的提问高于答案。", auth:"亲历", verify:"其数学半文盲自述"},
      {t:"为混乱与失败做心理预算", c:["C7","C15"], d:"松弛与白日梦是创造机制而非浪费时间。", auth:"亲历", verify:"其TED建议"},
      {t:"坚持路径本身是最高要求", c:["C2","C8"], d:"选一条路走到底本身就是稀缺品质。", auth:"亲历", verify:"其'世界需要你'结语"},
    ]
  },
  {
    id:"buffett", name:"Warren Buffett", nameZh:"沃伦·巴菲特",
    file:"experts/Warren-Buffett.md",
    gender:"男", birth:1930, died:null, age:95, ageBracket:"65+",
    field:"投资与金融", income:"亿美元以上（1300–1500亿美元）", incomeTier:5, region:"西方",
    bio:"美国投资家，伯克希尔·哈撒韦CEO，以能力圈、护城河与长期主义著称。",
    schools:["thinking","strategy"],
    viewpoints:[
      {t:"能力圈：诚实划定'知道'与'不知道'的边界", c:["C9","C16"], d:"圈的大小不重要，知道边界才至关重要。", auth:"亲历", verify:"其1996股东信定义"},
      {t:"每日海量阅读，知识像复利", c:["C11","C2"], d:"每天读500页，持续性本身即壁垒。", auth:"亲历", verify:"其HBO纪录片自述"},
      {t:"极端耐心——甜区挥棒与懒惰是基石", c:["C14","C8"], d:"高水平表现为大多数时候正确地不行动。", auth:"亲历", verify:"其Ted Williams比喻"},
      {t:"长期主义的复利结构", c:["C2","C8"], d:"能以十年为单位思考，才配得上级联复利。", auth:"亲历", verify:"其十年维度论"},
      {t:"风险即无知", c:["C16","C9"], d:"精进直接降低的是风险函数而非收益。", auth:"亲历", verify:"其风险定义"},
      {t:"护城河思维", c:["C10","C9"], d:"构建难以复制、持续加深的特定能力组合。", auth:"亲历", verify:"其选择被投资物标准"},
    ]
  },
  {
    id:"musashi", name:"Miyamoto Musashi", nameZh:"宫本武藏",
    file:"experts/Miyamoto-Musashi.md",
    gender:"男", birth:1584, died:1645, age:61, ageBracket:"50-64",
    field:"体育·竞技与修行", income:"历史人物（收入不适用）", incomeTier:1, region:"日本",
    bio:"日本剑圣，《五轮书》作者，60余场真剑决斗不败，把剑道升维为'万般技艺之道'。",
    schools:["practice","mindset"],
    viewpoints:[
      {t:"道即训练", c:["C15","C2"], d:"训练本身是目的而非通向目的的工具。", auth:"亲历", verify:"其《五轮书》九条心法"},
      {t:"千日练、万日磨", c:["C2"], d:"成形与琢磨两阶段，打磨需数倍时间且永无止境。", auth:"亲历", verify:"其《五轮书》地之卷"},
      {t:"万般技艺之道", c:["C12","C9"], d:"以本行为核心通晓百艺，反哺专精。", auth:"亲历", verify:"其兼修书画禅法实践"},
      {t:"五十岁方悟道", c:["C2","C6"], d:"技能早熟不等于道的成熟，原理升华需数十年。", auth:"亲历", verify:"其自序"},
      {t:"观见不可见之物", c:["C3","C1"], d:"专家感知隐微细节与不可见意图，靠实战经验养成。", auth:"亲历", verify:"其九条心法第7条"},
      {t:"以一事知万事", c:["C6","C12"], d:"由繁入简提炼原理，再由简驭繁应用万象。", auth:"亲历", verify:"其兵法原理"},
      {t:"内化于心体", c:["C1","C16"], d:"知识须融入身体而非止于阅读记忆模仿。", auth:"亲历", verify:"其《五轮书》结尾教诲"},
      {t:"日日自胜与偏差复利", c:["C15","C9"], d:"与昨日自己比较；初始方向的小偏差会放大。", auth:"亲历", verify:"其火之卷"},
    ]
  },
  {
    id:"aurelius", name:"Marcus Aurelius", nameZh:"马可·奥勒留",
    file:"experts/Marcus-Aurelius.md",
    gender:"男", birth:121, died:180, age:58, ageBracket:"50-64",
    field:"哲学与内在修炼", income:"历史人物（收入不适用）", incomeTier:1, region:"古罗马",
    bio:"古罗马皇帝，斯多葛哲学家，《沉思录》作者，把'成为完整的人'作为终身修炼。",
    schools:["mindset","system"],
    viewpoints:[
      {t:"拂晓即起，劳作即天职", c:["C2","C15"], d:"自律第一步是该起身时起身，劳作是人的本性。", auth:"亲历", verify:"其《沉思录》5.1起床训"},
      {t:"别争论善，去做善", c:["C16","C15"], d:"从'论道'切换到'行道'，知识不等于能力。", auth:"亲历", verify:"其《沉思录》10.16"},
      {t:"挡路之物成为道路", c:["C7","C9"], d:"障碍即修炼素材，不可控之事可转化为助力。", auth:"亲历", verify:"其《沉思录》5.20"},
      {t:"每日自省的内在修炼", c:["C4","C15"], d:"以日课审查自己的判断与行动，观照自我是元练习。", auth:"亲历", verify:"其《沉思录》文本本身"},
      {t:"只在可控处下功夫", c:["C9","C16"], d:"二分控制：外物不可控，判断与意志可控。", auth:"亲历", verify:"其斯多葛二分法"},
      {t:"以死为限，专注当下", c:["C15","C2"], d:"死亡临头，提升必须在今天执行。", auth:"亲历", verify:"其《沉思录》4.17"},
      {t:"匠人式极致投入为范本", c:["C13","C3"], d:"为技艺废寝忘食是最高形态的生活态度。", auth:"亲历", verify:"其《沉思录》5卷工匠比喻"},
    ]
  },
  {
    id:"goggins", name:"David Goggins", nameZh:"大卫·戈金斯",
    file:"experts/David-Goggins.md",
    gender:"男", birth:1975, died:null, age:51, ageBracket:"50-64",
    field:"体育·竞技与修行", income:"数百万至千万级（100–500万美元）", incomeTier:3, region:"西方",
    bio:"美国前海豹突击队员/耐力运动员，《Can't Hurt Me》作者，把受苦推向极致的自律实践者。",
    schools:["practice","mindset"],
    viewpoints:[
      {t:"40%法则：极限是大脑制造的幻觉", c:["C7","C8"], d:"以为到极限时只用了40%真实能力，突破先改认知。", auth:"亲历", verify:"其40%法则概念"},
      {t:"把受苦排进日程", c:["C1","C8"], d:"主动性受苦是对抗被动苦难的免疫训练。", auth:"亲历", verify:"其'把痛苦纳入日程'"},
      {t:"磨砺心智：最低谷做最佳工作", c:["C7","C8"], d:"最想放弃时偏要坚持，心智老茧纯积累无捷径。", auth:"亲历", verify:"其Calloused Mind主张"},
      {t:"问责镜：每天面对最脏的真相", c:["C16","C4"], d:"每日照镜写目标写借口，对抗自欺是日常引擎。", auth:"亲历", verify:"其Accountability Mirror方法"},
      {t:"对吃苦上瘾的工作伦理", c:["C8","C13"], d:"激情天赋只是工具，唯一托底的是work ethic。", auth:"亲历", verify:"其工作伦理论"},
      {t:"没人会来救你：极致自我依赖", c:["C8","C15"], d:"受害者叙事是最昂贵的成本。", auth:"亲历", verify:"其自我依赖哲学"},
      {t:"反速成文化", c:["C2","C15"], d:"快修与生活黑客不会通向自我主宰，无痛提升是幻觉。", auth:"亲历", verify:"其反捷径立场"},
    ]
  },
  {
    id:"biles", name:"Simone Biles", nameZh:"西蒙·拜尔斯",
    file:"experts/Simone-Biles.md",
    gender:"女", birth:1997, died:null, age:29, ageBracket:"30-49",
    field:"体育·竞技与修行", income:"数百万至千万级（800–1500万美元）", incomeTier:3, region:"西方",
    bio:"美国体操运动员，11枚奥运奖牌，以'扭麻花'退赛-复出证明心理维护是长期卓越的基础设施。",
    schools:["practice","mindset"],
    viewpoints:[
      {t:"训练量只是入场券", c:["C2","C1"], d:"每周32–42小时换3–5分钟比赛，表现是隐性总量的千分之几。", auth:"亲历", verify:"其训练时长自述"},
      {t:"心理是技能的承载系统", c:["C7","C15"], d:"'扭麻花'证明心理失稳时十年积累的技能瞬间无法访问。", auth:"亲历", verify:"其东京退赛亲历"},
      {t:"自我优先是长期卓越的必要条件", c:["C7","C8"], d:"不照顾心理就享受不了运动也达不到成绩。", auth:"亲历", verify:"其心理健康优先主张"},
      {t:"退场与回归同属专业动作", c:["C9","C15"], d:"战略性暂停是绩效优化变量，'硬撑'是伪韧性。", auth:"亲历", verify:"其退赛-复出-再夺冠循环"},
      {t:"把心理维护制度化", c:["C5","C7"], d:"每周四见治疗师像宗教仪式，制度优于自我告诫。", auth:"亲历", verify:"其治疗仪式实践"},
      {t:"高压力下的自我调节是可训练技能", c:["C1","C7"], d:"情绪调节与难度动作一样需要刻意打磨。", auth:"亲历", verify:"其巴黎周期自我调节"},
      {t:"大师也接受'清零重来'", c:["C7","C1"], d:"从球池软垫重新学起，恢复与迁移本身就是专家技能。", auth:"亲历", verify:"其复出重建过程"},
    ]
  },
];

// ---- 预计算：每个分类节点下关联的专家、共识度 ----
const CAT_STATS = (() => {
  const stats = {};
  Object.keys(CAT).forEach(k => {
    const experts = EXPERTS.filter(e => e.viewpoints.some(v => v.c.includes(k)));
    stats[k] = { name: CAT[k], count: experts.length, experts: experts.map(e=>e.id) };
  });
  return stats;
})();

// ---- 预计算：观点真实性分布 ----
const AUTH_STATS = (() => {
  const stats = {亲历:0, 借鉴:0, 共识:0};
  EXPERTS.forEach(e => e.viewpoints.forEach(v => { stats[v.auth] = (stats[v.auth]||0)+1; }));
  return stats;
})();

// ---- 领域分野：按"反馈效度"主轴 + 垂直领域簇 ----
// tier = 反馈效度（高/中/低），决定哪类策略有效；cluster = 更垂直的领域簇
const TIERS = {
  "高效度": "友好环境——快速诚实反馈、模式稳定重复（刻意练习+心智数据库有效）",
  "中效度": "混合环境——反馈存在但嘈杂/社会中介/长周期（需两种策略叠加）",
  "低效度": "恶劣环境——反馈延迟/缺失/被运气扭曲（刻意练习会加固错误，须概率谦逊+多模型）",
};
const DOMAIN = {
  // 高效度（友好环境）
  kasparov:  {tier:"高效度", cluster:"竞技与认知竞技"},
  waitzkin:  {tier:"高效度", cluster:"竞技与认知竞技"},
  leonard:   {tier:"高效度", cluster:"竞技与认知竞技"},
  kobe:      {tier:"高效度", cluster:"竞技与认知竞技"},
  serena:    {tier:"高效度", cluster:"竞技与认知竞技"},
  federer:   {tier:"高效度", cluster:"竞技与认知竞技"},
  adria:     {tier:"高效度", cluster:"工艺创造"},
  rams:      {tier:"高效度", cluster:"工艺创造"},
  torvalds:  {tier:"高效度", cluster:"工艺创造"},
  // 中效度（混合环境）
  gawande:   {tier:"中效度", cluster:"医学诊断"},
  konnikova: {tier:"中效度", cluster:"决策博弈"},
  goodall:   {tier:"中效度", cluster:"田野观察"},
  musk:      {tier:"中效度", cluster:"创业工程"},
  // 低效度（恶劣环境）
  munger:    {tier:"低效度", cluster:"投资预测"},
  naval:     {tier:"低效度", cluster:"投资预测"},
  ericsson:  {tier:"低效度", cluster:"科研探索"},
  duckworth: {tier:"低效度", cluster:"科研探索"},
  dweck:     {tier:"低效度", cluster:"科研探索"},
  csikszentmihalyi:{tier:"低效度", cluster:"科研探索"},
  kahneman:  {tier:"低效度", cluster:"科研探索"},
  feynman:   {tier:"低效度", cluster:"科研探索"},
  brown:     {tier:"低效度", cluster:"科研探索"},
  gladwell:  {tier:"低效度", cluster:"写作传播"},
  epstein:   {tier:"低效度", cluster:"写作传播"},
  godin:     {tier:"低效度", cluster:"写作传播"},
  angelou:   {tier:"低效度", cluster:"写作传播"},
  newport:   {tier:"低效度", cluster:"写作传播"},
  coyle:     {tier:"低效度", cluster:"写作传播"},
  greene:    {tier:"低效度", cluster:"写作传播"},
  ferriss:   {tier:"低效度", cluster:"写作传播"},
  tharp:     {tier:"中效度", cluster:"表演艺术"},
  stanislavski:{tier:"中效度", cluster:"表演艺术"},
  gould:     {tier:"中效度", cluster:"表演艺术"},
  musashi:   {tier:"高效度", cluster:"竞技与认知竞技"},
  goggins:   {tier:"高效度", cluster:"竞技与认知竞技"},
  biles:     {tier:"高效度", cluster:"竞技与认知竞技"},
  mcclintock:{tier:"低效度", cluster:"科研探索"},
  wilson:    {tier:"低效度", cluster:"科研探索"},
  buffett:   {tier:"低效度", cluster:"投资预测"},
  king:      {tier:"低效度", cluster:"写作传播"},
  pressfield:{tier:"低效度", cluster:"写作传播"},
  clear:     {tier:"低效度", cluster:"写作传播"},
  aurelius:  {tier:"低效度", cluster:"哲学与内在修炼"},
};
// 簇的展示顺序（按效度档分组）
const CLUSTER_ORDER = [
  "竞技与认知竞技","工艺创造",                          // 高效度
  "表演艺术","医学诊断","决策博弈","田野观察","创业工程", // 中效度
  "科研探索","写作传播","投资预测","哲学与内在修炼",    // 低效度
];

if (typeof window !== "undefined") {
  window.HOWTOBE = { CAT, AUTH, SCHOOLS, EXPERTS, CAT_STATS, AUTH_STATS, DOMAIN, TIERS, CLUSTER_ORDER };
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CAT, AUTH, SCHOOLS, EXPERTS, CAT_STATS, AUTH_STATS, DOMAIN, TIERS, CLUSTER_ORDER };
}
