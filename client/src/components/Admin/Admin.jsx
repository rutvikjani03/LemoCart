import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 // Import your logo image
import './Admin.css'; // Import the CSS file
import Logout from '../Logout/Logout';

const Admin = () => {

    const navigate = useNavigate()

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('chat-app-user'));

      console.log(user.user.role)
  
      if (!user || user.user.role !== 'admin') {
        navigate('/');
      }
    }, [navigate]);



    
  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo-container">
          <h3 className="logo-text">Hi, Admin</h3>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/admin/getproduct">
                <i className="fas fa-shopping-bag"></i> Products
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <i className="fas fa-users"></i> Users
              </Link>
            </li>
            <li>
              
              <Logout />
              
            </li>
          </ul>
        </nav>
      </header>
      <div className="admin-content">
        Hey Admin !! , welcome in the Dashboard
      </div>
    </div>
  );
};

export default Admin;
