/**
 * tax_engine.js
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all Federal and California tax logic.
 * Used by: retirement_calculator.html, tax_calculator.html
 *
 * Public API:
 *   computeTax({ conv, w401, rmd, totalSS_yr, fedDed, caDed, caEx, isRetired })
 *   → { nonSsInc, provInc, taxSsFed, fedAgi, fedTaxableInc, fedTax,
 *       caAdjInc, caTaxableInc, caTaxRaw, caTax, totalTax_yr }
 *
 *   FED_BRACKETS  — Federal tax bracket array (also aliased as FED)
 *   CA_BRACKETS   — California tax bracket array (also aliased as CA)
 *   taxCalc(inc, brackets) — progressive bracket calculator
 * ─────────────────────────────────────────────────────────────────
 */

// ── Tax Brackets ────────────────────────────────────────────────
const FED_BRACKETS = [
  { lo: 0,       hi: 24800,   r: 0.10 },
  { lo: 24800,   hi: 100800,  r: 0.12 },
  { lo: 100800,  hi: 211400,  r: 0.22 },
  { lo: 211400,  hi: 403550,  r: 0.24 },
  { lo: 403550,  hi: 512450,  r: 0.32 },
  { lo: 512450,  hi: 768700,  r: 0.35 },
  { lo: 768700,  hi: 1e18,    r: 0.37 }
];

const CA_BRACKETS = [
  { lo: 0,        hi: 22158,   r: 0.010 },
  { lo: 22158,    hi: 52528,   r: 0.020 },
  { lo: 52528,    hi: 82904,   r: 0.040 },
  { lo: 82904,    hi: 115084,  r: 0.060 },
  { lo: 115084,   hi: 145448,  r: 0.080 },
  { lo: 145448,   hi: 742958,  r: 0.093 },
  { lo: 742958,   hi: 891542,  r: 0.103 },
  { lo: 891542,   hi: 1485906, r: 0.113 },
  { lo: 1485906,  hi: 1e18,    r: 0.123 }
];

// Aliases used by retirement_calculator.html (FED / CA)
const FED = FED_BRACKETS;
const CA  = CA_BRACKETS;

// ── Core bracket calculator ──────────────────────────────────────
/**
 * Progressive tax calculation.
 * @param {number} inc  - Taxable income
 * @param {Array}  br   - Bracket array (FED_BRACKETS or CA_BRACKETS)
 * @returns {number}      Tax amount (rounded)
 */
function taxCalc(inc, br) {
  if (inc <= 0) return 0;
  let t = 0;
  for (const b of br) {
    if (inc <= b.lo) break;
    t += (Math.min(inc, b.hi) - b.lo) * b.r;
  }
  return Math.round(t);
}

// Alias used by tax_calculator.html
const calculateTax = taxCalc;

// ── Main tax computation ─────────────────────────────────────────
/**
 * Compute Federal and California taxes for one year.
 *
 * @param {object} p
 *   p.conv        {number} Roth conversion amount
 *   p.w401        {number} 401(k) withdrawal amount
 *   p.rmd         {number} RMD amount
 *   p.totalSS_yr  {number} Total Social Security income (both spouses)
 *   p.fedDed      {number} Federal standard deduction
 *   p.caDed       {number} CA itemized deduction
 *   p.caEx        {number} CA personal exemption credit
 *   p.isRetired   {boolean} Tax applies only in retirement
 *
 * @returns {object}
 *   nonSsInc      Non-SS income (conv + w401 + rmd)
 *   provInc       Provisional income (IRS MFJ formula)
 *   taxSsFed      Federally taxable portion of SS
 *   fedAgi        Federal AGI
 *   fedTaxableInc Federal ordinary taxable income (after std deduction)
 *   fedTax        Federal income tax
 *   caAdjInc      CA adjusted income (SS excluded — CA does not tax SS)
 *   caTaxableInc  CA taxable income (after itemized deduction)
 *   caTaxRaw      CA tax before personal exemption credit
 *   caTax         CA tax after personal exemption credit
 *   totalTax_yr   Federal + CA combined
 */
function computeTax({ conv, w401, rmd, totalSS_yr, fedDed, caDed, caEx, isRetired }) {

  // Non-SS income = Roth conversion + 401k withdrawal + RMD
  const nonSsInc = (isRetired ? (conv + w401) : 0) + rmd;

  // Provisional Income = non-SS income + 50% of SS  (IRS MFJ formula)
  const provInc = nonSsInc + (totalSS_yr * 0.5);

  // ── Federal SS Taxability ──────────────────────────────────────
  // provInc > $44,000  →  taxable SS = SS × 85%  (flat — per Google Sheet)
  // provInc > $32,000  →  taxable SS = min(SS × 50%, (provInc − 32000) × 50%)
  // provInc ≤ $32,000  →  taxable SS = $0
  let taxSsFed = 0;
  if (provInc > 44000) {
    taxSsFed = Math.round(totalSS_yr * 0.85);
  } else if (provInc > 32000) {
    taxSsFed = Math.round(Math.min(totalSS_yr * 0.5, (provInc - 32000) * 0.5));
  }

  // ── Federal AGI & Tax ──────────────────────────────────────────
  // Fed AGI = non-SS income + taxable SS portion
  const fedAgi        = nonSsInc + taxSsFed;
  const fedTaxableInc = Math.max(0, fedAgi - fedDed);
  const fedTax        = isRetired ? taxCalc(fedTaxableInc, FED_BRACKETS) : 0;

  // ── California ─────────────────────────────────────────────────
  // CA does NOT tax SS — CA Adj Income = non-SS income only
  const caAdjInc      = nonSsInc;
  const caTaxableInc  = Math.max(0, caAdjInc - caDed);
  const caTaxRaw      = isRetired ? taxCalc(caTaxableInc, CA_BRACKETS) : 0;
  const caTax         = Math.max(0, caTaxRaw - caEx);

  const totalTax_yr   = fedTax + caTax;

  return {
    nonSsInc,
    provInc,
    taxSsFed,
    fedAgi,
    fedTaxableInc,
    fedTax,
    caAdjInc,
    caTaxableInc,
    caTaxRaw,
    caTax,
    totalTax_yr
  };
}
