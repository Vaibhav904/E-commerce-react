import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
const { logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch profile from API
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/your-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        const apiUser = res.data.data;
        const fullName = `${apiUser.first_name} ${apiUser.last_name}`;

        const userData = {
          id: apiUser.id,
          name: fullName,
          email: apiUser.email,
          phone: apiUser.phone_number,
          address: apiUser.address || "",
          bio: apiUser.bio || "",
          profile_image: apiUser.profile_image,
        };

        setUser(userData);
        setPreviewImage(apiUser.profile_image);
        localStorage.setItem("user", JSON.stringify(userData));

        setFormData({
          name: fullName,
          email: apiUser.email,
          phone: apiUser.phone_number,
          address: apiUser.address || "",
          bio: apiUser.bio || "",
        });
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, []);

  // ✅ Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // ✅ Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Save Profile
  const handleSaveProfile = async () => {
    try {
      const form = new FormData();

      const firstName = formData.name.split(" ")[0] || "";
      const lastName = formData.name.split(" ")[1] || "";

      form.append("first_name", firstName);
      form.append("last_name", lastName);
      form.append("email", formData.email);
      form.append("phone_number", formData.phone);
      form.append("address", formData.address);
      form.append("bio", formData.bio);

      if (profileImage) {
        form.append("profile_image", profileImage);
      }

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/updateProfile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status) {
        setIsEditing(false);
        fetchProfile();
        alert("Profile updated successfully!");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // ✅ Cancel Edit
  const handleCancelEdit = () => {
    fetchProfile();
    setIsEditing(false);
  };

  // ✅ Logout API
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");   
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>

        <div className="change-pass">
          <button
            onClick={() => navigate("/change-password")}
            className="action-btn change-password-btn"
          >
            Change Password
          </button>

          <button className="logout-btn"  onClick={ () =>  {logout(); handleLogout()} }>
            Logout
          </button>
        </div>
      </div>

      <div className="profile-content">
        {/* LEFT SIDE */}
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
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                </div>
              )}

              {isEditing && (
                <>
                  <label
                    className="image-upload-label"
                    htmlFor="image-upload"
                  >
                    <span className="upload-icon">📷</span>
                    <span className="upload-text">
                      Change Photo
                    </span>
                  </label>

                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </div>

            <div className="image-upload-instructions">
              <p>
                Click "Change Photo" to upload a new profile
                picture
              </p>
              <p className="file-note">
                Supports: JPG, PNG, GIF | Max: 5MB
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
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
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
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
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
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
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">
                    {user.phone || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="form-value">
                    {user.address || "Not provided"}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Bio / About Me</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="3"
                  />
                ) : (
                  <p className="form-value">
                    {user.bio || "No bio provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;