import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

import FriendRequest from "../model/FriendRequest.model.js";

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
      username: "dazai",
      fullName: "Osamu Dazai",
      email: "dazai@mail.com",
      password,
      bio: "Novel writer",
    },
    {
      username: "kate",
      fullName: "Kate Emilyko",
      email: "kate@mail.com",
      password,
      bio: "Fantasy reader",
    },
    {
      username: "senku",
      fullName: "Senku Ishigami",
      email: "senku@mail.com",
      password,
      bio: "Science enthusiast",
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
