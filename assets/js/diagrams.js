/* Custom SVG / HTML diagrams for lecture concepts.
   VA.diagram(name) -> HTML string. Any element with class "hit" + data-t/data-d
   becomes an explorable node: click / Enter shows its detail in the figure's .dia-info. */
(function () {
  const VA = window.VA;
  const e = VA.esc;
  const hit = (t, d, inner, extra = '') => `<g class="hit" tabindex="0" role="button" aria-label="${e(t)}" data-t="${e(t)}" data-d="${e(d)}" ${extra}>${inner}</g>`;
  const fig = (body, cap, info = 'Tap any element to explore it.') => `<figure class="dia">${body}<div class="dia-info" aria-live="polite">${info}</div>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  const plain = (body, cap) => `<figure class="dia">${body}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  const tiles = (items, cols = 3) => `<div class="dia-grid" style="grid-template-columns:repeat(auto-fill,minmax(${cols === 2 ? 260 : cols === 4 ? 170 : 210}px,1fr))">${items.map((x, i) => `<div class="tile" data-reveal><span class="tn">${String(i + 1).padStart(2, '0')}</span><b>${x[0]}</b><span class="tx">${x[1] || ''}</span></div>`).join('')}</div>`;
  const wrapText = (s, n) => { const w = s.split(' '), out = ['']; w.forEach(x => { if ((out[out.length - 1] + ' ' + x).trim().length > n) out.push(x); else out[out.length - 1] = (out[out.length - 1] + ' ' + x).trim(); }); return out; };
  const tspans = (s, x, y, n, lh = 16) => { const l = wrapText(s, n); return l.map((t, i) => `<tspan x="${x}" y="${y + (i - (l.length - 1) / 2) * lh}">${e(t)}</tspan>`).join(''); };

  const D = {
    motivations: () => {
      const m = [['Profits', 'coins'], ['Competitive pressures', 'swords'], ['Unique product or service', 'gem'], ['Excess production capacity', 'factory'], ['Declining home country sales', 'trending-down'], ['Unique market opportunity', 'sparkles'], ['Economies of scale', 'layers'], ['Technological advantage', 'cpu'], ['Tax benefits', 'receipt']];
      return plain(`<div class="dia-grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr))">${m.map((x, i) => `<div class="tile" data-reveal><span class="tn">${String(i + 1).padStart(2, '0')}</span><i data-lucide="${x[1]}" style="width:22px;height:22px;color:var(--acc);display:block;margin:8px 0"></i><b>${x[0]}</b></div>`).join('')}</div>`, 'Nine motivations to go global — Lecture 7');
    },
    oap: () => plain(tiles([
      ['The idea & competition', 'Develops the idea, analyzes competitive products and companies, and identifies the unique selling propositions (USPs).'],
      ['The market', 'Its size, trends, characteristics and growth rate.'],
      ['Entrepreneur & team', 'The entrepreneur’s and management team’s skills and experience.'],
      ['Time line', 'Steps to successfully launch the venture.']], 4), 'Opportunity assessment plan — four sections'),
    risks: () => fig(`<svg viewBox="0 0 640 220" role="img" aria-label="Four types of political risk">
      ${[['Operating risk', 'Political conditions disrupt day-to-day operations in the country.'], ['Transfer risk', 'Restrictions on moving money, profits or capital out of the country.'], ['Ownership risk', 'The government may take control of or restrict ownership of foreign assets.'], ['Conflict & solvency changes', 'Conflict and changes in the solvency of the country itself.']]
        .map((r, i) => hit(r[0], r[1] + ' (Study-aid explanation — the lecture names the risk type.)', `<rect x="${i * 160 + 6}" y="40" width="148" height="140" rx="16" style="fill:var(--paper);stroke:var(--acc);stroke-width:1.5"/><circle cx="${i * 160 + 80}" cy="40" r="18" style="fill:var(--acc)"/><text x="${i * 160 + 80}" y="46" text-anchor="middle" style="fill:#fff;font-weight:700">${i + 1}</text><text text-anchor="middle" style="font-weight:650;font-size:16px">${tspans(r[0], i * 160 + 80, 112, 14, 20)}</text>`)).join('')}
    </svg>`, 'Political-legal environment: types of political risk'),
    culture: () => {
      const n = [['Religion', 'Beliefs shape what products are acceptable, holidays, and working days.'], ['Political philosophy', 'How a society views government, ownership and enterprise.'], ['Economics & economic philosophy', 'Attitudes to markets, wealth, saving and consumption.'], ['Education', 'Literacy and skills affect workforce, marketing messages and product use.'], ['Manners & customs', 'Daily habits: greetings, negotiation style, gift-giving, punctuality.'], ['Language', 'The vehicle of culture — translation errors create significant problems.'], ['Social structure', 'Family, class and group roles that influence buying decisions.']];
      const cx = 320, cy = 200, R = 150;
      return fig(`<svg viewBox="0 0 640 400" role="img" aria-label="Figure 5.1 aspects of culture">
        ${n.map((x, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 7, x1 = cx + Math.cos(a) * R, y1 = cy + Math.sin(a) * R * .95;
          return `<line x1="${cx}" y1="${cy}" x2="${x1}" y2="${y1}" style="stroke:var(--line-2);stroke-width:1.5" stroke-dasharray="4 5"/>` +
            hit(x[0], x[1], `<rect x="${x1 - 78}" y="${y1 - 24}" width="156" height="48" rx="24" style="fill:var(--paper);stroke:var(--acc);stroke-width:1.5"/><text text-anchor="middle" style="font-size:14px;font-weight:600">${tspans(x[0], x1, y1 + 5, 20, 16)}</text>`); }).join('')}
        <circle cx="${cx}" cy="${cy}" r="70" style="fill:var(--acc)"/><text text-anchor="middle" style="fill:#fff;font-weight:700;font-size:15px">${tspans('Culture norms and value system', cx, cy + 5, 14, 18)}</text>
      </svg>`, 'Figure 5.1 — Various aspects of culture (descriptions are study aids)');
    },
    select5: () => plain(`<ol class="steps">${[['Develop appropriate indicators', 'Past sales, competitive research, experience of the entrepreneur, market size, market growth and product indicators.'], ['Collect data and convert', 'Turn the data into comparable indicators.'], ['Establish weights', 'Set an appropriate weight for each indicator.'], ['Analyze the data', 'Score each market.'], ['Select the market', 'Choose the appropriate market from the market rankings.']].map(s => `<li data-reveal><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join('')}</ol>`, 'Five-step foreign market selection model'),
    entry: () => {
      const s = [['Indirect exporting', 'Foreign purchaser in the local market, or an export management firm.'], ['Direct exporting', 'Independent distributors or your own overseas sales office.'], ['Licensing & franchising', 'Non-equity: rights to a patent; franchise format (e.g., McDonald’s).'], ['Turn-key & management contracts', 'Non-equity: build/hand over a facility, or manage one for a fee.'], ['Minority interest', 'Direct foreign investment — a minority stake.'], ['Joint venture', 'Direct foreign investment shared with a partner.'], ['Majority interest & mergers', 'Direct foreign investment with control.']];
      return fig(`<svg viewBox="0 0 700 300" role="img" aria-label="Entry strategies staircase">
        <text x="0" y="16" style="font-family:var(--f-mono);font-size:11px;fill:var(--ink-2)">COMMITMENT · CONTROL · RISK ↑</text>
        ${s.map((x, i) => { const w = 92, h = 40 + i * 30, X = i * 100, Y = 290 - h; const fam = i < 2 ? 'var(--l7)' : i < 4 ? 'var(--l9)' : 'var(--l8)';
          return hit(x[0], x[1], `<rect x="${X}" y="${Y}" width="${w}" height="${h}" rx="10" style="fill:${fam};opacity:.9"/><text text-anchor="middle" style="fill:#fff;font-size:12px;font-weight:650">${tspans(x[0], X + w / 2, Y + 24, 12, 14)}</text>`); }).join('')}
      </svg><div class="chips" style="margin-top:12px"><span class="chip"><span class="dot" style="background:var(--l7)"></span>Exporting</span><span class="chip"><span class="dot" style="background:var(--l9)"></span>Non-equity</span><span class="chip"><span class="dot" style="background:var(--l8)"></span>Direct foreign investment</span></div>`,
        'Entry strategies, ordered by increasing commitment (conceptual ordering for study)');
    },
    mergers: () => {
      const cx = 330, cy = 190;
      const n = [['Horizontal', 'Same industry, same market, similar products — a direct competitor. Heaviest antitrust scrutiny.', 120, 190, 'Rival'], ['Vertical (backward)', 'A supplier earlier in the same supply chain.', 330, 50, 'Supplier'], ['Vertical (forward)', 'A distributor or retailer later in the supply chain.', 330, 330, 'Distributor'], ['Product-extension', 'Same customers, different but related non-competing products.', 540, 110, 'Related product'], ['Market-extension', 'Same products, different geographic market.', 540, 270, 'Other region'], ['Conglomerate', 'Completely unrelated industry — diversification spreads risk.', 120, 55, 'Unrelated firm']];
      return fig(`<svg viewBox="0 0 660 380" role="img" aria-label="Merger types map">
        ${n.map(x => `<line x1="${cx}" y1="${cy}" x2="${x[2]}" y2="${x[3]}" style="stroke:var(--acc);stroke-width:2" stroke-dasharray="${x[0] === 'Conglomerate' ? '2 8' : '0'}"/>`).join('')}
        <circle cx="${cx}" cy="${cy}" r="54" style="fill:var(--ink)"/><text x="${cx}" y="${cy + 6}" text-anchor="middle" style="fill:var(--paper);font-weight:700;font-size:16px">Your firm</text>
        ${n.map(x => hit(x[0], x[1], `<rect x="${x[2] - 70}" y="${x[3] - 30}" width="140" height="60" rx="14" style="fill:var(--paper);stroke:var(--acc);stroke-width:1.5"/><text x="${x[2]}" y="${x[3] - 4}" text-anchor="middle" style="font-weight:700;font-size:13px">${e(x[0])}</text><text x="${x[2]}" y="${x[3] + 15}" text-anchor="middle" style="font-size:12px;fill:var(--ink-2)">${e(x[4])}</text>`)).join('')}
      </svg>`, 'Who are you merging with? Relationship decides the type.');
    },
    freetrade: () => plain(`<svg viewBox="0 0 640 220" role="img" aria-label="Free trade versus trade barriers">
      <style>.mv{animation:mv 3.2s linear infinite}.mv2{animation:mv2 3.2s ease-in infinite}@keyframes mv{from{transform:translateX(0)}to{transform:translateX(420px)}}@keyframes mv2{0%{transform:translateX(0);opacity:1}55%{transform:translateX(205px);opacity:1}100%{transform:translateX(205px);opacity:0}}@media (prefers-reduced-motion:reduce){.mv,.mv2{animation:none}}</style>
      <text x="0" y="40" style="font-family:var(--f-mono);font-size:11px;fill:var(--good)">FREE TRADE — NOTHING GETS IN THE WAY</text>
      <rect x="0" y="55" width="70" height="44" rx="10" style="fill:var(--ink)"/><text x="35" y="82" text-anchor="middle" style="fill:var(--paper);font-size:13px">Nation A</text>
      <rect x="570" y="55" width="70" height="44" rx="10" style="fill:var(--ink)"/><text x="605" y="82" text-anchor="middle" style="fill:var(--paper);font-size:13px">Nation B</text>
      <line x1="80" y1="77" x2="560" y2="77" style="stroke:var(--line-2)" stroke-dasharray="4 6"/>
      ${[0, 1, 2].map(i => `<circle class="mv" cx="110" cy="77" r="7" style="fill:var(--good);animation-delay:-${i * 1.05}s"/>`).join('')}
      <text x="0" y="140" style="font-family:var(--f-mono);font-size:11px;fill:var(--bad)">TRADE BARRIERS — THINGS GET IN THE WAY</text>
      <rect x="0" y="155" width="70" height="44" rx="10" style="fill:var(--ink)"/><text x="35" y="182" text-anchor="middle" style="fill:var(--paper);font-size:13px">Nation A</text>
      <rect x="570" y="155" width="70" height="44" rx="10" style="fill:var(--ink)"/><text x="605" y="182" text-anchor="middle" style="fill:var(--paper);font-size:13px">Nation B</text>
      <line x1="80" y1="177" x2="560" y2="177" style="stroke:var(--line-2)" stroke-dasharray="4 6"/>
      <rect x="318" y="148" width="14" height="58" rx="3" style="fill:var(--bad)"/><text x="345" y="172" style="font-size:12px;fill:var(--bad);font-weight:650">tariffs · quotas</text><text x="345" y="190" style="font-size:12px;fill:var(--bad);font-weight:650">excise · currency</text>
      ${[0, 1, 2].map(i => `<circle class="mv2" cx="110" cy="177" r="7" style="fill:var(--bad);animation-delay:-${i * 1.05}s"/>`).join('')}
    </svg>`, 'There are costs and benefits to both free trade and trade barriers.'),

    ipfour: () => {
      const n = [['Patent', 'Inventions — 20 yrs utility / 14 yrs design', 'var(--l7)', 'lightbulb'], ['Trademark', 'Brand words, names, symbols — indefinite', 'var(--l9)', 'badge-check'], ['Copyright', 'Original works of authorship — life + 70', 'var(--l8)', 'copyright'], ['Trade secret', 'Confidential know-how — while it stays secret', 'var(--ink)', 'lock']];
      return plain(`<div class="dia-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">${n.map(x => `<div class="tile" data-reveal style="border-color:${x[2]}"><i data-lucide="${x[3]}" style="width:28px;height:28px;color:${x[2]};display:block;margin-bottom:10px"></i><b>${x[0]}</b><span class="tx">${x[1]}</span></div>`).join('')}</div>`, 'Four core types of intellectual property');
    },
    patents: () => plain(`<div class="ip-time">${[['Utility patent', 20, '20 years', 'New, useful & unobvious processes, machines, compositions of matter'], ['Design patent', 14, '14 years', 'New, original, ornamental & unobvious designs for articles of manufacture'], ['Plant patent', null, 'new plant varieties', 'Given for new varieties of plants']].map(p => `<div><div class="ip-row"><span class="lbl">${p[0]}</span><div class="ip-track"><i data-w="${p[1] ? p[1] / 20 * 100 : 60}" style="background:var(--acc)">${p[2]}</i></div></div><p class="muted" style="margin:6px 0 0;font-size:.9rem">${p[3]}</p></div>`).join('')}</div><p class="muted" style="font-size:.86rem;margin-top:14px">The slide graphic also shows <b>provisional patents</b> as a type.</p>`, 'Patent types and terms (per lecture)'),
    checklist61: () => plain(`<ul class="check-list" data-store="t61">${['Seek a patent attorney who has expertise in your product line.', 'Consider a design patent to protect the product design or product look.', 'Before external disclosure (conference, media, beta site) seek legal counsel — disclosure may negate a later patent application.', 'Evaluate competitor patents to gain insight into what they may be developing.', 'If you think your product infringes another firm’s patent, seek legal counsel.', 'Verify employment contracts assign inventions or new products to the venture.', 'Properly mark all products granted a patent — unmarked products could mean loss of damages in a patent suit.', 'Consider licensing your patents to create new market opportunities and long-term revenue.'].map((t, i) => `<li><label><input type="checkbox" data-i="${i}"><span>${t}</span></label></li>`).join('')}</ul>`, 'Table 6.1 — Checklist for minimizing patent risks (your ticks are saved)'),
    tmtimeline: () => plain(`<div class="timeline"><span class="fill"></span>${[['Day 0', 'File: written form, drawing, five specimens, fee'], ['3 months', 'Initial determination of suitability'], ['+6 months', 'Deadline to answer objections, or abandoned (appeal possible)'], ['30 days', 'Published in the Official Gazette — window to oppose'], ['~13 months', 'Registration issued if no opposition']].map(s => `<div class="tl-step"><div class="when">${s[0]}</div><p>${s[1]}</p></div>`).join('')}</div>`, 'Trademark registration path'),
    contract: () => plain(`<div class="dia-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${[['Offer', 'Oral or written — not binding until voluntarily accepted.'], ['Voluntary acceptance', 'Of the offer.'], ['Consideration', 'Something of value given by both parties.'], ['Competent parties', 'Both have the right to negotiate for their firms.'], ['Legal', 'Illegal activities (e.g., gambling) are not binding.'], ['$500+ in writing', 'Any sales of $500 or more must be in writing.']].map((x, i) => `<div class="tile" data-reveal><span class="tn">${String(i + 1).padStart(2, '0')}</span><b>${x[0]}</b><span class="tx">${x[1]}</span></div>`).join('')}</div>`, 'Table 6.5 — Contract conditions'),

    threeq: () => plain(`<svg viewBox="0 0 660 170" role="img" aria-label="Three basic questions of a marketing plan">
      <path d="M40 120 C 180 20, 260 150, 330 90 S 520 30, 620 70" style="fill:none;stroke:var(--acc);stroke-width:3" stroke-dasharray="8 8"/>
      ${[[40, 120, 'Where have we been?', 'Situation'], [330, 90, 'Where do we want to go?', 'Objectives (short term)'], [620, 70, 'How do we get there?', 'Strategy & actions']].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="12" style="fill:var(--ink)"/><text x="${p[0]}" y="${p[1] + 38}" text-anchor="middle" style="font-weight:700;font-size:15px">${p[2]}</text><text x="${p[0]}" y="${p[1] + 56}" text-anchor="middle" style="font-size:12px;fill:var(--ink-2)">${p[3]}</text>`).join('')}
    </svg>`, 'The marketing plan answers three basic questions'),
    components: () => plain(tiles([
      ['Executive summary', 'High-level overview of goals, audience, budget and key findings.'], ['Mission statement', 'Defining the purpose of the organization.'], ['Identification of opportunities', 'Which products or services are you going to sell?'], ['Situation analysis (SWOT)', 'Internal strengths & weaknesses, external opportunities & threats.'],
      ['PESTEL analysis', 'Political, economic, social, technological, ecological and legal environment.'], ['Target audience (buyer personas)', 'Ideal-customer profiles: demographics, behaviours, pain points.'], ['Market & competitor research', 'Industry trends, market gaps, competitor positioning.'], ['Marketing objectives (SMART)', 'e.g., increase website leads by 20% in 6 months.'],
      ['Marketing mix (4Ps)', 'Product, price, place (distribution), promotion.'], ['Action plan & channels', 'Tactical steps, content calendars, SEO, social, email, paid ads.'], ['Budget & resources', 'Ad spend, creation, tools, team responsibilities.'], ['KPIs & metrics', 'Track ROI and overall performance.']], 3), 'Core components of a marketing plan'),
    planning15: () => {
      const st = [['Mission', 'var(--l7)', ['Mission statement', 'Corporate objectives']], ['Situation analysis', 'var(--good)', ['Identify opportunities', '5C analysis (company, customers, competitors, collaborators, climate)', 'SWOT analysis', 'PEST analysis']], ['Marketing strategy', 'var(--l8)', ['Define your target audience', 'Set measurable goals', 'Develop budget']], ['Marketing mix', 'var(--l9)', ['Product development', 'Pricing', 'Promotion', 'Place and distribution']], ['Implementation & control', 'var(--ink)', ['Put plan into action', 'Monitor results ↺ feeds back to “identify opportunities”']]];
      let k = 0, d = 0;
      return plain(`<div style="display:grid;gap:10px">${st.map(s => `<div data-reveal style="display:grid;grid-template-columns:150px 1fr;gap:12px;align-items:start"><div style="font-family:var(--f-mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:${s[1]};font-weight:700;padding-top:10px">Step ${++d}<br><span style="font-family:var(--f-display);font-size:1.4rem;text-transform:none;letter-spacing:0;font-weight:400">${s[0]}</span></div><div style="display:grid;gap:6px">${s[2].map(x => `<div style="margin-left:${k * 6}px;padding:9px 14px;border-radius:10px;background:${s[1]};color:${s[1] === 'var(--l9)' ? 'var(--ink)' : '#fff'};font-size:.92rem;font-weight:600"><span class="mono" style="opacity:.75;margin-right:8px">${String(++k).padStart(2, '0')}</span>${x}</div>`).join('')}</div></div>`).join('')}</div>`, 'Marketing planning process — 15 steps in 5 stages (slide graphic)');
    },
    strategy7: () => {
      const n = ['Understand customer', 'Analyse market', 'Analyse competition', 'Define marketing mix', 'Determine market position', 'Marketing budget', 'Execution plan'];
      const cx = 320, cy = 190, R = 140;
      return plain(`<svg viewBox="0 0 640 380" role="img" aria-label="Marketing strategy process cycle">
        <circle cx="${cx}" cy="${cy}" r="${R}" style="fill:none;stroke:var(--line-2);stroke-width:2" stroke-dasharray="3 7"/>
        <text text-anchor="middle" style="font-family:var(--f-display);font-size:26px">${tspans('Marketing strategy process', cx, cy + 6, 16, 28)}</text>
        ${n.map((x, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 7, X = cx + Math.cos(a) * R, Y = cy + Math.sin(a) * R; return `<circle cx="${X}" cy="${Y}" r="46" style="fill:var(--l8)"/><text text-anchor="middle" style="fill:#fff;font-size:12px;font-weight:700">${tspans(x, X, Y + 4, 11, 14)}</text><circle cx="${X + 32}" cy="${Y - 32}" r="12" style="fill:var(--ink)"/><text x="${X + 32}" y="${Y - 28}" text-anchor="middle" style="fill:#fff;font-size:11px;font-weight:700">${i + 1}</text>`; }).join('')}
      </svg>`, 'Marketing strategy process — a seven-step cycle');
    },
    swot: () => {
      const q = [['Strengths', 'Characteristics of a business which give it advantages over its competitors.', 'var(--ink)', '#F2EDE3', 'Internal · helpful'], ['Weaknesses', 'Characteristics of a business which make it disadvantageous relative to competitors.', 'var(--l8)', '#fff', 'Internal · harmful'], ['Opportunities', 'Elements in the external environment that allow it to formulate and implement strategies to increase profitability.', 'var(--l9-bright)', 'var(--ink)', 'External · helpful'], ['Threats', 'Elements in the external environment that could endanger the integrity and profitability of the business.', 'var(--l7)', '#fff', 'External · harmful']];
      return plain(`<div class="matrix">${q.map(x => `<div class="mx-cell" data-reveal style="background:${x[2]};color:${x[3]};border-color:transparent;min-height:170px"><div class="mono" style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;opacity:.75">${x[4]}</div><div style="font-family:var(--f-display);font-size:2.2rem;line-height:1;margin:6px 0 8px">${x[0]}</div><div style="font-size:.93rem">${x[1]}</div></div>`).join('')}</div>`, 'SWOT analysis');
    },
    pestel: () => {
      const f = [['Political', 'Policies & laws (tax, labour, trade…) · stability · corruption', '#A3271F'], ['Economic', 'Growth · inflation · interest rates · employment · household income', '#C4561B'], ['Social', 'Population · ageing · career views · lifestyle · cultural barriers', '#B88A12'], ['Technological', 'Technology incentives · innovation · automation · R&D activity', '#3D7A2E'], ['Environmental', 'Climate change · ethical · recycling & disposal · sustainability', '#1F2A5C'], ['Legal', 'Antitrust · labour · copyright · data protection · health & safety', '#6B2A8C']];
      const cx = 320, cy = 220, R = 140, hex = (x, y, r) => [...Array(6)].map((_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${x + Math.cos(a) * r},${y + Math.sin(a) * r}`; }).join(' ');
      return fig(`<svg viewBox="0 0 640 440" role="img" aria-label="PESTEL hexagons">
        <text x="${cx}" y="${cy + 12}" text-anchor="middle" style="font-family:var(--f-display);font-size:40px">PESTEL</text>
        ${f.map((x, i) => { const a = -Math.PI / 2 + i * Math.PI / 3, X = cx + Math.cos(a) * R, Y = cy + Math.sin(a) * R;
          return hit(x[0], x[1], `<polygon points="${hex(X, Y, 70)}" style="fill:${x[2]}"/><text x="${X}" y="${Y - 2}" text-anchor="middle" style="fill:#fff;font-weight:700;font-size:15px">${x[0]}</text><text x="${X}" y="${Y + 20}" text-anchor="middle" style="fill:#fff;font-size:22px;font-family:var(--f-display)">${x[0][0]}</text>`); }).join('')}
      </svg>`, 'PESTEL analysis — sub-factors from the lecture slide', '<b>Tap a hexagon</b>Each factor lists the sub-factors from the lecture slide.');
    },
    competitor8: () => plain(tiles([['Identify your competitors'], ['Research their products or services'], ['Analyze their target audience'], ['Study their website & online presence'], ['Analyze their marketing strategy'], ['Review customer feedback'], ['Compare pricing and value'], ['Find opportunities and create your strategy']], 4), 'How to research competitors effectively (slide infographic)'),
    research4: () => plain(`<ol class="steps">${[['Define the purpose or objectives', 'List the information needed to prepare the marketing plan.'], ['Gather data from secondary sources', 'Trade magazines, newspaper articles, libraries, government agencies, the Internet, commercial data.'], ['Gather information from primary sources', 'Observation, networking, interviewing, focus groups, experimentation — instrument: questionnaire.'], ['Analyze and interpret the results', 'Tabulate by hand or computer; interpret against research objectives; cross-tabulate for focus.']].map(s => `<li data-reveal><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join('')}</ol>
      <div class="chips" style="margin-top:8px">${['Surveys', 'Focus groups', 'Interviews', 'Libraries', 'Government agencies', 'Trade associations'].map(x => `<span class="chip"><span class="dot"></span>${x}</span>`).join('')}</div>`, 'Marketing research for a new venture — four steps, and sources of information'),
    chars7: () => plain(tiles([['Provide a strategy'], ['Be based on facts / valid assumptions'], ['Describe an organization for implementation'], ['Provide for short- and long-term continuity'], ['Be simple and short'], ['Be flexible'], ['Specify criteria for control']], 4), 'A marketing plan should…'),
    system81: () => fig(`<svg viewBox="0 0 720 330" role="img" aria-label="Figure 8.1 the marketing system">
      <style>.flow{stroke-dasharray:7 6;animation:flow 1.2s linear infinite}@keyframes flow{to{stroke-dashoffset:-26}}@media (prefers-reduced-motion:reduce){.flow{animation:none}}</style>
      <defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--acc)"/></marker></defs>
      ${hit('External environment', 'Economy · culture · technology · demand · legal considerations · raw materials · competition', `<rect x="0" y="0" width="170" height="120" rx="14" style="fill:var(--paper);stroke:var(--ink);stroke-width:1.5"/><text x="85" y="28" text-anchor="middle" style="font-weight:700;font-size:14px">External environment</text><text x="85" y="54" text-anchor="middle" style="font-size:11.5px;fill:var(--ink-2)">${tspans('Economy · Culture · Technology · Demand · Legal · Raw materials · Competition', 85, 72, 26, 15)}</text>`)}
      ${hit('Internal environment', 'Financial resources · suppliers · goals and objectives · management team', `<rect x="0" y="210" width="170" height="120" rx="14" style="fill:var(--paper);stroke:var(--ink);stroke-width:1.5"/><text x="85" y="238" text-anchor="middle" style="font-weight:700;font-size:14px">Internal environment</text><text x="85" y="260" text-anchor="middle" style="font-size:11.5px;fill:var(--ink-2)">${tspans('Financial resources · Suppliers · Goals & objectives · Management team', 85, 282, 26, 15)}</text>`)}
      <path class="flow" d="M170 60 H205 V140" style="fill:none;stroke:var(--acc);stroke-width:2" marker-end="url(#ar)"/>
      <path class="flow" d="M170 270 H205 V200" style="fill:none;stroke:var(--acc);stroke-width:2" marker-end="url(#ar)"/>
      ${[['Entrepreneur', 'Combines environment information to make decisions.', 205], ['Market-planning decisions', 'The marketing-mix decisions captured in the plan.', 335], ['Marketing strategies directed to customers', 'Product, price, distribution and promotion in action.', 465], ['Purchase decisions of customers', 'Customers buy (or don’t) — results feed back.', 595]]
        .map((b, i) => hit(b[0], b[1], `<rect x="${b[2] - (i ? 0 : 0)}" y="140" width="${i === 3 ? 125 : 110}" height="60" rx="12" style="fill:${i ? 'var(--card)' : 'var(--ink)'};stroke:var(--ink);stroke-width:1.5"/><text text-anchor="middle" style="font-size:12px;font-weight:650;${i ? '' : 'fill:var(--paper)'}">${tspans(b[0], b[2] + (i === 3 ? 62 : 55), 174, 16, 14)}</text>`) + (i < 3 ? `<path class="flow" d="M${b[2] + 110} 170 H${b[2] + 128}" style="fill:none;stroke:var(--acc);stroke-width:2" marker-end="url(#ar)"/>` : '')).join('')}
      <path class="flow" d="M657 140 V95 H240 V136" style="fill:none;stroke:var(--acc);stroke-width:2" marker-end="url(#ar)"/>
      <text x="450" y="88" text-anchor="middle" style="font-family:var(--f-mono);font-size:11px;fill:var(--acc);letter-spacing:.1em">FEEDBACK</text>
    </svg>`, 'Figure 8.1 — The marketing system'),
    mix4p: () => {
      const p = [['Product', 'package', 'Quality of components or materials, style, features, options, brand name, packaging, sizes, service availability, and warranties.'], ['Price', 'tag', 'Quality image, list price, quantity, discounts, allowances for quick payment, credit terms, and payment period.'], ['Place (channels of distribution)', 'truck', 'Use of wholesalers and/or retailers, type, how many, length of channel, geographic coverage, inventory, and transportation.'], ['Promotion', 'megaphone', 'Media alternatives, message, media budget, role of personal selling, sales promotion (displays, coupons, etc.), and media interest in publicity.']];
      return plain(`<div class="dia-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">${p.map(x => `<div class="tile" data-reveal><i data-lucide="${x[1]}" style="width:26px;height:26px;color:var(--acc);display:block;margin-bottom:8px"></i><b style="font-family:var(--f-display);font-weight:400;font-size:1.6rem">${x[0]}</b><span class="tx">${x[2]}</span></div>`).join('')}</div>`, 'The marketing mix — critical decisions for each variable');
    },
    b2b: () => plain(`<div class="dia-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
      <div class="tile" data-reveal style="border-color:var(--l7)"><span class="tn">B2B</span><b style="font-family:var(--f-display);font-weight:400;font-size:1.8rem">Business-to-business</b><span class="tx">Selling products or services to another business · usually a large volume in one transaction · more direct channel of distribution · trade magazine advertising, direct sales and trade shows.</span></div>
      <div class="tile" data-reveal style="border-color:var(--l9)"><span class="tn">B2C</span><b style="font-family:var(--f-display);font-weight:400;font-size:1.8rem">Consumer markets</b><span class="tx">Sales to households for personal consumption.</span></div></div>`, 'Marketing strategy: consumer vs business-to-business')
  };

  VA.diagram = name => (D[name] ? D[name]() : '');

  /* behaviours (event delegation, once per page) */
  const show = g => { const box = g.closest('.dia').querySelector('.dia-info'); if (!box) return;
    box.closest('.dia').querySelectorAll('.hit').forEach(h => h.style.opacity = h === g ? 1 : .55);
    box.innerHTML = `<b>${g.dataset.t}</b>${g.dataset.d}`; };
  document.addEventListener('click', ev => { const g = ev.target.closest('.dia .hit'); if (g) show(g); });
  document.addEventListener('keydown', ev => { const g = ev.target.closest && ev.target.closest('.dia .hit'); if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); show(g); } });

  VA.initDiagrams = (root = document) => {
    root.querySelectorAll('.check-list[data-store]').forEach(ul => {
      const k = ul.dataset.store, saved = (VA.store.get().lab[k]) || [];
      ul.querySelectorAll('input').forEach(i => { i.checked = saved.includes(+i.dataset.i);
        i.addEventListener('change', () => VA.store.lab(k, [...ul.querySelectorAll('input:checked')].map(x => +x.dataset.i))); });
    });
    const grow = () => {
      root.querySelectorAll('.ip-track i[data-w]').forEach(i => i.style.width = i.dataset.w + '%');
      root.querySelectorAll('.timeline .fill').forEach(f => f.style.width = '100%');
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.querySelectorAll('.ip-track i[data-w]').forEach(i => i.style.width = i.dataset.w + '%'); const f = en.target.querySelector('.timeline .fill'); if (f) f.style.width = '100%'; io.unobserve(en.target); } }), { threshold: .3 });
      root.querySelectorAll('.dia').forEach(d => io.observe(d));
    } else grow();
  };
})();
