import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
