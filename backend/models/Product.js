const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  price: Number,
  stocked: Boolean,
  name: String
});

// IMPORTANT: collection name = "products"
module.exports = mongoose.model('Product', productSchema, 'products');
