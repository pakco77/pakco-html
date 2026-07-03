#!/usr/bin/env bash
# pakco.html :: install-codex.sh — install pakco-html as a Codex skill

set -euo pipefail

REPO="${PAKCO_HTML_REPO:-https://github.com/pakco77/pakco-html.git}"
CODEX_DIR="${CODEX_HOME:-$HOME/.codex}"
TARGET="${1:-$CODEX_DIR/skills/pakco-html}"
TMP_DIR="$(mktemp -d)"

trap "rm -rf '$TMP_DIR'" EXIT

echo "Installing pakco-html for Codex..."
git clone --depth 1 "$REPO" "$TMP_DIR/repo" >/dev/null 2>&1

mkdir -p "$TARGET"

for dir in assets templates references scripts docs; do
  if [ -d "$TMP_DIR/repo/$dir" ]; then
    rm -rf "$TARGET/$dir"
    cp -R "$TMP_DIR/repo/$dir" "$TARGET/"
  fi
done

for file in SKILL.md README.md README.zh-CN.md LICENSE CONTRIBUTING.md; do
  if [ -f "$TMP_DIR/repo/$file" ]; then
    cp "$TMP_DIR/repo/$file" "$TARGET/"
  fi
done

echo "Installed to $TARGET"
echo "Restart Codex to pick up the new skill."
echo "Preview: cd \"$TARGET\" && python3 -m http.server 8000"
echo "Then open: http://localhost:8000/templates/style-picker.html"
