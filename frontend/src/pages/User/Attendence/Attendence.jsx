import React from "react";
import styles from "./style.module.css";


const attendanceData = [
  { date: "2024-10-18", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present" },
  { date: "2024-10-19", checkIn: "09:15 AM", checkOut: "05:00 PM", status: "Present" },
  { date: "2024-10-20", checkIn: "09:30 AM", checkOut: "04:30 PM", status: "Present" },
  { date: "2024-10-21", checkIn: "-", checkOut: "-", status: "Absent" },
];

const EmployeeAttendance = () => {
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
    </div>
  );
};

export default EmployeeAttendance;
