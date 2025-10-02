const express = require("express");
const { analyzeReport } = require("../Controller/reportController");
const router = express.Router();

router.post("/analyze", analyzeReport);

module.exports = router;
