#!/usr/bin/env bash
# pakco.html :: install-codex.sh - install pakco-html as a Codex skill

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENT="${1:-codex}"

if [ -x "$SCRIPT_DIR/install-agent.sh" ]; then
  exec "$SCRIPT_DIR/install-agent.sh" "$AGENT"
fi

curl -fsSL https://raw.githubusercontent.com/pakco77/pakco-html/main/scripts/install-agent.sh | bash -s -- "$AGENT"
