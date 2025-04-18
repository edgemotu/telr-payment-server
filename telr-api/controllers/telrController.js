const axios = require("axios");
const {
  TELR_STORE_ID,
  TELR_AUTH_KEY,
  TELR_API_URL,
} = require("../config/telr");

// CHECK PAYMENT STATUS
exports.checkTelrPayment = async (req, res) => {
  const { orderRef } = req.body;

  if (!orderRef) {
    return res.status(400).json({ error: "Missing order reference" });
  }

  const payload = {
    method: "check",
    store: TELR_STORE_ID,
    authkey: TELR_AUTH_KEY,
    order: {
      ref: orderRef,
    },
  };

  // Telr Status Code Mapping
  const statusMap = {
    1: "Pending",
    2: "Authorised",
    3: "Paid",
    4: "Payment Requested",
    "-1": "Expired",
    "-2": "Cancelled",
    "-3": "Declined",
    "-4": "Replaced",
  };

  try {
    const telrResponse = await axios.post(TELR_API_URL, payload);
    const telrData = telrResponse.data;

    // If there's an error in the Telr response
    if (telrData?.error) {
      return res.status(400).json({ error: telrData.error });
    }

    const code = telrData?.order?.status?.code;
    const status = statusMap[code] || "Unknown";

    // Return structured and human-readable status
    res.status(200).json({
      statusCode: code,
      status: status,
      data: telrData.order,
    });
  } catch (error) {
    console.error("Telr Check Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to check Telr payment status" });
  }
};

// CREATE PAYMENT
exports.createTelrPayment = async (req, res) => {
  const { orderId, amount, cartid, currency, description } = req.body;

  if (!orderId || !amount || !cartid || !currency || !description) {
    return res.status(400).json({ error: "Missing required payment fields" });
  }

  const payload = {
    method: "create",
    store: TELR_STORE_ID,
    authkey: TELR_AUTH_KEY,
    order: {
      cartid: cartid,
      test: "1",
      currency: currency,
      description: description,
      ref: orderId,
      amount: amount,
    },
    return: {
      authorised: "https://yourdomain.com/authorised",
      declined: "https://yourdomain.com/declined",
      cancelled: "https://yourdomain.com/cancelled",
    },
  };

  try {
    const telrRes = await axios.post(TELR_API_URL, payload);
    const telrData = telrRes.data;

    if (telrData?.order?.url) {
      res.status(200).json(telrData);
    } else {
      res.status(400).json({
        error: "Failed to generate payment URL",
        details: telrData,
      });
    }
  } catch (error) {
    console.error("Telr Create Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Telr API request failed" });
  }
};
