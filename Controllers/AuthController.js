import UserSchema from "../Schemas/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shreyashpatel5506@gmail.com",
    pass: "esas djpv lbrd zvxt",
  },
});

// Store OTPs temporarily (Use Redis or DB for production)
const otpStore = new Map();

// Generate and send OTP
const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expiresAt: Date.now() + OTP_EXPIRATION });
  await transporter.sendMail({
    from: "shreyashpatel5506@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });
};

// Register - Send OTP
export const registerSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    await sendOTP(email);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

export const registerVerifyOTP = async (req, res) => {
  try {
    const { name, email, password, mobile, role, otp } = req.body;
    if (!name || !email || !password || !mobile || !role || !otp)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP.otp !== otp || storedOTP.expiresAt < Date.now())
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
    });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "196h" });
    otpStore.delete(email);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};
// Forgot Password - Send OTP
export const forgotPasswordSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user) x``;
    return res.status(400).json({ success: false, message: "Email not found" });

    await sendOTP(email);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// Forgot Password - Verify OTP
export const forgotPasswordVerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP.otp !== otp || storedOTP.expiresAt < Date.now())
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });

    otpStore.delete(email);
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error verifying OTP" });
  }
};

// Protected Test Route Controller
export const testcontroller = (req, res) => {
  console.log("Protected Route Accessed");
  res.json({ success: true, message: "You have accessed a protected route!" });
};

// Fetch All Users
export const fetchAllUsersController = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Error fetching users." });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user existence
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Compare passwords
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "196h" });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in login. Please try again." });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const userId = req.user._id;

    // Validation for missing fields
    if (!name || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Fetch user
    const user = await UserSchema.findById(userId);

    // Update user
    const updatedUser = await UserSchema.findByIdAndUpdate(
      userId,
      {
        name: name || user.name,
        email: email || user.email,
        mobile: mobile || user.mobile,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "User profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changeUserRoleController = async (req, res) => {
  try {
    const { email, newRole } = req.body;

    // Validate inputs
    if (!email || !newRole) {
      return res
        .status(400)
        .json({ success: false, message: "Email and new role are required" });
    }

    // Check if the new role is valid
    const validRoles = ["Admin", "Hod", "Employee"];
    if (!validRoles.includes(newRole)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role specified" });
    }

    // Find user and update role
    const user = await UserSchema.findOneAndUpdate(
      { email },
      { role: newRole },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User role updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: "Error updating user role" });
  }
};
