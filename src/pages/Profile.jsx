import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    address: ""
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (!userData) {
      navigate("/login");
      return;
    }
    
    setUser(userData);
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      bio: userData.bio || "",
      address: userData.address || ""
    });
    
    // Load saved profile image if exists
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setPreviewImage(savedImage);
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    
    setProfileImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setPreviewImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    // Update user data in localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    // Reset form to original user data
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: user.bio || "",
      address: user.address || ""
    });
    setIsEditing(false);
  };

 

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>

        <div className="change-pass">
<button onClick={() => navigate("/change-password")} className="action-btn change-password-btn">
                  Change Password
                </button>

           <button className="logout-btn"   onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}>
          Logout
        </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-left-section">
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <span className="placeholder-text">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
              )}
              
              <label className="image-upload-label" htmlFor="image-upload">
                <span className="upload-icon">📷</span>
                <span className="upload-text">Change Photo</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            
            <div className="image-upload-instructions">
              <p>Click "Change Photo" to upload a new profile picture</p>
              <p className="file-note">Supports: JPG, PNG, GIF | Max: 5MB</p>
            </div>
          </div>

          <div className="profile-stats">
            <h3>Profile Information</h3>
            <div className="stat-item">
              <span className="stat-label">Member Since:</span>
              <span className="stat-value">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="profile-right-section">
          <div className="profile-details-card">
            <div className="card-header">
              <h2>Personal Details</h2>
              {!isEditing ? (
                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button 
                    className="save-btn"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            
            <div className="details-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">{user.name}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">{user.email}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="form-value">{user.phone || "Not provided"}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="form-value">{user.address || "Not provided"}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio / About Me</label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us something about yourself"
                    rows="3"
                  />
                ) : (
                  <p className="form-value">{user.bio || "No bio provided"}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* {!isEditing && (
            <div className="account-actions">
              <h3>Account Settings</h3>
              <div className="action-buttons">
                
                <button className="action-btn notification-btn">
                  Notification Settings
                </button>
                <button className="action-btn privacy-btn">
                  Privacy Settings
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;