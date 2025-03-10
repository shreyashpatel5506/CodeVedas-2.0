import express from "express";
const router = express.Router();
import {
  registerSendOTP,
  registerVerifyOTP,
  forgotPasswordSendOTP,
  forgotPasswordVerifyOTP,
  loginController,
  updateUserProfile,
  fetchAllUsersController,
  testcontroller,
  changeUserRoleController,
} from "../Controllers/AuthController.js";
import { verifyToken, isAdmin } from "../MiddleWear/middlewear.js";

router.post("/register/send-otp", registerSendOTP);
router.post("/register/verify-otp", registerVerifyOTP);
router.post("/forgot-password/send-otp", forgotPasswordSendOTP);
router.post("/forgot-password/verify-otp", forgotPasswordVerifyOTP);
router.post("/login", loginController);
router.put("/update-profile", verifyToken, updateUserProfile);
router.get("/users", verifyToken, isAdmin, fetchAllUsersController);
router.get("/protected", verifyToken, testcontroller);
router.put("/change-role", verifyToken, isAdmin, changeUserRoleController);

export default router;
