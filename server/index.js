import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import savedRoutes from "./routes/saved.js";
import User from "./models/User.js";
import fetch from "node-fetch";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Sign Up
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

// Sign In
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Sign in successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign in failed" });
  }
});

// View all users (without passwords)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


app.use(savedRoutes);



// Grammar & spelling check
app.post("/api/grammar", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: "Text is required" });

    // LanguageTool API
    const response = await fetch("https://api.languagetoolplus.com/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        text,
        language: "en-US",
      }),
    });

    const data = await response.json();
    res.json(data); // contains grammar, spelling, and style suggestions
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
