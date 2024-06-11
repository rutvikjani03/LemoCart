import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css'; // Import your CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8800/api/getallusers') // Replace with your user API endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });

    axios
      .get('http://localhost:8800/api/getadmin') // Replace with your admin API endpoint
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  const deleteuser = async (userId) => {
    await axios
      .delete(`http://localhost:8800/api/deleteuser/${userId}`)
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="users-container">
     
      {loading ? (
        <p>Loading...</p>
      ) : (

        <>
        <h2>Admin</h2>
      <table className="admins-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="action-btn" onClick={() => deleteuser(user._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></>
      )}

      
    </div>
  );
};

export default Users;
