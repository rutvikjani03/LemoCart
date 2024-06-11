import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartItems.css"; // Import CSS file
import { FaUser } from 'react-icons/fa';

const GetCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State to hold the total amount

  const userId = localStorage.getItem("user");

  const people = localStorage.getItem("name");
  // console.log(people);
  // console.log(userId);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/getfromcart/${userId}`
      );
      if (response.status === 200) {
        setCartItems(response.data);
      } else {
        console.error("Failed to fetch cart items:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Calculate total amount when cartItems or their quantities change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const productPrice = item.product.price;
      const quantity = item.quantity;
      return acc + productPrice * quantity;
    }, 0);

    setTotalAmount(total);
  }, [cartItems]);

  const handleCart = async (productId, quantityChange) => {
    const userId = localStorage.getItem("user");
    
    try {
      const response = await axios.post("http://localhost:8800/api/addtocart", {
        userId,
        productId,
        quantity: quantityChange,
      });

      const updatedCartItems = cartItems.map((item) => {
        if (item.product._id === productId) {
          return { ...item, quantity: item.quantity + quantityChange };
        }

        return item;
      });

      setCartItems(updatedCartItems);

      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const deleteFromCart = async (productId) => {
    try {
      const userId = localStorage.getItem("user");

      const response = await axios.delete(
        `http://localhost:8800/api/removefromcart/${productId}`
      );

      fetchCartItems();

      if (response.status === 200) {
        // Remove the deleted item from the cartItems state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product._id !== productId)
        );
        console.log("Item removed from cart:", productId);
      } else {
        console.error("Failed to remove item from cart:", response.data.error);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="cart-container">
      <div className="title">
      <h2>Cart Items</h2>
      <p><FaUser size={20} color="#2b5da7" /> {people} </p>
      </div>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item._id} className="cart-item">
            <div className="price">
              <span className="item-name">{item.product.productname}</span>
              <span className="item-name"> Rs:{item.product.price}</span>
            </div>
            <span className="item-price">
              Price: ${item.product.price * item.quantity}
            </span>
            <span className="item-quantity">
              <button onClick={() => handleCart(item.product._id, 1)}>+</button>
              {item.quantity}
              <button onClick={() => handleCart(item.product._id, -1)}>
                -
              </button>

              <button onClick={() => deleteFromCart(item._id)}>Remove</button>
            </span>
          </li>
        ))}
      </ul>
      <div className="total-container">
        <p>Total Amount to Pay: ${totalAmount}</p>
      </div>
    </div>
  );
};

export default GetCart;
