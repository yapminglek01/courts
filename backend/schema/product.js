const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = mongoose.Schema({
    imageData: { 
        buffer: { type: Buffer },
        mimetype: { type: String },
        size: { type: Number }
    },
    productName: { type: String, required: true },
    productDetails: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantitySold: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
});


productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product', productSchema)

