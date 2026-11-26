# 2026 Seahawks Defense Data Explorer

An interactive, single-page explorer for the **2026 Seattle Seahawks defense** — the NFL's
#1 yardage defense through Week 10 (236.1 yards allowed per game, 4.00 yards per play).

Built for [POIDH bounty #1569](https://poidh.xyz/base/bounty/1569)
("Build a 2026 Seahawks defense data explorer", Base, 0.002 ETH).

## What's inside

- **Overview** — headline per-game stats with NFL ranks, plus three insights (the wall,
  the no-fly zone, and the crack: red-zone / 4th-down weakness).
- **Game log** — every game Week 1–10 with an interactive chart (points / yards / takeaways)
  and a sortable table. Columns sum exactly to the season totals.
- **Player leaders** — tackles, sacks, interceptions, forced fumbles, with bar charts.
- **Advanced metrics** — defensive DVOA (−23.6%, #1), EPA/play, success rate, pressure rate,
  blitz rate, and more, each with its NFL rank.
- **NFC West standings** — as of Nov 26, 2026, plus the remaining schedule.
- **Sources & methodology** — every number traced to a live source; discrepancies
  (red-zone trips, blitz-rate definitions) documented, not hidden.

## Data

- **As of:** Nov 26, 2026 — after Week 10, bye Week 11. 10 games, record 6–4.
- **Sources:** Pro-Football-Reference, StatChasers, StatMuse, Covers, FTN Fantasy,
  Jets X-Factor, ESPN, The Football Database, Wikipedia, SB Nation / Daily Fox News,
  Edgehalla, NY Post. Full links on the page.
- **Convention:** "Passing yards allowed" is **net** (after sack yardage). Gross passing
  yards allowed: 166.2 per game.
- Numbers verified by a single source are marked † on the page.

## Run it

No build step, no dependencies. Serve the folder statically:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or deploy as-is to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## License

MIT — see [LICENSE](LICENSE).
