const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const auth = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "unauthorized no token" });

  // find user

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("decoded", decoded);
    const user = await User.findById(decoded.id);

    console.log("user", user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "unauthorized invalid token" });
  }
};

module.exports = {
  auth,
};
