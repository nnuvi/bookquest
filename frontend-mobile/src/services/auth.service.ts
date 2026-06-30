import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export const getUser = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>("/api/auth/me");
  return data.data;
};