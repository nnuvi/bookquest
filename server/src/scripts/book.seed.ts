// import Book from "../model/Book.model.js";
// import UserBook from "../model/UserBook.model.js";

// import BorrowRequest from "../model/BorrowRequest.model.js";


// export async function createBooks(users: any[]) {
//   for (const user of users) {
//     const first = await Book.create({
//       title: `${user.fullName}'s Book One`,
//       authors: ["Unknown"],
//       language: "English",
//     });

//     const second = await Book.create({
//       title: `${user.fullName}'s Book Two`,
//       authors: ["Unknown"],
//       language: "English",
//     });

//     await UserBook.create({
//       owner: user._id,
//       book: first._id,
//       availability: "available",
//       condition: "good",
//     });

//     await UserBook.create({
//       owner: user._id,
//       book: second._id,
//       availability: "available",
//       condition: "good",
//     });
//   }
// }

// export async function createBorrowRequests(
//   users: any[],
//   user_1: string,
//   user_2: string
// ) {
//   const user_1Books = await UserBook.find({
//     owner: user_1,
//     availability: "available",
//   }).limit(3);

//   const user_2Books = await UserBook.find({
//     owner: user_2,
//     availability: "available",
//   }).limit(3);

//   const requests = [];

//   users.forEach((user, i) => {
//     if (user_1Books[i]) {
//       requests.push({
//         requester: user._id,
//         owner: user_1,
//         userBook: user_1Books[i]._id,
//         status: "pending",
//         message: "May I borrow this book?",
//       });
//     }

//     if (user_2Books[i]) {
//       requests.push({
//         requester: user._id,
//         owner: user_2,
//         userBook: user_2Books[i]._id,
//         status: "pending",
//         message: "I'd like to borrow this book.",
//       });
//     }
//   });

//   await BorrowRequest.insertMany(requests);
// }