import React, { useState } from 'react';
import './EditUserModal.css'
const EditUserModal = ({ user, onSave, onClose }) => {
  const [updatedUserData, setUpdatedUserData] = useState({
    ...user,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedUserData);
  };

  return (
    <div className="modal-overlay">
      <div className="edit-user-modal">
        <h2>Edit User</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={updatedUserData.username}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={updatedUserData.email}
          onChange={handleInputChange}
        />

        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

