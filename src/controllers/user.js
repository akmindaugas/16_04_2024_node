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
      return res.status(400).json({ message: "bad data, no such user found" });
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

    return res.status(200).json({ jwt_token: jwt_token });
  } catch (err) {
    console.log(err);
  }
};

export const GET_REFRESH_TOKEN = async (req, res) => {
  try {
    const jwt_refresh_token = await user({
      // kur irasomas ir saugojamas jwt_refresh_token?? turi buti bodyje. irasomas sign-in metu ar log-in, ar tik prasant jwt_refresh_token?
      jwt_refresh_token: req.body.jwt_refresh_token,
    });
    if (!jwt_refresh_token) {
      return res
        .status(400)
        .json({ message: "bad or expired jwt_refresh_token. repeat log_in" });
    } else {
      user.jwt.sign(
        { email: user.email, user_id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
    }

    return res
      .status(200)
      .json({ jwt_refresh_token: jwt_refresh_token, jwt_token: jwt_token });
  } catch (err) {
    console.log(err);
  }
};
