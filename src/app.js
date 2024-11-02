import express from "express";
import connectDB  from "./config/database.js";
import User from "./models/user.js";


connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.post("/signup", async (req,res) => {
  // creting a new instance of User model
  const user = new User({
    firstName: "sreenadh1",
    lastName: "M",
    emailId:"sreendh1.34@mail.com",
    password:"hufhrufhfurhfurh"
  });
  await user.save();
  res.send("User added successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});