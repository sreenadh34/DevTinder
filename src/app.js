import express from "express";
import connectDB  from "./config/database.js";
import User from "./models/user.js";


connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())

app.post("/signup", async (req,res) => {
  // creting a new instance of User model
  const user = new User(req.body);
  try{
  await user.save();
  res.send("User added successfully");
  } catch(err) {
    res.status(400).send("Error saving user" + err.message );
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});