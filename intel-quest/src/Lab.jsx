import React, { useState, useEffect } from 'react';
import { useT } from './i18n.js';

const ACT = [
  ['⌨️', 'Typing and browsing', { cpu: 20 }],
  ['📹', 'Video call with background blur', { cpu: 8, ai: 45 }],
  ['💬', 'Live captions', { cpu: 5, ai: 35 }],
  ['🎮', '3D game', { cpu: 35, gpu: 70 }],
  ['🎬', '4K video editing preview', { cpu: 40, gpu: 60 }],
];

export default function Lab({ onDone }) {
  const { T } = useT();
  const [on, setOn] = useState([1, 3]), [mode, setMode] = useState('npu'), [tried, setTried] = useState({ npu: true }), [bonus, setBonus] = useState(0);
  let cpu = 0, gpu = 0, npu = 0, ai = false;
  on.forEach((i) => { const a = ACT[i][2]; cpu += a.cpu || 0; gpu += a.gpu || 0; if (a.ai) { ai = true; if (mode === 'npu') npu += a.ai; else cpu += a.ai * 1.5; } });
  const cap = (n) => Math.min(100, Math.round(n));
  const pick = (m) => { setMode(m); setTried((t) => ({ ...t, [m]: true })); };
  useEffect(() => { if (tried.npu && tried.cpu && ai && !bonus) setBonus(20); }, [tried, ai, bonus]);
  const E = [['CPU', cpu, 'cpu'], ['GPU', gpu, 'gpu'], ['NPU', npu, 'npu']];
  return (<section className="panel">
    <h2>{T('lab')}</h2>
    <p className="lead sm">{T('labSub')}</p>
    <div className="row">{ACT.map(([e, t], i) => <button key={t} className={'pill' + (on.includes(i) ? ' on' : '')} aria-pressed={on.includes(i)} onClick={() => setOn((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))}>{e} {t}</button>)}</div>
    <h3>Run the AI effects on</h3>
    <div className="row"><button className={'pill' + (mode === 'npu' ? ' on' : '')} onClick={() => pick('npu')}>AI PC with an NPU</button><button className={'pill' + (mode === 'cpu' ? ' on' : '')} onClick={() => pick('cpu')}>PC without an NPU</button></div>
    <div className="meters">{E.map(([n, v, c]) => <div key={n} className="meter2"><span>{n}</span><div className="mb"><i className={c} style={{ height: cap(v) + '%' }} /></div><b>{cap(v)}%</b></div>)}</div>
    <p className="note">{!ai ? 'Switch on an AI task (blur or captions) to see where it lands.' : mode === 'npu' ? 'AI effects run on the NPU, leaving the CPU and GPU free for your apps and games, in supported apps.' : 'Without an NPU the same AI effects land on the CPU, leaving less room for everything else. Real results vary by app and PC.'}</p>
    <p className="small">Illustrative animation to explain roles, not a benchmark. Try both modes{bonus ? ' ✔ Lab bonus +20 XP!' : ' to earn +20 XP.'}</p>
    <button className="cta" onClick={() => onDone(bonus)}>{T('cont')}</button> <button className="ghost" onClick={() => onDone(bonus)}>{T('skip')}</button>
  </section>);
}
