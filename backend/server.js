require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api', require('./routes/sampleRoutes'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/userDataRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/adminRoutes'));

// Error handler
app.use(require('./middlewares/errorHandler'));


const config = require('./config/default');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Auto-create first admin if not exists
async function ensureFirstAdmin() {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
        const hash = await bcrypt.hash('admin@123', 10);
        await User.create({
            email: 'rajesh@pestrust.edu.in',
            password: hash,
            role: 'admin'
        });
        console.log('First admin created: rajesh@pestrust.edu.in / admin@123');
    }
}

const PORT = config.port;
app.listen(PORT, async () => {
    await ensureFirstAdmin();
    console.log(`Server running on port ${PORT}`);
});