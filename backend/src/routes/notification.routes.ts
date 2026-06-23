import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  allNotifications,
  deleteNotifications,
  reminderNotification,
} from "../controller/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, allNotifications);
router.get("/reminder", protectRoute, reminderNotification);
router.delete("/", protectRoute, deleteNotifications);

export default router;
