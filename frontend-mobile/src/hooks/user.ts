import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/services/user.service";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });
};