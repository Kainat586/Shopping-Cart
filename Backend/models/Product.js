// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // optional image URL
  description: { type: String },
  category: { type: String },
});

const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
export default Product;