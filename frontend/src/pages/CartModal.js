import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import './CartModal.css'; // Assuming you have some styles for the modal
const CartModal = ({ onClose }) => {
    const { cartItems } = useCart();
    const [detailedItems, setDetailedItems] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/cart/details",
                    { items: cartItems },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setDetailedItems(res.data); // contains full info: name, price, img, quantity
            } catch (error) {
                console.error("Error fetching cart details:", error);
            }
        };

        if (cartItems?.length) fetchProductDetails();
    }, [cartItems]);

    return (
        <div className="cart-modal">
            <div className="modal-content"> {/* <--- NEW */}
            <button className="close" onClick={onClose}>X</button>
            <h2>Your Cart</h2>
            {detailedItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                detailedItems.map((item, idx) => (
                    <div key={idx} className="cart-item">
                        <img
                            src={`http://localhost:5000/uploads/${item.image.split('\\').pop()}`}
                            alt={item.name}
                            style={{ width: "100px" }}
                        />

                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
        </div>
    );
};

export default CartModal;
