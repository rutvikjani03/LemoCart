import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Product.css";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/getproduct")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const navigate = useNavigate()

  

  const handleCart = async (productId, quantity) => {

    const userId = localStorage.getItem("user");

    console.log(userId)

    try {
      
      const response = await axios.post("http://localhost:8800/api/addtocart", {
        userId,
        productId,
        quantity,
      });

      navigate("/getcart")

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      
    }
  };

  return (
    <div className="product-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productname}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    handleCart(product._id, 1);
                  }}
                >
                  Add To Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
