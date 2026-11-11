/* Shared shell: progress store, nav/footer, search, motion (Lenis + GSAP), cursor, transitions. */
(function () {
  const VA = window.VA = window.VA || {};
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HAS_GSAP = !!window.gsap;
  VA.RM = RM;
  VA.motion = HAS_GSAP && !RM;
  if (VA.motion) document.documentElement.classList.add('js-motion');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  VA.$ = $; VA.$$ = $$;
  VA.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  VA.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  VA.lec = id => VA.lectures.find(l => l.id === +id);

  /* ---------------- progress store (localStorage) ---------------- */
  const KEY = 'venture-atlas.v1';
  const blank = () => ({ read: {}, done: {}, quiz: {}, history: [], known: {}, lab: {} });
  let mem = null; // fallback when storage is blocked
  const load = () => {
    try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch (e) { return mem || (mem = blank()); }
  };
  const save = s => { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* private mode: keep in memory */ } document.dispatchEvent(new CustomEvent('va:progress')); };
  VA.store = {
    get: load,
    markRead(l, sec) { const s = load(); s.read[l] = s.read[l] || []; if (!s.read[l].includes(sec)) { s.read[l].push(sec); save(s); return true; } return false; },
    setDone(l, v) { const s = load(); s.done[l] = v; if (v) s.read[l] = VA.lec(l).sections.map(x => x.id); save(s); },
    lecturePct(l) { const s = load(); const n = VA.lec(l).sections.length; return Math.round(100 * Math.min(n, (s.read[l] || []).length) / n); },
    quiz(topic, score, total) {
      const s = load(); const pct = Math.round(100 * score / total);
      s.quiz[topic] = Math.max(s.quiz[topic] || 0, pct);
      s.history.unshift({ topic, score, total, at: Date.now() }); s.history = s.history.slice(0, 12); save(s);
    },
    setKnown(i, v) { const s = load(); if (v === null) delete s.known[i]; else s.known[i] = v; save(s); },
    lab(k, v) { const s = load(); s.lab[k] = v; save(s); },
    reset() { save(blank()); },
    overall() {
      const s = load();
      const secs = VA.lectures.reduce((a, l) => a + l.sections.length, 0);
      const read = VA.lectures.reduce((a, l) => a + Math.min(l.sections.length, (s.read[l.id] || []).length), 0);
      const quiz = [7, 8, 9].reduce((a, t) => a + (s.quiz[t] || 0), 0) / 300;
      const cards = VA.flashcards ? Object.values(s.known).filter(Boolean).length / VA.flashcards.length : 0;
      return Math.round(100 * (0.5 * read / secs + 0.25 * quiz + 0.25 * cards));
    }
  };

  /* ---------------- shell markup ---------------- */
  const page = document.body.dataset.page;
  const LINKS = [
    ['index.html', 'Hub', 'home'], ['index.html#lectures', 'Lectures', 'lecture'], ['lab.html', 'Lab', 'lab'],
    ['quiz.html', 'Quiz', 'quiz'], ['flashcards.html', 'Flashcards', 'flashcards'], ['cases.html', 'Cases', 'cases'],
    ['stats.html', 'Visuals', 'stats'], ['revision.html', 'Revision', 'revision']
  ];
  const LOGO = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="16" cy="16" rx="6" ry="14.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 16h29" stroke="currentColor" stroke-width="1.2"/><path d="M16 4l3 12-3 12-3-12z" fill="#F2B227"/></svg>';
  const nav = document.createElement('header');
  nav.className = 'nav' + (document.body.dataset.dark ? ' on-dark' : '');
  nav.innerHTML = `<div class="wrap">
    <a class="brand magnetic" href="index.html" aria-label="Venture Atlas home">${LOGO}<span>Venture Atlas</span></a>
    <ul class="nav-links" id="navlinks">${LINKS.map(([h, t, p]) => `<li><a href="${h}"${p === page ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}</ul>
    <button class="icon-btn magnetic" id="openSearch" aria-label="Search (Ctrl+K)"><i data-lucide="search"></i></button>
    <a class="ring magnetic" href="revision.html#progress" aria-label="Overall progress" title="Overall learning progress">
      <svg viewBox="0 0 44 44"><circle class="bg" cx="22" cy="22" r="19"/><circle class="fg" cx="22" cy="22" r="19" stroke-dasharray="119.4" stroke-dashoffset="119.4"/></svg><span id="ringPct">0%</span></a>
    <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="navlinks"><i data-lucide="menu"></i></button>
  </div>`;
  document.body.prepend(nav);
  const skip = document.createElement('a'); skip.className = 'skip'; skip.href = '#main'; skip.textContent = 'Skip to content';
  document.body.prepend(skip);

  const foot = document.createElement('footer');
  foot.className = 'footer';
  foot.innerHTML = `<div class="wrap">
    <div class="big">Study the map.<br><em>Build the venture.</em></div>
    <div class="f-grid">
      <div><h4>Venture Atlas</h4><p>An interactive study companion for Technology Entrepreneurship — Lectures 7, 8 and 9. Progress is saved in this browser only.</p>
        <button class="btn ghost sm" id="resetProgress"><i data-lucide="rotate-ccw"></i>Reset my progress</button></div>
      <div><h4>Lectures</h4><ul>${VA.lectures.map(l => `<li><a href="${l.slug}">${l.code} · ${l.short}</a></li>`).join('')}</ul></div>
      <div><h4>Practice</h4><ul>${LINKS.slice(2).map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    </div>
    <div class="f-bottom"><span>Content source: course lecture slides. Real-world cases cite public reporting.</span><span>Photos: Unsplash · 3D: Three.js</span></div>
  </div>`;
  document.body.append(foot);

  const toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.append(toast);
  let toastT;
  VA.toast = (msg, icon = 'sparkles') => {
    toast.innerHTML = `<i data-lucide="${icon}"></i><span>${VA.esc(msg)}</span>`; VA.icons();
    toast.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('show'), 2600);
  };
  VA.icons = () => { if (window.lucide) lucide.createIcons(); };

  $('#menuBtn').addEventListener('click', e => {
    const open = $('#navlinks').classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open);
  });
  $('#resetProgress').addEventListener('click', () => {
    if (confirm('Reset all saved progress (lectures read, quiz scores, flashcards)?')) { VA.store.reset(); VA.toast('Progress reset', 'rotate-ccw'); }
  });

  const updateRing = () => {
    const p = VA.store.overall();
    $('#ringPct').textContent = p + '%';
    $('.ring .fg').style.strokeDashoffset = 119.4 * (1 - p / 100);
  };
  document.addEventListener('va:progress', updateRing);

  /* nav background + hide on scroll down */
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hide', y > 400 && y > lastY && !$('#navlinks').classList.contains('open'));
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- search ---------------- */
  const modal = document.createElement('div');
  modal.className = 'modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'Search');
  modal.innerHTML = `<div class="modal-box"><div class="search-in"><i data-lucide="search"></i><input id="q" type="search" placeholder="Search concepts, definitions, cases…" autocomplete="off" aria-label="Search"><kbd>Esc</kbd></div><ul class="results" id="results"></ul></div>`;
  document.body.append(modal);
  let index = null, sel = 0, lastFocus = null;
  const buildIndex = () => {
    const ix = [];
    VA.lectures.forEach(l => l.sections.forEach(s => ix.push({ tag: l.code, t: s.title, s: s.takeaway, h: `${l.slug}#${s.id}`, l: l.id })));
    (VA.glossary || []).forEach(([l, t, d]) => { const lec = VA.lec(l); ix.push({ tag: 'Definition · ' + lec.code, t, s: d, h: `revision.html#glossary`, l }); });
    (VA.cases || []).forEach(c => ix.push({ tag: 'Case', t: c.title, s: c.setup, h: `cases.html#${c.id}`, l: c.l }));
    [['lab.html#market', 'Market Selector', 'Weighted five-step foreign market selection'], ['lab.html#sorter', 'Scenario Sorter', 'Classify mergers, IP, SWOT, entry modes'], ['lab.html#smart', 'SMART Goal Checker', 'Test your marketing objectives'], ['lab.html#contract', 'Contract Validity Checker', 'Six conditions of a valid contract'],
     ['quiz.html', 'Quiz arena', 'MCQs by lecture and difficulty'], ['flashcards.html', 'Flashcards', 'Flip-card decks'], ['revision.html', 'Revision center', 'Definitions, comparisons, lists'], ['stats.html', 'Visual learning', 'Charts and data']]
      .forEach(([h, t, s]) => ix.push({ tag: 'Tool', t, s, h }));
    return ix;
  };
  const hl = (txt, q) => { const e = VA.esc(txt); if (!q) return e; const i = e.toLowerCase().indexOf(q.toLowerCase()); return i < 0 ? e : e.slice(0, i) + '<mark>' + e.slice(i, i + q.length) + '</mark>' + e.slice(i + q.length); };
  const render = () => {
    const q = $('#q').value.trim(); const ql = q.toLowerCase();
    const terms = ql.split(/\s+/).filter(Boolean);
    let hits = index.filter(x => { const hay = (x.t + ' ' + x.s + ' ' + x.tag).toLowerCase(); return terms.every(w => hay.includes(w)); });
    hits.sort((a, b) => (b.t.toLowerCase().includes(ql)) - (a.t.toLowerCase().includes(ql)));
    hits = hits.slice(0, q ? 30 : 8); sel = 0;
    $('#results').innerHTML = hits.length ? hits.map((x, i) => `<li><a href="${x.h}" class="${i ? '' : 'active'}" ${x.l ? `data-l="${x.l}"` : ''}><span class="r-tag">${VA.esc(x.tag)}</span><span class="r-t">${hl(x.t, q)}</span><span class="r-s">${hl(x.s, q)}</span></a></li>`).join('')
      : `<li class="empty">No matches for “${VA.esc(q)}”. Try “patent”, “merger” or “SWOT”.</li>`;
  };
  VA.openSearch = () => {
    index = index || buildIndex(); lastFocus = document.activeElement;
    modal.classList.add('open'); VA.icons(); $('#q').value = ''; render(); setTimeout(() => $('#q').focus(), 20);
    VA.lenis && VA.lenis.stop();
  };
  const closeSearch = () => { modal.classList.remove('open'); VA.lenis && VA.lenis.start(); lastFocus && lastFocus.focus(); };
  $('#openSearch').addEventListener('click', VA.openSearch);
  modal.addEventListener('click', e => { if (e.target === modal) closeSearch(); });
  modal.addEventListener('click', e => { if (e.target.closest('.results a')) closeSearch(); });
  $('#q').addEventListener('input', render);
  modal.addEventListener('keydown', e => {
    const items = $$('#results a');
    if (e.key === 'Escape') closeSearch();
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); if (!items.length) return;
      items[sel].classList.remove('active'); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[sel].classList.add('active'); items[sel].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && document.activeElement.id === 'q' && items[sel]) { e.preventDefault(); items[sel].click(); }
    else if (e.key === 'Tab') { e.preventDefault(); $('#q').focus(); }
  });
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); modal.classList.contains('open') ? closeSearch() : VA.openSearch(); }
    else if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName) && !modal.classList.contains('open')) { e.preventDefault(); VA.openSearch(); }
  });

  /* ---------------- motion helpers ---------------- */
  VA.split = el => {
    if (el.dataset.splitDone) return; el.dataset.splitDone = 1;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w => {
          if (!w) return;
          if (/^\s+$/.test(w)) frag.append(document.createTextNode(w));
          else { const o = document.createElement('span'); o.className = 'word'; const i = document.createElement('span'); i.textContent = w; o.append(i); frag.append(o); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el);
  };
  VA.reveal = (root = document) => {
    if (!VA.motion) return;
    $$('[data-split]', root).forEach(el => {
      VA.split(el);
      gsap.from($$('.word > span', el), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .045, delay: +el.dataset.delay || 0,
        scrollTrigger: el.dataset.split === 'now' ? undefined : { trigger: el, start: 'top 88%' } });
    });
    const els = $$('[data-reveal]', root).filter(e => !e.dataset.revealed);
    els.forEach(e => e.dataset.revealed = 1);
    if (els.length && window.ScrollTrigger) ScrollTrigger.batch(els, { start: 'top 90%', once: true,
      onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: .9, ease: 'expo.out', stagger: .08, overwrite: true }) });
    $$('[data-count]', root).forEach(el => {
      const end = parseFloat(el.dataset.count); const o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' }, onUpdate: () => el.textContent = Math.round(o.v) + (el.dataset.suffix || '') });
    });
  };
  VA.magnet = (root = document) => {
    if (!VA.motion || matchMedia('(pointer: coarse)').matches) return;
    $$('.magnetic', root).forEach(el => {
      if (el.dataset.mag) return; el.dataset.mag = 1;
      const xTo = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' }), yTo = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
      el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .3); yTo((e.clientY - r.top - r.height / 2) * .3); });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  };

  /* smooth scroll */
  if (VA.motion && window.Lenis) {
    VA.lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    if (window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); VA.lenis.on('scroll', ScrollTrigger.update); }
    gsap.ticker.add(t => VA.lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  } else if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  VA.scrollTo = (target, immediate) => {
    const el = typeof target === 'string' ? document.getElementById(decodeURIComponent(target.replace('#', ''))) : target;
    if (!el) return;
    if (immediate) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 80);
    else if (VA.lenis) VA.lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    else el.scrollIntoView({ behavior: RM || immediate ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2 || a.classList.contains('skip')) return;
    const el = document.getElementById(a.getAttribute('href').slice(1));
    if (el) { e.preventDefault(); VA.scrollTo(el); history.replaceState(null, '', a.getAttribute('href')); }
  });

  /* custom cursor */
  if (VA.motion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const c = document.createElement('div'); c.className = 'cursor'; c.setAttribute('aria-hidden', 'true'); document.body.append(c);
    const xTo = gsap.quickTo(c, 'x', { duration: .18, ease: 'power3' }), yTo = gsap.quickTo(c, 'y', { duration: .18, ease: 'power3' });
    addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); });
    document.addEventListener('mouseover', e => c.classList.toggle('big', !!e.target.closest('a, button, [role=button], label, input, .fc, summary')));
  }

  /* page transitions: curtain covers on leave, lifts on arrive */
  const curtain = document.createElement('div'); curtain.className = 'curtain'; curtain.setAttribute('aria-hidden', 'true');
  curtain.innerHTML = '<div class="c-label"></div>'; document.body.append(curtain);
  const internal = a => a && a.href && a.origin === location.origin && !a.target && !a.hasAttribute('download') && /\.html/.test(a.pathname) &&
    !(a.pathname === location.pathname && a.hash);
  if (VA.motion) {
    gsap.set(curtain, { yPercent: 100 });
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!internal(a) || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
      e.preventDefault();
      curtain.querySelector('.c-label').textContent = (a.textContent || '').trim().slice(0, 40);
      try { sessionStorage.setItem('va-curtain', '1'); } catch (_) {}
      setTimeout(() => location.href = a.href, 900); // fallback if rAF is throttled (background tab)
      gsap.timeline({ onComplete: () => location.href = a.href })
        .set(curtain, { yPercent: 100 }).to(curtain, { yPercent: 0, duration: .55, ease: 'expo.inOut' })
        .to('.c-label', { opacity: 1, duration: .2 }, '-=.2');
    });
    let came = false; try { came = sessionStorage.getItem('va-curtain'); sessionStorage.removeItem('va-curtain'); } catch (_) {}
    if (came) gsap.fromTo(curtain, { yPercent: 0 }, { yPercent: -100, duration: .8, ease: 'expo.inOut', delay: .05, onComplete: () => gsap.set(curtain, { yPercent: 100 }) });
    addEventListener('pageshow', e => { if (e.persisted) gsap.set(curtain, { yPercent: 100 }); });
  }

  /* boot */
  VA.ready = fn => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn());
  VA.ready(() => {
    VA.icons(); updateRing(); onScroll();
    if (document.body.id !== 'manual-reveal') { VA.reveal(); VA.magnet(); }
    if (location.hash) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      const go = () => { VA.scrollTo(location.hash, true); window.ScrollTrigger && ScrollTrigger.refresh(); };
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(go, 60));
      addEventListener('load', go, { once: true });
    }
  });
})();
