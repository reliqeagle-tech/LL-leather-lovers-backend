import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },

    size: { type: String },
    color: { type: String },

    quantity: { type: Number, required: true },

    // REQUIRED DISCOUNT FIELDS
    originalPrice: { type: Number, required: true },
    discountPercent: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, required: true, default: 0 },
    finalPrice: { type: Number, required: true },

    subtotal: { type: Number, required: true },
    saved: { type: Number, required: true, default: 0 }
});

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },

    items: { type: [orderItemSchema], required: true },

    // ORDER TOTAL FIELDS (ALL REQUIRED)
    subtotal: { type: Number, required: true },
    discountTotal: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true },
    finalAmount: { type: Number, required: true },

    address: { type: Object, required: true },

    status: { type: String, default: "Order Placed" },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, default: false },

    date: { type: Number, required: true }
});

const orderModel =
    mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
