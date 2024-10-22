import React, { useState } from "react";
import styles from "./style.module.css";

const Modal = ({ closeModal, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(""); // Required when creating a new user
  const [role, setRole] = useState(user?.role || "Employee");
  const [contactNumber, setContactNumber] = useState(
    user?.contact_number || ""
  );
  const [profileImage, setProfileImage] = useState(user?.profile_image || "");

  // State for custom schedule
  const [customSchedule, setCustomSchedule] = useState({
    start: user?.custom_schedule?.start || "",
    end: user?.custom_schedule?.end || "",
    breaks: user?.custom_schedule?.breaks || [],
  });

  // State to manage break times
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation if needed
    if (!name || !email || !password || !contactNumber) {
      alert("Please fill out all required fields.");
      return;
    }
    // Submit form logic here
    closeModal();
  };

  const handleAddBreak = () => {
    if (breakStart && breakEnd) {
      setCustomSchedule((prev) => ({
        ...prev,
        breaks: [...prev.breaks, { start: breakStart, end: breakEnd }],
      }));
      setBreakStart("");
      setBreakEnd("");
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{user ? "User Details" : "Create New User"}</h2>
        <form onSubmit={handleSubmit} className={styles.gridForm}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label>
              Name <span className={styles.required}>*</span>:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!!user} 
              required
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label>
              Email <span className={styles.required}>*</span>:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!user}
              required
            />
          </div>

          {/* Password */}
          {!user && (
            <div className={styles.formGroup}>
              <label>
                Password <span className={styles.required}>*</span>:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Role */}
          <div className={styles.formGroup}>
            <label>
              Role <span className={styles.required}>*</span>:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={!!user}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {/* Contact Number */}
          <div className={styles.formGroup}>
            <label>
              Contact Number <span className={styles.required}>*</span>:
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          {/* Profile Image */}
          <div className={styles.formGroup}>
            <label>Profile Image URL:</label>
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
            />
          </div>

          {/* Custom Schedule */}
          <div className={styles.formGroup}>
            <label>Schedule Start:</label>
            <input
              type="time"
              value={customSchedule.start}
              onChange={(e) =>
                setCustomSchedule({ ...customSchedule, start: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label>Schedule End:</label>
            <input
              type="time"
              value={customSchedule.end}
              onChange={(e) =>
                setCustomSchedule({ ...customSchedule, end: e.target.value })
              }
            />
          </div>

          {/* Breaks */}
          <div className={styles.formGroup}>
            <label>Add Break:</label>
            <input
              type="time"
              placeholder="Break Start"
              value={breakStart}
              onChange={(e) => setBreakStart(e.target.value)}
            />
            <input
              type="time"
              placeholder="Break End"
              value={breakEnd}
              onChange={(e) => setBreakEnd(e.target.value)}
            />
            <button type="button" onClick={handleAddBreak}>
              Add Break
            </button>
          </div>

          <div className={styles.formGroup}>
            <label>Scheduled Breaks:</label>
            <ul>
              {customSchedule.breaks.map((breakTime, index) => (
                <li key={index}>
                  {`Start: ${breakTime.start}, End: ${breakTime.end}`}
                </li>
              ))}
            </ul>
          </div>

          {!user && (
            <button type="submit" className={styles.submitButton}>
              Create User
            </button>
          )}
        </form>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
