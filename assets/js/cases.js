/* Case files: decide, then reveal what really happened. Plus fun facts. */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;
  let filter = 'all';
  const solved = () => VA.store.get().lab.cases || [];

  $('#caseFilter').innerHTML = [['all', 'All cases'], ['7', 'Lecture 7', 7], ['8', 'Lecture 8', 8], ['9', 'Lecture 9', 9]]
    .map(([v, t, l]) => `<button class="chip" data-v="${v}" aria-pressed="${v === filter}" ${l ? `data-l="${l}"` : ''}>${l ? '<span class="dot"></span>' : ''}${t}</button>`).join('');
  $$('#caseFilter .chip').forEach(c => c.addEventListener('click', () => { filter = c.dataset.v; $$('#caseFilter .chip').forEach(x => x.setAttribute('aria-pressed', x === c)); draw(); }));

  const draw = () => {
    const done = solved();
    const list = VA.cases.filter(c => filter === 'all' || c.l === +filter);
    $('#caseGrid').innerHTML = list.map(c => { const L = VA.lec(c.l); return `
      <article class="case" id="${c.id}" data-l="${c.l}" data-reveal>
        <div class="case-top"><span class="tag">${c.tag}</span><span>${c.year} · ${L.code}</span></div>
        <h3>${c.title}</h3>
        <p>${c.setup}</p>
        <p class="cq">${c.question}</p>
        <div class="copts">${c.options.map((o, i) => `<button class="copt" data-i="${i}">${VA.esc(o)}</button>`).join('')}</div>
        <div class="reveal" aria-live="polite"><p>${c.outcome}</p><b>Lesson</b><p>${c.lesson} <a href="${L.slug}#${c.s}">Open ${L.code} →</a></p></div>
        ${done.includes(c.id) ? '<span class="mono" style="font-size:.72rem;color:var(--good)">✓ You have cracked this case</span>' : ''}
      </article>`; }).join('');
    $$('.case').forEach(card => {
      const c = VA.cases.find(x => x.id === card.id);
      $$('.copt', card).forEach(b => b.addEventListener('click', () => {
        const i = +b.dataset.i;
        $$('.copt', card).forEach(x => { x.disabled = true; if (+x.dataset.i === c.answer) x.classList.add('correct'); });
        if (i !== c.answer) b.classList.add('wrong');
        $('.reveal', card).classList.add('show');
        if (VA.motion) gsap.from($('.reveal', card), { y: 12, opacity: 0, duration: .5, ease: 'expo.out' });
        if (i === c.answer && !solved().includes(c.id)) { VA.store.lab('cases', [...solved(), c.id]); VA.toast('Case cracked!', 'briefcase'); }
        $('#caseCount').textContent = `${solved().length} / ${VA.cases.length}`;
      }));
    });
    VA.reveal($('#caseGrid'));
  };
  $('#caseCount').textContent = `${solved().length} / ${VA.cases.length}`;
  draw();

  $('#facts').innerHTML = VA.facts.map(f => `<div class="fact" data-l="${f.l}" data-reveal><div class="fn">${f.n}</div><p>${f.t}</p><small>${f.src} · Lecture ${f.l}</small></div>`).join('');
})();
