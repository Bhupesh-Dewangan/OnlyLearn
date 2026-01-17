const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await authService.registerUser({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser({ email, password });

    res.json({
      success: true,
      message: "Logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
