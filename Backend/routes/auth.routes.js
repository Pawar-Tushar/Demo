
import express from 'express';
import { registerUser  } from '../controllers/auth.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
    loginUser,
    logoutUser,getLoggedInUser,
  } from "../controllers/auth.controller.js";
  import {
    authenticateToken,
  } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post("/login", loginUser);
router.get("/me", getLoggedInUser);
router.post("/logout", authenticateToken, logoutUser);

export default router;