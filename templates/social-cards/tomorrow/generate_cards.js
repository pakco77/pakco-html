/**
 * generate_cards.js — 「明天」社交图文卡片批量导出
 *
 * 用法: npm i puppeteer && node generate_cards.js
 * 输出: out/*.png —— 全部 1080×1440（3:4 移动端标准；deviceScaleFactor:2 = 2160×2880 retina）
 *
 * 读取本目录下的 00_cover.html / 01–06 内页（已是 1080×1440 画布），逐张截图。
 * 复刻新内容时：复制这些 HTML、只换文字，保留视觉系统与品牌外壳，再跑本脚本。
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const DIR = __dirname;
const OUT = path.join(DIR, 'out');
const W = 1080, H = 1440, DSF = 2; // 统一移动端尺寸；DSF 2 = 2160×2880 高清

const files = fs.readdirSync(DIR)
  .filter(f => /^\d\d_.*\.html$/.test(f))
  .sort();

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  for (const file of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: H, deviceScaleFactor: DSF });
    await page.goto('file://' + path.join(DIR, file), { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800)); // 等字体/装饰渲染
    const out = path.join(OUT, file.replace('.html', '.png'));
    await page.screenshot({ path: out, fullPage: false });
    console.log('✓', file, '→', out, `(${W * DSF}×${H * DSF})`);
    await page.close();
  }
  await browser.close();
  console.log('\nDone. 全部导出到 out/，均为 1080×1440（@2x = 2160×2880）。');
})();
