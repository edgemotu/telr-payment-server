const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const telrRoutes = require("./telr-api/routes/telr");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/telr", telrRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
