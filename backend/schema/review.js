const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  orderId: { type: String, required: true },
  productId: { type: String, required: true }
});
reviewSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Review', reviewSchema);
