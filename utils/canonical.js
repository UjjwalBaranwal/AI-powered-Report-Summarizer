CANONICAL = {
  Hemoglobin: { unit: "g/dL", ref_low: 12.0, ref_high: 15.0 },
  WBC: { unit: "/uL", ref_low: 4000, ref_high: 11000 },
  "Cholesterol (Total)": { unit: "mg/dL", ref_low: 125, ref_high: 200 },
  "SGPT (ALT)": { unit: "U/L", ref_low: 7, ref_high: 55 },
  Creatinine: { unit: "mg/dL", ref_low: 0.6, ref_high: 1.2 },
};

const canonicalTests = Object.keys(CANONICAL);

module.exports = { CANONICAL, canonicalTests };
