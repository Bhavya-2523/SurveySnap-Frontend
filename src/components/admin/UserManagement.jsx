import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ fullName: '', userName: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      const userData = Array.isArray(res.data.data) ? res.data.data : []; // Assuming `data` contains the users array.
      setUsers(userData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/user/${id}`);
        alert('User deleted successfully');
        fetchUsers(); // Refresh
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setFormData({
      fullName: user.fullName || '',
      userName: user.userName || '',
      email: user.email || '',
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/user/${editingUser}`, formData);
      alert('User updated successfully');
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  if (loading) {
    return <div className="user-management">Loading Users...</div>;
  }

  return (
    <div className="user-management">
      <h1 className="user-title">User Management</h1>

      <div className="user-table-container">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName || '-'}</td>
                  <td>{user.userName || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.phone || '-'}</td>
                  <td>{user.roleId?.name || '-'}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)}>Update</button>
                    <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingUser(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
