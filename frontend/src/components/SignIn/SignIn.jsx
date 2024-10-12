import React, { useState } from "react";
import styles from "./style.module.css"; // Import the CSS module

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here (e.g., call an API)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container">
      <div className={`${styles.signInContainer}`}>
        <h2 className={styles.title}>Welcome To Braxas International</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.signInButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
