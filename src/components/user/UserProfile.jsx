import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

export const UserProfile = () => {
  const [profileImage, setProfileImage] = useState('default-avatar.jpg');
  const [userData, setUserData] = useState({
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

  const storedUser = localStorage.getItem('id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${storedUser}`);
        const data = response.data.data || {};
        setUserData({
          userName: data.userName || '',
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone?.toString() || '',
          bio: data.bio || '',
          address: data.address || '',
          socialLinks: data.socialLinks || { facebook: '', twitter: '', linkedin: '' }
        });
        setProfileImage(data.profileImage || 'default-avatar.jpg');
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in userData.socialLinks) {
      setUserData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
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
      console.error('Image upload failed', err);
      alert('Failed to upload image. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    const requiredFields = ['userName', 'fullName', 'email', 'phone', 'address'];
    for (let field of requiredFields) {
      if (!userData[field]?.trim()) {
        alert(`${field} is required.`);
        return;
      }
    }

    try {
      await axios.put(`/user/${storedUser}`, { ...userData, profileImage });
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <div className="user-profile-container">
        <div className="content-wrapper center-text">
          <p>Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-container">
        <div className="content-wrapper">
          <div className="error-card">
            <h2>Error: {error}</h2>
            <p>Please check your authentication and try again</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="content-wrapper">
        <section className="profile-header">
          <label>
            <img src={profileImage} alt="Profile" className="profile-pic" />
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePicUpload} />
          </label>
          <div>
            <h1>{userData.fullName}</h1>
            <p style={{marginTop:"-10px"}}>@{userData.userName}</p>
            <p style={{marginTop:"-5px"}}>{userData.email}</p>
            {uploading && <p>Uploading image...</p>}
          </div>
        </section>

        <div className="form-card">
          <h2 className="section-title">Personal Information</h2>
          {['userName', 'fullName', 'email', 'phone', 'bio', 'address'].map((field) => (
            <div key={field} className="info-item">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={userData[field]}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
          ))}

          <h2 className="section-title">Social Links</h2>
          {['facebook', 'twitter', 'linkedin'].map((field) => (
            <div key={field} className="info-item">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={userData.socialLinks[field]}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
          ))}

          <button className="primary-btn" onClick={() => (editMode ? handleSaveChanges() : setEditMode(true))}>
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="bottom-card">
          <h2>Account Security</h2>
          <div style={{ marginTop: '1rem' }}>
            <button className="primary-btn">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};
