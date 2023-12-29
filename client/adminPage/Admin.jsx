import React, { useState, useEffect } from 'react';
import EditUserModal from './EditUserModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate=useNavigate()

  const { currentUser } = useSelector((state) => state.user);
  useEffect(()=>{
    if(!currentUser?.isAdmin){
      navigate('/')
    }
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/delete/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (userId) => {
    setIsEditModalOpen(true);
    setEditingUserId(userId);
  };

  const handleSaveEdit = async (updatedUserData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/edit/${editingUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!res.ok) {
        throw new Error('Failed to update user');
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUserId ? { ...user, ...updatedUserData } : user
        )
      );

      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUserId ? { ...user, ...updatedUserData } : user
        )
      );

      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.username.toLowerCase().includes(query))
    );
  };

  return (
    <>
    


    <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-md rounded-lg overflow-hidden w-full">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search by user name"
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">SI No</th>
                  <th className="py-2 px-4 border">User name</th>
                  <th className="py-2 px-4 border">Image</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{user.username}</td>
                    <td className="py-2 px-4 border" style={{ maxWidth: '50px' }}>
                      <img
                        src={user.profilePicture}
                        alt={`${user.username}'s Profile`}
                        className="w-full h-full rounded-full border"
                        style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover' }}
                      />
                    </td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.isAdmin ? 'Admin' : 'User'}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-red-700" onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </button>
                      <br />
                      <button className="bg-green-500" onClick={() => handleEditUser(user._id)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditUserModal
          user={users.find((user) => user._id === editingUserId)}
          onSave={handleSaveEdit}
          onClose={handleCancelEdit}
        />
      )}
    </>
  );
};

export default Admin;
