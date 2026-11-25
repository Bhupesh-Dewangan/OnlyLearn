const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./auth.model");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "onlylearn_default_dev_secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.passwordHash;
  return userObj;
};

const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    const error = new Error("Username, email, and password are required");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters long");
    error.statusCode = 400;
    throw error;
  }

  const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingEmail) {
    const error = new Error("An account with this email already exists");
    error.statusCode = 400;
    throw error;
  }

  const existingUsername = await User.findOne({ username: username.trim() });
  if (existingUsername) {
    const error = new Error("This username is already taken");
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username: username.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(username.trim())}`,
  });

  const token = generateToken(newUser._id);
  return { user: sanitizeUser(newUser), token };
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);
  return { user: sanitizeUser(user), token };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = {
  generateToken,
  registerUser,
  loginUser,
  getCurrentUser,
};
