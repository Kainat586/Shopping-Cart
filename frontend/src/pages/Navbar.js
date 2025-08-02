import React, { useState } from 'react';
// import { useCart } from './CartContext';
import CartModal from './CartModal';
import './Navbar.css'; // Assuming you have some styles for the navbar

const Navbar = () => {
//   const { cartCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">MyShop</div>
        <div className="cart-button">
          <button onClick={() => setShowCart(true)}>My Cart </button>
        </div>
      </nav>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </>
  );
};

export default Navbar;
