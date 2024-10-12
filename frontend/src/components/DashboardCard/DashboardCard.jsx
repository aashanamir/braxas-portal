import React from "react";
import styles from "./style.module.css";

const DashboardCard = ({ title, qty ,icon}) => {

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{qty}</p>
      </div>
      <div className={styles.cardIcon}>
        <span className={styles.icon}>{icon || "📈"}</span> {/* You can replace this with an icon component */}
      </div>
    </div>
  );
};

export default DashboardCard;
