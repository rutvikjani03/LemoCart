import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import './Createproduct.css'; // Import your CSS file
import Getproduct from './Getproduct';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [productname, setProductname] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  
const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/createproduct', {
        productname,
        price,
        category,
        stock,
      });

    
      navigate("/admin/getproduct");
    
    } catch (error) {
      console.error('Error adding product:', error);
      
    }
  };

  return (<>
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label htmlFor="productname">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>

    
    </>
  );
};

export default CreateProduct;
