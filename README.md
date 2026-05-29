# 🏡 Retire Wise and Live Happy

> *"You don't retire out of something — you retire into something."*

A personal retirement education website built for people who want to understand their finances deeply, plan thoughtfully, and retire with confidence.

**Live site:** [https://wise-retiree.com](https://wise-retiree.com)  
**GitHub Pages URL:** [https://sriramhelpsretire.github.io](https://sriramhelpsretire.github.io) (redirects to the custom domain)

---

## 📖 What This Is

**Retire Wise and Live Happy** is a pocket guide to retirement planning — a curated collection of educational content and interactive calculators covering everything from the basics of retirement to Medicare, healthcare coverage, long-term care, tax planning, and portfolio management.

The content is written at a CFP-curriculum level but presented in plain language so anyone can follow along and make informed decisions — whether working with a financial advisor or navigating retirement independently.

---

## 🗂️ Site Structure

### 📌 Core Planning
| Page | File | Description |
|---|---|---|
| Home | `index.html` | Welcome page with site overview and calculator launch pad |
| Retirement Made Easy | `transition_plan.html` | Working years vs. retirement — the key shift |
| What is Retirement? | `retirement_plan.html` | Phases, definitions, and who to work with |
| Steps in Retirement | `steps_retirement.html` | 12-step accordion guide to retirement planning |
| Financial Plan | `financial_plan.html` | The 6 pillars of comprehensive financial planning |
| Terms Used | `terms.html` | Glossary of key retirement and financial terms |
| Web Sites | `website.html` | Curated list of trusted external resources |
| FAQ | `faq.html` | Frequently asked retirement planning questions |

### 🧮 Calculators
| Calculator | File | Description |
|---|---|---|
| Portfolio Manager | `Portfolio_Tracker_Generic.html` | Track all holdings across accounts; imports/exports CSV; live price refresh via Finnhub API |
| Retirement Calculator | `retirement_calculator.html` | Projects portfolio growth from today through retirement |
| Retirement Confidence | `montecarlo_retirement.html` | Monte Carlo simulator — stress tests whether your money lasts a lifetime |
| 401k Compounding | `401k_compounding.html` | Shows the power of early, consistent investing over time |
| Income Tax Calculator | `tax_calculator.html` | Side-by-side comparison of 4 retirement tax scenarios |

### 🩺 Healthcare
| Page | File | Description |
|---|---|---|
| Medicare Hub | `medicare_aca.html` | Overview of all 4 Medicare parts with links to detail pages |
| Healthcare – Medicare | `healthcare_medicare.html` | IRMAA tables, enrollment windows, 2-year look-back rule |
| Healthcare – ACA | `healthcare_aca.html` | ACA marketplace, subsidies, California Covered CA, enrollment dates |
| ACA vs COBRA | `aca_vs_cobra.html` | When to pick each, hybrid strategy, pros and cons |
| Medicare Flowchart | `medicare_flowchart.html` | Medigap, inpatient vs. observation, coverage details |
| Long Term Care | `long_term_care.html` | LTC types, real costs by care level, who pays and how |

---

## 🔍 SEO maintenance

- **`sitemap.xml`** — lists all public pages with canonical URLs on [wise-retiree.com](https://wise-retiree.com); referenced in `robots.txt`.
- **`.nojekyll`** — disables Jekyll on GitHub Pages so static files (including `sitemap.xml`) are served as-is.
- **Meta tags** — each public HTML page includes meta description, canonical URL, Open Graph, and Twitter Card tags. Social preview image: `index_pic.jpg`.
- **Refresh meta tags** — from the repo root, run `python scripts/inject-seo.py` or `powershell -ExecutionPolicy Bypass -File scripts/inject-seo.ps1` after changing page titles or descriptions.

---

## 🧮 Calculator Details

### Portfolio Manager
- Add holdings manually or import via CSV
- Download the `Portfolio_Generic.csv` template to get started
- Live price refresh using a free [Finnhub API key](https://finnhub.io)
- Query portfolio by ticker, account, or asset type
- Pre-fills values into Retirement Calculator and Retirement Confidence when open simultaneously

### Retirement Confidence (Monte Carlo Simulator)
- Three-phase retirement model: Pre-Social Security → Post-Social Security → RMD phase
- Three-bucket strategy: Brokerage/Bonds, 401k/Traditional IRA, Roth IRA
- Roth IRA treated as legacy asset (never drawn down)
- Failure defined as Brokerage + Bonds and 401k both reaching zero
- Runs thousands of simulations to show probability of portfolio survival

### Income Tax Calculator
- Covers 4 key retirement tax scenarios in one view
- Built on a shared tax engine for consistency across all calculators
- Covers AGI, Social Security taxation, IRMAA, Roth conversion impacts

---

## 🛠️ Technical Notes

- Built with plain **HTML, CSS, and JavaScript** — no frameworks or build tools
- Hosted on **GitHub Pages** with custom domain **wise-retiree.com**
- Shared tax logic lives in `js/tax_engine.js` — used across multiple calculators
- All pages use a consistent navigation dropdown (three groups: Core Planning, Calculators, Healthcare)
- Optimized for both **mobile and desktop** (calculators work best on desktop)
- Portfolio CSV template: `Portfolio_Generic.csv` — must be in the root of the repo

---

## 📁 Repository Structure

```
/
├── index.html
├── transition_plan.html
├── retirement_plan.html
├── steps_retirement.html
├── financial_plan.html
├── faq.html
├── medicare_aca.html
├── healthcare_medicare.html
├── healthcare_aca.html
├── aca_vs_cobra.html
├── medicare_flowchart.html
├── long_term_care.html
├── terms.html
├── website.html
├── Portfolio_Tracker_Generic.html
├── Portfolio_Generic.csv
├── retirement_calculator.html
├── montecarlo_retirement.html
├── 401k_compounding.html
├── tax_calculator.html
├── sitemap.xml
├── robots.txt
├── .nojekyll
├── js/
│   └── tax_engine.js
├── scripts/
│   ├── inject-seo.py
│   └── inject-seo.ps1
└── *.jpg
```

---

## ⚠️ Disclaimer

This website is for **educational purposes only** and does not constitute financial, tax, or legal advice. All calculators use assumptions and projections that may not reflect actual market conditions. Please consult a qualified CFP, CPA, or investment advisor before making financial decisions.

---

## 👤 Author

**Sriram Gopalaratnam**  
© 2026 All Rights Reserved.

---

## 🚧 Work in Progress

This site is actively being developed. Planned additions include:
- Case studies with real-world retirement scenarios
- Additional calculators
- Expanded content on estate planning and Social Security optimization
