/* 2026 Seahawks Defense Data Explorer
   Data as of Nov 26, 2026 (after Week 10, bye Week 11). 10 games, 6-4.
   Sources: Pro-Football-Reference, StatChasers, StatMuse, Covers, FTN, Jets X-Factor,
   ESPN, FootballDB, Wikipedia, SB Nation / Daily Fox News, Edgehalla, NY Post.
   See index.html #sources for full links. Passing yards = NET (after sack yardage). */

const GAMES = [
  { wk: 1,  date: "Sep 9",   opp: "New England Patriots",    ha: "H", result: "W", score: "13–10",  pts: 10, yds: 277, pass: 168, rush: 109, to: 3 },
  { wk: 2,  date: "Sep 20",  opp: "Arizona Cardinals",       ha: "A", result: "W", score: "31–7",   pts: 7,  yds: 151, pass: 81,  rush: 70,  to: 1 },
  { wk: 3,  date: "Sep 27",  opp: "Washington Commanders",    ha: "A", result: "L", score: "31–33",  pts: 33, yds: 258, pass: 176, rush: 82,  to: 0 },
  { wk: 4,  date: "Oct 4",   opp: "Los Angeles Chargers",    ha: "H", result: "W", score: "30–23",  pts: 23, yds: 301, pass: 154, rush: 147, to: 4 },
  { wk: 5,  date: "Oct 11",  opp: "San Francisco 49ers",     ha: "H", result: "L", score: "29–32",  pts: 32, yds: 269, pass: 175, rush: 94,  to: 3 },
  { wk: 6,  date: "Oct 15",  opp: "Denver Broncos",          ha: "A", result: "L", score: "14–17",  pts: 17, yds: 168, pass: 94,  rush: 74,  to: 0 },
  { wk: 7,  date: "Oct 25",  opp: "Kansas City Chiefs",      ha: "H", result: "W", score: "20–3",   pts: 3,  yds: 213, pass: 163, rush: 50,  to: 1 },
  { wk: 8,  date: "Nov 2",   opp: "Chicago Bears",           ha: "H", result: "L", score: "17–34",  pts: 34, yds: 363, pass: 237, rush: 126, to: 1 },
  { wk: 9,  date: "Nov 8",   opp: "Arizona Cardinals",       ha: "H", result: "W", score: "17–3",   pts: 3,  yds: 198, pass: 148, rush: 50,  to: 0 },
  { wk: 10, date: "Nov 15",  opp: "Las Vegas Raiders",       ha: "A", result: "W", score: "21–13",  pts: 13, yds: 163, pass: 98,  rush: 65,  to: 0 },
];

const TEAM_STATS = [
  { v: "17.5", u: "pts / game", l: "Points allowed", r: "#4", cls: "" },
  { v: "236.1", u: "yds / game", l: "Total yards allowed", r: "#1", cls: "" },
  { v: "149.4", u: "net yds / game", l: "Passing yards allowed", r: "#1", cls: "" },
  { v: "86.7", u: "yds / game", l: "Rushing yards allowed", r: "#4", cls: "" },
  { v: "4.00", u: "yds / play", l: "Yards per play allowed", r: "#1", cls: "" },
  { v: "76.7", u: "passer rating", l: "Opponent passer rating", r: "#1", cls: "" },
  { v: "27", u: "sacks", l: "Sacks (2.7 / game)", r: "T-10", cls: "mid" },
  { v: "13", u: "takeaways", l: "Turnovers forced (8 INT + 5 FR)", r: "T-14", cls: "mid" },
  { v: "31.9%", u: "allowed", l: "Opponent 3rd-down conversion", r: "#4", cls: "" },
  { v: "69.6%", u: "allowed", l: "Opponent red-zone TD rate", r: "#29", cls: "bad" },
];

const ADVANCED = [
  { v: "−23.6%", u: "", l: "Defensive DVOA (FTN, Week 11)", r: "#1", cls: "" },
  { v: "−0.08", u: "EPA / play", l: "EPA per play allowed", r: "T-4", cls: "" },
  { v: "−0.08", u: "EPA / dropback", l: "EPA per dropback allowed", r: "T-3", cls: "" },
  { v: "38.2%", u: "allowed", l: "Offensive success rate allowed", r: "#1", cls: "" },
  { v: "7.9%", u: "allowed", l: "Explosive-play rate allowed", r: "#1", cls: "" },
  { v: "30.2%", u: "of dropbacks", l: "Pressure rate", r: "#2", cls: "" },
  { v: "24.1%", u: "5+ rushers", l: "Blitz rate", r: "25th", cls: "mid" },
  { v: "2.94s", u: "to throw †", l: "Opponent time to throw", r: "#4", cls: "" },
  { v: "85.7%", u: "allowed †", l: "Opponent 4th-down conversion", r: "31st", cls: "bad" },
  { v: "28.2%", u: "of drives †", l: "Opponent scoring % (drives)", r: "—", cls: "na" },
];

const PLAYERS = {
  tackles: {
    note: "Combined tackles (solo + assisted), 10 games. Ernest Jones IV is the engine: 98 tackles, 3.0 sacks, 1 INT, 5 passes defended.",
    rows: [
      ["Ernest Jones IV", "LB", 98], ["Devon Witherspoon", "CB", 60], ["Drake Thomas", "LB", 53],
      ["Julian Love", "S", 43], ["Nick Emmanwori", "S", 41], ["Josh Jobe", "CB", 39],
      ["Byron Murphy II", "DT", 36], ["Derick Hall", "LB", 27], ["DeMarcus Lawrence", "LB", 26],
      ["Leonard Williams", "DT", 25],
    ],
  },
  sacks: {
    note: "Team total 27.0 sacks. Byron Murphy II leads from the interior (5.0); Derick Hall owns the team lead in TFL (9) and QB hits (11).",
    rows: [
      ["Byron Murphy II", "DT", 5.0], ["Derick Hall", "LB", 4.0], ["Ernest Jones IV", "LB", 3.0],
      ["Leonard Williams", "DT", 3.0], ["DeMarcus Lawrence", "LB", 2.0], ["Devon Witherspoon", "CB", 2.0],
      ["Nick Emmanwori", "S", 2.0], ["Dante Fowler Jr.", "LB", 2.0], ["Drake Thomas", "LB", 1.0],
      ["Jarran Reed", "NT", 1.0], ["Uchenna Nwosu", "LB", 1.0], ["Mike Morris", "DE", 1.0],
    ],
  },
  ints: {
    note: "Team total 8 interceptions. Julian Love leads in both INT (2) and passes defended (7). Nehemiah Pritchett's 50 return yards lead the team.",
    rows: [
      ["Julian Love", "S", 2], ["Nehemiah Pritchett", "CB", 2], ["Ernest Jones IV", "LB", 1],
      ["Josh Jobe", "CB", 1], ["Drake Thomas", "LB", 1], ["Ty Okada", "S", 1],
    ],
  },
  ff: {
    note: "Team total 6 forced fumbles, 5 recoveries. DeMarcus Lawrence leads with 2 forced fumbles.",
    rows: [
      ["DeMarcus Lawrence", "LB", 2], ["Drake Thomas", "LB", 1], ["Derick Hall", "LB", 1],
      ["Uchenna Nwosu", "LB", 1], ["Dante Fowler Jr.", "LB", 1],
    ],
  },
};

const METRICS = {
  pts: { label: "Points allowed", note: "Fewest points allowed: 3 (Week 7 vs KC, Week 9 vs ARI). Most: 34 (Week 8 vs CHI). Season average 17.5 (#4 in the NFL)." },
  yds: { label: "Yards allowed", note: "Fewest yards allowed: 151 (Week 2 @ ARI). Most: 363 (Week 8 vs CHI). Season average 236.1 — #1 in the NFL." },
  to:  { label: "Takeaways", note: "Most takeaways in a game: 4 (Week 4 vs LAC). Season total 13 (8 INT + 5 fumble recoveries)." },
};

/* ---------- helpers ---------- */
const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/* ---------- stat cards ---------- */
function renderCards(el, items) {
  el.innerHTML = items.map((c) => `
    <div class="card">
      <div class="v">${c.v}${c.u ? ` <small>${c.u}</small>` : ""}</div>
      <div class="l">${c.l}</div>
      <div class="r ${c.cls}">NFL rank ${c.r}</div>
    </div>`).join("");
}
renderCards($("#statCards"), TEAM_STATS);
renderCards($("#advCards"), ADVANCED);

/* ---------- game chart (SVG bars) ---------- */
let chartMetric = "pts";
function renderChart() {
  const m = METRICS[chartMetric];
  const vals = GAMES.map((g) => g[chartMetric]);
  const max = Math.max(...vals);
  const W = 920, H = 260, padL = 44, padB = 34, padT = 14;
  const bw = (W - padL - 24) / GAMES.length;
  const barW = Math.min(52, bw * 0.62);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${m.label} per game">`;
  // gridlines
  [0, 0.5, 1].forEach((f) => {
    const y = padT + (1 - f) * (H - padT - padB);
    svg += `<line x1="${padL}" y1="${y}" x2="${W - 12}" y2="${y}" stroke="#1d4a75" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${y + 4}" fill="#b8c7d4" font-size="12" text-anchor="end">${Math.round(max * f)}</text>`;
  });
  GAMES.forEach((g, i) => {
    const v = vals[i];
    const h = (v / max) * (H - padT - padB);
    const x = padL + i * bw + (bw - barW) / 2;
    const y = H - padB - h;
    const fill = g.result === "W" ? "#69be28" : "#ff6b5e";
    svg += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${fill}"><title>Week ${g.wk} vs ${esc(g.opp)}: ${v} ${m.label.toLowerCase()} (${g.score})</title></rect>`;
    svg += `<text x="${x + barW / 2}" y="${y - 6}" fill="#eaf2f8" font-size="13" font-weight="700" text-anchor="middle">${v}</text>`;
    svg += `<text x="${x + barW / 2}" y="${H - 12}" fill="#b8c7d4" font-size="12" text-anchor="middle">Wk ${g.wk}</text>`;
  });
  svg += `</svg>`;
  $("#gameChart").innerHTML = svg;
  $("#chartNote").textContent = m.note + " Green bars = wins, red bars = losses.";
}
renderChart();

$("#chartToggle").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#chartToggle button").forEach((x) => x.classList.remove("active"));
  b.classList.add("active");
  chartMetric = b.dataset.metric;
  renderChart();
});

/* ---------- game table (sortable) ---------- */
let sortKey = "wk", sortDir = 1;
function renderTable() {
  const rows = [...GAMES].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === "number") return (av - bv) * sortDir;
    return String(av).localeCompare(String(bv)) * sortDir;
  });
  $("#gameBody").innerHTML = rows.map((g) => `
    <tr>
      <td class="num">${g.wk}</td><td>${g.date}</td><td>${esc(g.opp)}</td><td>${g.ha}</td>
      <td><span class="wl ${g.result.toLowerCase()}">${g.result}</span></td>
      <td class="num">${g.score}</td><td class="num"><b>${g.pts}</b></td>
      <td class="num">${g.yds}</td><td class="num">${g.pass}</td><td class="num">${g.rush}</td>
      <td class="num">${g.to}</td>
    </tr>`).join("");
}
renderTable();

document.querySelectorAll("#gameTable th[data-sort]").forEach((th) => {
  th.addEventListener("click", () => {
    const k = th.dataset.sort;
    if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = 1; }
    renderTable();
  });
});

/* ---------- player tabs ---------- */
let playerTab = "tackles";
function renderPlayers() {
  const t = PLAYERS[playerTab];
  const max = Math.max(...t.rows.map((r) => r[2]));
  $("#playerBars").innerHTML = t.rows.map(([name, pos, v]) => `
    <div class="bar-row">
      <div class="nm">${esc(name)} <small>· ${pos}</small></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(v / max) * 100}%"></div></div>
      <div class="val">${v}</div>
    </div>`).join("");
  $("#playerNote").textContent = t.note;
}
renderPlayers();

$("#playerTabs").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#playerTabs button").forEach((x) => x.classList.remove("active"));
  b.classList.add("active");
  playerTab = b.dataset.tab;
  renderPlayers();
});
