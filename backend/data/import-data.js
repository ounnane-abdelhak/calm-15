const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/questionModel"); // Adjust the path as needed

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// Read JSON file dynamically based on the level argument passed
const importData = async (level) => {
  try {
    const filePath = `${__dirname}/level${level}.json`; // Adjust the file paths if needed
    if (!fs.existsSync(filePath)) {
      console.log(`File level${level}.json not found!`);
      process.exit();
    }

    const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    await Question.create(questions); // Assuming you're using the Question model
    console.log(`Data from level${level}.json successfully loaded!`);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Question.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Handle command-line arguments to choose import or delete action
if (process.argv[2] === "--import") {
  const level = process.argv[3];
  if (level) {
    importData(level);
  } else {
    console.log("Please specify a level (e.g., --import 1)");
    process.exit();
  }
} else if (process.argv[2] === "--delete") {
  deleteData();
} else {
  console.log("Please use --import <level_number> or --delete");
  process.exit();
}
