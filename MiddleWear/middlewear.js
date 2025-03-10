import express from "express";
import jwt from "jsonwebtoken";
import User from "../Schemas/UserSchema.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Middleware to verify token and set user
export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(verified.id).select("-password");
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

// Middleware for Admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  next();
};

// Middleware for HOD
export const isHod = (req, res, next) => {
  if (req.user.role !== "Hod") {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  next();
};

// Middleware for Employee
export const isEmployee = (req, res, next) => {
  if (req.user.role !== "Employee") {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  next();
};
