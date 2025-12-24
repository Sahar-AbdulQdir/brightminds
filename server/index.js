import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import savedRoutes from "./routes/saved.js";
import User from "./models/User.js";
import fetch from "node-fetch";
import bcrypt from "bcryptjs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const PODCAST_API_KEY = process.env.PODCAST_API_KEY;
const __dirname = path.resolve();

// ------------------ Middleware ------------------
app.use(express.json());
app.use(
  cors({
    origin: "*", // OK for now; restrict later in production
    credentials: true,
  })
);

// ------------------ MongoDB ------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------ Auth Routes ------------------
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({
      message: "Sign in successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign in failed" });
  }
});

// ------------------ Users ------------------
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ------------------ Grammar ------------------
app.post("/api/grammar", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim())
      return res.status(400).json({ message: "Text is required" });

    const response = await fetch(
      "https://api.languagetoolplus.com/v2/check",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text, language: "en-US" }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ Podcasts ------------------
app.get("/api/podcasts/hot", async (req, res) => {
  try {
    const response = await fetch(
      "https://listen-api.listennotes.com/api/v2/best_podcasts",
      {
        headers: { "X-ListenAPI-Key": PODCAST_API_KEY },
      }
    );
    const data = await response.json();
    res.json(data.podcasts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch podcasts" });
  }
});

app.get("/api/podcasts/:id/episodes", async (req, res) => {
  try {
    const response = await fetch(
      `https://listen-api.listennotes.com/api/v2/podcasts/${req.params.id}`,
      {
        headers: { "X-ListenAPI-Key": PODCAST_API_KEY },
      }
    );
    const data = await response.json();
    res.json(data.episodes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch episodes" });
  }
});

// ------------------ Saved ------------------
app.use(savedRoutes);

// ------------------ Frontend ------------------
app.use(express.static(path.join(__dirname, "../dist")));

// ✅ Express-5 safe SPA fallback (DO NOT use app.get("*"))
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ------------------ Start Server ------------------
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
