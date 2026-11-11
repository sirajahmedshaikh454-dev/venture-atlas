/* Revision center: progress, glossary, must-know lists, comparisons, quick practice. */
(function () {
  const VA = window.VA, $ = VA.$, $$ = VA.$$;

  /* progress */
  const paint = () => {
    const s = VA.store.get(), known = Object.values(s.known).filter(Boolean).length;
    $('#revProgress').innerHTML = `
      <div class="panel"><span class="kicker">Overall progress</span><div class="score-big" style="font-size:5.5rem;margin-top:10px">${VA.store.overall()}%</div><p class="muted" style="margin:0">Reading 50% · quiz mastery 25% · flashcards 25%</p></div>
      <div class="panel">${VA.lectures.map(l => { const p = VA.store.lecturePct(l.id); return `<div data-l="${l.id}" style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-weight:600"><a href="${l.slug}" style="text-decoration:none">${l.code} · ${l.short}</a><span class="mono">${p}%${s.done[l.id] ? ' ✓' : ''}</span></div><div class="bar" style="margin-top:6px"><i style="width:${p}%"></i></div></div>`; }).join('')}
        <div style="display:flex;justify-content:space-between;font-weight:600;margin-top:4px"><span>Flashcards known</span><span class="mono">${known}/${VA.flashcards.length}</span></div></div>`;
  };
  paint(); document.addEventListener('va:progress', paint);

  /* glossary */
  let gl = 'all';
  $('#glFilter').innerHTML = [['all', 'All'], ['7', 'L07', 7], ['8', 'L08', 8], ['9', 'L09', 9]].map(([v, t, l]) => `<button class="chip" data-v="${v}" aria-pressed="${v === gl}" ${l ? `data-l="${l}"` : ''}>${l ? '<span class="dot"></span>' : ''}${t}</button>`).join('');
  const drawGl = () => {
    const q = $('#glSearch').value.trim().toLowerCase();
    const items = VA.glossary.filter(([l, t, d]) => (gl === 'all' || l === +gl) && (!q || (t + ' ' + d).toLowerCase().includes(q)));
    $('#gloss').innerHTML = items.length ? items.map(([l, t, d]) => `<dl class="gl" data-l="${l}"><dt><span class="lt">L0${l}</span><br>${t}</dt><dd>${d}</dd></dl>`).join('') : '<p class="muted">No terms match.</p>';
    $('#glCount').textContent = `${items.length} terms`;
  };
  $$('#glFilter .chip').forEach(c => c.addEventListener('click', () => { gl = c.dataset.v; $$('#glFilter .chip').forEach(x => x.setAttribute('aria-pressed', x === c)); drawGl(); }));
  $('#glSearch').addEventListener('input', drawGl);
  drawGl();

  /* must-know lists (frequently tested enumerations) */
  const LISTS = [
    [7, 'Motivations to go global', ['Profits', 'Competitive pressures', 'Unique product/service', 'Excess production capacity', 'Declining home sales', 'Unique market opportunity', 'Economies of scale', 'Technological advantage', 'Tax benefits']],
    [7, 'Opportunity assessment plan sections', ['Idea, competition & USPs', 'Market: size, trends, characteristics, growth', 'Entrepreneur & team skills/experience', 'Launch time line']],
    [7, 'Types of political risk', ['Operating risk', 'Transfer risk', 'Ownership risk', 'Conflict & changes in country solvency']],
    [7, 'Five-step market selection', ['Develop indicators', 'Collect data & convert to comparable indicators', 'Weight each indicator', 'Analyze the data', 'Select from the market rankings']],
    [7, 'Types of merger', ['Horizontal', 'Vertical', 'Product-extension', 'Market-extension', 'Diversified activity (conglomerate)']],
    [7, 'Why trade barriers are imposed', ['Protect domestic jobs', 'Improve a trade deficit', 'Protect infant industries', 'Protection from dumping', 'Earn more revenue']],
    [8, 'Types of intellectual property', ['Patents', 'Trademarks', 'Copyrights', 'Trade secrets']],
    [8, 'Patent application parts', ['Introduction', 'Description of invention', 'Claims', 'Signed declaration']],
    [8, 'Trademark filing requirements', ['Completed written form', 'Drawing of the mark', 'Five specimens of actual use', 'The fee']],
    [8, 'Contract conditions (Table 6.5)', ['Offer', 'Voluntary acceptance', 'Consideration', 'Competent parties', 'Legal purpose', '$500+ sales in writing']],
    [8, 'Types of insurance (Table 6.4)', ['Property', 'Casualty', 'Life', 'Workers’ compensation', 'Bonding']],
    [8, 'Four essential contract items', ['Understand the terms', 'Cross out what you disagree with', 'No blank spaces when signing', 'Keep a copy']],
    [9, 'Three basic questions', ['Where have we been?', 'Where do we want to go?', 'How do we get there?']],
    [9, 'Marketing research steps', ['Define purpose/objectives', 'Secondary data', 'Primary data', 'Analyze & interpret']],
    [9, 'Characteristics of a marketing plan', ['Provide a strategy', 'Based on facts/assumptions', 'Organization for implementation', 'Short- & long-term continuity', 'Simple and short', 'Flexible', 'Criteria for control']],
    [9, 'Seven key steps to write a plan', ['Define mission', 'Audit position (SWOT)', 'Research market', 'SMART goals', 'Formulate strategies', 'Budget & calendar', 'Monitor & adjust']],
    [9, 'Weaknesses in market planning', ['Poor analysis', 'Unrealistic goals', 'Poor implementation', 'Unforeseen hazards']]
  ];
  $('#must').innerHTML = LISTS.map(([l, t, items]) => `<div class="must-item" data-l="${l}"><span class="num">${items.length}</span><span class="lt mono" style="font-size:.66rem;color:var(--acc);letter-spacing:.1em">L0${l}</span><b>${t}</b><ol>${items.map(i => `<li>${i}</li>`).join('')}</ol></div>`).join('');

  /* comparisons */
  const CMP = [
    [8, 'Patent vs trademark vs copyright vs trade secret', ['', 'Protects', 'Term', 'Where / how'], [
      ['Patent', 'Inventions: processes, machines, designs, plants', 'Utility 20 yrs · Design 14 yrs', 'Patent and Trademark Office'],
      ['Trademark', 'Distinguishing word, name or symbol', 'Indefinite', 'Filed with PTO; Official Gazette; ~13 months'],
      ['Copyright', 'Original works of authorship', 'Life of author + 70 yrs', 'Library of Congress'],
      ['Trade secret', 'Confidential information / processes', 'As long as it stays secret', 'Confidentiality agreements; action only after disclosure']]],
    [7, 'The five merger types', ['', 'Relationship', 'Goal', 'Example'], [
      ['Horizontal', 'Direct competitors, same market', 'Market share, scale', 'Marriott + Starwood'],
      ['Vertical', 'Different supply-chain stages', 'Streamline, cut costs', 'Automaker + parts supplier'],
      ['Product-extension', 'Same customers, related products', 'Wider product line', 'Phone maker + smartwatch firm'],
      ['Market-extension', 'Same products, new geography', 'Geographic reach', 'US bank + Canadian bank'],
      ['Conglomerate', 'Unrelated industries', 'Diversify risk', 'Media firm + railway']]],
    [7, 'Indirect vs direct exporting', ['', 'How', 'Who handles it'], [
      ['Indirect', 'Foreign purchaser in local market or export management firm', 'An intermediary'],
      ['Direct', 'Independent distributors or own overseas sales office', 'The venture itself']]],
    [9, 'Primary vs secondary data', ['', 'What', 'Examples'], [
      ['Secondary', 'Information that already exists', 'Trade magazines, newspapers, libraries, government agencies, Internet, commercial data'],
      ['Primary', 'New information you collect', 'Observation, networking, interviewing, focus groups, experimentation (questionnaire)']]],
    [9, 'Survey methods (Table 8.3)', ['', 'Cost', 'Flexibility', 'Response', 'Speed', 'Depth'], [
      ['Telephone', 'Can be low', 'Some', 'Good (≈80%)', 'Fastest', 'Least detailed'],
      ['Mail', 'Can be low', 'None', 'Poorest', 'Slowest', 'Some'],
      ['Personal', 'Highest', 'Most', 'Most effective', 'Somewhat slow', 'Most detailed'],
      ['Internet', 'Low', 'None', 'Good w/ incentives', 'Very fast', 'Some']]],
    [9, 'Consumer vs B2B markets', ['', 'Buyer', 'Volume', 'Channels & promotion'], [
      ['Consumer', 'Households, personal consumption', 'Smaller', 'Mass media, retail'],
      ['B2B', 'Other businesses', 'Large volume per transaction', 'More direct; trade magazines, direct sales, trade shows']]],
    [9, 'Intensive vs selective vs exclusive distribution', ['', 'Channel members'], [
      ['Intensive', 'As many retailers/wholesalers as possible'], ['Selective', 'A small number chosen by criteria'], ['Exclusive', 'Only one wholesaler and/or retailer']]]
  ];
  $('#compare').innerHTML = CMP.map(([l, t, head, rows], i) => `<details class="cmp" data-l="${l}" ${i === 0 ? 'open' : ''}><summary><span><span class="mono" style="font-size:.7rem;color:var(--acc)">L0${l}</span>&nbsp; ${t}</span></summary><div class="tbl-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`).join('');

  /* quick practice: 5 random questions, reveal on click */
  const practice = () => {
    $('#practice').innerHTML = VA.shuffle(VA.questions).slice(0, 5).map(q => `<details class="cmp" data-l="${q.l}"><summary><span><span class="mono" style="font-size:.7rem;color:var(--acc)">L0${q.l}</span>&nbsp; ${VA.esc(q.q)}</span></summary><div style="padding:0 22px 18px"><p style="margin:0 0 6px"><b style="color:var(--good)">${VA.esc(q.o[q.a])}</b></p><p class="muted" style="margin:0;font-size:.92rem">${VA.esc(q.e)}</p></div></details>`).join('');
  };
  $('#morePractice').addEventListener('click', practice);
  $('#printBtn').addEventListener('click', () => print());
  practice();
})();
