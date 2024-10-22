import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon
import styles from './style.module.css';

const employee = {
  name: "John Doe",
  email: "johndoe@example.com",
  role: "Employee",
  contactNumber: "+92 300 1234567",
  profileImage: "https://via.placeholder.com/100", // Placeholder image URL
  customSchedule: {
    start: "09:00:00",
    end: "17:00:00",
    breaks: [
      { start: "12:00:00", end: "12:30:00" },
      { start: "15:00:00", end: "15:15:00" },
    ],
  },
};

// Replace with your specific longitude and latitude
const TARGET_LOCATION = {
  latitude: 31.577279 , // Example: Lahore
  longitude: 74.362035,

};

const EmployeeProfile = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const markAttendance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        if (
          latitude.toFixed(4) === TARGET_LOCATION.latitude.toFixed(4) &&
          longitude.toFixed(4) === TARGET_LOCATION.longitude.toFixed(4)
        ) {
          console.log(latitude.toFixed(4), TARGET_LOCATION.latitude.toFixed(4) , longitude.toFixed(4), TARGET_LOCATION.longitude.toFixed(4) );
          
          const currentTimestamp = new Date().toISOString();
          console.log("Attendance marked at:", currentTimestamp);
          alert("Attendance marked successfully!");
          setAttendanceMarked(true);
        } else {
          alert("Wrong location mark! Please check your location.");
          console.log(latitude.toFixed(4), TARGET_LOCATION.latitude.toFixed(4) , longitude.toFixed(4), TARGET_LOCATION.longitude.toFixed(4) );
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!employee) {
    return <div className={styles.noEmployee}>No employee data available.</div>;
  }

  const { name, role, email, contactNumber, profileImage, customSchedule } = employee;

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <img src={profileImage || 'default-profile.png'} alt={`${name}'s profile`} className={styles.profileImage} />
        <div className={styles.basicInfo}>
          <h2 className={styles.employeeName}>{name}</h2>
          <p className={styles.employeeRole}>{role}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className={styles.section}>
        <h3>Contact Information</h3>
        <div className={styles.infoGroup}>
          <strong>Email:</strong> <span>{email}</span>
        </div>
        <div className={styles.infoGroup}>
          <strong>Contact Number:</strong> <span>{contactNumber}</span>
        </div>
      </div>

      {/* Schedule Information */}
      <div className={styles.section}>
        <h3>Custom Schedule</h3>
        <div className={styles.infoGroup}>
          <strong>Start:</strong> <span>{customSchedule?.start || 'Not set'}</span>
        </div>
        <div className={styles.infoGroup}>
          <strong>End:</strong> <span>{customSchedule?.end || 'Not set'}</span>
        </div>
        <div className={styles.infoGroup}>
          <strong>Breaks:</strong>
          <ul className={styles.breakList}>
            {customSchedule?.breaks?.length > 0 ? (
              customSchedule.breaks.map((breakTime, index) => (
                <li key={index}>
                  {`Start: ${breakTime.start}, End: ${breakTime.end}`}
                </li>
              ))
            ) : (
              <li>No breaks scheduled.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Mark Attendance Button */}
      <button className={styles.markAttendanceButton} onClick={markAttendance}>
        <FaMapMarkerAlt /> Mark Attendance
      </button>
      {attendanceMarked && <p>Attendance has been marked for today.</p>}
    </div>
  );
};

export default EmployeeProfile;
