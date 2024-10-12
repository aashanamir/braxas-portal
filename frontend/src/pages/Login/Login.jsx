import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LoginComponent from '../../components/SignIn/SignIn';
import styles from './style.module.css';

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
          <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
