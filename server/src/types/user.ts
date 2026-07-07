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
  }