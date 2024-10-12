import React, { useState } from "react";
import styles from "./style.module.css";

const Modal = ({ closeModal, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{user ? "User Details" : "Create New User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={user !== null} // Disable when viewing user details
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={user !== null}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={user !== null}
            />
          </div>
          {!user && <button type="submit" className={styles.submitButton}>Create User</button>}
        </form>
        <button className={styles.closeButton} onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
