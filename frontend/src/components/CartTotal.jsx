import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { cartItems, products, delivery_fee, currency } = useContext(ShopContext);

  // Calculate subtotal and discount correctly for nested cart structure + % discount
  const { subtotal, discountSaved } = useMemo(() => {
    let subtotalCalc = 0;
    let discountCalc = 0;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      const original = Number(product.price);
      const discountPercent = Number(product.discountPrice) || 0; // % stored in backend

      // Calculate % discount
      const discountAmount =
        discountPercent > 0 && discountPercent < 100
          ? (original * discountPercent) / 100
          : 0;

      const finalPrice = original - discountAmount; // price after discount

      for (const comboKey in cartItems[productId]) {
        const item = cartItems[productId][comboKey];
        const qty = item.quantity || 0;
        const extra = Number(item.customPrice) || 0;

        // Subtotal (price after % discount + any custom extra)
        subtotalCalc += (finalPrice + extra) * qty;

        // Discount saved
        discountCalc += discountAmount * qty;
      }
    }



    return {
      subtotal: Number(subtotalCalc.toFixed(2)),
      discountSaved: Number(discountCalc.toFixed(2)),
    };
  }, [cartItems, products]);

  const total = Number((subtotal + delivery_fee).toFixed(2));

  return (
    <div className="w-full">
      <div className="text-xl sm:text-2xl mb-3">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-3 mt-3 p-4 bg-gray-50 rounded-lg border text-sm sm:text-base">

        {/* Subtotal */}
        <div className="flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="font-medium">{currency}{subtotal.toFixed(2)}</p>
        </div>

        <hr />

        {/* Discount Saved */}
        <div className="flex justify-between">
          <p className="text-gray-700">You Saved</p>
          <p className="font-medium text-green-600">
            {currency}{discountSaved.toFixed(2)}
          </p>
        </div>

        <hr />

        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping Fee</p>
          <p className="font-medium">{currency}{delivery_fee.toFixed(2)}</p>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between">
          <b className="text-gray-900">Total</b>
          <b className="text-gray-900">{currency}{total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
