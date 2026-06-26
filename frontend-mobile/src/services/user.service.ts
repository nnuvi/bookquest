import {api }from "@/lib/api";

export const getMyProfile = async () => {
  const { data } = await api.get("/user/me");
  return data;
};