// components/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2>Your Cart</h2>
        <button onClick={onClose}>Close</button>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong> x {item.quantity} — Rs.{item.price * item.quantity}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> Rs.{total}</p>
            <button onClick={clearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
