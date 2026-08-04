const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const tokenBlacklistModel = require("../models/blacklist.model");


function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}



async function authUser(req, res, next) {

  try {

    const token = req.cookies.token;


    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }


    const hashedToken = hashToken(token);


    const blacklisted = await tokenBlacklistModel.findOne({
      token: hashedToken,
    });


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


  } catch (error) {

    next(error);

  }

}



module.exports = {
  authUser,
};