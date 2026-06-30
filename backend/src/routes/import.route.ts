// import express from "express";
// import {
//   imageImport,
//   isbnImport,
//   manualImport,
// } from "../controller/import.controller.js";
// import upload from "../middleware/multer.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/importBooksByISBN", protectRoute, isbnImport);
// router.post(
//   "/importBooksByImage",
//   protectRoute,
//   upload.single("image"),
//   imageImport,
// );
// router.post("/importBooksManually", protectRoute, manualImport);

// export default router;