import React, { useState, useEffect } from "react";
import axios from "axios";

import "../Product/Product.css";
import "./Getproduct.css";
import { Link } from "react-router-dom";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/getproduct")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  const deleteproduct = async (userId) => {
    await axios
      .delete(`http://localhost:8800/api/deleteproduct/${userId}`)
      .then((response) => {
        setProducts((prevUser) =>
          prevUser.filter((product) => product._id !== userId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="add">
        <Link to={"/admin/createproduct"}>Add Products</Link>
      </div>
      <div className="product-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                    <button className="update-btn">
                      <Link to={`/updateproduct/${product._id}`}>Update</Link>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteproduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default GetProduct;
