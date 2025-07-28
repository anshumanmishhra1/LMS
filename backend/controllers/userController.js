import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp  = async (req, res) => {
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

    //checking before signup that there is exist a user with the same email
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
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    console.log(user.password);
    console.log(password);

    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // 5. Send success response
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logout ho gaye bhai moye moye");
  } catch (error) {
    res.status(400).send(error);
  }
}