import React from 'react';
import './Home.css';

const ProductCard = ({ product, onClick }) => (
  <div className="product-card" onClick={() => onClick(product)}>
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
  </div>
);

export default ProductCard;
