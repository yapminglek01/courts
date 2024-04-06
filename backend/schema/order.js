const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const productSchema = mongoose.Schema({
    created_data: { type: Date, required: true },
    status: { type: String, required: true },
    billing_address: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    quantitySold: { type: Number, default: 0 },
});


orderSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Order', orderSchema)




