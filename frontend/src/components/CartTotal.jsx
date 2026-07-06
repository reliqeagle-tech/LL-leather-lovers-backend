import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { cartItems, products, delivery_fee, currency } = useContext(ShopContext);

  const { itemsTotal, subtotal, discountSaved } = useMemo(() => {
    let itemsTotalCalc = 0;
    let subtotalCalc = 0;
    let discountCalc = 0;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      const discountPercent = Number(product.discountPrice) || 0;

      for (const comboKey in cartItems[productId]) {
        const item = cartItems[productId][comboKey];
        const qty = item.quantity || 0;
        const extra = Number(item.customPrice) || 0;

        const original = Number(item.sizePrice) || Number(product.price);   // ✅ size-specific price
        const discountAmount = discountPercent > 0 && discountPercent < 100
          ? (original * discountPercent) / 100 : 0;
        const finalPrice = original - discountAmount;

        itemsTotalCalc += (original + extra) * qty;
        subtotalCalc += (finalPrice + extra) * qty;
        discountCalc += discountAmount * qty;
      }
    }

    return {
      itemsTotal: Number(itemsTotalCalc.toFixed(2)),
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

      <div className="flex flex-col gap-3 mt-3 p-4 bg-gray-900 rounded-lg border border-gray-800 text-sm sm:text-base">
        <div className="flex justify-between">
          <p className="text-gray-300">Items Total</p>
          <p className="font-medium text-gray-200">{currency}{itemsTotal.toFixed(2)}</p>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between">
          <p className="text-gray-300">Discount</p>
          <p className="font-medium text-orange-500">
            {discountSaved > 0 ? `−${currency}${discountSaved.toFixed(2)}` : `${currency}0.00`}
          </p>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between">
          <p className="text-gray-300">Subtotal</p>
          <p className="font-medium text-gray-200">{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between">
          <p className="text-gray-300">Shipping Fee</p>
          <p className="font-medium text-gray-200">{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between">
          <b className="text-white">Total</b>
          <b className="text-white">{currency}{total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
