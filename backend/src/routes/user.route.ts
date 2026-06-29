import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMyProfile,
  getUserProfile,
  editProfile,
  friendsRequestSendUnsend,
  friendList,
  // searchProfile,
  getUsers,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/me", protectRoute, getMyProfile);
router.get("/profile/:id", protectRoute, getUserProfile);
router.post("/friends/:id", protectRoute, friendsRequestSendUnsend);
router.get("/friends", protectRoute, friendList);
router.post("/editProfile", protectRoute, editProfile);
// router.get("/searchProfile", protectRoute, searchProfile);

export default router;
