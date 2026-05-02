require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// schema (matches your products)
const productSchema = new mongoose.Schema({
    category: String,
    price: Number,
    stocked: Boolean,
    name: String
});

// IMPORTANT: collection name = "product"
const Product = mongoose.model('Product', productSchema, 'products');

// API route
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }


});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});