
# 📦 Backend Setup (Node.js + Express + MongoDB Atlas)

This backend connects a React frontend to a MongoDB database using Express and Mongoose.

---

# 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS
* dotenv

---

# 📁 Project Structure

```text id="structure1"
backend/
 ├── server.js
 ├── .env
 ├── package.json
```

---

# ⚙️ Installation

## 1. Clone or move into backend folder

```bash id="step1"
cd backend
```

---

## 2. Install dependencies

```bash id="step2"
npm install express mongoose cors dotenv
```

---

## 3. Create `.env` file

Inside `backend/.env`:

```env id="env1"
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shop?retryWrites=true&w=majority
```

👉 Replace:

* `<username>` → your MongoDB username
* `<password>` → your MongoDB password
* `shop` → your database name

---

# 🧠 MongoDB Setup Notes

Your database structure should be:

```text id="dbstructure"
shop
 └── products
      ├── name: String
      ├── category: String
      ├── price: Number
      ├── stocked: Boolean
```

# 🧾 Full MongoDB Insert (all products)

You can insert everything at once:

```json id="mongo2"
[
  { "category": "Fruits", "price": 1, "stocked": true, "name": "Apple" },
  { "category": "Fruits", "price": 2, "stocked": false, "name": "Passionfruit" },
  { "category": "Fruits", "price": 1, "stocked": true, "name": "Dragonfruit" },
  { "category": "Vegetables", "price": 2, "stocked": true, "name": "Spinach" },
  { "category": "Vegetables", "price": 4, "stocked": false, "name": "Pumpkin" },
  { "category": "Vegetables", "price": 1, "stocked": true, "name": "Peas" },
  { "category": "grains", "price": 1, "stocked": true, "name": "barley" },
  { "category": "spices", "price": 1, "stocked": false, "name": "turmeric" }
]
```
# ▶️ Running the Server

```bash id="run1"
node server.js
```

Expected output:

```text id="output1"
Server running on port 5000
MongoDB connected
```

---

# 🌐 API Endpoints

## GET all products

```http id="api1"
GET /products
```

### Response:

```json id="response1"
[
  {
    "name": "Apple",
    "category": "Fruits",
    "price": 1,
    "stocked": true
  }
]
```



---

# 🧪 Troubleshooting

### ❌ `/products` returns empty array

* Check MongoDB URI includes `/shop`
* Ensure data exists in `products` collection
* Verify cluster connection

---

### ❌ Backend not connecting

* Check `.env` file exists
* Restart server after changes
* Verify credentials

---

### ❌ CORS error in frontend

* Ensure this line exists:

```js
app.use(cors());
```

---

# 🧭 Flow of the App

```text id="flow1"
React Frontend
   ↓ fetch
Express API (/products)
   ↓
MongoDB Atlas (shop.products)
   ↓
JSON response
   ↓
UI rendering
```

---

# ✅ Done!

Your backend is now fully connected to MongoDB Atlas and ready for frontend integration.

