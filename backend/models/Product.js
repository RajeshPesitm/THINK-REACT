const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  name: String,
  price: Number,
  stocked: Boolean,
  owner: String,
});

// IMPORTANT: collection name = "products"
module.exports = mongoose.model('Product', productSchema, 'products');
