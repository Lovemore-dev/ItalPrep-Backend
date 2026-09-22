const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  quote: { type: String, required: true, trim: true, maxlength: 500 },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", TestimonialSchema);
