const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const orderSchema = mongoose.Schema({
    created_date: { type: Date, default: new Date() },
    updated_date: { type: Date },
    status: { type: String, required: true, enum: ['pending', 'complete', 'cancel'], default: 'pending' },
    billing_address: { type: String },
    total_amount: { type: Number, required: true },
    quantity: { type: Number, required: true }, 
    user_id: { type: String, required: true, }, 
    product_id: { type: String, required: true }, 
    receipt_url: { type: String },
    session_id: { type: String, required: true }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
