import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken";
import { asyncHandler } from '../utils/asyncHandler.js';


export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, phone, email, password } = req.body;
console.log(name)

  if (!name || !email || !phone || !password ) {
    return next(new ApiError(400, 'All fields are required'));
  }
  const userExists = await User.findOne({
    $or: [{ email }, { phone }]
  });
  if (userExists) {
    const existingField = userExists.email === email ? 'email' : 'phone';
    return next(new ApiError(400, `User already exists with this ${existingField}`));
  }
  const newUser = new User({
    name,
    phone,
    email,
    password,
  });
  const savedUser = await newUser.save();
  const accessToken = generateAccessToken(savedUser);
  const refreshToken = generateRefreshToken(savedUser);

  savedUser.refreshToken = refreshToken;
  await savedUser.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, {
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
        accessToken,
        refreshToken,
      }, "User registered successfully.")
    );
});

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email},
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn:"1d"}
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
  );
};

export const loginUser = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password)
      throw new ApiError(400, "Email/Phone and password are required");

    let user = /\S+@\S+\.\S+/.test(identifier)
      ? await User.findOne({ email: identifier })
      : await User.findOne({ phone: identifier });

    if (!user) throw new ApiError(404, "User not found");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res
  .status(200)
  .cookie("__accessToken", accessToken, {
    httpOnly: false,
    secure: true,
    sameSite: 'None',

    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  .cookie("__refreshToken", refreshToken, {
    httpOnly: false,
    secure: true,
    sameSite: 'None',
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  .json(new ApiResponse(200, { user, accessToken, refreshToken }, "Login successful"));
  } catch (error) {
    next(error);
  }
};


export const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");

    user.refreshToken = null;
    await user.save();

    res
      .status(200)
      .clearCookie("__accessToken", {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
        path: "/"
      })
      .clearCookie("__refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
        path: "/"
      })
      .json(new ApiResponse(200, {}, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized");

    let decoded;
    try {
      decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    try {
      user.refreshToken = newRefreshToken;
      await user.save();
    } catch (err) {
      throw new ApiError(500, "Internal server error");
    }

    res
      .status(200)
      .cookie("accessToken", newAccessToken, { httpOnly: true, sameSite: "Strict", secure: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true, sameSite: "Strict", secure: true })
      .json(new ApiResponse(200, { accessToken: newAccessToken, refreshToken: newRefreshToken }, "Token refreshed"));
  } catch (error) {
    consolw.error("Server Error" , error);
    next(error);
  }
};






export const getLoggedInUser = async (req, res, next) => {
  try {
    const token = req.cookies.__accessToken;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};