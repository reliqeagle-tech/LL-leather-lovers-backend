import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // LIST OF ALL ORDERS WITH INDIVIDUAL ITEMS
        let flatList = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            flatList.push({
              ...item,

              // We already have these from backend
              subtotal: Number(item.subtotal),
              saved: Number(item.saved),
              finalPrice: Number(item.finalPrice),

              // Order level fields
              orderTotal: Number(order.finalAmount),
              paymentMethod: order.paymentMethod,
              payment: order.payment,
              status: order.status,
              date: order.date,
            });
          });
        });

        setOrderData(flatList.reverse());
      }
    } catch (error) {
      console.log("API error:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 pb-20">
      <div className="text-center text-2xl mb-10">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-10"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>

                  <div className="flex flex-col gap-1 mt-1 text-base text-gray-700">

                    {/* Subtotal */}
                    <p>
                      Subtotal: {currency}
                      {item.subtotal.toFixed(2)}
                    </p>

                    {/* Discount saved */}
                    <p className="text-green-600">
                      You Saved: {currency}
                      {item.saved.toFixed(2)}
                    </p>

                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>

                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">
                      {item.paymentMethod}
                    </span>
                  </p>

                  {/* Order Total */}
                  <p className="mt-1 font-semibold text-gray-900">
                    Total (incl. shipping): {currency}
                    {item.orderTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
