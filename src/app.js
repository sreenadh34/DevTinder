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
// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
      if (users.length === 0) {
      res.status(404).send("User not found");
     } else {
      res.send(users);
     }
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Detele a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
  const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});