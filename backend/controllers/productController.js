const Product = require('../models/Product');
const xlsx = require('xlsx');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    const productsWithId = products.map(p => ({
      ...p.toObject(),
      _id: p._id ? p._id.toString() : undefined
    }));
    res.json(productsWithId);
  } catch (err) {
    next(err);
  }
};

exports.exportProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query).lean();
    const sheetData = products.map(product => ({
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
    next(err);
  }
};

exports.importProducts = async (req, res, next) => {
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
      .map(row => {
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
              $set: { category, name, price, stocked },
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
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, stocked } = req.body;
    if (!name || price === undefined || stocked === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, stocked },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
};
