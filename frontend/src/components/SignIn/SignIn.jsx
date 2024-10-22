import React, { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { setIsAdmin, setToken, setUser } from "../../slice/authSlice";
import { useDispatch } from "react-redux";
import { BASEURL } from "../../API/BASEURL";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASEURL}/employee/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      let employee = data.employee;
      dispatch(setUser(employee));
      dispatch(setToken(data.token));
      if(employee.role === "Admin"){
        dispatch(setIsAdmin(true));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className={`${styles.signInContainer}`}>
        <h2 className={styles.title}>Welcome To Braxas International</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
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
            <label className={styles.label} htmlFor="password">
              Password
            </label>
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