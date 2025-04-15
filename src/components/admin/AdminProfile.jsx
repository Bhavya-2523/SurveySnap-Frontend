import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProfile.css';

export const AdminProfile = () => {
  const [profileImage, setProfileImage] = useState('default-avatar.jpg');
  const [adminData, setAdminData] = useState({
    userName: '',
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    address: '',
    socialLinks: { facebook: '', twitter: '', linkedin: '' }
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const storedAdminId = localStorage.getItem('id');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`/user/${storedAdminId}`);
        const data = res.data.data || {};
        setAdminData({
          userName: data.userName || '',
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone?.toString() || '',
          bio: data.bio || '',
          address: data.address || '',
          socialLinks: data.socialLinks || { facebook: '', twitter: '', linkedin: '' }
        });
        setProfileImage(data.profileImage || 'default-avatar.jpg');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in adminData.socialLinks) {
      setAdminData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setAdminData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'survey-app');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dm5xxenxh/image/upload',
        formData
      );
      setProfileImage(res.data.secure_url);
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const requiredFields = ['userName', 'fullName', 'email', 'phone', 'address'];
    for (let field of requiredFields) {
      if (!adminData[field]?.trim()) {
        alert(`${field} is required.`);
        return;
      }
    }

    try {
      await axios.put(`/user/${storedAdminId}`, { ...adminData, profileImage });
      alert('Profile updated!');
      setEditMode(false);
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (loading) return <div className="admin-container"><p>Loading...</p></div>;
  if (error) return <div className="admin-container"><p>Error: {error}</p></div>;

  return (
    <div className="admin-container">
      <div className="admin-header">Admin Profile</div>

      <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
        <section className="profile-header" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
          <label style={{ cursor: 'pointer' }}>
            <img src={profileImage} alt="Profile" className="profile-pic" />
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePicUpload} />
          </label>
          <div>
            <h2>{adminData.fullName}</h2>
            <p>@{adminData.userName}</p>
            <p>{adminData.email}</p>
            {uploading && <p>Uploading image...</p>}
          </div>
        </section>

        <h4 className="section-title">Personal Information</h4>
        {['userName', 'fullName', 'email', 'phone', 'bio', 'address'].map((field) => (
          <div key={field} className="form-row">
            <input
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="form-input"
              value={adminData[field]}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
        ))}

        <h4 className="section-title">Social Links</h4>
        {['facebook', 'twitter', 'linkedin'].map((field) => (
          <div key={field} className="form-row">
            <input
              type="text"
              name={field}
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} URL`}
              className="form-input"
              value={adminData.socialLinks[field]}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
        ))}

        <div className="form-submit">
          <button
            type="button"
            className="submit-btn"
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
