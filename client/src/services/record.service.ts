import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { BorrowRecord } from "@/types/return";

export const getBorrowRecord = async (userBookId: string) => {
  const { data } = await api.get<ApiResponse<BorrowRecord>>(
    `/api/record/${userBookId}`,
  );

  // logger.debug(LOG_SCOPE.request, "Borrow request cancelled:", {
  //   requestId,
  // });

  return data.data;
};
