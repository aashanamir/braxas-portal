import express from "express";
import { createUser, getMyProfile, loginUser } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

// Login User ----------------------> Public
router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticated , getMyProfile);
// router.route("/forget-password").post(forgetPassword);
// router.route("/reset-password/:token").post(resetPassword);


// Verify User Account ----------------------> Signup Completed
// router.route("/verify-token-request").post(verifyEmailRequest);
// router.route("/verify-token/:id").get(verifyUser);


// Action User ----------------------> Only Authenticated
// router.route("/logout").get(isAuthenticated ,logoutUser);
// router.route("/me").get(isAuthenticated , getMyProfile);
// router.route("/me/edit").post(isAuthenticated , editMyProfile);
// router.route("/me/edit/password").post(isAuthenticated , editMyPassword);


// Optionsal Route ------------------------> 
// router.route("/all").get(getAllUsers);


export default router;