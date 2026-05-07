const Product = require('../models/Product');

// Admin: get all users' data, User: get own data
exports.getProducts = async (req, res, next) => {
  try {
    let products;
    if (req.user.role === 'admin') {
      products = await Product.find();
    } else {
      products = await Product.find({ owner: req.user.id });
    }
    res.json(products.map(p => ({ ...p.toObject(), _id: p._id.toString() })));
  } catch (err) { next(err); }
};

// Add similar role checks for create, update, delete, import, export as needed
