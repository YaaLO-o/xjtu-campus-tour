# XJTU 智慧校园游

**[在线体验](https://yaalo-o.github.io/xjtu-campus-tour/)**

西安交通大学校园导览网页应用。集成高德地图 3D 地图、校园天气面板、景点轮播、照片墙和 Coze AI 聊天助手。

## 功能特性

- **高德地图 3D 地图** — 校园全景俯瞰，支持缩放、旋转、3D 视角
- **数据驱动景点系统** — 30+ 标记点，含历史、贴士、附近推荐
- **分类筛选** — 标志性建筑 / 自然风光 / 历史遗迹 / 学术场馆 / 生活设施 / 书院社区 / 校门入口
- **景点详情面板** — 点击标记查看详情，含历史文化、游览贴士、AI 问答入口
- **校园天气面板** — 实时显示交大校园天气、温度、风力、湿度
- **景点轮播** — 三组自动轮播展示校园风光
- **照片墙** — 夏叶、春樱、梧桐大道、航天模型等校园美景
- **搜索功能** — 景点名称、描述、特征实时搜索
- **Coze AI 聊天** — 智能问答助手

## 项目结构

```
xjtu-campus-tour/
├── index.html              # 首页（3D 地图 + 天气 + 时间线）
├── landmarks.html          # 景点介绍（34 个景点浏览）
├── activities.html         # 全部活动（6 类校园活动）
├── transport.html          # 交通推荐（到达方式 + 地图）
├── config.example.js       # 配置文件模板（API 密钥）
├── css/
│   └── style.css           # 统一样式表
├── js/
│   ├── app.js              # 主逻辑（分类、搜索、详情面板、天气）
│   ├── map.js              # 地图初始化、标记、信息窗体、全景
│   └── chat.js             # Coze AI 集成
├── data/
│   └── landmarks.js        # 结构化景点数据（34 景点 + 6 时间线节点）
├── images/                 # 校园照片和图标
└── README.md
```

## 技术栈

| 层级 | 技术 |
|------|------|
| 地图 | 高德地图 JS API 2.0 + 3D |
| 图标 | Font Awesome 6.4 |
| AI 助手 | Coze Chat SDK |
| 前端 | 原生 HTML5 + CSS3 + JavaScript |

## 数据架构

景点数据集中在 `data/landmarks.js`，每个景点包含：
- `id` / `name` / `category` — 基础信息
- `position` — 经纬度坐标
- `description` / `history` — 描述与历史文化
- `features` — 特征标签
- `images` — 图片路径
- `tips` — 游览贴士
- `nearby` — 附近景点推荐
- `aiPrompt` — AI 问答预设问题

地图标记、搜索、分类筛选、详情面板均由此数据驱动。

## 本地开发

1. 克隆仓库
   ```bash
   git clone https://github.com/YaaLO-o/xjtu-campus-tour.git
   ```

2. 复制配置文件并填入你的 API 密钥
   ```bash
   cp config.example.js config.js
   ```

3. 用浏览器打开 `index.html` 即可预览

## 许可

MIT
