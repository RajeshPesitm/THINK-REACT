require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');

const upload = multer({ storage: multer.memoryStorage() });
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

// IMPORTANT: collection name = "products"
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

app.get('/products/export', async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const products = await Product.find(query).lean();

        const sheetData = products.map((product) => ({
            category: product.category,
            name: product.name,
            price: product.price,
            stocked: product.stocked,
        }));

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(sheetData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');

        const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        const filename = category ? `${category}-products.xlsx` : 'products.xlsx';
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/products/import', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawRows = xlsx.utils.sheet_to_json(worksheet, { defval: null });
        const categoryOverride = req.query.category;

        const operations = rawRows
            .map((row) => {
                const category = categoryOverride || row.category;
                const name = row.name ? String(row.name).trim() : null;
                const price = Number(row.price);
                const stockedValue = String(row.stocked ?? false).toLowerCase();
                const stocked = ['true', '1', 'yes', 'y'].includes(stockedValue);

                if (!category || !name || Number.isNaN(price)) {
                    return null;
                }

                return {
                    updateOne: {
                        filter: { category, name },
                        update: {
                            $set: {
                                category,
                                name,
                                price,
                                stocked,
                            },
                        },
                        upsert: true,
                    },
                };
            })
            .filter(Boolean);

        if (!operations.length) {
            return res.status(400).json({ error: 'No valid rows found in spreadsheet' });
        }

        await Product.bulkWrite(operations);
        res.json({ imported: operations.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});