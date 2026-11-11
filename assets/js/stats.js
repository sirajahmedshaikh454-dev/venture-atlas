/* Visual learning: charts built with Chart.js (lazy-created when scrolled into view). */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const INK = css('--ink'), INK2 = css('--ink-2'), LINE = 'rgba(20,18,15,.10)', L7 = css('--l7'), L8 = css('--l8'), L9 = css('--l9-bright'), GOOD = css('--good');

  const lazy = (el, fn) => {
    if (!window.Chart) { el.closest('.chart-box').innerHTML = '<p class="muted">Charts need an internet connection to load the chart library.</p>'; return; }
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { fn(); o.disconnect(); } }, { threshold: .25 }).observe(el);
  };
  if (window.Chart) {
    Chart.defaults.font.family = "'Bricolage Grotesque', system-ui, sans-serif";
    Chart.defaults.color = INK2;
    Chart.defaults.plugins.tooltip.backgroundColor = INK;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 10;
    if (VA.RM) Chart.defaults.animation = false;
  }

  /* 1. why start-ups fail */
  const fr = VA.charts.failReasons;
  $('#srcFail').textContent = 'Source: ' + fr.src;
  lazy($('#cFail'), () => new Chart($('#cFail'), {
    type: 'bar',
    data: { labels: fr.labels, datasets: [{ data: fr.values, backgroundColor: fr.values.map((_, i) => i ? 'rgba(20,18,15,.18)' : L8), hoverBackgroundColor: L7, borderRadius: 6, barThickness: 22 }] },
    options: { indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw}% of failed start-ups cited this` } } },
      scales: { x: { max: 50, grid: { color: LINE }, ticks: { callback: v => v + '%' } }, y: { grid: { display: false }, ticks: { color: INK, font: { weight: 600 } } } } }
  }));

  /* 2. survival curve */
  const sv = VA.charts.survival;
  $('#srcSurv').textContent = 'Source: ' + sv.src;
  lazy($('#cSurv'), () => new Chart($('#cSurv'), {
    type: 'line',
    data: { labels: sv.labels, datasets: [{ data: sv.values, borderColor: L7, backgroundColor: 'rgba(35,55,230,.12)', fill: true, tension: .35, pointRadius: 6, pointBackgroundColor: L7, pointHoverRadius: 9 }] },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ~${c.raw}% of businesses still operating` } } },
      scales: { y: { min: 0, max: 100, grid: { color: LINE }, ticks: { callback: v => v + '%' } }, x: { grid: { display: false } } } }
  }));

  /* 3. survey methods radar — scores derived from Table 8.3 wording */
  const SURVEY = { labels: ['Low cost', 'Flexibility', 'Response rate', 'Speed', 'Depth'],
    sets: [['Telephone', [3, 3, 3, 4, 1], L7], ['Mail', [3, 1, 1, 1, 2], L8], ['Personal', [1, 4, 4, 2, 4], L9], ['Internet', [4, 1, 3, 3, 2], GOOD]] };
  let radar;
  lazy($('#cSurvey'), () => {
    radar = new Chart($('#cSurvey'), {
      type: 'radar',
      data: { labels: SURVEY.labels, datasets: SURVEY.sets.map(([n, d, c]) => ({ label: n, data: d, borderColor: c, backgroundColor: c + '22', pointBackgroundColor: c, borderWidth: 2.5 })) },
      options: { maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 18 } } }, scales: { r: { min: 0, max: 4, ticks: { display: false, stepSize: 1 }, grid: { color: LINE }, angleLines: { color: LINE }, pointLabels: { color: INK, font: { size: 13, weight: 600 } } } } }
    });
  });
  $$('#surveyPick .chip').forEach(c => c.addEventListener('click', () => {
    const v = c.dataset.v;
    $$('#surveyPick .chip').forEach(x => x.setAttribute('aria-pressed', x === c));
    if (radar) { radar.data.datasets.forEach(d => d.hidden = v !== 'all' && d.label !== v); radar.update(); }
    const notes = { all: 'Compare the shapes: no single method wins everywhere — that is the point of Table 8.3.', Telephone: 'Telephone: fastest method, good response rate (possibly 80%), but the least detailed because of the 8–10 minute limit.', Mail: 'Mail: can be inexpensive, but the slowest method with the poorest response rate and no flexibility.', Personal: 'Personal: most expensive, but the most flexible, most effective response rate and most detailed (open-ended questions).', Internet: 'Internet: inexpensive and very fast; good response with incentives; no flexibility since it is self-administered.' };
    $('#surveyNote').textContent = notes[v];
  }));

  /* 4. entry strategies bubble (conceptual) */
  const ENTRY = [['Indirect exporting', 1, 1, L7], ['Direct exporting', 2.2, 2.4, L7], ['Licensing', 2, 3.6, L9], ['Franchising', 3.2, 4.2, L9], ['Turn-key / mgmt contract', 3.6, 3.2, L9], ['Joint venture', 6, 6, L8], ['Majority interest / merger', 8.6, 8.4, L8]];
  lazy($('#cEntry'), () => new Chart($('#cEntry'), {
    type: 'bubble',
    data: { datasets: ENTRY.map(([n, x, y, c]) => ({ label: n, data: [{ x, y, r: 9 + x * 1.6 }], backgroundColor: c + 'cc', borderColor: INK, borderWidth: 1 })) },
    options: { maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 14 } }, tooltip: { callbacks: { label: c => ' ' + c.dataset.label } } },
      scales: { x: { min: 0, max: 10, title: { display: true, text: 'Resource commitment & risk →', color: INK }, grid: { color: LINE }, ticks: { display: false } }, y: { min: 0, max: 10, title: { display: true, text: 'Control over operations →', color: INK }, grid: { color: LINE }, ticks: { display: false } } } }
  }));

  /* 5. IP protection lengths (HTML bars) */
  const IP = [['Utility patent', 20, '20 years', L7], ['Design patent', 14, '14 years (lecture)', L7], ['Copyright', 40, 'Life of author + 70 years', L8], ['Trademark', 0, 'Indefinite — while in use', null], ['Trade secret', 0, 'As long as it stays secret', null]];
  $('#ipBars').innerHTML = IP.map(([n, y, t, c]) => `<div class="ip-row"><span class="lbl">${n}</span><div class="ip-track"><i ${c ? `style="background:${c}" data-w="${y / 40 * 100}"` : 'class="inf" data-w="100"'}>${t}</i></div></div>`).join('');
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { $$('#ipBars i').forEach(i => i.style.width = i.dataset.w + '%'); o.disconnect(); } }, { threshold: .3 }).observe($('#ipBars'));
})();
