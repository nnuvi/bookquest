import { Request, Response } from "express";

import { HTTP_STATUS } from "../constant/httpStatus.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { FriendRequestResponseAction } from "../model/FriendRequest.model.js";
import * as friendService from "../service/friend.service.js";
import logger from "../config/logger.js";

export const getFriendStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { targetUserId } = req.params;

    const status = await friendService.getFriendStatus(
      req.user._id.toString(),
      targetUserId!,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: status,
    });
  },
);

export const getFriendRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await friendService.getFriendRequests(req.user._id.toString());
    logger.debug("data", data);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data,
    });
  },
);

export const sendFriendRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { receiverId } = req.params;

    const friendRequests = await friendService.sendFriendRequest(
      req.user._id.toString(),
      receiverId!,
      req.user.fullName,
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: friendRequests,
    });
  },
);

export const respondFriendRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { action } = req.body as {
      action: FriendRequestResponseAction;
    };

    const data = await friendService.respondFriendRequest(
      req.user._id.toString(),
      requestId!,
      action,
      req.user.fullName,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Friend removed successfully.",
    });
  },
);

export const removeFriend = asyncHandler(
  async (req: Request, res: Response) => {
    const { friendId } = req.params;

    await friendService.removeFriend(
      req.user._id.toString(),
      req.params.friendId!,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Friend removed successfully.",
    });
  },
);

export const cancelFriendRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;

    await friendService.cancelFriendRequest(
      req.user._id.toString(),
      req.params.requestId!,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Friend Request canceled successfully.",
    });
  },
);

// export const borrowBookRequest = async (req: Request, res: Response) => {
//   const userId = req.user._id.toString();
//   const user = await User.findById(userId);
//   if (!user) return res.status(400).json({ message: "User not Found" });

//   const bookId = req.params.bookId;
//   console.log(bookId);
//   const book = await Books.findById(bookId);
//   if (!book) return res.status(400).json({ message: "Book not Found" });

//   const profileUserId = req.params.profileUserId;
//   const profileUser = await User.findById(profileUserId);
//   if (!profileUser) return res.status(400).json({ message: "User not Found" });

//   const isAlreadyBookExist = user.bookCollection.some(
//     (id) => id.toString() === book._id.toString(),
//   );
//   if (isAlreadyBookExist)
//     return res.status(400).json({ message: "Book already exist" });

//   const requestSent = await BookRequest.findOne({
//     from: userId,
//     to: profileUserId,
//     bookId: bookId,
//     type: "borrow",
//   });
//   console.log("request sent", requestSent);
//   if (requestSent)
//     return res.status(400).json({ message: "Request Sent Already." });
//   const bookRequest = new BookRequest({
//     from: userId,
//     to: profileUserId,
//     bookId: bookId,
//     type: "borrow",
//   });
//   console.log("book request", bookRequest);
//   const notification = new Notification({
//     from: user._id,
//     to: profileUser._id,
//     message: `<b>${user.fullName}</b> Requested to Borrow the book ${book.title}
//                          by ${book.author} from you`,
//     type: "request",
//     book: bookId,
//   });
//   console.log("notification", notification);
//   await bookRequest.save();
//   console.log("book request saved");
//   await notification.save();
//   console.log("notification saved");
//   res.status(200).json({ message: "request to borrow book successful!!!" });
// };

// export const approveDeclineBorrowRequest = async (
//   req: Request,
//   res: Response,
// ) => {
//   const userId = req.user._id.toString();
//   const user = await User.findById(userId);
//   if (!user) return res.status(400).json({ message: "User not Found" });

//   const { action, notificationId } = req.body;
//   const notification = await Notification.findById(notificationId);
//   if (!notification)
//     return res.status(404).json({ message: "Notification not found" });

//   const { from: requestedUserId, book: bookId } = notification;
//   const requestedUser = await User.findById(requestedUserId);
//   if (!requestedUser)
//     return res.status(400).json({ message: "User not Found" });
//   const book = await Books.findById(bookId);
//   if (!book) return res.status(400).json({ message: "Book not Found" });

//   const request = await BookRequest.findOne({
//     from: requestedUserId,
//     to: userId,
//     bookId: bookId,
//     type: "borrow",
//   });
//   if (!request) return res.status(400).json({ message: "Request not Found" });

//   if (request.status !== "requested")
//     return res.status(400).json({ message: "Request status is not requested" });

//   if (action === "approved") {
//     const isAlreadyBookExist = requestedUser.bookCollection.some(
//       (id) => id.toString() === book._id.toString(),
//     );
//     if (isAlreadyBookExist) {
//       request.status = "declined";
//       await request.save();

//       const notificationToRequester = new Notification({
//         from: user._id,
//         to: requestedUser._id, //requester
//         message: `Your request to borrow the book ${book.title} from <b>${user.fullName}</b>
//                                    has been declined `,
//         bookId: bookId,
//         type: "action",
//       });
//       await notificationToRequester.save();

//       notification.message = `Request declined as the other user already has the book`;
//       notification.type = "action";
//       await notification.save();

//       return res
//         .status(200)
//         .json({ message: "request to borrow book declined!!!" });
//     } else {
//       request.status = "approved";
//       await request.save();

//       const borrowBook = new BorrowBooks({
//         borrowedFrom: user._id,
//         borrowedTo: requestedUser._id,
//         bookId: bookId,
//         borrowDate: new Date(),
//         status: "borrowed",
//       });
//       await borrowBook.save();

//       const notificationToRequester = new Notification({
//         from: user._id,
//         to: requestedUser._id,
//         message: `Your request to borrow the book ${book.title} from <b>${user.fullName}</b> has been approved`,
//         bookId: bookId,
//         type: "action",
//       });
//       await notificationToRequester.save();

//       notification.message = `Your approved the request from <b>${user.fullName}</b> to borrow the book ${book.title}  by ${book.author}`;
//       notification.type = "action";
//       await notification.save();

//       return res
//         .status(200)
//         .json({ message: "request to borrow book approved!!!" });
//     }
//   } else if (action === "declined") {
//     request.status = "declined";
//     await request.save();
//     const notificationToRequester = new Notification({
//       from: user._id,
//       to: requestedUser._id, //requester
//       message: `Your request to borrow the book ${book.title} from <b>${user.fullName}</b> has been declined`,
//       bookId: bookId,
//       type: "action",
//     });
//     await notificationToRequester.save();
//     notification.message = `Your declined the request from <b>${user.fullName}</b> to borrow
//                                        the book ${book.title}  by ${book.author}`;
//     notification.type = "action";
//     await notification.save();
//     return res
//       .status(200)
//       .json({ message: "request to borrow book declined!!!" });
//   } else {
//     return res.status(400).json({ message: "Invalid action!!!" });
//   }
// };

// export const returnBookRequest = async (req: Request, res: Response) => {
//   const userId = req.user._id.toString();
//   const user = await User.findById(userId);
//   if (!user) return res.status(400).json({ message: "User not Found" });

//   const bookId = req.params.bookId;
//   const book = await Books.findById(bookId);
//   if (!book) return res.status(400).json({ message: "Book not Found" });

//   const BorrowBookInfo = await BorrowBooks.findOne({
//     bookId: bookId,
//     status: "borrowed",
//     borrowedTo: userId,
//   });
//   if (!BorrowBookInfo)
//     return res.status(400).json({ message: "Borrowing details issue" });
//   const bookOwner = await User.findById(BorrowBookInfo.borrowedFrom);

//   if (!bookOwner) {
//     return res.status(404).json({
//       message: "Book owner not found",
//     });
//   }

//   const requestSent = await BookRequest.findOne({
//     from: userId,
//     to: bookOwner._id,
//     bookId: bookId,
//     type: "return",
//   });
//   console.log("return request sent", requestSent);
//   if (requestSent)
//     return res.status(400).json({ message: "Request Sent Already." });

//   const bookReturnRequest = new BookRequest({
//     from: userId,
//     to: bookOwner._id,
//     bookId: bookId,
//     type: "return",
//   });
//   console.log("book request", bookReturnRequest);
//   const notification = new Notification({
//     from: user._id,
//     to: bookOwner._id,
//     message: `<b>${user.fullName}</b> Requested to Return the book ${book.title}
//                          by ${book.author} to you`,
//     type: "request",
//     book: bookId,
//   });
//   console.log("notification", notification);
//   await bookReturnRequest.save();
//   await notification.save();
//   return res.status(200).json({ message: "Request to return book sent!!!" });
// };

// export const approveReturnRequest = async (req: Request, res: Response) => {
//   const userId = req.user._id.toString();
//   const user = await User.findById(userId);
//   if (!user) return res.status(400).json({ message: "User not Found" });

//   const { action, notificationId } = req.body;
//   const notification = await Notification.findById(notificationId);
//   if (!notification)
//     return res.status(404).json({ message: "Notification not found" });

//   const { from: borrowerId, book: bookId } = notification;
//   const borrower = await User.findById(borrowerId);
//   if (!borrower) return res.status(400).json({ message: "User not Found" });
//   const book = await Books.findById(bookId);
//   if (!book) return res.status(400).json({ message: "Book not Found" });

//   if (notification.type !== "request")
//     return res.status(400).json({ message: "Invalid Request Type" });

//   const request = await BookRequest.findOne({
//     from: borrower._id,
//     to: userId,
//     bookId: bookId,
//     type: "return",
//   });
//   if (!request) return res.status(400).json({ message: "Request not Found" });

//   if (action === "approved") {
//     request.status = "approved";
//     await request.save();

//     const notificationToBorrower = new Notification({
//       from: userId,
//       to: borrower._id,
//       message: `<b>${user.fullName}</b> has approved your request to return the book ${book.title} by ${book.author}`,
//       type: "action",
//       book: book._id,
//     });
//     await notificationToBorrower.save();

//     notification.message = `You accepted the request to return the book ${book.title} by ${book.author}
//                                        from ${user.fullName}.The book has been added to your book collection`;
//     notification.type = "action";
//     await notification.save();
//     return res.status(200).json({ message: "Returned the book" });
//   } else if (action === "declined") {
//     request.status = "declined";
//     await request.save();
//     notification.message = `You rejected the request to return the book ${book.title} by ${book.author}
//                                        from ${user.fullName}.`;
//     notification.type = "action";
//     await notification.save();

//     const notificationToBorrower = new Notification({
//       from: userId,
//       to: borrower._id,
//       message: `<b>${user.fullName}</b> has declined your request to return the book ${book.title} by ${book.author}`,
//       type: "action",
//       book: book._id,
//     });
//     await notificationToBorrower.save();
//     return res.status(200).json({ message: "Declined the request" });
//   }
// };

// export const approveDeclineBorrowBook = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     const { action, notificationId } = req.body;

//     if (!["approved", "declined"].includes(action)) {
//       return res.status(400).json({
//         message: "Invalid action",
//       });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const notification = await Notification.findById(notificationId);

//     if (!notification) {
//       return res.status(404).json({
//         message: "Notification not found",
//       });
//     }

//     const borrowerId = notification.from;
//     const bookId = notification.book;

//     if (!borrowerId || !bookId) {
//       return res.status(400).json({
//         message: "Borrower or book information missing",
//       });
//     }

//     const borrower = await User.findById(borrowerId);

//     if (!borrower) {
//       return res.status(404).json({
//         message: "Borrower not found",
//       });
//     }

//     const bookDetails = await Books.findById(bookId);

//     if (!bookDetails) {
//       return res.status(404).json({
//         message: "Book not found",
//       });
//     }

//     if (action === "approved") {
//       if (bookDetails.bookType === "lentBook") {
//         return res.status(400).json({
//           message: "Book is already lent out",
//         });
//       }

//       if (bookDetails.bookType === "borrowedBook") {
//         return res.status(400).json({
//           message: "Book is already borrowed",
//         });
//       }

//       const alreadyExists = borrower.bookCollection.some(
//         (id) => id.toString() === bookId.toString(),
//       );

//       if (alreadyExists) {
//         return res.status(400).json({
//           message: "Book already exists in borrower's collection",
//         });
//       }

//       const borrowedCopy = await Books.create({
//         title: bookDetails.title,
//         author: bookDetails.author,
//         genre: bookDetails.genre,
//         borrowedBookId: bookId,
//         borrowedBy: borrowerId,
//         bookAdded: new Date(),
//         publisher: bookDetails.publisher,
//         publicationDate: bookDetails.publicationDate,
//         pageCount: bookDetails.pageCount,
//         description: bookDetails.description,
//         bookType: "borrowedBook",
//       });

//       borrower.bookCollection.push(borrowedCopy._id);
//       await borrower.save();

//       bookDetails.bookType = "lentBook";
//       bookDetails.borrowedBy = borrowerId;
//       bookDetails.bookAdded = new Date();

//       await bookDetails.save();

//       notification.message = `Borrow request approved for "${bookDetails.title}"`;
//       notification.type = "action";

//       await notification.save();

//       await Notification.create({
//         from: user._id,
//         to: borrower._id,
//         message: `Your request to borrow "${bookDetails.title}" has been approved by ${user.fullName}`,
//         type: "action",
//         book: bookId,
//       });

//       return res.status(200).json({
//         message: "Borrow request approved",
//       });
//     }

//     // Declined

//     notification.message = `Borrow request declined for "${bookDetails.title}"`;
//     notification.type = "action";

//     await notification.save();

//     await Notification.create({
//       from: user._id,
//       to: borrower._id,
//       message: `Your request to borrow "${bookDetails.title}" has been declined by ${user.fullName}`,
//       type: "action",
//       book: bookId,
//     });

//     return res.status(200).json({
//       message: "Borrow request declined",
//     });
//   } catch (error) {
//     console.error("approveDeclineBorrowBook:", error);

//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };
