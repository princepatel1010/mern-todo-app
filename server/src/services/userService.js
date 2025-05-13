import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: "30d",
  });
};

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    throw new Error("Invalid user data");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(400, "Invalid email or password");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export { registerUser, loginUser, getUserProfile };
