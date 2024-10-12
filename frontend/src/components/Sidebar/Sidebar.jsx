import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaCogs,
  FaEnvelope,
  FaMoneyCheckAlt,
  FaClipboardList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarMenu}>
        <NavLink className={`${styles.sidebarItem} ${styles.active}`}>
          <NavLink to="/dashboard" className={`${styles.link}`}>
            <FaTachometerAlt className={styles.icon} title="Dashboard" />
          </NavLink>
        </NavLink>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/user"
            activeClassName={styles.active}
            className={styles.link}
          >
            <FaUserPlus className={styles.icon} title="Create User" />
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/messages"
            activeClassName={styles.active}
            className={styles.link}
          >
            <FaEnvelope className={styles.icon} title="Messages" />
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/attendance"
            activeClassName={styles.active}
            className={styles.link}
          >
            <FaClipboardList className={styles.icon} title="Attendance" />
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/payroll"
            activeClassName={styles.active}
            className={styles.link}
          >
            <FaMoneyCheckAlt className={styles.icon} title="Payroll" />
          </NavLink>
        </li>
        <li className={styles.sidebarItem}>
          <NavLink
            to="/settings"
            activeClassName={styles.active}
            className={styles.link}
          >
            <FaCogs className={styles.icon} title="Settings" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
