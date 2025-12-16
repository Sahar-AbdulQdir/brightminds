import mongoose from "mongoose";

const savedItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["book", "podcast"], required: true },
  title: String,
  identifier: String, // book identifier or podcast id
  audio: String,      // podcast audio URL
  image: String,      // cover image
  description: String,
  duration: String,
}, { timestamps: true });

export default mongoose.model("SavedItem", savedItemSchema);
