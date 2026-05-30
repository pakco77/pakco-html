

https://github.com/user-attachments/assets/c25315ea-9139-4870-9bd0-7022ce2d803c

# DeckTaste.skill · 给 AI Agent 用的视觉审美菜单

[中文](README.zh-CN.md) · [**English →**](README.md)

[![Fork 自 lewislulu/html-ppt-skill](https://img.shields.io/badge/fork%20%E8%87%AA-lewislulu%2Fhtml--ppt--skill-blue?logo=github)](https://github.com/lewislulu/html-ppt-skill)
[![集成 op7418/guizang-ppt-skill](https://img.shields.io/badge/%E9%9B%86%E6%88%90-op7418%2Fguizang--ppt--skill-orange?logo=github)](https://github.com/op7418/guizang-ppt-skill)
[![集成 guizang-social-card-skill](https://img.shields.io/badge/%E9%9B%86%E6%88%90-guizang--social--card--skill-orange?logo=github)](https://github.com/op7418/guizang-social-card-skill)
[![集成 Leonxlnx/taste-skill](https://img.shields.io/badge/%E9%9B%86%E6%88%90-Leonxlnx%2Ftaste--skill-blueviolet?logo=github)](https://github.com/Leonxlnx/taste-skill)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🙏 致敬上游

DeckTaste 是一个封装层，真正的视觉功劳属于上游作者：

- 🎨 **[lewislulu/html-ppt-skill](https://github.com/lewislulu/html-ppt-skill)** —— 核心 skill：36 皮肤、31 布局、47 动效、runtime、演讲者模式。本仓库**已打包**。
- 🪶 **[op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)**（歸藏）—— 电子杂志 × 墨水 / 瑞士国际主义 deck 模板。**已打包**为 `guizang-magazine` + `guizang-swiss`（9 个配色变体）。
- 🖼 **[op7418/guizang-social-card-skill](https://github.com/op7418/guizang-social-card-skill)**（歸藏）—— `🖼 图文` 标签背后的社交图系统。以**依赖**形式声明（`skills-lock.json`），按需安装，未内置进本仓库。
- 🧩 **[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)** —— `🧩 UI Taste` 标签背后的 UI 审美系统。仅通过**复制出的 Prompt 引用**，未内置进本仓库。

> 本 fork 额外做的事：一个单文件**可视化选择器**（`templates/style-picker.html`），把上面这些能力变成「看见即点击复制」的审美菜单；接入 9 套歸藏 deck 变体；做了一个 2 基调的图文预览工作台；把 UI Taste 的预览改成每个风格各自真实的 demo；并修复了演讲者模式的若干问题。

## 🎯 一句话定位

**别再描述审美，直接选择审美。**

DeckTaste 是给 AI Agent 用的、本地优先的**视觉审美菜单**。它不打算做在线 PPT 编辑器——它解决的是另一个问题：**人怎么把自己的审美稳定、可复用地说给 Agent 听？** 浏览真实预览，点一张卡，拿到一段能直接粘给 Claude Code / Codex / Hermes 的可执行 Prompt，Agent 按你选中的视觉约束去生成 deck（或皮肤、模板、社交图文、UI）。

## ▶ 30 秒开始

1. **安装** skill（一行命令，见 [安装](#-安装)）。
2. **打开选择器。** 它在安装好的 skill 里：`templates/style-picker.html`。你可以自己用浏览器打开，或直接对 Agent 说*"打开 DeckTaste 选择器"*。想要 iframe 实时预览，就起个本地服务器（见安装）。
3. **点任意卡片** —— 🎨 皮肤 / 📑 模板 / 🧩 UI Taste / 🖼 图文，对应 Prompt 就复制到剪贴板了。
4. **粘给 Agent**，把 `[在此粘贴你的内容大纲]` 换成你的内容，回车。拿到一份能直接用浏览器打开的完整 deck。

## 📦 Skill 内容一览

| 模块 | 数量 | 位置 |
|---|---|---|
| 🎨 **皮肤**（换皮 / CSS） | **36** | `assets/themes/*.css` |
| 📑 **模板**（完整 deck） | **24** | `templates/full-decks/` + 歸藏变体 |
| 🧩 **UI Taste**（选择器标签） | 4 | Prompt → `Leonxlnx/taste-skill` |
| 🖼 **图文**（选择器标签） | 2 基调 | Prompt → `guizang-social-card-skill` |
| 🧩 **单页布局** | **31** | `templates/single-page/*.html` |
| ✨ **CSS 动画** | **27** | `assets/animations/animations.css` |
| 💥 **Canvas FX** | **20** | `assets/animations/fx/*.js` |
| 🎤 **演讲者模式** | —— | `S` 键 / `?preview=N` |

**皮肤 vs 模板** —— 皮肤只换配色字体（同一套布局*换皮*）；模板是有独立 HTML 结构的完整版式（*换骨*）。

| 🎨 皮肤 (36) | 📑 模板 (24) | 🧩 布局 (31) |
|---|---|---|
| ![皮肤 Tab](docs/readme/webui/01-themes.png) | ![模板 Tab](docs/readme/webui/02-templates.png) | ![布局 Tab](docs/readme/webui/03-layouts.png) |

<details>
<summary>36 皮肤 · 24 模板 · 31 布局（完整清单）</summary>

**36 皮肤** —— `minimal-white`、`editorial-serif`、`soft-pastel`、`sharp-mono`、`arctic-cool`、`sunset-warm`、`catppuccin-latte`、`catppuccin-mocha`、`dracula`、`tokyo-night`、`nord`、`solarized-light`、`gruvbox-dark`、`rose-pine`、`neo-brutalism`、`glassmorphism`、`bauhaus`、`swiss-grid`、`terminal-green`、`xiaohongshu-white`、`rainbow-gradient`、`aurora`、`blueprint`、`memphis-pop`、`cyberpunk-neon`、`y2k-chrome`、`retro-tv`、`japanese-minimal`、`vaporwave`、`midcentury`、`corporate-clean`、`academic-paper`、`news-broadcast`、`pitch-deck-vc`、`magazine-bold`、`engineering-whiteprint`。

**24 模板** —— 15 套原生完整 deck + 9 套歸藏配色变体。提炼款：`xhs-white-editorial`、`graphify-dark-graph`、`knowledge-arch-blueprint`、`hermes-cyber-terminal`、`obsidian-claude-gradient`、`testing-safety-alert`、`xhs-pastel-card`、`dir-key-nav-minimal`。场景款：`pitch-deck`、`product-launch`、`tech-sharing`、`weekly-report`、`xhs-post`（9 页 3:4）、`course-module`、**`presenter-mode-reveal`** 🎤（每页带完整逐字稿）。歸藏：`guizang-magazine` ×5 + `guizang-swiss` ×4。

**31 布局** —— cover · toc · section-divider · bullets · two-column · three-column · big-quote · stat-highlight · kpi-grid · table · code · diff · terminal · flow-diagram · timeline · roadmap · mindmap · comparison · pros-cons · todo-checklist · gantt · image-hero · image-grid · chart-bar · chart-line · chart-pie · chart-radar · arch-diagram · process-steps · cta · thanks。

</details>

## ✅ 合适 / 🚫 不合适

**适合**
- 想让 AI Agent 按**你能先看见的特定视觉**去做 deck / 小红书图文 / UI。
- 你反复用同一种视觉风格，烦透了每次重新描述。
- 你在 Claude Code / Codex / Cursor / Hermes（任何支持 AgentSkill 的环境）里工作。
- 想要纯静态 HTML 产物——零构建，任意浏览器打开。

**不适合**
- 想要一个所见即所得、拖拽式的在线 PPT 编辑器。DeckTaste 是*菜单 + Prompt launcher*，不是编辑器。
- 不用 AI Agent，想纯手工拉幻灯片。
- 以为 `🖼 图文` 标签会自己出图——它只复制 Prompt（预览 + 选尺寸 + 导入 Prompt，真正出图由上游 skill 完成）。
- 需要实时协作或云端托管服务。

## 🤖 Agent 支持

支持任何带 AgentSkill 的运行时。安装后 skill 落在：

```
~/.claude/skills/html-ppt/      # Claude Code
~/.codex/skills/html-ppt/       # Codex
~/.hermes/skills/html-ppt/      # Hermes Agent
~/.cursor/…  /  其它             # 任何支持 AgentSkill 的 Agent
```

每种环境下选择器都是同一个文件：`…/html-ppt/templates/style-picker.html`。把 Prompt 复制给 Agent **不需要 MCP**；只有想让网页直接唤起 Agent、读本地文件、写生成目录时才需要 MCP / 本地桥接。

## ⬇️ 安装

```bash
npx skills add https://github.com/pakco77/DeckTaste
```

然后打开选择器（第二种方式能加载 iframe 实时预览）：

```bash
# 1) 只浏览卡片（预览需要服务器）
open ~/.claude/skills/html-ppt/templates/style-picker.html

# 2) 推荐 —— 起个本地服务器，预览能加载
cd ~/.claude/skills/html-ppt && python3 -m http.server 8000
# 访问：http://localhost:8000/templates/style-picker.html
```

点任意卡片 → 安装命令 + 现成 Prompt 已在剪贴板 → 粘给 Agent。

![封面 · 实时预览](docs/readme/hero.gif)

## 🗂 目录结构

```
DeckTaste/
├── SKILL.md                      agent 入口（skill 名仍为 html-ppt）
├── README.md / README.zh-CN.md   文档（英文 / 中文）
├── skills-lock.json              声明的 skill 依赖（guizang-social-card-skill）
├── references/                   详细文档（themes / layouts / animations / full-decks / presenter-mode）
├── assets/
│   ├── base.css                  共享设计 tokens + 基础组件
│   ├── runtime.js                键盘导航 + 演讲者模式 + 总览
│   ├── themes/*.css              36 个皮肤 token 文件
│   └── animations/               27 CSS 动画 + 20 Canvas FX
├── templates/
│   ├── style-picker.html         ★ DeckTaste WebUI（皮肤/模板/UI Taste/图文/使用说明）
│   ├── deck.html                 最小起步模板
│   ├── *-showcase.html           主题 / 布局 / 动画 tour
│   ├── full-decks/<name>/        17 个 deck 文件夹（15 原生 + guizang-magazine/-swiss）
│   └── single-page/*.html        31 个布局文件（带示例数据）
├── scripts/                      new-deck.sh · render.sh · verify-output/
└── examples/                     本地生成物 + decktaste.local.json（已 git 忽略）
```

## 🎨 自建皮肤 / 模板

选择器里有两张自建卡——**`+ 自建皮肤`**（🎨 皮肤页）和 **`+ 自建模板`**（📑 模板页）。点一张，把复制出的 Prompt 粘给 Agent。

- 每次生成输出到唯一的 `examples/<slug>/`（自己取个有意义的 slug）。
- 可以**累积添加多个**皮肤/模板——每个 append 到 `examples/decktaste.local.json`，互不覆盖，刷新选择器后都会以 `local` 卡显示。
- 手动方式：`./scripts/new-deck.sh <slug>`，再 `open examples/<slug>/index.html`。

`decktaste.local.json` 已被 `.gitignore` 忽略——它是你的本地 taste library，不是公共目录，也不改变公开计数。

## 🧭 设计理念

- **Token 驱动的设计系统。** 颜色、圆角、阴影、字体都在 `assets/base.css` + 当前皮肤里。改一个变量，整份 deck 优雅重排。
- **先看见，再选择。** 每个预览都是真实、隔离的 `<iframe>` 渲染——不是截图、不是色卡。
- **是菜单，不是生成器。** DeckTaste 复制可执行 Prompt，生成交给你的 Agent，因此模型无关、零构建。
- **资深设计师的默认值。** 字号规律、间距节奏、渐变都有态度——绝不是 "PowerPoint 2006"。
- **中英双语一等公民。** 预导入 Noto Sans SC / Noto Serif SC。

## 协议

MIT © 2026 lewis &lt;sudolewis@gmail.com&gt;。上游 skill 各自保留其许可与署名（见 [致敬上游](#-致敬上游)）。
