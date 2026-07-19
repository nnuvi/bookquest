import { api } from "@/lib/api";
import { LoginInput, SignupInput } from "@/schema/auth.schema";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export const getUser = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>("/api/auth/me");
  return data.data;
};

export async function login(data: LoginInput) {
  return api.post<ApiResponse<LoginInput>>("/api/auth/login", data);
}

export async function signup(data: SignupInput) {
  return api.post<ApiResponse<SignupInput>>("/api/auth/signup", data);
}

export async function logout() {
  return api.post<ApiResponse<void>>("/api/auth/logout");
}
