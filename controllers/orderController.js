import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    // Log the raw request body
    console.log('RAW REQUEST BODY:', JSON.stringify(req.body, null, 2));
    
    const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
    
    // Get userId from the authenticated user (from auth middleware OR body)
    const userId = req.userId || req.body.userId;

    // Validate all required fields
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.json({ success: false, message: "Items are required" });
    }
    if (!address) {
      return res.json({ success: false, message: "Address is required" });
    }

    // Log what we extracted
    console.log('EXTRACTED VALUES:', {
      userId,
      itemsCount: items?.length,
      subtotal: typeof subtotal,
      discountTotal: typeof discountTotal,
      shipping: typeof shipping,
      finalAmount: typeof finalAmount,
      subtotalValue: subtotal,
      discountTotalValue: discountTotal,
      shippingValue: shipping,
      finalAmountValue: finalAmount
    });

    // Check for NaN values before creating order
    if (isNaN(subtotal) || isNaN(discountTotal) || isNaN(shipping) || isNaN(finalAmount)) {
      console.error('NaN DETECTED IN BACKEND!', { subtotal, discountTotal, shipping, finalAmount });
      return res.json({ success: false, message: "Invalid order amounts" });
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

    console.log('ORDER DATA TO SAVE:', JSON.stringify(orderData, null, 2));

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error('PLACE ORDER ERROR:', error);
    res.json({ success: false, message: error.message });
  }
};


// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    try {
        const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
        const userId = req.body.userId || req.userId;
        const { origin } = req.headers;

        console.log('Stripe order data:', { items, address, subtotal, discountTotal, shipping, finalAmount, userId });

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
                unit_amount: deliveryCharge * 100
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

// Verify Stripe 
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

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        const { items, address, subtotal, discountTotal, shipping, finalAmount } = req.body;
        const userId = req.body.userId || req.userId;

        console.log('Razorpay order data:', { items, address, subtotal, discountTotal, shipping, finalAmount, userId });

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


// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
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

// update order status from Admin Panel
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

export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}