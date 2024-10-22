import React, { useState } from "react";
import styles from "./style.module.css";

const MessagesPage = () => {
  // Sample messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      date: "2023-10-20",
      content: "Reminder: Please submit your timesheet by the end of the week.",
    },
    {
      id: 2,
      date: "2023-10-15",
      content: "Your performance review is scheduled for next Tuesday.",
    },
    {
      id: 3,
      date: "2023-10-10",
      content: "Welcome to the team! We are glad to have you.",
    },
  ]);

  return (
    <div className={styles.messagesContainer}>
      <h1 className={styles.title}>Messages from Admin</h1>

      <div className={styles.messagesList}>
        {messages.length === 0 ? (
          <p>No messages to display.</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={styles.messageCard}>
              <div className={styles.messageDate}>{message.date}</div>
              <div className={styles.messageContent}>{message.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
