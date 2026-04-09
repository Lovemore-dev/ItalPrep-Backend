require("dotenv").config();
const mongoose = require("mongoose");
const Content = require("./models/Content");

const sampleData = [
  {
    category: "linguistic",
    title: "Essential IT Verbs",
    slug: "essential-it-verbs",
    description: "Core Italian verbs for software development.",
    items: [
      {
        label_it: "Sviluppare",
        label_en: "To develop",
        extra_info: "Used for coding.",
      },
      {
        label_it: "Aggiornare",
        label_en: "To update",
        extra_info: "Used for versions/packages.",
      },
    ],
  },
  {
    category: "safety",
    title: "Office Ergonomics",
    slug: "office-ergonomics",
    description: "Workplace safety for IT professionals (DLgs 81/08).",
    items: [
      {
        label_it: "Postazione di lavoro",
        label_en: "Workstation",
        extra_info: "Must be adjustable.",
      },
      {
        label_it: "Schermo",
        label_en: "Monitor",
        extra_info: "Should be at eye level.",
      },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Content.deleteMany(); //clear existing data to avoid duplicates
    await Content.insertMany(sampleData);
    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
seedDB();
