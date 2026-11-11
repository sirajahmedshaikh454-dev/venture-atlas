/* Lecture page: renders VA.lectures[id] into the page, tracks reading progress. */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;
  const id = +document.body.dataset.lecture;
  const L = VA.lec(id);
  const i = VA.lectures.indexOf(L);
  const prev = VA.lectures[i - 1], next = VA.lectures[i + 1];
  document.body.dataset.l = id;

  const block = b => {
    if (b.p) return `<p>${b.p}</p>`;
    if (b.list) return `<ul class="list">${b.list.map(x => `<li>${x}</li>`).join('')}</ul>`;
    if (b.def) return `<dl class="def" data-reveal><dt>${b.def[0]}</dt><dd>${b.def[1]}</dd></dl>`;
    if (b.cards) return `<div class="cards">${b.cards.map(c => `<div class="card" data-reveal><div class="c-ico"><i data-lucide="${c[2] || 'circle'}"></i></div><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('')}</div>`;
    if (b.steps) return `<ol class="steps">${b.steps.map(s => `<li data-reveal><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join('')}</ol>`;
    if (b.table) return `<div class="tbl-wrap" data-reveal><table><thead><tr>${b.table.head.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${b.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (b.diagram) return VA.diagram(b.diagram);
    if (b.callout) return `<div class="callout" data-reveal><i data-lucide="lightbulb"></i><div>${b.callout}</div></div>`;
    if (b.example) return `<div class="example" data-reveal><i data-lucide="globe"></i><div>${b.example}</div></div>`;
    if (b.note) return `<div class="note"><i data-lucide="info"></i><div>${b.note}</div></div>`;
    return '';
  };
  const words = JSON.stringify(L.sections).replace(/<[^>]+>/g, ' ').split(/\s+/).length;

  $('#main').innerHTML = `
  <section class="lec-hero">
    <div class="wrap">
      <div class="lec-hero-grid">
        <div>
          <span class="kicker">Lecture ${id} · Technology Entrepreneurship</span>
          <div class="big-num" aria-hidden="true">${String(id).padStart(2, '0')}</div>
          <h1 class="display" data-split="now">${L.title}</h1>
          <p class="lede" style="margin-top:20px">${L.tagline}</p>
          <div class="head-meta"><span>${L.sections.length} sections</span><span>~${Math.ceil(words / 200)} min read</span><span id="lecPct">0% read</span></div>
          <div class="btn-row" style="margin-top:28px">
            <a class="btn magnetic" href="#${L.sections[0].id}"><i data-lucide="book-open"></i>Start reading</a>
            <a class="btn ghost magnetic" href="quiz.html?l=${id}"><i data-lucide="target"></i>Quiz this lecture</a>
          </div>
        </div>
        <div class="lec-visual"><canvas id="lecScene" aria-label="Animated 3D illustration for lecture ${id}" role="img"></canvas></div>
      </div>
      <figure class="lec-photo"><img src="${L.img}" alt="${L.imgAlt}" loading="lazy" width="1400" height="530"><figcaption>${L.imgCredit}</figcaption></figure>
    </div>
  </section>
  <div class="wrap lec-layout">
    <nav class="toc" aria-label="Lecture sections">
      <span class="kicker">Contents</span>
      <ol>${L.sections.map(s => `<li><a href="#${s.id}" data-sec="${s.id}">${s.title}</a></li>`).join('')}</ol>
      <div class="toc-progress"><span class="mono" style="font-size:.74rem;color:var(--ink-2)">YOUR PROGRESS</span><div class="bar"><i id="tocBar"></i></div>
        <a class="btn sm ghost" href="flashcards.html?l=${id}" style="width:100%;justify-content:center"><i data-lucide="layers"></i>Flashcards</a></div>
    </nav>
    <article class="prose">
      ${L.sections.map((s, n) => `<section class="lsec" id="${s.id}" data-sec="${s.id}">
        <header><span class="kicker">${s.kicker}</span><h2><span class="sn">${String(n + 1).padStart(2, '0')}</span>${s.title}</h2></header>
        ${s.blocks.map(block).join('')}
        <div class="takeaway" data-reveal><i data-lucide="key-round"></i><div><span class="kicker">Key takeaway</span><p>${s.takeaway}</p></div></div>
      </section>`).join('')}
      <div class="complete-box">
        <div><h3>Finished Lecture ${id}?</h3><p>Mark it complete, then lock it in with practice.</p></div>
        <div class="btn-row"><button class="btn" id="doneBtn"></button><a class="btn ghost" style="color:var(--paper);border-color:rgba(242,237,227,.35)" href="quiz.html?l=${id}">Take the quiz</a></div>
      </div>
      <nav class="lec-end" aria-label="Lecture navigation">
        ${prev ? `<a class="pn" href="${prev.slug}"><span class="kicker">← Previous lecture</span><strong>${prev.code} · ${prev.short}</strong></a>` : `<a class="pn" href="index.html"><span class="kicker">← Back</span><strong>Learning hub</strong></a>`}
        ${next ? `<a class="pn next" href="${next.slug}"><span class="kicker">Next lecture →</span><strong>${next.code} · ${next.short}</strong></a>` : `<a class="pn next" href="revision.html"><span class="kicker">Up next →</span><strong>Revision center</strong></a>`}
      </nav>
    </article>
  </div>`;
  document.title = `${L.code} · ${L.short} — Venture Atlas`;
  VA.initDiagrams($('#main'));
  VA.scene($('#lecScene'), 'l' + id);

  /* progress UI */
  const paint = () => {
    const s = VA.store.get(), read = s.read[id] || [], pct = VA.store.lecturePct(id);
    $$('.toc a').forEach(a => a.classList.toggle('read', read.includes(a.dataset.sec)));
    $('#tocBar').style.width = pct + '%';
    $('#lecPct').textContent = pct + '% read';
    const done = !!s.done[id];
    $('#doneBtn').innerHTML = done ? '<i data-lucide="check"></i>Completed' : '<i data-lucide="flag"></i>Mark as complete';
    $('#doneBtn').classList.toggle('done', done);
    VA.icons();
  };
  $('#doneBtn').addEventListener('click', () => {
    const done = !VA.store.get().done[id];
    VA.store.setDone(id, done);
    VA.toast(done ? `Lecture ${id} complete — nice work!` : 'Marked as not complete', done ? 'party-popper' : 'undo-2');
  });
  document.addEventListener('va:progress', paint);
  paint();

  /* section read = its takeaway scrolled into view; active TOC entry follows scroll */
  // must stay on screen ~1.5s, so jumping/scrolling past a section doesn't count as reading it
  const readIO = new IntersectionObserver(es => es.forEach(e => {
    clearTimeout(e.target._t);
    if (!e.isIntersecting) return;
    e.target._t = setTimeout(() => {
      const sec = e.target.closest('.lsec').dataset.sec;
      if (VA.store.markRead(id, sec) && VA.store.lecturePct(id) === 100) VA.toast(`Every section of Lecture ${id} read!`, 'party-popper');
      readIO.unobserve(e.target);
    }, 1500);
  }), { threshold: .9 });
  $$('.lsec .takeaway').forEach(t => readIO.observe(t));
  const actIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    $$('.toc a').forEach(a => a.classList.toggle('active', a.dataset.sec === e.target.dataset.sec));
    const a = $(`.toc a[data-sec="${e.target.dataset.sec}"]`);
    if (a && innerWidth <= 960) { const ol = a.closest('ol'); ol.scrollTo({ left: a.offsetLeft - ol.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' }); }
  }), { rootMargin: '-35% 0px -60% 0px' });
  $$('.lsec').forEach(s => actIO.observe(s));

  if (VA.motion) {
    gsap.to('.lec-photo img', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.lec-photo', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.big-num', { yPercent: 30, opacity: 0, duration: 1.4, ease: 'expo.out' });
  }
})();
