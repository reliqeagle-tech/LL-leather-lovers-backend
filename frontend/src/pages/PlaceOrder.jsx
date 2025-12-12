import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

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

// REPLACE the onSubmitHandler function in your PlaceOrder.jsx with this fixed version:

// REPLACE the onSubmitHandler function in your PlaceOrder.jsx with this fixed version:

const onSubmitHandler = async (event) => {
  event.preventDefault();

  if (!token) return toast.error("You must be logged in to place an order");
  if (!userId) return toast.error("User ID not found. Please log in again.");

  try {
    let orderItems = [];

    // -------------------------------
    // BUILD ORDER ITEMS SAFELY
    // -------------------------------
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
        return;
      }

      // FIXED: discountPrice is the ACTUAL discounted price, not a percentage!
      const discountedPrice = Number(productInfo.discountPrice) || 0;
      
      // Determine the final price to use
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
          return;
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
      return;
    }

    // -------------------------------
    // CALCULATE TOTALS
    // -------------------------------
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
      return;
    }

    // -------------------------------
    // ORDER DATA
    // -------------------------------
    const orderData = {
      userId,  // Add userId from context
      address: formData,
      items: orderItems,
      subtotal: Number(subtotal.toFixed(2)),
      discountTotal: Number(discountTotal.toFixed(2)),
      shipping: SHIPPING_FEE,
      finalAmount: Number(finalAmount.toFixed(2)),
    };

    console.log("ORDER SENT:", orderData);
    console.log("ORDER DATA (stringified):", JSON.stringify(orderData, null, 2));

    let response;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // --------------------------------
    // PAYMENT HANDLING
    // --------------------------------
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
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="First name" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Last name" />
        </div>

        <input required name="email" value={formData.email} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Email" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Street" />

        <div className="flex gap-3">
          <input required name="city" value={formData.city} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="City" />
          <input name="state" value={formData.state} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input required name="zipcode" value={formData.zipcode} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Zipcode" />
          <input required name="country" value={formData.country} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Country" />
        </div>

        <input required name="phone" value={formData.phone} onChange={onChangeHandler} className="border rounded py-1.5 px-3.5 w-full" placeholder="Phone" />
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} />
            </div>

            <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} />
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <span className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</span>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
