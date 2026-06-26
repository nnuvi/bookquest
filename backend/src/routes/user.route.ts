import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMyProfile,
  getUserProfile,
  editProfile,
  friendsRequestSendUnsend,
  friendList,
  searchProfile,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/me", protectRoute, getMyProfile);
router.get("/profile/:id", protectRoute, getUserProfile);
router.post("/friends/:id", protectRoute, friendsRequestSendUnsend);
router.post("/friends", protectRoute, friendList);
router.post("/editProfile", protectRoute, editProfile);
router.get("/searchProfile", protectRoute, searchProfile);

export default router;
