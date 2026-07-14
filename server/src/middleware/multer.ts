import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// import multer from 'multer';

// // Set up Multer to use memory storage
// const storage = multer.memoryStorage();

// // Initialize Multer with the memory storage configuration
// const upload = multer({ storage });

// export default upload;

