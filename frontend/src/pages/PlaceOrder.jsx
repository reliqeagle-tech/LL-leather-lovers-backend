// // import React, { useContext, useState } from "react";
// // import Title from "../components/Title";
// // import CartTotal from "../components/CartTotal";
// // import { assets } from "../assets/assets";
// // import { ShopContext } from "../context/ShopContext";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const PlaceOrder = () => {
// //   const [method, setMethod] = useState("cod");

// //   const {
// //     navigate,
// //     backendUrl,
// //     token,
// //     cartItems,
// //     setCartItems,
// //     products,
// //     delivery_fee,
// //     userId
// //   } = useContext(ShopContext);

// //   const SHIPPING_FEE = 10;

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     street: "",
// //     city: "",
// //     state: "",
// //     zipcode: "",
// //     country: "",
// //     phone: "",
// //   });

// //   const onChangeHandler = (event) => {
// //     const { name, value } = event.target;
// //     setFormData((data) => ({ ...data, [name]: value }));
// //   };

// //   const initPay = (order) => {
// //     const options = {
// //       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// //       amount: order.amount,
// //       currency: order.currency,
// //       name: "Order Payment",
// //       description: "Order Payment",
// //       order_id: order.id,
// //       receipt: order.receipt,
// //       handler: async (response) => {
// //         try {
// //           const { data } = await axios.post(
// //             `${backendUrl}/api/order/verifyRazorpay`,
// //             response,
// //             { headers: { Authorization: `Bearer ${token}` } }
// //           );

// //           if (data.success) {
// //             setCartItems({});
// //             navigate("/orders");
// //           } else {
// //             toast.error(data.message || "Payment verification failed");
// //           }
// //         } catch (error) {
// //           console.error(error);
// //           toast.error(error.message || "Something went wrong");
// //         }
// //       },
// //     };
// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   };

// // // REPLACE the onSubmitHandler function in your PlaceOrder.jsx with this fixed version:

// // // REPLACE the onSubmitHandler function in your PlaceOrder.jsx with this fixed version:

// // const onSubmitHandler = async (event) => {
// //   event.preventDefault();

// //   if (!token) return toast.error("You must be logged in to place an order");
// //   if (!userId) return toast.error("User ID not found. Please log in again.");

// //   try {
// //     let orderItems = [];

// //     // -------------------------------
// //     // BUILD ORDER ITEMS SAFELY
// //     // -------------------------------
// //     for (const productId in cartItems) {
// //       const productInfo = products.find((p) => p._id === productId);
// //       if (!productInfo) {
// //         console.warn(`Product not found: ${productId}`);
// //         continue;
// //       }

// //       // Parse price safely
// //       const originalPrice = Number(productInfo.price);
// //       if (isNaN(originalPrice) || originalPrice <= 0) {
// //         console.error(`Invalid price for product ${productId}:`, productInfo.price);
// //         toast.error(`Invalid price for product: ${productInfo.name}`);
// //         return;
// //       }

// //       // FIXED: discountPrice is the ACTUAL discounted price, not a percentage!
// //       const discountedPrice = Number(productInfo.discountPrice) || 0;

// //       // Determine the final price to use
// //       let finalUnitPrice = originalPrice;
// //       let discountAmount = 0;
// //       let discountPercent = 0;

// //       // If there's a valid discount price that's less than original
// //       if (discountedPrice > 0 && discountedPrice < originalPrice) {
// //         finalUnitPrice = discountedPrice;
// //         discountAmount = originalPrice - discountedPrice;
// //         discountPercent = ((discountAmount / originalPrice) * 100).toFixed(2);
// //       }

// //       const variants = cartItems[productId];

// //       // Loop through size-color entries
// //       for (const variantKey of Object.keys(variants)) {
// //         const variantData = variants[variantKey];

// //         // must be object like {quantity:1, customPrice:0}
// //         if (typeof variantData !== "object") continue;

// //         const qty = Number(variantData.quantity) || 0;
// //         const customPrice = Number(variantData.customPrice) || 0;

// //         if (qty <= 0) continue;

// //         const [size, color] = variantKey.split("-");

// //         // If there's a custom price, use it; otherwise use the calculated price
// //         const itemFinalPrice = customPrice > 0 ? (finalUnitPrice + customPrice) : finalUnitPrice;
// //         const itemSubtotal = itemFinalPrice * qty;
// //         const itemSaved = discountAmount * qty;

// //         // DEBUGGING: Log calculated values
// //         console.log('Item calculation:', {
// //           productId,
// //           name: productInfo.name,
// //           originalPrice,
// //           discountedPrice,
// //           discountAmount,
// //           discountPercent,
// //           itemFinalPrice,
// //           qty,
// //           itemSubtotal,
// //           itemSaved
// //         });

// //         // Validate all numbers before pushing
// //         if (
// //           isNaN(originalPrice) ||
// //           isNaN(discountAmount) ||
// //           isNaN(itemFinalPrice) ||
// //           isNaN(itemSubtotal) ||
// //           isNaN(itemSaved)
// //         ) {
// //           console.error('NaN detected in item!', {
// //             originalPrice,
// //             discountAmount,
// //             itemFinalPrice,
// //             itemSubtotal,
// //             itemSaved
// //           });
// //           toast.error(`Error calculating price for ${productInfo.name}`);
// //           return;
// //         }

// //         orderItems.push({
// //           productId,
// //           name: productInfo.name,
// //           image: productInfo.image?.[0] || "",

// //           originalPrice,
// //           discountPercent: Number(discountPercent),
// //           discountAmount,
// //           finalPrice: itemFinalPrice,

// //           quantity: qty,
// //           size,
// //           color,

// //           subtotal: itemSubtotal,
// //           saved: itemSaved,
// //         });
// //       }
// //     }

// //     if (orderItems.length === 0) {
// //       toast.error("Your cart is empty");
// //       return;
// //     }

// //     // -------------------------------
// //     // CALCULATE TOTALS
// //     // -------------------------------
// //     const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
// //     const discountTotal = orderItems.reduce((sum, item) => sum + item.saved, 0);
// //     const finalAmount = subtotal + SHIPPING_FEE;

// //     // DEBUGGING: Log totals
// //     console.log('Order totals:', {
// //       subtotal,
// //       discountTotal,
// //       shipping: SHIPPING_FEE,
// //       finalAmount,
// //       itemCount: orderItems.length
// //     });

// //     // Validate totals before sending
// //     if (isNaN(subtotal) || isNaN(discountTotal) || isNaN(finalAmount)) {
// //       console.error('NaN detected in totals!', { subtotal, discountTotal, finalAmount });
// //       toast.error("Error calculating order total. Please try again.");
// //       return;
// //     }

// //     // -------------------------------
// //     // ORDER DATA
// //     // -------------------------------
// //     const orderData = {
// //       userId,  // Add userId from context
// //       address: formData,
// //       items: orderItems,
// //       subtotal: Number(subtotal.toFixed(2)),
// //       discountTotal: Number(discountTotal.toFixed(2)),
// //       shipping: SHIPPING_FEE,
// //       finalAmount: Number(finalAmount.toFixed(2)),
// //     };

// //     console.log("ORDER SENT:", orderData);
// //     console.log("ORDER DATA (stringified):", JSON.stringify(orderData, null, 2));

// //     let response;
// //     const config = { headers: { Authorization: `Bearer ${token}` } };

// //     // --------------------------------
// //     // PAYMENT HANDLING
// //     // --------------------------------
// //     if (method === "cod") {
// //       response = await axios.post(
// //         `${backendUrl}/api/order/place`,
// //         orderData,
// //         config
// //       );
// //       if (response.data.success) {
// //         setCartItems({});
// //         navigate("/orders");
// //         toast.success("Order placed successfully!");
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     }

// //     if (method === "stripe") {
// //       response = await axios.post(
// //         `${backendUrl}/api/order/stripe`,
// //         orderData,
// //         config
// //       );
// //       if (response.data.success) {
// //         window.location.replace(response.data.session_url);
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     }

// //     if (method === "razorpay") {
// //       response = await axios.post(
// //         `${backendUrl}/api/order/razorpay`,
// //         orderData,
// //         config
// //       );
// //       if (response.data.success) {
// //         initPay(response.data.order);
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     }
// //   } catch (error) {
// //     console.error("Order submission error:", error);
// //     toast.error(
// //       error.response?.data?.message || error.message || "Something went wrong"
// //     );
// //   }
// // };

// //   return (
// //     <form
// //       onSubmit={onSubmitHandler}
// //       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t p-24"
// //     >
// //       {/* LEFT SIDE */}
// //       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
// //         <div className="text-xl sm:text-2xl my-3">
// //           <Title text1="DELIVERY" text2="INFORMATION" />
// //         </div>

// //         <div className="flex gap-3">
// //           <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="First name" />
// //           <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Last name" />
// //         </div>

// //         <input required name="email" value={formData.email} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Email" />
// //         <input required name="street" value={formData.street} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Street" />

// //         <div className="flex gap-3">
// //           <input required name="city" value={formData.city} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="City" />
// //           <input name="state" value={formData.state} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="State" />
// //         </div>

// //         <div className="flex gap-3">
// //           <input required name="zipcode" value={formData.zipcode} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Zipcode" />
// //           <input required name="country" value={formData.country} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Country" />
// //         </div>

// //         <input required name="phone" value={formData.phone} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Phone" />
// //       </div>

// //       {/* RIGHT SIDE */}
// //       <div className="mt-8">
// //         <div className="mt-8 min-w-80">
// //           <CartTotal />
// //         </div>

// //         <div className="mt-12">
// //           <Title text1="PAYMENT" text2="METHOD" />

// //           <div className="flex gap-3 flex-col lg:flex-row">
// //             <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
// //               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
// //               <img className="h-5 mx-4" src={assets.stripe_logo} />
// //             </div>

// //             <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
// //               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
// //               <img className="h-5 mx-4" src={assets.razorpay_logo} />
// //             </div>

// //             <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
// //               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
// //               <span className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</span>
// //             </div>
// //           </div>

// //           <div className="w-full text-end mt-8">
// //             <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
// //               PLACE ORDER
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default PlaceOrder;

// import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const [paypalOrderId, setPaypalOrderId] = useState(null);

//   const {
//     navigate,
//     backendUrl,
//     token,
//     cartItems,
//     setCartItems,
//     products,
//     userId,
//   } = useContext(ShopContext);

//   const SHIPPING_FEE = 10;

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   /* ---------------- RAZORPAY ---------------- */
//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       order_id: order.id,
//       handler: async (response) => {
//         try {
//           const { data } = await axios.post(
//             `${backendUrl}/api/order/verifyRazorpay`,
//             response,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (data.success) {
//             setCartItems({});
//             navigate("/orders");
//           } else {
//             toast.error(data.message);
//           }
//         } catch (err) {
//           toast.error("Razorpay verification failed");
//         }
//       },
//     };
//     new window.Razorpay(options).open();
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!token || !userId) {
//       toast.error("Please login again");
//       return;
//     }

//     try {
//       let orderItems = [];

//       for (const productId in cartItems) {
//         const product = products.find((p) => p._id === productId);
//         if (!product) continue;

//         const variants = cartItems[productId];
//         const originalPrice = Number(product.price);
//         const discountedPrice = Number(product.discountPrice) || 0;

//         let finalPrice = originalPrice;
//         let discountAmount = 0;

//         if (discountedPrice > 0 && discountedPrice < originalPrice) {
//           finalPrice = discountedPrice;
//           discountAmount = originalPrice - discountedPrice;
//         }

//         for (const key in variants) {
//           const qty = Number(variants[key].quantity);
//           if (!qty) continue;

//           const [size, color] = key.split("-");

//           orderItems.push({
//             productId,
//             name: product.name,
//             image: product.image?.[0] || "",
//             quantity: qty,
//             size,
//             color,
//             originalPrice,
//             discountAmount,
//             finalPrice,
//             subtotal: finalPrice * qty,
//             saved: discountAmount * qty,
//           });
//         }
//       }

//       if (orderItems.length === 0) {
//         toast.error("Cart is empty");
//         return;
//       }

//       const subtotal = orderItems.reduce((a, c) => a + c.subtotal, 0);
//       const discountTotal = orderItems.reduce((a, c) => a + c.saved, 0);
//       const finalAmount = subtotal + SHIPPING_FEE;

//       const orderData = {
//         userId,
//         address: formData,
//         items: orderItems,
//         subtotal,
//         discountTotal,
//         shipping: SHIPPING_FEE,
//         finalAmount,
//       };

//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       /* COD */
//       if (method === "cod") {
//         const res = await axios.post(
//           `${backendUrl}/api/order/place`,
//           orderData,
//           config
//         );
//         if (res.data.success) {
//           setCartItems({});
//           navigate("/orders");
//         }
//       }

//       /* STRIPE */
//       if (method === "stripe") {
//         const res = await axios.post(
//           `${backendUrl}/api/order/stripe`,
//           orderData,
//           config
//         );
//         window.location.replace(res.data.session_url);
//       }

//       /* RAZORPAY */
//       if (method === "razorpay") {
//         const res = await axios.post(
//           `${backendUrl}/api/order/razorpay`,
//           orderData,
//           config
//         );
//         initPay(res.data.order);
//       }

//       /* PAYPAL (STEP 1) */
//       if (method === "paypal") {
//         const res = await axios.post(
//           `${backendUrl}/api/order/paypal`,
//           orderData,
//           config
//         );
//         setPaypalOrderId(res.data.orderID);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Order failed");
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="flex gap-8 p-10 border-t">
//       {/* LEFT */}
//       <div className="w-1/2 space-y-3">
//         <Title text1="DELIVERY" text2="INFORMATION" />
//         {Object.keys(formData).map((key) => (
//           <input
//             key={key}
//             name={key}
//             value={formData[key]}
//             onChange={onChangeHandler}
//             placeholder={key}
//             required
//             className="border p-2 w-full"
//           />
//         ))}
//       </div>

//       {/* RIGHT */}
//       <div className="w-1/2">
//         <CartTotal />
//         <Title text1="PAYMENT" text2="METHOD" />

//         <div className="space-y-2">
//           <div onClick={() => setMethod("stripe")} className="border p-2 cursor-pointer">
//             Stripe
//           </div>
//           <div onClick={() => setMethod("razorpay")} className="border p-2 cursor-pointer">
//             Razorpay
//           </div>
//           <div onClick={() => setMethod("paypal")} className="border p-2 cursor-pointer">
//             PayPal
//           </div>
//           <div onClick={() => setMethod("cod")} className="border p-2 cursor-pointer">
//             COD
//           </div>
//         </div>

//         {/* ACTION AREA */}
//         <div className="mt-6">
//           {/* Normal payments */}
//           {method !== "paypal" && (
//             <button
//               type="submit"
//               className="bg-black text-white px-8 py-3"
//             >
//               PLACE ORDER
//             </button>
//           )}

//           {/* PayPal step 1 */}
//           {method === "paypal" && !paypalOrderId && (
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-8 py-3"
//             >
//               CONTINUE TO PAYPAL
//             </button>
//           )}

//           {/* PayPal step 2 */}
//           {method === "paypal" && paypalOrderId && (
//             // <PayPalButtons
//             //   style={{ layout: "vertical" }}
//             //   createOrder={() => paypalOrderId}
//             //   onApprove={async (data) => {
//             //     const res = await axios.post(
//             //       `${backendUrl}/api/order/verifyPaypal`,
//             //       { orderID: data.orderID, userId },
//             //       { headers: { Authorization: `Bearer ${token}` } }
//             //     );

//             //     if (res.data.success) {
//             //       setCartItems({});
//             //       navigate("/orders");
//             //       toast.success("Payment successful");
//             //     } else {
//             //       toast.error(res.data.message);
//             //     }
//             //   }}
//             //   onError={() => toast.error("PayPal payment failed")}
//             // />
//             <PayPalButtons
//   createOrder={() => paypalOrderId}
//   onApprove={async (data) => {
//     const res = await axios.post(
//       `${backendUrl}/api/order/verifyPaypal`,
//       {
//         orderID: data.orderID,
//         userId,
//         orderData   // 🔥 FULL ORDER DATA
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     if (res.data.success) {
//       toast.success("Payment successful 🎉");
//       navigate("/orders");
//     } else {
//       toast.error("Payment failed");
//     }
//   }}
// />

//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

// import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("cod");
//   const [paypalOrderId, setPaypalOrderId] = useState(null);
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const {
//     navigate,
//     backendUrl,
//     token,
//     cartItems,
//     setCartItems,
//     products,
//     userId,
//   } = useContext(ShopContext);

//   const SHIPPING_FEE = 10;
//   const INR_TO_USD = 0.012; // 1 INR = 0.012 USD (approximate)

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   /* ========== BUILD ORDER DATA ========== */
//   const buildOrderData = () => {
//     let orderItems = [];

//     for (const productId in cartItems) {
//       const product = products.find((p) => p._id === productId);
//       if (!product) continue;

//       const variants = cartItems[productId];
//       const originalPrice = Number(product.price);
//       const discountedPrice = Number(product.discountPrice) || 0;

//       let finalPrice = originalPrice;
//       let discountAmount = 0;

//       if (discountedPrice > 0 && discountedPrice < originalPrice) {
//         finalPrice = discountedPrice;
//         discountAmount = originalPrice - discountedPrice;
//       }

//       for (const key in variants) {
//         const qty = Number(variants[key].quantity);
//         if (!qty) continue;

//         const [size, color] = key.split("-");

//         orderItems.push({
//           productId,
//           name: product.name,
//           image: product.image?.[0] || "",
//           quantity: qty,
//           size,
//           color,
//           originalPrice,
//           discountAmount,
//           finalPrice,
//           subtotal: finalPrice * qty,
//           saved: discountAmount * qty,
//         });
//       }
//     }

//     if (orderItems.length === 0) {
//       toast.error("Cart is empty");
//       return null;
//     }

//     const subtotal = orderItems.reduce((a, c) => a + c.subtotal, 0);
//     const discountTotal = orderItems.reduce((a, c) => a + c.saved, 0);
//     const finalAmount = subtotal + SHIPPING_FEE;

//     return {
//       userId,
//       address: formData,
//       items: orderItems,
//       subtotal: Number(subtotal.toFixed(2)),
//       discountTotal: Number(discountTotal.toFixed(2)),
//       shipping: SHIPPING_FEE,
//       finalAmount: Number(finalAmount.toFixed(2)),
//     };
//   };

//   /* ========== RAZORPAY ========== */
//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       order_id: order.id,
//       handler: async (response) => {
//         try {
//           const { data } = await axios.post(
//             `${backendUrl}/api/order/verifyRazorpay`,
//             response,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (data.success) {
//             setCartItems({});
//             navigate("/orders");
//             toast.success("Payment successful! 🎉");
//           } else {
//             toast.error(data.message);
//           }
//         } catch (err) {
//           toast.error("Razorpay verification failed");
//         }
//       },
//     };
//     new window.Razorpay(options).open();
//   };

//   /* ========== FORM SUBMIT ========== */
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!token || !userId) {
//       toast.error("Please login again");
//       return;
//     }

//     const data = buildOrderData();
//     if (!data) return;

//     setLoading(true);

//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       /* COD */
//       if (method === "cod") {
//         const res = await axios.post(
//           `${backendUrl}/api/order/place`,
//           data,
//           config
//         );
//         if (res.data.success) {
//           setCartItems({});
//           navigate("/orders");
//           toast.success("Order placed successfully! ✅");
//         } else {
//           toast.error(res.data.message);
//         }
//       }

//       /* STRIPE */
//       if (method === "stripe") {
//         const res = await axios.post(
//           `${backendUrl}/api/order/stripe`,
//           data,
//           config
//         );
//         if (res.data.success) {
//           window.location.replace(res.data.session_url);
//         } else {
//           toast.error(res.data.message);
//         }
//       }

//       /* RAZORPAY */
//       if (method === "razorpay") {
//         const res = await axios.post(
//           `${backendUrl}/api/order/razorpay`,
//           data,
//           config
//         );
//         if (res.data.success) {
//           initPay(res.data.order);
//         } else {
//           toast.error(res.data.message);
//         }
//       }

//       /* PAYPAL - STEP 1 */
//       if (method === "paypal") {
//         console.log("🟦 PayPal: Creating order...");
//         console.log("💵 INR Amount:", data.finalAmount);

//         // 🔥 CONVERT INR TO USD
//         const usdAmount = Number((data.finalAmount * INR_TO_USD).toFixed(2));
//         console.log("💵 USD Amount:", usdAmount);

//         // 🔥 SEND USD AMOUNT TO PAYPAL
//         const res = await axios.post(
//           `${backendUrl}/api/order/paypal`,
//           {
//             ...data,
//             finalAmount: usdAmount, // 🔥 Override with USD amount
//           },
//           config
//         );

//         if (res.data.success) {
//           console.log("🟩 PayPal: Order created -", res.data.orderID);
//           setOrderData(data); // Store original INR data
//           setPaypalOrderId(res.data.orderID);
//           toast.info("Opening PayPal...");
//         } else {
//           toast.error(res.data.message || "Failed to create PayPal order");
//           console.error("PayPal Error:", res.data.message);
//         }
//       }
//     } catch (err) {
//       console.error("Error:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t p-24"
//     >
//       {/* LEFT SIDE */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1="DELIVERY" text2="INFORMATION" />
//         </div>

//         <div className="flex gap-3">
//           <input
//             required
//             name="firstName"
//             value={formData.firstName}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="First name"
//           />
//           <input
//             required
//             name="lastName"
//             value={formData.lastName}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="Last name"
//           />
//         </div>

//         <input
//           required
//           name="email"
//           value={formData.email}
//           onChange={onChangeHandler}
//           className="border rounded py-1.5 px-3.5 w-full"
//           placeholder="Email"
//         />
//         <input
//           required
//           name="street"
//           value={formData.street}
//           onChange={onChangeHandler}
//           className="border rounded py-1.5 px-3.5 w-full"
//           placeholder="Street"
//         />

//         <div className="flex gap-3">
//           <input
//             required
//             name="city"
//             value={formData.city}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="City"
//           />
//           <input
//             name="state"
//             value={formData.state}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="State"
//           />
//         </div>

//         <div className="flex gap-3">
//           <input
//             required
//             name="zipcode"
//             value={formData.zipcode}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="Zipcode"
//           />
//           <input
//             required
//             name="country"
//             value={formData.country}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="Country"
//           />
//         </div>

//         <input
//           required
//           name="phone"
//           value={formData.phone}
//           onChange={onChangeHandler}
//           className="border rounded py-1.5 px-3.5 w-full"
//           placeholder="Phone"
//         />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>

//         <div className="mt-12">
//           <Title text1="PAYMENT" text2="METHOD" />

//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div
//               onClick={() => {
//                 setMethod("stripe");
//                 setPaypalOrderId(null);
//               }}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "stripe" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.stripe_logo} alt="stripe" />
//             </div>

//             <div
//               onClick={() => {
//                 setMethod("razorpay");
//                 setPaypalOrderId(null);
//               }}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "razorpay" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.razorpay_logo} alt="razorpay" />
//             </div>

//             <div
//               onClick={() => {
//                 setMethod("paypal");
//                 setPaypalOrderId(null);
//               }}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "paypal" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <span className="text-gray-500 text-sm font-medium mx-4">PAYPAL</span>
//             </div>

//             <div
//               onClick={() => {
//                 setMethod("cod");
//                 setPaypalOrderId(null);
//               }}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "cod" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <span className="text-gray-500 text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </span>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             {/* Regular payments */}
//             {method !== "paypal" && (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-black text-white px-16 py-3 text-sm disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : "PLACE ORDER"}
//               </button>
//             )}

//             {/* PayPal Step 1 */}
//             {method === "paypal" && !paypalOrderId && (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-16 py-3 text-sm disabled:opacity-50"
//               >
//                 {loading ? "Creating PayPal Order..." : "CONTINUE TO PAYPAL"}
//               </button>
//             )}

//             {/* PayPal Step 2 */}
//             {method === "paypal" && paypalOrderId && orderData && (
//               <div className="mt-4 border-t pt-4">
//                 <p className="text-sm text-gray-600 mb-3">Complete payment:</p>
//                 <PayPalButtons
//                   style={{ layout: "vertical" }}
//                   createOrder={() => paypalOrderId}
//                   onApprove={async (data) => {
//                     setLoading(true);
//                     try {
//                       console.log("🟦 PayPal: Verifying payment...");

//                       const res = await axios.post(
//                         `${backendUrl}/api/order/verifyPaypal`,
//                         {
//                           orderID: data.orderID,
//                           userId,
//                           orderData, // Send original INR data
//                         },
//                         { headers: { Authorization: `Bearer ${token}` } }
//                       );

//                       if (res.data.success) {
//                         console.log("🟩 Payment verified!");
//                         setCartItems({});
//                         navigate("/orders");
//                         toast.success("Payment successful! 🎉");
//                       } else {
//                         toast.error(res.data.message || "Verification failed");
//                       }
//                     } catch (err) {
//                       console.error("Verification error:", err);
//                       toast.error("Payment verification failed");
//                     } finally {
//                       setLoading(false);
//                     }
//                   }}
//                   onError={() => {
//                     toast.error("Payment failed");
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

// import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // ✅ Import PayPal components

// const PlaceOrder = () => {
//   const [method, setMethod] = useState("razorpay");
//   const [isPayPalReady, setIsPayPalReady] = useState(false); // ✅ Track PayPal readiness
//   const [orderDataToPayPal, setOrderDataToPayPal] = useState(null); // ✅ Store order data for PayPal

//   const {
//     navigate,
//     backendUrl,
//     token,
//     cartItems,
//     setCartItems,
//     products,
//     delivery_fee,
//     userId,
//   } = useContext(ShopContext);

//   const SHIPPING_FEE = 10;

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   // ============================================
//   // RAZORPAY PAYMENT HANDLER
//   // ============================================
//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       description: "Order Payment",
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         try {
//           const { data } = await axios.post(
//             `${backendUrl}/api/order/verifyRazorpay`,
//             response,
//             { headers: { Authorization: `Bearer ${token}` } },
//           );

//           if (data.success) {
//             setCartItems({});
//             navigate("/orders");
//             toast.success("Payment successful!");
//           } else {
//             toast.error(data.message || "Payment verification failed");
//           }
//         } catch (error) {
//           console.error(error);
//           toast.error(error.message || "Something went wrong");
//         }
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   // ============================================
//   // BUILD ORDER ITEMS (REUSABLE FUNCTION)
//   // ============================================
//   const buildOrderItems = () => {
//     let orderItems = [];

//     for (const productId in cartItems) {
//       const productInfo = products.find((p) => p._id === productId);
//       if (!productInfo) {
//         console.warn(`Product not found: ${productId}`);
//         continue;
//       }

//       // Parse price safely
//       const originalPrice = Number(productInfo.price);
//       if (isNaN(originalPrice) || originalPrice <= 0) {
//         console.error(
//           `Invalid price for product ${productId}:`,
//           productInfo.price,
//         );
//         toast.error(`Invalid price for product: ${productInfo.name}`);
//         return null;
//       }

//       // Get discount price
//       const discountedPrice = Number(productInfo.discountPrice) || 0;

//       let finalUnitPrice = originalPrice;
//       let discountAmount = 0;
//       let discountPercent = 0;

//       // If there's a valid discount price that's less than original
//       if (discountedPrice > 0 && discountedPrice < originalPrice) {
//         finalUnitPrice = discountedPrice;
//         discountAmount = originalPrice - discountedPrice;
//         discountPercent = ((discountAmount / originalPrice) * 100).toFixed(2);
//       }

//       const variants = cartItems[productId];

//       // Loop through size-color entries
//       for (const variantKey of Object.keys(variants)) {
//         const variantData = variants[variantKey];

//         // must be object like {quantity:1, customPrice:0}
//         if (typeof variantData !== "object") continue;

//         const qty = Number(variantData.quantity) || 0;
//         const customPrice = Number(variantData.customPrice) || 0;

//         if (qty <= 0) continue;

//         const [size, color] = variantKey.split("-");

//         // If there's a custom price, use it; otherwise use the calculated price
//         const itemFinalPrice =
//           customPrice > 0 ? finalUnitPrice + customPrice : finalUnitPrice;
//         const itemSubtotal = itemFinalPrice * qty;
//         const itemSaved = discountAmount * qty;

//         // DEBUGGING: Log calculated values
//         console.log("Item calculation:", {
//           productId,
//           name: productInfo.name,
//           originalPrice,
//           discountedPrice,
//           discountAmount,
//           discountPercent,
//           itemFinalPrice,
//           qty,
//           itemSubtotal,
//           itemSaved,
//         });

//         // Validate all numbers before pushing
//         if (
//           isNaN(originalPrice) ||
//           isNaN(discountAmount) ||
//           isNaN(itemFinalPrice) ||
//           isNaN(itemSubtotal) ||
//           isNaN(itemSaved)
//         ) {
//           console.error("NaN detected in item!", {
//             originalPrice,
//             discountAmount,
//             itemFinalPrice,
//             itemSubtotal,
//             itemSaved,
//           });
//           toast.error(`Error calculating price for ${productInfo.name}`);
//           return null;
//         }

//         orderItems.push({
//           productId,
//           name: productInfo.name,
//           image: productInfo.image?.[0] || "",

//           originalPrice,
//           discountPercent: Number(discountPercent),
//           discountAmount,
//           finalPrice: itemFinalPrice,

//           quantity: qty,
//           size,
//           color,

//           subtotal: itemSubtotal,
//           saved: itemSaved,
//         });
//       }
//     }

//     if (orderItems.length === 0) {
//       toast.error("Your cart is empty");
//       return null;
//     }

//     return orderItems;
//   };

//   // ============================================
//   // BUILD ORDER DATA (REUSABLE FUNCTION)
//   // ============================================
//   const buildOrderData = () => {
//     const orderItems = buildOrderItems();
//     if (!orderItems) return null;

//     // Calculate totals
//     const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
//     const discountTotal = orderItems.reduce((sum, item) => sum + item.saved, 0);
//     const finalAmount = subtotal + SHIPPING_FEE;

//     // DEBUGGING: Log totals
//     console.log("Order totals:", {
//       subtotal,
//       discountTotal,
//       shipping: SHIPPING_FEE,
//       finalAmount,
//       itemCount: orderItems.length,
//     });

//     // Validate totals before sending
//     if (isNaN(subtotal) || isNaN(discountTotal) || isNaN(finalAmount)) {
//       console.error("NaN detected in totals!", {
//         subtotal,
//         discountTotal,
//         finalAmount,
//       });
//       toast.error("Error calculating order total. Please try again.");
//       return null;
//     }

//     // Build final order data
//     const orderData = {
//       userId,
//       address: formData,
//       items: orderItems,
//       subtotal: Number(subtotal.toFixed(2)),
//       discountTotal: Number(discountTotal.toFixed(2)),
//       shipping: SHIPPING_FEE,
//       finalAmount: Number(finalAmount.toFixed(2)),
//     };

//     console.log("ORDER BUILT:", JSON.stringify(orderData, null, 2));

//     return orderData;
//   };

//   // ============================================
//   // MAIN ORDER SUBMISSION HANDLER
//   // ============================================
//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (!token) return toast.error("You must be logged in to place an order");
//     if (!userId) return toast.error("User ID not found. Please log in again.");

//     try {
//       const orderData = buildOrderData();
//       if (!orderData) return;

//       console.log("📦 ORDER SENT:", orderData);

//       let response;
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       // --------------------------------
//       // PAYMENT HANDLING
//       // --------------------------------

//       // COD - CASH ON DELIVERY
//       if (method === "cod") {
//         response = await axios.post(
//           `${backendUrl}/api/order/place`,
//           orderData,
//           config,
//         );
//         if (response.data.success) {
//           setCartItems({});
//           navigate("/orders");
//           toast.success("Order placed successfully!");
//         } else {
//           toast.error(response.data.message);
//         }
//       }

//       // STRIPE
//       if (method === "stripe") {
//         response = await axios.post(
//           `${backendUrl}/api/order/stripe`,
//           orderData,
//           config,
//         );
//         if (response.data.success) {
//           window.location.replace(response.data.session_url);
//         } else {
//           toast.error(response.data.message);
//         }
//       }

//       // RAZORPAY
//       if (method === "razorpay") {
//         response = await axios.post(
//           `${backendUrl}/api/order/razorpay`,
//           orderData,
//           config,
//         );
//         if (response.data.success) {
//           initPay(response.data.order);
//         } else {
//           toast.error(response.data.message);
//         }
//       }

//       // ✅ PAYPAL - Store order data and show PayPal buttons
//       if (method === "paypal") {
//         console.log("🔄 Preparing for PayPal payment...");
//         setOrderDataToPayPal(orderData);
//         setIsPayPalReady(true);

//         // Scroll to PayPal buttons
//         setTimeout(() => {
//           document
//             .getElementById("paypal-button-container")
//             ?.scrollIntoView({ behavior: "smooth" });
//         }, 100);
//       }
//     } catch (error) {
//       console.error("Order submission error:", error);
//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "Something went wrong",
//       );
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t p-24"
//     >
//       {/* LEFT SIDE */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1="DELIVERY" text2="INFORMATION" />
//         </div>

//         <div className="flex gap-3">
//           <input
//             required
//             name="firstName"
//             value={formData.firstName}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="First name"
//           />
//           <input
//             required
//             name="lastName"
//             value={formData.lastName}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="Last name"
//           />
//         </div>

//         <input
//           required
//           name="email"
//           value={formData.email}
//           onChange={onChangeHandler}
//           className="border rounded py-1.5 px-3.5 w-full"
//           placeholder="Email"
//         />
//         <input
//           required
//           name="street"
//           value={formData.street}
//           onChange={onChangeHandler}
//           className="border rounded py-1.5 px-3.5 w-full"
//           placeholder="Street"
//         />

//         <div className="flex gap-3">
//           <input
//             required
//             name="city"
//             value={formData.city}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="City"
//           />
//           <input
//             name="state"
//             value={formData.state}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="State"
//           />
//         </div>

//         <div className="flex gap-3">
//           <input
//             required
//             name="zipcode"
//             value={formData.zipcode}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="Zipcode"
//           />
//           <input
//             required
//             name="country"
//             value={formData.country}
//             onChange={onChangeHandler}
//             className="border rounded py-1.5 px-3.5 w-full"
//             placeholder="Country"
//           />
//         </div>

//         <input
//           required
//           name="phone"
//           value={formData.phone}
//           onChange={onChangeHandler}
//           className="border rounded py-1.5 px-3.5 w-full"
//           placeholder="Phone"
//         />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>

//         <div className="mt-12 ">
//           <Title text1="PAYMENT" text2="METHOD" />

//           <div className="flex gap-3 flex-col lg:flex-row mt-2">
//             <div
//               onClick={() => {
//                 setMethod("stripe");
//                 setIsPayPalReady(false);
//               }}
//               className="flex items-center gap-3 border border-indigo-500 rounded p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "stripe" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img className="w-14" src={assets.stripe_logo} />
//             </div>

//             <div
//               onClick={() => {
//                 setMethod("razorpay");
//                 setIsPayPalReady(false);
//               }}
//               className="flex items-center gap-3 border border-indigo-500 rounded p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "razorpay" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img className="h-5 mx-4" src={assets.razorpay_logo} />
//             </div>

//             {/* ✅ NEW - PAYPAL OPTION */}
//             <div
//               onClick={() => {
//                 setMethod("paypal");
//                 setIsPayPalReady(false);
//               }}
//               className="flex items-center gap-3 border border-indigo-500 rounded p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "paypal" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <span className="text-blue-600 text-sm font-semibold italic mx-4">
//                 <img src={assets.paypalLogo} alt="" className="w-20" />
//               </span>
//             </div>

//             {/* <div
//               onClick={() => {
//                 setMethod("cod");
//                 setIsPayPalReady(false);
//               }}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "cod" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <span className="text-gray-500 text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </span>
//             </div> */}
//           </div>

//           {/* ✅ NEW - PAYPAL BUTTONS SECTION */}
//           {method === "paypal" && isPayPalReady && orderDataToPayPal && (
//             <div
//               id="paypal-button-container"
//               className="mt-8 mb-8 p-4 border rounded bg-gray-50"
//             >
//               <PayPalButtons
//                 style={{ layout: "vertical" }}
//                 createOrder={async (data, actions) => {
//                   try {
//                     console.log("🔄 Creating PayPal order...");

//                     const response = await axios.post(
//                       `${backendUrl}/api/order/paypal`,
//                       orderDataToPayPal,
//                       { headers: { Authorization: `Bearer ${token}` } },
//                     );

//                     if (response.data.success) {
//                       console.log(
//                         "✅ PayPal order created:",
//                         response.data.orderID,
//                       );
//                       return response.data.orderID;
//                     } else {
//                       throw new Error(
//                         response.data.message ||
//                           "Failed to create PayPal order",
//                       );
//                     }
//                   } catch (error) {
//                     console.error("❌ Error creating PayPal order:", error);
//                     toast.error(
//                       error.response?.data?.message ||
//                         error.message ||
//                         "Failed to create PayPal order",
//                     );
//                     throw error;
//                   }
//                 }}
//                 onApprove={async (data, actions) => {
//                   try {
//                     console.log(
//                       "✅ User approved PayPal payment. Order ID:",
//                       data.orderID,
//                     );

//                     // Verify payment on backend
//                     const response = await axios.post(
//                       `${backendUrl}/api/order/verifyPaypal`,
//                       {
//                         orderID: data.orderID,
//                         userId: userId,
//                       },
//                       { headers: { Authorization: `Bearer ${token}` } },
//                     );

//                     if (response.data.success) {
//                       console.log("✅ Payment verified successfully");
//                       setCartItems({});
//                       navigate("/orders");
//                       toast.success("Payment successful!");
//                     } else {
//                       console.error(
//                         "❌ Payment verification failed:",
//                         response.data.message,
//                       );
//                       toast.error(
//                         response.data.message || "Payment verification failed",
//                       );
//                     }
//                   } catch (error) {
//                     console.error("❌ Error verifying PayPal payment:", error);
//                     toast.error(
//                       error.response?.data?.message ||
//                         error.message ||
//                         "Payment verification failed",
//                     );
//                   }
//                 }}
//                 onError={(err) => {
//                   console.error("❌ PayPal error:", err);
//                   toast.error(
//                     "Payment failed or was cancelled. Please try again.",
//                   );
//                 }}
//               />
//             </div>
//           )}

//           <div className="w-full text-end mt-8">
//             <button
//               type="submit"
//               className="bg-black text-white px-16 py-3 text-sm rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={method === "paypal" && isPayPalReady}
//             >
//               {method === "paypal" && isPayPalReady
//                 ? "PAYPAL READY - USE BUTTONS BELOW"
//                 : "PLACE ORDER"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

/* ─────────────────────────────────────────────
   Inline styles injected once – keeps the JSX
   clean while allowing custom fonts / keyframes
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

    .po-root { font-family: 'DM Sans', sans-serif; }
    .po-heading { font-family: 'Cormorant Garamond', serif; }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    .po-card {
      animation: fadeUp .55s ease both;
    }
    .po-card:nth-child(2) { animation-delay:.08s; }
    .po-card:nth-child(3) { animation-delay:.16s; }

    .po-input {
      width: 100%;
      border: 1px solid #d6cfc5;
      border-radius: 6px;
      padding: 10px 14px;
      font-size: 13.5px;
      font-family: 'DM Sans', sans-serif;
      background: #faf9f7;
      color: #1a1714;
      transition: border-color .2s, box-shadow .2s, background .2s;
      outline: none;
    }
    .po-input:focus {
      border-color: #8b7355;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(139,115,85,.12);
    }
    .po-input::placeholder { color: #a89e92; }

    .po-method {
      border: 1.5px solid #e3ddd5;
      border-radius: 10px;
      padding: 12px 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: border-color .2s, background .2s, transform .15s;
      background: #faf9f7;
      position: relative;
      overflow: hidden;
    }
    .po-method:hover {
      border-color: #8b7355;
      background: #fff;
      transform: translateY(-1px);
    }
    .po-method.active {
      border-color: #8b7355;
      background: #fff;
      box-shadow: 0 4px 18px rgba(139,115,85,.15);
    }
    .po-method.active::after {
      content:'';
      position:absolute;
      top:0; left:0; right:0;
      height:2px;
      background: linear-gradient(90deg,#8b7355,#c4a882);
    }

    .po-radio {
      width: 16px; height: 16px;
      border-radius: 50%;
      border: 2px solid #c4b8a8;
      display: flex; align-items:center; justify-content:center;
      flex-shrink: 0;
      transition: border-color .2s;
    }
    .po-radio.checked { border-color: #8b7355; }
    .po-radio.checked::after {
      content:'';
      width:7px; height:7px;
      border-radius:50%;
      background:#8b7355;
    }

    .po-btn {
      background: linear-gradient(135deg,#2a2118 0%,#4a3728 100%);
      color: #f5efe6;
      border: none;
      border-radius: 8px;
      padding: 14px 40px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity .2s, transform .15s, box-shadow .2s;
      position: relative;
      overflow: hidden;
    }
    .po-btn:hover:not(:disabled) {
      opacity:.92;
      transform: translateY(-1px);
      box-shadow: 0 6px 24px rgba(42,33,24,.35);
    }
    .po-btn:active:not(:disabled) { transform:translateY(0); }
    .po-btn:disabled {
      background: linear-gradient(135deg,#8b7355 0%,#a98b6a 100%);
      cursor: not-allowed;
    }
    .po-btn::before {
      content:'';
      position:absolute;
      top:0;left:-100%;
      width:60%;height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
      animation: shimmer 2.8s infinite;
      background-size:200%;
    }

    .po-section-label {
      font-size:11px;
      letter-spacing:2.5px;
      text-transform:uppercase;
      color:#a89e92;
      font-weight:500;
      margin-bottom:18px;
    }

    .po-divider {
      height:1px;
      background: linear-gradient(90deg,transparent,#d6cfc5,transparent);
      margin: 28px 0;
    }

    .po-paypal-wrapper {
      border: 1px solid #d6cfc5;
      border-radius: 10px;
      padding: 24px;
      background: #faf9f7;
      animation: fadeUp .4s ease;
    }
  `}</style>
);

const PlaceOrder = () => {
  const [method, setMethod] = useState("razorpay");
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const [orderDataToPayPal, setOrderDataToPayPal] = useState(null);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    delivery_fee,
    userId,
  } = useContext(ShopContext);

  const SHIPPING_FEE = 10;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Payment successful!");
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          toast.error(error.message || "Something went wrong");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const buildOrderItems = () => {
    let orderItems = [];
    for (const productId in cartItems) {
      const productInfo = products.find((p) => p._id === productId);
      if (!productInfo) continue;

      const originalPrice = Number(productInfo.price);
      if (isNaN(originalPrice) || originalPrice <= 0) {
        toast.error(`Invalid price for product: ${productInfo.name}`);
        return null;
      }

      const discountedPrice = Number(productInfo.discountPrice) || 0;
      let finalUnitPrice = originalPrice;
      let discountAmount = 0;
      let discountPercent = 0;

      if (discountedPrice > 0 && discountedPrice < originalPrice) {
        finalUnitPrice = discountedPrice;
        discountAmount = originalPrice - discountedPrice;
        discountPercent = ((discountAmount / originalPrice) * 100).toFixed(2);
      }

      const variants = cartItems[productId];
      for (const variantKey of Object.keys(variants)) {
        const variantData = variants[variantKey];
        if (typeof variantData !== "object") continue;
        const qty = Number(variantData.quantity) || 0;
        const customPrice = Number(variantData.customPrice) || 0;
        if (qty <= 0) continue;
        const [size, color] = variantKey.split("-");
        const itemFinalPrice =
          customPrice > 0 ? finalUnitPrice + customPrice : finalUnitPrice;
        const itemSubtotal = itemFinalPrice * qty;
        const itemSaved = discountAmount * qty;

        orderItems.push({
          productId,
          name: productInfo.name,
          image: productInfo.image?.[0] || "",
          originalPrice,
          discountPercent: Number(discountPercent),
          discountAmount,
          finalPrice: itemFinalPrice,
          quantity: qty,
          size,
          color,
          subtotal: itemSubtotal,
          saved: itemSaved,
        });
      }
    }
    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return null;
    }
    return orderItems;
  };

  const buildOrderData = () => {
    const orderItems = buildOrderItems();
    if (!orderItems) return null;
    const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discountTotal = orderItems.reduce((sum, item) => sum + item.saved, 0);
    const finalAmount = subtotal + SHIPPING_FEE;
    if (isNaN(subtotal) || isNaN(discountTotal) || isNaN(finalAmount)) {
      toast.error("Error calculating order total. Please try again.");
      return null;
    }
    return {
      userId,
      address: formData,
      items: orderItems,
      subtotal: Number(subtotal.toFixed(2)),
      discountTotal: Number(discountTotal.toFixed(2)),
      shipping: SHIPPING_FEE,
      finalAmount: Number(finalAmount.toFixed(2)),
    };
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!token) return toast.error("You must be logged in to place an order");
    if (!userId) return toast.error("User ID not found. Please log in again.");
    try {
      const orderData = buildOrderData();
      if (!orderData) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          config,
        );
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
          toast.success("Order placed successfully!");
        } else toast.error(response.data.message);
      }

      if (method === "stripe") {
        const response = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          config,
        );
        if (response.data.success)
          window.location.replace(response.data.session_url);
        else toast.error(response.data.message);
      }

      if (method === "razorpay") {
        const response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          config,
        );
        if (response.data.success) initPay(response.data.order);
        else toast.error(response.data.message);
      }

      if (method === "paypal") {
        setOrderDataToPayPal(orderData);
        setIsPayPalReady(true);
        setTimeout(() => {
          document
            .getElementById("paypal-button-container")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  const paymentMethods = [
    {
      id: "stripe",
      label: "Credit Card",
      logo: (
        <img
          src={assets.stripe_logo}
          className="h-5 object-contain"
          alt="Stripe"
        />
      ),
    },
    {
      id: "razorpay",
      label: "Razorpay",
      logo: (
        <img
          src={assets.razorpay_logo}
          className="h-5 object-contain"
          alt="Razorpay"
        />
      ),
    },
    {
      id: "paypal",
      label: "PayPal",
      logo: (
        <img
          src={assets.paypalLogo}
          className="h-5 object-contain"
          alt="PayPal"
        />
      ),
    },
  ];

  return (
    <>
      <GlobalStyles />

      <form
        onSubmit={onSubmitHandler}
        className="po-root"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg,#f9f6f2 0%,#f0ebe3 100%)",
          padding: "60px 24px 80px",
        }}
      >
        {/* Page header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 52,
            animation: "fadeUp .5s ease",
          }}
        >
          <p className="po-section-label" style={{ marginBottom: 8 }}>
            Secure Checkout
          </p>
          <h1
            className="po-heading"
            style={{
              fontSize: "clamp(28px,4vw,42px)",
              fontWeight: 300,
              color: "#1a1714",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            Complete Your Order
          </h1>
          <div
            style={{
              width: 48,
              height: 1.5,
              background:
                "linear-gradient(90deg,transparent,#8b7355,transparent)",
              margin: "18px auto 0",
            }}
          />
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr min(400px,100%)",
            gap: 36,
            alignItems: "start",
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Delivery info card */}
            <div
              className="po-card"
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "32px 36px",
                boxShadow: "0 2px 20px rgba(26,23,20,.06)",
              }}
            >
              <p className="po-section-label">Delivery Information</p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <input
                  required
                  className="po-input"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  placeholder="First name"
                />
                <input
                  required
                  className="po-input"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  placeholder="Last name"
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <input
                  required
                  className="po-input"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <div style={{ marginTop: 14 }}>
                <input
                  required
                  className="po-input"
                  name="street"
                  value={formData.street}
                  onChange={onChangeHandler}
                  placeholder="Street address"
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginTop: 14,
                }}
              >
                <input
                  required
                  className="po-input"
                  name="city"
                  value={formData.city}
                  onChange={onChangeHandler}
                  placeholder="City"
                />
                <input
                  className="po-input"
                  name="state"
                  value={formData.state}
                  onChange={onChangeHandler}
                  placeholder="State / Province"
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginTop: 14,
                }}
              >
                <input
                  required
                  className="po-input"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={onChangeHandler}
                  placeholder="Postal code"
                />
                <input
                  required
                  className="po-input"
                  name="country"
                  value={formData.country}
                  onChange={onChangeHandler}
                  placeholder="Country"
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <input
                  required
                  className="po-input"
                  name="phone"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  placeholder="Phone number"
                  type="tel"
                />
              </div>
            </div>

            {/* Payment method card */}
            <div
              className="po-card"
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "32px 36px",
                boxShadow: "0 2px 20px rgba(26,23,20,.06)",
              }}
            >
              <p className="po-section-label">Payment Method</p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className={`po-method ${method === pm.id ? "active" : ""}`}
                    onClick={() => {
                      setMethod(pm.id);
                      setIsPayPalReady(false);
                    }}
                  >
                    <span
                      className={`po-radio ${method === pm.id ? "checked" : ""}`}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        color: "#4a3f35",
                        fontWeight: 500,
                        minWidth: 80,
                      }}
                    >
                      {pm.label}
                    </span>
                    {pm.logo}
                    {method === pm.id && (
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 11,
                          color: "#8b7355",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        Selected
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* PayPal buttons */}
              {method === "paypal" && isPayPalReady && orderDataToPayPal && (
                <div
                  id="paypal-button-container"
                  className="po-paypal-wrapper"
                  style={{ marginTop: 24 }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color: "#a89e92",
                      marginBottom: 16,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Complete payment with PayPal
                  </p>
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      shape: "rect",
                      color: "gold",
                      label: "pay",
                    }}
                    createOrder={async () => {
                      try {
                        const response = await axios.post(
                          `${backendUrl}/api/order/paypal`,
                          orderDataToPayPal,
                          { headers: { Authorization: `Bearer ${token}` } },
                        );
                        if (response.data.success) return response.data.orderID;
                        throw new Error(
                          response.data.message ||
                            "Failed to create PayPal order",
                        );
                      } catch (error) {
                        toast.error(
                          error.response?.data?.message ||
                            error.message ||
                            "Failed to create PayPal order",
                        );
                        throw error;
                      }
                    }}
                    onApprove={async (data) => {
                      try {
                        const response = await axios.post(
                          `${backendUrl}/api/order/verifyPaypal`,
                          { orderID: data.orderID, userId },
                          { headers: { Authorization: `Bearer ${token}` } },
                        );
                        if (response.data.success) {
                          setCartItems({});
                          navigate("/orders");
                          toast.success("Payment successful!");
                        } else {
                          toast.error(
                            response.data.message ||
                              "Payment verification failed",
                          );
                        }
                      } catch (error) {
                        toast.error(
                          error.response?.data?.message ||
                            error.message ||
                            "Payment verification failed",
                        );
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      toast.error(
                        "Payment failed or was cancelled. Please try again.",
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
            className="po-card"
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "32px 36px",
              boxShadow: "0 2px 20px rgba(26,23,20,.06)",
              position: "sticky",
              top: 28,
            }}
          >
            <p className="po-section-label">Order Summary</p>

            {/* CartTotal component */}
            <CartTotal />

            <div className="po-divider" />

            {/* Security badges */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
                justifyContent: "center",
              }}
            >
              {["🔒 SSL Secure", "✦ Encrypted", "⚡ Instant Confirm"].map(
                (badge) => (
                  <span
                    key={badge}
                    style={{
                      fontSize: 10.5,
                      color: "#a89e92",
                      letterSpacing: 0.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {badge}
                  </span>
                ),
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="po-btn"
              disabled={method === "paypal" && isPayPalReady}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {method === "paypal" && isPayPalReady ? (
                "↓ Use PayPal Buttons Below"
              ) : (
                <>
                  <span>Place Order</span>
                  <span style={{ fontSize: 16, opacity: 0.7 }}>→</span>
                </>
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: 11.5,
                color: "#a89e92",
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              By placing your order you agree to our
              <br />
              <span
                style={{
                  color: "#8b7355",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Terms of Service
              </span>
              {" & "}
              <span
                style={{
                  color: "#8b7355",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
