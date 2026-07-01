import { useQuery } from "@tanstack/react-query";
import {
  getMyFriendList,
  getMyProfile,
  getSearchUsers,
  getUserProfile,
  // getUsers,
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
    enabled: !!userId,
  });
};

export const useSearchUsers = (search: string) => {
  return useQuery({
    queryKey: ["searchUsers", search],
    queryFn: () => getSearchUsers(search),
    enabled: search.trim().length >= 2,
    staleTime: 0,
    gcTime: 60 * 1000,
    retry: false,
  });
};
