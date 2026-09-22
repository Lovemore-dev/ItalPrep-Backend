// import the dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
// import environment variables
dotenv.config();
// connect database
connectDB();

// initialize app
const app = express();
// call middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be configured");
}

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));

// port
const PORT = process.env.PORT || 5000;
// start server
app.listen(PORT, () => {
  console.log(`Server is up and runninng on port ${PORT}`);
});
