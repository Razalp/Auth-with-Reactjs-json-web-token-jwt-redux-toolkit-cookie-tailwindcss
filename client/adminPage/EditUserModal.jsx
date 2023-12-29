import React, { useState } from 'react';

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
    <div className="modal">
      <div className="modal-content">
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

       


        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditUserModal;
