import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User, LogOut, Hash, Phone, MapPin, Users } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { empData } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile Settings</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {empData?.EmpPic ? (
              <img 
                src={empData.EmpPic} 
                alt="Employee Picture" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <User size={40} />
            )}
          </div>
        </div>

        <div className="profile-form">
          <div className="field-group">
            <label>Employee Code</label>
            <div className="input-container">
              <Hash size={20} />
              <input
                type="text"
                value={empData?.EmpCode || "Not specified"}
                disabled
              />
            </div>
          </div>

          <div className="field-group">
            <label>Name</label>
            <div className="input-container">
              <User size={20} />
              <input
                type="text"
                value={empData?.Name || "Not specified"}
                disabled
              />
            </div>
          </div>

          <div className="field-group">
            <label>CNIC</label>
            <div className="input-container">
              <Users size={20} />
              <input
                type="text"
                value={empData?.Cnic || "Not specified"}
                disabled
              />
            </div>
          </div>

          <div className="field-group">
            <label>Department</label>
            <div className="input-container">
              <Users size={20} />
              <input
                type="text"
                value={empData?.DeptIDFK_civ_Department?.DepartmentName || "Not specified"}
                disabled
              />
            </div>
          </div>

          <div className="field-group">
            <label>Contact</label>
            <div className="input-container">
              <Phone size={20} />
              <input
                type="text"
                value={empData?.EmPhoneNo || "Not specified"}
                disabled
              />
            </div>
          </div>

          <div className="field-group">
            <label>Project Location</label>
            <div className="input-container">
              <MapPin size={20} />
              <input
                type="text"
                value={empData?.ProjectName || "Not specified"}
                disabled
              />
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
