import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { connectDb } from "./config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "./models/userSchema.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Connect to DB
connectDb();

app.post("/user/signup", async (req, res) => {
  try {
    const user = req.body;

    if (
      !user.email ||
      !user.name.firstName ||
      !user.phone ||
      !user.password ||
      !user.age
    ) {
      return res.status(400).send("Something is missing");
    }

    //checking before signup that there is exist a user with the same email?
    const checkUser = await User.findOne({ email: user.email });
    console.log(checkUser);
    if (checkUser) {
      res.status(400).send("pehle se hi hai bhai user");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUser = new User(user);
    await newUser.save();

    res.status(200).send("Signup Successfull");
    console.log(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/user/login", async (req, res) => {
  try {
    const user = req.body;
    const userMail = await User.findOne({ email: user.email });
    if (!userMail) {
      res.status(400).send("user doesn't exist");
    }

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'30d'})

    const isMatch = bcrypt.compare(password,user.password);
    

  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
