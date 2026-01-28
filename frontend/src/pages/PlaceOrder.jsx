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


import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // ✅ Import PayPal components

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [isPayPalReady, setIsPayPalReady] = useState(false); // ✅ Track PayPal readiness
  const [orderDataToPayPal, setOrderDataToPayPal] = useState(null); // ✅ Store order data for PayPal

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    delivery_fee,
    userId
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

  // ============================================
  // RAZORPAY PAYMENT HANDLER
  // ============================================
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
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Payment successful!");
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message || "Something went wrong");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ============================================
  // BUILD ORDER ITEMS (REUSABLE FUNCTION)
  // ============================================
  const buildOrderItems = () => {
    let orderItems = [];

    for (const productId in cartItems) {
      const productInfo = products.find((p) => p._id === productId);
      if (!productInfo) {
        console.warn(`Product not found: ${productId}`);
        continue;
      }

      // Parse price safely
      const originalPrice = Number(productInfo.price);
      if (isNaN(originalPrice) || originalPrice <= 0) {
        console.error(`Invalid price for product ${productId}:`, productInfo.price);
        toast.error(`Invalid price for product: ${productInfo.name}`);
        return null;
      }

      // Get discount price
      const discountedPrice = Number(productInfo.discountPrice) || 0;

      let finalUnitPrice = originalPrice;
      let discountAmount = 0;
      let discountPercent = 0;

      // If there's a valid discount price that's less than original
      if (discountedPrice > 0 && discountedPrice < originalPrice) {
        finalUnitPrice = discountedPrice;
        discountAmount = originalPrice - discountedPrice;
        discountPercent = ((discountAmount / originalPrice) * 100).toFixed(2);
      }

      const variants = cartItems[productId];

      // Loop through size-color entries
      for (const variantKey of Object.keys(variants)) {
        const variantData = variants[variantKey];

        // must be object like {quantity:1, customPrice:0}
        if (typeof variantData !== "object") continue;

        const qty = Number(variantData.quantity) || 0;
        const customPrice = Number(variantData.customPrice) || 0;

        if (qty <= 0) continue;

        const [size, color] = variantKey.split("-");

        // If there's a custom price, use it; otherwise use the calculated price
        const itemFinalPrice = customPrice > 0 ? (finalUnitPrice + customPrice) : finalUnitPrice;
        const itemSubtotal = itemFinalPrice * qty;
        const itemSaved = discountAmount * qty;

        // DEBUGGING: Log calculated values
        console.log('Item calculation:', {
          productId,
          name: productInfo.name,
          originalPrice,
          discountedPrice,
          discountAmount,
          discountPercent,
          itemFinalPrice,
          qty,
          itemSubtotal,
          itemSaved
        });

        // Validate all numbers before pushing
        if (
          isNaN(originalPrice) ||
          isNaN(discountAmount) ||
          isNaN(itemFinalPrice) ||
          isNaN(itemSubtotal) ||
          isNaN(itemSaved)
        ) {
          console.error('NaN detected in item!', {
            originalPrice,
            discountAmount,
            itemFinalPrice,
            itemSubtotal,
            itemSaved
          });
          toast.error(`Error calculating price for ${productInfo.name}`);
          return null;
        }

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

  // ============================================
  // BUILD ORDER DATA (REUSABLE FUNCTION)
  // ============================================
  const buildOrderData = () => {
    const orderItems = buildOrderItems();
    if (!orderItems) return null;

    // Calculate totals
    const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const discountTotal = orderItems.reduce((sum, item) => sum + item.saved, 0);
    const finalAmount = subtotal + SHIPPING_FEE;

    // DEBUGGING: Log totals
    console.log('Order totals:', {
      subtotal,
      discountTotal,
      shipping: SHIPPING_FEE,
      finalAmount,
      itemCount: orderItems.length
    });

    // Validate totals before sending
    if (isNaN(subtotal) || isNaN(discountTotal) || isNaN(finalAmount)) {
      console.error('NaN detected in totals!', { subtotal, discountTotal, finalAmount });
      toast.error("Error calculating order total. Please try again.");
      return null;
    }

    // Build final order data
    const orderData = {
      userId,
      address: formData,
      items: orderItems,
      subtotal: Number(subtotal.toFixed(2)),
      discountTotal: Number(discountTotal.toFixed(2)),
      shipping: SHIPPING_FEE,
      finalAmount: Number(finalAmount.toFixed(2)),
    };

    console.log("ORDER BUILT:", JSON.stringify(orderData, null, 2));

    return orderData;
  };

  // ============================================
  // MAIN ORDER SUBMISSION HANDLER
  // ============================================
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) return toast.error("You must be logged in to place an order");
    if (!userId) return toast.error("User ID not found. Please log in again.");

    try {
      const orderData = buildOrderData();
      if (!orderData) return;

      console.log("📦 ORDER SENT:", orderData);

      let response;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // --------------------------------
      // PAYMENT HANDLING
      // --------------------------------

      // COD - CASH ON DELIVERY
      if (method === "cod") {
        response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          config
        );
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
          toast.success("Order placed successfully!");
        } else {
          toast.error(response.data.message);
        }
      }

      // STRIPE
      if (method === "stripe") {
        response = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          config
        );
        if (response.data.success) {
          window.location.replace(response.data.session_url);
        } else {
          toast.error(response.data.message);
        }
      }

      // RAZORPAY
      if (method === "razorpay") {
        response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          config
        );
        if (response.data.success) {
          initPay(response.data.order);
        } else {
          toast.error(response.data.message);
        }
      }

      // ✅ PAYPAL - Store order data and show PayPal buttons
      if (method === "paypal") {
        console.log("🔄 Preparing for PayPal payment...");
        setOrderDataToPayPal(orderData);
        setIsPayPalReady(true);
        
        // Scroll to PayPal buttons
        setTimeout(() => {
          document.getElementById('paypal-button-container')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t p-24"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
          />
        </div>

        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Email"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => {
                setMethod("stripe");
                setIsPayPalReady(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} />
            </div>

            <div
              onClick={() => {
                setMethod("razorpay");
                setIsPayPalReady(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} />
            </div>

            {/* ✅ NEW - PAYPAL OPTION */}
            <div
              onClick={() => {
                setMethod("paypal");
                setIsPayPalReady(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "paypal" ? "bg-green-400" : ""
                }`}
              ></p>
              <span className="text-gray-500 text-sm font-medium mx-4">PAYPAL</span>
            </div>

            <div
              onClick={() => {
                setMethod("cod");
                setIsPayPalReady(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <span className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </span>
            </div>
          </div>

          {/* ✅ NEW - PAYPAL BUTTONS SECTION */}
          {method === "paypal" && isPayPalReady && orderDataToPayPal && (
            <div id="paypal-button-container" className="mt-8 mb-8 p-4 border rounded bg-gray-50">
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={async (data, actions) => {
                  try {
                    console.log("🔄 Creating PayPal order...");
                    
                    const response = await axios.post(
                      `${backendUrl}/api/order/paypal`,
                      orderDataToPayPal,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (response.data.success) {
                      console.log("✅ PayPal order created:", response.data.orderID);
                      return response.data.orderID;
                    } else {
                      throw new Error(response.data.message || "Failed to create PayPal order");
                    }
                  } catch (error) {
                    console.error("❌ Error creating PayPal order:", error);
                    toast.error(error.response?.data?.message || error.message || "Failed to create PayPal order");
                    throw error;
                  }
                }}
                onApprove={async (data, actions) => {
                  try {
                    console.log("✅ User approved PayPal payment. Order ID:", data.orderID);

                    // Verify payment on backend
                    const response = await axios.post(
                      `${backendUrl}/api/order/verifyPaypal`,
                      {
                        orderID: data.orderID,
                        userId: userId
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (response.data.success) {
                      console.log("✅ Payment verified successfully");
                      setCartItems({});
                      navigate("/orders");
                      toast.success("Payment successful!");
                    } else {
                      console.error("❌ Payment verification failed:", response.data.message);
                      toast.error(response.data.message || "Payment verification failed");
                    }
                  } catch (error) {
                    console.error("❌ Error verifying PayPal payment:", error);
                    toast.error(error.response?.data?.message || error.message || "Payment verification failed");
                  }
                }}
                onError={(err) => {
                  console.error("❌ PayPal error:", err);
                  toast.error("Payment failed or was cancelled. Please try again.");
                }}
              />
            </div>
          )}

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={method === "paypal" && isPayPalReady}
            >
              {method === "paypal" && isPayPalReady ? "PAYPAL READY - USE BUTTONS BELOW" : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;