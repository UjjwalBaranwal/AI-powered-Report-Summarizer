const { CANONICAL } = require("../utils/canonical");
const Test = require("../Model/reportModel");

// function to normalize the single test
function normalizeTest(name, value) {
  const canonical = CANONICAL[name];
  if (!canonical) return null;
  let status = "NORMAL";
  if (value < canonical.ref_low) status = "LOW";
  else if (value > canonical.ref_high) status = "HIGH";

  return new Test(name, value, canonical.unit, status, {
    low: canonical.ref_low,
    high: canonical.ref_high,
  });
}

// Build the test summary

function buildSummary(tests) {
  const highlights = tests
    .filter((t) => t.status !== "NORMAL")
    .map((t) => `${t.status} ${t.name.toLowerCase()}`);

  return highlights.length
    ? highlights.join(" and ")
    : "All values are within normal ranges";
}

// Main function to process the raw test that come from the input

async function processReport(rawTests) {
  console.log(rawTests);

  const normalized = rawTests
    .map((t) => normalizeTest(t.name, t.value))
    .filter(Boolean);

  if (normalized.length === 0) {
    return {
      status: "unprocessed",
      reason: "hallucinated tests not present in input",
    };
  }

  return {
    tests: normalized,
    summary: buildSummary(normalized),
    status: "ok",
  };
}

module.exports = { processReport };
