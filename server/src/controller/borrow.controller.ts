// import { Request, Response } from "express";
// import Books, { BookSchemaType } from "../model/Book.model.js";
// import BookRequest from "../model/bookRequestModel.js";
// import BorrowBooks from "../model/borrowLendModel.js";
// import Notification from "../model/notificationModel.js";
// import User from "../model/user.model.js";

// export const borrowBook = async (req: Request, res: Response) => {
//   const userId = req.user._id.toString(); //user id
//   const { profileUserId, bookId } = req.params; //profile and book id
//   const user = await User.findById(userId); //get loggedin user
//   if (!user) return res.status(400).json({ message: "User not Found" });
//   const profileUser = await User.findById(profileUserId); //get visiting profile id
//   const book = await Books.findById(bookId); //get the book
//   if (!profileUser || !book)
//     return res.status(400).json({ message: "User or Book not Found" });
//   const isAlreadyBookExist = user.bookCollection.some(
//     (id) => id.toString() === book._id.toString(),
//   ); //book exists
//   if (isAlreadyBookExist)
//     return res.status(400).json({ message: "Book already exist" });
//   const notification = new Notification({
//     from: user._id,
//     to: profileUser._id,
//     message: `${user.fullName} Requested to Borrow the book ${book.title}
//                          by ${book.author} from you`,
//     type: "request",
//     book: bookId,
//   });
//   await notification.save();
//   console.log("notification saved");
//   res.status(200).json({ message: "request to borrow book successful!!!" });
// };

// export const returnBook = async (req: Request, res: Response) => {
//   const userId = req.user.id;
//   const user = await User.findById(userId);
//   if (!user) return res.status(400).json({ message: "User not Found" });
//   const { bookId } = req.body;
//   const bookInfo = await Books.findById(bookId);
//   if (!bookInfo) return res.status(400).json({ message: "Book not Found" });
//   const originalId = bookInfo._id;
//   const originalBookInfo = await Books.findById(originalId);
//   if (!originalBookInfo)
//     return res.status(400).json({ message: "Original Book not Found" });
//   const borrowedFromUser = await User.findOne({
//     bookCollection: bookInfo._id,
//   });
//   if (!borrowedFromUser)
//     return res.status(400).json({ message: " BUser not Found" });
//   await User.findByIdAndUpdate(userId, { $pull: { bookCollection: bookId } });
//   originalBookInfo.bookType = "myBook";
//   originalBookInfo.borrowedBy = "";
//   originalBookInfo.borrowedBookId = "";
//   originalBookInfo.bookAdded = new Date();
//   await originalBookInfo.save();
//   const returendNotification = new Notification({
//     from: userId,
//     to: borrowedFromUser._id,
//     message: `${user.fullName} returned the book ${bookInfo.title} by ${bookInfo.author}`,
//     type: "action",
//   });
//   await returendNotification.save();
//   res.status(200).json({ message: "Returned the Book" });
// };
