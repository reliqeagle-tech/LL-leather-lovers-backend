// import axios from "axios";

// export const getPayPalAccessToken = async () => {
//   const response = await axios({
//     url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
//     method: "post",
//     auth: {
//       username: process.env.PAYPAL_CLIENT_ID,
//       password: process.env.PAYPAL_CLIENT_SECRET,
//     },
//     params: {
//       grant_type: "client_credentials",
//     },
//   });

//   return response.data.access_token;
// };



import axios from "axios";

export const getPayPalAccessToken = async () => {
  try {
    console.log("🔐 Requesting PayPal access token...");
    
    // Create Basic Auth header
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("✅ Access token obtained");
    return response.data.access_token;

  } catch (error) {
    console.error("❌ PayPal Token Error:", error.response?.data || error.message);
    throw new Error("Failed to get PayPal access token");
  }
};