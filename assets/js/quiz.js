/* Quiz engine: topic + difficulty + length, randomized questions and options,
   instant feedback, score, review of wrong answers, retry-wrong. */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;
  const params = new URLSearchParams(location.search);
  const cfg = { topic: params.get('l') || 'all', diff: 'all', n: '10' };
  if (params.get('mode') === 'final') cfg.topic = 'final';
  let run = null;

  const pool = () => VA.questions.filter(q => (cfg.topic === 'all' || cfg.topic === 'final' || q.l === +cfg.topic) && (cfg.diff === 'all' || q.d === +cfg.diff));
  const topicName = t => t === 'final' ? 'Final exam' : t === 'all' ? 'Mixed lectures' : `Lecture ${t}`;
  const chipGroup = (key, opts) => `<div class="chips" role="group">${opts.map(([v, t, l]) => `<button class="chip" data-k="${key}" data-v="${v}" aria-pressed="${cfg[key] === v}" ${l ? `data-l="${l}"` : ''}>${l ? '<span class="dot"></span>' : ''}${t}</button>`).join('')}</div>`;

  const setup = () => {
    const s = VA.store.get();
    $('#quiz').innerHTML = `<div class="panel" data-reveal>
      <div class="setup-grid">
        <div><span class="field-label">1 · Topic</span>${chipGroup('topic', [['7', 'Lecture 7', 7], ['8', 'Lecture 8', 8], ['9', 'Lecture 9', 9], ['all', 'All lectures'], ['final', 'Final exam (25)']])}</div>
        <div><span class="field-label">2 · Difficulty</span>${chipGroup('diff', [['all', 'Any'], ['1', 'Easy'], ['2', 'Medium'], ['3', 'Hard']])}</div>
        <div><span class="field-label">3 · Questions</span>${chipGroup('n', [['5', '5'], ['10', '10'], ['15', '15'], ['all', 'All available']])}</div>
        <div><span class="field-label">Available</span><p style="margin:0"><b id="avail" style="font-family:var(--f-display);font-size:2.6rem;font-weight:400">0</b> <span class="muted">questions match</span></p></div>
      </div>
      <div class="btn-row" style="margin-top:32px"><button class="btn magnetic" id="startQ"><i data-lucide="play"></i>Start quiz</button><span class="muted" style="font-size:.9rem">Keys: <kbd>1</kbd>–<kbd>4</kbd> answer · <kbd>Enter</kbd> next</span></div>
    </div>
    <div class="grid g-2" style="margin-top:24px">
      <div class="panel"><span class="kicker">Best scores</span><div class="history">${['7', '8', '9', 'all', 'final'].map(t => `<div><span>${topicName(t)}</span><b>${s.quiz[t] != null ? s.quiz[t] + '%' : '—'}</b></div>`).join('')}</div></div>
      <div class="panel"><span class="kicker">Recent attempts</span><div class="history">${s.history.length ? s.history.slice(0, 6).map(h => `<div><span>${topicName(h.topic)}</span><span>${h.score}/${h.total} · ${new Date(h.at).toLocaleDateString()}</span></div>`).join('') : '<div><span class="muted">No attempts yet — your first score will appear here.</span></div>'}</div></div>
    </div>`;
    const sync = () => {
      $$('#quiz .chip').forEach(c => c.setAttribute('aria-pressed', cfg[c.dataset.k] === c.dataset.v));
      const final = cfg.topic === 'final';
      $$('#quiz .chip[data-k="diff"], #quiz .chip[data-k="n"]').forEach(c => c.disabled = final);
      $('#avail').textContent = final ? 25 : pool().length;
      $('#startQ').disabled = !final && !pool().length;
    };
    $$('#quiz .chip').forEach(c => c.addEventListener('click', () => { cfg[c.dataset.k] = c.dataset.v; sync(); }));
    $('#startQ').addEventListener('click', () => start());
    sync(); VA.icons(); VA.reveal($('#quiz')); VA.magnet($('#quiz'));
  };

  const start = (questions) => {
    let qs = questions;
    if (!qs) {
      if (cfg.topic === 'final') { // balanced: ~8 per lecture, all difficulties
        qs = [7, 8, 9].flatMap((l, i) => VA.shuffle(VA.questions.filter(q => q.l === l)).slice(0, i === 0 ? 9 : 8));
      } else qs = VA.shuffle(pool()).slice(0, cfg.n === 'all' ? undefined : +cfg.n);
      qs = VA.shuffle(qs);
    }
    run = { qs: qs.map(q => { const order = VA.shuffle(q.o.map((_, i) => i)); return { ...q, order }; }), i: 0, answers: [], topic: questions ? run.topic : (cfg.topic === 'all' && cfg.diff === 'all' ? 'all' : cfg.topic), retry: !!questions };
    show();
  };

  const show = () => {
    const q = run.qs[run.i], L = VA.lec(q.l), correct = run.answers.filter(a => a.ok).length;
    $('#quiz').innerHTML = `<div class="panel" data-l="${q.l}">
      <div class="q-top"><span>${run.retry ? 'Retry · ' : ''}${topicName(run.topic)} · Q${run.i + 1} of ${run.qs.length}</span><span>${['', 'Easy', 'Medium', 'Hard'][q.d]} · ${L.code}</span><span>Score ${correct}/${run.answers.length}</span></div>
      <div class="q-prog"><i style="width:${100 * run.i / run.qs.length}%"></i></div>
      <h2 class="q-text" id="qtext">${VA.esc(q.q)}</h2>
      <ul class="opts" role="list">${q.order.map((oi, k) => `<li><button class="opt" data-oi="${oi}"><span class="ol">${'ABCD'[k]}</span><span>${VA.esc(q.o[oi])}</span><span class="mark"></span></button></li>`).join('')}</ul>
      <div class="explain" id="explain" aria-live="polite"></div>
      <div class="q-actions"><a class="btn ghost sm" href="${L.slug}#${q.s}" target="_blank" rel="noopener"><i data-lucide="book-open"></i>Review in lecture</a>
        <div class="btn-row"><button class="btn ghost sm" id="quit">End quiz</button><button class="btn" id="nextQ" disabled>${run.i === run.qs.length - 1 ? 'See results' : 'Next question'}<i data-lucide="arrow-right"></i></button></div></div>
    </div>`;
    $$('.opt').forEach(b => b.addEventListener('click', () => answer(+b.dataset.oi)));
    $('#nextQ').addEventListener('click', next);
    $('#quit').addEventListener('click', () => run.answers.length ? results() : setup());
    VA.icons();
    if (VA.motion) gsap.from(['#qtext', '.opts li'], { y: 20, opacity: 0, duration: .5, stagger: .05, ease: 'expo.out' });
    $('.opt').focus({ preventScroll: true });
  };

  const answer = oi => {
    const q = run.qs[run.i]; if (run.answers[run.i]) return;
    const ok = oi === q.a;
    run.answers[run.i] = { q, picked: oi, ok };
    $$('.opt').forEach(b => {
      b.disabled = true; const v = +b.dataset.oi;
      if (v === q.a) { b.classList.add('correct'); b.querySelector('.mark').textContent = '✓ Correct'; }
      else if (v === oi) { b.classList.add('wrong'); b.querySelector('.mark').textContent = '✗ Your answer'; }
    });
    const ex = $('#explain');
    ex.className = 'explain show ' + (ok ? 'good' : 'bad');
    ex.innerHTML = `<strong>${ok ? 'Correct!' : 'Not quite.'}</strong>${VA.esc(q.e)}`;
    if (!ok && VA.motion) $('.opt.wrong').classList.add('shake');
    if (ok && VA.motion) gsap.fromTo('.opt.correct', { scale: 1 }, { scale: 1.02, yoyo: true, repeat: 1, duration: .15 });
    $('#nextQ').disabled = false; $('#nextQ').focus({ preventScroll: true });
  };
  const next = () => { if (!run.answers[run.i]) return; run.i++; run.i < run.qs.length ? show() : results(); };

  const results = () => {
    const done = run.answers.filter(Boolean), score = done.filter(a => a.ok).length, total = done.length;
    const pct = Math.round(100 * score / total);
    if (!run.retry) VA.store.quiz(run.topic, score, total);
    const wrong = done.filter(a => !a.ok);
    const verdict = pct >= 85 ? ['Exam-ready.', 'Outstanding recall — keep it fresh with flashcards.'] : pct >= 65 ? ['Solid ground.', 'Review the misses below and try again.'] : ['Keep building.', 'Revisit the lecture sections linked below, then retry the misses.'];
    $('#quiz').innerHTML = `<div class="panel">
      <div class="result-grid"><div class="score-big" id="scoreBig">0%</div>
        <div><span class="kicker">${topicName(run.topic)}${run.retry ? ' · retry' : ''}</span><h2 class="display" style="font-size:clamp(2.2rem,4vw,3.4rem);margin-top:10px">${verdict[0]}</h2><p class="muted">${score} of ${total} correct. ${verdict[1]}</p>
          <div class="btn-row" style="margin-top:20px">${wrong.length ? '<button class="btn" id="retryWrong"><i data-lucide="rotate-ccw"></i>Retry the ones I missed</button>' : ''}<button class="btn ghost" id="again"><i data-lucide="shuffle"></i>New quiz</button><a class="btn ghost" href="flashcards.html">Flashcards</a></div></div></div>
    </div>
    ${wrong.length ? `<div class="panel" style="margin-top:20px"><span class="kicker">Review incorrect answers (${wrong.length})</span><div style="margin-top:16px">${wrong.map(a => { const L = VA.lec(a.q.l); return `<div class="review-item" data-l="${a.q.l}"><div class="ri-q">${VA.esc(a.q.q)}</div><div class="ri-a">You said <span class="y">${VA.esc(a.q.o[a.picked])}</span> · Correct: <span class="c">${VA.esc(a.q.o[a.q.a])}</span></div><p class="muted" style="margin:8px 0 0;font-size:.9rem">${VA.esc(a.q.e)} <a href="${L.slug}#${a.q.s}" style="color:var(--acc);font-weight:600">Review ${L.code} →</a></p></div>`; }).join('')}</div></div>` : ''}`;
    VA.icons();
    const o = { v: 0 };
    if (VA.motion) gsap.to(o, { v: pct, duration: 1.4, ease: 'power3.out', onUpdate: () => $('#scoreBig').textContent = Math.round(o.v) + '%' });
    else $('#scoreBig').textContent = pct + '%';
    if (pct >= 85) VA.toast('Brilliant score!', 'trophy');
    $('#again').addEventListener('click', setup);
    if (wrong.length) $('#retryWrong').addEventListener('click', () => start(wrong.map(a => a.q)));
    VA.scrollTo($('#quiz'));
  };

  addEventListener('keydown', e => {
    if (!run || !$('.opt') || /INPUT|TEXTAREA/.test(document.activeElement.tagName) || document.querySelector('.modal.open')) return;
    const k = +e.key;
    if (k >= 1 && k <= 4) { const b = $$('.opt')[k - 1]; if (b && !b.disabled) b.click(); }
    else if (e.key === 'Enter' && !$('#nextQ').disabled && document.activeElement.tagName !== 'A') { e.preventDefault(); next(); }
  });

  setup();
})();
