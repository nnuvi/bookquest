import { Types } from "mongoose";

export interface Authtoken {
  userID: string;
}

export interface ReqUser {
  _id: string;
  username: string;
  email: string;
}

export type FriendStatus =
  | "self"
  | "friend"
  | "request_sent"
  | "request_received"
  | "none";

export type FriendStatusDetails = {
  status: FriendStatus;
  requestId?: string;
};

export type UserDtoInput = {
  _id: Types.ObjectId;
  username: string;
  fullName: string;
  email: string;
  bio: string;
  role: "admin" | "user";
  profileImage?: {
    url: string;
    publicId: string;
  } | null;
  friends: Types.ObjectId[];
};

export function mapUser(user: UserDtoInput) {
  return {
    _id: user._id.toString(),
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    bio: user.bio,
    role: user.role,
    profileImage: user.profileImage?.url ?? "",
    friends: user.friends.map(String),
  };
}

export function mapUsers(users: UserDtoInput[]) {
  return users.map(mapUser);
}