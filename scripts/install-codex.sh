#!/usr/bin/env bash
# pakco.html :: install-codex.sh - install pakco-html as a Codex skill

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" 2>/dev/null && pwd || true)"
AGENT="${1:-codex}"

if [ -n "$SCRIPT_DIR" ] && [ -x "$SCRIPT_DIR/install-agent.sh" ]; then
  exec "$SCRIPT_DIR/install-agent.sh" "$AGENT"
fi

curl -fsSL https://raw.githubusercontent.com/pakco77/pakco-html/refs/heads/main/scripts/install-agent.sh | bash -s -- "$AGENT"
