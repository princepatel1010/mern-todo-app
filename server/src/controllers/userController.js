import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../services/userService.js";
import catchAsync from "../utils/catchAsync.js";

const register = catchAsync(async (req, res) => {
  const userData = await registerUser(req.body);
  res.status(201).json(userData);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const userData = await loginUser(email, password);
  res.json(userData);
});

const getProfile = catchAsync(async (req, res) => {
  const user = await getUserProfile(req.user.id);
  res.json(user);
});

export { register, login, getProfile };
