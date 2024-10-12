import React from 'react';
import styles from './style.module.css'; 
import logo from "../../assets/logo.webp";
import { IoMdLogIn } from "react-icons/io";

const Navbar = () => {
  return (
    <nav>
      <div className={`${styles.container} container`}>
          <div className={styles.logo}>
            <img width={"100%"} height={"100%"} src={logo} alt="Logo" />
          </div>

          <div className={styles.signin}>
            <IoMdLogIn color='white'/>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
