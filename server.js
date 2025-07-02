const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Contact = require('./models/contact');
const Login = require('./models/login');
const Product = require('./models/product');
const Order = require('./models/order'); // חדש

const app = express();
const PORT = process.env.PORT || 3001;
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/celebration';

console.log('--- Server Startup ---');
console.log(`PORT: ${PORT}`);
console.log(`MONGO_URL: ${mongoUrl}`);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --- Mongo connection ---
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // אם אין חיבור - צא (חשוב ל־CI)
});

// --- Main HTML routes ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/html/homepage.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/html/contact.html')));
app.get('/qa', (req, res) => res.sendFile(path.join(__dirname, 'public/html/qa.html')));
app.get('/html/checkout.html', (req, res) => res.sendFile(path.join(__dirname, 'public/html/checkout.html'))); // לסלניום

// --- API endpoints ---
app.get('/api/products', async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    next(err);
  }
});

app.post('/api/orders', async (req, res, next) => {
  try {
    const { name, phone, email, paymentMethod, cart } = req.body;
    const order = new Order({ name, phone, email, paymentMethod, cart, createdAt: new Date() });
    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (err) {
    console.error('Error saving order:', err);
    next(err);
  }
});

app.post('/login', async (req, res, next) => {
  const { username } = req.body;
  try {
    const newLogin = new Login({ username, loginDate: new Date() });
    await newLogin.save();
    res.status(201).json({ message: 'Login saved successfully' });
  } catch (err) {
    console.error('Error saving login:', err);
    next(err);
  }
});

app.post('/contact', async (req, res, next) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (err) {
    console.error('Error saving contact:', err);
    next(err);
  }
});

// --- Error Handlers ---
app.use((err, req, res, next) => {
  console.error('Express Error Handler:', err);
  res.status(err.status || 500).json({ success: false, message: err.message });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// --- Listen ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});