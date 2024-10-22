import React, { useState } from "react";
import styles from "./style.module.css";

// Plaza Coordinates
const plazaCoordinates = {
  latitude: 31.57730695124826,
  longitude: 74.36206168162902,
};

// Helper function to calculate distance between two coordinates using Haversine formula
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

const attendanceData = [
  { date: "2024-10-18", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present" },
  { date: "2024-10-19", checkIn: "09:15 AM", checkOut: "05:00 PM", status: "Present" },
  { date: "2024-10-20", checkIn: "09:30 AM", checkOut: "04:30 PM", status: "Present" },
  { date: "2024-10-21", checkIn: "-", checkOut: "-", status: "Absent" },
];

const EmployeeAttendance = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [error, setError] = useState("");

  // Check if user is within the defined radius
  const isWithinPlaza = (userLat, userLon) => {
    const distance = getDistanceFromLatLonInMeters(
      userLat,
      userLon,
      plazaCoordinates.latitude,
      plazaCoordinates.longitude
    );

    // Define acceptable radius (in meters), e.g., 100 meters
    const acceptableRadius = 100;
    return distance <= acceptableRadius;
  };

  // Get user's current location and try to mark attendance
  const handleMarkAttendance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          if (isWithinPlaza(latitude, longitude)) {
            setAttendanceMarked(true);
            setError("");
          } else {
            setError("You are outside the allowed attendance marking area.");
          }
        },
        () => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className={styles.attendanceContainer}>
      <h1 className={styles.title}>Employee Attendance</h1>

      <table className={styles.attendanceTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.checkIn}</td>
              <td>{record.checkOut}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    record.status === "Present" ? styles.present : styles.absent
                  }`}
                >
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.attendanceButton} onClick={handleMarkAttendance}>
        Mark Attendance
      </button>

      {attendanceMarked && <p className={styles.successMessage}>Attendance marked successfully!</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default EmployeeAttendance;