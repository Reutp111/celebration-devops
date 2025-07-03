const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  image: String,
  concepts: [String], 
  events: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;