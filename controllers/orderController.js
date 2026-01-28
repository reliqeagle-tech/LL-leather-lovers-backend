// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from 'stripe'
// import razorpay from 'razorpay'
// import axios from "axios";
// import { getPayPalAccessToken } from "../utils/paypal.js";
// // import { getPayPalAccessToken } from "../utils/paypal.js";

// // global variables
// const currency = 'inr'
// const deliveryCharge = 10

// // gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET,
// })

// // Placing orders using COD Method
// const placeOrder = async (req, res) => {
//   try {
//     // Log the raw request body
//     console.log('RAW REQUEST BODY:', JSON.stringify(req.body, null, 2));
    
//     const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
    
//     // Get userId from the authenticated user (from auth middleware OR body)
//     const userId = req.userId || req.body.userId;

//     // Validate all required fields
//     if (!userId) {
//       return res.json({ success: false, message: "User ID is required" });
//     }
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.json({ success: false, message: "Items are required" });
//     }
//     if (!address) {
//       return res.json({ success: false, message: "Address is required" });
//     }

//     // Log what we extracted
//     console.log('EXTRACTED VALUES:', {
//       userId,
//       itemsCount: items?.length,
//       subtotal: typeof subtotal,
//       discountTotal: typeof discountTotal,
//       shipping: typeof shipping,
//       finalAmount: typeof finalAmount,
//       subtotalValue: subtotal,
//       discountTotalValue: discountTotal,
//       shippingValue: shipping,
//       finalAmountValue: finalAmount
//     });

//     // Check for NaN values before creating order
//     if (isNaN(subtotal) || isNaN(discountTotal) || isNaN(shipping) || isNaN(finalAmount)) {
//       console.error('NaN DETECTED IN BACKEND!', { subtotal, discountTotal, shipping, finalAmount });
//       return res.json({ success: false, message: "Invalid order amounts" });
//     }

//     const orderData = {
//       userId,
//       items,
//       address,
//       subtotal: Number(subtotal),
//       discountTotal: Number(discountTotal),
//       shipping: Number(shipping),
//       finalAmount: Number(finalAmount),
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now()
//     };

//     console.log('ORDER DATA TO SAVE:', JSON.stringify(orderData, null, 2));

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({ success: true, message: "Order Placed" });
//   } catch (error) {
//     console.error('PLACE ORDER ERROR:', error);
//     res.json({ success: false, message: error.message });
//   }
// };


// // Placing orders using Stripe Method
// const placeOrderStripe = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;
//         const { origin } = req.headers;

//         console.log('Stripe order data:', { items, address, subtotal, discountTotal, shipping, finalAmount, userId });

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Stripe",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:item.name
//                 },
//                 unit_amount: Math.round(item.finalPrice * 100)
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:'Delivery Charges'
//                 },
//                 unit_amount: deliveryCharge * 100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         })

//         res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // Verify Stripe 
// const verifyStripe = async (req,res) => {

//     const { orderId, success, userId } = req.body

//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, {payment:true});
//             await userModel.findByIdAndUpdate(userId, {cartData: {}})
//             res.json({success: true});
//         } else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
        
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// // Placing orders using Razorpay Method
// const placeOrderRazorpay = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;

//         console.log('Razorpay order data:', { items, address, subtotal, discountTotal, shipping, finalAmount, userId });

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Razorpay",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const options = {
//             amount: Math.round(finalAmount * 100),
//             currency: currency.toUpperCase(),
//             receipt : newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error,order)=>{
//             if (error) {
//                 console.log(error)
//                 return res.json({success:false, message: error})
//             }
//             res.json({success:true,order})
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyRazorpay = async (req,res) => {
//     try {
        
//         const { userId, razorpay_order_id  } = req.body

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if (orderInfo.status === 'paid') {
//             await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//             await userModel.findByIdAndUpdate(userId,{cartData:{}})
//             res.json({ success: true, message: "Payment Successful" })
//         } else {
//              res.json({ success: false, message: 'Payment Failed' });
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }



// // const placeOrderPaypal = async (req, res) => {
// //   try {
// //     const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
// //     const userId = req.body.userId || req.userId;

// //     const orderData = {
// //       userId,
// //       items,
// //       address,
// //       subtotal,
// //       discountTotal,
// //       shipping,
// //       finalAmount,
// //       paymentMethod: "PayPal",
// //       payment: false,
// //       date: Date.now()
// //     };

// //     const newOrder = new orderModel(orderData);
// //     await newOrder.save();

// //     const accessToken = await getPayPalAccessToken();

// //     const response = await axios.post(
// //       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
// //       {
// //         intent: "CAPTURE",
// //         purchase_units: [
// //           {
// //             reference_id: newOrder._id.toString(),
// //             amount: {
// //               currency_code: "USD",
// //             //   value: finalAmount.toFixed(2),
// //             value: Number(finalAmount).toFixed(2),

// //             },
// //           },
// //         ],
// //       },
// //       {
// //         headers: {
// //             "Content-Type": "application/json",
// //           Authorization: `Bearer ${accessToken}`,
// //         },
// //       } 
// //     );

// //     res.json({ success: true, orderID: response.data.id });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// const placeOrderPaypal = async (req, res) => {
//   try {
//     const accessToken = await getPayPalAccessToken();

//     const response = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
//       {
//         intent: "CAPTURE",
//         purchase_units: [
//           {
//             amount: {
//               currency_code: "USD",
//               value: Number(req.body.finalAmount).toFixed(2),
//             },
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ success: true, orderID: response.data.id });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };



// // const verifyPaypal = async (req, res) => {
// //   try {
// //     const { orderID, userId } = req.body;

// //     const accessToken = await getPayPalAccessToken();

// //     const response = await axios.post(
// //       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
// //       {},
// //       {
// //         headers: {
// //             "Content-Type": "application/json",
// //           Authorization: `Bearer ${accessToken}`,
// //         },
// //       }
// //     );

// //     if (response.data.status === "COMPLETED") {
// //       const referenceId =
// //         response.data.purchase_units[0].reference_id;

// //       await orderModel.findByIdAndUpdate(referenceId, {
// //         payment: true,
// //       });

// //       await userModel.findByIdAndUpdate(userId, { cartData: {} });

// //       res.json({ success: true, message: "Payment Successful" });
// //     } else {
// //       res.json({ success: false, message: "Payment not completed" });
// //     }
// //   } catch (error) {
// //     console.error(
// //   "PAYPAL ERROR:",
// //   error.response?.data || error.message
// // );

// //     res.json({ success: false, message: error.message });
// //   }
// // };


// const verifyPaypal = async (req, res) => {
//   try {
//     const { orderID, userId, orderData } = req.body;

//     const accessToken = await getPayPalAccessToken();

//     const response = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.data.status === "COMPLETED") {

//       const newOrder = new orderModel({
//         ...orderData,
//         paymentMethod: "PayPal",
//         payment: true,
//         date: Date.now(),
//       });

//       await newOrder.save();
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });

//       res.json({ success: true });
//     } else {
//       res.json({ success: false });
//     }
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };



// // All Orders data for Admin Panel
// const allOrders = async (req,res) => {

//     try {
        
//         const orders = await orderModel.find({})
//         res.json({success:true,orders})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// // User Order Data For Forntend
// const userOrders = async (req,res) => {
//     try {
        
//         const { userId } = req.body

//         const orders = await orderModel.find({ userId })
//         res.json({success:true,orders})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // update order status from Admin Panel
// const updateStatus = async (req,res) => {
//     try {
        
//         const { orderId, status } = req.body

//         await orderModel.findByIdAndUpdate(orderId, { status })
//         res.json({success:true,message:'Status Updated'})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderPaypal, verifyPaypal, allOrders, userOrders, updateStatus}


// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from 'stripe'
// import razorpay from 'razorpay'
// import axios from "axios";
// import { getPayPalAccessToken } from "../utils/paypal.js";

// // global variables
// const currency = 'inr'
// const deliveryCharge = 10

// // gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET,
// })

// // ==========================================
// // PLACE ORDER - COD
// // ==========================================
// const placeOrder = async (req, res) => {
//   try {
//     const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//     const userId = req.body.userId || req.userId;

//     // Validation
//     if (!userId || !items?.length || !address) {
//       return res.json({ success: false, message: "Missing required fields" });
//     }

//     const orderData = {
//       userId,
//       items,
//       address,
//       subtotal: Number(subtotal),
//       discountTotal: Number(discountTotal),
//       shipping: Number(shipping),
//       finalAmount: Number(finalAmount),
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now()
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({ success: true, message: "Order Placed" });
//   } catch (error) {
//     console.error('PLACE ORDER ERROR:', error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ==========================================
// // STRIPE
// // ==========================================
// const placeOrderStripe = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;
//         const { origin } = req.headers;

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Stripe",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:item.name
//                 },
//                 unit_amount: Math.round(item.finalPrice * 100)
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:'Delivery Charges'
//                 },
//                 unit_amount: deliveryCharge * 100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         })

//         res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyStripe = async (req,res) => {
//     const { orderId, success, userId } = req.body
//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, {payment:true});
//             await userModel.findByIdAndUpdate(userId, {cartData: {}})
//             res.json({success: true});
//         } else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // RAZORPAY
// // ==========================================
// const placeOrderRazorpay = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Razorpay",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const options = {
//             amount: Math.round(finalAmount * 100),
//             currency: currency.toUpperCase(),
//             receipt : newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error,order)=>{
//             if (error) {
//                 console.log(error)
//                 return res.json({success:false, message: error})
//             }
//             res.json({success:true,order})
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyRazorpay = async (req,res) => {
//     try {
//         const { userId, razorpay_order_id  } = req.body

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if (orderInfo.status === 'paid') {
//             await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//             await userModel.findByIdAndUpdate(userId,{cartData:{}})
//             res.json({ success: true, message: "Payment Successful" })
//         } else {
//              res.json({ success: false, message: 'Payment Failed' });
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // PAYPAL - STEP 1: CREATE ORDER
// // ==========================================
// const placeOrderPaypal = async (req, res) => {
//   try {
//     const { finalAmount, items, address, subtotal, discountTotal, shipping } = req.body;
//     const userId = req.body.userId || req.userId;

//     console.log("🔵 PayPal: Creating order with amount:", finalAmount);

//     if (!finalAmount || finalAmount <= 0) {
//       return res.json({ success: false, message: "Invalid amount" });
//     }

//     const accessToken = await getPayPalAccessToken();
//     console.log("🔵 PayPal: Access token obtained");

//     // 🔥 Store order data in database BEFORE creating PayPal order
//     const tempOrderData = {
//       userId,
//       items,
//       address,
//       subtotal: Number(subtotal),
//       discountTotal: Number(discountTotal),
//       shipping: Number(shipping),
//       finalAmount: Number(finalAmount),
//       paymentMethod: "PayPal",
//       payment: false,  // Will be true after verification
//       paypalOrderCreatedAt: new Date(),
//     };

//     // Create PayPal order
//     const paypalResponse = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
//       {
//         intent: "CAPTURE",
//         purchase_units: [
//           {
//             reference_id: Date.now().toString(), // Unique reference
//             amount: {
//               currency_code: "USD",
//               value: String(Number(finalAmount).toFixed(2)), // 🔥 Must be STRING
//             },
//             description: `Order for ${items.length} items`,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//           "PayPal-Request-Id": `${userId}-${Date.now()}`, // 🔥 Unique request ID
//         },
//       }
//     );

//     console.log("🟢 PayPal: Order created successfully:", paypalResponse.data.id);

//     if (paypalResponse.data.id) {
//       // Store temp order data in session or return it for frontend to pass back
//       res.json({ 
//         success: true, 
//         orderID: paypalResponse.data.id,
//         tempOrderData: tempOrderData // Send back to frontend
//       });
//     } else {
//       res.json({ success: false, message: "Failed to create PayPal order" });
//     }
//   } catch (err) {
//     console.error("🔴 PayPal Error:", err.response?.data || err.message);
//     res.json({ 
//       success: false, 
//       message: err.response?.data?.message || err.message || "PayPal order creation failed"
//     });
//   }
// };

// // ==========================================
// // PAYPAL - STEP 2: VERIFY & CREATE ORDER
// // ==========================================
// const verifyPaypal = async (req, res) => {
//   try {
//     const { orderID, userId, orderData } = req.body;

//     console.log("🔵 PayPal: Verifying payment for order:", orderID);

//     if (!orderData) {
//       return res.json({ success: false, message: "Order data is missing" });
//     }

//     if (!orderID || !userId) {
//       return res.json({ success: false, message: "Missing orderID or userID" });
//     }

//     const accessToken = await getPayPalAccessToken();

//     // 🔥 Capture the PayPal payment
//     const captureResponse = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("🟢 PayPal: Payment captured, status:", captureResponse.data.status);

//     // 🔥 Check if payment is completed
//     if (captureResponse.data.status === "COMPLETED") {
//       // Get payer details
//       const payerEmail = captureResponse.data.payer?.email_address;
//       console.log("🟢 PayPal: Payment completed for:", payerEmail);

//       // Create order in database ONLY after payment confirmation
//       const newOrder = new orderModel({
//         ...orderData,
//         paymentMethod: "PayPal",
//         payment: true, // Mark as paid
//         paypalOrderId: orderID,
//         paypalStatus: captureResponse.data.status,
//         payerEmail: payerEmail,
//         date: Date.now(),
//       });

//       await newOrder.save();
//       console.log("🟢 Database: Order created:", newOrder._id);

//       // Clear user cart
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       console.log("🟢 Database: Cart cleared for user:", userId);

//       res.json({ 
//         success: true, 
//         message: "Payment verified and order created successfully",
//         orderId: newOrder._id
//       });
//     } else {
//       console.log("🔴 PayPal: Payment not completed. Status:", captureResponse.data.status);
//       res.json({ 
//         success: false, 
//         message: `Payment status: ${captureResponse.data.status}. Expected: COMPLETED`
//       });
//     }
//   } catch (err) {
//     console.error("🔴 PayPal Verification Error:", err.response?.data || err.message);
    
//     // Log detailed error info
//     if (err.response?.data?.details) {
//       console.error("🔴 PayPal Details:", err.response.data.details);
//     }

//     res.json({ 
//       success: false, 
//       message: err.response?.data?.message || err.message || "Payment verification failed"
//     });
//   }
// };

// // ==========================================
// // USER & ADMIN ORDERS
// // ==========================================
// const allOrders = async (req,res) => {
//     try {
//         const orders = await orderModel.find({})
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const userOrders = async (req,res) => {
//     try {
//         const { userId } = req.body
//         const orders = await orderModel.find({ userId })
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const updateStatus = async (req,res) => {
//     try {
//         const { orderId, status } = req.body
//         await orderModel.findByIdAndUpdate(orderId, { status })
//         res.json({success:true,message:'Status Updated'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// export {
//   verifyRazorpay, 
//   verifyStripe,
//   placeOrder, 
//   placeOrderStripe, 
//   placeOrderRazorpay, 
//   placeOrderPaypal, 
//   verifyPaypal, 
//   allOrders, 
//   userOrders, 
//   updateStatus
// }




// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from 'stripe'
// import razorpay from 'razorpay'
// import axios from "axios";
// import { getPayPalAccessToken } from "../utils/paypal.js";

// // global variables
// const currency = 'inr'
// const deliveryCharge = 10

// // gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET,
// })

// // ==========================================
// // PLACE ORDER - COD
// // ==========================================
// const placeOrder = async (req, res) => {
//   try {
//     const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//     const userId = req.body.userId || req.userId;

//     if (!userId || !items?.length || !address) {
//       return res.json({ success: false, message: "Missing required fields" });
//     }

//     const orderData = {
//       userId,
//       items,
//       address,
//       subtotal: Number(subtotal),
//       discountTotal: Number(discountTotal),
//       shipping: Number(shipping),
//       finalAmount: Number(finalAmount),
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now()
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({ success: true, message: "Order Placed" });
//   } catch (error) {
//     console.error('PLACE ORDER ERROR:', error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ==========================================
// // STRIPE
// // ==========================================
// const placeOrderStripe = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;
//         const { origin } = req.headers;

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Stripe",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:item.name
//                 },
//                 unit_amount: Math.round(item.finalPrice * 100)
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:'Delivery Charges'
//                 },
//                 unit_amount: deliveryCharge * 100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         })

//         res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyStripe = async (req,res) => {
//     const { orderId, success, userId } = req.body
//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, {payment:true});
//             await userModel.findByIdAndUpdate(userId, {cartData: {}})
//             res.json({success: true});
//         } else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // RAZORPAY
// // ==========================================
// const placeOrderRazorpay = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Razorpay",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const options = {
//             amount: Math.round(finalAmount * 100),
//             currency: currency.toUpperCase(),
//             receipt : newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error,order)=>{
//             if (error) {
//                 console.log(error)
//                 return res.json({success:false, message: error})
//             }
//             res.json({success:true,order})
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyRazorpay = async (req,res) => {
//     try {
//         const { userId, razorpay_order_id  } = req.body

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if (orderInfo.status === 'paid') {
//             await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//             await userModel.findByIdAndUpdate(userId,{cartData:{}})
//             res.json({ success: true, message: "Payment Successful" })
//         } else {
//              res.json({ success: false, message: 'Payment Failed' });
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // PAYPAL - PLACE ORDER (FIXED)
// // ==========================================
// const placeOrderPaypal = async (req, res) => {
//   try {
//     const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//     const userId = req.userId || req.body.userId;

//     if (!userId) {
//       return res.json({ success: false, message: "User ID is required" });
//     }
//     if (!items || items.length === 0) {
//       return res.json({ success: false, message: "Items are required" });
//     }

//     console.log("📦 Creating PayPal order with data:", { 
//       userId, 
//       itemCount: items.length, 
//       finalAmount,
//       itemsData: items
//     });

//     // ✅ STEP 1: Save order to database FIRST
//     const orderData = {
//       userId,
//       items,
//       address,
//       subtotal: Number(subtotal),
//       discountTotal: Number(discountTotal),
//       shipping: Number(shipping),
//       finalAmount: Number(finalAmount),
//       paymentMethod: "PayPal",
//       payment: false,
//       date: Date.now()
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     console.log("✅ Order saved to DB with ID:", newOrder._id);

//     // ✅ STEP 2: Get PayPal access token
//     const accessToken = await getPayPalAccessToken();

//     // ✅ STEP 3: Calculate item totals for validation
//     const itemsTotal = items.reduce((sum, item) => {
//       return sum + (Number(item.finalPrice) * Number(item.quantity));
//     }, 0);

//     console.log("💰 Calculation Check:");
//     console.log("   Items Total:", itemsTotal.toFixed(2));
//     console.log("   Shipping:", shipping);
//     console.log("   Expected Total:", (itemsTotal + Number(shipping)).toFixed(2));
//     console.log("   Final Amount from Frontend:", Number(finalAmount).toFixed(2));

//     // ✅ STEP 4: Create PayPal order (SIMPLIFIED - NO ITEMS BREAKDOWN)
//     const paypalOrderData = {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           reference_id: newOrder._id.toString(),
//           amount: {
//             currency_code: "USD",
//             value: String(Number(finalAmount).toFixed(2)),
//           },
//           description: `Order - ${items.length} item(s)`,
//         }
//       ],
//       application_context: {
//         brand_name: "LL Leather Lovers",
//         landing_page: "BILLING",
//         user_action: "PAY_NOW",
//         return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/success`,
//         cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/cancel`
//       }
//     };

//     console.log("📤 Sending to PayPal:", JSON.stringify(paypalOrderData, null, 2));

//     const response = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
//       paypalOrderData,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ PayPal order created with ID:", response.data.id);

//     res.json({
//       success: true,
//       orderID: response.data.id,
//       dbOrderId: newOrder._id
//     });

//   } catch (error) {
//     console.error("❌ PayPal placeOrder Error:", error.response?.data || error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ==========================================
// // PAYPAL - VERIFY ORDER (FIXED)
// // ==========================================
// const verifyPaypal = async (req, res) => {
//   try {
//     const { orderID, userId } = req.body;

//     if (!orderID || !userId) {
//       return res.json({ success: false, message: "Missing orderID or userId" });
//     }

//     console.log("🔄 Verifying PayPal payment for order:", orderID);

//     const accessToken = await getPayPalAccessToken();

//     const response = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("PayPal capture response status:", response.data.status);

//     if (response.data.status === "COMPLETED") {

//       const referenceId = response.data.purchase_units[0].reference_id;

//       console.log("✅ Payment completed for order:", referenceId);

//       const updatedOrder = await orderModel.findByIdAndUpdate(
//         referenceId,
//         { 
//           payment: true,
//           status: "Payment Received"
//         },
//         { new: true }
//       );

//       if (!updatedOrder) {
//         return res.json({ success: false, message: "Order not found in database" });
//       }

//       await userModel.findByIdAndUpdate(userId, { cartData: {} });

//       console.log("✅ Order updated and cart cleared");

//       res.json({
//         success: true,
//         message: "Payment verified successfully",
//         orderId: referenceId
//       });

//     } else {
//       console.log("❌ Payment not completed. Status:", response.data.status);
//       res.json({ success: false, message: "Payment not completed" });
//     }

//   } catch (error) {
//     console.error("❌ PayPal verifyPaypal Error:", error.response?.data || error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ==========================================
// // USER & ADMIN ORDERS
// // ==========================================
// const allOrders = async (req,res) => {
//     try {
//         const orders = await orderModel.find({})
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const userOrders = async (req,res) => {
//     try {
//         const { userId } = req.body
//         const orders = await orderModel.find({ userId })
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const updateStatus = async (req,res) => {
//     try {
//         const { orderId, status } = req.body
//         await orderModel.findByIdAndUpdate(orderId, { status })
//         res.json({success:true,message:'Status Updated'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // EXPORTS
// // ==========================================
// export {
//   verifyRazorpay, 
//   verifyStripe,
//   placeOrder, 
//   placeOrderStripe, 
//   placeOrderRazorpay, 
//   placeOrderPaypal,
//   verifyPaypal,
//   allOrders, 
//   userOrders, 
//   updateStatus
// }




// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from 'stripe'
// import razorpay from 'razorpay'
// import axios from "axios";
// import { getPayPalAccessToken } from "../utils/paypal.js";

// // global variables
// const currency = 'inr'
// const deliveryCharge = 10

// // gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET,
// })

// // ==========================================
// // PLACE ORDER - COD
// // ==========================================
// const placeOrder = async (req, res) => {
//   try {
//     const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//     const userId = req.body.userId || req.userId;

//     if (!userId || !items?.length || !address) {
//       return res.json({ success: false, message: "Missing required fields" });
//     }

//     const orderData = {
//       userId,
//       items,
//       address,
//       subtotal: Number(subtotal),
//       discountTotal: Number(discountTotal),
//       shipping: Number(shipping),
//       finalAmount: Number(finalAmount),
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now()
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({ success: true, message: "Order Placed" });
//   } catch (error) {
//     console.error('PLACE ORDER ERROR:', error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ==========================================
// // STRIPE
// // ==========================================
// const placeOrderStripe = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;
//         const { origin } = req.headers;

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Stripe",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:item.name
//                 },
//                 unit_amount: Math.round(item.finalPrice * 100)
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:'Delivery Charges'
//                 },
//                 unit_amount: deliveryCharge * 100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         })

//         res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyStripe = async (req,res) => {
//     const { orderId, success, userId } = req.body
//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, {payment:true});
//             await userModel.findByIdAndUpdate(userId, {cartData: {}})
//             res.json({success: true});
//         } else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // RAZORPAY
// // ==========================================
// const placeOrderRazorpay = async (req,res) => {
//     try {
//         const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//         const userId = req.body.userId || req.userId;

//         const orderData = {
//             userId,
//             items,
//             address,
//             subtotal,
//             discountTotal,
//             shipping,
//             finalAmount,
//             paymentMethod:"Razorpay",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const options = {
//             amount: Math.round(finalAmount * 100),
//             currency: currency.toUpperCase(),
//             receipt : newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error,order)=>{
//             if (error) {
//                 console.log(error)
//                 return res.json({success:false, message: error})
//             }
//             res.json({success:true,order})
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyRazorpay = async (req,res) => {
//     try {
//         const { userId, razorpay_order_id  } = req.body

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if (orderInfo.status === 'paid') {
//             await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//             await userModel.findByIdAndUpdate(userId,{cartData:{}})
//             res.json({ success: true, message: "Payment Successful" })
//         } else {
//              res.json({ success: false, message: 'Payment Failed' });
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // PAYPAL - PLACE ORDER (WITH CORRECT CONVERSION)
// // ==========================================
// const placeOrderPaypal = async (req, res) => {
//   try {
//     const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
//     const userId = req.userId || req.body.userId;

//     if (!userId) {
//       return res.json({ success: false, message: "User ID is required" });
//     }
//     if (!items || items.length === 0) {
//       return res.json({ success: false, message: "Items are required" });
//     }

//     console.log("📦 Creating PayPal order with data:", { 
//       userId, 
//       itemCount: items.length, 
//       finalAmount,
//       itemsData: items
//     });

//     // ✅ STEP 1: Save order to database FIRST
//     const orderData = {
//       userId,
//       items,
//       address,
//       subtotal: Number(subtotal),
//       discountTotal: Number(discountTotal),
//       shipping: Number(shipping),
//       finalAmount: Number(finalAmount),
//       paymentMethod: "PayPal",
//       payment: false,
//       date: Date.now()
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     console.log("✅ Order saved to DB with ID:", newOrder._id);

//     // ✅ STEP 2: Convert INR to USD (CORRECT RATE)
//     // ❌ OLD: 0.012 (too low!)
//     // ✅ NEW: 0.012 * 83 (correct rate) or use 1/83 = 0.01204...
    
//     const INR_TO_USD = 1 / 83; // ✅ CORRECT: 1 USD = 83 INR (approximately)
//     const amountInUSD = Number((finalAmount * INR_TO_USD).toFixed(2));
    
//     console.log("💵 Amount in INR:", finalAmount);
//     console.log("💵 Amount in USD:", amountInUSD);
//     console.log("💵 Conversion Rate:", `1 USD = ${(1/INR_TO_USD).toFixed(2)} INR`);

//     // ✅ STEP 3: Get PayPal access token
//     const accessToken = await getPayPalAccessToken();

//     console.log("✅ Access token obtained");

//     // ✅ STEP 4: Create PayPal order with USD amount
//     const paypalOrderData = {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           reference_id: newOrder._id.toString(),
//           amount: {
//             currency_code: "USD",
//             value: String(amountInUSD),  // ✅ CORRECT USD AMOUNT
//           },
//           description: `Order - ${items.length} item(s)`,
//         }
//       ],
//       application_context: {
//         brand_name: "LL Leather Lovers",
//         landing_page: "BILLING",
//         user_action: "PAY_NOW",
//         return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/success`,
//         cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/cancel`
//       }
//     };

//     console.log("📤 Sending to PayPal:", JSON.stringify(paypalOrderData, null, 2));

//     const response = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
//       paypalOrderData,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ PayPal order created with ID:", response.data.id);

//     res.json({
//       success: true,
//       orderID: response.data.id,
//       dbOrderId: newOrder._id,
//       amountInUSD: amountInUSD
//     });

//   } catch (error) {
//     console.error("❌ PayPal placeOrder Error:", error.response?.data || error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ==========================================
// // PAYPAL - VERIFY ORDER
// // ==========================================
// const verifyPaypal = async (req, res) => {
//   try {
//     const { orderID, userId } = req.body;

//     if (!orderID || !userId) {
//       return res.json({ success: false, message: "Missing orderID or userId" });
//     }

//     console.log("🔄 Verifying PayPal payment for order:", orderID);

//     const accessToken = await getPayPalAccessToken();

//     const response = await axios.post(
//       `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("PayPal capture response status:", response.data.status);

//     if (response.data.status === "COMPLETED") {

//       const referenceId = response.data.purchase_units[0].reference_id;

//       console.log("✅ Payment completed for order:", referenceId);

//       const updatedOrder = await orderModel.findByIdAndUpdate(
//         referenceId,
//         { 
//           payment: true,
//           status: "Payment Received"
//         },
//         { new: true }
//       );

//       if (!updatedOrder) {
//         return res.json({ success: false, message: "Order not found in database" });
//       }

//       await userModel.findByIdAndUpdate(userId, { cartData: {} });

//       console.log("✅ Order updated and cart cleared");

//       res.json({
//         success: true,
//         message: "Payment verified successfully",
//         orderId: referenceId
//       });

//     } else {
//       console.log("❌ Payment not completed. Status:", response.data.status);
//       res.json({ success: false, message: "Payment not completed" });
//     }

//   } catch (error) {
//     console.error("❌ PayPal verifyPaypal Error:", error.response?.data || error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ==========================================
// // USER & ADMIN ORDERS
// // ==========================================
// const allOrders = async (req,res) => {
//     try {
//         const orders = await orderModel.find({})
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const userOrders = async (req,res) => {
//     try {
//         const { userId } = req.body
//         const orders = await orderModel.find({ userId })
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const updateStatus = async (req,res) => {
//     try {
//         const { orderId, status } = req.body
//         await orderModel.findByIdAndUpdate(orderId, { status })
//         res.json({success:true,message:'Status Updated'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // ==========================================
// // EXPORTS
// // ==========================================
// export {
//   verifyRazorpay, 
//   verifyStripe,
//   placeOrder, 
//   placeOrderStripe, 
//   placeOrderRazorpay, 
//   placeOrderPaypal,
//   verifyPaypal,
//   allOrders, 
//   userOrders, 
//   updateStatus
// }



import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import axios from "axios";
import { getPayPalAccessToken } from "../utils/paypal.js";

// global variables
const currency = 'usd'  // ✅ CHANGED TO USD
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})

// ==========================================
// PLACE ORDER - COD
// ==========================================
const placeOrder = async (req, res) => {
  try {
    const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
    const userId = req.body.userId || req.userId;

    if (!userId || !items?.length || !address) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const orderData = {
      userId,
      items,
      address,
      subtotal: Number(subtotal),
      discountTotal: Number(discountTotal),
      shipping: Number(shipping),
      finalAmount: Number(finalAmount),
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error('PLACE ORDER ERROR:', error);
    res.json({ success: false, message: error.message });
  }
};

// ==========================================
// STRIPE
// ==========================================
const placeOrderStripe = async (req,res) => {
    try {
        const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
        const userId = req.body.userId || req.userId;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            subtotal,
            discountTotal,
            shipping,
            finalAmount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: Math.round(item.finalPrice * 100)
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: Math.round(deliveryCharge * 100)
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyStripe = async (req,res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true});
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// ==========================================
// RAZORPAY
// ==========================================
const placeOrderRazorpay = async (req,res) => {
    try {
        const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
        const userId = req.body.userId || req.userId;

        const orderData = {
            userId,
            items,
            address,
            subtotal,
            discountTotal,
            shipping,
            finalAmount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: Math.round(finalAmount * 100),
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        const { userId, razorpay_order_id  } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true, message: "Payment Successful" })
        } else {
             res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// ==========================================
// PAYPAL - PLACE ORDER (USD ONLY - NO CONVERSION)
// ==========================================
const placeOrderPaypal = async (req, res) => {
  try {
    const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
    const userId = req.userId || req.body.userId;

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Items are required" });
    }

    console.log("📦 Creating PayPal order with data:", { 
      userId, 
      itemCount: items.length, 
      finalAmount,
      currency: "USD"
    });

    // ✅ STEP 1: Save order to database FIRST
    const orderData = {
      userId,
      items,
      address,
      subtotal: Number(subtotal),
      discountTotal: Number(discountTotal),
      shipping: Number(shipping),
      finalAmount: Number(finalAmount),
      paymentMethod: "PayPal",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log("✅ Order saved to DB with ID:", newOrder._id);

    // ✅ STEP 2: Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    console.log("✅ Access token obtained");

    // ✅ STEP 3: Create PayPal order (AMOUNT IS ALREADY IN USD - NO CONVERSION!)
    const paypalOrderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: newOrder._id.toString(),
          amount: {
            currency_code: "USD",
            value: String(Number(finalAmount).toFixed(2)),  // ✅ ALREADY USD - NO CONVERSION
          },
          description: `Order - ${items.length} item(s)`,
        }
      ],
      application_context: {
        brand_name: "LL Leather Lovers",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/success`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/cancel`
      }
    };

    console.log("📤 Sending to PayPal:", JSON.stringify(paypalOrderData, null, 2));

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      paypalOrderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ PayPal order created with ID:", response.data.id);

    res.json({
      success: true,
      orderID: response.data.id,
      dbOrderId: newOrder._id
    });

  } catch (error) {
    console.error("❌ PayPal placeOrder Error:", error.response?.data || error.message);
    res.json({ success: false, message: error.message });
  }
};

// ==========================================
// PAYPAL - VERIFY ORDER
// ==========================================
const verifyPaypal = async (req, res) => {
  try {
    const { orderID, userId } = req.body;

    if (!orderID || !userId) {
      return res.json({ success: false, message: "Missing orderID or userId" });
    }

    console.log("🔄 Verifying PayPal payment for order:", orderID);

    const accessToken = await getPayPalAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("PayPal capture response status:", response.data.status);

    if (response.data.status === "COMPLETED") {

      const referenceId = response.data.purchase_units[0].reference_id;

      console.log("✅ Payment completed for order:", referenceId);

      const updatedOrder = await orderModel.findByIdAndUpdate(
        referenceId,
        { 
          payment: true,
          status: "Payment Received"
        },
        { new: true }
      );

      if (!updatedOrder) {
        return res.json({ success: false, message: "Order not found in database" });
      }

      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      console.log("✅ Order updated and cart cleared");

      res.json({
        success: true,
        message: "Payment verified successfully",
        orderId: referenceId
      });

    } else {
      console.log("❌ Payment not completed. Status:", response.data.status);
      res.json({ success: false, message: "Payment not completed" });
    }

  } catch (error) {
    console.error("❌ PayPal verifyPaypal Error:", error.response?.data || error.message);
    res.json({ success: false, message: error.message });
  }
};

// ==========================================
// USER & ADMIN ORDERS
// ==========================================
const allOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const userOrders = async (req,res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const updateStatus = async (req,res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// ==========================================
// EXPORTS
// ==========================================
export {
  verifyRazorpay, 
  verifyStripe,
  placeOrder, 
  placeOrderStripe, 
  placeOrderRazorpay, 
  placeOrderPaypal,
  verifyPaypal,
  allOrders, 
  userOrders, 
  updateStatus
}