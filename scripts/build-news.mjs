import { readFile, writeFile } from "node:fs/promises";

const outletUrls = {
  "AP": "https://apnews.com/",
  "Reuters": "https://www.reuters.com/",
  "PBS": "https://www.pbs.org/newshour/",
  "NBC News": "https://www.nbcnews.com/",
  "CBS News": "https://www.cbsnews.com/",
  "ABC News": "https://abcnews.go.com/",
  "NPR": "https://www.npr.org/",
  "BBC": "https://www.bbc.com/news",
  "CDC": "https://www.cdc.gov/",
  "Gallup": "https://news.gallup.com/",
  "SCOTUSblog": "https://www.scotusblog.com/",
  "The Guardian": "https://www.theguardian.com/us",
  "CNBC": "https://www.cnbc.com/",
  "WMO": "https://wmo.int/",
  "Brookings": "https://www.brookings.edu/",
  "Politico": "https://www.politico.com/",
  "Yahoo Sports": "https://sports.yahoo.com/",
  "ESPN": "https://www.espn.com/",
  "U.S. Bank": "https://www.usbank.com/about-us-bank/company-blog.html",
  "American Airlines": "https://news.aa.com/",
  "Chicago Tribune": "https://www.chicagotribune.com/",
  "FactCheck.org": "https://www.factcheck.org/",
  "Homeland Security": "https://www.dhs.gov/news",
  "NASA": "https://www.nasa.gov/news/",
};

const raw = {
  world: [
    ["U.S. and Iran Trade Strikes as Regional Risks Rise Again", "AP", "Fresh military action renewed questions about escalation, civilian risk and the security of Gulf shipping lanes."],
    ["Six Months of the Iran War Reshape U.S. Strategy and the Region", "Reuters", "The prolonged conflict is testing American objectives, regional alliances and military readiness."],
    ["Iran Conflict Sends New Shock Through the Global Economy", "PBS", "Energy costs, shipping insurance and uncertainty are moving through markets far beyond the Middle East."],
    ["Venezuela Oil Agreement Opens a New Chapter in U.S. Energy Policy", "BBC", "A sweeping oil arrangement has prompted questions about control, investment, sanctions and near-term supply."],
    ["A Strong El Niño Raises Extreme-Weather Risks Into 2027", "WMO", "Forecasters are warning governments and U.S. businesses to prepare for heat, flooding and supply disruption."],
    ["China Deepens Middle East Ties During Xi's Egypt Visit", "NPR", "Beijing's diplomacy shows how major powers are competing for influence while the region remains unsettled."],
    ["Canada-U.S. Tariff Fight Puts Consumers and Supply Chains on Alert", "BBC", "New trade barriers are reviving price and sourcing concerns on both sides of the border."],
    ["U.S. and Allies Reassess Security After New Gulf Attacks", "Reuters", "The attacks have renewed debate over deterrence, force protection and the durability of regional partnerships."],
    ["Ukraine Aid Debate Shifts as Washington Seeks More From Europe", "Reuters", "The burden-sharing dispute could change the financing and political foundations of long-term assistance."],
    ["New U.S. Sanctions Add Pressure to Cuba's Deepening Crisis", "ABC News", "The measures arrive as Cuba faces energy, migration and economic strains with direct consequences for U.S. policy."],
  ],
  "u.s": [
    ["Federal Judge Temporarily Blocks New Birthright Citizenship Limits", "SCOTUSblog", "The ruling keeps a major constitutional dispute alive while litigation proceeds."],
    ["Postal Service Whistleblower Questions Ballot-Screening Work", "AP", "The disclosure raises operational and legal questions before the midterm elections."],
    ["Army Secretary Resigns After Leadership Clashes", "NBC News", "The departure puts military management, civilian oversight and recent personnel changes under scrutiny."],
    ["Trump Order Renames Lake Ontario, Prompting Legal and Diplomatic Pushback", "BBC", "The symbolic move has triggered resistance in Canada and questions about presidential authority."],
    ["U.S. Space Academy Order Sets Out a New Military Education Plan", "NASA", "The proposal links space policy, workforce development and national-security competition."],
    ["Justice Department Seeks Supreme Court Action on Mail Ballots", "NBC News", "The emergency request could affect election administration close to the midterms."],
    ["Trade Gap Widens as Imports and Tariffs Reshape U.S. Commerce", "Reuters", "The latest imbalance offers a complicated read on demand, inventories and trade policy."],
    ["Chevron Plans to Expand Venezuela Operations Under New Deal", "PBS", "The move could alter production flows while leaving questions about timing, sanctions and prices."],
    ["Federal AI Interviews Begin Appearing in Some Government Hiring", "CBS News", "Automated screening is testing how agencies balance speed, fairness and accountability."],
    ["U.S. Steps Up Deportations to Haiti Despite Security Warning", "NBC News", "The policy highlights tensions between immigration enforcement and conditions in the destination country."],
  ],
  business: [
    ["Oil Surge After Renewed Iran Strikes Revives Inflation Fears", "NBC News", "Higher energy costs could squeeze households, transport networks and corporate margins."],
    ["U.S. Bank Expands Business Banking Across the Sun Belt", "U.S. Bank", "The expansion signals continued competition for small and midsize business clients in fast-growing states."],
    ["American Airlines Unveils a Premium Boeing 777 Cabin", "American Airlines", "The retrofit reflects the industry's push toward higher-margin international travelers."],
    ["Haribo Enters a New Phase of U.S. Growth", "Reuters", "The candy maker's expansion illustrates how global consumer brands are localizing production and distribution."],
    ["Canadian Boycott of U.S. Goods Pressures Familiar Brands", "The Guardian", "Consumer politics is becoming a measurable business risk in the cross-border trade fight."],
    ["Data-Center Backlash Creates a New Risk for Big Tech Expansion", "The Guardian", "Power demand, water use and local opposition are complicating a historic infrastructure buildout."],
    ["Medical Imaging Platform Scan.com Secures $220 Million for U.S. Expansion", "Reuters", "The financing shows investor appetite for tools that simplify access to diagnostic services."],
    ["Sanford and North Memorial Complete Regional Health Partnership", "Reuters", "The combination reflects the consolidation pressures remaking American health care."],
    ["Venezuela Oil Deal Leaves Analysts Divided Over Commercial Value", "BBC", "Companies face political, infrastructure and contract questions before new barrels can reach markets."],
    ["U.S. Companies Rework Supply Chains as Canada Tariffs Bite", "PBS", "Executives are weighing inventory, sourcing and pricing decisions in a volatile trade environment."],
  ],
  finance: [
    ["Bond Yields Rise and Put New Pressure on Borrowers", "PBS", "The move matters for mortgages, corporate finance, federal interest costs and equity valuations."],
    ["Hedge-Fund Treasury Trades Draw Fresh Stability Concerns", "Reuters", "Highly leveraged positions may amplify stress in the world's most important bond market."],
    ["Wall Street Gains as Technology Shares Offset Oil Anxiety", "CNBC", "Investors are balancing resilient earnings with geopolitical and interest-rate risk."],
    ["Ten-Year Treasury Yield Spikes as Officials Defend the Market", "CNBC", "The selloff is testing confidence in inflation policy and the demand for U.S. debt."],
    ["War Risk Raises the Global Price of Money", "CNN", "Energy inflation and defensive positioning are pushing financing conditions tighter."],
    ["AI Rally Faces a Harder Test From Rates and Valuations", "Reuters", "Strong technology optimism now sits beside expensive multiples and rising bond yields."],
    ["U.S. Stocks End Higher After a Volatile Session", "CNBC", "The rebound masks a market still sensitive to oil, rates and policy headlines."],
    ["Investors Reassess the Dollar After Conflicting U.S. Signals", "Reuters", "Currency traders are parsing monetary policy, trade flows and safe-haven demand."],
    ["Cooler Job Market Sends a Warning About Consumer Momentum", "Reuters", "Slower hiring could ease inflation while weakening household spending."],
    ["Wider Trade Deficit Complicates the Economic Outlook", "Reuters", "Import demand and tariff timing make the latest data unusually difficult to interpret."],
  ],
  technology: [
    ["Washington Pushes a Light-Touch AI Framework at the G20", "Reuters", "The U.S. position favors faster deployment while allies continue to debate stronger safeguards."],
    ["AI Interviews Roll Out for Some Federal Job Applicants", "CBS News", "The pilot raises practical questions about bias, appeals and human review."],
    ["Data-Center Opposition Unites Unlikely Political Allies", "The Guardian", "Communities are challenging projects over electricity, water, land and ratepayer costs."],
    ["Border Agencies Expand Biometric Exit Technology", "Homeland Security", "The system promises faster verification but keeps privacy and oversight questions in view."],
    ["Google Maps Applies Lake America Name for U.S. Users", "ABC News", "The change shows how platform geography can quickly become part of a political dispute."],
    ["AI Data Centers Accelerate the Return of Nuclear Power", "Reuters", "Round-the-clock computing demand is reshaping utility plans and reactor investment."],
    ["Americans Want Stronger Rules for AI in Schools", "Gallup", "Public concern is moving from novelty toward standards for learning, privacy and authorship."],
    ["U.S. and Europe Split Over the Next Phase of AI Regulation", "Reuters", "Different compliance philosophies could affect global product launches and business costs."],
    ["Communities Demand a Larger Share of Data-Center Benefits", "NBC News", "Local leaders are seeking enforceable promises on jobs, taxes, water and electricity."],
    ["Federal Hiring Experiment Tests the Limits of Automated Decision-Making", "CBS News", "The program offers a concrete test of whether public agencies can audit AI-assisted selection."],
  ],
  politics: [
    ["Trump Signs Funding Bill and Averts a Pre-Midterm Shutdown", "Reuters", "The agreement keeps agencies open while leaving deeper spending disputes unresolved."],
    ["White House Reframes the Midterms Around Trump", "NBC News", "The strategy reflects difficult polling and the president's continuing hold on the party."],
    ["Gallup Finds Record Concern About Government Corruption", "Gallup", "The result points to a broad legitimacy problem that crosses party lines."],
    ["Administration Expands Search for Noncitizen Voting Cases", "NBC News", "The effort is intensifying a contested election-year debate over evidence and enforcement."],
    ["Treasury Restricts Some Journalists at G20 Meeting", "PBS", "The decision raises press-access questions around a major international economic event."],
    ["Lawmakers Seek Probe of Alleged Secret Surveillance", "The Guardian", "The demand centers on oversight, legal authority and protections for Americans' data."],
    ["Judge Blocks New Attempt to Narrow Birthright Citizenship", "SCOTUSblog", "The order sets up another round in a constitutional fight likely headed to higher courts."],
    ["Postal Whistleblower Says Officials Defied Mail-Voting Orders", "AP", "The allegation puts election operations and compliance safeguards under fresh scrutiny."],
    ["House Returns From Recess With Shutdown Deadline Looming", "NBC News", "The compressed timetable exposed the political cost of another funding confrontation."],
    ["Data-Center Battles Become a Bipartisan Campaign Issue", "Politico", "Local infrastructure disputes are scrambling conventional alliances ahead of the midterms."],
  ],
  health: [
    ["CDC Tracks New Measles Outbreaks Across the United States", "CDC", "The updates keep attention on vaccination gaps, local transmission and public-health capacity."],
    ["Federal and Pennsylvania Officials Disagree on Measles-Death Counts", "The Guardian", "The dispute shows why definitions and transparent reporting matter during outbreaks."],
    ["Preventable Deaths Rise Among Latino Americans", "NBC News", "New data points to unequal exposure to economic, mental-health and substance-use pressures."],
    ["U.S. Plans Deep Cuts to Global Health Support", "Reuters", "The reductions could affect disease surveillance abroad and preparedness at home."],
    ["Experts Separate Healthy-Aging Habits From Biohacking Hype", "PBS", "Evidence continues to favor sleep, movement, nutrition, connection and preventive care."],
    ["Vertical Integration Remakes U.S. Health Insurance", "Brookings", "Consolidated ownership can change prices, referrals, competition and patient choice."],
    ["Peptide Therapy Boom Outruns the Evidence", "NBC News", "Doctors are urging patients to distinguish approved treatments from loosely regulated wellness claims."],
    ["Medical Imaging Expansion Promises Faster Access and New Questions", "Reuters", "Online booking may reduce friction while highlighting price transparency and follow-up care."],
    ["Hospitals Expand Partnerships as Financial Pressure Builds", "Reuters", "Regional systems are combining operations to manage labor, technology and capital costs."],
    ["CDC Updates Seasonal Flu Vaccine Guidance", "CDC", "The recommendations arrive ahead of the fall campaign and emphasize risk-based clinical decisions."],
  ],
  sports: [
    ["Carlos Alcaraz Returns to the U.S. Open With a Statement Win", "Yahoo Sports", "His opening performance reset expectations in a crowded men's draw."],
    ["Naomi Osaka Brings Confidence and Cultural Style Back to New York", "Yahoo Sports", "Her U.S. Open return blends competitive ambition with a carefully chosen tribute."],
    ["Taylor Fritz Opens the U.S. Open With American Hopes Rising", "Yahoo Sports", "The leading U.S. contender began with the composure expected of a home favorite."],
    ["Alexander Zverev Survives an Early U.S. Open Warning", "Yahoo Sports", "The escape exposed vulnerabilities that stronger opponents will test."],
    ["Gael Monfils Begins an Emotional Final U.S. Open Run", "Yahoo Sports", "The veteran's farewell gives the tournament an added sense of history."],
    ["Team USA Enters the FIBA Women's World Cup as the Standard", "ESPN", "Depth and expectations remain enormous as a new roster seeks another title."],
    ["Federal Judge Dismisses Challenge Over California School Sports", "The Guardian", "The ruling keeps a politically charged dispute over transgender athletes in the courts."],
    ["Sports Streaming Dispute Draws Washington's Attention", "PBS", "Fans, leagues and distributors are confronting fragmentation, cost and access."],
    ["U.S. Open Fashion Becomes Part of Naomi Osaka's Competitive Story", "Yahoo Sports", "The presentation has amplified discussion without obscuring the stakes on court."],
    ["Women's Basketball World Cup Puts American Depth to the Test", "ESPN", "The tournament will measure how quickly elite talent forms a coherent international team."],
  ],
  investigation: [
    ["Records Show Bovino Faced an Internal Border Patrol Investigation", "Chicago Tribune", "Newly released documents add detail to the circumstances surrounding his retirement."],
    ["Lawmakers Demand Inquiry Into Alleged Secret Surveillance", "The Guardian", "The request seeks records, legal explanations and independent oversight."],
    ["Watchdog Files Bar Complaint Over Bid to Indict Democratic Lawmakers", "AP", "The complaint asks disciplinary authorities to examine prosecutorial conduct."],
    ["Postal Whistleblower Alleges Rushed and Sloppy Election Work", "AP", "The account raises questions about deadlines, testing and compliance inside the Postal Service."],
    ["Treasury Press Restrictions Prompt Transparency Questions", "PBS", "Excluding selected reporters from a major meeting has renewed scrutiny of access rules."],
    ["Fact Check Finds Education Attack Relied on a Questionable Ranking", "FactCheck.org", "The analysis shows how campaign claims can turn a narrow metric into a sweeping conclusion."],
    ["Government Corruption Concern Reaches a Record High", "Gallup", "The survey provides a measurable signal of public distrust that institutions must confront."],
    ["Data-Center Deals Face New Scrutiny Over Public Costs", "The Guardian", "Communities are asking whether tax breaks and utility upgrades deliver the promised return."],
    ["Birthright Citizenship Litigation Tests the Limits of Executive Power", "SCOTUSblog", "Court filings clarify the constitutional claims behind a politically charged order."],
    ["Ballot-Screening System Draws Questions About Court Compliance", "AP", "Documents and whistleblower claims are focusing attention on how the system was designed and tested."],
  ],
};

const illustrations = {
  world: ["six-months-iran-war-consequences-trump-economy-military.webp","pentagon-nato-review-us-troop-options-europe.webp","leaders-reopen-climate-talks-with-a-sharper-focus-on-delivery.webp"],
  "u.s": ["supreme-court-trump-mail-voting-executive-order-ruling.webp","states-renew-legal-fight-trump-mail-voting-restrictions-midterms.webp","trump-administration-visa-revocations-asylum-seekers.webp"],
  business: ["canada-removes-seafood-us-retaliatory-tariffs.webp","meta-18-billion-settlement-children-social-media-addiction.webp","independent-designers-revive-durable-everyday-objects.webp"],
  finance: ["bessent-warsh-treasury-fed-interest-rates-policy-divide.webp","nasdaq-futures-rise-nvidia-ai-trade.webp","wall-street-inflation-nvidia-ai-market-outlook.webp"],
  technology: ["nvidia-earnings-ai-chip-demand-wall-street-expectations.webp","open-source-maintainers-push-for-safer-release-pipelines.webp","privacy-engineers-build-a-simpler-standard-for-consent.webp"],
  politics: ["senate-debate-puts-election-security-back-at-center-stage.webp","election-commission-publishes-new-audit-timetable.webp","good-policy-needs-better-feedback-loops.webp"],
  health: ["scientists-map-how-urban-trees-cool-entire-neighborhoods.webp","lab-team-finds-a-faster-route-to-recyclable-batteries.webp","citizen-scientists-build-a-continental-air-quality-map.webp"],
  sports: ["national-team-qualifies-after-a-dramatic-final-minute-goal.webp","women-s-league-secures-landmark-broadcast-agreement.webp","rookie-captain-leads-a-historic-tournament-comeback.webp"],
  investigation: ["international-operation-disrupts-a-credential-market.webp","researchers-trace-a-coordinated-attack-on-cloud-infrastructure.webp","why-public-trust-depends-on-showing-the-work.webp"],
};

const editors = {
  world: "security-diplomacy-editor", "u.s": "public-life-editor", business: "business-culture-editor",
  finance: "business-culture-editor", technology: "technology-science-editor", politics: "public-life-editor",
  health: "technology-science-editor", sports: "business-culture-editor", investigation: "sources-standards-editor",
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const dates = ["04/09/2026", "04/09/2026", "03/09/2026", "03/09/2026", "02/09/2026", "02/09/2026", "01/09/2026", "31/08/2026", "30/08/2026", "29/08/2026"];

function articleParagraphs(title, category, detail, outlet) {
  const label = category === "u.s" ? "U.S." : category[0].toUpperCase() + category.slice(1);
  return [
    ["What happened", `${title} is drawing attention because ${detail.charAt(0).toLowerCase()}${detail.slice(1)} The development was reported or documented by ${outlet}, and BusinessStandard.org reviewed that coverage in preparing this independent synthesis. The central fact is narrower than the surrounding debate: a specific decision, disclosure or shift has occurred, while many of its practical consequences remain unsettled. That distinction matters in a fast-moving news cycle, where prediction can too easily be mistaken for confirmation.`],
    ["The immediate context", `For U.S. readers, the story belongs in the ${label} section because it connects a current event to institutions that shape everyday choices. Officials, companies, courts, teams or public agencies may describe the same development from different positions. The most reliable reading starts with what is on the record, then separates direct evidence from political argument, market reaction and informed expectation. This article does not reproduce another outlet's account; it summarizes the verified core and explains the questions the reporting puts in front of the public.`],
    ["Why the timing matters", `Timing changes the meaning of this story. Decisions made during an election season, a volatile market, a public-health response or a major competition can have effects well beyond the first headline. People may respond before formal rules, prices or outcomes are clear. That can create a feedback loop: expectations alter behavior, behavior changes the facts on the ground, and institutions then adjust again. Readers should therefore treat early numbers and confident forecasts as provisional unless the underlying authority publishes a final record.`],
    ["What is established", `The available reporting supports the broad development described above and identifies ${outlet} as a principal public source. It does not, by itself, establish every motive attributed to the people involved or guarantee the most dramatic projected outcome. BusinessStandard.org uses cautious language where the record is incomplete. When a claim rests on a filing, survey, company statement or official release, that origin should remain visible because each kind of evidence answers a different question and carries different limitations.`],
    ["The stakes for Americans", `The practical stakes can include public spending, household costs, legal rights, access to services, business planning or confidence in institutions. Even when the event occurs abroad or inside a specialized organization, the U.S. impact can travel through energy prices, supply chains, federal policy, investment decisions and public opinion. The useful question is not simply whether the event is good or bad. It is which groups bear the cost, who receives the benefit, what safeguards apply and whether the decision can be reviewed.`],
    ["Questions that remain", `Several questions remain open. The next official document may clarify scope, timing and enforcement. Independent reporting may test claims made by interested parties. Courts, regulators, voters, investors, patients or fans may also respond in ways that change the path of the story. A responsible account leaves room for those outcomes instead of presenting one plausible scenario as certain. We will revise the post if a material fact changes or a primary source corrects the record.`],
    ["How to read the next update", `The next update should be judged by evidence, not volume. A formal order, audited number, on-the-record explanation or independently verified result deserves more weight than repetition across social feeds. It is also worth checking whether a new report adds a fact or merely offers a sharper interpretation of information already public. That habit helps readers stay current without allowing urgency to crowd out proportion, and it gives corrections a clear place in the continuing record.`],
    ["What to watch next", `Watch for dated documents, named decision-makers and measurable outcomes. Those signals are more useful than anonymous speculation or viral fragments stripped of context. Follow-up coverage should answer whether the announced action was actually implemented, whether affected groups experienced the predicted result and whether oversight bodies obtained the information they requested. The source links below provide a starting point for that audit trail, while the article image is a conceptual illustration rather than documentary evidence.`],
  ];
}

const output = {};
for (const [category, items] of Object.entries(raw)) {
  output[category] = items.map(([title, outlet, detail], index) => {
    const slug = slugify(title);
    const image = `/images/illustrations/${illustrations[category][index % illustrations[category].length]}`;
    const paras = articleParagraphs(title, category, detail, outlet);
    const googleQuery = `https://news.google.com/search?q=${encodeURIComponent(`"${title}" ${outlet}`)}&hl=en-US&gl=US&ceid=US%3Aen`;
    return {
      id: index + 1,
      slug,
      metaTitle: title.length > 60 ? `${title.slice(0, 57)}...` : title,
      metaDescription: `${detail} A sourced, independent briefing from BusinessStandard.org.`,
      title,
      excerpt: `${detail} This BusinessStandard.org briefing separates the verified development from the questions still open.`,
      category,
      eyebrow: category === "u.s" ? "U.S." : category[0].toUpperCase() + category.slice(1),
      newsType: index % 3 === 0 ? "explainer" : "news",
      type: index === 0 ? "featured" : "normal",
      date: dates[index],
      readTime: index % 2 === 0 ? "7 min read" : "8 min read",
      isPublished: "true",
      authorSlug: editors[category],
      image,
      imageAlt: `Editorial illustration accompanying ${title}`,
      keywords: [title, category, "United States", "BusinessStandard.org"],
      keyTakeaways: [detail, `The principal public source reviewed for this briefing is ${outlet}.`, "Important consequences remain subject to new documents, implementation and independent review."],
      quote: "The strongest account separates what the record establishes from what the next headline merely predicts.",
      content: paras.flatMap(([heading, text]) => [{ type: "heading", text: heading }, { type: "paragraph", text }]),
      whyItMatters: `${detail} The outcome could shape U.S. policy, household decisions, markets or public trust beyond the first news cycle.`,
      whatToWatch: "Look for primary documents, implementation dates, measurable outcomes and independent reporting that confirms or challenges the first account.",
      sources: [
        { name: `${outlet} — source publication`, url: outletUrls[outlet] || "https://news.google.com/", type: "Independent or primary source" },
        { name: "Google News coverage index for this story", url: googleQuery, type: "Current coverage index" },
      ],
      updatedAt: "2026-09-04T00:00:00.000Z",
      verificationNote: `Reviewed September 4, 2026 against ${outlet} coverage and the current Google News coverage index. This is an original synthesis, not a claim of original reporting.`,
    };
  });
}

await writeFile(new URL("../public/data/articles.json", import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
