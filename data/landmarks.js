/**
 * XJTU 智慧校园游 — 景点数据层
 * 所有景点的结构化数据，驱动地图标记、详情面板、搜索和 AI 问答
 */

const LANDMARK_CATEGORIES = {
  LANDMARK: '标志性建筑',
  NATURE: '自然风光',
  HISTORY: '历史遗迹',
  ACADEMIC: '学术场馆',
  LIVING: '生活设施',
  COLLEGE: '书院社区',
  GATE: '校门入口',
};

const LANDMARKS = [
  // ===== 标志性建筑 =====
  {
    id: 'tengfeita',
    name: '腾飞塔',
    category: LANDMARK_CATEGORIES.LANDMARK,
    position: [108.983712, 34.248715],
    description: '位于钱学森图书馆附近的标志性建筑，象征腾飞与进步。',
    history: '建于1996年，为纪念西安交大迁校40周年。塔身造型向上挺拔，寓意学校蓬勃发展、不断腾飞。',
    features: ['标志性建筑', '拍照打卡', '校园地标'],
    images: ['images/腾飞塔.jpg'],
    tips: '建议傍晚前往，夕阳下的腾飞塔特别美。塔下广场是毕业生合影热门地点。',
    nearby: ['钱学森图书馆', '西花园', '饮水思源碑'],
    aiPrompt: '关于腾飞塔，你能介绍它的历史和象征意义吗？',
  },
  {
    id: 'qianxuesen-tushuguan',
    name: '钱学森图书馆',
    category: LANDMARK_CATEGORIES.ACADEMIC,
    position: [108.983713, 34.246837],
    description: '以著名科学家钱学森命名的图书馆，藏书丰富，学术氛围浓厚。',
    history: '2016年正式开馆，以交大杰出校友钱学森先生命名。馆藏纸质文献超过600万册，是学校最重要的学术资源中心。',
    features: ['图书馆', '学术', '自习'],
    images: ['images/钱学森图书馆.jpg'],
    tips: '自习室需要提前在小程序预约，考试周座位紧张。一楼有24小时自习区。',
    nearby: ['腾飞塔', '教学主楼', '逸夫科学馆'],
    aiPrompt: '钱学森图书馆有哪些特色馆藏和功能区？',
  },
  {
    id: 'jiaoxue-zhulou',
    name: '教学主楼（ABCD）E',
    category: LANDMARK_CATEGORIES.ACADEMIC,
    position: [108.98352, 34.244712],
    description: '西安交通大学核心教学区，现代化教学设施完善。',
    history: '教学主楼群是兴庆校区最核心的教学区域，承担全校大部分本科教学任务。楼群呈对称布局，气势恢宏。',
    features: ['教学楼', '自习室', '多媒体教室'],
    images: ['images/教学主楼.jpg'],
    tips: 'A座和B座之间有连廊，下雨天不用打伞。每层楼都有饮水机和休息区。',
    nearby: ['钱学森图书馆', '仲英书院', '逸夫科学馆'],
    aiPrompt: '教学主楼的布局和各楼功能是什么？',
  },
  {
    id: 'yinshui-siyuan',
    name: '饮水思源碑',
    category: LANDMARK_CATEGORIES.LANDMARK,
    position: [108.98372, 34.250468],
    description: '象征交大精神的纪念碑，寓意感恩与传承。',
    history: '"饮水思源"是西安交大的精神象征，取自"饮水思源，爱国荣校"的校训。碑体造型庄重，是学校最具辨识度的标志之一。',
    features: ['校园地标', '精神象征', '毕业留念'],
    images: ['images/饮水思源.jpg'],
    tips: '每年毕业季，这里是毕业生必到的打卡点。碑前广场经常举办校园活动。',
    nearby: ['北门', '腾飞塔', '西迁纪念广场'],
    aiPrompt: '饮水思源碑背后有什么故事？',
  },
  {
    id: 'yifu-kexueguan',
    name: '逸夫科学馆',
    category: LANDMARK_CATEGORIES.ACADEMIC,
    position: [108.984835, 34.246603],
    description: '由邵逸夫先生捐建的科学馆，用于科研与学术交流。',
    history: '由香港著名爱国人士邵逸夫先生捐资兴建，是学校重要的科研和学术交流场所，经常举办高水平学术讲座。',
    features: ['科研', '学术交流', '现代化设施'],
    images: ['images/1.jpg'],
    tips: '馆内经常有公开学术讲座，可以关注学校公众号获取信息。',
    nearby: ['钱学森图书馆', '教学主楼', '仲英书院'],
    aiPrompt: '逸夫科学馆主要承担什么功能？',
  },
  {
    id: 'si-da-faming-guangchang',
    name: '四大发明广场',
    category: LANDMARK_CATEGORIES.HISTORY,
    position: [108.983875, 34.245898],
    description: '以中国古代四大发明为主题的广场，弘扬中华传统文化。',
    history: '广场以造纸术、印刷术、火药、指南针四大发明为主题，设有相关雕塑和展示，体现学校对中华科技文明的传承。',
    features: ['文化广场', '历史', '开放空间'],
    images: ['images/2.jpg'],
    tips: '广场很开阔，适合拍照。旁边的宣传栏会展示校园活动信息。',
    nearby: ['教学主楼', '钱学森图书馆', '思源活动中心'],
    aiPrompt: '四大发明广场的设计理念是什么？',
  },

  // ===== 历史遗迹 =====
  {
    id: 'xiqian-jinianguan',
    name: '西迁纪念馆',
    category: LANDMARK_CATEGORIES.HISTORY,
    position: [108.984519, 34.242247],
    description: '纪念西安交通大学西迁历史的纪念馆，展示学校发展历程。',
    history: '1956年，交通大学响应国家号召，从上海迁至西安。西迁纪念馆记录了这段"胸怀大局、无私奉献、弘扬传统、艰苦创业"的西迁精神。',
    features: ['历史', '纪念馆', '文化'],
    images: ['images/3.jpg'],
    tips: '馆内有详细的图文展板和实物展品，建议预留30-60分钟参观。免费开放。',
    nearby: ['南门', '彭康书院', '崇实书院'],
    aiPrompt: '西安交大西迁的历史背景和意义是什么？',
  },
  {
    id: 'xiqian-guangchang',
    name: '西迁纪念广场&创校纪念校门',
    category: LANDMARK_CATEGORIES.HISTORY,
    position: [108.979776, 34.249001],
    description: '纪念西安交通大学创校历史的校门，具有特殊意义。',
    history: '广场和校门纪念的是1896年南洋公学的创立以及1956年的西迁壮举。这里是理解交大历史的重要起点。',
    features: ['校门', '历史', '纪念'],
    images: ['images/4.jpg'],
    tips: '广场上有校史时间线浮雕，适合慢慢走、慢慢看。',
    nearby: ['西迁纪念馆', '北门', '饮水思源碑'],
    aiPrompt: '交大创校的历史是怎样的？',
  },
  {
    id: 'jiyue-ting',
    name: '霁月亭',
    category: LANDMARK_CATEGORIES.NATURE,
    position: [108.982209, 34.242099],
    description: '校园内的霁月亭，环境幽静，适合休憩与思考。',
    history: '"霁月"取自"光风霁月"，寓意胸怀坦荡、品格高洁。亭子位于校园南部园林区域，是师生休憩的好去处。',
    features: ['亭子', '休憩', '自然'],
    images: ['images/5.jpg'],
    tips: '清晨或傍晚来此散步最佳，周围绿树成荫，非常安静。',
    nearby: ['初阳亭', '南门', '崇实书院'],
    aiPrompt: '霁月亭的名字有什么寓意？',
  },
  {
    id: 'chuyang-ting',
    name: '初阳亭',
    category: LANDMARK_CATEGORIES.NATURE,
    position: [108.983073, 34.242338],
    description: '校园内的初阳亭，晨光中尤为美丽，象征希望与新生。',
    history: '"初阳"寓意朝阳初升、万物更新。与霁月亭相邻，共同构成校园南部的园林景观。',
    features: ['亭子', '晨景', '象征'],
    images: ['images/5.jpg'],
    tips: '日出时分来这里，阳光穿过亭子的光影效果特别好。',
    nearby: ['霁月亭', '南门', '文治书院'],
    aiPrompt: '初阳亭和霁月亭有什么联系？',
  },

  // ===== 自然风光 =====
  {
    id: 'xi-huayuan',
    name: '西花园',
    category: LANDMARK_CATEGORIES.NATURE,
    position: [108.982743, 34.248507],
    description: '西安交通大学兴庆校区的西侧花园，环境优美，适合休闲散步。',
    history: '西花园是兴庆校区历史最悠久的园林区域之一，园内古树参天、曲径通幽，是师生课余休憩的理想场所。',
    features: ['花园', '休闲', '校园景点'],
    images: ['images/夏叶.jpg'],
    tips: '春天樱花盛开时最美。园内有石凳，适合看书或发呆。',
    nearby: ['腾飞塔', '钱学森图书馆'],
    aiPrompt: '西花园有哪些植物和景观特色？',
  },
  {
    id: 'dong-huayuan',
    name: '东花园',
    category: LANDMARK_CATEGORIES.NATURE,
    position: [108.984871, 34.248545],
    description: '校园东侧花园，自然风光秀丽，远离城市喧嚣。',
    features: ['自然风光', '宁静', '郊游胜地'],
    images: ['images/春樱.jpg'],
    tips: '春天是东花园最美的季节，樱花和海棠竞相开放。',
    nearby: ['西花园', '仲英书院'],
    aiPrompt: '东花园和西花园有什么不同？',
  },
  {
    id: 'wutong-dadao',
    name: '梧桐大道',
    category: LANDMARK_CATEGORIES.NATURE,
    position: [108.983200, 34.245500],
    description: '校园标志性景观大道，两侧法国梧桐枝繁叶茂，四季风景各异。',
    history: '梧桐大道种植于上世纪50年代，如今已长成参天大树。秋天金黄落叶铺满大道，是交大最美的秋景之一。',
    features: ['林荫道', '拍照打卡', '四季风景'],
    images: ['images/梧桐大道.jpg'],
    tips: '秋天（10-11月）来最佳，金黄落叶铺满地面。早上8点前人少，适合拍照。',
    nearby: ['教学主楼', '四大发明广场'],
    aiPrompt: '梧桐大道的历史和最佳观赏时间是什么？',
  },

  // ===== 书院社区 =====
  {
    id: 'zhongying-shuyuan',
    name: '仲英书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.986432, 34.245234],
    description: '现代化书院社区，注重学生全面发展。',
    features: ['书院制', '学生社区', '文化活动'],
    images: [],
    tips: '书院内有共享厨房和活动室，周末经常有社团活动。',
    nearby: ['教学主楼', '励志书院', '康桥苑'],
    aiPrompt: '仲英书院的特色活动有哪些？',
  },
  {
    id: 'lizhi-shuyuan',
    name: '励志书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.985938, 34.244345],
    description: '以励志教育为特色的书院，培养学生创新精神。',
    features: ['创新教育', '学业辅导', '导师制'],
    images: [],
    tips: '书院有创新实验室，学生可以申请使用。',
    nearby: ['仲英书院', '南洋书院', '康桥苑'],
    aiPrompt: '励志书院的导师制是怎么运作的？',
  },
  {
    id: 'nanyang-shuyuan',
    name: '南洋书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.986104, 34.243818],
    description: '历史悠久的书院制社区，传统与现代教育融合。',
    history: '"南洋"之名源自1896年创立的南洋公学，是交大精神的传承。',
    features: ['文化传承', '学生自治', '社团活动'],
    images: [],
    tips: '书院经常举办传统文化活动，如书法、茶道等。',
    nearby: ['励志书院', '彭康书院'],
    aiPrompt: '南洋书院名字的由来是什么？',
  },
  {
    id: 'chongshi-shuyuan',
    name: '崇实书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.98179, 34.243108],
    description: '注重实践能力培养的书院社区。',
    features: ['实践教育', '创新能力', '社区活动'],
    images: [],
    nearby: ['文治书院', '霁月亭', '西迁纪念馆'],
    aiPrompt: '崇实书院有哪些实践教育项目？',
  },
  {
    id: 'wenzhi-shuyuan',
    name: '文治书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.980538, 34.24251],
    description: '人文素养培育基地，传统文化教育社区。',
    features: ['人文教育', '传统文化', '书院生活'],
    images: [],
    nearby: ['崇实书院', '初阳亭', '南门'],
    aiPrompt: '文治书院的人文教育特色是什么？',
  },
  {
    id: 'pengkang-shuyuan',
    name: '彭康书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.986489, 34.242213],
    description: '以首任校长命名，创新人才培养示范区。',
    history: '以交通大学西迁后首任校长彭康先生命名，传承其教育理念。',
    features: ['示范书院', '创新教育', '学术沙龙'],
    images: [],
    nearby: ['南洋书院', '西迁纪念馆'],
    aiPrompt: '彭康校长对交大有什么贡献？',
  },
  {
    id: 'zonglian-shuyuan',
    name: '宗濂书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.982716, 34.243466],
    description: '医学特色书院，培养医学专业人才。',
    features: ['医学教育', '健康科学', '书院社区'],
    images: [],
    nearby: ['崇实书院', '钱学森书院'],
    aiPrompt: '宗濂书院的医学教育有什么特色？',
  },
  {
    id: 'qianxuesen-shuyuan',
    name: '钱学森书院',
    category: LANDMARK_CATEGORIES.COLLEGE,
    position: [108.981697, 34.243915],
    description: '拔尖创新人才培养基地，荣誉教育示范区。',
    features: ['荣誉教育', '创新培养', '学术卓越'],
    images: [],
    nearby: ['钱学森图书馆', '宗濂书院'],
    aiPrompt: '钱学森书院的选拔和培养模式是什么？',
  },

  // ===== 生活设施 =====
  {
    id: 'wutongyuan',
    name: '梧桐苑',
    category: LANDMARK_CATEGORIES.LIVING,
    position: [108.981853, 34.244866],
    description: '学生餐饮中心，提供多样化的美食选择。',
    features: ['学生食堂', '美食广场', '休闲餐饮'],
    images: [],
    tips: '二楼的麻辣烫和三楼的烤肉饭很受欢迎。饭点人多，建议错峰。',
    nearby: ['教学主楼', '崇实书院'],
    aiPrompt: '梧桐苑有哪些推荐的美食窗口？',
  },
  {
    id: 'kangqiaoyuan',
    name: '康桥苑',
    category: LANDMARK_CATEGORIES.LIVING,
    position: [108.985904, 34.244769],
    description: '大型学生餐厅，汇集各地风味美食。',
    features: ['学生食堂', '餐饮中心', '休闲餐饮'],
    images: [],
    tips: '一楼有各地小吃，二楼是自助餐。周末有特色窗口轮换。',
    nearby: ['仲英书院', '励志书院'],
    aiPrompt: '康桥苑的营业时间和特色菜品是什么？',
  },
  {
    id: 'siyuan-huodong-zhongxin',
    name: '思源活动中心',
    category: LANDMARK_CATEGORIES.LIVING,
    position: [108.983679, 34.242815],
    description: '学生组织活动基地，校园文化展示中心。',
    features: ['学生活动', '社团基地', '文艺演出'],
    images: [],
    tips: '中心内有排练厅、多功能厅，可以预约使用。经常有免费演出。',
    nearby: ['教学主楼', '南门'],
    aiPrompt: '思源活动中心有哪些学生活动？',
  },

  // ===== 校门入口 =====
  {
    id: 'beimen',
    name: '北门',
    category: LANDMARK_CATEGORIES.GATE,
    position: [108.983729, 34.250952],
    description: '校园北侧主要出入口，交通便利。',
    features: ['校门', '出入口', '交通枢纽'],
    images: ['images/北门.jpg'],
    tips: '北门外有公交站和地铁站，是进出校园最方便的门。门口有便利店和打印店。',
    nearby: ['饮水思源碑', '西迁纪念广场'],
    aiPrompt: '北门附近的交通和设施有哪些？',
  },
  {
    id: 'nanmen',
    name: '南门',
    category: LANDMARK_CATEGORIES.GATE,
    position: [108.983849, 34.241577],
    description: '校园正门，设有校名石和景观广场。',
    features: ['主校门', '地标', '合影点'],
    images: [],
    tips: '南门是学校的正门，校名石是合影热门点。进校需要刷校园卡或预约。',
    nearby: ['西迁纪念馆', '初阳亭', '霁月亭'],
    aiPrompt: '南门的设计和历史是什么？',
  },
  {
    id: 'dongnanmen',
    name: '东南门',
    category: LANDMARK_CATEGORIES.GATE,
    position: [108.987500, 34.242800],
    description: '校园东南侧出入口，靠近仲英书院和励志书院。',
    features: ['校门', '出入口', '书院区'],
    images: [],
    tips: '东南门靠近书院区，从这里进校可以快速到达仲英书院和康桥苑。',
    nearby: ['仲英书院', '励志书院', '康桥苑'],
    aiPrompt: '东南门附近有哪些书院？',
  },
  {
    id: 'xinanmen',
    name: '西南门',
    category: LANDMARK_CATEGORIES.GATE,
    position: [108.980200, 34.242800],
    description: '校园西南侧出入口，靠近崇实书院和文治书院。',
    features: ['校门', '出入口', '书院区'],
    images: [],
    tips: '西南门靠近崇实书院和文治书院，从这里进校可以快速到达南门附近区域。',
    nearby: ['崇实书院', '文治书院', '南门'],
    aiPrompt: '西南门附近有哪些设施？',
  },

  // ===== 其他 =====
  {
    id: 'bowuguan',
    name: '西安交通大学博物馆&秦腔博物馆',
    category: LANDMARK_CATEGORIES.HISTORY,
    position: [108.980224, 34.241587],
    description: '展示学校历史与陕西秦腔文化的综合性博物馆。',
    features: ['校史展览', '文化传承', '艺术展示'],
    images: [],
    tips: '免费开放，周一闭馆。秦腔博物馆的展品很有陕西特色。',
    nearby: ['南门', '崇实书院', '文治书院'],
    aiPrompt: '博物馆有哪些常设展览？',
  },
  {
    id: 'zhongguo-shengming-kexue-yuan',
    name: '中国西部科技创新港',
    category: LANDMARK_CATEGORIES.ACADEMIC,
    position: [108.985000, 34.243000],
    description: '交大新校区，聚焦科技创新与产学研融合。',
    features: ['科技创新', '产学研', '新校区'],
    images: [],
    tips: '创新港有多个实验室和孵化器，经常举办科技展览。',
    nearby: ['教学主楼', '逸夫科学馆'],
    aiPrompt: '创新港的定位和主要研究方向是什么？',
  },
  {
    id: 'xiaoyiyuan',
    name: '校医院',
    category: LANDMARK_CATEGORIES.LIVING,
    position: [108.987641, 34.244578],
    description: '为师生提供医疗服务的校园医院，设施齐全。',
    features: ['医疗', '健康', '服务设施'],
    images: [],
    tips: '校医院可以处理常见疾病，急诊24小时开放。',
    nearby: ['仲英书院', '康桥苑'],
    aiPrompt: '校医院的就诊流程是什么？',
  },
  {
    id: 'zhaoshengbangongshi',
    name: '西安交通大学招生办公室',
    category: LANDMARK_CATEGORIES.LIVING,
    position: [108.984662, 34.250819],
    description: '负责学校招生工作的办公地点，提供招生咨询与服务。',
    features: ['招生', '咨询', '办公'],
    images: [],
    tips: '招生咨询电话和办公时间可在学校官网查询。',
    nearby: ['北门', '饮水思源碑'],
    aiPrompt: '招生办公室的联系方式是什么？',
  },
  {
    id: 'wutong-chaoshi',
    name: '梧桐超市',
    category: LANDMARK_CATEGORIES.LIVING,
    position: [108.981853, 34.245200],
    description: '校园生活便利超市，提供各类日常用品和零食。',
    features: ['便利店', '生活用品', '零食饮料'],
    images: [],
    tips: '营业时间早7点到晚11点，支持校园卡支付。',
    nearby: ['梧桐苑', '教学主楼'],
    aiPrompt: '梧桐超市的商品种类有哪些？',
  },
  {
    id: 'baowechu',
    name: '保卫处',
    category: LANDMARK_CATEGORIES.LIVING,
    position: [108.98677, 34.244414],
    description: '校园安全保卫指挥中心。',
    features: ['安全管理', '治安维护', '应急处理'],
    images: [],
    tips: '遇到紧急情况可拨打校园110。',
    nearby: ['仲英书院', '康桥苑'],
    aiPrompt: '保卫处的职责和联系方式是什么？',
  },
];

/**
 * 按分类获取景点列表
 */
function getLandmarksByCategory(category) {
  if (!category || category === '全部') return LANDMARKS;
  return LANDMARKS.filter(l => l.category === category);
}

/**
 * 根据 ID 获取景点
 */
function getLandmarkById(id) {
  return LANDMARKS.find(l => l.id === id);
}

/**
 * 搜索景点（名称、描述、特征匹配）
 */
function searchLandmarks(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.toLowerCase();
  return LANDMARKS.filter(l =>
    l.name.toLowerCase().includes(q) ||
    l.description.toLowerCase().includes(q) ||
    (l.features && l.features.some(f => f.toLowerCase().includes(q)))
  );
}

/**
 * 获取所有分类（带计数）
 */
function getCategoryCounts() {
  const counts = { '全部': LANDMARKS.length };
  LANDMARKS.forEach(l => {
    counts[l.category] = (counts[l.category] || 0) + 1;
  });
  return counts;
}

// ===== 校园历史时间线 =====
const CAMPUS_TIMELINE = [
  {
    year: '1896',
    title: '南洋公学创立',
    description: '清光绪二十二年，盛宣怀在上海创办南洋公学，为西安交通大学的前身。',
    landmarkId: 'xiqian-guangchang',
  },
  {
    year: '1921',
    title: '改组为交通大学',
    description: '南洋公学改组为交通大学，成为中国近代高等教育的重要发源地之一。',
    landmarkId: 'bowuguan',
  },
  {
    year: '1956',
    title: '西迁至西安',
    description: '响应国家号召，交通大学从上海迁至西安，开启了"西迁精神"的壮丽篇章。',
    landmarkId: 'xiqian-jinianguan',
  },
  {
    year: '1959',
    title: '更名西安交通大学',
    description: '定名为西安交通大学，成为全国重点大学。',
    landmarkId: 'beimen',
  },
  {
    year: '2000',
    title: '新校区建设',
    description: '兴庆校区大规模扩建，现代化教学设施逐步完善。',
    landmarkId: 'jiaoxue-zhulou',
  },
  {
    year: '2016',
    title: '钱学森图书馆开馆',
    description: '以杰出校友钱学森先生命名的新图书馆正式开馆，藏书超600万册。',
    landmarkId: 'qianxuesen-tushuguan',
  },
];
