import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import "./Home.css";
import ProductCarousel from "./ProductCarousel";
import Logout from "../Logout/Logout";
import Product from "../Product/Product";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    
    if (!user) {
      navigate("/login");
    } 

  }, [navigate]);

  const people = localStorage.getItem("name");

  return (
    <div>
      <header>
        <div className="logo">Logo</div>
        <nav>
          <ul>
            <li>
              <Link to="/getcart">
                Cart
              </Link>
            </li>
            <li>
              <Logout />
            </li>
            <li className="user">
             <FaUser size={20} color="#2b5da7" /> {people} 
            </li>
          </ul>
        </nav>
      </header>

      <div>
        <ProductCarousel />
      </div>

      <div className="product">
        <Product />
      </div>
    </div>
  );
};

export default Home;
