import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

import FriendRequest from "../model/FriendRequest.model.js";

import mongoose from "mongoose";
import BorrowRecord from "../model/BorrowRecord.model.js";
import UserBook from "../model/UserBook.model.js";
import Notification from "../model/Notification.model.js";
import BorrowRequest from "../model/BorrowRequest.model.js";

import ApiError from "../lib/apiError.js";

export async function getUserIdsByUsername(
  usernames: string[],
): Promise<string[]> {
  const users = await User.find({
    username: { $in: usernames },
  }).select("_id username");

  const userMap = new Map(
    users.map((user) => [user.username, user._id.toString()]),
  );

  const missing = usernames.filter((username) => !userMap.has(username));

  if (missing.length > 0) {
    throw new Error(`Users not found: ${missing.join(", ")}`);
  }

  return usernames.map((username) => userMap.get(username)!);
}

export async function createUsers() {
  const password = await bcrypt.hash("password123", 10);

  const users = [
    {
      username: "boyd",
      fullName: "Boyd Stevens",
      email: "boyd@mail.com",
      password,
      bio: "Town sheriff and protector.",
    },
    {
      username: "tabitha",
      fullName: "Tabitha Matthews",
      email: "tabitha@mail.com",
      password,
      bio: "Determined to uncover the town's secrets.",
    },
    {
      username: "jim",
      fullName: "Jim Matthews",
      email: "jim@mail.com",
      password,
      bio: "Engineer searching for answers.",
    },
    {
      username: "julie",
      fullName: "Julie Matthews",
      email: "julie@mail.com",
      password,
      bio: "Trying to adapt to the mysterious town.",
    },
    {
      username: "ethan",
      fullName: "Ethan Matthews",
      email: "ethan@mail.com",
      password,
      bio: "A curious young boy with vivid imagination.",
    },
    {
      username: "victor",
      fullName: "Victor",
      email: "victor@mail.com",
      password,
      bio: "Longtime resident who knows more than he says.",
    },
    {
      username: "donna",
      fullName: "Donna Raines",
      email: "donna@mail.com",
      password,
      bio: "Leader of Colony House.",
    },
    {
      username: "jade",
      fullName: "Jade Herrera",
      email: "jade@mail.com",
      password,
      bio: "Brilliant but skeptical tech entrepreneur.",
    },
    {
      username: "kenny",
      fullName: "Kenny Liu",
      email: "kenny@mail.com",
      password,
      bio: "Deputy sheriff with a strong sense of duty.",
    },
    {
      username: "kristi",
      fullName: "Kristi Miller",
      email: "kristi@mail.com",
      password,
      bio: "Town medic helping everyone survive.",
    },
    {
      username: "mari",
      fullName: "Marielle",
      email: "mari@mail.com",
      password,
      bio: "Paramedic dealing with her past.",
    },
    {
      username: "ellis",
      fullName: "Ellis Stevens",
      email: "ellis@mail.com",
      password,
      bio: "Boyd's son and an artist.",
    },
    {
      username: "fatima",
      fullName: "Fatima Hassan",
      email: "fatima@mail.com",
      password,
      bio: "Optimistic resident of Colony House.",
    },
    {
      username: "sara",
      fullName: "Sara Myers",
      email: "sara@mail.com",
      password,
      bio: "Haunted by mysterious voices.",
    },
    {
      username: "tianchen",
      fullName: "Tian-Chen Liu",
      email: "tianchen@mail.com",
      password,
      bio: "Kind-hearted diner owner.",
    },
    {
      username: "bakta",
      fullName: "Bakta",
      email: "bakta@mail.com",
      password,
      bio: "Bus driver stranded in town.",
    },
    {
      username: "randall",
      fullName: "Randall Kirkland",
      email: "randall@mail.com",
      password,
      bio: "Hot-headed newcomer.",
    },
    {
      username: "elgin",
      fullName: "Elgin",
      email: "elgin@mail.com",
      password,
      bio: "New arrival with strange dreams.",
    },
    {
      username: "tillie",
      fullName: "Tillie",
      email: "tillie@mail.com",
      password,
      bio: "Cheerful elderly resident with secrets.",
    },
    {
      username: "acosta",
      fullName: "Dani Acosta",
      email: "acosta@mail.com",
      password,
      bio: "Police officer caught in the town.",
    },
  ];

  await User.deleteMany({
    email: {
      $in: users.map((u) => u.email),
    },
  });

  return User.insertMany(users);
}

export async function connectFriends(
  users: any[],
  user_1: string,
  user_2: string,
) {
  await Promise.all(
    users.map((user) =>
      User.findByIdAndUpdate(user._id, {
        $addToSet: {
          friends: {
            $each: [user_1, user_2],
          },
        },
      }),
    ),
  );

  await User.findByIdAndUpdate(user_1, {
    $addToSet: {
      friends: {
        $each: users.map((u) => u._id),
      },
    },
  });

  await User.findByIdAndUpdate(user_2, {
    $addToSet: {
      friends: {
        $each: users.map((u) => u._id),
      },
    },
  });
}

export async function createFriendRequests(
  users: any[],
  user_1: string,
  user_2: string,
) {
  await FriendRequest.deleteMany({
    $or: [{ to: user_1 }, { to: user_2 }],
  });

  const requests = [];

  for (const user of users) {
    requests.push({
      from: user._id,
      to: user_1,
      status: "pending",
    });

    requests.push({
      from: user._id,
      to: user_2,
      status: "pending",
    });
  }

  await FriendRequest.insertMany(requests);
}

export async function createFriendRequestsIds(
  ids: any[],
  user_1: string,
  user_2: string,
) {
  await FriendRequest.deleteMany({
    $or: [{ to: user_1 }, { to: user_2 }],
  });

  const requests = [];

  for (const id of ids) {
    requests.push({
      from: id,
      to: user_1,
      status: "pending",
    });

    requests.push({
      from: id,
      to: user_2,
      status: "pending",
    });
  }

  await FriendRequest.insertMany(requests);
}

export async function removeFriendsAll(ids: string[]) {
  // const ids = [
  //   "6a4903afaae5d8824e7084b8", // sara
  //   "6a4903afaae5d8824e7084b9", // sophia
  //   "6a4903afaae5d8824e7084ba", // meii
  //   "6a492174c64392565dbfeda3", // dazai
  //   "6a492174c64392565dbfeda4", // kate
  //   "6a492174c64392565dbfeda5", // senku
  // ];

  // 1. Clear their own friends arrays
  await User.updateMany({ _id: { $in: ids } }, { $set: { friends: [] } });

  // 2. Remove them from everyone else's friends arrays
  await User.updateMany(
    {},
    {
      $pull: {
        friends: {
          $in: ids,
        },
      },
    },
  );
}

// user.service.t

export async function deleteUserAndData(username: string) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ username }).session(session);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const userId = user._id;

    // Remove user from everyone's friend list
    await User.updateMany(
      {},
      {
        $pull: {
          friends: userId,
        },
      },
      { session },
    );

    // Delete friend requests
    await FriendRequest.deleteMany(
      {
        $or: [{ from: userId }, { to: userId }],
      },
      { session },
    );

    // Delete borrow requests
    await BorrowRequest.deleteMany(
      {
        $or: [{ borrower: userId }, { owner: userId }],
      },
      { session },
    );

    // Delete borrow records
    await BorrowRecord.deleteMany(
      {
        $or: [{ borrower: userId }, { owner: userId }],
      },
      { session },
    );

    // Delete notifications
    await Notification.deleteMany(
      {
        $or: [{ receiver: userId }, { actor: userId }],
      },
      { session },
    );

    // Delete user's books
    await UserBook.deleteMany({ owner: userId }, { session });

    // Delete the user
    await User.deleteOne({ _id: userId }, { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
