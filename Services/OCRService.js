const Tesseract = require("tesseract.js");
const fuzz = require("fuzzball");

const { canonicalTests } = require("../utils/canonical");

/**
 * Extracts structured tests from a report image
 */
async function parseReportFromImage(imagePath) {
  const {
    data: { text },
  } = await Tesseract.recognize(imagePath, "eng");
  console.log("OCR Raw Text:", text);

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let structuredTests = [];

  for (const line of lines) {
    // regex for number + unit
    const match = line.match(/([a-zA-Z]+)\s*([\d.]+)\s*([a-zA-Z/μ%]+)?/);

    if (match) {
      const rawName = match[1];
      const value = parseFloat(match[2]);
      const unit = match[3] || "";

      // fuzzy match name
      const bestMatch = fuzz.extract(rawName, canonicalTests, {
        scorer: fuzz.ratio,
      })[0];
      if (bestMatch && bestMatch[1] > 80) {
        structuredTests.push({
          name: bestMatch[0],
          value: value,
          unit: unit,
        });
      }
    }
  }

  return { tests: structuredTests };
}

module.exports = { parseReportFromImage };
