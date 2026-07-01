export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type User = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  friends: User[];
  profileImage: string;
  bio: string;
};
