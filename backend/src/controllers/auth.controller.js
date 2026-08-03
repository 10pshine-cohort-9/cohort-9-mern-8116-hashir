const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
const logger = require("../logger/logger");

/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password in the request body
 * @acess public
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists with this email address or username",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  logger.info(`New user registered: ${user.email}`);

  res.status(201).json({
    message: "User register successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @description login a user, expects email and passwrod in the request body
 * @acess public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    logger.warn(`Failed login attempt for email: ${email}`);

    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    logger.warn(`Failed login attempt for email: ${email}`);

    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User loggedIn Succesfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });

  logger.info(`User logged in: ${user.email}`);
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @acess public
 */

async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({
    message: "User logout Successfully",
  });

  logger.info(`User logged out: ${req.user?.username || "Unknown User"}`);
}

/**
 * @name getMeController
 * @description get current user logged In
 * @acess private
 */

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched succesfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });

  logger.info(`Fetched profile for user: ${user.email}`);
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
