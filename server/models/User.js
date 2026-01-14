// Import mongoose for MongoDB schema
import mongoose from "mongoose";

// Define schema for users
const userSchema = new mongoose.Schema({
  name: String,             // User's name
  email: { type: String, unique: true }, // Unique email
  password: String,         // User password
});

// Create and export User model
const User = mongoose.model("User", userSchema);
export default User;
