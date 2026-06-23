# THE GREAT AWAKENING
## Complete Package — Cold Alchemy Games

Designed by Ali Kocho-Williams // Cold Alchemy Games
AI-adjudicated crisis wargame. 2–5 players (or teams up to 100).
Single session. 45–90 minutes.

Live at: https://awakening.coldalchemygames.com

---

## PACKAGE CONTENTS

### /game
- **index.html** — The game interface. Calls oracle-worker.alikocho.workers.dev for AI adjudication.

### /print
Print before your session. Open in any browser, use the print button or Ctrl/Cmd+P.

- **cthulhu-primer.html** — Single-page setting primer. Distribute to players unfamiliar with the Lovecraftian setting. Print first.
- **faction-dossiers.html** — Five classified intelligence briefings, one per faction. Print single-sided.
- **role-cards.html** — 20 half-page role cards (4 roles × 5 factions). Print and cut.
- **order-sheets.html** — 20 landscape order sheets (4 turns × 5 factions). One per faction per turn.
- **facilitator-guide-standard.html** — 5-page GM guide for standard play (2–5 players).
- **facilitator-guide-conference.html** — 7-page GM guide for large-group play (25–100 players).

### /web
Ready to add to coldalchemygames.com.

- **game-page.html** — Full game page in Cold Alchemy site style.
- **lab-article.html** — "The Oracle Problem" — Lab article on AI adjudication and crisis simulation.

### /deploy
- **oracle-worker.js** — Cloudflare Worker script. Paste into the Worker editor.
- **_headers** — Cloudflare Pages headers file. Lives at GitHub repo root.
- **deployment-guide.html** — Step-by-step deployment instructions.

---

## CURRENT DEPLOYMENT ARCHITECTURE

```
awakening.coldalchemygames.com        → Cloudflare Pages (GitHub repo)
oracle-worker.alikocho.workers.dev    → Cloudflare Worker (oracle-worker.js)
```

### GitHub repo root contains:
```
index.html
_headers
```

### Worker settings:
- Name: oracle-worker
- URL: oracle-worker.alikocho.workers.dev
- Model: claude-sonnet-4-5
- Secret: ANTHROPIC_API_KEY

---

## PRINT ORDER (recommended session prep sequence)

1. cthulhu-primer.html — 1 per player (optional but recommended for new players)
2. faction-dossiers.html — 1 per faction in play
3. role-cards.html — 1 per player
4. order-sheets.html — 4 per faction (one per turn)
5. facilitator-guide-standard.html — 1 for GM
6. facilitator-guide-conference.html — 1 per facilitator (large groups only)

---

## COSTS

- Cloudflare Pages: free tier
- Cloudflare Worker: free tier
- Anthropic API: ~$0.05–0.10 per full 5-player session (claude-sonnet-4-5)

---

## NOTES

- Model: claude-sonnet-4-5 (not claude-sonnet-4-20250514)
- CORS set to * in Worker — lock to awakening.coldalchemygames.com once stable
- index.html calls oracle-worker.alikocho.workers.dev directly

---

Designed by Ali Kocho-Williams
Cold Alchemy Games — Transformation through Play
coldalchemygames.com // awakening.coldalchemygames.com
