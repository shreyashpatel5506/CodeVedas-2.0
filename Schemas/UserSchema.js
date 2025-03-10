import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "is invalid"],
  },
  role: {
    type: String,
    enum: ["Admin", "Hod", "Employee"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("User", UserSchema);
