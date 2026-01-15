// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import savedRoutes from "./routes/saved.js";
import User from "./models/User.js";
import fetch from "node-fetch";
import bcrypt from "bcryptjs";
import path from "path";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const PODCAST_API_KEY = process.env.PODCAST_API_KEY;
const __dirname = path.resolve(); // Resolve current directory

// ------------------ Middleware ------------------
// Parse JSON requests
app.use(express.json());
// Enable CORS for all origins
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ------------------ MongoDB ------------------
// Connect to MongoDB using MONGO_URI from environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ------------------ Auth Routes ------------------
// Sign up new user
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

// Sign in existing user
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
// Get all users (excluding passwords)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ------------------ Podcasts ------------------
// Fetch trending podcasts
app.get("/api/podcasts/hot", async (req, res) => {
  try {
    const response = await fetch(
      "https://listen-api.listennotes.com/api/v2/best_podcasts",
      { headers: { "X-ListenAPI-Key": PODCAST_API_KEY } }
    );
    const data = await response.json();
    res.json(data.podcasts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch podcasts" });
  }
});

// Fetch episodes for a specific podcast by ID
app.get("/api/podcasts/:id/episodes", async (req, res) => {
  try {
    const response = await fetch(
      `https://listen-api.listennotes.com/api/v2/podcasts/${req.params.id}`,
      { headers: { "X-ListenAPI-Key": PODCAST_API_KEY } }
    );
    const data = await response.json();
    res.json(data.episodes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch episodes" });
  }
});

// ------------------ Saved ------------------
// Routes for saving and fetching user saved items
app.use(savedRoutes);

// ------------------ Frontend ------------------
// Serve static frontend files
app.use(express.static(path.join(__dirname, "../dist")));

// SPA fallback for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ------------------ Start Server ------------------
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
