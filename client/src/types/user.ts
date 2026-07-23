export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type ProfileImage = {
  url: string;
};

export type UserPreview = {
  _id: string;
  fullName: string;
  username: string;
  profileImage: ProfileImage;
};

export type User = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  friends: User[];
  profileImage: ProfileImage;
  bio: string;
};

export type FriendRequestStatus = "pending" | "accepted" | "declined";

export type FriendRequestAction = "accepted" | "declined";

export interface FriendRequest {
  _id: string;

  from: User;
  to: User;

  status: FriendRequestStatus;

  sentTime: string;

  createdAt: string;
  updatedAt: string;
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
