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


app.post("/api/simplify", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    // Use Hugging Face Router endpoint
    const response = await fetch(
      "https://router.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            max_length: 120,
            min_length: 30,
            do_sample: false,
          },
          options: {
            wait_for_model: true, // handles cold start
          },
        }),
      }
    );

    const data = await response.json();
    console.log("HF RAW RESPONSE:", data);

    if (data.error) {
      return res.status(503).json({
        message: "AI model unavailable",
        error: data.error,
      });
    }

    // Router API still returns summary_text for BART
    if (!Array.isArray(data) || !data[0]?.summary_text) {
      return res.status(500).json({
        message: "Unexpected AI response format",
        data,
      });
    }

    res.json({ simplifiedText: data[0].summary_text });
  } catch (err) {
    console.error("❌ Simplify crash:", err);
    res.status(500).json({ message: "Server error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
