const Content = require("../models/Content");

// Get all modules
exports.getAllContent = async (req, res) => {
  try {
    /* To make the initial page load much faster,
        we use .select('-items') to get everything Except the big list of items
        */
    const allContent = await Content.find().select("-items");
    res.status(200).json(allContent);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get a single module by its slug
exports.getCOntentBySlug = async (req, res) => {
  try {
    const content = await Content.findOne({ slug: req.params.slug });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
