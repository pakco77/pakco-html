# Contributing

Thanks for helping improve HTML PPT Picker. This repository is a static AgentSkill: templates, themes, layouts, and examples should work without a build step.

## What belongs in a contribution

### Good additions

- A reusable theme in `assets/themes/<name>.css`
- A reusable single-page layout in `templates/single-page/<name>.html`
- A polished full-deck template in `templates/full-decks/<name>/`
- Documentation or bug fixes for the picker, runtime, presenter mode, or template authoring

### Keep experiments out of public indexes

Generated decks used only for testing should stay in `examples/` or a scratch branch. Do not add test-only decks to:

- `templates/style-picker.html`
- `templates/full-decks-index.html`
- `references/full-decks.md`
- `README.md` / `README.zh-CN.md`
- `SKILL.md`

A deck should only be registered when it is intended to be shipped as a reusable template.

## Create a custom deck locally

Fastest path:

```bash
./scripts/new-deck.sh my-talk
open examples/my-talk/index.html
```

For a more opinionated starting point, copy an existing folder from `templates/full-decks/<name>/` into `examples/my-talk/`, then replace the content while keeping the scoped CSS class pattern.

## Ship a new full-deck template

1. Add a folder: `templates/full-decks/<slug>/`
2. Include at least:
   - `index.html`
   - `style.css`
   - optional `README.md`
3. Scope CSS with `.tpl-<slug>` so previews do not collide with other decks.
4. Use shared runtime/assets where possible:
   - `../../../assets/runtime.js` from full-deck folders when needed
   - `../../../assets/animations/...` for animation assets
5. Register the deck in every public index/doc:
   - `templates/style-picker.html` `DECKS` array and tab counts in both languages
   - `templates/full-decks-index.html`
   - `references/full-decks.md`
   - `README.md`
   - `README.zh-CN.md`
   - `SKILL.md`
6. Recount and verify before opening a PR.

## Ship a new theme

1. Add `assets/themes/<slug>.css`.
2. Define/override CSS tokens rather than hard-coding styles in templates.
3. Register it in:
   - `templates/style-picker.html` `THEMES` array and tab counts in both languages
   - `references/themes.md`
   - README count lines in both languages
   - `SKILL.md`

## Verification checklist

Run these from the repository root:

```bash
# Count consistency
python3 - <<'PY'
from pathlib import Path
import re
text = Path('templates/style-picker.html').read_text(encoding='utf-8')
decks = len(re.findall(r"^\s*\['", re.search(r"const DECKS = \[(.*?)\n\];", text, re.S).group(1), re.M))
themes = len(re.findall(r"^\s*\['", re.search(r"const THEMES = \[(.*?)\n\];", text, re.S).group(1), re.M))
print({'theme_files': len(list(Path('assets/themes').glob('*.css'))), 'theme_cards': themes, 'deck_cards': decks, 'layouts': len(list(Path('templates/single-page').glob('*.html')))})
PY

# CSS shorthand trap scan
python3 - <<'PY'
from pathlib import Path
import re, sys
bad=[]
for p in Path('templates/full-decks').rglob('*.css'):
    s=p.read_text(encoding='utf-8', errors='ignore')
    if 'inset:auto' in s or 'inset: auto' in s or re.search(r"\.slide\{[^}]*top:0[^}]*left:0[^}]*inset", s):
        bad.append(str(p))
if bad:
    print('inset bug candidates:', *bad, sep='\n')
    sys.exit(1)
print('inset scan clean')
PY

python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/templates/style-picker.html
```

Check:

- Theme/deck counts match the files and docs.
- Picker works in both 中文 and English.
- New iframes load with no 404s in the browser console/network panel.
- No private/company branding, logos, or proprietary colors were introduced.

## Branding and attribution

Keep upstream attribution to:

- `lewislulu/html-ppt-skill`
- `op7418/guizang-ppt-skill`

Do not add company-specific logos, private brand names, or proprietary color systems to the public template set unless the maintainer explicitly approves it.
