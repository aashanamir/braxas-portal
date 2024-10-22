import React from "react";
import styles from "./style.module.css";
import { FiUserPlus } from "react-icons/fi";

const Messages = () => {
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

  return (
    <div>
      <div className={styles.flex}>
        <div className={styles.messageListContainer}>
          <div className={styles.header}>
            <h1>New Messages</h1>
          </div>

          <ul className={styles.messageList}>
            {users.map((user) => (
              <li
                key={user.id}
                className={styles.messageItem}
              >
                {user.name} ({user.role})
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Messages;
