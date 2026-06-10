const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { pathToFileURL } = require("url");

const outDir = __dirname;
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const doc = (title, style, body, size = "card") => {
  const dims = size === "cover" ? "width: 900px; height: 1200px;" : "width: 480px; height: 640px;";
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; ${dims} overflow: hidden; background: #fff; }
  body { font-family: 'PingFang SC', 'Noto Sans SC', 'Hiragino Sans GB', -apple-system, BlinkMacSystemFont, sans-serif; color: #17120f; }
${style}
</style>
</head>
<body>
${body}
</body>
</html>`;
};

const coilSvg = `
<svg class="coil-row" viewBox="0 0 900 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="rgba(0,0,0,.16)" stroke-width="1.5">
    ${Array.from({ length: 15 }, (_, i) => {
      const x1 = 5 + i * 60;
      return `<path d="M ${x1},50 A 30,25 0 0 1 ${x1 + 60},50"/>`;
    }).join("")}
  </g>
</svg>`;

const floorSvg = `
<svg viewBox="0 0 900 130" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="rgba(0,0,0,.2)" stroke-width="1" fill="none">
    <line x1="450" y1="0" x2="0" y2="130"/><line x1="450" y1="0" x2="90" y2="130"/><line x1="450" y1="0" x2="180" y2="130"/><line x1="450" y1="0" x2="270" y2="130"/><line x1="450" y1="0" x2="360" y2="130"/><line x1="450" y1="0" x2="450" y2="130"/><line x1="450" y1="0" x2="540" y2="130"/><line x1="450" y1="0" x2="630" y2="130"/><line x1="450" y1="0" x2="720" y2="130"/><line x1="450" y1="0" x2="810" y2="130"/><line x1="450" y1="0" x2="900" y2="130"/>
    <line x1="0" y1="32" x2="900" y2="32"/><line x1="0" y1="64" x2="900" y2="64"/><line x1="0" y1="98" x2="900" y2="98"/>
  </g>
</svg>`;

const coverStyle = `
  :root { --bg:#FDE8DF; --fg:#17120f; --muted:rgba(23,18,15,.48); --orange:#E8522A; --floor:#E9835A; --stripe:#F4A51F; --black:#0E0A07; }
  .poster { width:900px; height:1200px; background:var(--bg); position:relative; overflow:hidden; display:flex; flex-direction:column; }
  .top { padding:50px 56px 0; display:flex; justify-content:space-between; align-items:center; flex-shrink:0; }
  .brand { display:flex; align-items:center; gap:20px; font-size:38px; font-weight:950; letter-spacing:-.02em; }
  .dot { width:18px; height:18px; border-radius:50%; background:var(--orange); box-shadow:0 0 0 9px rgba(232,82,42,.16); }
  .sep { color:var(--muted); font-weight:800; margin-left:2px; margin-right:-2px; }
  .ep { font-size:38px; font-weight:950; letter-spacing:.02em; white-space:nowrap; }
  .ep span { color:var(--muted); margin-right:8px; }
  .main { flex:1; padding:0 56px; display:flex; flex-direction:column; justify-content:center; position:relative; }
  .star { position:absolute; top:86px; right:72px; width:46px; height:46px; border-radius:9px; display:grid; place-items:center; background:#12B923; color:#fff; font-size:35px; line-height:1; font-weight:950; transform:rotate(-6deg); box-shadow:0 4px 0 #087A1B, 0 9px 16px rgba(0,0,0,.16); }
  h1 { margin:0 0 48px; color:var(--fg); font-size:135px; line-height:.98; letter-spacing:-.07em; font-weight:950; -webkit-text-stroke:1px var(--fg); text-shadow:1px 0 0 var(--fg); }
  .period { display:inline-block; width:.28em; height:.28em; border:.055em solid var(--orange); border-radius:50%; color:transparent; -webkit-text-stroke:0; text-shadow:none; vertical-align:baseline; margin-left:.04em; transform:translateY(.02em); }
  .sub { margin:0; max-width:770px; font-size:30px; line-height:1.55; font-weight:650; }
  .sub .em { background:var(--fg); color:var(--bg); padding:2px 10px; border-radius:2px; font-weight:850; white-space:nowrap; }
  .deco { flex-shrink:0; }
  .coil-row { display:block; width:100%; height:50px; background:var(--bg); }
  .stripe { height:14px; background:var(--stripe); }
  .floor { height:130px; background:var(--floor); position:relative; overflow:hidden; }
  .floor svg { position:absolute; inset:0; width:100%; height:100%; }
  .tag { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--bg); text-shadow:0 2px 0 rgba(0,0,0,.16); }
  .tag-main { font-size:30px; font-weight:850; letter-spacing:.12em; }
  .tag-sub { margin-top:12px; font-size:15px; font-weight:650; letter-spacing:.18em; opacity:.92; }
  .ticker { background:var(--black); padding:16px 0; overflow:hidden; }
  .track { display:flex; gap:36px; white-space:nowrap; animation:slide 38s linear infinite; padding-left:26px; }
  .unit { display:inline-flex; align-items:center; gap:18px; flex-shrink:0; color:rgba(255,255,255,.92); font-size:13px; font-weight:850; letter-spacing:.23em; }
  .unit.cn { letter-spacing:.16em; }
  .small-star { width:16px; height:16px; border-radius:4px; display:inline-grid; place-items:center; background:#12B923; color:#fff; font-size:12px; letter-spacing:0; transform:rotate(-5deg); box-shadow:0 2px 0 #087A1B; }
  @keyframes slide { from { transform:translateX(0); } to { transform:translateX(-50%); } }
`;

fs.writeFileSync(
  path.join(outDir, "00_cover.html"),
  doc(
    "能收数据，才是真产品",
    coverStyle,
    `<div class="poster">
  <div class="top">
    <div class="brand"><span class="dot"></span><span>VibeCoding</span><span class="sep">·</span><span>点亮计划</span></div>
    <div class="ep"><span>EP.</span>06 / 06</div>
  </div>
  <main class="main">
    <span class="star">✳</span>
    <h1>能收数据<br>才是真产品<span class="period">。</span></h1>
    <p class="sub">不用重学后端，<br>但要知道 <span class="em">数据去哪</span>。</p>
  </main>
  <div class="deco">
    ${coilSvg}
    <div class="stripe"></div>
    <div class="floor">${floorSvg}<div class="tag"><div class="tag-main">写给有想法的人</div><div class="tag-sub">半个造物主 · 乘百</div></div></div>
    <div class="ticker"><div class="track">
      <span class="unit">DATA HAS TO GO SOMEWHERE <span class="small-star">✳</span></span>
      <span class="unit">VIBECODING 06 / 06 <span class="small-star">✳</span></span>
      <span class="unit">FORM · BACKEND · TABLE <span class="small-star">✳</span></span>
      <span class="unit cn">半个造物主 · 乘百 <span class="small-star">✳</span></span>
      <span class="unit">DATA HAS TO GO SOMEWHERE <span class="small-star">✳</span></span>
      <span class="unit">VIBECODING 06 / 06 <span class="small-star">✳</span></span>
      <span class="unit">FORM · BACKEND · TABLE <span class="small-star">✳</span></span>
      <span class="unit cn">半个造物主 · 乘百 <span class="small-star">✳</span></span>
    </div></div>
  </div>
</div>`,
    "cover"
  )
);

const baseStyle = `
  :root { --paper:#fffaf6; --fg:#17120f; --muted:#77706b; --line:#17120f; --orange:#E8522A; --pale:#FDE8DF; --gray:#EFEDEB; --green:#12B923; }
  .card { width:480px; height:640px; background:var(--paper); padding:30px; display:flex; flex-direction:column; border:.5px solid rgba(0,0,0,.14); position:relative; overflow:hidden; }
  .top, .bottom { display:flex; justify-content:space-between; align-items:center; font-size:10px; letter-spacing:.17em; color:var(--fg); border-top:1px solid var(--line); padding-top:10px; flex-shrink:0; }
  .bottom { margin-top:auto; }
  .hero { display:grid; grid-template-columns:88px 1fr; gap:16px; align-items:end; margin-top:24px; }
  .num { font-family:Georgia, 'Times New Roman', 'Songti SC', serif; font-size:80px; line-height:.86; letter-spacing:-.05em; font-weight:400; }
  .title { font-size:31px; line-height:1.1; font-weight:950; letter-spacing:-.035em; }
  .chapter { margin-top:12px; font-size:11px; letter-spacing:.17em; color:var(--muted); }
  .copy { margin-top:24px; font-size:22px; line-height:1.44; font-weight:650; }
  .copy.small { font-size:18px; line-height:1.46; }
  .muted { color:var(--muted); }
  .em { color:var(--orange); font-weight:950; }
  .black { display:inline-block; background:var(--fg); color:var(--paper); padding:1px 8px 2px; border-radius:2px; font-weight:850; }
  .rule { height:2px; background:var(--fg); margin:18px 0; }
  .note { border-top:2px solid var(--fg); border-bottom:2px solid var(--fg); padding:14px 0; font-size:22px; line-height:1.38; font-weight:900; margin-top:20px; }
`;

const card = (file, { title, num, chapter, body, bottomLeft, bottomRight, extraStyle = "" }) => {
  fs.writeFileSync(
    path.join(outDir, file),
    doc(
      title,
      `${baseStyle}\n${extraStyle}`,
      `<div class="card">
  <div class="top"><span>写给有想法的人</span><span>VibeCoding · 06 / 06</span></div>
  <div class="hero"><div class="num">${num}</div><div class="title">${title}</div></div>
  <div class="chapter">${chapter}</div>
  ${body}
  <div class="bottom"><span>${bottomLeft}</span><span>${bottomRight}</span></div>
</div>`
    )
  );
};

card("01_display.html", {
  num: "01",
  title: "页面能打开<br>还不够",
  chapter: "第 一 张 · 展 示 页 不 等 于 产 品",
  body: `<div class="copy">
    页面能打开。<br>
    按钮能看到。<br>
    内容能展示。
  </div>
  <div class="demo">
    <div class="screen">
      <div class="bar"></div>
      <h3>Waitlist</h3>
      <p>留下邮箱，获取内测资格。</p>
      <div class="input">your@email.com</div>
      <div class="button">提交</div>
    </div>
    <div class="ghost">数据去哪了？</div>
  </div>
  <div class="note">别人填完以后，<br>数据得有地方去。</div>`,
  bottomLeft: "能展示",
  bottomRight: "还不是真产品",
  extraStyle: `
  .demo { margin-top:22px; display:grid; grid-template-columns:1fr 118px; gap:12px; align-items:center; }
  .screen { background:#fff; border:2px solid var(--fg); padding:12px; min-height:188px; box-shadow:6px 6px 0 rgba(23,18,15,.08); }
  .bar { height:12px; border-bottom:1px solid #ddd; margin:-2px -2px 12px; }
  .screen h3 { margin:0; font-size:29px; line-height:1; font-weight:950; }
  .screen p { margin:10px 0 12px; color:var(--muted); font-size:13px; line-height:1.35; font-weight:700; }
  .input { border:1px solid #ccc; padding:9px; font-size:12px; color:#aaa; background:#fafafa; }
  .button { margin-top:8px; background:var(--fg); color:#fff; padding:9px; text-align:center; font-size:14px; font-weight:900; }
  .ghost { border:2px dashed var(--orange); color:var(--orange); font-size:20px; line-height:1.2; font-weight:950; padding:18px 12px; text-align:center; transform:rotate(2deg); }
  `,
});

card("02_data_path.html", {
  num: "02",
  title: "数据路径<br>就这四步",
  chapter: "第 二 张 · 先 知 道 它 去 哪",
  body: `<div class="path">
    <div><span>01</span><strong>用户输入</strong><p>别人填了什么</p></div>
    <div><span>02</span><strong>HTML 表单</strong><p>页面把内容送出去</p></div>
    <div><span>03</span><strong>后端服务</strong><p>负责接住和处理</p></div>
    <div><span>04</span><strong>数据表</strong><p>最后保存下来</p></div>
  </div>
  <div class="note">你不必重学一遍技术。<br>但要知道数据怎么走。</div>`,
  bottomLeft: "先看路径",
  bottomRight: "再让 AI 写",
  extraStyle: `
  .path { margin-top:24px; display:grid; gap:10px; }
  .path div { position:relative; min-height:68px; background:#fff; border:1px solid var(--fg); padding:11px 14px 11px 62px; }
  .path div::after { content:"↓"; position:absolute; left:24px; bottom:-18px; font-size:20px; font-weight:950; color:var(--orange); z-index:2; }
  .path div:last-child::after { display:none; }
  .path span { position:absolute; left:13px; top:14px; width:30px; height:30px; display:grid; place-items:center; border-radius:50%; background:var(--orange); color:#fff; font-size:11px; font-weight:950; }
  .path strong { display:block; font-size:23px; line-height:1.05; font-weight:950; letter-spacing:-.035em; }
  .path p { margin:5px 0 0; font-size:14px; color:var(--muted); font-weight:750; }
  `,
});

card("03_words.html", {
  num: "03",
  title: "三个词<br>够你入门",
  chapter: "第 三 张 · 前 端 / 后 端 / 数 据 库",
  body: `<div class="defs">
    <div><h3>前端</h3><p>别人看到的页面。</p></div>
    <div><h3>后端</h3><p>接住提交，处理数据。</p></div>
    <div><h3>数据库</h3><p>真正保存数据的地方。</p></div>
  </div>
  <div class="note">不用把它们学完。<br>先知道各自负责什么。</div>
  `,
  bottomLeft: "能分清",
  bottomRight: "就够开始",
  extraStyle: `
  .defs { margin-top:25px; display:flex; flex-direction:column; gap:14px; }
  .defs div { background:#fff; border:2px solid var(--fg); padding:16px 18px; display:grid; grid-template-columns:105px 1fr; align-items:center; min-height:86px; box-shadow:6px 6px 0 rgba(23,18,15,.08); }
  .defs div:nth-child(2) { background:var(--pale); }
  .defs h3 { margin:0; font-size:29px; color:var(--orange); line-height:1; font-weight:950; }
  .defs p { margin:0; font-size:20px; line-height:1.35; font-weight:850; }
  `,
});

card("04_table.html", {
  num: "04",
  title: "后端先理解成<br>一张表",
  chapter: "第 四 张 · 数 据 库 不 用 一 上 来 就 学",
  body: `<div class="table-card">
    <table>
      <thead><tr><th>姓名</th><th>邮箱</th><th>留言</th><th>时间</th></tr></thead>
      <tbody>
        <tr><td>小王</td><td>w@...</td><td>想试用</td><td>09:20</td></tr>
        <tr><td>阿林</td><td>a@...</td><td>求内测</td><td>10:14</td></tr>
        <tr><td>Pakco</td><td>p@...</td><td>已提交</td><td>11:02</td></tr>
      </tbody>
    </table>
  </div>
  <div class="explain">
    <div><span>一行</span>一条提交</div>
    <div><span>一列</span>一个字段</div>
  </div>
  <div class="note">能看懂这张表，<br>你就开始理解数据了。</div>`,
  bottomLeft: "表格思维",
  bottomRight: "新手够用",
  extraStyle: `
  .table-card { margin-top:24px; background:#fff; border:2px solid var(--fg); padding:12px; overflow:hidden; }
  table { width:100%; border-collapse:collapse; table-layout:fixed; font-size:12px; font-weight:800; }
  th { background:var(--fg); color:#fff; padding:9px 4px; border:1px solid var(--fg); }
  td { padding:10px 4px; border:1px solid #d6d1cd; text-align:center; color:#423b36; }
  tbody tr:nth-child(even) td { background:var(--pale); }
  .explain { margin-top:16px; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .explain div { background:#fff; border:1px solid var(--fg); padding:13px; font-size:18px; font-weight:850; text-align:center; }
  .explain span { display:block; color:var(--orange); font-size:26px; line-height:1; font-weight:950; margin-bottom:5px; }
  `,
});

card("05_secret.html", {
  num: "05",
  title: "密钥不要<br>进 HTML",
  chapter: "第 五 张 · 安 全 红 线",
  body: `<div class="copy">
    HTML 发给别人，<br>
    里面的代码别人都能看到。
  </div>
  <div class="danger">
    <div>API Key</div>
    <div>Token</div>
    <div>密码</div>
    <div>App Secret</div>
  </div>
  <div class="cross"></div>
  <div class="note">看不懂没关系。<br>记住：秘密不能放页面里。</div>`,
  bottomLeft: "安全底线",
  bottomRight: "不要硬塞",
  extraStyle: `
  .danger { position:relative; margin-top:30px; display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .danger div { min-height:70px; background:#111; color:#fffaf6; display:grid; place-items:center; border:2px solid #111; font-family:'SF Mono','Menlo','Consolas',monospace; font-size:18px; font-weight:900; }
  .danger div:nth-child(2), .danger div:nth-child(3) { background:var(--pale); color:var(--fg); }
  .cross { position:absolute; left:45px; right:45px; top:354px; height:8px; background:var(--orange); transform:rotate(-8deg); box-shadow:0 0 0 2px var(--paper); }
  .copy { margin-top:25px; }
  `,
});

card("06_prompt.html", {
  num: "06",
  title: "让 AI 先画<br>数据流",
  chapter: "第 六 张 · 方 案 先 于 代 码",
  body: `<div class="prompt">
我想做一个可以收集数据的 HTML 页面。<br><br>
请先不要写代码。<br><br>
请用普通人能听懂的话说明：<br>
1. 用户会输入什么<br>
2. 数据从页面发到哪里<br>
3. 数据会存在哪里<br>
4. 我之后怎么查看这些数据<br>
5. 哪些密钥不能写进 HTML<br><br>
优先推荐免费额度够用、适合新手的现成服务。<br><br>
先输出方案。<br>
等我确认后，再写代码。
  </div>`,
  bottomLeft: "复制这一段",
  bottomRight: "方案先于代码",
  extraStyle: `
  .prompt { margin-top:22px; height:395px; overflow:hidden; background:#111; color:#fffaf6; border:2px solid #111; padding:18px; font-family:'SF Mono','Menlo','Consolas',monospace; font-size:14px; line-height:1.53; font-weight:750; letter-spacing:-.01em; }
  .prompt::before { content:"PROMPT"; display:block; color:#F4A51F; letter-spacing:.22em; font-size:10px; margin-bottom:10px; }
  `,
});

const previewStyle = `
  * { box-sizing:border-box; }
  html, body { margin:0; width:1500px; min-height:1800px; background:#f3f0ed; font-family:'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif; color:#17120f; }
  .wrap { padding:44px; }
  h1 { margin:0 0 24px; font-size:40px; line-height:1.1; letter-spacing:-.04em; }
  .grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; align-items:start; }
  .item { background:#fff; padding:12px; border:1px solid rgba(0,0,0,.14); box-shadow:0 8px 22px rgba(0,0,0,.08); }
  .item img { display:block; width:100%; height:auto; }
  .label { margin-top:8px; font-size:18px; font-weight:800; }
`;

const previewBody = `<div class="wrap">
  <h1>VibeCoding 点亮计划 06 · 配图预览</h1>
  <div class="grid">
    ${[
      ["00_cover.png", "00 封面"],
      ["01_display.png", "01 展示页"],
      ["02_data_path.png", "02 数据路径"],
      ["03_words.png", "03 三个词"],
      ["04_table.png", "04 一张表"],
      ["05_secret.png", "05 安全红线"],
      ["06_prompt.png", "06 可复制 Prompt"],
    ]
      .map(([img, label]) => `<div class="item"><img src="${img}"><div class="label">${label}</div></div>`)
      .join("")}
  </div>
</div>`;

fs.writeFileSync(path.join(outDir, "preview_contact_sheet.html"), doc("预览", previewStyle, previewBody, "preview"));

const exportOne = (htmlFile, pngFile, width, height) => {
  execFileSync(chrome, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=2",
    `--screenshot=${path.join(outDir, pngFile)}`,
    `--window-size=${width},${height}`,
    pathToFileURL(path.join(outDir, htmlFile)).href,
  ]);
};

if (process.argv.includes("--export")) {
  [
    ["00_cover.html", "00_cover.png", 900, 1200],
    ["01_display.html", "01_display.png", 480, 640],
    ["02_data_path.html", "02_data_path.png", 480, 640],
    ["03_words.html", "03_words.png", 480, 640],
    ["04_table.html", "04_table.png", 480, 640],
    ["05_secret.html", "05_secret.png", 480, 640],
    ["06_prompt.html", "06_prompt.png", 480, 640],
  ].forEach(([html, png, width, height]) => exportOne(html, png, width, height));
  exportOne("preview_contact_sheet.html", "preview_contact_sheet.png", 1500, 1800);
}
