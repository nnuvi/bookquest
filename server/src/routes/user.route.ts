import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMyProfile,
  getUserProfile,
  editProfile,
  // friendsRequestSendUnsend,
  friendList,
  // searchProfile,
  getUsers,
  searchUsers,
  updateMyProfileImage,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/search", protectRoute, searchUsers);
router.get("/me", protectRoute, getMyProfile);
router.patch(
  "/me/profile-image",
  protectRoute,
  upload.single("image"),
  updateMyProfileImage,
);
router.get("/profile/:id", protectRoute, getUserProfile);
// router.post("/friends/:id", protectRoute, friendsRequestSendUnsend);
router.get("/friends", protectRoute, friendList);
router.post("/editProfile", protectRoute, editProfile);
// router.get("/searchProfile", protectRoute, searchProfile);

export default router;
