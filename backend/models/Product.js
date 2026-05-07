const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  category: String,
  price: Number,
  stocked: Boolean,
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // for user data separation
});

// IMPORTANT: collection name = "products"
module.exports = mongoose.model('Product', productSchema, 'products');
