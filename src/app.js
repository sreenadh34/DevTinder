import express from "express";
import connectDB  from "./config/database.js";
import User from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";
import bcrypt from "bcrypt";

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())

app.post("/signup", async (req,res) => {
  
  try{
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

     // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creting a new instance of User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  await user.save();
  res.send("User added successfully");
  } catch(err) {
    res.status(400).send("Error :" + err.message );
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});