import React from "react";
import styles from "./style.module.css";
import logo from "../../assets/logo.webp";
import { IoMdLogIn } from "react-icons/io";
import axios from "axios";
import { setUser } from "../../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../../API/BASEURL";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    let isConfirm = confirm("Are you sure you want to logout?");
    if (!isConfirm) {
      return;
    }
    try {
      const { data } = await axios.get(`${BASEURL}/employee/logout`, {
        withCredentials: true,
      });
      console.log(data);
      dispatch(setUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <div className={`${styles.container} container`}>
        <div className={styles.logo}>
          <img width={"100%"} height={"100%"} src={logo} alt="Logo" />
        </div>

        {user && (
          <div className={styles.signin}>
            <IoMdLogIn onClick={logoutHandler} color="white" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
