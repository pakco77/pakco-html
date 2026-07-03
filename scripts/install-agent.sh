#!/usr/bin/env bash
# pakco.html :: install-agent.sh - install pakco-html into a known agent skill dir

set -euo pipefail

REPO="${PAKCO_HTML_REPO:-https://github.com/pakco77/pakco-html.git}"
SKILL_NAME="pakco-html"

usage() {
  cat <<'EOF'
Usage:
  scripts/install-agent.sh <agent-or-target-dir>

Agents:
  codex        -> ~/.codex/skills/pakco-html
  claude       -> ~/.claude/skills/pakco-html
  kimi         -> ~/.agents/skills/pakco-html
  qwen         -> ~/.qwen/skills/pakco-html
  gemini       -> ~/.gemini/skills/pakco-html
  kiro         -> ~/.kiro/skills/pakco-html
  cursor       -> ~/.cursor/skills/pakco-html
  hermes       -> ~/.hermes/skills/pakco-html
  codebuddy    -> ~/.codebuddy/skills/pakco-html
  workbuddy    -> ~/.workbuddy/skills-marketplace/skills/pakco-html

You can also pass an explicit target directory:
  scripts/install-agent.sh ~/.some-agent/skills/pakco-html
EOF
}

target_for() {
  case "$1" in
    codex)
      printf '%s\n' "${CODEX_HOME:-$HOME/.codex}/skills/$SKILL_NAME"
      ;;
    claude|claude-code)
      printf '%s\n' "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/skills/$SKILL_NAME"
      ;;
    kimi|kimi-code|kimi-code-cli)
      printf '%s\n' "$HOME/.agents/skills/$SKILL_NAME"
      ;;
    qwen|qwen-code)
      printf '%s\n' "$HOME/.qwen/skills/$SKILL_NAME"
      ;;
    gemini|gemini-cli)
      printf '%s\n' "$HOME/.gemini/skills/$SKILL_NAME"
      ;;
    kiro|kiro-cli)
      printf '%s\n' "$HOME/.kiro/skills/$SKILL_NAME"
      ;;
    cursor)
      printf '%s\n' "$HOME/.cursor/skills/$SKILL_NAME"
      ;;
    hermes|hermes-agent)
      printf '%s\n' "${HERMES_HOME:-$HOME/.hermes}/skills/$SKILL_NAME"
      ;;
    codebuddy)
      printf '%s\n' "$HOME/.codebuddy/skills/$SKILL_NAME"
      ;;
    workbuddy)
      printf '%s\n' "$HOME/.workbuddy/skills-marketplace/skills/$SKILL_NAME"
      ;;
    */*)
      printf '%s\n' "$1"
      ;;
    *)
      return 1
      ;;
  esac
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ] || [ $# -eq 0 ]; then
  usage
  exit 0
fi

TARGET="$(target_for "$1")" || {
  echo "Unknown agent: $1" >&2
  usage >&2
  exit 1
}
TARGET="${TARGET/#\~/$HOME}"
TMP_DIR="$(mktemp -d)"

trap "rm -rf '$TMP_DIR'" EXIT

echo "Installing pakco-html to $TARGET..."
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
echo "Restart the target agent if it does not reload skills automatically."
echo "Preview: cd \"$TARGET\" && python3 -m http.server 8000"
echo "Then open: http://localhost:8000/templates/style-picker.html"
