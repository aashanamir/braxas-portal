import React from "react";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaCogs,
  FaEnvelope,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaUserAlt,
  FaBell 
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  return (
    <div className={styles.sidebar}>
      {isAdmin ? (
        <ul className={styles.sidebarMenu}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaTachometerAlt className={styles.icon} title="Dashboard" />
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaUserPlus className={styles.icon} title="Create User" />
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaEnvelope className={styles.icon} title="Messages" />
          </NavLink>
          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaClipboardList className={styles.icon} title="Attendance" />
          </NavLink>
          <NavLink
            to="/payroll"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaMoneyCheckAlt className={styles.icon} title="Payroll" />
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaCogs className={styles.icon} title="Settings" />
          </NavLink>
        </ul>
      ) : (
        <ul className={styles.sidebarMenu}>
          <NavLink
            to="/me"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaUserAlt className={styles.icon} title="Profile" />
          </NavLink>
          <NavLink
            to="/attendance-me"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaClipboardList className={styles.icon} title="Attendance" />
          </NavLink>
          <NavLink
            to="/payroll-me"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaMoneyCheckAlt className={styles.icon} title="Payroll" />
          </NavLink>
          
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem
            }
          >
            <FaBell className={styles.icon} title="Notifications" />
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
