/* Interactive Lab: Market Selector, Scenario Sorter, SMART checker, Contract checker */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;
  const touched = k => VA.store.lab('used-' + k, true);

  /* ---------- 1. Market selector (five-step model) ---------- */
  const IND = ['Market size', 'Market growth', 'Low competition', 'Past sales & experience', 'Product fit'];
  const MK = [{ n: 'Nordavia', v: [8, 3, 4, 7, 6] }, { n: 'Sundara', v: [5, 9, 7, 2, 7] }, { n: 'Pacifica', v: [6, 6, 5, 5, 4] }];
  const W = [3, 3, 2, 2, 3];
  $('#marketBody').innerHTML = `
    <div class="grid g-2">
      <div class="panel"><span class="field-label">Steps 1–2 · Indicators, converted to a 1–10 score</span>
        <div class="tbl-wrap" style="margin:0"><table class="mkt-table" style="min-width:420px"><thead><tr><th>Indicator</th>${MK.map(m => `<th>${m.n}</th>`).join('')}</tr></thead>
        <tbody>${IND.map((ind, r) => `<tr><td>${ind}</td>${MK.map((m, c) => `<td><input type="number" min="1" max="10" value="${m.v[r]}" data-r="${r}" data-c="${c}" aria-label="${ind} score for ${m.n}"></td>`).join('')}</tr>`).join('')}</tbody></table></div></div>
      <div class="panel"><span class="field-label">Step 3 · Weight each indicator (0–5)</span>
        ${IND.map((ind, r) => `<div class="range-row"><label for="w${r}">${ind}</label><input type="range" id="w${r}" min="0" max="5" value="${W[r]}" data-w="${r}"><output id="o${r}">${W[r]}</output></div>`).join('')}</div>
    </div>
    <div class="panel" style="margin-top:20px"><span class="field-label">Steps 4–5 · Analyze & select from the rankings</span><ol class="rank-list" id="ranks"></ol><p class="muted" id="rankNote" style="margin:14px 0 0;font-size:.92rem"></p></div>`;
  const rank = () => {
    const sw = W.reduce((a, b) => a + b, 0) || 1;
    const res = MK.map(m => ({ n: m.n, s: Math.round(10 * m.v.reduce((a, v, i) => a + v * W[i], 0) / sw) })).sort((a, b) => b.s - a.s);
    $('#ranks').innerHTML = res.map((r, i) => `<li data-l="7"><span class="rk">${i + 1}</span><b>${r.n}</b><span class="mono">${r.s}/100</span><div class="bar"><i style="width:${r.s}%;${i ? '' : 'background:var(--l9-bright)'}"></i></div></li>`).join('');
    const top = IND[W.indexOf(Math.max(...W))];
    $('#rankNote').textContent = `${res[0].n} ranks first with your weights. Your heaviest weight is on “${top}” — change it and watch the ranking move. That is why step 3 matters.`;
  };
  $$('#marketBody input[type=number]').forEach(i => i.addEventListener('input', () => { const v = Math.max(1, Math.min(10, +i.value || 1)); MK[i.dataset.c].v[i.dataset.r] = v; rank(); touched('market'); }));
  $$('#marketBody input[type=range]').forEach(i => i.addEventListener('input', () => { W[i.dataset.w] = +i.value; $('#o' + i.dataset.w).textContent = i.value; rank(); touched('market'); }));
  rank();

  /* ---------- 2. Scenario sorter ---------- */
  const S = { deck: 'mergers', items: [], i: 0, score: 0, locked: false };
  $('#sorterDecks').innerHTML = Object.entries(VA.sorterDecks).map(([k, d]) => `<button class="chip" data-deck="${k}" data-l="${d.lecture}" aria-pressed="${k === S.deck}"><span class="dot"></span>${d.title}</button>`).join('');
  $$('#sorterDecks .chip').forEach(c => c.addEventListener('click', () => { S.deck = c.dataset.deck; $$('#sorterDecks .chip').forEach(x => x.setAttribute('aria-pressed', x === c)); startSort(); }));
  const startSort = () => { S.items = VA.shuffle(VA.sorterDecks[S.deck].items); S.i = 0; S.score = 0; drawSort(); };
  const drawSort = () => {
    const d = VA.sorterDecks[S.deck];
    $('#sorterBody').dataset.l = d.lecture;
    if (S.i >= S.items.length) {
      const best = Math.max(VA.store.get().lab['sorter-' + S.deck] || 0, S.score);
      VA.store.lab('sorter-' + S.deck, best);
      $('#sorterBody').innerHTML = `<div class="panel" style="text-align:center"><span class="kicker">${d.title}</span><div class="score-big" style="margin:16px 0">${S.score}/${S.items.length}</div><p class="muted">Best: ${best}/${S.items.length}</p><button class="btn" id="sortAgain"><i data-lucide="shuffle"></i>Play again</button></div>`;
      $('#sortAgain').addEventListener('click', startSort); VA.icons(); return;
    }
    const [txt] = S.items[S.i]; S.locked = false;
    $('#sorterBody').innerHTML = `<div class="panel"><div class="q-top"><span>${d.title}</span><span>Card ${S.i + 1} / ${S.items.length}</span><span>Score ${S.score}</span></div>
      <div class="q-prog"><i style="width:${100 * S.i / S.items.length}%;background:var(--acc)"></i></div>
      <p class="sorter-item" id="sItem">“${VA.esc(txt)}”</p>
      <div class="bins">${d.bins.map((b, i) => `<button class="bin" data-b="${i}">${b}</button>`).join('')}</div>
      <div class="feedback" id="sFb" aria-live="polite"></div></div>`;
    $$('.bin').forEach(b => b.addEventListener('click', () => pick(+b.dataset.b)));
    if (VA.motion) gsap.from('#sItem', { y: 20, opacity: 0, duration: .5, ease: 'expo.out' });
  };
  const pick = b => {
    if (S.locked) return; S.locked = true; touched('sorter');
    const d = VA.sorterDecks[S.deck], ans = S.items[S.i][1], ok = b === ans;
    if (ok) S.score++;
    $$('.bin')[ans].classList.add('right'); if (!ok) $$('.bin')[b].classList.add('wrong');
    $('#sFb').className = 'feedback ' + (ok ? 'good' : 'bad');
    $('#sFb').textContent = ok ? `Correct — ${d.bins[ans]}.` : `Not quite — it’s ${d.bins[ans]}.`;
    setTimeout(() => { S.i++; drawSort(); }, ok ? 900 : 1700);
  };
  startSort();

  /* ---------- 3. SMART goal checker ---------- */
  const SAMPLES = ['Increase website leads by 20% within 6 months.', 'Become the best brand in the world.', 'Sign 15 new B2B retail partners in Lahore by December 2026.', 'Grow social media followers a lot.'];
  $('#smartSamples').innerHTML = SAMPLES.map(s => `<button class="chip" type="button">${VA.esc(s)}</button>`).join('');
  $$('#smartSamples .chip').forEach(c => c.addEventListener('click', () => { $('#smartIn').value = c.textContent; checkSmart(); }));
  const checkSmart = () => {
    const t = $('#smartIn').value.trim(), tl = t.toLowerCase();
    const S1 = /\b(increase|grow|reduce|cut|launch|sign|sell|acquire|gain|reach|raise|generate|open|win|convert|double|triple|achieve|recruit|enter|lower|improve)\w*/.test(tl) && t.split(/\s+/).length >= 5 && !/\b(a lot|best|better|more stuff|some)\b/.test(tl);
    const M = /\d/.test(t);
    const T = /\b(by|within|before|until|in)\b.*\b(\d+|week|month|quarter|year|q[1-4]|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|day)/.test(tl);
    const A = $('#smartA').checked, R = $('#smartR').checked;
    const res = { S: S1, M, A, R, T };
    $$('.smart-l').forEach(el => el.classList.toggle('ok', !!res[el.dataset.k]));
    const miss = Object.entries(res).filter(([, v]) => !v).map(([k]) => ({ S: 'Specific — name the exact result (e.g., “increase leads”)', M: 'Measurable — add a number, % or amount', A: 'Achievable — confirm it is realistic with your resources', R: 'Relevant — confirm it supports the mission', T: 'Time-bound — add a deadline (“within 6 months”, “by Q4”)' })[k]);
    const v = $('#smartVerdict');
    if (!t) { v.className = 'verdict'; v.innerHTML = ''; return; }
    touched('smart');
    v.className = 'verdict ' + (miss.length ? 'bad' : 'good');
    v.innerHTML = miss.length ? `<i data-lucide="alert-triangle"></i><span>Not SMART yet. Missing: ${miss.join(' · ')}.</span>` : '<i data-lucide="badge-check"></i><span>That’s a SMART objective — ready for the marketing plan.</span>';
    VA.icons();
  };
  ['input', 'change'].forEach(ev => $('#smartBox').addEventListener(ev, checkSmart));

  /* ---------- 4. Contract validity checker ---------- */
  const CONDS = [['offer', 'An offer was made (oral or written)'], ['accept', 'The offer was voluntarily accepted'], ['consid', 'Consideration — both parties give something of value'], ['compet', 'Both parties are competent / have the right to negotiate'], ['legal', 'The purpose is legal (e.g., not gambling)'], ['written', 'The agreement is in writing']];
  const PRESETS = {
    good: { offer: 1, accept: 1, consid: 1, compet: 1, legal: 1, written: 1, amount: 12000, long: 0 },
    hand: { offer: 1, accept: 1, consid: 1, compet: 1, legal: 1, written: 0, amount: 2400, long: 0 },
    gamb: { offer: 1, accept: 1, consid: 1, compet: 1, legal: 0, written: 1, amount: 900, long: 0 },
    gift: { offer: 1, accept: 1, consid: 0, compet: 1, legal: 1, written: 1, amount: 300, long: 0 }
  };
  $('#contractConds').innerHTML = CONDS.map(([k, t]) => `<li><label><input type="checkbox" id="c_${k}" checked><span>${t}</span></label></li>`).join('');
  const checkContract = () => {
    const g = k => $('#c_' + k).checked, amt = +$('#cAmount').value || 0, long = $('#cLong').checked;
    const probs = [];
    if (!g('offer')) probs.push('There is no offer, so there is nothing to accept.');
    if (!g('accept')) probs.push('An offer is not binding until it is voluntarily accepted.');
    if (!g('consid')) probs.push('No consideration — both parties must give something of value.');
    if (!g('compet')) probs.push('A party is not competent or lacks the right to negotiate for the firm.');
    if (!g('legal')) probs.push('Illegal activities under a contract are not binding.');
    if (!g('written') && amt >= 500) probs.push(`Sales of $500 or more must be in writing (this is $${amt.toLocaleString()}).`);
    if (!g('written') && long) probs.push('Don’t rely on a handshake when the deal cannot be completed within one year.');
    const v = $('#contractVerdict');
    v.className = 'verdict ' + (probs.length ? 'bad' : 'good');
    v.innerHTML = probs.length ? `<i data-lucide="file-x"></i><span><b>Not a reliable, binding contract.</b><br>${probs.join('<br>')}</span>` : `<i data-lucide="file-check-2"></i><span><b>Looks binding.</b> All six conditions are met. Before signing: understand the terms, cross out what you don’t agree to, don’t sign with blanks, and keep a copy.</span>`;
    VA.icons();
  };
  $$('#contractBox input').forEach(i => i.addEventListener('input', () => { checkContract(); touched('contract'); }));
  $$('#contractPresets .chip').forEach(c => c.addEventListener('click', () => {
    const p = PRESETS[c.dataset.p];
    CONDS.forEach(([k]) => $('#c_' + k).checked = !!p[k]);
    $('#cAmount').value = p.amount; $('#cLong').checked = !!p.long;
    $$('#contractPresets .chip').forEach(x => x.setAttribute('aria-pressed', x === c));
    checkContract(); touched('contract');
  }));
  checkContract();
})();
