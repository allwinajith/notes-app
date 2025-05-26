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
      return res
        .status(400)
        .json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPass,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .json({
        token,
        user: {
          id: newUser._id,
          userName: newUser.userName,
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
        .json({ message: "User already exists, Can't signUp again" });
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
      user: { id: user._id, userName: user.userName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
