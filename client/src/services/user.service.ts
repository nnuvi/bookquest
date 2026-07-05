import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user"; // adjust to your types

export const getMyProfile = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>("/api/user/me");
  return data.data;
};

export const getMyFriendList = async (): Promise<User[]> => {
  const { data } = await api.get<ApiResponse<User[]>>("/api/user/friends");
  return data.data;
};

export const getUserProfile = async (id: string): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>(`/api/user/profile/${id}`);
  return data.data;
};

export const getSearchUsers = async (search?: string): Promise<User[]> => {
  const { data } = await api.get<ApiResponse<User[]>>("/api/user/search", {
    params: {
      query: search,
    },
  });

  return data.data;
};
