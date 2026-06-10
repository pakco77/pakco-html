# 「明天」社交图文风格 · 种子模板

DeckTaste `🖼 图文` tab 的第 3 个基调。一套自包含的 HTML 卡片系统 —— **不经过 guizang-social-card-skill**，而是直接写 HTML 卡片再截成 PNG（由 `generate_cards.js` 用 Playwright 渲染）。

作者：VibeCoding · 点亮计划 / 半个造物主 · 乘百。

## 用法（给 Agent）

1. 把本目录复制到任务文件夹。
2. 以 `00_cover.html`（封面）和 `01_display.html`~`06_prompt.html`（内页）为种子，**只替换里面的内容**，保留视觉系统与品牌外壳。
3. 用 `node generate_cards.js` 或任意 headless 截图工具把每个 HTML 截成 PNG。

## 画布

- 封面 `00_cover.html`：**900 × 1200**（3:4）
- 内页 `01–06`：**480 × 640**（3:4）
- 整套为小红书 / 公众号竖版 3:4 设计。

## 配色 token

```css
/* 封面 */ --bg:#FDE8DF; --fg:#17120f; --orange:#E8522A; --floor:#E9835A; --stripe:#F4A51F; --black:#0E0A07; /* 点缀绿 */ #12B923
/* 内页 */ --paper:#fffaf6; --fg:#17120f; --muted:#77706b; --orange:#E8522A; --pale:#FDE8DF; --green:#12B923
```

## 视觉系统

- **超粗黑体**（PingFang SC 950）大标题，封面 135px 带描边；**Georgia 衬线编号**（内页 01–06）。
- 暖桃/奶白底 + 橙红强调 + 点缀绿星 ✳ + 黑色反白 chip（`.black` / `.em`）。
- 封面专属装饰：装订线圈（coil）+ 琥珀条纹（stripe）+ 透视地板格（floor）+ 底部黑色跑马灯（ticker）。
- 内页结构：上下 meta 行 + 编号大数字 + 粗标题 + 章节标签 + 正文 + 内容块 + `note` 双线带。
- 内页内容块按页型变化：展示卡（`.screen` + 虚线橙批注 `.ghost`）/ 路由列表（`.path`）/ 三词定义（`.defs`）/ 表格 / 流程 / **最后一张深色 Prompt 页**（黑底，payoff）。

## 页型一览（本套示例）

| 文件 | 页型 |
|---|---|
| `00_cover` | 封面 |
| `01_display` | 展示卡 + 虚线批注 |
| `02_data_path` | 路由列表（带圆形序号） |
| `03_words` | 三词定义（橙标签 + 解释） |
| `04_table` | 对照表 / 网格 |
| `05_secret` | 流程 / 箭头 |
| `06_prompt` | 深色 Prompt / 代码页（收尾） |

复刻时按内容选页型，不必固定 6 页。
