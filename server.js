// const express = require("express");
// const axios = require("axios");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // Replace with your actual Telr credentials
// const TELR_STORE_ID = "31857";
// const TELR_AUTH_KEY = "jzTF~xqs7Z#4rrbK";

// app.post("/create-telr-payment", async (req, res) => {
//   const { orderId, amount, cartid, currency, description } = req.body;

//   const payload = {
//     method: "create",
//     store: TELR_STORE_ID,
//     authkey: TELR_AUTH_KEY,
//     order: {
//       cartid: cartid,
//       test: "1",
//       currency: currency,
//       description: description,
//       ref: orderId,
//       amount: amount,
//     },

//     return_auth: "https://yourdomain.com/telr-success",
//     return_can: "https://yourdomain.com/telr-cancel",
//     return_decl: "https://yourdomain.com/telr-failed",
//   };

//   try {
//     const telrRes = await axios.post(
//       "https://secure.telr.com/gateway/order.json",
//       payload
//     );

//     const telrData = telrRes.data;

//     if (telrData?.order?.url) {
//       res.status(200).json(telrData); // Send full response
//     } else {
//       res.status(400).json({
//         error: "Failed to generate payment URL",
//         details: telrData,
//       });
//     }
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: "Telr API request failed" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
