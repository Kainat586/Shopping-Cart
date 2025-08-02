import React, { useState } from 'react';
import axios from 'axios';
// import './AddProduct.css'; // optional styling file

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', product);
      alert('Product added successfully');
      setProduct({ name: '', description: '', price: '', image: '' });
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} value={product.name} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} value={product.description} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={product.price} required />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} value={product.image} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
