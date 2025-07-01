const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  paymentMethod: String,
  cart: Array,
  createdAt: Date
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;