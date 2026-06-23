import { Request, Response } from "express";
import Books from "../model/book.model.js";
import User from "../model/user.model.js";

export const manualImport = async (req: Request, res: Response) => {
  const {
    title,
    author,
    genre,
    publisher,
    publicationDate,
    pageCount,
    description,
  } = req.body;

  const userId = req.user._id.toString();
  console.log(req.user);
  const user = await User.findById(userId);
  console.log("user : ", user);
  if (!user) return res.status(400).json({ message: "User not Found" });

  if (!title)
    return res.status(400).json({ message: "Need a title for the Book" });

  const userBook = await User.findById(userId)
    .populate("bookCollection", "title") // Only populate the 'title' of each book
    .exec(); // Executes the query

  if (!userBook) {
    console.log("User not found");
    return [];
  }
  const bookTitles = userBook.bookCollection.map((book) => book.title);
  console.log("bookTitles", bookTitles);

  if (bookTitles.includes(title)) {
    return res.status(400).json({ message: "Book already exist" });
  }
  console.log("Here");
  if (!author)
    return res.status(400).json({ message: "Add an Author for the Book" });
  console.log("Here2");
  if (!genre)
    return res.status(400).json({ message: "Add genre for the Book" });

  const newBook = new Books({
    title,
    author,
    genre,
    publisher,
    publicationDate,
    pageCount,
    description,
  });

  await newBook.save();
  user.bookCollection.push(newBook._id);
  await user.save();
  console.log(newBook);
  res.status(201).json({ message: "Book Added Successfully" });
};

export const isbnImport = async (req: Request, res: Response) => {
  const { isbn } = req.body;
  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  const book = await fetch(url);
  const data = await book.json();
  const bookData = data.items[0].volumeInfo;
  console.log(bookData);
  if (!bookData) {
    return res.status(404).json({ message: "No book found for this ISBN" });
  }
  const existTitle = await Books.findOne({ title: bookData.title });
  if (existTitle)
    return res.status(400).json({ message: "Book already exist" });
  const newBook = new Books({
    title: bookData.title,
    author: bookData.authors,
    genre: bookData.categories,
    publisher: bookData.publisher,
    publicationDate: bookData.publishedDate,
    pageCount: bookData.pageCount,
    description: bookData.description,
    isbn: isbn,
  });
  await newBook.save();
  user.bookCollection.push(newBook._id);
  await user.save();
  console.log(newBook);
  res.status(201).json({ message: "Book Added Successfully" });
};

export const imageImport = async (req: Request, res: Response) => {
  /*
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const client = new ImageAnnotatorClient({
               keyFilename: "D:/PJ/UNIPRO/wide-empire-443002-m6-0b1e3f325ec9.json", // Path to your JSON key file
          });



          if (!req.file) {
               return res.status(400).json({ message: 'No file uploaded' });
          }
          console.log('req file:', req.file);

          // Access the uploaded file
          /*const uploadedFilePath = path.join(__dirname, 'uploads', req.file.filename);
          console.log('Uploaded file:', uploadedFilePath);*/

  const userId = req.user._id.toString();
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const buffer = req.file.buffer;

  console.log("Buffer length:", buffer.length);
  console.log("buffer", buffer);

  // Convert buffer to Base64
  const base64Image = buffer.toString("base64");

  // OCR.space API request
  const ocrApiUrl = "https://api.ocr.space/parse/image";
  const apiKey = "K84770420488957"; // Replace with your OCR.space API key

  const response = await fetch(ocrApiUrl, {
    method: "POST",
    headers: {
      apikey: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64Image: `data:image/png;base64,${base64Image}`,
      language: "eng",
      isOverlayRequired: false,
    }),
  });

  const ocrResult = await response.json();

  if (!ocrResult.IsErroredOnProcessing && ocrResult.ParsedResults.length > 0) {
    const extractedText = ocrResult.ParsedResults[0].ParsedText;
    console.log("Extracted Text:", extractedText);

    return res
      .status(201)
      .json({ message: "Text extracted successfully", data: extractedText });
  } else {
    console.error("OCR API Error:", ocrResult.ErrorMessage || "Unknown error");
    return res.status(500).json({
      message: "Failed to extract text from image",
      error: ocrResult.ErrorMessage,
    });
  }

  //const preprocessedBuffer = await preprocessImage(buffer);
  /*
                    const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
                      logger: (m) => console.log(m),
                      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                      oem: 3,
                      psm: 6
                    });*/

  //const [result] = await client.textDetection({ image: { content: buffer } });
  //const text = result.textAnnotations[0]?.description || '';
  /*
              if (!text) {
                return res.status(404).json({ message: 'No text found in the image' });
              }
    
              console.log('Extracted Text:', text);
    
              res.status(201).json({ message: "Book Added Successfully", data: text });*/
};



