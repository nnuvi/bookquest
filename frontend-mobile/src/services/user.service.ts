import { api } from "@/lib/api";

export const getMyProfile = async () => {
  const { data } = await api.get("/user/me");
  return data;
};

export const getMFriendList = async () => {
  const { data } = await api.get("/user/friends");
  return data;
};

export const getUserProfile = async (id: string) => {
  const { data } = await api.get(`/user/profile/${id}`);
  return data;
};

export const getUsers = async (search?: string) => {
  const { data } = await api.get(`/user`, {
    params: {
      search,
    },
  });
  return data;
};
