import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel.js";

export const userSignUp = async (req, res) => {
  try {
    const { userName, email, pass, cnfPass } = req.body;

    if (!userName || !email || !pass || !cnfPass) {
      return res.status(400).json({ message: "missing required fields" });
    }

    if (pass != cnfPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUsername = await User.findOne({ username: userName });

    if (existingUserByEmail && existingUserByUsername) {
      return res.status(400).json({
        message: "Email already exists. Please try to login",
      });
    } else if (existingUserByUsername) {
      return res.status(400).json({
        message: "Username already taken. Please try a different username.",
      });
    } else if (existingUserByEmail) {
      return res.status(400).json({
        message: "Email already registered. Please use a different email.",
      });
    }
    const hashedPass = await bcrypt.hash(pass, 10);
    const newUser = await User.create({
      username: userName,
      email: email,
      password: hashedPass,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        userName: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please sign up first" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: { id: user._id, userName: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
