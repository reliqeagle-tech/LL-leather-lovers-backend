import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { loadScript } from "../utils/loadScript.js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const inputBase = {
  fontFamily: "'Montserrat',sans-serif", fontSize: '12px', padding: '10px 14px',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '8px', color: 'rgba(255,255,255,.55)', width: '100%', outline: 'none', transition: 'all 0.2s',
};
const focusStyle = e => { e.target.style.border = '1px solid rgba(99,102,241,0.5)'; e.target.style.background = 'rgba(99,102,241,0.05)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; };
const blurStyle = e => { e.target.style.border = '1px solid rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.boxShadow = 'none'; };

const Field = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.70)', textTransform: 'uppercase' }}>{label}</label>
    <input {...props} style={inputBase} onFocus={focusStyle} onBlur={blurStyle} />
  </div>
);

const PlaceOrder = () => {
  const [method, setMethod] = useState("razorpay");
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const [orderDataToPayPal, setOrderDataToPayPal] = useState(null);
  const [{ isResolved }, paypalDispatch] = usePayPalScriptReducer();

  const { navigate, backendUrl, token, cartItems, setCartItems, products, userId } = useContext(ShopContext);
  const SHIPPING_FEE = 0;
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: '' });
  const onChangeHandler = e => setFormData(d => ({ ...d, [e.target.name]: e.target.value }));

  const initPay = async (order) => {
    const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpay-sdk');
    if (!ok || !window.Razorpay) {
      toast.error('Payment gateway failed to load. Please try again.');
      return;
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, amount: order.amount, currency: order.currency,
      name: 'Order Payment', description: 'Order Payment', order_id: order.id, receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { Authorization: `Bearer ${token}` } });
          if (data.success) { setCartItems({}); navigate('/orders'); toast.success('Payment successful!'); }
          else toast.error(data.message || 'Verification failed');
        } catch (err) { toast.error(err.message); }
      },
    };
    new window.Razorpay(options).open();
  };

  // const buildOrderItems = () => {
  //   let orderItems = [];
  //   for (const productId in cartItems) {
  //     const productInfo = products.find(p => p._id === productId);
  //     if (!productInfo) continue;
  //     const originalPrice = Number(productInfo.price);
  //     if (isNaN(originalPrice) || originalPrice <= 0) { toast.error(`Invalid price: ${productInfo.name}`); return null; }
  //     const discountedPrice = Number(productInfo.discountPrice) || 0;
  //     let finalUnitPrice = originalPrice, discountAmount = 0, discountPercent = 0;
  //     if (discountedPrice > 0 && discountedPrice < originalPrice) {
  //       finalUnitPrice = discountedPrice; discountAmount = originalPrice - discountedPrice;
  //       discountPercent = ((discountAmount / originalPrice) * 100).toFixed(2);
  //     }
  //     for (const variantKey of Object.keys(cartItems[productId])) {
  //       const variantData = cartItems[productId][variantKey];
  //       if (typeof variantData !== 'object') continue;
  //       const qty = Number(variantData.quantity) || 0;
  //       const customPrice = Number(variantData.customPrice) || 0;
  //       if (qty <= 0) continue;
  //       const [size, color] = variantKey.split('-');
  //       const itemFinalPrice = customPrice > 0 ? finalUnitPrice + customPrice : finalUnitPrice;
  //       orderItems.push({
  //         productId, name: productInfo.name, image: productInfo.image?.[0] || '',
  //         originalPrice, discountPercent: Number(discountPercent), discountAmount,
  //         finalPrice: itemFinalPrice, quantity: qty, size, color,
  //         subtotal: itemFinalPrice * qty, saved: discountAmount * qty
  //       });
  //     }
  //   }
  //   if (orderItems.length === 0) { toast.error('Your cart is empty'); return null; }
  //   return orderItems;
  // };

  const buildOrderItems = () => {
    let orderItems = [];
    for (const productId in cartItems) {
      const productInfo = products.find(p => p._id === productId);
      if (!productInfo) continue;

      const discountPercent = Number(productInfo.discountPrice) || 0;

      for (const variantKey of Object.keys(cartItems[productId])) {
        const variantData = cartItems[productId][variantKey];
        if (typeof variantData !== 'object') continue;
        const qty = Number(variantData.quantity) || 0;
        const customPrice = Number(variantData.customPrice) || 0;
        if (qty <= 0) continue;

        const originalPrice = Number(variantData.sizePrice) || Number(productInfo.price);
        if (isNaN(originalPrice) || originalPrice <= 0) { toast.error(`Invalid price: ${productInfo.name}`); return null; }

        const discountAmount = discountPercent > 0 && discountPercent < 100
          ? (originalPrice * discountPercent) / 100 : 0;
        const finalUnitPrice = originalPrice - discountAmount;

        const [size, color] = variantKey.split('-');
        const itemFinalPrice = customPrice > 0 ? finalUnitPrice + customPrice : finalUnitPrice;

        orderItems.push({
          productId, name: productInfo.name, image: productInfo.image?.[0] || '',
          originalPrice, discountPercent, discountAmount,
          finalPrice: itemFinalPrice, quantity: qty, size, color,
          subtotal: itemFinalPrice * qty, saved: discountAmount * qty
        });
      }
    }
    if (orderItems.length === 0) { toast.error('Your cart is empty'); return null; }
    return orderItems;
  };

  const buildOrderData = () => {
    const orderItems = buildOrderItems();
    if (!orderItems) return null;
    const subtotal = orderItems.reduce((s, i) => s + i.subtotal, 0);
    const discountTotal = orderItems.reduce((s, i) => s + i.saved, 0);
    return {
      userId, address: formData, items: orderItems,
      subtotal: Number(subtotal.toFixed(2)), discountTotal: Number(discountTotal.toFixed(2)),
      shipping: SHIPPING_FEE, finalAmount: Number((subtotal + SHIPPING_FEE).toFixed(2))
    };
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!token) return toast.error('Please login first');
    try {
      const orderData = buildOrderData();
      if (!orderData) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (method === 'cod') {
        const res = await axios.post(`${backendUrl}/api/order/place`, orderData, config);
        if (res.data.success) { setCartItems({}); navigate('/orders'); toast.success('Order placed!'); }
        else toast.error(res.data.message);
      }
      if (method === 'stripe') {
        const res = await axios.post(`${backendUrl}/api/order/stripe`, orderData, config);
        if (res.data.success) window.location.replace(res.data.session_url);
        else toast.error(res.data.message);
      }
      if (method === 'razorpay') {
        const res = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, config);
        if (res.data.success) await initPay(res.data.order);
        else toast.error(res.data.message);
      }
      if (method === 'paypal') {
        setOrderDataToPayPal(orderData); setIsPayPalReady(true);
        setTimeout(() => document.getElementById('paypal-btn')?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } catch (err) { toast.error(err.response?.data?.message || err.message); }
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #08080f 0%, #0b0b14 100%)' }} className="min-h-screen py-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto mb-8">
        <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-1" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '4px' }}>Almost There</p>
        <h1 className="text-white font-light" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,4vw,44px)' }}>
          Place Your <em className="text-indigo-400 italic font-light">Order</em>
        </h1>
        <div className="w-32 h-px mt-3" style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
      </div>

      <form onSubmit={onSubmitHandler} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Delivery */}
        <div className="flex-1">
          <div className="rounded-2xl overflow-hidden border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="h-px" style={{ background: 'linear-gradient(90deg, #6366f1, #a5b4fc, transparent)' }} />
            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-indigo-400 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>Delivery Information</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" name="firstName" placeholder="John" value={formData.firstName} onChange={onChangeHandler} required />
                <Field label="Last Name" name="lastName" placeholder="Doe" value={formData.lastName} onChange={onChangeHandler} required />
              </div>
              <Field label="Email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={onChangeHandler} required />
              <Field label="Street" name="street" placeholder="123 Main Street" value={formData.street} onChange={onChangeHandler} required />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" name="city" placeholder="New York" value={formData.city} onChange={onChangeHandler} required />
                <Field label="State" name="state" placeholder="NY" value={formData.state} onChange={onChangeHandler} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Zipcode" name="zipcode" placeholder="10001" value={formData.zipcode} onChange={onChangeHandler} required />
                <Field label="Country" name="country" placeholder="USA" value={formData.country} onChange={onChangeHandler} required />
              </div>
              <Field label="Phone" name="phone" type="tel" placeholder="+1 (415) 555-0132" value={formData.phone} onChange={onChangeHandler} required />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-[380px] shrink-0 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="h-px" style={{ background: 'linear-gradient(90deg, #6366f1, #a5b4fc, transparent)' }} />
            <div className="p-6">
              <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px' }}>Order Summary</p>
              <CartTotal />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(201,124,58,0.7), transparent)' }} />
            <div className="p-6">
              <p className="font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '3px', color: '#c97c3a' }}>Payment Method</p>
              <div className="space-y-2.5 mb-5">
                {[
                  { id: 'stripe', logo: assets.stripe_logo, cls: 'w-12' },
                  { id: 'razorpay', logo: assets.razorpay_logo, cls: 'h-4 mx-2' },
                  { id: 'paypal', logo: assets.paypalLogo, cls: 'w-16' },
                ].map(({ id, logo, cls }) => (
                  <button key={id} type="button" onClick={() => {
                    setMethod(id); setIsPayPalReady(false);
                    if (id === 'paypal' && !isResolved) {
                      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
                    }
                  }}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 border transition-all duration-200"
                    style={{ background: method === id ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)', border: method === id ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${method === id ? 'border-indigo-400' : 'border-white/20'}`}>
                      {method === id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    </div>
                    <img src={logo} alt={id} className={`object-contain ${cls}`} />
                  </button>
                ))}
              </div>

              {method === 'paypal' && isPayPalReady && orderDataToPayPal && (
                <div id="paypal-btn" className="rounded-xl overflow-hidden border border-white/[0.07] p-3 mb-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <PayPalButtons style={{ layout: 'vertical' }}
                    createOrder={async () => {
                      const res = await axios.post(`${backendUrl}/api/order/paypal`, orderDataToPayPal, { headers: { Authorization: `Bearer ${token}` } });
                      if (res.data.success) return res.data.orderID;
                      throw new Error(res.data.message);
                    }}
                    onApprove={async (data) => {
                      const res = await axios.post(`${backendUrl}/api/order/verifyPaypal`, { orderID: data.orderID, userId }, { headers: { Authorization: `Bearer ${token}` } });
                      if (res.data.success) { setCartItems({}); navigate('/orders'); toast.success('Payment successful!'); }
                      else toast.error(res.data.message);
                    }}
                    onError={() => toast.error('Payment failed.')}
                  />
                </div>
              )}

              <button type="submit" disabled={method === 'paypal' && isPayPalReady}
                className="w-full relative overflow-hidden rounded-lg text-white font-semibold uppercase tracking-widest py-4 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '2.5px', background: '#6366f1' }}>
                <span className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-lg" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {method === 'paypal' && isPayPalReady ? 'Use PayPal Buttons Above' : 'Place Order'}
                </span>
              </button>

              <div className="mt-4 space-y-1.5">
                {['🔒 256-bit SSL secured', '📦 Free insured delivery', '↩️ 7-day returns'].map(t => (
                  <p key={t} className="text-white/70 text-center" style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px' }}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
