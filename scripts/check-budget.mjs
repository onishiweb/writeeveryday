/**
 * Performance budget checker.
 *
 * Reads perf-budget.json, measures gzipped sizes of build/client/assets/*,
 * reports pass/fail against each budget, and writes a snapshot to
 * .budget-results.json for tracking over time.
 *
 * Usage:
 *   npm run budget           — check budget against existing build
 *   npm run build:budget     — build then check
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { gzipSync } from "zlib";
import { join, basename } from "path";

const ASSETS_DIR = "build/client/assets";
const BUDGET_FILE = "perf-budget.json";
const RESULTS_FILE = ".budget-results.json";

// Convert a simple glob (e.g. "*.js", "entry.client-*.js") to a RegExp.
function globToRegex(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`);
}

function getMatchingFiles(pattern) {
  if (!existsSync(ASSETS_DIR)) return [];
  const regex = globToRegex(pattern);
  return readdirSync(ASSETS_DIR)
    .filter((f) => regex.test(f))
    .map((f) => join(ASSETS_DIR, f));
}

function gzippedSizeKb(filePath) {
  return gzipSync(readFileSync(filePath)).length / 1000;
}

function formatSize(kb) {
  return kb >= 1000 ? `${(kb / 1000).toFixed(2)} MB` : `${kb.toFixed(2)} kB`;
}

function bar(ratio, width = 30) {
  const filled = Math.min(Math.round(ratio * width), width);
  const over = ratio > 1;
  const fill = over ? "█".repeat(width) + "▓".repeat(Math.round((ratio - 1) * width)) : "█".repeat(filled) + "░".repeat(width - filled);
  return over ? fill : fill;
}

// ─── Load budget ──────────────────────────────────────────────────────────────

if (!existsSync(BUDGET_FILE)) {
  console.error(`✗ ${BUDGET_FILE} not found`);
  process.exit(1);
}

if (!existsSync(ASSETS_DIR)) {
  console.error(`✗ ${ASSETS_DIR} not found — run 'npm run build' first`);
  process.exit(1);
}

const { budgets } = JSON.parse(readFileSync(BUDGET_FILE, "utf-8"));

// ─── Check each budget ────────────────────────────────────────────────────────

const results = [];
let allPassed = true;

const LINE = "─".repeat(62);

console.log(`\n📊  Performance Budget\n${LINE}`);

for (const entry of budgets) {
  const files = getMatchingFiles(entry.pattern);
  const fileBreakdown = files.map((f) => ({ name: basename(f), sizeKb: gzippedSizeKb(f) }));
  const totalKb = fileBreakdown.reduce((sum, f) => sum + f.sizeKb, 0);
  const passed = totalKb <= entry.maxSizeKb;
  const ratio = totalKb / entry.maxSizeKb;
  const diff = Math.abs(totalKb - entry.maxSizeKb);

  if (!passed) allPassed = false;

  results.push({
    name: entry.name,
    pattern: entry.pattern,
    actualKb: parseFloat(totalKb.toFixed(2)),
    budgetKb: entry.maxSizeKb,
    passed,
    files: fileBreakdown.map((f) => ({ ...f, sizeKb: parseFloat(f.sizeKb.toFixed(2)) })),
  });

  const icon = passed ? "✓" : "✗";
  const status = passed
    ? `${formatSize(diff)} under budget`
    : `${formatSize(diff)} OVER BUDGET`;

  console.log(`\n${icon}  ${entry.name}`);
  if (entry.description) console.log(`   ${entry.description}`);
  console.log(`   ${bar(ratio)}  ${formatSize(totalKb)} / ${formatSize(entry.maxSizeKb)}  (${status})`);

  for (const f of fileBreakdown) {
    console.log(`   · ${f.name}: ${formatSize(f.sizeKb)}`);
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${LINE}`);

if (allPassed) {
  console.log("✓  All budgets passed\n");
} else {
  const failed = results.filter((r) => !r.passed).map((r) => r.name);
  console.log(`✗  Budget exceeded: ${failed.join(", ")}\n`);
}

// ─── Save results snapshot ────────────────────────────────────────────────────

const snapshot = {
  timestamp: new Date().toISOString(),
  passed: allPassed,
  results,
};

const history = existsSync(RESULTS_FILE)
  ? JSON.parse(readFileSync(RESULTS_FILE, "utf-8"))
  : [];

history.push(snapshot);
writeFileSync(RESULTS_FILE, JSON.stringify(history, null, 2));
console.log(`Results appended to ${RESULTS_FILE}\n`);

if (!allPassed) process.exit(1);
