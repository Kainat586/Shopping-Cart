// updateImageUrls.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js'; // adjust the path based on your project

dotenv.config(); // if you're using .env for DB connection

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopping_cart');
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo connection error:", err);
    process.exit(1);
  }
};

const BASE_IMAGE_URL = 'http://localhost:5000/uploads/'; // Adjust if hosted online

const updateImageUrls = async () => {
  try {
    const products = await Product.find({});

    for (let product of products) {
      if (!product.image.startsWith('http')) {
        product.image = BASE_IMAGE_URL + product.image;
        await product.save();
        console.log(`Updated: ${product.name}`);
      }
    }

    console.log('✅ All product image URLs updated');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating image URLs:', err);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await updateImageUrls();
};

run();
