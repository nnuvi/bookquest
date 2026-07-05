import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/notification.service";

export const useNotification = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};