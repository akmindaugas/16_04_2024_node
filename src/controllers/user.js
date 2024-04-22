// import express from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

export const SIGN_IN = async (req, res) => {
  try {
    // ========================================EMAIL VALIDACIJA=======
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(req.body.email);
    const userName = req.body.name;
    const capitalizedUserName =
      userName.charAt(0).toUpperCase() + userName.slice(1);

    if (!isValidEmail) {
      return res.status(400).json({ message: "your email is not valid" });
    }
    // ====================================PASSWORD VALIDACIJA========
    function validatePassword(inputPassword) {
      const minLength = 6;
      const digitRegex = /\d/;

      if (inputPassword.length < minLength || !digitRegex.test(inputPassword)) {
        return false;
      }
      return true;
    }

    const password = req.body.password;
    if (!validatePassword(password)) {
      res.status(400).json({
        error:
          "Password must be at least 6 characters long and contain at least one number.",
      });
      return;
    } else {
      // randomaizeris hashinimui
      const salt = bcrypt.genSaltSync(10);
      // pats hashas
      var hash = bcrypt.hashSync(password, salt);

      const user = new UserModel({
        id: uuidv4(),
        name: capitalizedUserName,
        email: req.body.email,
        password: hash,
        items: [],
      });

      const response = await user.save();

      return res.status(200).json({ user: response });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "bad data for SIGN_IN" });
  }
};

export const LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "bad data, user not found" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "bad data" });
    }

    const jwt_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    const jwt_refresh_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET_2,
      { expiresIn: "24h" }
    );
    if (!jwt_refresh_token) {
      return res
        .status(400)
        .json({ message: "your token expired, hit refresh endpoint" });
    }

    return res.status(200).json({ jwt_token, jwt_refresh_token });
  } catch (err) {
    console.log(err);
  }
};

export const GET_REFRESH_TOKEN = async (req, res) => {
  try {
    // kur irasomas ir saugojamas jwt_refresh_token?? turi buti bodyje. irasomas sign-in metu ar log-in, ar tik prasant jwt_refresh_token? prasome is headerio
    const jwt_refresh_token = req.headers["jwt_refresh_token"];

    if (!req.headers.authorization || !jwt_refresh_token) {
      return res.status(400).json({ message: "No jwt_refresh_token provided" });
    }
    // Verify jwt_refresh_token
    jwt.verify(
      jwt_refresh_token,
      process.env.JWT_SECRET_2,
      async (err, decoded) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Invalid or expired jwt_refresh_token" });
        }

        // Generate new jwt_token
        const jwt_token = jwt.sign(
          { email: decoded.email, user_id: decoded.user_id },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );

        return res.status(200).json({ jwt_token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GET_ALL_USERS = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ name: 1 });

    return res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
  }
};
export const GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
  }
};

export const USER_BY_ID_BUY_ITEM = async (req, res) => {
  try {
    const { user_id, item_id } = req.body;

    const user = await UserModel.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const price = 10;

    if (user.money < price) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    user.money -= price;
    user.boughtItems.push(items_id);
    await user.save();

    return res.status(200).json({ message: "item bought successfully" });
  } catch (err) {
    console.log(err);
  }
};
