#!/usr/bin/env bash
# pakco.html :: update.sh — 一键更新 pakco-html 技能到最新版
#
# Usage:
#   ~/.claude/skills/pakco-html/scripts/update.sh
#   或让 Agent 执行: cd ~/.claude/skills/pakco-html && git pull

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "📦 更新 pakco-html …"
echo "   目录: $SKILL_DIR"

cd "$SKILL_DIR"

# 检查是否有未提交的本地修改
if ! git diff --quiet 2>/dev/null; then
  echo "⚠️  检测到本地修改，先暂存…"
  git stash
  STASHED=1
else
  STASHED=0
fi

git pull --rebase origin main

if [[ "$STASHED" -eq 1 ]]; then
  echo "📎 恢复本地修改…"
  git stash pop || echo "⚠️  自动恢复失败，请手动 git stash pop"
fi

# 显示最近 3 条更新
echo ""
echo "✅ 更新完成！最近更新:"
git log --oneline -3
echo ""
echo "所有引用 assets/ 的旧 deck 自动获得新功能，无需修改 HTML。"
