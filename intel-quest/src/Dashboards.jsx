import React, { useState } from 'react';
import { PERSONAS, BUDGETS, PRIORITIES } from './data.js';
import { sessions, setSessions, profile, saveProfile, config, saveConfig, done, leaderboard, level, BADGES, earned, download } from './store.js';

const AVATARS = ['🦊', '🐼', '🦁', '🐯', '🤖', '🚀', '🎧', '⚡'];
const lab = (list, id) => (list.find((x) => x.id === id) || {}).title || (list.find((x) => x.id === id) || {}).label || id;
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const Bars = ({ rows, max }) => { const m = max || Math.max(1, ...rows.map((r) => r[1])); return rows.map(([a, c, suf]) => <div className="brow" key={a}><span>{a}</span><i style={{ width: (c / m) * 100 + '%' }} /><b>{c}{suf || ''}</b></div>); };
const Kpi = ({ v, l }) => <div className="kpi"><strong>{v}</strong><small>{l}</small></div>;
const Board = ({ me }) => { const t = leaderboard(10); return t.length ? <ol className="board">{t.map((s, i) => <li key={s.id} className={s.name === me ? 'me' : ''}><span>{i + 1}. {s.name}</span><b>{s.xp} XP · {s.secs}s</b></li>)}</ol> : <p className="small">No completed quests yet. Be the first!</p>; };

export function Me() {
  const [pr, setPr] = useState(profile()), [name, setName] = useState(pr.name), [, f] = useState(0);
  const who = pr.name || 'Guest', mine = done().filter((s) => s.name === who);
  const xp = mine.reduce((a, s) => a + s.xp, 0), lv = level(xp), ear = earned(mine);
  const save = (avatar) => { const p = { name: name.trim().slice(0, 16), avatar: avatar || pr.avatar }; saveProfile(p); setPr(p); f((x) => x + 1); };
  return (<section className="panel">
    <h2>{pr.avatar} {who}’s dashboard</h2>
    <div className="row"><input className="inp" value={name} maxLength={16} placeholder="Nickname" onChange={(e) => setName(e.target.value)} aria-label="Nickname" /><button className="ghost sm" onClick={() => save()}>Save name</button></div>
    <div className="row" style={{ marginTop: 10 }}>{AVATARS.map((a) => <button key={a} className={'pill sm2' + (pr.avatar === a ? ' on' : '')} onClick={() => save(a)} aria-label={'Avatar ' + a}>{a}</button>)}</div>
    <div className="grid4"><Kpi v={mine.length} l="Quests completed" /><Kpi v={xp} l="Total XP" /><Kpi v={mine.length ? Math.max(...mine.map((s) => s.xp)) : 0} l="Best quest XP" /><Kpi v={lv.name} l="Level" /></div>
    <div className="tbar"><i style={{ width: lv.pct + '%', transition: 'none' }} /><b>{lv.next ? `${lv.need} XP to ${lv.next}` : 'Max level reached'}</b></div>
    <h3>Badges</h3>
    <div className="badges">{BADGES.map(([n, d], i) => <div key={n} className={'bd' + (ear[i] ? ' on' : '')}><strong>{ear[i] ? '🏅' : '🔒'} {n}</strong><small>{d}</small></div>)}</div>
    <h3>Your recommendations</h3>
    {mine.length ? <ul className="plain">{mine.slice().reverse().slice(0, 6).map((s) => <li key={s.id}><b>{lab(PERSONAS, s.p)}</b>, {lab(BUDGETS, s.b)}, {s.xp} XP <a href={`#/r/${s.p}.${s.b}.${s.pr}`}>View</a></li>)}</ul> : <p className="small">Play a quest to see your history here.</p>}
    <h3>Leaderboard on this device</h3><Board me={who} />
    <button className="ghost" onClick={() => { history.replaceState(null, '', location.pathname); window.dispatchEvent(new Event('hashchange')); }}>Back to game</button>
  </section>);
}

function sample() {
  const R = (a) => a[Math.floor(Math.random() * a.length)], names = ['Aarav', 'Diya', 'Kabir', 'Meera', 'Rohan', 'Ananya', 'Ishaan', 'Sara'], v = ['yes', 'maybe', 'no'];
  return Array.from({ length: 24 }, (_, i) => {
    const ok = Math.random() > 0.2, sc = [0, 1, 2].map(() => R([40, 60, 75, 100])), pre = R(v), post = R(['yes', 'yes', 'maybe', 'no']);
    return { id: 'demo' + i + Date.now(), demo: true, name: R(names), p: R(PERSONAS).id, b: R(BUDGETS).id, pr: R(PRIORITIES).id, pre, post: ok ? post : null, scores: ok ? sc : [], xp: ok ? sc.reduce((a, b) => a + b, 0) : 0, secs: ok ? 70 + Math.floor(Math.random() * 90) : 0, status: ok ? 'completed' : 'abandoned', tried: ok && Math.random() > 0.5, shared: ok && Math.random() > 0.7, at: Date.now() - Math.floor(Math.random() * 6) * 864e5 };
  });
}

export function Admin() {
  const [ok, setOk] = useState(() => sessionStorage.getItem('iq_admin') === '1'), [pin, setPin] = useState(''), [bad, setBad] = useState(false), [tab, setTab] = useState('over'), [, f] = useState(0);
  const [cfg, setCfg] = useState(config()), [m, setM] = useState({ name: '', persona: 'any', note: '' }), [np, setNp] = useState('');
  const refresh = () => f((x) => x + 1);
  if (!ok) return (<section className="panel"><h2>Admin sign-in</h2><p className="small">Store staff only. Enter the admin PIN.</p>
    <div className="row"><input className="inp" type="password" value={pin} placeholder="PIN" aria-label="Admin PIN" onChange={(e) => { setPin(e.target.value); setBad(false); }} onKeyDown={(e) => e.key === 'Enter' && document.getElementById('go').click()} /><button id="go" className="cta sm" onClick={() => { if (pin === config().pin) { sessionStorage.setItem('iq_admin', '1'); setOk(true); } else setBad(true); }}>Sign in</button></div>
    {bad && <p className="note">Wrong PIN.</p>}</section>);
  const all = sessions(), dn = all.filter((s) => s.status === 'completed'), n = all.length;
  const avg = (k) => (dn.length ? Math.round(dn.reduce((a, s) => a + s[k], 0) / dn.length) : 0);
  const rank = { yes: 2, maybe: 1, no: 0 }, pr = dn.filter((s) => s.pre && s.post), up = pr.filter((s) => rank[s.post] > rank[s.pre]).length, same = pr.filter((s) => rank[s.post] === rank[s.pre]).length;
  const yesPost = pr.filter((s) => s.post === 'yes').length, notYesPre = pr.filter((s) => s.pre !== 'yes').length;
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(Date.now() - (6 - i) * 864e5); const k = d.toDateString(); return [d.toLocaleDateString('en-IN', { weekday: 'short' }), all.filter((s) => new Date(s.at).toDateString() === k).length]; });
  const chal = ['Hands-on challenge', 'Engine Match', 'Privacy Defender'].map((t, i) => [t, dn.length ? Math.round(dn.reduce((a, s) => a + (s.scores?.[i] ?? 0), 0) / dn.length) : 0, '/100']);
  const csv = () => download('intel-quest-sessions.csv', ['time,name,persona,budget,priority,xp,secs,status,pre,post,tried,shared,sample', ...all.map((s) => [new Date(s.at).toISOString(), '"' + String(s.name).replace(/"/g, '""') + '"', s.p, s.b, s.pr, s.xp, s.secs, s.status, s.pre || '', s.post || '', s.tried, s.shared, !!s.demo].join(','))].join('\n'));
  const saveCfg = (c) => { saveConfig(c); setCfg(c); refresh(); };
  const hasDemo = all.some((s) => s.demo);
  return (<section className="panel">
    <h2>Admin dashboard · {cfg.store}</h2>
    {hasDemo && <p className="note">Sample data is included and clearly marked (sample column in the CSV). Remove it before real use.</p>}
    <div className="row tabs">{[['over', 'Overview'], ['ses', 'Sessions'], ['set', 'Store setup']].map(([k, l]) => <button key={k} className={'pill' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{l}</button>)}<button className="ghost sm" onClick={() => { sessionStorage.removeItem('iq_admin'); setOk(false); }}>Sign out</button></div>
    {tab === 'over' && <>
      <div className="grid4"><Kpi v={n} l="Quests started" /><Kpi v={pct(dn.length, n) + '%'} l="Completion rate" /><Kpi v={avg('xp')} l="Average XP" /><Kpi v={avg('secs') + 's'} l="Average play time" /><Kpi v={pct(dn.filter((s) => s.tried).length, dn.length) + '%'} l="Tapped “Try in store”" /><Kpi v={pct(yesPost, pr.length) + '%'} l="Say yes to Intel AI PC after playing" /><Kpi v={pct(up, pr.length) + '%'} l="Raised their intent" /><Kpi v={dn.filter((s) => s.shared).length} l="Shares" /></div>
      <h3>Persuasion impact</h3><p className="small">{pr.length ? `Of ${pr.length} players who answered before and after, ${up} raised their intent, ${same} stayed the same. ${notYesPre ? pct(pr.filter((s) => s.pre !== 'yes' && s.post === 'yes').length, notYesPre) + '% of those who were not already sure said yes after playing.' : ''}` : 'Needs players who answered both survey questions.'}</p>
      <h3>Funnel</h3><Bars rows={[['Started', n], ['Completed', dn.length], ['Rated after play', pr.length], ['Tried in store', dn.filter((s) => s.tried).length]]} max={Math.max(1, n)} />
      <div className="two-col"><div><h3>Customer profiles</h3><Bars rows={PERSONAS.map((x) => [x.title, dn.filter((s) => s.p === x.id).length])} /><h3>Budget bands</h3><Bars rows={BUDGETS.map((x) => [x.label, dn.filter((s) => s.b === x.id).length])} /><h3>Priorities</h3><Bars rows={PRIORITIES.map((x) => [x.label, dn.filter((s) => s.pr === x.id).length])} /></div>
        <div><h3>Average challenge score</h3><Bars rows={chal} max={100} /><h3>Quests per day</h3><Bars rows={days} /><h3>Top players</h3><Board me="" /></div></div>
    </>}
    {tab === 'ses' && <>
      <div className="row"><button className="ghost sm" onClick={csv}>Export CSV</button><button className="ghost sm" onClick={() => { if (confirm('Delete all sessions?')) { setSessions([]); refresh(); } }}>Clear all data</button></div>
      <div className="scroll"><table><thead><tr><th>When</th><th>Name</th><th>Persona</th><th>Budget</th><th>XP</th><th>Time</th><th>Status</th><th>Intent</th><th>Tried</th></tr></thead>
        <tbody>{all.slice().reverse().slice(0, 40).map((s) => <tr key={s.id}><td>{new Date(s.at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td><td>{s.name}{s.demo ? ' (sample)' : ''}</td><td>{lab(PERSONAS, s.p)}</td><td>{lab(BUDGETS, s.b)}</td><td>{s.xp}</td><td>{s.secs}s</td><td>{s.status}</td><td>{s.pre || '-'} → {s.post || '-'}</td><td>{s.tried ? 'Yes' : 'No'}</td></tr>)}</tbody></table></div>
      {!n && <p className="small">No sessions yet.</p>}</>}
    {tab === 'set' && <>
      <h3>Store details</h3>
      <div className="form"><label>Store name<input className="inp" value={cfg.store} onChange={(e) => saveCfg({ ...cfg, store: e.target.value })} /></label><label>What shoppers should ask for<input className="inp" value={cfg.offer} onChange={(e) => saveCfg({ ...cfg, offer: e.target.value })} /></label></div>
      <h3>Models in stock (shown to shoppers)</h3>
      <p className="small">Add only real models you stock and have verified. The game never invents models.</p>
      <div className="form"><input className="inp" placeholder="Model name" value={m.name} onChange={(e) => setM({ ...m, name: e.target.value })} /><select className="inp" value={m.persona} onChange={(e) => setM({ ...m, persona: e.target.value })}><option value="any">Any persona</option>{PERSONAS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select><input className="inp" placeholder="Note (e.g. aisle, offer)" value={m.note} onChange={(e) => setM({ ...m, note: e.target.value })} /><button className="cta sm" onClick={() => { if (m.name.trim()) { saveCfg({ ...cfg, models: [...cfg.models, { ...m, name: m.name.trim() }] }); setM({ name: '', persona: 'any', note: '' }); } }}>Add</button></div>
      <ul className="plain">{cfg.models.map((x, i) => <li key={i}><b>{x.name}</b> ({x.persona === 'any' ? 'any' : lab(PERSONAS, x.persona)}) {x.note} <button className="ghost sm" onClick={() => saveCfg({ ...cfg, models: cfg.models.filter((_, j) => j !== i) })}>Remove</button></li>)}</ul>
      <h3>Admin PIN</h3><div className="row"><input className="inp" type="password" placeholder="New PIN (4+ characters)" value={np} onChange={(e) => setNp(e.target.value)} /><button className="ghost sm" onClick={() => { if (np.length >= 4) { saveCfg({ ...cfg, pin: np }); setNp(''); } }}>Change PIN</button></div>
      <h3>Presentation data</h3><div className="row"><button className="ghost sm" onClick={() => { setSessions([...sessions(), ...sample()]); refresh(); }}>Load sample data (marked)</button><button className="ghost sm" onClick={() => { setSessions(sessions().filter((s) => !s.demo)); refresh(); }}>Remove sample data</button></div>
      <p className="small">Data is stored in this browser only. The PIN is a store-floor convenience, not strong security.</p></>}
  </section>);
}
