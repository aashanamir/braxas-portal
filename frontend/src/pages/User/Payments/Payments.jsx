import React, { useState } from "react";
import styles from "./style.module.css";

const PaymentHistoryPage = () => {
  // Sample current salary data
  const currentSalary = {
    baseSalary: 55000,
    bonuses: 5000,
    deductions: 1000,
    totalPayable: 59000,
  };

  // Sample payment history data
  const [paymentHistory, setPaymentHistory] = useState([
    {
      date: "2023-09-25",
      amountPaid: 55000,
      bonuses: 5000,
      deductions: 1000,
      totalPaid: 59000,
    },
    {
      date: "2023-08-25",
      amountPaid: 53000,
      bonuses: 3000,
      deductions: 0,
      totalPaid: 56000,
    },
    {
      date: "2023-07-25",
      amountPaid: 51000,
      bonuses: 2000,
      deductions: 1000,
      totalPaid: 52000,
    },
  ]);

  return (
    <div className={styles.paymentHistoryContainer}>
      <h1 className={styles.title}>Payment History & Current Salary</h1>

      {/* Current Salary Section */}
      <div className={styles.currentSalary}>
        <h2>Current Salary</h2>
        <div className={styles.salaryDetails}>
          <div>
            <strong>Base Salary:</strong> ${currentSalary.baseSalary.toLocaleString()}
          </div>
          <div>
            <strong>Bonuses:</strong> ${currentSalary.bonuses.toLocaleString()}
          </div>
          <div>
            <strong>Deductions:</strong> ${currentSalary.deductions.toLocaleString()}
          </div>
          <div className={styles.totalPayable}>
            <strong>Total Payable:</strong> ${currentSalary.totalPayable.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      <div className={styles.historySection}>
        <h2>Payment History</h2>
        <table className={styles.paymentTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount Paid</th>
              <th>Bonuses</th>
              <th>Deductions</th>
              <th>Total Paid</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>{`$${payment.amountPaid.toLocaleString()}`}</td>
                <td>{`$${payment.bonuses.toLocaleString()}`}</td>
                <td>{`$${payment.deductions.toLocaleString()}`}</td>
                <td>{`$${payment.totalPaid.toLocaleString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
