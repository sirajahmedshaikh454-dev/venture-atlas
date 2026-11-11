/* Flashcards: decks by lecture, flip, prev/next, known/unknown tracking, quick-revision mode. */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;
  const all = VA.flashcards.map((c, i) => ({ ...c, i }));
  const p = new URLSearchParams(location.search);
  const st = { deck: p.get('l') || 'all', mode: 'all', shuffle: false, pos: 0, list: [] };

  const build = () => {
    const known = VA.store.get().known;
    let l = all.filter(c => st.deck === 'all' || c.l === +st.deck);
    if (st.mode === 'review') l = l.filter(c => known[c.i] !== true);
    st.list = st.shuffle ? VA.shuffle(l) : l; st.pos = 0;
  };
  const chips = (k, o) => o.map(([v, t, l]) => `<button class="chip" data-k="${k}" data-v="${v}" aria-pressed="${String(st[k]) === v}" ${l ? `data-l="${l}"` : ''}>${l ? '<span class="dot"></span>' : ''}${t}</button>`).join('');

  $('#fcTools').innerHTML = `<div class="chips" role="group" aria-label="Deck">${chips('deck', [['all', 'All decks'], ['7', 'Lecture 7', 7], ['8', 'Lecture 8', 8], ['9', 'Lecture 9', 9]])}</div>
    <div class="chips" role="group" aria-label="Mode" style="margin-top:10px">${chips('mode', [['all', 'Every card'], ['review', 'Quick revision · not yet known']])}${chips('shuffle', [['true', 'Shuffle']])}</div>`;
  $$('#fcTools .chip').forEach(c => c.addEventListener('click', () => {
    const k = c.dataset.k; st[k] = k === 'shuffle' ? !st.shuffle : c.dataset.v;
    $$(`#fcTools .chip[data-k="${k}"]`).forEach(x => x.setAttribute('aria-pressed', String(st[k]) === x.dataset.v));
    build(); render();
  }));

  const stats = () => {
    const known = VA.store.get().known, deck = all.filter(c => st.deck === 'all' || c.l === +st.deck);
    const k = deck.filter(c => known[c.i] === true).length, u = deck.filter(c => known[c.i] === false).length;
    $('#fcStats').innerHTML = `<span>Known <b>${k}</b></span><span>Still learning <b>${u}</b></span><span>Unseen <b>${deck.length - k - u}</b></span><span>Deck <b>${deck.length}</b></span>`;
    $('#fcBar').style.width = (100 * k / deck.length) + '%';
  };

  const render = () => {
    stats();
    if (!st.list.length) {
      $('#fcStage').innerHTML = `<div class="panel fc-done"><h2 class="display" style="font-size:3rem">Deck mastered.</h2><p class="muted">Every card in this deck is marked as known.</p><div class="btn-row" style="justify-content:center;margin-top:16px"><button class="btn" id="resetDeck"><i data-lucide="rotate-ccw"></i>Reset this deck</button><a class="btn ghost" href="quiz.html${st.deck !== 'all' ? '?l=' + st.deck : ''}">Test yourself</a></div></div>`;
      $('#resetDeck').addEventListener('click', () => { all.filter(c => st.deck === 'all' || c.l === +st.deck).forEach(c => VA.store.setKnown(c.i, null)); build(); render(); });
      VA.icons(); return;
    }
    const c = st.list[st.pos], L = VA.lec(c.l), kn = VA.store.get().known[c.i];
    $('#fcStage').innerHTML = `
      <button class="fc" id="card" data-l="${c.l}" aria-label="Flashcard. Press to flip.">
        <div class="fc-face fc-front"><div class="fc-meta"><span class="fc-tag"><i></i>${L.code} · ${L.short}</span><span>${st.pos + 1} / ${st.list.length}</span></div><div class="fc-txt">${VA.esc(c.f)}</div><div class="fc-meta"><span>Tap or press space to flip</span><span>${kn === true ? '✓ known' : kn === false ? '↺ learning' : 'new'}</span></div></div>
        <div class="fc-face fc-back"><div class="fc-meta"><span class="fc-tag"><i></i>Answer</span><span>${st.pos + 1} / ${st.list.length}</span></div><div class="fc-txt">${VA.esc(c.b)}</div><div class="fc-meta"><span>Did you know it?</span><span>K / U</span></div></div>
      </button>
      <div class="fc-controls">
        <button class="btn ghost" id="prev" aria-label="Previous card"><i data-lucide="arrow-left"></i></button>
        <button class="btn fc-unknown" id="unk"><i data-lucide="x"></i>Still learning</button>
        <button class="btn fc-known" id="kn"><i data-lucide="check"></i>I know it</button>
        <button class="btn ghost" id="next" aria-label="Next card"><i data-lucide="arrow-right"></i></button>
      </div>`;
    $('#card').addEventListener('click', flip);
    $('#prev').addEventListener('click', () => go(-1));
    $('#next').addEventListener('click', () => go(1));
    $('#kn').addEventListener('click', () => mark(true));
    $('#unk').addEventListener('click', () => mark(false));
    VA.icons();
  };
  const flip = () => $('#card') && $('#card').classList.toggle('flipped');
  const go = d => {
    if (!st.list.length) return;
    st.pos = (st.pos + d + st.list.length) % st.list.length;
    render();
    if (VA.motion) gsap.fromTo('#card', { x: d * 40, opacity: 0 }, { x: 0, opacity: 1, duration: .45, ease: 'expo.out' });
  };
  const mark = v => {
    const c = st.list[st.pos]; VA.store.setKnown(c.i, v);
    if (st.mode === 'review' && v) { st.list.splice(st.pos, 1); if (st.pos >= st.list.length) st.pos = 0; render(); if (!st.list.length) VA.toast('Deck mastered!', 'trophy'); }
    else go(1);
  };
  addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName) || document.querySelector('.modal.open')) return;
    if (e.key === ' ' && document.activeElement.id !== 'card') { e.preventDefault(); flip(); }
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key.toLowerCase() === 'k' && !e.ctrlKey && !e.metaKey) $('#kn') && $('#kn').click();
    else if (e.key.toLowerCase() === 'u') $('#unk') && $('#unk').click();
  });
  document.addEventListener('va:progress', stats);
  build(); render();
})();
