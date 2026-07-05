import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getNotifications } from "../controller/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
// router.get("/reminder", protectRoute, reminderNotification);
// router.delete("/", protectRoute, deleteNotifications);

export default router;
