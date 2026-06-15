#!/usr/bin/env bash
# pakco.html :: update.sh — 一键更新 pakco-html 技能到最新版
#
# 原理：从 GitHub 拉最新文件覆盖到已安装的技能目录
# Usage:
#   bash ~/.claude/skills/html-ppt/scripts/update.sh
#   或让 Agent 直接执行下面的命令

set -euo pipefail

SKILL_DIR="${1:-$HOME/.claude/skills/html-ppt}"
REPO="https://github.com/pakco77/pakco-html.git"
TMP_DIR="$(mktemp -d)"

trap "rm -rf '$TMP_DIR'" EXIT

echo "📦 更新 pakco-html …"

git clone --depth 1 "$REPO" "$TMP_DIR/repo" 2>/dev/null

echo ""
echo "最近更新:"
git -C "$TMP_DIR/repo" log --oneline -3

# 覆盖核心文件（保留用户可能添加的 examples）
cp -r "$TMP_DIR/repo/assets" "$SKILL_DIR/"
cp -r "$TMP_DIR/repo/templates" "$SKILL_DIR/"
cp -r "$TMP_DIR/repo/references" "$SKILL_DIR/"
cp -r "$TMP_DIR/repo/scripts" "$SKILL_DIR/"
cp "$TMP_DIR/repo/SKILL.md" "$SKILL_DIR/"

echo ""
echo "✅ 更新完成！所有引用 assets/ 的旧 deck 自动获得新功能，无需修改 HTML。"
