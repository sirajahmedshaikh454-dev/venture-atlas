/* Home / learning hub */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;
  const secs = VA.lectures.reduce((a, l) => a + l.sections.length, 0);
  [['#nSec', secs], ['#nQ', VA.questions.length], ['#nC', VA.flashcards.length]].forEach(([s, n]) => { $(s).dataset.count = n; $(s).textContent = n; });

  /* first-visit loader (once per browser session) */
  let first = false; try { first = !sessionStorage.getItem('va-loaded'); sessionStorage.setItem('va-loaded', 1); } catch (_) {}
  if (first && VA.motion) {
    const ld = document.createElement('div'); ld.className = 'loader'; ld.setAttribute('aria-hidden', 'true');
    ld.innerHTML = '<div class="count">0</div><div class="lbar"><i></i></div><div class="lmsg">Charting the atlas — lectures 07 · 08 · 09</div>';
    document.body.append(ld);
    $('.hero h1').dataset.delay = '1.7';
    const o = { v: 0 };
    gsap.timeline()
      .to(o, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => { ld.querySelector('.count').textContent = Math.round(o.v); ld.querySelector('.lbar i').style.width = o.v + '%'; } })
      .to(ld, { yPercent: -100, duration: .8, ease: 'expo.inOut' })
      .add(() => ld.remove());
  }

  /* hero 3D */
  const legend = $$('#legend a');
  VA.scene($('#hub'), 'hub', {
    dark: true,
    onHover: id => legend.forEach(a => a.classList.toggle('hot', +a.dataset.id === id)),
    onPick: id => legend.find(a => +a.dataset.id === id).click()
  });
  legend.forEach(a => { a.addEventListener('mouseenter', () => VA.sceneHighlight && VA.sceneHighlight(+a.dataset.id)); a.addEventListener('mouseleave', () => VA.sceneHighlight && VA.sceneHighlight(0)); });

  /* marquee */
  const terms = ['Opportunity assessment plan', 'Political risk', 'Turn-key projects', 'Horizontal merger', 'GATT', 'Utility patent', 'Trademark', 'Life + 70', 'Trade secret', 'Sarbanes-Oxley', 'SWOT', 'PESTEL', 'SMART goals', 'Marketing mix', 'Segmentation'];
  $('#marquee').innerHTML = [...terms, ...terms].map(t => `<span>${t}</span>`).join('');
  if (VA.motion) gsap.to('#marquee', { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });

  /* folios */
  const blurb = { 7: 'Motivations, opportunity assessment, political risk, culture, entry strategies, the five mergers and trade barriers.', 8: 'Patents, trademarks, copyrights, trade secrets, licensing, insurance, Sarbanes-Oxley and contracts.', 9: 'Plan components, SWOT & PESTEL, market research, the marketing mix, segmentation and channels.' };
  const paintFolios = () => {
    $('#folios').innerHTML = VA.lectures.map(l => { const p = VA.store.lecturePct(l.id); return `
      <a class="folio" href="${l.slug}" data-l="${l.id}" data-reveal>
        <div class="f-img"><span class="f-num">${String(l.id).padStart(2, '0')}</span><img src="${l.img.replace('w=1400', 'w=800')}" alt="${l.imgAlt}" loading="lazy" width="800" height="600"></div>
        <div class="f-body"><span class="kicker">${l.code} · ${l.sections.length} sections</span><h3>${l.title}</h3><p>${blurb[l.id]}</p>
          <div class="f-foot"><div class="bar"><i style="width:${p}%"></i></div><span>${p ? p + '% read' : 'Not started'}</span></div></div>
      </a>`; }).join('');
  };
  paintFolios();

  /* roadmap */
  const stops = () => {
    const s = VA.store.get();
    const readAll = VA.lectures.every(l => VA.store.lecturePct(l.id) === 100);
    const readAny = VA.lectures.some(l => VA.store.lecturePct(l.id) > 0);
    const lab = Object.keys(s.lab).some(k => /^(used-|sorter-)/.test(k));
    const known = Object.values(s.known).filter(Boolean).length;
    const quizzed = Object.keys(s.quiz).length > 0;
    return [
      ['Read the lectures', 'lecture-7.html', readAll ? 2 : readAny ? 1 : 0],
      ['Play in the lab', 'lab.html', lab ? 2 : 0],
      ['Drill flashcards', 'flashcards.html', known >= VA.flashcards.length * .6 ? 2 : known ? 1 : 0],
      ['Take quizzes', 'quiz.html', s.quiz.final ? 2 : quizzed ? 1 : 0],
      ['Revise & repeat', 'revision.html', s.quiz.final >= 70 ? 2 : 0]
    ];
  };
  const paintRoad = () => {
    const st = stops(), W = 1000, xs = st.map((_, i) => 80 + i * 210), ys = [150, 70, 160, 60, 140];
    const d = xs.map((x, i) => (i ? `C ${xs[i - 1] + 105} ${ys[i - 1]}, ${x - 105} ${ys[i]}, ${x} ${ys[i]}` : `M ${x} ${ys[i]}`)).join(' ');
    const col = s => s === 2 ? 'var(--good)' : s === 1 ? 'var(--l9)' : 'var(--paper-3)';
    $('#roadmap').innerHTML = `<svg viewBox="0 0 ${W} 250" role="img" aria-label="Learning roadmap with five stops">
      <path d="${d}" fill="none" style="stroke:var(--paper-3)" stroke-width="6" stroke-linecap="round"/>
      <path id="roadPath" d="${d}" fill="none" style="stroke:var(--ink)" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 10"/>
      ${st.map((s, i) => `<a href="${s[1]}"><g>
        <circle cx="${xs[i]}" cy="${ys[i]}" r="26" style="fill:${col(s[2])};stroke:var(--ink);stroke-width:2"/>
        <text x="${xs[i]}" y="${ys[i] + 6}" text-anchor="middle" style="font-family:var(--f-display);font-size:22px;fill:${s[2] ? '#fff' : 'var(--ink)'}">${s[2] === 2 ? '✓' : i + 1}</text>
        <text x="${xs[i]}" y="${ys[i] + (ys[i] > 100 ? 58 : -42)}" text-anchor="middle" style="font-weight:650;font-size:16px;fill:var(--ink)">${s[0]}</text>
        <text x="${xs[i]}" y="${ys[i] + (ys[i] > 100 ? 78 : -62) }" text-anchor="middle" style="font-family:var(--f-mono);font-size:11px;fill:var(--ink-2)">${s[2] === 2 ? 'DONE' : s[2] ? 'IN PROGRESS' : 'NOT STARTED'}</text></g></a>`).join('')}
    </svg>`;
    if (VA.motion) { const p = $('#roadPath'), L = p.getTotalLength(); gsap.fromTo(p, { strokeDashoffset: L }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '#roadmap', start: 'top 85%', end: 'bottom 50%', scrub: 1 } }); }
  };
  paintRoad();

  /* facts */
  let fi = Math.floor(Math.random() * VA.facts.length);
  const showFact = () => {
    const f = VA.facts[fi % VA.facts.length];
    const apply = () => { $('#factN').textContent = f.n; $('#factT').textContent = f.t; $('#factS').textContent = `Source: ${f.src} · Lecture ${f.l}`; };
    if (VA.motion) gsap.timeline().to(['#factN', '#factT', '#factS'], { opacity: 0, y: -10, duration: .25, stagger: .04 }).add(apply).to(['#factN', '#factT', '#factS'], { opacity: 1, y: 0, duration: .5, stagger: .06, ease: 'expo.out' });
    else apply();
  };
  showFact();
  $('#factNext').addEventListener('click', () => { fi++; showFact(); });

  /* progress cards */
  const paintProgress = () => {
    const s = VA.store.get(), known = Object.values(s.known).filter(Boolean).length;
    $('#progressCards').innerHTML = `
      <div class="panel" data-l="9"><span class="kicker">Overall</span><div class="score-big" style="font-size:6rem;margin-top:12px">${VA.store.overall()}%</div><p class="muted">50% reading · 25% quiz mastery · 25% flashcards known.</p></div>
      <div class="panel"><span class="kicker">Lectures read</span>${VA.lectures.map(l => { const p = VA.store.lecturePct(l.id); return `<div data-l="${l.id}" style="margin-top:16px"><div style="display:flex;justify-content:space-between;font-weight:600"><span>${l.code} · ${l.short}</span><span class="mono">${p}%</span></div><div class="bar" style="margin-top:6px"><i style="width:${p}%"></i></div></div>`; }).join('')}</div>
      <div class="panel"><span class="kicker">Practice</span>
        <div style="display:flex;justify-content:space-between;margin-top:16px;font-weight:600"><span>Flashcards known</span><span class="mono">${known} / ${VA.flashcards.length}</span></div>
        ${[7, 8, 9].map(t => `<div style="display:flex;justify-content:space-between;margin-top:10px"><span>Best quiz · L0${t}</span><span class="mono">${s.quiz[t] != null ? s.quiz[t] + '%' : '—'}</span></div>`).join('')}
        <div style="display:flex;justify-content:space-between;margin-top:10px"><span>Final exam best</span><span class="mono">${s.quiz.final != null ? s.quiz.final + '%' : '—'}</span></div>
        <a class="btn sm" href="quiz.html" style="margin-top:20px">Practice now</a></div>`;
  };
  paintProgress();
  document.addEventListener('va:progress', () => { paintFolios(); paintRoad(); paintProgress(); VA.reveal($('#folios')); });

  if (VA.motion) gsap.to('.hero .wrap', { yPercent: 18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
})();
