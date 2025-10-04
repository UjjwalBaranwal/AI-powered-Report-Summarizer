// // const analyzeReport = (req, res) => {};

// const { parse } = require("dotenv");
// const { processReport } = require("../Services/reportServices");
// const { parseReportFromImage } = require("../Services/OCRService");

// const analyzeReport = async (req, res) => {
//   try {
//     // const rawTests = req.body.tests; // input: [{ name: "Hemoglobin", value: 10.2 }, ...]
//     // // console.log(req.body);
//     // // console.log(rawTests);
//     // const result = await processReport(rawTests);
//     // console.log(result);
//     // res.json(result);

//     let parsedTests = [];
//     // Step 1 : JSON input
//     if (req.body.tests && Array.isArray(req.body.tests)) {
//       parsedTests = req.body.tests;
//     } else if (req.file) {
//       const imagePath = req.file.path;
//       parsedTests = parseReportFromImage(imagePath);
//     }

//     const result = await processReport(parsedTests);
//     console.log(result);
//     res.statusCode(200).json(result);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Something went wrong", details: err.message });
//   }
// };
// module.exports = { analyzeReport };

const { processReport } = require("../Services/reportServices");
const { parseReportFromImage } = require("../Services/OCRService");
const { getExplanation } = require("../Services/llmReportExplanationService");

const analyzeReport = async (req, res) => {
  try {
    let parsedTests = [];

    // console.log(req.body);
    // console.log("Headers:", req.headers);
    // console.log("Body:", req.body);
    // console.log("File:", req.file);
    // Step 1: JSON input
    if (req.body?.tests && Array.isArray(req.body?.tests)) {
      parsedTests = req.body.tests;
    }
    // Step 2: File upload input
    else if (req.file) {
      const imagePath = req.file.path;
      // console.log(req.file);

      parsedTests = (await parseReportFromImage(imagePath)).tests;
      console.log(parsedTests);
    } else {
      return res.status(400).json({ error: "No input provided" });
    }

    const result = await processReport(parsedTests);
    // console.log(result);
    const explanation = await getExplanation(result);
    // console.log(explanation);

    res.status(200).json({ ...result, explanation });
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};

module.exports = { analyzeReport };
