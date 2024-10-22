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

// Target location for the plaza
const TARGET_LOCATION = {
  latitude: 31.577279, // Example: Lahore
  longitude: 74.362035,
};

// Haversine formula to calculate distance between two points (in meters)
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const EmployeeProfile = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [error, setError] = useState("");

  const markAttendance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Calculate the distance to the target location
          const distance = getDistanceFromLatLonInMeters(
            latitude,
            longitude,
            TARGET_LOCATION.latitude,
            TARGET_LOCATION.longitude
          );

          // Define a radius (in meters) for marking attendance, e.g., 100 meters
          const ACCEPTABLE_RADIUS = 20;

          if (distance <= ACCEPTABLE_RADIUS) {
            const currentTimestamp = new Date().toISOString();
            console.log("Attendance marked at:", currentTimestamp);
            alert("Attendance marked successfully!");
            setAttendanceMarked(true);
            setError("");
          } else {
            alert(`You are too far from the allowed area. Distance: ${distance.toFixed(2)} meters`);
            setError("Outside allowed range.");
          }
        },
        () => {
          alert("Unable to retrieve your location.");
          setError("Unable to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported.");
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
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default EmployeeProfile;
