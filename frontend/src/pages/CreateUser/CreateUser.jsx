import React, { useState } from "react";
import { FiUserPlus } from "react-icons/fi"; // Import icon for "Create New User"
import styles from "./style.module.css";
import Modal from "./Modal/Modal"; // Reusable Modal Component

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Driver" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Driver",
    },
  ];

  const handleCreateUser = () => {
    setSelectedUser(null); // Set to null for creating a new user
    setIsModalOpen(true);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user for details
    setIsModalOpen(true);
  };

  return (
    <div className={styles.createUserPage}>
      <div className={styles.pageFlex}>
        <div className={styles.userListContainer}>
        <div className={styles.header}>
          <h1>Registered Users</h1>
          <button
            className={styles.createUserButton}
            onClick={handleCreateUser}
          >
            <FiUserPlus className={styles.icon} />
            Create New User
          </button>
        </div>

        <ul className={styles.userList}>
          {users.map((user) => (
            <li
              key={user.id}
              className={styles.userItem}
              onClick={() => handleUserClick(user)}
            >
              {user.name} ({user.role})
            </li>
          ))}
        </ul>

        {isModalOpen && (
          <Modal closeModal={() => setIsModalOpen(false)} user={selectedUser} />
        )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
