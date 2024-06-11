import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API requests
import "../CreateProduct/Createproduct.css"; // Import your CSS file
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Updateproduct = () => {
  const products = {
    productname: "",
    price: "",
    category: "",
    stock: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(products);
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/getoneproduct/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8800/api/updateproduct/${id}`, product)
      .then((response) => {
        toast.success((response.data.msg = "Updated Successfully"), {
          position: "top-right",
        });
        navigate("/admin/getproduct");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productname">Product Name:</label>
          <input
            type="text"
            id="productname"
            name="productname"
            value={product.productname}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default Updateproduct;
