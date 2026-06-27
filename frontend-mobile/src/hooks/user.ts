import { useQuery } from "@tanstack/react-query";
import { getMFriendList, getMyProfile } from "@/services/user.service";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });
};

export const useFriendList = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: getMFriendList,
  });
};