import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PERSONAS, BUDGETS, PRIORITIES, STUDY, SPECS, ENGINE_TASKS, PRIVACY, COMPARE, QA, recommend } from './data.js';
import { I18N, LangCtx, useT, speak } from './i18n.js';
import { addSession, patchSession, profile, saveProfile, config, leaderboard, level, questCard } from './store.js';
import Lab from './Lab.jsx';
import { Me, Admin } from './Dashboards.jsx';

let muted = false;
const beep = (f = 660, d = 0.12) => {
  if (muted) return;
  try {
    const c = beep.c || (beep.c = new (window.AudioContext || window.webkitAudioContext)());
    const o = c.createOscillator(), g = c.createGain();
    o.frequency.value = f; g.gain.value = 0.05;
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + d);
  } catch { /* audio unavailable */ }
};
const good = () => { beep(660); setTimeout(() => beep(880), 110); };
const bad = () => beep(220, 0.2);
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));

function useLeft(s, on, end) {
  const [l, setL] = useState(s);
  const e = useRef(end); e.current = end;
  useEffect(() => { if (!on) return; const id = setInterval(() => setL((x) => x - 1), 1000); return () => clearInterval(id); }, [on]);
  useEffect(() => { if (on && l <= 0) e.current(); }, [l, on]);
  return Math.max(0, l);
}
const Bar = ({ l, s }) => <div className="tbar" aria-label={`${l} seconds left`}><i style={{ width: (l / s) * 100 + '%' }} /><b>{l}s</b></div>;

/* ---------- Challenges ---------- */
function Study({ done }) {
  const [sel, setSel] = useState([]);
  const submit = () => { const r = sel.filter((i) => STUDY[i].key).length, w = sel.length - r; done(clamp(r * 34 - w * 15), r === 3 ? 'You found the key ideas. An on-device AI summariser can do this in seconds in supported apps, with your notes staying on your PC.' : 'Spotting the key ideas takes time. AI summarisers in supported apps do it for you and can build revision questions too.'); };
  const l = useLeft(15, true, submit);
  const tap = (i) => { beep(520, 0.06); setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : s.length < 3 ? [...s, i] : s)); };
  return (<>
    <Bar l={l} s={15} />
    <p className="ask">10 minutes before class. Tap the 3 sentences that matter most.</p>
    <div className="stack">{STUDY.map((s, i) => <button key={i} className={'chip' + (sel.includes(i) ? ' on' : '')} onClick={() => tap(i)}>{s.t}</button>)}</div>
    <button className="cta" onClick={submit}>Summarise ({sel.length}/3)</button>
  </>);
}

function Meeting({ done }) {
  const [on, setOn] = useState(false);
  const [bars, setBars] = useState(() => Array.from({ length: 28 }, () => Math.random()));
  const fin = useRef(false);
  const end = () => { if (fin.current) return; fin.current = true; done(0, 'Noise won this time. Compatible AI noise suppression, often run on the NPU, can keep your voice clear. Availability depends on the app and PC.'); };
  const l = useLeft(15, !on, end);
  useEffect(() => { const id = setInterval(() => setBars(Array.from({ length: 28 }, () => Math.random())), 140); return () => clearInterval(id); }, []);
  const flip = () => {
    if (on || fin.current) return; setOn(true); good();
    const sc = clamp(100 - (15 - l) * 5); fin.current = true;
    setTimeout(() => done(Math.max(40, sc), 'Your voice came through clean. AI noise suppression in compatible meeting apps can run on the NPU, leaving the CPU and GPU free. This is a simulation. Real support varies by app.'), 2200);
  };
  return (<>
    <Bar l={on ? 15 : l} s={15} />
    <p className="ask">Important call from a noisy café. Rescue your voice!</p>
    <div className="wave" role="img" aria-label="Audio waveform">{bars.map((b, i) => <div key={i} className="col"><span className="noise" style={{ height: 8 + b * 80 * (on ? 0.08 : 1) + '%' }} /><span className="voice" style={{ height: 22 + (Math.sin(i / 2.2) + 1) * 14 + '%' }} /></div>)}</div>
    <p className="meter">Voice clarity: <b>{on ? 'Crystal clear' : 'Drowned out'}</b></p>
    <button className={'cta big' + (on ? ' ok' : '')} onClick={flip}>{on ? 'AI noise suppression: ON' : 'Switch on AI noise suppression'}</button>
  </>);
}

function Specs({ persona, done }) {
  const list = SPECS[persona], [sel, setSel] = useState([]);
  const submit = () => { const r = sel.filter((i) => list[i][1]).length, w = sel.length - r; done(clamp(r * 34 - w * 17), 'Colours and freebies fade fast. Graphics, memory, cooling or display, and AI capability decide the next few years. Verify them on the spec sheet.'); };
  const l = useLeft(15, true, submit);
  return (<>
    <Bar l={l} s={15} />
    <p className="ask">Spec Hunter: tap the 3 things that matter for long-term performance.</p>
    <div className="stack">{list.map(([t], i) => <button key={i} className={'chip' + (sel.includes(i) ? ' on' : '')} onClick={() => { beep(520, 0.06); setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : s.length < 3 ? [...s, i] : s)); }}>{t}</button>)}</div>
    <button className="cta" onClick={submit}>Lock in ({sel.length}/3)</button>
  </>);
}

function Engines({ persona, done }) {
  const tasks = ENGINE_TASKS[persona], [i, setI] = useState(0), [fb, setFb] = useState(null), [ok, setOk] = useState(0), [lit, setLit] = useState(null);
  const finish = (n) => done(clamp((n / tasks.length) * 100), 'CPU, GPU and NPU are teammates, not substitutes. An NPU helps supported AI apps run efficiently, and it does not replace a CPU or a gaming GPU.');
  const l = useLeft(24, true, () => finish(ok));
  const pick = (e) => { if (fb) return; const t = tasks[i], right = e === t[1]; setLit(e); right ? good() : bad(); if (right) setOk((x) => x + 1); setFb({ right, why: t[2], ans: t[1] }); };
  const next = () => { if (i + 1 >= tasks.length) return finish(ok); setI(i + 1); setFb(null); setLit(null); };
  return (<>
    <Bar l={l} s={24} />
    <p className="ask">Which engine is the best fit?</p>
    <div className="task">{tasks[i][0]}</div>
    <div className="engines">{[['CPU', 'Everyday tasks'], ['GPU', 'Graphics'], ['NPU', 'Efficient AI']].map(([e, s]) => <button key={e} className={'eng ' + e + (lit === e ? ' lit' : '') + (fb && fb.ans === e ? ' ans' : '')} onClick={() => pick(e)}><strong>{e}</strong><small>{s}</small></button>)}</div>
    {fb && <div className={'fb ' + (fb.right ? 'y' : 'n')}><b>{fb.right ? 'Correct' : 'Best fit: ' + fb.ans}</b> {fb.why}<button className="cta sm" onClick={next}>{i + 1 >= tasks.length ? 'Finish' : 'Next'}</button></div>}
  </>);
}

function Privacy({ done }) {
  const [i, setI] = useState(0), [fb, setFb] = useState(null), [ok, setOk] = useState(0);
  const finish = (n) => done(clamp((n / PRIVACY.length) * 100), 'On-device AI can reduce how much data leaves your PC, but it does not guarantee privacy. Always check each app’s data settings.');
  const l = useLeft(24, true, () => finish(ok));
  const pick = (v) => { if (fb) return; const t = PRIVACY[i], right = v === t[1]; right ? good() : bad(); if (right) setOk((x) => x + 1); setFb({ right, why: t[2] }); };
  const next = () => { if (i + 1 >= PRIVACY.length) return finish(ok); setI(i + 1); setFb(null); };
  return (<>
    <Bar l={l} s={24} />
    <p className="ask">Privacy Defender: where is this best handled?</p>
    <div className="task">{PRIVACY[i][0]}</div>
    <div className="engines two"><button className="eng NPU" onClick={() => pick('local')}><strong>On my PC</strong><small>Local AI</small></button><button className="eng GPU" onClick={() => pick('cloud')}><strong>Cloud is fine</strong><small>Needs internet</small></button></div>
    {fb && <div className={'fb ' + (fb.right ? 'y' : 'n')}><b>{fb.right ? 'Correct' : 'Not quite'}</b> {fb.why}<button className="cta sm" onClick={next}>{i + 1 >= PRIVACY.length ? 'Finish' : 'Next'}</button></div>}
  </>);
}

const ABADGE = { 0: 'AI Explorer', 1: 'Engine Master', 2: 'Privacy Guardian' };

function Arena({ persona, scores, setScores, onAll }) {
  const first = { student: 'study', pro: 'meeting', creator: 'specs', gamer: 'specs' }[persona];
  const seq = [first, 'engines', 'privacy'], [n, setN] = useState(0), [res, setRes] = useState(null);
  const key = seq[n];
  const done = (s, note) => setRes((r) => r || { s, note });
  const go = () => { const next = [...scores, res.s]; setScores(next); setRes(null); if (n + 1 >= seq.length) onAll(next); else setN(n + 1); };
  const title = { study: 'Study Sprint', meeting: 'Meeting Rescue', specs: 'Spec Hunter', engines: 'Engine Match', privacy: 'Privacy Defender' }[key];
  return (<section className="panel arena">
    <div className="steps">{seq.map((_, i) => <span key={i} className={i < n ? 'd' : i === n ? 'c' : ''} />)}</div>
    <h2>Challenge {n + 1} of 3: {title}</h2>
    {!res ? <div key={key}>
      {key === 'study' && <Study done={done} />}{key === 'meeting' && <Meeting done={done} />}{key === 'specs' && <Specs persona={persona} done={done} />}
      {key === 'engines' && <Engines persona={persona} done={done} />}{key === 'privacy' && <Privacy done={done} />}
    </div> : <div className="reveal">
      <div className="xp">+{res.s} XP</div>
      {res.s >= 60 && <div className="badge">🏅 Badge unlocked: {ABADGE[n]}</div>}
      <p>{res.note}</p>
      <button className="cta" onClick={go}>{n + 1 >= seq.length ? 'See how Intel compares' : 'Next challenge'}</button>
    </div>}
  </section>);
}

/* ---------- Screens ---------- */
function Hook({ start }) {
  const { T, lang } = useT(), top = leaderboard(3);
  return (<section className="hook">
    <div>
      <p className="kicker">Intel Quest</p>
      <h1>{T('hero')}</h1>
      <p className="lead">{T('lead')}</p>
      <div className="row"><button className="cta big" onClick={start}>{T('start')}</button><button className="ghost" onClick={() => speak(T('hero') + ' ' + T('lead'), lang)}>🔊 {T('read')}</button></div>
      <p className="small">{T('small')}</p>
      {top.length > 0 && <div className="mini"><b>{T('top')}</b><ol className="board">{top.map((s, i) => <li key={s.id}><span>{i + 1}. {s.name}</span><b>{s.xp} XP</b></li>)}</ol></div>}
    </div>
    <div className="die" aria-hidden="true"><div className="e cpu">CPU</div><div className="e gpu">GPU</div><div className="e npu">NPU</div><div className="core">Intel<br />Core Ultra</div></div>
  </section>);
}

function Pick({ onGo }) {
  const { T } = useT(), [p, setP] = useState(null), [b, setB] = useState(null), [pr, setPr] = useState(null), [pre, setPre] = useState(null), [name, setName] = useState(profile().name);
  return (<section className="panel">
    <h2>{T('pickTitle')}</h2>
    <div className="cards">{PERSONAS.map((x) => <button key={x.id} className={'card' + (p === x.id ? ' on' : '')} onClick={() => { setP(x.id); beep(600); }}><span className="em">{x.emoji}</span><strong>{x.title}</strong><small>{x.sub}</small></button>)}</div>
    <h3>{T('budget')}</h3>
    <div className="row">{BUDGETS.map((x) => <button key={x.id} className={'pill' + (b === x.id ? ' on' : '')} onClick={() => setB(x.id)}>{x.label}</button>)}</div>
    <h3>{T('matters')}</h3>
    <div className="row">{PRIORITIES.map((x) => <button key={x.id} className={'pill' + (pr === x.id ? ' on' : '')} onClick={() => setPr(x.id)}>{x.label}</button>)}</div>
    <h3>{T('preQ')}</h3>
    <div className="row">{['yes', 'maybe', 'no'].map((v) => <button key={v} className={'pill' + (pre === v ? ' on' : '')} onClick={() => setPre(v)}>{T(v)}</button>)}</div>
    <h3>{T('nick')}</h3>
    <input className="inp" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} aria-label={T('nick')} />
    <div><button className="cta big" disabled={!(p && b && pr)} onClick={() => onGo(p, b, pr, name.trim() || 'Guest', pre)}>{T('enter')}</button></div>
  </section>);
}

function Compare({ persona, next }) {
  const [t, setT] = useState('old'), c = COMPARE.find((x) => x.id === t), per = PERSONAS.find((x) => x.id === persona);
  return (<section className="panel">
    <h2>Intel vs the alternatives</h2>
    <p className="lead sm">Honest comparison for {per.title.toLowerCase()}. Pick who to compare with.</p>
    <div className="row">{COMPARE.map((x) => <button key={x.id} className={'pill' + (t === x.id ? ' on' : '')} onClick={() => setT(x.id)}>{x.tab}</button>)}</div>
    <div className="cmp"><div><h3>What Intel Core Ultra brings</h3><ul>{c.intel.map((x) => <li key={x}>{x}</li>)}</ul></div><div><h3>Fair check before you buy</h3><ul>{c.check.map((x) => <li key={x}>{x}</li>)}</ul></div></div>
    <p className="note">Not every Intel AI PC is a Copilot+ PC. Copilot+ is a Microsoft category that needs an NPU of 40+ TOPS and more. Check the exact model.</p>
    <button className="cta" onClick={next}>Reveal my AI PC</button>
  </section>);
}

function Result({ sel, scores, secs, bonus, sid, name, replay, tryIt }) {
  const { T, lang } = useT(), cfg = config(), r = recommend(sel.p, sel.b, sel.pr), per = PERSONAS.find((x) => x.id === sel.p);
  const shared = scores === null, xp = shared ? null : scores.reduce((a, b) => a + b, 0) + bonus, lv = xp !== null ? level(xp) : null;
  const [post, setPost] = useState(null), url = `${location.origin}${location.pathname}#/r/${sel.p}.${sel.b}.${sel.pr}`;
  const models = cfg.models.filter((m) => m.persona === 'any' || m.persona === sel.p);
  const rate = (v) => { setPost(v); if (sid) patchSession(sid, { post: v }); good(); };
  const wa = 'https://wa.me/?text=' + encodeURIComponent(`I'm ${per.title} on Intel Quest${xp !== null ? ' with ' + xp + ' XP' : ''}! My AI PC match: ${r.cat}. ${url}`);
  return (<section className="panel result">
    <p className="kicker">{T('unlocked')}</p>
    <h2>{per.emoji} {per.title}</h2>
    <div className="rec"><small>{T('recCat')}</small><strong>{r.cat}</strong></div>
    {xp !== null && <div className="row">
      <span className="stat">⭐ {xp} XP</span><span className="stat">🎖 {lv.name}</span><span className="stat">⏱ {secs}s</span>
      {scores.map((s, i) => s >= 60 && <span key={i} className="stat">🏅 {ABADGE[i]}</span>)}
    </div>}
    <div className="two-col">
      <div><h3>{T('why')}</h3><ul>{r.why.map((x) => <li key={x}>{x}</li>)}</ul><h3>{T('ai')}</h3><ul>{r.needs.map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div><h3>{T('specs')}</h3><ul>{r.look.map((x) => <li key={x}>{x}</li>)}</ul><p className="note">{r.note}</p></div>
    </div>
    {models.length > 0 && <div className="note"><b>{T('inStore')} ({cfg.store}):</b><ul>{models.map((m, i) => <li key={i}>{m.name} {m.note && <small>({m.note})</small>}</li>)}</ul></div>}
    {!shared && <><h3>{T('postQ')}</h3>{post ? <p className="small">{T('thanks')}</p> : <div className="row">{['yes', 'maybe', 'no'].map((v) => <button key={v} className="pill" onClick={() => rate(v)}>{T('p' + v)}</button>)}</div>}</>}
    <div className="qr"><QRCodeSVG value={url} size={104} bgColor="#ffffff" fgColor="#0A1224" marginSize={2} /><p>Scan to take this recommendation on your phone.<br /><small>Always confirm processor, NPU TOPS, RAM, battery and price on the store’s listing.</small></p></div>
    <div className="row"><button className="cta big" onClick={tryIt}>{T('tryIt')}</button><button className="ghost" onClick={replay}>{T('again')}</button></div>
    <div className="row"><a className="ghost sm" href={wa} target="_blank" rel="noopener noreferrer" onClick={() => sid && patchSession(sid, { shared: true })}>{T('share')}</a>
      {!shared && <button className="ghost sm" onClick={() => questCard({ name, persona: per.title, xp, lvl: lv.name, cat: r.cat, store: cfg.store })}>{T('card')}</button>}
      <button className="ghost sm" onClick={() => window.print()}>{T('print')}</button>
      <button className="ghost sm" onClick={() => speak(`${per.title}. ${r.cat}. ${r.why.join(' ')}`, 'en')}>🔊 {T('read')}</button></div>
  </section>);
}

function TryModal({ sel, close }) {
  const per = PERSONAS.find((x) => x.id === sel.p), cfg = config();
  return (<div className="modal" role="dialog" aria-modal="true" onClick={close}><div className="sheet" onClick={(e) => e.stopPropagation()}>
    <h2>Your next step: hands-on at {cfg.store}</h2>
    <p>Show this screen to a store associate and ask for <b>{cfg.offer}</b> for <b>{per.title.toLowerCase()}</b> use.</p>
    <ul><li>Try your own apps: a call with background blur, live captions or your editing and gaming tools.</li><li>Ask for the NPU TOPS rating and whether the model is a Copilot+ PC.</li><li>Compare battery claims with independent reviews.</li><li>Compare at least two models, not just the cheapest.</li></ul>
    <button className="cta" onClick={close}>Got it</button></div></div>);
}

function Qi() {
  const [open, setOpen] = useState(false), [a, setA] = useState(null);
  return (<div className="qi">
    {open && <div className="qibox"><b>Ask Qi, your AI PC guide</b>
      {a ? <p>{a}</p> : <p>Tap a question.</p>}
      {QA.map(([q, ans]) => <button key={q} className="pill sm" onClick={() => setA(ans)}>{q}</button>)}</div>}
    <button className="qibtn" onClick={() => setOpen(!open)} aria-label="Ask Qi">{open ? '✕' : '💬 Ask Qi'}</button>
  </div>);
}

/* ---------- App ---------- */
export default function App() {
  const [screen, setScreen] = useState('hook'), [sel, setSel] = useState(null), [scores, setScores] = useState([]), [bonus, setBonus] = useState(0), [t0, setT0] = useState(0), [secs, setSecs] = useState(0), [name, setName] = useState('Guest'), [mute, setMute] = useState(false), [modal, setModal] = useState(false), [hash, setHash] = useState(location.hash);
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('iq_lang') || 'en'; } catch { return 'en'; } });
  const sid = useRef(null), tried = useRef(false);
  const T = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
  useEffect(() => { const h = () => setHash(location.hash); window.addEventListener('hashchange', h); return () => window.removeEventListener('hashchange', h); }, []);
  useEffect(() => {
    const m = hash.match(/^#\/r\/(\w+)\.(\w+)\.(\w+)$/);
    if (m && PERSONAS.some((x) => x.id === m[1]) && BUDGETS.some((x) => x.id === m[2]) && PRIORITIES.some((x) => x.id === m[3])) { sid.current = null; setSel({ p: m[1], b: m[2], pr: m[3] }); setScores(null); setScreen('result'); }
  }, [hash]);
  const reset = () => { tried.current = false; sid.current = null; setScores([]); setBonus(0); setSel(null); setModal(false); setScreen('hook'); if (location.hash) history.replaceState(null, '', location.pathname); setHash(''); };
  useEffect(() => { // kiosk mode: reset after 90s of no touch
    if (screen === 'hook' || hash.startsWith('#/')) return;
    let id; const arm = () => { clearTimeout(id); id = setTimeout(() => { if (screen === 'play' && sid.current) patchSession(sid.current, { status: 'abandoned' }); reset(); }, 90000); };
    arm(); const ev = ['pointerdown', 'keydown', 'touchstart']; ev.forEach((e) => window.addEventListener(e, arm));
    return () => { clearTimeout(id); ev.forEach((e) => window.removeEventListener(e, arm)); };
  }, [screen, hash]);
  const go = (p, b, pr, nm, pre) => {
    const id = Date.now() + '-' + Math.random().toString(36).slice(2, 7); sid.current = id;
    saveProfile({ ...profile(), name: nm === 'Guest' ? '' : nm }); setName(nm);
    addSession({ id, name: nm, p, b, pr, pre, post: null, scores: [], xp: 0, secs: 0, status: 'started', tried: false, shared: false, at: Date.now(), lang });
    setSel({ p, b, pr }); setScores([]); setBonus(0); setT0(Date.now()); setScreen('play'); good();
  };
  const all = (sc) => { const el = Math.round((Date.now() - t0) / 1000); setSecs(el); setScores(sc); patchSession(sid.current, { scores: sc, xp: sc.reduce((a, b) => a + b, 0), secs: el, status: 'completed' }); setScreen('lab'); };
  const labDone = (bn) => { setBonus(bn); if (bn) patchSession(sid.current, { xp: scores.reduce((a, b) => a + b, 0) + bn }); setScreen('compare'); };
  const markTried = () => { setModal(true); if (tried.current || !sid.current) return; tried.current = true; patchSession(sid.current, { tried: true }); };
  const changeLang = (l) => { setLang(l); try { localStorage.setItem('iq_lang', l); } catch { /* storage off */ } };
  const page = hash === '#/admin' || hash === '#/store' ? <Admin /> : hash === '#/me' ? <Me /> : null;
  return (<LangCtx.Provider value={{ T, lang }}>
    <Shell mute={mute} setMute={setMute} lang={lang} setLang={changeLang} home={reset} xp={!page && screen === 'play' && scores ? scores.reduce((a, b) => a + b, 0) : null}>
      {page || <>
        {screen === 'hook' && <Hook start={() => { beep(520); setScreen('pick'); }} />}
        {screen === 'pick' && <Pick onGo={go} />}
        {screen === 'play' && <Arena persona={sel.p} scores={scores} setScores={setScores} onAll={all} />}
        {screen === 'lab' && <Lab onDone={labDone} />}
        {screen === 'compare' && <Compare persona={sel.p} next={() => setScreen('result')} />}
        {screen === 'result' && sel && <Result sel={sel} scores={scores} secs={secs} bonus={bonus} sid={sid.current} name={name} replay={reset} tryIt={markTried} />}
        {modal && <TryModal sel={sel} close={() => setModal(false)} />}
        <Qi />
      </>}
    </Shell></LangCtx.Provider>);
}

function Shell({ children, mute, setMute, xp, lang, setLang, home }) {
  const { T } = useT();
  return (<div className="app">
    <header><a className="logo" href={location.pathname} onClick={(e) => { e.preventDefault(); home(); }}>Intel Quest</a>
      {xp !== null && xp !== undefined && <span className="stat">⭐ {xp} XP</span>}
      <a className="ghost sm" href="#/me">👤 {T('me')}</a>
      <select className="inp sel" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language"><option value="en">English</option><option value="hi">हिन्दी</option><option value="kn">ಕನ್ನಡ</option></select>
      <button className="ghost sm" onClick={() => { muted = !mute; setMute(!mute); }} aria-label="Toggle sound">{mute ? '🔇' : '🔊'}</button></header>
    <main>{children}</main>
    <footer>Educational concept for the CMRIT × Intel 1 Million Minds challenge. Not an official Intel product. Challenge text is in English. <a href="#/admin">Store admin</a></footer>
  </div>);
}
