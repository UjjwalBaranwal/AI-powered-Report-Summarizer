const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const { analyzeReport } = require("../Controller/reportController");

router.post("/analyze", upload.single("file"), analyzeReport); // this single route can handle both image and text both
router.post("/analyze-file", upload.single("file"), analyzeReport);
router.post("/analyze-json", analyzeReport);
module.exports = router;
