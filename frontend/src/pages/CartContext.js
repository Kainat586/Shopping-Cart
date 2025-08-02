// CartContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user._id) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
        if (response.data && response.data.items) {
          setCartItems(response.data.items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId: user._id,
        productId,
      });

      if (response.data && response.data.cart && response.data.cart.items) {
        setCartItems(response.data.cart.items);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
