const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const blacklisted = await tokenBlacklistModel.findOne({ token });

    if (blacklisted) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.user = decoded;

    next();

  } catch (err) {
    next(err);
  }
}

module.exports = { authUser };