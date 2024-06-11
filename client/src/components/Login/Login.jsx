import React, { useEffect, useState  } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';

const Login = () => {

  const users = {
    username: '',
    password: '',
    role:''
  }
  
  const [formData, setFormData] = useState(users);

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate()
  // Handle form submission
 
  const handleSubmit = async (event) => {


    event.preventDefault();

    if (handlevalidation()) {
      const { data } = await axios.post(
        "http://localhost:8800/api/login",
        formData
      );

      if (data.status === false) {
        toast.error(data.msg);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data));
        localStorage.setItem("user", data.user._id);
        localStorage.setItem("name", data.user.username);

        console.log(data.user.role)
        
        if (data.user.role === "user") {
          toast.success("Login Successfully");
          navigate("/");
        }else{
          toast.success("Login Successfully");
          navigate("/admin");
        }
       
      

    
      }
    }
  };

  const handlevalidation = () => {
    const { username, password } = formData;

    if (username.length === "") {
      toast.error("Username and Password required");
      return false;
    } else if (password === "") {
      toast.error("Username and Password required");
      return false;
    }

    return true;
  };

  

  return (
    <div className='container'>
      <h2>Login</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Login</button>
      </form>

      <div> Don't have an Account ? <Link to={"/signup"}>SignUp</Link></div>
    </div>
  );
};

export default Login;
