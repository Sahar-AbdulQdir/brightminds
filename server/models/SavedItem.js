// Importing mongoose for MongoDB schema creation
import mongoose from "mongoose";

// Schema for items saved by users (books or podcasts)
const savedItemSchema = new mongoose.Schema({
  // Reference to the user who saved the item
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Type of saved item: either 'book' or 'podcast'
  type: { type: String, enum: ["book", "podcast"], required: true },
  title: String,
  identifier: String, // book identifier or podcast id
  audio: String,      // podcast audio URL
  image: String,      // cover image
  description: String,
  duration: String,
}, { timestamps: true });

export default mongoose.model("SavedItem", savedItemSchema);
