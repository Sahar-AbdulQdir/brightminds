import express from "express";
import SavedItem from "../models/SavedItem.js";
import User from "../models/User.js"; // <-- fixed default import

const router = express.Router();

// Save a new item
router.post("/api/save-item", async (req, res) => {
  try {
    const { email, item } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newItem = new SavedItem({ ...item, user: user._id });
    await newItem.save();
    res.status(201).json({ message: "Item saved", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save item" });
  }
});

// Get all saved items for a user
router.get("/api/saved-items", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const items = await SavedItem.find({ user: user._id });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

// Remove a saved item
router.delete("/api/saved-item/:id", async (req, res) => {
  try {
    await SavedItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove item" });
  }
});

export default router;
