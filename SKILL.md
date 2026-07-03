---
name: pakco-html
description: "HTML PPT Studio for static decks, webpages, social cards, and the pakco-html visual style picker."
---

# pakco.html

pakco.html is a local-first visual taste menu for AI-generated decks. It helps users stop describing taste from scratch: browse visible styles, copy an executable prompt, and let Claude Code / Codex / Hermes generate the deck with stable visual constraints.

The underlying skill still authors professional HTML presentations as static files, with themes, full-deck taste cards, layouts, animations, and prompts. One theme file = one look. One layout file = one page type. One animation class = one entry effect.
All pages share a token-based design system in `assets/base.css`.

## Install

### Codex

Ask Codex to install the GitHub skill from the repo root:

```text
Install this skill from GitHub: https://github.com/pakco77/pakco-html
Use the repo root as the skill path and install it as pakco-html.
```

Terminal fallback:

```bash
curl -fsSL https://raw.githubusercontent.com/pakco77/pakco-html/refs/heads/main/scripts/install-codex.sh | bash
```

Restart Codex after installation so it reloads `~/.codex/skills/pakco-html`.

### Claude Code / AgentSkill CLI

```bash
npx skills add https://github.com/pakco77/pakco-html
```

### Other AgentSkill agents

For supported agents, use the `skills` CLI agent target:

```bash
npx skills add https://github.com/pakco77/pakco-html --agent kimi-code-cli
npx skills add https://github.com/pakco77/pakco-html --agent qwen-code
npx skills add https://github.com/pakco77/pakco-html --agent gemini-cli
```

For any agent that reads a local `SKILL.md` folder, use the generic installer:

```bash
curl -fsSL https://raw.githubusercontent.com/pakco77/pakco-html/refs/heads/main/scripts/install-agent.sh | bash -s -- workbuddy
curl -fsSL https://raw.githubusercontent.com/pakco77/pakco-html/refs/heads/main/scripts/install-agent.sh | bash -s -- ~/.some-agent/skills/pakco-html
```

No build. Pure static HTML/CSS/JS with only CDN webfonts.

## What the skill gives you

- **36 themes** (`assets/themes/*.css`) — minimal-white, editorial-serif, soft-pastel, sharp-mono, arctic-cool, sunset-warm, catppuccin-latte/mocha, dracula, tokyo-night, nord, solarized-light, gruvbox-dark, rose-pine, neo-brutalism, glassmorphism, bauhaus, swiss-grid, terminal-green, xiaohongshu-white, rainbow-gradient, aurora, blueprint, memphis-pop, cyberpunk-neon, y2k-chrome, retro-tv, japanese-minimal, vaporwave, midcentury, corporate-clean, academic-paper, news-broadcast, pitch-deck-vc, magazine-bold, engineering-whiteprint
- **24 deck taste cards** (`templates/full-decks/<name>/` + Guizang variants) — 15 native complete multi-slide decks with scoped `.tpl-<name>` CSS, plus 9 Guizang color variants. Native templates include 8 extracted looks (xhs-white-editorial, graphify-dark-graph, knowledge-arch-blueprint, hermes-cyber-terminal, obsidian-claude-gradient, testing-safety-alert, xhs-pastel-card, dir-key-nav-minimal) and 7 scenario scaffolds (pitch-deck, product-launch, tech-sharing, weekly-report, xhs-post 3:4, course-module, **presenter-mode-reveal** — 演讲者模式专用)
- **31 layouts** (`templates/single-page/*.html`) with realistic demo data
- **27 CSS animations** (`assets/animations/animations.css`) via `data-anim`
- **20 canvas FX animations** (`assets/animations/fx/*.js`) via `data-fx` — particle-burst, confetti-cannon, firework, starfield, matrix-rain, knowledge-graph (force-directed), neural-net (pulses), constellation, orbit-ring, galaxy-swirl, word-cascade, letter-explode, chain-react, magnetic-field, data-stream, gradient-blob, sparkle-trail, shockwave, typewriter-multi, counter-explosion
- **Keyboard runtime** (`assets/runtime.js`) — arrows, T (theme), A (anim), F/O, **S (presenter mode: magnetic-card popup with CURRENT / NEXT / SCRIPT / TIMER cards)**, N (notes drawer), R (reset timer in presenter)
- **FX runtime** (`assets/animations/fx-runtime.js`) — auto-inits `[data-fx]` on slide enter, cleans up on leave
- **Showcase decks** for themes / layouts / animations / full-decks gallery
- **Headless Chrome render script** for PNG export

## Opening the style picker

When the user asks to open/browse the style menu (e.g. "html来", "打开风格菜单", "打开 pakco-html", "打开html风格", "看看有什么风格", "open the picker"), start a local server and open the picker in a browser:

```bash
cd ~/.codex/skills/pakco-html && python3 -m http.server 8000 &
# then open: http://localhost:8000/templates/style-picker.html
```

If you installed with Claude Code / AgentSkill CLI, use `~/.claude/skills/pakco-html` instead.

The picker shows 60+ live previews across 4 tabs (Skins / Templates / UI Taste / Social Cards). The user clicks a card to copy the prompt, then pastes it back to you.

## When to use

Use when the user asks for any kind of slide-based output or wants to turn
text/notes into a presentable deck. Prefer this over building from scratch.

### 🎤 Presenter Mode (演讲者模式 + 逐字稿)

If the user mentions any of: **演讲 / 分享 / 讲稿 / 逐字稿 / speaker notes / presenter view / 演讲者视图 / 提词器**, or says things like "我要去给团队讲 xxx", "要做一场技术分享", "怕讲不流畅", "想要一份带逐字稿的 PPT" — **use the `presenter-mode-reveal` full-deck template** and write 150–300 words of 逐字稿 in each slide's `<aside class="notes">`.

See [references/presenter-mode.md](references/presenter-mode.md) for the full authoring guide including the 3 rules of speaker script writing:
1. **不是讲稿，是提示信号** — 加粗核心词 + 过渡句独立成段
2. **每页 150–300 字** — 2–3 分钟/页的节奏
3. **用口语，不用书面语** — "因此"→"所以"，"该方案"→"这个方案"

All full-deck templates support the S key presenter mode (it's built into `runtime.js`). **S opens a new popup window with 4 magnetic cards**:
- 🔵 **CURRENT** — pixel-perfect iframe preview of the current slide
- 🟣 **NEXT** — pixel-perfect iframe preview of the next slide
- 🟠 **SPEAKER SCRIPT** — large-font 逐字稿 (scrollable)
- 🟢 **TIMER** — elapsed time + slide counter + prev/next/reset buttons

Each card is **draggable by its header** and **resizable by the bottom-right corner handle**. Card positions/sizes persist to `localStorage` per deck. A "Reset layout" button restores the default arrangement.

**Why the previews are pixel-perfect**: each preview is an `<iframe>` that loads the actual deck HTML with a `?preview=N` query param; `runtime.js` detects this and renders only slide N with no chrome. So the preview uses the **same CSS, theme, fonts, and viewport as the audience view** — colors and layout are guaranteed identical.

**Smooth navigation**: on slide change, the presenter window sends `postMessage({type:'preview-goto', idx:N})` to each iframe. The iframe just toggles `.is-active` between slides — **no reload, no flicker**. The two windows also stay in sync via `BroadcastChannel`.

Only `presenter-mode-reveal` is designed from the ground up around the feature with proper example 逐字稿 on every slide.

Keyboard in presenter window: `← →` navigate (syncs audience) · `R` reset timer · `Esc` close popup.
Keyboard in audience window: `S` open presenter · `T` cycle theme · `← →` navigate (syncs presenter) · `F` fullscreen · `O` overview.

### 📱 网页模式（Webpage Mode）

If the user says any of: **网页 / 网页版 / 网页形态 / 做个网页 / 生成网页 / web page / webpage / 长页面 / 上下滑 / 手机看的 / 发链接给别人看**, or the content is meant for **阅读、传播、存档** rather than live presentation — **use the webpage template** instead of a deck.

Webpage mode produces a vertically scrolling HTML page with no slide boundaries. Key differences from deck:

| | Deck | Webpage |
|---|---|---|
| 交互 | 键盘/手势翻页 | 浏览器原生滚动 |
| 布局 | 全屏 16:9 slide | 720px 居中自适应 |
| JS | 需要 runtime.js | 不需要 |
| body class | (none) | `webpage` |
| 结构 | `.deck > .slide` | `.page > section` |
| 适合 | 演讲、分享会、Keynote | 阅读、传播、发链接 |

**How to scaffold:**
```html
<body class="webpage">
<div class="page">
  <section class="hero">...</section>
  <div class="section-break"></div>
  <section>...</section>
  ...
  <div class="page-footer">...</div>
</div>
</body>
```

Starter template: `templates/webpage.html`. Copy it to start a new webpage.
All design tokens (themes, `.card`, `.grid`, `.pill`, `.gradient-text`, etc.) work in both modes.
Do NOT include `runtime.js` in webpage mode — it's not needed.

## Before you author anything — ALWAYS ask or recommend

**Do not start writing slides until you understand three things.** Either ask
the user directly, or — if they already handed you rich content — propose a
tasteful default and confirm.

1. **Content & audience.** What's the deck about, how many slides, who's
   watching (engineers / execs / 小红书读者 / 学生 / VC)?
2. **Style / theme.** Which of the 36 themes fits? If unsure, recommend 2-3
   candidates based on tone:
   - Business / investor pitch → `pitch-deck-vc`, `corporate-clean`, `swiss-grid`
   - Tech sharing / engineering → `tokyo-night`, `dracula`, `catppuccin-mocha`,
     `terminal-green`, `blueprint`
   - 小红书图文 → `xiaohongshu-white`, `soft-pastel`, `rainbow-gradient`,
     `magazine-bold`
   - Academic / report → `academic-paper`, `editorial-serif`, `minimal-white`
   - Edgy / cyber / launch → `cyberpunk-neon`, `vaporwave`, `y2k-chrome`,
     `neo-brutalism`
3. **Starting point.** One of the 15 native full-deck templates, 9 Guizang variants, or scratch? Point
   to the closest `templates/full-decks/<name>/` and ask if it fits. If the
   user's content suggests something obvious (e.g. "我要做产品发布会" →
   `product-launch`), propose it confidently instead of asking blindly.

A good opening message looks like:

> 我可以给你做这份 PPT！先确认三件事：
> 1. 大致内容 / 页数 / 观众是谁？
> 2. 风格偏好？我建议从这 3 个主题里选一个：`tokyo-night`（技术分享默认好看）、`xiaohongshu-white`（小红书风）、`corporate-clean`（正式汇报）。
> 3. 要不要用我现成的 `tech-sharing` 全 deck 模板打底？

Only after those are clear, scaffold the deck and start writing.

## Update (更新)

When the user says "更新 pakco-html", "update pakco-html", "升级", or "拉最新版", run:

```bash
bash ~/.codex/skills/pakco-html/scripts/update.sh
```

For Claude Code installs, run `bash ~/.claude/skills/pakco-html/scripts/update.sh`.

If `scripts/update.sh` doesn't exist yet (old install), run the equivalent inline:

```bash
TMP=$(mktemp -d) && git clone --depth 1 https://github.com/pakco77/pakco-html.git "$TMP/r" 2>/dev/null && mkdir -p ~/.codex/skills/pakco-html && cp -r "$TMP/r/assets" "$TMP/r/templates" "$TMP/r/references" "$TMP/r/scripts" ~/.codex/skills/pakco-html/ && cp "$TMP/r/SKILL.md" ~/.codex/skills/pakco-html/ && rm -rf "$TMP" && echo "✅ 更新完成"
```

All existing decks that reference `assets/` via relative paths will automatically get the latest features (themes, layouts, mobile support, bug fixes) — no HTML changes needed.

## Quick start

1. **Scaffold a new deck.** From the repo root:
   ```bash
   ./scripts/new-deck.sh my-talk
   open examples/my-talk/index.html
   ```
2. **Pick a theme.** Open the deck and press `T` to cycle. Or hard-code it:
   ```html
   <link rel="stylesheet" id="theme-link" href="../assets/themes/aurora.css">
   ```
   Catalog in [references/themes.md](references/themes.md).
3. **Pick layouts.** Copy `<section class="slide">...</section>` blocks out of
   files in `templates/single-page/` into your deck. Replace the demo data.
   Catalog in [references/layouts.md](references/layouts.md).
4. **Add animations.** Put `data-anim="fade-up"` (or `class="anim-fade-up"`) on
   any element. On `<ul>`/grids, use `anim-stagger-list` for sequenced reveals.
   For canvas FX, use `<div data-fx="knowledge-graph">...</div>` and include
   `<script src="../assets/animations/fx-runtime.js"></script>`.
   Catalog in [references/animations.md](references/animations.md).
5. **Use a full-deck template.** Copy `templates/full-decks/<name>/` into
   `examples/my-talk/` as a starting point. Each folder is self-contained with
   scoped CSS. Catalog in [references/full-decks.md](references/full-decks.md)
   and gallery at `templates/full-decks-index.html`.
6. **Render to PNG.**
   ```bash
   ./scripts/render.sh templates/theme-showcase.html       # one shot
   ./scripts/render.sh examples/my-talk/index.html 12      # 12 slides
   ```

## Authoring rules (important)

- **Always start from a template.** Don't author slides from scratch — copy the
  closest layout from `templates/single-page/` first, then replace content.
- **Use tokens, not literal colors.** Every color, radius, shadow should come
  from CSS variables defined in `assets/base.css` and overridden by a theme.
  Good: `color: var(--text-1)`. Bad: `color: #111`.
- **Don't invent new layout files.** Prefer composing existing ones. Only add
  a new `templates/single-page/*.html` if none of the 31 fit.
- **Respect chrome slots.** `.deck-header`, `.deck-footer`, `.slide-number`
  and the progress bar are provided by `assets/base.css` + `runtime.js`.
- **Keyboard-first.** Always include `<script src="../assets/runtime.js"></script>`
  so the deck supports ← → / T / A / F / S / O / hash deep-links.
- **One `.slide` per logical page.** `runtime.js` makes `.slide.is-active`
  visible; all others are hidden.
- **Supply notes.** Wrap speaker notes in `<div class="notes">…</div>` inside
  each slide. Press S to open the overlay.
- **NEVER put presenter-only text on the slide itself.** Descriptive text like
  "这一页展示了……" or "Speaker: 这里可以补充……" or small explanatory captions
  aimed at the presenter MUST go inside `<div class="notes">`, NOT as visible
  `<p>` / `<span>` elements on the slide. The `.notes` class is `display:none`
  by default — it only appears in the S overlay. Slides should contain ONLY
  audience-facing content (titles, bullet points, data, charts, images).

## Writing guide

See [references/authoring-guide.md](references/authoring-guide.md) for a
step-by-step walkthrough: file structure, naming, how to transform an outline
into a deck, how to choose layouts and themes per audience, how to do a
Chinese + English deck, and how to export.

## Catalogs (load when needed)

- [references/themes.md](references/themes.md) — all 36 themes with when-to-use.
- [references/layouts.md](references/layouts.md) — all 31 layout types.
- [references/animations.md](references/animations.md) — 27 CSS + 20 canvas FX animations.
- [references/full-decks.md](references/full-decks.md) — 15 native full-deck templates + 9 Guizang picker variants.
- [references/presenter-mode.md](references/presenter-mode.md) — **演讲者模式 + 逐字稿编写指南（技术分享/演讲必看）**.
- [references/authoring-guide.md](references/authoring-guide.md) — full workflow.

## File structure

```
pakco-html/
├── SKILL.md                 (this file)
├── references/              (detailed catalogs, load as needed)
├── assets/
│   ├── base.css             (tokens + primitives — do not edit per deck)
│   ├── fonts.css            (webfont imports)
│   ├── runtime.js           (keyboard + presenter + overview + theme cycle)
│   ├── themes/*.css         (36 token overrides, one per theme)
│   └── animations/
│       ├── animations.css   (27 named CSS entry animations)
│       ├── fx-runtime.js    (auto-init [data-fx] on slide enter)
│       └── fx/*.js          (20 canvas FX modules: particles/graph/fireworks…)
├── templates/
│   ├── deck.html                  (minimal 6-slide starter)
│   ├── webpage.html               (webpage mode starter — vertical scroll, no slides)
│   ├── theme-showcase.html        (36 slides, iframe-isolated per theme)
│   ├── layout-showcase.html       (iframe tour of all 31 layouts)
│   ├── animation-showcase.html    (20 FX + 27 CSS animation slides)
│   ├── full-decks-index.html      (gallery of all 15 native full-deck templates)
│   ├── full-decks/<name>/         (17 deck folders: 15 native + 2 Guizang bases)
│   └── single-page/*.html         (31 layout files with demo data)
├── scripts/
│   ├── new-deck.sh                (scaffold a deck from deck.html)
│   └── render.sh                  (headless Chrome → PNG)
└── examples/demo-deck/            (complete working deck)
```

## Rendering to PNG

`scripts/render.sh` wraps headless Chrome at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. For multi-slide
capture, runtime.js exposes `#/N` deep-links, and render.sh iterates 1..N.

```bash
./scripts/render.sh templates/single-page/kpi-grid.html        # single page
./scripts/render.sh examples/demo-deck/index.html 8 out-dir    # 8 slides, custom dir
```

## Keyboard cheat sheet

```
←  →  Space  PgUp  PgDn  Home  End    navigate
F                                       fullscreen
S                                       open presenter window (magnetic cards: current/next/script/timer)
N                                       quick notes drawer (bottom overlay)
R                                       reset timer (in presenter window)
?preview=N                              URL param — force preview-only mode (single slide, no chrome)
O                                       slide overview grid
T                                       cycle themes (reads data-themes attr)
A                                       cycle demo animation on current slide
#/N in URL                              deep-link to slide N
Esc                                     close all overlays
```

## License & author

MIT. Copyright (c) 2026 lewis &lt;sudolewis@gmail.com&gt;.

This is a fork of [lewislulu/html-ppt-skill](https://github.com/lewislulu/html-ppt-skill).
Fork maintainer: [@pakco77](https://github.com/pakco77) — adds an interactive
style-picker WebUI, Guizang deck variant integration, and presenter-mode stability
fixes on top of the upstream work.
