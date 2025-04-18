// routes/telr.js
const express = require("express");
const router = express.Router();
const telrController = require("../controllers/telrController");

router.post("/create-payment", telrController.createTelrPayment);
router.post("/check-payment", telrController.checkTelrPayment);

module.exports = router;
