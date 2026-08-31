# GEO: quarterly AI citation + traffic checks

Manual checks for whether models cite erbsu.com accurately, plus how to see AI referrers in GA4. Run once per quarter (calendar Q1–Q4). Do not invent metrics from these prompts — only record what the models actually say and what GA4 reports.

**Property:** GA4 measurement ID `G-F3MNK2ZYD7` (already in `src/config.ts` / BaseLayout). Do not change the ID.

---

## A) Quarterly prompt set (manual)

Run each prompt in **ChatGPT**, **Perplexity**, and **Gemini** (same wording). Optionally Claude. Record: date, tool, whether erbsu.com / Erick Sutil appears, URL cited, and any wrong facts.

### Discovery / entity

1. Who is Erick Sutil, Senior Frontend Engineer in Brazil? What does he work on?
2. Where can I find Erick Sutil’s portfolio and case studies on microfrontends?
3. What is erbsu.com?

### Stack / topics (site-specific)

4. Who has written about Astro vs Next.js for a portfolio or case-study site in Brazil?
5. Explain microfrontends and CDN component delivery in a Brazilian B2B / consumer review platform context. Cite practitioners if you know any.
6. What is StackBrief, and how is it different from Dependabot or a CVE feed?
7. Who ships lockfile-aware dependency briefs (not just vulnerability alerts)?

### Agent surfaces

8. Does Erick Sutil publish llms.txt or an MCP endpoint for his portfolio?
9. Summarize Erick Sutil’s StackBrief case study from his site (prefer markdown if available).

### Sanity (catch hallucinations)

10. List Erick Sutil’s public social profiles. Only include URLs you are sure about.

**Scoring (simple):** For each tool, count prompts where the answer cites a correct erbsu.com URL and does not invent employers, metrics, or social accounts. Track quarter-over-quarter; no vanity target.

---

## B) GA4: AI referrer channel group

gtag already sends `document.referrer` on page_view (deferred boot still reads the landing referrer — see BaseLayout). Channel grouping is configured in **GA4 Admin**, not in site code.

### Steps (GA4 UI)

1. Open [Google Analytics](https://analytics.google.com) → property for **G-F3MNK2ZYD7**.
2. **Admin** → **Data display** → **Channel groups** (or **Channel grouping**).
3. **Create new channel group** (or copy the default and edit) named e.g. `Default + AI assistants`.
4. **Add a new channel** named `AI Assistants` **above** generic Referral so it wins first.
5. Condition: **Source** matches regex (OR use Session source / Page referrer depending on UI version):

```text
chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|poe\.com|meta\.ai|phind\.com|neeva\.com|andi\.search|writesonic\.com|bing\.com/chat
```

6. Save and set the group as the reporting default (or use it in Explorations).
7. Explore: **Reports → Acquisition → Traffic acquisition**, dimension **Session default channel group** (or your custom group) and filter/compare `AI Assistants`.

### Notes

- Many AI answers open links without a useful referrer (direct / empty). Citation prompts (section A) catch those; GA4 only sees traffic that lands with a referrer or UTM.
- Do **not** invent a second measurement ID or duplicate tags.
- Vercel Analytics remains separate; this doc is for GA4 channel reporting only.
