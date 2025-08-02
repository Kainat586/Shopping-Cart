import express from 'express';
const router = express.Router();

import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// ✅ Fixed endpoint
router.get('/details', async (req, res) => {
  try {
    const userId = req.query.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,  // ✅ image field
          quantity: item.quantity,
        };
      })
    );

    res.json(detailedItems);
  } catch (err) {
    console.error("Error fetching cart details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post('/details', async (req, res) => {
  try {
    const { items } = req.body; // [{ productId: '...', quantity: 2 }, ...]
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items format' });
    }

    // Fetch each product from DB and attach quantity
    const detailedItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) return null;
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
      };
    }));

    // Remove any nulls (products not found)
    const filtered = detailedItems.filter(Boolean);

    res.json(filtered);
  } catch (err) {
    console.error('Error in /api/cart/details:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ➕ Add to cart
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.json(cart);

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🛒 Get cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
