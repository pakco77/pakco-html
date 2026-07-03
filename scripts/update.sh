#!/usr/bin/env bash
# pakco.html :: update.sh — 一键更新 pakco-html 技能到最新版
#
# 原理：从 GitHub 拉最新文件覆盖到已安装的技能目录
# Usage:
#   bash ~/.codex/skills/pakco-html/scripts/update.sh
#   bash ~/.claude/skills/pakco-html/scripts/update.sh
#   或让 Agent 直接执行下面的命令

set -euo pipefail

main() {
  local script_dir skill_dir repo tmp_dir
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  skill_dir="${1:-$(cd "$script_dir/.." && pwd)}"
  repo="${PAKCO_HTML_REPO:-https://github.com/pakco77/pakco-html.git}"
  tmp_dir="$(mktemp -d)"

  trap "rm -rf '$tmp_dir'" EXIT

  echo "📦 更新 pakco-html …"

  git clone --depth 1 "$repo" "$tmp_dir/repo" 2>/dev/null

  echo ""
  echo "最近更新:"
  git -C "$tmp_dir/repo" log --oneline -3

  # 覆盖核心文件（保留用户可能添加的 examples）
  mkdir -p "$skill_dir"
  cp -r "$tmp_dir/repo/assets" "$skill_dir/"
  cp -r "$tmp_dir/repo/templates" "$skill_dir/"
  cp -r "$tmp_dir/repo/references" "$skill_dir/"
  cp -r "$tmp_dir/repo/scripts" "$skill_dir/"
  cp "$tmp_dir/repo/SKILL.md" "$skill_dir/"

  echo ""
  echo "✅ 更新完成！所有引用 assets/ 的旧 deck 自动获得新功能，无需修改 HTML。"
}

main "$@"
