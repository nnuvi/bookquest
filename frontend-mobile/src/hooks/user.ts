import { useQuery } from "@tanstack/react-query";
import {
  getMyFriendList,
  getMyProfile,
  getUserProfile,
  getUsers,
} from "@/services/user.service";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  });
};

export const useFriendList = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: getMyFriendList,
  });
};

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
  });
};

export const useUsers = (search?: string) => {
  return useQuery({
    queryKey: ["books", search],
    queryFn: () => getUsers(search),
  });
};
