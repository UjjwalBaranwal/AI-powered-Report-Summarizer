// const analyzeReport = (req, res) => {};

const { processReport } = require("../Services/reportServices");

const analyzeReport = async (req, res) => {
  try {
    const rawTests = req.body.tests; // input: [{ name: "Hemoglobin", value: 10.2 }, ...]
    // console.log(req.body);

    // console.log(rawTests);

    const result = await processReport(rawTests);
    console.log(result);

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};
module.exports = { analyzeReport };
