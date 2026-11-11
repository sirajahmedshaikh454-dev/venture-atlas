/* Lecture content — transcribed from the course slides (Lectures 7, 8, 9).
   Block types: p, list, def, cards, steps, table, diagram, callout, example, note */
window.VA = window.VA || {};

VA.lectures = [
{
  id: 7, slug: 'lecture-7.html', code: 'L07', color: 'var(--l7)',
  title: 'The Nature of International Entrepreneurship',
  short: 'International Entrepreneurship',
  tagline: 'Taking a venture across borders — why, where and how.',
  icon: 'globe-2',
  img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=70',
  imgAlt: 'Stacked shipping containers at a busy international port',
  imgCredit: 'Photo: Unsplash',
  sections: [
  { id: 'intro', title: 'Why ventures expand', kicker: 'Introduction', blocks: [
    {p: 'Entrepreneurs find it difficult to both <b>manage</b> and <b>expand</b> the venture they created. To expand a venture, entrepreneurs need to:'},
    {list: ['Identify opportunities for domestic and international expansion.', 'Develop different management skills.']},
    {p: 'Factors contributing to international expansion:'},
    {cards: [
      ['Opening economies', 'Controlled economies opening up to market-oriented enterprise.', 'unlock'],
      ['Self-interest & external forces', 'The self-interest of organizations, plus the impact of external events and forces.', 'compass'],
      ['Development needs', 'Developing countries need training, education and infrastructure to support their development and growth.', 'graduation-cap']
    ]}
  ], takeaway: 'Expansion needs two things: spotting opportunities (at home and abroad) and growing new management skills.'},

  { id: 'motivations', title: 'Motivations to go global', kicker: 'Why go abroad?', blocks: [
    {p: 'The lecture lists <b>nine</b> motivations that push an entrepreneur toward international markets:'},
    {diagram: 'motivations'},
    {callout: 'Memory hook (ours, not the lecture’s) — <b>"PCUE · DUETT"</b>: Profits, Competitive pressures, Unique product, Excess capacity, Declining home sales, Unique market opportunity, Economies of scale, Technological advantage, Tax benefits.'}
  ], takeaway: 'Nine motivations: profits, competitive pressures, unique product/service, excess capacity, declining home sales, unique market opportunity, economies of scale, technological advantage, tax benefits.'},

  { id: 'opportunity', title: 'Opportunity recognition & the assessment plan', kicker: 'Spotting the opportunity', blocks: [
    {p: 'The key to successful domestic <i>and</i> international entrepreneurship is to develop an idea that has a <b>market</b> for the product or service conceived.'},
    {p: 'Opportunity assessment is often best accomplished by developing an <b>opportunity assessment plan</b>.'},
    {callout: 'An opportunity assessment plan is <b>not</b> a business plan.'},
    {p: 'An opportunity assessment plan has <b>four sections</b>:'},
    {diagram: 'oap'}
  ], takeaway: 'Four sections: (1) idea, competition & USP, (2) market size/trends/growth, (3) entrepreneur & team skills, (4) launch time line.'},

  { id: 'sources', title: 'Information sources', kicker: 'Where to research', blocks: [
    {table: { head: ['Category', 'Sources & what they offer'], rows: [
      ['General information', '<b>SCORE</b> — nonprofit, free online and in-person assistance. <b>Small Business Development Centers</b> — counseling, training, technical assistance on managing a new venture. <b>U.S. Chamber Small Business Center</b> — start-up help via web tools. Others: nasbic.org, nvca.org, nbia.org, fasttrac.org, activecapital.org, c-e-o.org, entre-ed.org, kauffman.org.'],
      ['Industry & market', '<b>Plunkett</b> — industry data, market research, trends, statistics, forecasts. <b>Frost & Sullivan</b> — industry-specific information. <b>Euromonitor</b> — consumer market sizes, marketing parameters, companies, brands. <b>Gartner</b> — technology markets. <b>Gale Directory Library</b> — industry statistics, nonprofit organizations & associations.'],
      ['Competitive company & product', '<b>Business Source Complete</b> — company & industry info from Datamonitor reports. <b>Hoovers</b> — large and small companies, with links to competitors in the same NAICS category. <b>Mergent</b> — detailed company and product information on U.S. and international companies.'],
      ['Government', 'Census reports; export/import authority; <b>UN Comtrade</b>; NAICS (North American Industrial Classification System) and SIC (Standard Industrial Classification) codes.'],
      ['Search engines, trade associations, trade publications', 'Search engines with key terms; <b>trade associations</b> — good source of country-specific industry data; <b>trade publications</b> — trends, companies and trade shows from a local perspective of the market.']
    ]}}
  ], takeaway: 'Know which source does what: Hoovers → competitors by NAICS; Euromonitor → consumer markets; Gartner → tech markets; SCORE → free assistance.'},

  { id: 'nature', title: 'What is international entrepreneurship?', kicker: 'Definition', blocks: [
    {def: ['International entrepreneurship', 'The process of an entrepreneur conducting business activities across national boundaries. The activities necessary for ascertaining and satisfying the needs and wants of target consumers take place in more than one country.']},
    {p: 'International business has become increasingly important to firms of <b>all sizes</b>. A successful entrepreneur must be able to:'},
    {list: ['Fully understand the difference between domestic and international business.', 'Respond accordingly — thereby successfully “going global.”']}
  ], takeaway: 'Key phrase: “across national boundaries … in more than one country.”'},

  { id: 'vs-domestic', title: 'International vs. domestic entrepreneurship', kicker: 'What changes abroad', blocks: [
    {p: 'Going abroad changes almost every assumption a domestic entrepreneur makes. The lecture groups the differences as follows.'},
    {cards: [
      ['Economics', 'Domestically, the whole country has one economic system and one currency. Multi-country strategy must deal with differing levels of economic development, currency valuations, government regulations, and banking, venture capital, marketing and distribution systems.', 'landmark'],
      ['Stage of economic development', 'Affects the ability to do business: fundamental infrastructures, banking facilities and systems, educational systems, legal system, business ethics and norms.', 'bar-chart-3'],
      ['Balance of payments', 'Under flexible exchange rates, a country’s <b>current account</b> (difference between the value of its imports and exports over time) affects the valuation of its currency — which affects business transactions between countries.', 'scale'],
      ['Type of system', 'Developing or transition economies are hard to trade with, so firms use <b>barter</b> (payment using non-money items) or <b>third-party arrangements</b> (paying for goods indirectly through another source).', 'repeat'],
      ['Political-legal environment', '<b>Political risk analysis</b>: assessing a country’s political policies and stability before entry. Risks: operating, transfer, ownership, and conflict/changes in the solvency of the country.', 'shield-alert'],
      ['Legal system', 'Regulates business practices, how transactions are executed, and the rights and obligations of the parties. Critical areas: property rights, contract law, product safety, product liability.', 'gavel'],
      ['Language', 'Finding a translator is one of the biggest problems. Hire a translator whose <b>native tongue is the target language</b> and whose expertise matches the original authors. Careless translation causes significant problems.', 'languages']
    ]},
    {diagram: 'risks'}
  ], takeaway: 'Four political risks: operating, transfer, ownership, and conflict/solvency changes. Four legal critical areas: property rights, contract law, product safety, product liability.'},

  { id: 'environments', title: 'Technological, cultural & commercial environments', kicker: 'Reading the terrain', blocks: [
    {def: ['Technological environment', 'The variation and availability of technology are often surprising, particularly to an entrepreneur from a developed country. New products in a country are created based on the conditions and infrastructure operant in that country.']},
    {p: '<b>Cultural environment</b> covers language, beliefs, habits, customs, norms, values, traditions, dresses and architecture. Figure 5.1 shows culture’s norms and value system at the centre, interacting with seven aspects (tap one):'},
    {diagram: 'culture'},
    {p: '<b>Commercial conditions</b> — factors to consider when determining the distribution system for a country:'},
    {list: ['Overall sales potential', 'Amount and type of competition', 'Cost of the product', 'Geographical size and density', 'Investment policies', 'Exchange rates and controls', 'Level of political risk', 'Overall marketing plan']}
  ], takeaway: 'Figure 5.1: religion, political philosophy, economics & economic philosophy, education, manners & customs, language, social structure — all linked to culture norms & value system.'},

  { id: 'selection', title: 'Going global strategically & choosing a market', kicker: 'Strategy', blocks: [
    {p: '<b>Strategic effects of going global:</b> physical and psychological closeness to the international market affects the way business occurs. Cultural variables, language and legal factors can make a foreign market that is <b>geographically close seem psychologically distant</b>.'},
    {p: 'One good market selection model uses a <b>five-step approach</b>:'},
    {diagram: 'select5'},
    {note: 'Try the weighted-scoring version of this model in the <a href="lab.html#market">Market Selector lab</a>.'}
  ], takeaway: 'Five steps: indicators → collect & convert → weight → analyze → select from rankings.'},

  { id: 'entry', title: 'Entrepreneurial entry strategies', kicker: 'How to enter', blocks: [
    {diagram: 'entry'},
    {steps: [
      ['Exporting', '<b>Indirect exporting</b>: having a foreign purchaser in the local market or using an export management firm. <b>Direct exporting</b>: independent distributors or the company’s own overseas sales office.'],
      ['Non-equity arrangements', '<b>Franchising</b> (e.g., McDonald’s, Pizza Hut). <b>Licensing</b>: giving a foreign manufacturer the right to use a patent. <b>Turn-key projects</b>. <b>Management contracts</b>.'],
      ['Direct foreign investment', 'Minority interests, joint ventures, majority interest, and mergers (horizontal, vertical, product extension, market extension, diversified activity).']
    ]},
    {example: '<b>Turn-key projects in the real world:</b> Bechtel and Fluor have built many foreign plants and projects; Cogentrix (US power company) built electric power plants in several countries; Fiat constructed an entire automobile plant in Russia; foreign companies built hospitals in Saudi Arabia; South Korean, Chinese and Indian companies built highways in Africa and the Middle East; AT&T’s former Network Systems built communications infrastructure for Saudi Arabia and Iran.'}
  ], takeaway: 'Three families: exporting (indirect/direct), non-equity (franchising, licensing, turn-key, management contracts), direct foreign investment.'},

  { id: 'mergers', title: 'The five types of merger', kicker: 'Direct foreign investment', blocks: [
    {def: ['Merger', 'Combines two or more companies into a single legal entity. Corporate mergers are classified into five main types based on the relationship between the combining businesses.']},
    {diagram: 'mergers'},
    {table: { head: ['Type', 'Definition', 'Primary goal', 'Example'], rows: [
      ['Horizontal', 'Direct competitors in the same industry, similar product lines, same market.', 'Increase market share, eliminate competition, economies of scale.', 'Two commercial banks; Marriott & Starwood Hotels.'],
      ['Vertical', 'Different, complementary stages of the same supply chain (supplier, manufacturer, distributor).', 'Streamline supply chain, lower costs, improve quality control (backward or forward).', 'Ice-cream maker buys a cone producer; automaker buys a parts supplier.'],
      ['Product-extension', 'Same general market / customer base, different non-competing but related products.', 'Expand product line to existing customers; raise customer lifetime value.', 'Smartphone maker buys a smartwatch or audio-accessory company.'],
      ['Market-extension', 'Same or very similar products, different geographic markets.', 'Expand geographic reach without fighting for the same local buyers.', 'US regional bank buys a bank in another region or in Canada.'],
      ['Diversified activity (conglomerate)', 'Completely unrelated business activities and industries.', 'Business & financial diversification; spread risk.', 'Clothing or media company buys a software or railway corporation.']
    ]}},
    {callout: '<b>Antitrust note:</b> horizontal mergers face the heaviest regulatory and antitrust scrutiny because they directly reduce the number of competitors in a market.'},
    {note: 'Practise classifying mergers in the <a href="lab.html#sorter">Scenario Sorter</a>.'}
  ], takeaway: 'Same product + same market = horizontal; supply chain = vertical; related products = product-extension; new geography = market-extension; unrelated = conglomerate.'},

  { id: 'partnering', title: 'Entrepreneurial partnering', kicker: 'Local allies', blocks: [
    {list: ['Foreign entrepreneurs know the country and culture.', 'They can facilitate business transactions and update the entrepreneur on business, economic and political conditions.', 'Good partners share the entrepreneur’s vision, are unlikely to exploit the partnership, and can help the entrepreneur achieve his or her goals.']}
  ], takeaway: 'Good partner = shares the vision, won’t exploit the partnership, helps achieve goals.'},

  { id: 'barriers', title: 'Barriers to international trade', kicker: 'Friction at the border', blocks: [
    {def: ['GATT — General Agreement on Tariffs and Trade', 'Established in 1947 under U.S. leadership; includes over 100 nations. Objective: to liberalize trade by eliminating or reducing tariffs, subsidies and import quotas.']},
    {p: '<b>Trade blocs and free trade areas:</b> Free Trade Area (e.g., USA and Israel); NAFTA (USA, Canada, Mexico); European Community (EC); SAFTA; ASEAN (Association of South East Asian Nations).'},
    {p: '<b>Entrepreneur’s strategy and trade barriers:</b> barriers increase the cost of exporting products or semi-finished products to a country. Voluntary export restraints may limit the ability to sell in a country from production facilities outside it.'},
    {diagram: 'freetrade'},
    {cards: [
      ['Barriers include', '1. Tariffs or custom duties · 2. Non-tariff barriers · 3. Increased costs of importing and exporting · 4. Excise taxes · 5. Currency fluctuations', 'construction'],
      ['Why barriers are imposed', '1. Protect domestic jobs · 2. Improve a trade deficit · 3. Protect “infant industries” · 4. Protection from “dumping” · 5. Earn more revenue', 'help-circle'],
      ['Objectives of trade barriers', 'Protect domestic industries · Protect economy against dumping · Promote R&D · Conserve foreign exchange resources · Make balance of payments · Counteract trade barriers · Economy self-reliant · Mobilise revenue', 'target']
    ]},
    {note: 'Since these slides: GATT was absorbed into the World Trade Organization (1995) and NAFTA was replaced by the USMCA (2020). Use the lecture names in exams.'}
  ], takeaway: 'GATT 1947, 100+ nations, aims to cut tariffs, subsidies and quotas. Know the 5 barriers and the 5 reasons barriers are imposed.'}
  ]
},

{
  id: 8, slug: 'lecture-8.html', code: 'L08', color: 'var(--l8)',
  title: 'Legal Issues for Entrepreneurs',
  short: 'Legal Issues',
  tagline: 'Protecting ideas, managing risk, and signing the right papers.',
  icon: 'scale',
  img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=70',
  imgAlt: 'Bronze statue of Lady Justice holding scales',
  imgCredit: 'Photo: Unsplash',
  sections: [
  { id: 'ip', title: 'What is intellectual property?', kicker: 'The assets you can’t touch', blocks: [
    {def: ['Intellectual property (IP)', 'The legal rights protecting creative works and inventions — including literary works, music, designs, trademarks and trade names. These rights give the creator or owner exclusive control over the use and distribution of their work, preventing others from copying or using it without permission.']},
    {p: 'IP includes <b>patents, trademarks, copyrights and trade secrets</b> (the slide graphic also lists <b>moral rights</b>). These represent important assets to the entrepreneur and should be understood <b>even before engaging the services of an attorney</b>.'},
    {diagram: 'ipfour'},
    {p: 'IP is protected through copyright laws, patents, trademarks and other legal mechanisms — fostering innovation, creativity and recognition of creators’ rights.'}
  ], takeaway: 'Four core IP types: patents, trademarks, copyrights, trade secrets.'},

  { id: 'lawyer', title: 'How to select a lawyer', kicker: 'Your legal partner', blocks: [
    {list: ['An entrepreneur needs to be aware of any regulations that may affect a venture.', 'A lawyer may work on a <b>retainer</b> basis (per month or year) or be hired for a <b>one-time fee</b>.', 'A good working relationship with a lawyer eases some of the risk in starting a new business and gives the entrepreneur necessary confidence.', 'The entrepreneur can offer the lawyer <b>stock in exchange for services</b>.']}
  ], takeaway: 'Payment options: retainer, one-time fee, or stock for services.'},

  { id: 'patents', title: 'Patents', kicker: 'Protecting inventions', blocks: [
    {def: ['Patent', 'Grants the holder protection from others making, using or selling a similar idea; issued by the Patent and Trademark Office (PTO). It is an exclusive right granted by a government for a specified period — typically 20 years. To obtain one, an invention must be new, useful and non-obvious.']},
    {diagram: 'patents'},
    {note: 'Exam tip: the lecture gives a <b>14-year</b> design-patent term. (US law moved to 15 years for design applications filed from 13 May 2015 — but answer with the lecture figure.)'}
  ], takeaway: 'Utility = 20 years (processes, machines, compositions of matter). Design = 14 years (ornamental designs). Plant = new plant varieties.'},

  { id: 'intl-patents', title: 'International patents', kicker: 'One filing, many countries', blocks: [
    {def: ['Patent Cooperation Treaty (PCT)', 'Established to facilitate patent filings in multiple countries in one office. Administered by the World Intellectual Property Organization (WIPO) in Geneva, Switzerland; over 100 participants.']},
    {list: ['Provides a <b>preliminary search</b> that assesses whether the filing firm will face infringements in any country.', 'Differences may exist in the patent laws of each of these countries.']}
  ], takeaway: 'PCT → administered by WIPO, Geneva → one office, many countries, preliminary infringement search.'},

  { id: 'application', title: 'The patent application', kicker: 'Anatomy of a filing', blocks: [
    {steps: [
      ['Introduction', 'Background and advantages of the invention, the problems it overcomes, and how it differs from existing offerings.'],
      ['Description of invention', 'A detailed description of the invention and of the drawings that accompany it.'],
      ['Claims', 'Specify what the entrepreneur is trying to patent.'],
      ['Declaration', 'The application should contain a declaration signed by the inventor(s).']
    ]}
  ], takeaway: 'Introduction → Description → Claims, plus a signed declaration. Claims = what you are trying to patent.'},

  { id: 'infringement', title: 'Patent infringement & minimizing risk', kicker: 'Stay out of court', blocks: [
    {p: 'Many businesses, inventions or innovations are improvements on, or modifications of, existing products. <b>Copying and improving on a product may be perfectly legal</b> and a good business strategy. If infringement is unavoidable, the entrepreneur may try to <b>license</b> the product from the patent holder. Hiring a patent attorney helps ensure there is no possibility of infringement.'},
    {p: '<b>Table 6.1 — Checklist for minimizing patent risks</b> (tick them off):'},
    {diagram: 'checklist61'}
  ], takeaway: 'Biggest trap: public disclosure (conference, media, beta site) before filing may negate a later patent application.'},

  { id: 'bmp', title: 'Business method patents', kicker: 'Patenting the “how”', blocks: [
    {list: ['The growth of Internet use and software development gave rise to business method patents.', 'Firms use them to assault competitors and then earn income from royalties or licensing fees.', 'Concerns have evolved regarding these patents.', 'Not all start-ups will have a product or concept that is patentable.']},
    {example: 'Amazon’s “1-Click” ordering patent (granted 1999, expired 2017) is the classic business-method patent; Amazon licensed it to Apple.'}
  ], takeaway: 'Born from the internet & software; used offensively and for royalties.'},

  { id: 'trademarks', title: 'Trademarks', kicker: 'Protecting identity', blocks: [
    {def: ['Trademark', 'A distinguishing word, name or symbol used to identify a product. It can last indefinitely. It can be filed solely on the intent to use the trademark in interstate or foreign commerce — including intent to use in the future.']},
    {p: '<b>Registering the trademark</b> — filing must meet four requirements:'},
    {list: ['Completion of the written form', 'A drawing of the mark', 'Five specimens showing actual use of the mark', 'The fee']},
    {diagram: 'tmtimeline'},
    {p: '<b>Table 6.2 — Benefits of a registered trademark</b>:'},
    {list: ['Notice to everyone of your exclusive rights to the mark throughout the territorial limits of the United States.', 'Entitles you to sue in federal court for infringement — recovery of profits, damages and costs.', 'Establishes incontestable rights regarding the commercial use of the mark.', 'Right to deposit registration with customs to prevent importation of goods with a similar mark.', 'Entitles you to use the notice of registration ®.', 'Provides a basis for filing trademark applications in foreign countries.']}
  ], takeaway: '4 filing requirements; 3 months initial review; 6 months to respond to objections; 30-day opposition window in the Official Gazette; ~13 months total.'},

  { id: 'copyrights', title: 'Copyrights', kicker: 'Protecting expression', blocks: [
    {def: ['Copyright', 'Right given to prevent others from printing, copying or publishing any original works of authorship. A right given by law to creators of literary, dramatic, musical and artistic works and producers of cinematograph films and sound recordings.']},
    {list: ['Internet access to material has led to major legal battles for the entertainment industry.', 'Copyrights are registered with the <b>Library of Congress</b>.', 'Term: the <b>life of the author plus 70 years</b>.']}
  ], takeaway: 'Library of Congress · life + 70 years.'},

  { id: 'secrets', title: 'Trade secrets', kicker: 'Protecting know-how', blocks: [
    {def: ['Trade secret', 'Secret practices and processes that give a company a competitive advantage over its competitors. Provides protection against others revealing or disclosing information that could be damaging to the business.']},
    {list: ['Lasts as long as the idea or process remains a secret.', 'Employees may be asked to sign a <b>confidential information agreement</b>.', 'The entrepreneur needs to take proper precautions.', 'Legal action is possible <b>only after</b> the secret has been revealed.']}
  ], takeaway: 'No fixed term — protected as long as it stays secret; legal action only after disclosure.'},

  { id: 'licensing', title: 'Licensing', kicker: 'Renting out your IP', blocks: [
    {def: ['Licensing', 'A contractual agreement giving rights to others to use intellectual property in return for a royalty or fee.']},
    {cards: [
      ['Patent license', 'Specifies how the licensee would have access to the patent.', 'file-badge'],
      ['Trademark license', 'Involves a franchising agreement.', 'badge-check'],
      ['Copyright license', 'Rights to use or copy books, software, music, photographs, plays, etc.', 'copyright']
    ]},
    {p: '<b>Factors to consider before licensing:</b>'},
    {list: ['Customers’ recognition of the licensed property', 'Whether it complements existing products or services', 'Entrepreneur’s experience with the licensed property', 'Long-term outlook for the licensed property', 'Kind of protection provided by the agreement', 'Commitments: royalties, sales quotas, etc.', 'Renewal options']}
  ], takeaway: 'Three license types — patent, trademark (franchising), copyright — and seven factors to weigh.'},

  { id: 'safety', title: 'Product safety & liability', kicker: 'Consumer protection', blocks: [
    {list: ['Companies must meet legal specifications for new products covered by the <b>Consumer Product Safety Act</b>.', 'The Act created a commission responsible for prescribing safety standards.', 'The commission also develops stricter regulations on labeling and advertising.', 'Typical outcomes of enforcement: <b>large fines and product recalls</b>.']}
  ], takeaway: 'Consumer Product Safety Act → commission → standards, labeling rules, fines & recalls.'},

  { id: 'insurance', title: 'Insurance', kicker: 'Managing risk', blocks: [
    {p: 'Insurance provides a means of managing risk in the new business. Some insurance is required by law; other cover may be necessary to protect the venture’s financial net worth. Skyrocketing medical costs affect premiums, and entrepreneurs must also consider health-care coverage.'},
    {table: { head: ['Type (Table 6.4)', 'Possible coverage'], rows: [
      ['Property', 'Fire (extendable to explosion, riot, vehicle damage, windstorm, hail, smoke); burglary & robbery; business interruption (pays net profits and expenses when shut down by an insured cause).'],
      ['Casualty', 'General liability (defense costs and judgments for bodily injury or property damage; can extend to product liability); automobile liability when employees use their own cars for business.'],
      ['Life', 'Protects business continuity (especially a partnership); financial protection for survivors of a sole proprietorship or loss of a key executive.'],
      ['Workers’ compensation', 'May be mandatory in some states; benefits to employees for work-related injury.'],
      ['Bonding', 'Shifts responsibility to the employee for job performance; protects against employee theft or a subcontractor failing to finish on time.']
    ]}}
  ], takeaway: 'Five types: property, casualty, life, workers’ compensation, bonding.'},

  { id: 'sox', title: 'The Sarbanes-Oxley Act', kicker: 'Governance', blocks: [
    {def: ['Sarbanes-Oxley Act (2002)', 'Passed by Congress in 2002 to provide a mechanism for greater control over the financial activities of public companies.']},
    {list: ['CEOs must vouch for financial statements through internal control mechanisms and reports.', 'Directors must meet background, length-of-service and responsibility requirements for internal auditing and control.', 'Attempting to influence or impede internal auditing is a <b>criminal act</b>.', 'Covers bank fraud, securities fraud, and fraud by wire, radio or TV.', 'Concerns exist about interpretation and directors’ liability, and conflicts with laws of foreign countries.', 'Private companies are not included — but are subject to control if they consult with a public company or influence it in any wrongdoing under the Act.']},
    {example: 'The Act followed the Enron (2001) and WorldCom (2002) accounting scandals.'}
  ], takeaway: '2002 · public companies · CEOs vouch for statements · impeding audits is criminal.'},

  { id: 'contracts', title: 'Contracts', kicker: 'Making deals stick', blocks: [
    {def: ['Contract', 'A legally binding agreement between two parties.']},
    {list: ['Business deals are often concluded with a handshake — but do <b>not</b> rely on a handshake if the deal cannot be completed within <b>one year</b>.', 'Courts insist on a written contract for transactions over <b>$500</b>.']},
    {diagram: 'contract'},
    {p: '<b>Results of a breach:</b> the party in violation may be required to live up to the agreement or pay damages. If one party fails to live up to its end, the second party may also agree to drop the matter — this is called <b>contract restitution</b>.'},
    {p: '<b>Four essential items</b> for the best legal protection:'},
    {steps: [['Understand', 'the terms and conditions in the contract.'], ['Cross out', 'anything you do not agree to.'], ['Don’t sign blanks', 'do not sign if there are blank spaces (these can be crossed out).'], ['Keep a copy', 'make a copy for your files after signing.']]},
    {note: 'Test any deal with the <a href="lab.html#contract">Contract Validity Checker</a>.'}
  ], takeaway: 'Six conditions: offer, voluntary acceptance, consideration, competent parties, legality, $500+ in writing.'}
  ]
},

{
  id: 9, slug: 'lecture-9.html', code: 'L09', color: 'var(--l9)',
  title: 'The Marketing Plan',
  short: 'Marketing Plan',
  tagline: 'Where have we been, where do we want to go, and how do we get there?',
  icon: 'megaphone',
  img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=70',
  imgAlt: 'Laptop showing marketing analytics charts',
  imgCredit: 'Photo: Unsplash',
  sections: [
  { id: 'what', title: 'What is a marketing plan?', kicker: 'Definition', blocks: [
    {def: ['Marketing plan', 'An operational document that outlines a business’s marketing goals and strategy to reach its target market and generate sales. It translates high-level business goals into a structured, time-bound tactical roadmap.']},
    {def: ['Marketing plan (business-plan view)', 'A written statement of marketing objectives, strategies and activities to be followed in the business plan.']},
    {diagram: 'threeq'}
  ], takeaway: 'Three questions: Where have we been? Where do we want to go (short term)? How do we get there?'},

  { id: 'components', title: 'Core components of a marketing plan', kicker: 'What goes inside', blocks: [
    {diagram: 'components'}
  ], takeaway: 'Twelve components from executive summary to KPIs. SMART = Specific, Measurable, Achievable, Relevant, Time-bound.'},

  { id: 'process', title: 'The marketing planning process', kicker: 'Fifteen steps, five stages', blocks: [
    {diagram: 'planning15'},
    {p: 'A companion view — the <b>marketing strategy process</b> — runs in a cycle of seven: understand customer → analyse market → analyse competition → define marketing mix → determine market position → marketing budget → execution plan.'},
    {diagram: 'strategy7'}
  ], takeaway: 'Mission → Situation analysis → Marketing strategy → Marketing mix → Implementation & control, with a feedback loop from monitoring back to opportunities.'},

  { id: 'swot', title: 'SWOT analysis', kicker: 'Situation analysis', blocks: [
    {p: 'An evaluation of <b>internal</b> strengths and weaknesses alongside <b>external</b> opportunities and threats.'},
    {diagram: 'swot'},
    {note: 'Sort real statements into quadrants in the <a href="lab.html#sorter">Scenario Sorter → SWOT deck</a>.'}
  ], takeaway: 'S & W are internal (vs. competitors); O & T are external.'},

  { id: 'pestel', title: 'PESTEL analysis', kicker: 'The macro-environment', blocks: [
    {p: 'What are the Political, Economic, Social, Technological, Ecological (Environmental) and Legal environments? Tap each hexagon:'},
    {diagram: 'pestel'}
  ], takeaway: 'P-E-S-T-E-L: Political, Economic, Social, Technological, Environmental, Legal.'},

  { id: 'keysteps', title: 'Seven key steps to write a marketing plan', kicker: 'Practical method', blocks: [
    {steps: [
      ['Define your mission', 'Align the plan with your core business purpose.'],
      ['Audit your position', 'Review past performance and run a SWOT analysis.'],
      ['Research the market', 'Identify who buys your product and what rivals are doing.'],
      ['Establish SMART goals', 'Pick clear revenue, lead or brand-awareness targets.'],
      ['Formulate strategies', 'Choose your positioning and marketing channels.'],
      ['Set a budget and calendar', 'Assign tasks, deadlines and spending limits.'],
      ['Monitor and adjust', 'Review metrics regularly and optimize underperforming tactics.']
    ]},
    {note: 'Check whether your objective is truly SMART with the <a href="lab.html#smart">SMART Goal Checker</a>.'}
  ], takeaway: 'Mission → Audit → Research → SMART goals → Strategies → Budget & calendar → Monitor.'},

  { id: 'industry', title: 'Industry analysis', kicker: 'Know the arena', blocks: [
    {def: ['Industry analysis', 'A market assessment tool that evaluates the competitive dynamics, demand-supply trends and external macro-forces shaping a specific sector to determine its profit potential and strategic position.']},
    {list: ['Provides sufficient knowledge of the environment that can affect marketing strategy decisions.', 'Information can be gathered through secondary sources and market research.', 'Helps the entrepreneur understand competitors’ strengths and weaknesses and how to position products or services.']}
  ], takeaway: 'Industry analysis → profit potential & strategic position of a sector.'},

  { id: 'competitor', title: 'Competitor analysis', kicker: 'Know your rivals', blocks: [
    {def: ['Competitive analysis', 'A structured assessment of your rivals’ strengths, weaknesses and market strategies. It helps you benchmark your performance and spot opportunities to stand out.']},
    {list: ['Document current strategies of primary competitors.', 'Use the information to formulate the market positioning strategy.', 'Provides a solid basis for marketing decision making.']},
    {p: 'How to research competitors effectively (slide infographic):'},
    {diagram: 'competitor8'}
  ], takeaway: 'Competitor analysis feeds positioning strategy.'},

  { id: 'research', title: 'Marketing research for a new venture', kicker: 'Validate the idea', blocks: [
    {def: ['Marketing research for a new venture', 'The structured process of gathering, analyzing and interpreting data about target customers, competitors and industry trends to validate a business idea.']},
    {diagram: 'research4'},
    {p: '<b>Primary data collection procedures:</b> observation, networking, interviewing, focus groups, experimentation. Data collection instrument: the <b>questionnaire</b>. <b>Secondary sources:</b> trade magazines, newspaper articles, libraries, government agencies, the Internet, commercial data.'},
    {p: '<b>Table 8.3 — A comparison of survey methods</b>:'},
    {table: { head: ['Method', 'Costs', 'Flexibility', 'Response rate', 'Speed', 'Depth'], rows: [
      ['Telephone', 'Can be inexpensive (distance, length)', 'Some — can clarify questions', 'Good (possible 80%)', '<b>Fastest</b>', '<b>Least detailed</b> (8–10 min limit)'],
      ['Mail', 'Can be inexpensive (units, weight)', 'None — self-administered', '<b>Poorest</b>', '<b>Slowest</b>', 'Some depth'],
      ['Personal', '<b>Most expensive</b>', '<b>Most flexible</b>', '<b>Most effective</b>', 'Somewhat slow (travel)', '<b>Most detailed</b> (open-ended)'],
      ['Internet', 'Inexpensive', 'None — self-administered', 'Good with incentives', 'Very fast', 'Some depth']
    ]}},
    {note: 'Step four: tabulate by hand or computer, interpret against research objectives; <b>cross-tabulated</b> data gives more focused results.'}
  ], takeaway: 'Four steps: objectives → secondary data → primary data → analyze & interpret.'},

  { id: 'characteristics', title: 'Characteristics of a good marketing plan', kicker: 'Quality checklist', blocks: [
    {diagram: 'chars7'}
  ], takeaway: 'Strategy · facts/assumptions · organization · continuity · simple & short · flexible · control criteria.'},

  { id: 'system', title: 'The marketing system', kicker: 'Figure 8.1', blocks: [
    {p: 'The external and internal environments feed the entrepreneur, whose market-planning decisions become marketing strategies directed to customers. Customers’ purchase decisions flow back as <b>feedback</b>.'},
    {diagram: 'system81'}
  ], takeaway: 'External (economy, culture, technology, demand, legal, raw materials, competition) + internal (financial resources, suppliers, goals, management team) → entrepreneur → decisions → customers → feedback.'},

  { id: 'mix', title: 'The marketing mix', kicker: 'The 4Ps', blocks: [
    {def: ['Marketing mix', 'A combination of product, price, promotion and distribution and other marketing activities needed to meet marketing objectives.']},
    {diagram: 'mix4p'}
  ], takeaway: 'Product · Price · Place (distribution) · Promotion — know one critical decision for each.'},

  { id: 'preparing', title: 'Steps in preparing the marketing plan', kicker: 'From situation to strategy', blocks: [
    {steps: [
      ['Define the business situation', '<b>Situation analysis</b> describes past and present achievements. For a new venture: how and why the product was developed. After start-up: present market conditions, performance of goods and services, future opportunities.'],
      ['Define the target market / opportunities & threats', 'The <b>target market</b> is the specific group of potential customers the venture aims at. <b>Market segmentation</b> divides a market into definable and measurable groups for targeting.'],
      ['Establish goals and objectives', 'Statements of the level of performance desired — answer “Where do we want to go?”. Not all are quantifiable. Limit them to <b>six to eight</b>, covering key areas.'],
      ['Define marketing strategy & action programs', 'Product (more than physical traits: packaging, brand, price, warranty, image, service, delivery, features, style, even the website); Pricing (costs, margins/markups, competition); Distribution; Promotion.'],
      ['Budget & implement', 'Costs should be reasonably clear; assumptions stated; useful for the financial plan. The plan is a commitment to a specific strategy.'],
      ['Monitor progress', 'Track results, prepare for contingencies.']
    ]},
    {p: '<b>Segmenting and targeting process:</b> decide on the general market → divide it by customer characteristics (geographic, demographic, psychographic) and buying situation (desired benefits, usage, buying conditions, awareness of buying intention) → select segment(s) → develop a marketing plan integrating product, price, distribution and promotion → consider strengths and weaknesses in the target market.'},
    {p: '<b>Distribution</b> provides utility to the consumer and must be consistent with the other mix variables. <b>Promotion</b> informs or educates consumers — print, radio, TV, Internet, direct mail, trade magazines, newspapers — weighing both cost and effectiveness.'},
    {p: '<b>Table 8.8 — Major considerations in channel selection:</b>'},
    {table: { head: ['Consideration', 'Detail'], rows: [
      ['Degree of directness', 'Market conditions (concentrated users → direct; dispersed → indirect). Product attributes (large, bulky, perishable, hazardous, expensive → direct; small → indirect). Cost benefits (many benefits → indirect). Venture attributes (financial strength, size, channel experience, strategy).'],
      ['Number of channel members', '<b>Intensive</b> — as many retailers/wholesalers as possible. <b>Selective</b> — a small number chosen by criteria. <b>Exclusive</b> — only one wholesaler and/or retailer.'],
      ['Criteria for channel members', 'Reputation; services provided.'],
      ['Number of channels', 'One channel for one or multiple target markets; or multiple channels for one or multiple target markets.']
    ]}}
  ], takeaway: 'Situation → target market → goals (6–8) → strategy → budget → monitor. Intensive vs selective vs exclusive distribution.'},

  { id: 'b2b', title: 'Consumer vs. business-to-business markets', kicker: 'Two kinds of buyer', blocks: [
    {diagram: 'b2b'}
  ], takeaway: 'B2B: large volume per transaction, direct channels, trade ads, direct sales, trade shows. Consumer: households, personal consumption.'},

  { id: 'monitor', title: 'Budgeting, implementation & monitoring', kicker: 'Making it real', blocks: [
    {p: '<b>Monitoring</b> involves tracking the results of the marketing effort and preparing for contingencies. Minor adjustments are normal; <b>significant changes indicate a poorly prepared plan</b>.'},
    {p: 'Weaknesses in market planning may be due to:'},
    {cards: [
      ['Poor analysis', 'Of the market and competitive strategy.', 'search-x'],
      ['Unrealistic goals', 'And objectives.', 'mountain'],
      ['Poor implementation', 'Of the outlined plan actions.', 'wrench'],
      ['Unforeseen hazards', 'Like weather or war.', 'cloud-lightning']
    ]}
  ], takeaway: 'Four causes of weak planning: poor analysis, unrealistic goals, poor implementation, unforeseen hazards.'}
  ]
}
];

/* Glossary for revision + search */
VA.glossary = [
  [7, 'International entrepreneurship', 'The process of an entrepreneur conducting business activities across national boundaries, so that consumer-need activities take place in more than one country.'],
  [7, 'Opportunity assessment plan', 'A four-section plan (idea & competition, market, entrepreneur & team, time line) used to assess an opportunity. It is not a business plan.'],
  [7, 'Political risk analysis', 'An assessment of a country’s political policies and its stability prior to entry.'],
  [7, 'Current account', 'The difference between the value of a country’s imports and exports over time; it affects the valuation of its currency.'],
  [7, 'Barter', 'A method of payment using non-money items.'],
  [7, 'Third-party arrangement', 'Paying for goods indirectly through another source.'],
  [7, 'Indirect exporting', 'Having a foreign purchaser in the local market or using an export management firm.'],
  [7, 'Direct exporting', 'Selling through independent distributors or the company’s own overseas sales office.'],
  [7, 'Licensing (entry mode)', 'Giving a foreign manufacturer the right to use a patent.'],
  [7, 'Turn-key project', 'A non-equity arrangement where a firm builds a complete facility abroad (e.g., Fiat’s car plant in Russia).'],
  [7, 'Merger', 'Combines two or more companies into a single legal entity.'],
  [7, 'Horizontal merger', 'Union of direct competitors in the same industry and market with similar products.'],
  [7, 'Vertical merger', 'Combination of companies at different, complementary stages of the same supply chain.'],
  [7, 'Product-extension merger', 'Companies serving the same customers with different, non-competing but related products.'],
  [7, 'Market-extension merger', 'Companies selling the same products in different geographic markets.'],
  [7, 'Conglomerate merger', 'Diversified activity merger of companies in completely unrelated industries.'],
  [7, 'GATT', 'General Agreement on Tariffs and Trade, 1947, U.S.-led, 100+ nations; liberalizes trade by reducing tariffs, subsidies and import quotas.'],
  [7, 'Free trade', 'Nothing hinders two nations trading with each other.'],
  [7, 'Trade barriers', 'Things that get in the way and make trade difficult — tariffs, non-tariff barriers, excise taxes, currency fluctuations, higher import/export costs.'],
  [8, 'Intellectual property', 'Legal rights protecting creative works and inventions: patents, trademarks, copyrights and trade secrets.'],
  [8, 'Patent', 'Protection from others making, using or selling a similar idea; issued by the Patent and Trademark Office.'],
  [8, 'Utility patent', 'Protects new, useful and unobvious processes, machines and compositions of matter; 20 years.'],
  [8, 'Design patent', 'Protects new, original, ornamental and unobvious designs for articles of manufacture; 14 years (per lecture).'],
  [8, 'Plant patent', 'Given for new varieties of plants.'],
  [8, 'Patent Cooperation Treaty', 'Facilitates patent filing in multiple countries in one office; administered by WIPO in Geneva.'],
  [8, 'Claims', 'Part of a patent application specifying what the entrepreneur is trying to patent.'],
  [8, 'Business method patent', 'Patent arising from internet/software growth, used to assault competitors and earn royalties.'],
  [8, 'Trademark', 'A distinguishing word, name or symbol used to identify a product; can last indefinitely.'],
  [8, 'Copyright', 'Right to prevent others printing, copying or publishing original works of authorship; life of author + 70 years.'],
  [8, 'Trade secret', 'Protection against disclosure of damaging information; lasts as long as it remains secret.'],
  [8, 'Licensing', 'Contractual agreement giving others rights to use IP in return for a royalty or fee.'],
  [8, 'Consumer Product Safety Act', 'Act requiring products to meet legal specifications; created a commission that sets safety standards.'],
  [8, 'Sarbanes-Oxley Act', '2002 Act giving greater control over financial activities of public companies.'],
  [8, 'Contract', 'A legally binding agreement between two parties.'],
  [8, 'Consideration', 'Something of value given by both parties to a contract.'],
  [8, 'Contract restitution', 'When one party fails to perform and the other agrees to drop the matter and not perform either.'],
  [8, 'Retainer', 'Paying a lawyer per month or year rather than a one-time fee.'],
  [9, 'Marketing plan', 'Operational document outlining marketing goals and strategy to reach a target market and generate sales.'],
  [9, 'SWOT analysis', 'Evaluation of internal strengths and weaknesses and external opportunities and threats.'],
  [9, 'PESTEL analysis', 'Review of political, economic, social, technological, environmental and legal factors.'],
  [9, 'SMART objectives', 'Specific, Measurable, Achievable, Relevant, Time-bound goals.'],
  [9, 'Buyer persona', 'Detailed profile of an ideal customer: demographics, behaviours, pain points.'],
  [9, 'KPIs', 'Key performance indicators used to track ROI and overall performance.'],
  [9, 'Industry analysis', 'Assessment of competitive dynamics, demand-supply trends and macro-forces in a sector to judge profit potential.'],
  [9, 'Competitive analysis', 'Structured assessment of rivals’ strengths, weaknesses and market strategies.'],
  [9, 'Marketing research', 'Gathering, analyzing and interpreting data on customers, competitors and trends to validate a business idea.'],
  [9, 'Secondary data', 'Existing information: trade magazines, newspapers, libraries, government agencies, the Internet, commercial data.'],
  [9, 'Primary data', 'New data collected via observation, networking, interviewing, focus groups, experimentation.'],
  [9, 'Marketing mix', 'Combination of product, price, promotion and distribution needed to meet marketing objectives.'],
  [9, 'Situation analysis', 'Describes the past and present business achievements of the new venture.'],
  [9, 'Target market', 'Specific group of potential customers toward which the venture aims its marketing plan.'],
  [9, 'Market segmentation', 'Dividing a market into definable and measurable groups for targeting.'],
  [9, 'Intensive distribution', 'Selecting as many retailers and/or wholesalers as possible.'],
  [9, 'Selective distribution', 'Choosing a small number of channel members based on criteria.'],
  [9, 'Exclusive distribution', 'Selecting only one wholesaler and/or retailer.'],
  [9, 'B2B market', 'Selling products or services to another business, usually large volume per transaction.']
];
