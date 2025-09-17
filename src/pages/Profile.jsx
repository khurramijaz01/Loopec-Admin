import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@loopec.com',
    phone: '+1 (555) 123-4567',
    department: 'Administration',
    position: 'Admin Manager',
    joinDate: '2023-01-15',
    avatar: '👤'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profileData);
  };

  const handleLogout = () => {
    logout(); // This updates the AuthContext state
    navigate('/');
  };

  const activityLog = [
    { action: 'Logged in', time: '2024-01-15 09:30', type: 'login' },
    { action: 'Updated profile', time: '2024-01-14 14:20', type: 'update' },
    { action: 'Approved leave request', time: '2024-01-14 10:15', type: 'approval' },
    { action: 'Created purchase order', time: '2024-01-13 16:45', type: 'create' },
    { action: 'Logged out', time: '2024-01-13 18:00', type: 'logout' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login': return '🔐';
      case 'update': return '✏️';
      case 'approval': return '✅';
      case 'create': return '➕';
      case 'logout': return '🚪';
      default: return '📝';
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <User size={40} />
            </div>
            <button className="change-avatar-btn">Change Avatar</button>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={profileData.department}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={profileData.position}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="joinDate">Join Date</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={profileData.joinDate}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-actions">
              {isEditing ? (
                <>
                  <button className="save-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>

            <div className="logout-section">
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
