const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return (token = jwt.sign({ id }, process.env.ACCESS_TOKEN));
};

module.exports = {
  generateToken,
};
