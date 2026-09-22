const Testimonial = require("../models/Testimonial");
const User = require("../models/User");

exports.getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .populate("user", "fullname proficiency")
      .sort({ createdAt: -1 });
    res.json(testimonials.map((testimonial) => ({
      id: testimonial._id,
      quote: testimonial.quote,
      name: testimonial.user.fullname,
      proficiency: testimonial.user.proficiency,
      initials: testimonial.user.fullname.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    })));
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.submitTestimonial = async (req, res) => {
  const quote = typeof req.body.quote === "string" ? req.body.quote.trim() : "";
  if (!quote || quote.length > 500) return res.status(400).json({ message: "A testimonial of up to 500 characters is required" });
  const testimonial = await Testimonial.findOneAndUpdate(
    { user: req.user.id },
    { quote, approved: false },
    { upsert: true, new: true, runValidators: true },
  );
  res.status(201).json({ message: "Your story was submitted for review", testimonial: { id: testimonial._id, approved: testimonial.approved } });
};

exports.listPendingTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find({ approved: false }).populate("user", "fullname username proficiency");
  res.json(testimonials);
};

exports.approveTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
  res.json({ message: "Testimonial approved" });
};
