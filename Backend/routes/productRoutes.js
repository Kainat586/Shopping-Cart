import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// POST route to add product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route for products (for Home page)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
