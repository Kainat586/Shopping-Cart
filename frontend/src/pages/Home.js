// src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from '../pages/CartContext';
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import './Home.css'; // Assuming you have some styles for the home page
const Home = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useCart();

  const { user } = useAuth();
  console.log("Current Cart Items:", cartItems);
  // Fetch products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (productId) => {
    if (!user || !user._id) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      await addToCart(productId);  // ✅ This already updates cartItems in context
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  return (
   
    <div className="home-container" >
       <Navbar />
      <h2>All Products </h2>


      <div className="product-grid" >
        {products.map((product) => (
          <div key={product._id} className="product-card" >
            <img src={product.image} alt={product.name} />

            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <button onClick={() => handleAddToCart(product._id)} >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// Basic inline styles
