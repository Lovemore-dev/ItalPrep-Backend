// import mongoose
const mongoose = require("mongoose");

// create a schema
const ContentSchema = new mongoose.Schema({
  // category to help us filter if it is IT terms or safety
  category: {
    type: String,
    required: true,
    enum: ["linguistic", "civic", "safety"],
    lowercase: true,
  },
  // Ttitle for displaying names
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // slug for SEO
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  // description for SEO and UI
  description: {
    type: String,
  },
  // iyems to contain array of objects where learning content lives
  items: [
    {
      label_it: { type: String, required: true }, //The Italian word
      label_en: { type: String, required: true }, //The English translation
      extra_info: { type: String }, //Examples or Context
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a model based on the schema
module.exports = mongoose.model("Content", ContentSchema);
