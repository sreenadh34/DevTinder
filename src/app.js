import express from "express";
import connectDB  from "./config/database.js";


connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Add new route for status
app.get("/status", (req, res) => {
  res.json({ status: "Server is running smoothly" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});