import React, { useEffect, useState } from 'react';
import "./Signup.css"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"

const Signup = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role:'user',
    password: '',
    confirm_password: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handlevalidation()) {
      const { data } = await axios.post(
        "http://localhost:8800/api/signup",
        formData
      );

      if (data.status === false) {
        toast.error(data.msg);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.formData));
        toast.success("Signup Successful");
        navigate("/");
      }
    }
  };

  const handlevalidation = () => {
    const { username, email, password, confirm_password } = formData;

    if (password !== confirm_password) {
      toast.error("Password and Confirm Password should be same");
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be valid");
      return false;
    } else if (password.length < 5) {
      toast.error("Password must be valid");
      return false;
    } else if (email === "") {
      toast.error("Email is required");
      return false;
    }

    return true;
  };

  return (
    <div className='container'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>Already have an Account ? <Link to={"/login"}>LogIn</Link></div>

    </div>
  );
};

export default Signup;
