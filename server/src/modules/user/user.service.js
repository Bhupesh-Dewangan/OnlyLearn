const User = require("./user.model");

const createUser = async (userData) => {
  return await User.create(userData);
};

const getUserById = async (userId) => {
  return await User.findById(userId).select("-passwordHash");
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateUserPreferences = async (userId, preferences) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { preferences } },
    { new: true, runValidators: true }
  ).select("-passwordHash");
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserPreferences,
};

