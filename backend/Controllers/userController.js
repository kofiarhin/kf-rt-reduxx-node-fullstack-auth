const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helper/utils");

// get users
// route /users
// method post
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "there was as a problem getting users" });
  }
};

// get user
// @route /:id
// method get
const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(400).json({ error: "user not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

// clear database
// route /users
// method delete

const clearUsers = async (req, res) => {
  try {
    await User.deleteMany();
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(erro);
    res.status(500).json({ error: "ther was a problem clearing database" });
  }
};

// get profile
const getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// create user
// route /users
// method post
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill out all fields" });
    }
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    // generate  and set token
    const token = generateToken(user._id);
    res.cookie("jwt", token);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.json({ error: "email already taken" });
    }
    res.status(500).json({ error: "internal server error" });
  }
};

// login user
// @route /login
// method post

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "user not found" });
    // compare password

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      return res.status(401).json({ error: "check credentials and try again" });
    const token = generateToken(user._id);
    res.cookie("jwt", token);
    return res.status(200).json({ name: user.name, email: user.email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

// logout user
// @route /logout
// method post

const logoutUser = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "cookie cleared" });
};

module.exports = {
  getUsers,
  createUser,
  clearUsers,
  loginUser,
  logoutUser,
  getUser,
  getProfile,
};
