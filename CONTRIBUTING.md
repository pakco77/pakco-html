# Maintainer notes

pakco.html is a static AgentSkill: templates, themes (skins), layouts, examples,
and the picker should work without a build step.

This repo does not currently operate a public deck-review workflow. Custom skins
and decks created by users or agents are private artifacts by default.

## Create a custom skin / deck locally

Fastest path: open `templates/style-picker.html`, click the `+ Custom skin`
card on the `🎨 Skins` tab or the `+ Custom template` card on the `📑 Templates`
tab, then paste the copied prompt into Codex / Claude / Hermes. Each build uses a
unique `<slug>` and is appended to `examples/pakco-html.local.json`, so you can
stack many custom skins/templates without overwriting earlier ones.

Manual path (pick your own `<slug>`, e.g. `q3-review`):

```bash
./scripts/new-deck.sh <slug>
open examples/<slug>/index.html
```

For a more opinionated starting point, copy an existing folder from
`templates/full-decks/<name>/` into `examples/<slug>/`, then replace the content
while keeping the scoped CSS class pattern.

Custom decks should stay in `examples/` unless the maintainer explicitly decides
to ship one in the public catalog. Do not register experimental or private decks
in:

- `templates/style-picker.html`
- `templates/full-decks-index.html`
- `references/full-decks.md`
- `README.md` / `README.zh-CN.md`
- `SKILL.md`

Private decks and themes can still appear in the local WebUI through
`examples/pakco-html.local.json`. That file is ignored by git and is intended as
a per-user taste library. It is not part of the public catalog.

Minimal local registry shape:

```json
{
  "decks": [
    {
      "id": "<slug>",
      "labelZh": "我的私有模板",
      "labelEn": "My Private Template",
      "descZh": "本地 taste",
      "descEn": "Local taste",
      "path": "../examples/<slug>/index.html",
      "author": "Local",
      "presenter": true,
      "prompt": "Please continue using the visual taste in examples/<slug>/."
    }
  ],
  "themes": [
    {
      "id": "<skin-slug>",
      "labelZh": "我的本地皮肤",
      "labelEn": "My Local Skin",
      "css": "../examples/<skin-slug>/theme.css",
      "author": "Local"
    }
  ]
}
```

## Maintainer-only catalog changes

Adding a theme, layout, or public full-deck template is a maintainer decision,
not the default output of custom deck generation.

When a catalog item is intentionally shipped, update all public indexes and docs
in the same change:

- `templates/style-picker.html`
- `templates/full-decks-index.html`
- `references/full-decks.md`
- `references/themes.md` when adding a theme
- `README.md`
- `README.zh-CN.md`
- `SKILL.md`

Keep full-deck CSS scoped with `.tpl-<slug>` so previews do not collide with
other decks. Use shared runtime/assets where possible:

- `../../../assets/runtime.js` from full-deck folders when needed
- `../../../assets/animations/...` for animation assets

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

- `lewislulu/html-ppt-skill` — core skill, themes/skins, layouts, runtime, presenter mode
- `op7418/guizang-ppt-skill` — magazine / Swiss deck templates (bundled as `guizang-magazine` + `guizang-swiss`)
- `op7418/guizang-social-card-skill` — social-card system behind the `图文 / Social Cards` tab (declared in `skills-lock.json`, not vendored)
- `Leonxlnx/taste-skill` — UI taste system behind the `UI Taste` tab (referenced via copied prompts, not vendored)

Do not add company-specific logos, private brand names, or proprietary color
systems to the public template set unless the maintainer explicitly approves it.
