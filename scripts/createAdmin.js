require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");

const createAdmin = async () => {
  const { MONGO_URI, ADMIN_FULLNAME, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  if (!MONGO_URI || !ADMIN_FULLNAME || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error("Set MONGO_URI, ADMIN_FULLNAME, ADMIN_USERNAME, and ADMIN_PASSWORD before running this command");
  }
  if (ADMIN_PASSWORD.length < 6 || !/^[a-zA-Z0-9]+$/.test(ADMIN_USERNAME)) {
    throw new Error("Admin username must be alpha-numeric and password must be at least 6 characters");
  }

  await mongoose.connect(MONGO_URI);
  const username = ADMIN_USERNAME.toLowerCase();
  const existing = await User.findOne({ username }).collation({ locale: "en", strength: 2 });
  if (existing) throw new Error("That username already exists");

  await User.create({
    fullname: ADMIN_FULLNAME.trim(),
    username,
    password: await bcrypt.hash(ADMIN_PASSWORD, 10),
    role: "admin",
  });
  console.log(`Admin account "${username}" created`);
};

createAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.connection.close());
