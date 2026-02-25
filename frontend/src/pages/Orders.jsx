// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import axios from "axios";
// import AccountSidebar from "../components/AccountSidebar";
// import Button from '@mui/material/Button'
// import { FaAngleDown } from "react-icons/fa6";
// import { assets } from "../assets/assets";

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [isOpenOrderProduct, setIsOpenOrderProdcut] = useState(null);
//     const isShowOrderProduct = (index) => {
//         if (isOpenOrderProduct === index) {
//             setIsOpenOrderProdcut(null)
//         } else {
//             setIsOpenOrderProdcut(index);
//         }
//     }

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.post(
//         backendUrl + "/api/order/userorders",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         // LIST OF ALL ORDERS WITH INDIVIDUAL ITEMS
//         let flatList = [];

//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             flatList.push({
//               ...item,

//               // We already have these from backend
//               subtotal: Number(item.subtotal),
//               saved: Number(item.saved),
//               finalPrice: Number(item.finalPrice),

//               // Order level fields
//               orderId: order._id,
//               userId: order.userId,
//               productId: item._id,
//               orderTotal: Number(order.finalAmount),
//               paymentMethod: order.paymentMethod,
//               payment: order.payment,
//               paymentId: order.paymentId,
//               status: order.status,
//               date: order.date,

//               // flatList.push({
//               // ...item,

//               // // ORDER LEVEL
//               // orderId: order._id,
//               // orderTotal: Number(order.finalAmount),
//               // paymentMethod: order.paymentMethod,
//               // status: order.status,
//               // date: order.date,

//               // 👇 ADDRESS DATA ADD KARO
//               firstName: order.address?.firstName,
//               lastName: order.address?.lastName,
//               email: order.address?.email,
//               phone: order.address?.phone,
//               street: order.address?.street,
//               city: order.address?.city,
//               state: order.address?.state,
//               country: order.address?.country,
//               zipcode: order.address?.zipcode,

//             });
//           });
//         });

//         setOrderData(flatList.reverse());
//       }
//     } catch (error) {
//       console.log("API error:", error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <div className='container flex flex-col md:flex-row gap-5 m-auto '>
//       <div className='col1 md:w-[20%] py-10'>
//         <AccountSidebar />
//       </div>
//       {/* <div className="border-t pt-4 pb-20 ">
//         <div className="text-center text-2xl mb-10">
//           <Title text1={"MY"} text2={"ORDERS"} />
//         </div>

//         {orderData.length === 0 ? (
//           <p className="text-center text-gray-500">No orders found.</p>
//         ) : (
//           <div>
//             {orderData.map((item, index) => (
//             <div
//               key={index}
//               className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-10"
//             >
//               <div className="flex items-start gap-6 text-sm">
//                 <img
//                   className="w-16 sm:w-20 object-cover"
//                   src={item.image}
//                   alt={item.name}
//                 />

//                 <div>
//                   <p className="sm:text-base font-medium">{item.name}</p>

//                   <div className="flex flex-col gap-1 mt-1 text-base text-gray-700">

//                     {/* Subtotal */}
//                     {/* <p>
//                       Subtotal: {currency}
//                       {item.subtotal.toFixed(2)}
//                     </p> */}

//                     {/* Discount saved */}
//                     {/* <p className="text-green-600">
//                       You Saved: {currency}
//                       {item.saved.toFixed(2)}
//                     </p>

//                     <p>Qty: {item.quantity}</p>
//                     <p>Size: {item.size}</p>
//                   </div>

//                   <p className="mt-1">
//                     Date:{" "}
//                     <span className="text-gray-400">
//                       {new Date(item.date).toDateString()}
//                     </span>
//                   </p>

//                   <p className="mt-1">
//                     Payment:{" "}
//                     <span className="text-gray-400">
//                       {item.paymentMethod}
//                     </span>
//                   </p> */}

//                   {/* Order Total */}
//                   {/* <p className="mt-1 font-semibold text-gray-900">
//                     Total (incl. shipping): {currency}
//                     {item.orderTotal.toFixed(2)}
//                   </p>
//                 </div>
//               </div>

//               <div className="md:w-1/2 flex justify-between">
//                 <div className="flex items-center gap-2">
//                   <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                   <p className="text-sm md:text-base">{item.status}</p>
//                 </div>
//                 <button
//                   onClick={loadOrderData}
//                   className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
//                 >
//                   Track Order
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       </div> */}
//       <div className='col2 md:w-[80%]'>
//         <div className="text-center p-4 text-2xl">
//           <Title text1={"MY"} text2={"ORDERS"} />
//         </div>
//                     <div className='shadow-md rounded-md bg-white '>
//                         <div className='py-4 px-3'>
//                             {/* <h2 className='font-semibold text-gray-800'>My Orders</h2>
//                             <p className='text-sm text-gray-600 font-medium'>There are <span className='font-bold text-primary'>3</span> prouduct in My Orders</p> */}
//                             {orderData.length === 0 ? (
//                               <p className="text-center text-gray-500">No orders found.</p>
//                             ) : (
//                               <div>
//                                 {orderData.map((item, index)=>(
//                                   <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-md border border-gray-700 mt-4">
//                                 <table className="w-full text-sm text-left  text-body">
//                                     <thead className="text-sm text-body bg-[#3872fa] text-white border-b rounded-base border-gray-300">
//                                         <tr>
//                                             <th scope="col" className="px-6 py-3 font-medium">
//                                                 &nbsp;
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Order Id
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Payment Id
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Payment Method
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Name
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Phone Number
//                                             </th>
//                                             <th scope="col" className="pl-6 pr-16 py-3 font-medium whitespace-nowrap">
//                                                 Address
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 PinCode
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Total Amount
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Email
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 User Id
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Order Status
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                 Date
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr className="bg-neutral-primary border-b border-gray-400">
//                                             <td className="px-6 py-4">
//                                                 <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={() => isShowOrderProduct(index)}><FaAngleDown className={`text-xl text-gray-700 ${isOpenOrderProduct === 0 ? 'rotate-180' : 'totate-0'}`} /></Button>
//                                           </td>
//                                           <td className="px-6 py-4 font-medium ">
//                                             <span className='text-indigo-600'>{item.orderId}</span>
//                                           </td>
//                                           <td className="px-6 py-4 font-medium  ">
//                                             <span className='text-indigo-600'>
//                                               {item.paymentId || "N/A"}
//                                             </span>
//                                           </td>
//                                           <td className="px-6 py-4 font-medium  ">
//                                             <span className="text-gray-600">
//                                               {item.paymentMethod}
//                                             </span>
//                                           </td>
//                                           <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap ">
//                                             {/* {item.name} */}
//                                             {item.firstName} {item.lastName}
//                                           </td>
//                                           <td className="px-6 py-4 font-medium text-gray-700">
//                                             {item.phone}
//                                           </td>
//                                             <td className="pl-5 py-4 font-medium text-gray-700">
//                                                   {item.street}, {item.city}, {item.state}, {item.country}
//                                             </td>
//                                             <td className="px-6 py-4 font-medium text-gray-700">
//                                                 {item.zipcode}
//                                             </td>
//                                             <td className="px-6 py-4 font-medium text-gray-700">
//                                                 Subtotal: {currency}
//                                                 {item.subtotal.toFixed(2)}
//                                             </td>
//                                             <td className="px-6 py-4 font-medium text-gray-700">
//                                               {item.email}
//                                             </td>
//                                             <td className="px-6 py-4 font-medium text-gray-700">
//                                                 {item.userId}
//                                             </td>
//                                             <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
//                                                 {/* <Badge status="pending" /> */}
//                                                 <span className={`px-4 py-1 text-xs rounded-full capitalize
//                                                 ${item.status === 'Order Placed' && 'bg-yellow-600 text-white'}
//                                                 ${item.status === 'Packing' && 'bg-orange-400 text-white'}
//                                                 ${item.status === 'Shipped' && 'bg-orange-600 text-white'}
//                                                 ${item.status === 'Out for delivery' && 'bg-green-400 text-white'}
//                                                 ${item.status === 'Delivered' && 'bg-green-600 text-white'}
//                                                 `}>
//                                                   {item.status}
//                                                 </span>

//                                                 {/* span className={` py-1 px-4 text-xs rounded-full capitalize ${props.status === 'pending' ? 'bg-primary text-white' : 'bg-green-500 text-[#fff]'} ${props.status === 'deliverd' && 'bg-green-700'}`}>{props.status}</span> */}
//                                             </td>
//                                           <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
//                                             {new Date(item.date).toDateString()}

//                                           </td>
//                                         </tr>

//                                         {
//                                             isOpenOrderProduct === index &&
//                                             <tr>
//                                                 <td className='pl-11 pt-2' colSpan="9">
//                                                     <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs border border-gray-500 ">
//                                                         <table className="w-full text-sm text-left rtl:text-right text-body">
//                                                             <thead className="text-sm bg-[#2299fe] text-white border-b rounded-base">
//                                                                 <tr>
//                                                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                                         Product Id
//                                                                     </th>
//                                                                     <th scope="col" className="px-6 py-3 font-medium ">
//                                                                         Product Title
//                                                                     </th>
//                                                                     <th scope="col" className="px-10 py-3 font-medium whitespace-nowrap">
//                                                                         Image
//                                                                     </th>
//                                                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                                         Quantity
//                                                                     </th>
//                                                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                                         Discount
//                                                                     </th>
//                                                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                                         size
//                                                                     </th>
//                                                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
//                                                                         Sub Total
//                                                                     </th>

//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 <tr className="bg-neutral-primary border-b border-gray-400">
//                                                                     <td className="px-6 py-4 text-indigo-600 font-medium">
//                                                           {item._id}
//                                                         </td>
//                                                         <td className="px-6 py-4 text-gray-700 font-medium w-[300px] ">
//                                                           {item.name}
//                                                         </td>
//                                                         <td className="px-6 py-4 font-medium whitespace-nowrap">
//                                                           <img src={item.image} className='w-[80px]  rounded-md object-contain bg-white' alt="" />
//                                                         </td>
//                                                         <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap ">
//                                                           {item.quantity}
//                                                         </td>
//                                                         <td className="px-6 py-4 font-medium text-gray-700">
//                                                           <p className="text-green-600">
//                                                             You Saved: {currency}
//                                                             {item.saved.toFixed(2)}
//                                                           </p>
//                                                         </td>
//                                                         <td className="px-6 py-4 font-medium text-gray-700">
//                                                           {item.size}
//                                                         </td>
//                                                         <td className="px-6 py-4 font-medium text-gray-700">
//                                                           Total (incl. shipping): {currency}
//                                                           {item.orderTotal.toFixed(2)}
//                                                         </td>
//                                                       </tr>
//                                                       {/* <tr className="bg-neutral-primary border-b border-gray-400">
//                                                                     <td className="px-6 py-4">
//                                                                         <span className='text-gray-700'>68d4d89016a3ed9d35e85556</span>
//                                                                     </td>
//                                                                     <td className="px-6 py-4 text-gray-700 font-medium ">
//                                                                         A-Line Kurti With Sharara & Dup...
//                                                                     </td>
//                                                                     <td className="px-6 py-4 font-medium ">
//                                                                         <img src={item.image} className='w-[40px] h-[40px] rounded-md object-cover' alt="" />
//                                                                     </td>
//                                                                     <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap ">
//                                                                         2
//                                                                     </td>
//                                                                     <td className="px-6 py-4 font-medium text-gray-700">
//                                                                         1300
//                                                                     </td>
//                                                                     <td className="px-6 py-4 font-medium text-gray-700">
//                                                                         1300
//                                                                     </td>
//                                                                 </tr> */}
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 </td>
//                                             </tr>

//                                         }
//                                     </tbody>
//                                 </table>
//                             </div>
//                                 ))}
//                               </div>
//                             )}

//                         </div>

//                     </div>
//                 </div>
//     </div>
//   );
// };

// export default Orders;




// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import AccountSidebar from "../components/AccountSidebar";

// // MUI
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import {
//   Collapse, Chip, Tooltip, IconButton,
//   Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Box, Typography,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#6366f1" },
//     background: { paper: "#0e0e18", default: "#08080f" },
//     text: { primary: "#fff", secondary: "rgba(255,255,255,0.45)" },
//   },
//   typography: { fontFamily: "'Montserrat', sans-serif" },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderBottom: "1px solid rgba(255,255,255,0.06)",
//           fontFamily: "'Montserrat', sans-serif",
//           fontSize: "12px",
//           padding: "12px 16px",
//           color: "rgba(255,255,255,0.65)",
//         },
//         head: {
//           fontWeight: 600,
//           fontSize: "9px",
//           letterSpacing: "2.5px",
//           textTransform: "uppercase",
//           color: "rgba(255,255,255,0.35)",
//           background: "rgba(255,255,255,0.03)",
//           borderBottom: "1px solid rgba(255,255,255,0.08)",
//         },
//       },
//     },
//     MuiTableRow: {
//       styleOverrides: {
//         root: {
//           "&:hover": { background: "rgba(99,102,241,0.04)" },
//           transition: "background 0.2s",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           background: "rgba(255,255,255,0.02)",
//           border: "1px solid rgba(255,255,255,0.07)",
//           borderRadius: "12px",
//           boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: { fontFamily: "'Montserrat', sans-serif", fontSize: "9px",
//           fontWeight: 700, letterSpacing: "1px", height: "22px" },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           background: "rgba(255,255,255,0.04)",
//           border: "1px solid rgba(255,255,255,0.08)",
//           width: 30, height: 30,
//           "&:hover": { background: "rgba(99,102,241,0.15)",
//             borderColor: "rgba(99,102,241,0.4)" },
//           transition: "all 0.2s",
//         },
//       },
//     },
//   },
// });

// // Status chip colors
// const statusConfig = {
//   "Order Placed":    { color: "warning",  label: "Placed"      },
//   "Packing":         { color: "default",  label: "Packing"     },
//   "Shipped":         { color: "info",     label: "Shipped"     },
//   "Out for delivery":{ color: "success",  label: "Out for Delivery" },
//   "Delivered":       { color: "success",  label: "Delivered"   },
// };

// // Truncate long IDs
// const truncate = (str, n = 12) =>
//   str ? (str.length > n ? str.slice(0, n) + "…" : str) : "N/A";

// // ── Single order row with expandable details ──
// const OrderRow = ({ item, index, currency }) => {
//   const [open, setOpen] = useState(false);
//   const status = statusConfig[item.status] || { color: "default", label: item.status };

//   return (
//     <>
//       <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>

//         {/* Expand toggle */}
//         <TableCell width={48}>
//           <IconButton size="small" onClick={() => setOpen(!open)} aria-label="expand">
//             {open
//               ? <KeyboardArrowUpIcon sx={{ fontSize: 16, color: "#818cf8" }} />
//               : <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }} />
//             }
//           </IconButton>
//         </TableCell>

//         {/* Order ID */}
//         <TableCell>
//           <Tooltip title={item.orderId} placement="top" arrow>
//             <span className="text-indigo-400 cursor-pointer font-mono"
//               style={{ fontSize: "11px" }}>
//               #{truncate(item.orderId, 10)}
//             </span>
//           </Tooltip>
//         </TableCell>

//         {/* Product image + name */}
//         <TableCell>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
//               <img src={item.image} alt={item.name}
//                 className="w-full h-full object-contain p-1" />
//             </div>
//             <span className="line-clamp-2 text-white/70" style={{ maxWidth: "140px", fontSize: "11px" }}>
//               {item.name}
//             </span>
//           </div>
//         </TableCell>

//         {/* Customer */}
//         <TableCell>
//           <p className="text-white/70 whitespace-nowrap">
//             {item.firstName} {item.lastName}
//           </p>
//           <p className="text-white/30" style={{ fontSize: "10px" }}>{item.email}</p>
//         </TableCell>

//         {/* Payment */}
//         <TableCell>
//           <div className="flex flex-col gap-1">
//             <span className="text-white/60">{item.paymentMethod}</span>
//             <Chip
//               label={item.payment ? "Paid" : "Pending"}
//               size="small"
//               color={item.payment ? "success" : "warning"}
//               sx={{ width: "fit-content", height: "18px", fontSize: "9px" }}
//             />
//           </div>
//         </TableCell>

//         {/* Amount */}
//         <TableCell>
//           <span className="text-white font-semibold" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "16px" }}>
//             {currency}{item.subtotal?.toFixed(2)}
//           </span>
//           {item.saved > 0 && (
//             <p className="text-green-400" style={{ fontSize: "10px" }}>
//               Saved {currency}{item.saved?.toFixed(2)}
//             </p>
//           )}
//         </TableCell>

//         {/* Status */}
//         <TableCell>
//           <Chip label={status.label} color={status.color} size="small" />
//         </TableCell>

//         {/* Date */}
//         <TableCell>
//           <span className="text-white/40 whitespace-nowrap" style={{ fontSize: "11px" }}>
//             {new Date(item.date).toLocaleDateString("en-US", {
//               day: "numeric", month: "short", year: "numeric"
//             })}
//           </span>
//         </TableCell>
//       </TableRow>

//       {/* ── Expanded product details ── */}
//       <TableRow>
//         <TableCell colSpan={8} sx={{ p: 0, borderBottom: open ? "1px solid rgba(99,102,241,0.2)" : "none" }}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{
//               m: 2, borderRadius: "10px", overflow: "hidden",
//               border: "1px solid rgba(99,102,241,0.15)",
//               background: "rgba(99,102,241,0.04)",
//             }}>
//               {/* Expanded header */}
//               <Box sx={{ px: 3, py: 2, borderBottom: "1px solid rgba(255,255,255,0.06)",
//                 display: "flex", alignItems: "center", gap: 1 }}>
//                 <ShoppingBagOutlinedIcon sx={{ fontSize: 14, color: "#818cf8" }} />
//                 <Typography sx={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase",
//                   color: "rgba(255,255,255,0.35)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>
//                   Order Details
//                 </Typography>
//               </Box>

//               <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

//                 {/* Product info */}
//                 <div className="rounded-lg p-3 border border-white/[0.06]"
//                   style={{ background: "rgba(255,255,255,0.02)" }}>
//                   <p className="text-white/25 uppercase tracking-widest mb-2"
//                     style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
//                     Product
//                   </p>
//                   <p className="text-white/70" style={{ fontSize: "11px" }}>{item.name}</p>
//                   <div className="flex gap-3 mt-2">
//                     <span className="bg-indigo-600/15 border border-indigo-500/20 text-indigo-300
//                       rounded px-2 py-0.5 text-xs">
//                       Qty: {item.quantity}
//                     </span>
//                     {item.size && (
//                       <span className="bg-white/[0.05] border border-white/[0.08] text-white/50
//                         rounded px-2 py-0.5 text-xs">
//                         Size: {item.size}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="rounded-lg p-3 border border-white/[0.06]"
//                   style={{ background: "rgba(255,255,255,0.02)" }}>
//                   <p className="text-white/25 uppercase tracking-widest mb-2"
//                     style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
//                     Delivery Address
//                   </p>
//                   <p className="text-white/60" style={{ fontSize: "11px", lineHeight: "1.7" }}>
//                     {item.street}<br />
//                     {item.city}, {item.state}<br />
//                     {item.country} – {item.zipcode}
//                   </p>
//                 </div>

//                 {/* Payment info */}
//                 <div className="rounded-lg p-3 border border-white/[0.06]"
//                   style={{ background: "rgba(255,255,255,0.02)" }}>
//                   <p className="text-white/25 uppercase tracking-widest mb-2"
//                     style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
//                     Payment Info
//                   </p>
//                   <p className="text-white/60" style={{ fontSize: "11px" }}>{item.paymentMethod}</p>
//                   {item.paymentId && (
//                     <Tooltip title={item.paymentId} arrow>
//                       <p className="text-indigo-400 mt-1 cursor-pointer font-mono"
//                         style={{ fontSize: "10px" }}>
//                         ID: {truncate(item.paymentId, 14)}
//                       </p>
//                     </Tooltip>
//                   )}
//                   <p className="text-white/30 mt-1" style={{ fontSize: "10px" }}>
//                     Phone: {item.phone}
//                   </p>
//                 </div>

//                 {/* Pricing summary */}
//                 <div className="rounded-lg p-3 border border-white/[0.06]"
//                   style={{ background: "rgba(255,255,255,0.02)" }}>
//                   <p className="text-white/25 uppercase tracking-widest mb-2"
//                     style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
//                     Pricing
//                   </p>
//                   <div className="space-y-1">
//                     <div className="flex justify-between">
//                       <span className="text-white/40" style={{ fontSize: "11px" }}>Subtotal</span>
//                       <span className="text-white/70" style={{ fontSize: "11px" }}>
//                         {currency}{item.subtotal?.toFixed(2)}
//                       </span>
//                     </div>
//                     {item.saved > 0 && (
//                       <div className="flex justify-between">
//                         <span className="text-green-400" style={{ fontSize: "11px" }}>Saved</span>
//                         <span className="text-green-400" style={{ fontSize: "11px" }}>
//                           −{currency}{item.saved?.toFixed(2)}
//                         </span>
//                       </div>
//                     )}
//                     <div className="flex justify-between pt-1 border-t border-white/[0.06] mt-1">
//                       <span className="text-white/60 font-semibold" style={{ fontSize: "11px" }}>Total</span>
//                       <span className="text-white font-semibold"
//                         style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px" }}>
//                         {currency}{item.orderTotal?.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// };

// // ── MAIN ORDERS PAGE ──
// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;
//       setLoading(true);
//       const response = await axios.post(
//         backendUrl + "/api/order/userorders", {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.data.success) {
//         let flatList = [];
//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             flatList.push({
//               ...item,
//               subtotal: Number(item.subtotal),
//               saved: Number(item.saved),
//               finalPrice: Number(item.finalPrice),
//               orderId: order._id,
//               userId: order.userId,
//               productId: item._id,
//               orderTotal: Number(order.finalAmount),
//               paymentMethod: order.paymentMethod,
//               payment: order.payment,
//               paymentId: order.paymentId,
//               status: order.status,
//               date: order.date,
//               firstName: order.address?.firstName,
//               lastName: order.address?.lastName,
//               email: order.address?.email,
//               phone: order.address?.phone,
//               street: order.address?.street,
//               city: order.address?.city,
//               state: order.address?.state,
//               country: order.address?.country,
//               zipcode: order.address?.zipcode,
//             });
//           });
//         });
//         setOrderData(flatList.reverse());
//       }
//     } catch (error) {
//       console.error("API error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { loadOrderData(); }, [token]);

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
//         className="min-h-screen py-10 px-4 sm:px-6 lg:px-10">

//         {/* Top separator */}
//         <div className="fixed top-0 left-0 right-0 h-px z-50"
//           style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

//         <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-6">

//           {/* Sidebar */}
//           <div className="md:w-[22%] shrink-0">
//             <AccountSidebar />
//           </div>

//           {/* Main */}
//           <div className="flex-1 min-w-0">

//             {/* Heading */}
//             <div className="mb-7">
//               <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-1"
//                 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "4px" }}>
//                 Account
//               </p>
//               <div className="flex items-end justify-between gap-3 flex-wrap">
//                 <h1 className="text-white font-light leading-tight"
//                   style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,40px)" }}>
//                   My{" "}
//                   <em className="text-indigo-400 italic font-light">Orders</em>
//                 </h1>
//                 <div className="flex items-center gap-3">
//                   {orderData.length > 0 && (
//                     <span className="inline-flex items-center gap-2 border border-white/[0.07]
//                       rounded-full px-3 py-1.5"
//                       style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px",
//                         color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px" }}>
//                       <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
//                       {orderData.length} {orderData.length === 1 ? "order" : "orders"}
//                     </span>
//                   )}
//                   <Tooltip title="Refresh orders" arrow>
//                     <IconButton onClick={loadOrderData} disabled={loading} size="small">
//                       <RefreshIcon sx={{ fontSize: 15,
//                         color: loading ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.4)",
//                         animation: loading ? "spin 1s linear infinite" : "none",
//                         "@keyframes spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } }
//                       }} />
//                     </IconButton>
//                   </Tooltip>
//                 </div>
//               </div>
//               <div className="w-10 h-px mt-3"
//                 style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }} />
//             </div>

//             {/* ── EMPTY STATE ── */}
//             {orderData.length === 0 && !loading ? (
//               <div className="flex flex-col items-center justify-center py-24 gap-5 rounded-2xl
//                 border border-white/[0.05]"
//                 style={{ background: "rgba(255,255,255,0.02)" }}>
//                 <div className="w-16 h-16 rounded-full flex items-center justify-center
//                   border border-white/[0.08] bg-white/[0.03]">
//                   <ShoppingBagOutlinedIcon sx={{ fontSize: 28, color: "rgba(255,255,255,0.2)" }} />
//                 </div>
//                 <div className="text-center">
//                   <p className="text-white/50 mb-1"
//                     style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 300 }}>
//                     No orders yet
//                   </p>
//                   <p className="text-white/25"
//                     style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px" }}>
//                     Your order history will appear here
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               /* ── TABLE ── */
//               <TableContainer component={Paper}>
//                 {/* Top accent */}
//                 <div className="h-px w-full"
//                   style={{ background: "linear-gradient(90deg, #6366f1, #a5b4fc, transparent)" }} />

//                 <Table aria-label="orders table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell width={48} />
//                       <TableCell>Order ID</TableCell>
//                       <TableCell>Product</TableCell>
//                       <TableCell>Customer</TableCell>
//                       <TableCell>Payment</TableCell>
//                       <TableCell>Amount</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Date</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {orderData.map((item, index) => (
//                       <OrderRow key={index} item={item} index={index} currency={currency} />
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//           </div>
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default Orders;











import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import AccountSidebar from "../components/AccountSidebar";
import { Link } from "react-router-dom";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Collapse, Chip, Tooltip, IconButton,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography,
} from "@mui/material";

// Inline SVG icons
const KeyboardArrowDownIcon = ({ sx = {} }) => (
  <svg width={sx.fontSize || 16} height={sx.fontSize || 16} viewBox="0 0 24 24"
    fill="none" stroke={sx.color || "currentColor"} strokeWidth="2" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const KeyboardArrowUpIcon = ({ sx = {} }) => (
  <svg width={sx.fontSize || 16} height={sx.fontSize || 16} viewBox="0 0 24 24"
    fill="none" stroke={sx.color || "currentColor"} strokeWidth="2" strokeLinecap="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const RefreshIcon = ({ sx = {} }) => (
  <svg width={sx.fontSize || 16} height={sx.fontSize || 16} viewBox="0 0 24 24"
    fill="none" stroke={sx.color || "currentColor"} strokeWidth="2" strokeLinecap="round"
    style={{ animation: sx.animation || "none" }}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const ShoppingBagOutlinedIcon = ({ sx = {} }) => (
  <svg width={sx.fontSize || 28} height={sx.fontSize || 28} viewBox="0 0 24 24"
    fill="none" stroke={sx.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    background: { paper: "#0e0e18", default: "#08080f" },
    text: { primary: "#fff", secondary: "rgba(255,255,255,0.45)" },
  },
  typography: { fontFamily: "'Montserrat', sans-serif" },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "12px",
          padding: "12px 16px",
          color: "rgba(255,255,255,0.65)",
        },
        head: {
          fontWeight: 600,
          fontSize: "9px",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": { background: "rgba(99,102,241,0.04)" },
          transition: "background 0.2s",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Montserrat', sans-serif", fontSize: "9px",
          fontWeight: 700, letterSpacing: "1px", height: "22px"
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          width: 30, height: 30,
          "&:hover": {
            background: "rgba(99,102,241,0.15)",
            borderColor: "rgba(99,102,241,0.4)"
          },
          transition: "all 0.2s",
        },
      },
    },
  },
});

const statusConfig = {
  "Order Placed": { color: "warning", label: "Placed" },
  "Packing": { color: "default", label: "Packing" },
  "Shipped": { color: "info", label: "Shipped" },
  "Out for delivery": { color: "success", label: "Out for Delivery" },
  "Delivered": { color: "success", label: "Delivered" },
};

const truncate = (str, n = 12) =>
  str ? (str.length > n ? str.slice(0, n) + "…" : str) : "N/A";

// ── Single order row ──
const OrderRow = ({ item, index, currency }) => {
  const [open, setOpen] = useState(false);
  const status = statusConfig[item.status] || { color: "default", label: item.status };

  // item.productId is set correctly in loadOrderData below
  const productRouteId = item.productId;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>

        <TableCell width={48}>
          <IconButton size="small" onClick={() => setOpen(!open)} aria-label="expand">
            {open
              ? <KeyboardArrowUpIcon sx={{ fontSize: 16, color: "#818cf8" }} />
              : <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }} />
            }
          </IconButton>
        </TableCell>

        <TableCell>
          <Tooltip title={item.orderId} placement="top" arrow>
            <span className="text-indigo-400 cursor-pointer font-mono" style={{ fontSize: "11px" }}>
              #{truncate(item.orderId, 10)}
            </span>
          </Tooltip>
        </TableCell>

        {/* ✅ Product image + name linked to correct detail page */}
        <TableCell>
          <Link
            to={`/product/${productRouteId}`}
            className="flex items-center gap-3 group no-underline"
            style={{ textDecoration: "none" }}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0
              group-hover:border-indigo-500/50 transition-all duration-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span
              className="line-clamp-2 text-white/70 group-hover:text-indigo-400 transition-colors duration-200"
              style={{ maxWidth: "140px", fontSize: "11px" }}
            >
              {item.name}
            </span>
          </Link>
        </TableCell>

        <TableCell>
          <p className="text-white/70 whitespace-nowrap">{item.firstName} {item.lastName}</p>
          <p className="text-white/30" style={{ fontSize: "10px" }}>{item.email}</p>
        </TableCell>

        <TableCell>
          <div className="flex flex-col gap-1">
            <span className="text-white/60">{item.paymentMethod}</span>
            <Chip
              label={item.payment ? "Paid" : "Pending"}
              size="small"
              color={item.payment ? "success" : "warning"}
              sx={{ width: "fit-content", height: "18px", fontSize: "9px" }}
            />
          </div>
        </TableCell>

        <TableCell>
          <span className="text-white font-medium" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px" }}>
            {currency}{item.subtotal?.toFixed(2)}
          </span>
          {item.saved > 0 && (
            <p className="text-green-400" style={{ fontSize: "10px" }}>
              Saved {currency}{item.saved?.toFixed(2)}
            </p>
          )}
        </TableCell>

        <TableCell>
          <Chip label={status.label} color={status.color} size="small" />
        </TableCell>

        <TableCell>
          <span className="text-white/40 whitespace-nowrap" style={{ fontSize: "11px" }}>
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric", month: "short", year: "numeric"
            })}
          </span>
        </TableCell>
      </TableRow>

      {/* Expanded details */}
      <TableRow>
        <TableCell colSpan={8} sx={{ p: 0, borderBottom: open ? "1px solid rgba(99,102,241,0.2)" : "none" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{
              m: 2, borderRadius: "10px", overflow: "hidden",
              border: "1px solid rgba(99,102,241,0.15)",
              background: "rgba(99,102,241,0.04)",
            }}>
              <Box sx={{
                px: 3, py: 2, borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: 1
              }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 14, color: "#818cf8" }} />
                <Typography sx={{
                  fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600
                }}>
                  Order Details
                </Typography>
              </Box>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                {/* ✅ Clickable product name in expanded panel too */}
                <div className="rounded-lg p-3 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <p className="text-white/25 uppercase tracking-widest mb-2"
                    style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
                    Product
                  </p>
                  <Link to={`/product/${productRouteId}`} style={{ textDecoration: "none" }}>
                    <p className="text-white/70 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                      style={{ fontSize: "11px" }}>
                      {item.name}
                    </p>
                  </Link>
                  <div className="flex gap-3 mt-2">
                    <span className="bg-indigo-600/15 border border-indigo-500/20 text-indigo-300 rounded px-2 py-0.5 text-xs">
                      Qty: {item.quantity}
                    </span>
                    {item.size && (
                      <span className="bg-white/[0.05] border border-white/[0.08] text-white/50 rounded px-2 py-0.5 text-xs">
                        Size: {item.size}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-lg p-3 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <p className="text-white/25 uppercase tracking-widest mb-2"
                    style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
                    Delivery Address
                  </p>
                  <p className="text-white/60" style={{ fontSize: "11px", lineHeight: "1.7" }}>
                    {item.street}<br />
                    {item.city}, {item.state}<br />
                    {item.country} – {item.zipcode}
                  </p>
                </div>

                <div className="rounded-lg p-3 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <p className="text-white/25 uppercase tracking-widest mb-2"
                    style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
                    Payment Info
                  </p>
                  <p className="text-white/60" style={{ fontSize: "11px" }}>{item.paymentMethod}</p>
                  {item.paymentId && (
                    <Tooltip title={item.paymentId} arrow>
                      <p className="text-indigo-400 mt-1 cursor-pointer font-mono" style={{ fontSize: "10px" }}>
                        ID: {truncate(item.paymentId, 14)}
                      </p>
                    </Tooltip>
                  )}
                  <p className="text-white/30 mt-1" style={{ fontSize: "10px" }}>Phone: {item.phone}</p>
                </div>

                <div className="rounded-lg p-3 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <p className="text-white/25 uppercase tracking-widest mb-2"
                    style={{ fontSize: "8px", fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px" }}>
                    Pricing
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/40" style={{ fontSize: "11px" }}>Subtotal</span>
                      <span className="text-white/70" style={{ fontSize: "11px" }}>{currency}{item.subtotal?.toFixed(2)}</span>
                    </div>
                    {item.saved > 0 && (
                      <div className="flex justify-between">
                        <span className="text-green-400" style={{ fontSize: "11px" }}>Saved</span>
                        <span className="text-green-400" style={{ fontSize: "11px" }}>−{currency}{item.saved?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 border-t border-white/[0.06] mt-1">
                      <span className="text-white/60 font-semibold" style={{ fontSize: "11px" }}>Total</span>
                      <span className="text-white font-semibold"
                        style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px" }}>
                        {currency}{item.orderTotal?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

// ── MAIN ORDERS PAGE ──
const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders", {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {

        // ── DEBUG: open your browser console to see what fields exist on an order item ──
        if (response.data.orders?.[0]?.items?.[0]) {
          console.log("🔍 Raw order item — check which field holds the product ID:",
            response.data.orders[0].items[0]);
        }

        let flatList = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {

            // ✅ KEY FIX — resolve the real product ID in priority order:
            //
            //  1. item.productId  → your backend probably saves it as this (most common)
            //  2. item.product    → if backend uses Mongoose populate ref naming
            //  3. item._id        → WRONG (subdocument id), but kept as fallback
            //
            // 👉 Check the console log above and confirm which field name your
            //    backend uses. If it's different from productId/product, change
            //    the first line of the expression below accordingly.
            const resolvedProductId =
              item.productId   // ← most likely correct field
              || item.product  // ← alternative field name
              || item._id;     // ← fallback (will be wrong if your backend uses subdoc ids)

            flatList.push({
              ...item,
              productId: resolvedProductId, // ← used by <Link> for routing
              subtotal: Number(item.subtotal),
              saved: Number(item.saved),
              finalPrice: Number(item.finalPrice),
              orderId: order._id,
              userId: order.userId,
              orderTotal: Number(order.finalAmount),
              paymentMethod: order.paymentMethod,
              payment: order.payment,
              paymentId: order.paymentId,
              status: order.status,
              date: order.date,
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
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrderData(); }, [token]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ background: "linear-gradient(180deg, #08080f 0%, #0b0b14 100%)" }}
        className="min-h-screen py-10 px-4 sm:px-6 lg:px-10">

        <div className="fixed top-0 left-0 right-0 h-px z-50"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />

        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-6">

          <div className="md:w-[22%] shrink-0">
            <AccountSidebar />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-7">
              <p className="text-indigo-400 font-semibold uppercase tracking-widest mb-1"
                style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", letterSpacing: "4px" }}>
                Account
              </p>
              <div className="flex items-end justify-between gap-3 flex-wrap">
                <h1 className="text-white font-light leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,40px)" }}>
                  My{" "}
                  <em className="text-indigo-400 italic font-light">Orders</em>
                </h1>
                <div className="flex items-center gap-3">
                  {orderData.length > 0 && (
                    <span className="inline-flex items-center gap-2 border border-white/[0.07] rounded-full px-3 py-1.5"
                      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
                      {orderData.length} {orderData.length === 1 ? "order" : "orders"}
                    </span>
                  )}
                  <Tooltip title="Refresh orders" arrow>
                    <IconButton onClick={loadOrderData} disabled={loading} size="small">
                      <RefreshIcon sx={{
                        fontSize: 15,
                        color: loading ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.4)",
                        animation: loading ? "spin 1s linear infinite" : "none",
                      }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="w-10 h-px mt-3"
                style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }} />
            </div>

            {orderData.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-5 rounded-2xl border border-white/[0.05]"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/[0.08] bg-white/[0.03]">
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 28, color: "rgba(255,255,255,0.2)" }} />
                </div>
                <div className="text-center">
                  <p className="text-white/50 mb-1"
                    style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 300 }}>
                    No orders yet
                  </p>
                  <p className="text-white/25"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px" }}>
                    Your order history will appear here
                  </p>
                </div>
              </div>
            ) : (
              <TableContainer component={Paper}>
                <div className="h-px w-full"
                  style={{ background: "linear-gradient(90deg, #6366f1, #a5b4fc, transparent)" }} />
                <Table aria-label="orders table">
                  <TableHead>
                    <TableRow>
                      <TableCell width={48} />
                      <TableCell>Order ID</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData.map((item, index) => (
                      <OrderRow key={index} item={item} index={index} currency={currency} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Orders;
