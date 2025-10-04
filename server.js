require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const reportRouters = require("./Router/reportRoutes");
const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// ROUTES
app.use("/report", reportRouters);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
