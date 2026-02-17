import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import AccountSidebar from "../components/AccountSidebar";
import Button from '@mui/material/Button'
import { FaAngleDown } from "react-icons/fa6";
import { assets } from "../assets/assets";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isOpenOrderProduct, setIsOpenOrderProdcut] = useState(null);
    const isShowOrderProduct = (index) => {
        if (isOpenOrderProduct === index) {
            setIsOpenOrderProdcut(null)
        } else {
            setIsOpenOrderProdcut(index);
        }
    }

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
              orderId: order._id,
              userId: order.userId, 
              productId: item._id, 
              orderTotal: Number(order.finalAmount),
              paymentMethod: order.paymentMethod,
              payment: order.payment,
              paymentId: order.paymentId,
              status: order.status,
              date: order.date,

              // flatList.push({
              // ...item,

              // // ORDER LEVEL
              // orderId: order._id,
              // orderTotal: Number(order.finalAmount),
              // paymentMethod: order.paymentMethod,
              // status: order.status,
              // date: order.date,

              // 👇 ADDRESS DATA ADD KARO
              firstName: order.address?.firstName,
              lastName: order.address?.lastName,
              email: order.address?.email,
              phone: order.address?.phone,
              street: order.address?.street,
              city: order.address?.city,
              state: order.address?.state,
              country: order.address?.country,
              zipcode: order.address?.zipcode,

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
    <div className='container flex flex-col md:flex-row gap-5 m-auto '>
      <div className='col1 md:w-[20%] py-10'>
        <AccountSidebar />
      </div>
      {/* <div className="border-t pt-4 pb-20 ">
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
                    {/* <p>
                      Subtotal: {currency}
                      {item.subtotal.toFixed(2)}
                    </p> */}

                    {/* Discount saved */}
                    {/* <p className="text-green-600">
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
                  </p> */}

                  {/* Order Total */}
                  {/* <p className="mt-1 font-semibold text-gray-900">
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
      </div> */} 
      <div className='col2 md:w-[80%]'>
        <div className="text-center p-4 text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
                    <div className='shadow-md rounded-md bg-white '>
                        <div className='py-4 px-3'>
                            {/* <h2 className='font-semibold text-gray-800'>My Orders</h2>
                            <p className='text-sm text-gray-600 font-medium'>There are <span className='font-bold text-primary'>3</span> prouduct in My Orders</p> */}
                            {orderData.length === 0 ? (
                              <p className="text-center text-gray-500">No orders found.</p>
                            ) : (
                              <div>
                                {orderData.map((item, index)=>(
                                  <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-md border border-gray-700 mt-4">
                                <table className="w-full text-sm text-left  text-body">
                                    <thead className="text-sm text-body bg-[#3872fa] text-white border-b rounded-base border-gray-300">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 font-medium">
                                                &nbsp;
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Order Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Payment Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Payment Method
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="pl-6 pr-16 py-3 font-medium whitespace-nowrap">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                PinCode
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Total Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                User Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Order Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-neutral-primary border-b border-gray-400">
                                            <td className="px-6 py-4">
                                                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={() => isShowOrderProduct(index)}><FaAngleDown className={`text-xl text-gray-700 ${isOpenOrderProduct === 0 ? 'rotate-180' : 'totate-0'}`} /></Button>
                                          </td>
                                          <td className="px-6 py-4 font-medium ">
                                            <span className='text-indigo-600'>{item.orderId}</span>
                                          </td>
                                          <td className="px-6 py-4 font-medium  ">
                                            <span className='text-indigo-600'>
                                              {item.paymentId || "N/A"}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 font-medium  ">
                                            <span className="text-gray-600">
                                              {item.paymentMethod}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap ">
                                            {/* {item.name} */}
                                            {item.firstName} {item.lastName}
                                          </td>
                                          <td className="px-6 py-4 font-medium text-gray-700">
                                            {item.phone}
                                          </td>
                                            <td className="pl-5 py-4 font-medium text-gray-700">
                                                  {item.street}, {item.city}, {item.state}, {item.country}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700">
                                                {item.zipcode}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700">
                                                Subtotal: {currency}
                                                {item.subtotal.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700">
                                              {item.email}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700">
                                                {item.userId}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                                {/* <Badge status="pending" /> */}
                                                <span className={`px-4 py-1 text-xs rounded-full capitalize 
                                                ${item.status === 'Order Placed' && 'bg-yellow-600 text-white'} 
                                                ${item.status === 'Packing' && 'bg-orange-400 text-white'}
                                                ${item.status === 'Shipped' && 'bg-orange-600 text-white'}
                                                ${item.status === 'Out for delivery' && 'bg-green-400 text-white'}
                                                ${item.status === 'Delivered' && 'bg-green-600 text-white'}
                                                `}>
                                                  {item.status}
                                                </span>
                                                
                                                {/* span className={` py-1 px-4 text-xs rounded-full capitalize ${props.status === 'pending' ? 'bg-primary text-white' : 'bg-green-500 text-[#fff]'} ${props.status === 'deliverd' && 'bg-green-700'}`}>{props.status}</span> */}
                                            </td>
                                          <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                            {new Date(item.date).toDateString()}
                                            
                                          </td>
                                        </tr>

                                        {
                                            isOpenOrderProduct === index &&
                                            <tr>
                                                <td className='pl-11 pt-2' colSpan="9">
                                                    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs border border-gray-500 ">
                                                        <table className="w-full text-sm text-left rtl:text-right text-body">
                                                            <thead className="text-sm bg-[#2299fe] text-white border-b rounded-base">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                                        Product Id
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 font-medium ">
                                                                        Product Title
                                                                    </th>
                                                                    <th scope="col" className="px-10 py-3 font-medium whitespace-nowrap">
                                                                        Image
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                                        Quantity
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                                        Discount
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                                        size
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                                        Sub Total
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="bg-neutral-primary border-b border-gray-400">
                                                                    <td className="px-6 py-4 text-indigo-600 font-medium">
                                                          {item._id}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-700 font-medium w-[300px] ">
                                                          {item.name}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                                                          <img src={item.image} className='w-[80px]  rounded-md object-contain bg-white' alt="" />
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap ">
                                                          {item.quantity}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-gray-700">
                                                          <p className="text-green-600">
                                                            You Saved: {currency}
                                                            {item.saved.toFixed(2)}
                                                          </p>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-gray-700">
                                                          {item.size}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-gray-700">
                                                          Total (incl. shipping): {currency}
                                                          {item.orderTotal.toFixed(2)}
                                                        </td>
                                                      </tr>
                                                      {/* <tr className="bg-neutral-primary border-b border-gray-400">
                                                                    <td className="px-6 py-4">
                                                                        <span className='text-gray-700'>68d4d89016a3ed9d35e85556</span>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-gray-700 font-medium ">
                                                                        A-Line Kurti With Sharara & Dup...
                                                                    </td>
                                                                    <td className="px-6 py-4 font-medium ">
                                                                        <img src={item.image} className='w-[40px] h-[40px] rounded-md object-cover' alt="" />
                                                                    </td>
                                                                    <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap ">
                                                                        2
                                                                    </td>
                                                                    <td className="px-6 py-4 font-medium text-gray-700">
                                                                        1300
                                                                    </td>
                                                                    <td className="px-6 py-4 font-medium text-gray-700">
                                                                        1300
                                                                    </td>
                                                                </tr> */}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>

                                        }
                                    </tbody>
                                </table>
                            </div>
                                ))}
                              </div>
                            )}
            
                        </div>

                    </div>
                </div>
    </div>
  );
};

export default Orders;
