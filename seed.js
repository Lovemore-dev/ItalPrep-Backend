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
      {
        label_it: "Eseguire",
        label_en: "To execute/run",
        extra_info: "Commonly used for scripts or commands.",
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
      {
        label_it: "Poggiapiedi",
        label_en: "Footrest",
        extra_info: "Recommended if feet don't touch the ground.",
      },
    ],
  },
  {
    category: "logical",
    title: "Boolean Logic & Flows",
    slug: "boolean-logic-flows",
    description: "Foundational logic terminology in Italian.",
    items: [
      {
        label_it: "Condizione",
        label_en: "Condition",
        extra_info: "Used in if/else statements.",
      },
      {
        label_it: "Ciclo",
        label_en: "Loop",
        extra_info: "For repeating blocks of code.",
      },
      {
        label_it: "Vero o Falso",
        label_en: "True or False",
        extra_info: "The two states of a boolean variable.",
      },
    ],
  },
  {
    category: "methodology",
    title: "Agile & Scrum",
    slug: "agile-scrum-it",
    description: "Project management terms used in modern dev teams.",
    items: [
      {
        label_it: "Mischia",
        label_en: "Scrum",
        extra_info: "The framework name (rarely translated, but used in context).",
      },
      {
        label_it: "Arretrato",
        label_en: "Backlog",
        extra_info: "The list of tasks to be completed.",
      },
      {
        label_it: "Revisione",
        label_en: "Review",
        extra_info: "The phase where work is demonstrated to stakeholders.",
      },
    ],
  },
  {
    category: "hardware",
    title: "Infrastructure & Hardware",
    slug: "infrastructure-hardware",
    description: "Terms related to physical machines and servers.",
    items: [
      {
        label_it: "Alimentatore",
        label_en: "Power Supply Unit (PSU)",
        extra_info: "Converts AC to DC for components.",
      },
      {
        label_it: "Scheda madre",
        label_en: "Motherboard",
        extra_info: "The main printed circuit board.",
      },
      {
        label_it: "Memoria di massa",
        label_en: "Secondary Storage",
        extra_info: "Refers to HDDs or SSDs.",
      },
    ],
  },
  {
    category: "architecture",
    title: "Web & API Architecture",
    slug: "web-api-architecture",
    description: "Terms related to full-stack structure and communication.",
    items: [
      {
        label_it: "Richiesta",
        label_en: "Request",
        extra_info: "The HTTP message sent from client to server.",
      },
      {
        label_it: "Risposta",
        label_en: "Response",
        extra_info: "The HTTP message sent from server to client.",
      },
      {
        label_it: "Rotta",
        label_en: "Route",
        extra_info: "The endpoint URL path in a backend application.",
      },
    ],
  },
  {
    category: "database",
    title: "Database Management",
    slug: "database-management-it",
    description: "Core operations for handling persistent data.",
    items: [
      {
        label_it: "Interrogazione",
        label_en: "Query",
        extra_info: "A request for information from a database.",
      },
      {
        label_it: "Schema",
        label_en: "Schema",
        extra_info: "The structure or blueprint of the data.",
      },
      {
        label_it: "Vincolo",
        label_en: "Constraint",
        extra_info: "Rules applied to data fields (e.g., unique, required).",
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
