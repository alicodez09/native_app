const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");
// import Jwt from "jsonwebtoken";
const Jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validations
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!email) {
      res.send({ message: "Email is required" });
    }
    if (!password) {
      res.send({ message: "Password is required" });
    }

    // Checking the users
    const existingUser = await User.findOne({ email });
    // Existing Users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already registered please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    // Saving the Password
    const data = await new User({
      name,
      email,
      password: hashedPassword,
      assign_password: password,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Checking the User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // Encrypting the Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // !Creating a token(token provides users with access to protected pages and resources for a limited period of time without having to re-enter their username and password.)
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
module.exports = { register, login };
