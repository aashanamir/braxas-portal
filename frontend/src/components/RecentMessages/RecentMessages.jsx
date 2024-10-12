import React from "react";
import styles from "./style.module.css";

const RecentMessages = ({ messages }) => {
  return (
    <div className={styles.recentMessages}>
      <h2 className={styles.title}>Recent Messages</h2>
      <ul className={styles.messageList}>
        {messages.map((message, index) => (
          <li key={index} className={styles.messageItem}>
            <div className={styles.avatarContainer}>
            </div>
            <div className={styles.messageContent}>
              <span className={styles.sender}>{message.sender}</span>
              <p className={styles.preview}>{message.preview}</p>
              <span className={styles.timestamp}>{message.timestamp}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentMessages;
