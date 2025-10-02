const CANONICAL = require("../utils/canonical");
const TEST = require("../Model/reportModel");

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
