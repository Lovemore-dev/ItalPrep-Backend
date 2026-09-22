const express = require("express");
const testimonialController = require("../controllers/testimonialController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();
router.get("/", testimonialController.getApprovedTestimonials);
router.post("/", requireAuth, testimonialController.submitTestimonial);
router.get("/pending", requireAuth, requireAdmin, testimonialController.listPendingTestimonials);
router.patch("/:id/approve", requireAuth, requireAdmin, testimonialController.approveTestimonial);

module.exports = router;
