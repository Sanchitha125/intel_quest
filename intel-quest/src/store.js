const K = { s: 'iq_sessions', p: 'iq_profile', c: 'iq_cfg' };
const rd = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const wr = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage off */ } };
export const sessions = () => rd(K.s, []);
export const setSessions = (a) => wr(K.s, a);
export const addSession = (s) => wr(K.s, [...sessions(), s]);
export const patchSession = (id, p) => { const a = sessions(), i = a.findIndex((x) => x.id === id); if (i >= 0) { a[i] = { ...a[i], ...p }; wr(K.s, a); } };
export const profile = () => ({ name: '', avatar: '🦊', ...rd(K.p, {}) });
export const saveProfile = (p) => wr(K.p, p);
export const config = () => ({ store: 'Your Store', offer: 'an Intel Core Ultra AI PC demo', pin: 'intel2026', models: [], ...rd(K.c, {}) });
export const saveConfig = (c) => wr(K.c, c);
export const done = () => sessions().filter((s) => s.status === 'completed');
export const leaderboard = (n = 10) => done().sort((a, b) => b.xp - a.xp || a.secs - b.secs).slice(0, n);
const LV = [[0, 'Rookie'], [150, 'Explorer'], [400, 'Pro'], [800, 'Legend']];
export function level(xp) {
  let i = 0; LV.forEach(([m], k) => { if (xp >= m) i = k; });
  const nx = LV[i + 1];
  return { name: LV[i][1], next: nx ? nx[1] : null, need: nx ? nx[0] - xp : 0, pct: nx ? ((xp - LV[i][0]) / (nx[0] - LV[i][0])) * 100 : 100 };
}
export const BADGES = [['AI Explorer', 'Score 60+ in your hands-on challenge'], ['Engine Master', 'Score 60+ in Engine Match'], ['Privacy Guardian', 'Score 60+ in Privacy Defender'], ['Quest Complete', 'Finish a full quest'], ['Persona Collector', 'Play as 2 different personalities'], ['Perfectionist', 'Reach 300 XP in one quest'], ['Speed Runner', 'Finish the arena in 90 seconds or less']];
export function earned(list) {
  const has = (i) => list.some((s) => (s.scores?.[i] ?? 0) >= 60);
  return [has(0), has(1), has(2), list.length > 0, new Set(list.map((s) => s.p)).size >= 2, list.some((s) => s.xp >= 300), list.some((s) => s.secs > 0 && s.secs <= 90)];
}
export function download(name, text, type = 'text/csv') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click();
}
export function questCard({ name, persona, xp, lvl, cat, store }) {
  const c = document.createElement('canvas'); c.width = 900; c.height = 500; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 900, 500); gr.addColorStop(0, '#0A1224'); gr.addColorStop(1, '#0a4f8f'); g.fillStyle = gr; g.fillRect(0, 0, 900, 500);
  g.fillStyle = '#00C7FD'; g.font = '700 28px sans-serif'; g.fillText('INTEL QUEST', 40, 70);
  g.fillStyle = '#fff'; g.font = '800 56px sans-serif'; g.fillText(name, 40, 160);
  g.font = '600 34px sans-serif'; g.fillText(persona, 40, 215);
  g.fillStyle = '#FFC83D'; g.font = '800 72px sans-serif'; g.fillText(xp + ' XP', 40, 320);
  g.fillStyle = '#fff'; g.font = '600 28px sans-serif'; g.fillText('Level: ' + lvl, 40, 365); g.fillText(cat, 40, 415);
  g.fillStyle = '#9FB0D6'; g.font = '400 22px sans-serif'; g.fillText(store, 40, 462);
  const a = document.createElement('a'); a.download = 'intel-quest-card.png'; a.href = c.toDataURL('image/png'); a.click();
}
