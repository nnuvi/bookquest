import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyFriendList,
  getMyProfile,
  getSearchUsers,
  getUserProfile,
  updateProfileImage,
} from "@/services/user.service";
import { useFeedback } from "./useFeedbackModal";
import { getErrorMessage } from "@/lib/app";

export const userKeys = {
  all: ["users"] as const,

  me: () => [...userKeys.all, "me"] as const,

  friends: () => [...userKeys.all, "friends"] as const,

  profile: (userId: string) => [...userKeys.all, "profile", userId] as const,

  search: (query: string) => [...userKeys.all, "search", query] as const,
};

export const useMyProfile = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMyProfile,
  });
};

export const useFriendList = () => {
  return useQuery({
    queryKey: userKeys.friends(),
    queryFn: getMyFriendList,
  });
};

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });
};

export const useSearchUsers = (search: string) => {
  return useQuery({
    queryKey: userKeys.search(search),
    queryFn: () => getSearchUsers(search),
    enabled: search.trim().length >= 2,
    staleTime: 0,
    gcTime: 60 * 1000,
    retry: false,
  });
};

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: updateProfileImage,

    onSuccess(updatedUser) {
      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
      queryClient.setQueryData(userKeys.me(), updatedUser);

      queryClient.invalidateQueries({
        queryKey: userKeys.profile(updatedUser._id),
      });
      success("Profile Image has been updated.");
    },
    onError: (err: any) => {
      error(err);
    },
  });
}
