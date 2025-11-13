const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Define a simple schema and model for testing
const testSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
});
const Test = mongoose.model("Test", testSchema);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected successfully");

    // Insert a test record
    try {
      const doc = await Test.create({ name: "Test Record" });
      console.log("Inserted test record:", doc);
    } catch (err) {
      console.log("Error inserting test record:", err.message);
    }
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
