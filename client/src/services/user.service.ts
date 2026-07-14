import { api } from "@/lib/api";
import { LOG_SCOPE, logger } from "@/lib/logger";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user"; // adjust to your types
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export const getMyProfile = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>("/api/user/me");
  logger.debug(LOG_SCOPE.request, "MY DATA: ", { data });
  return data.data;
};

export const getMyFriendList = async (): Promise<User[]> => {
  const { data } = await api.get<ApiResponse<User[]>>("/api/user/friends");
  return data.data;
};

export const getUserProfile = async (id: string): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>(`/api/user/profile/${id}`);
  logger.debug(LOG_SCOPE.request, "User DATA: ", { data });
  return data.data;
};

export const getSearchUsers = async (search?: string): Promise<User[]> => {
  const { data } = await api.get<ApiResponse<User[]>>("/api/user/search", {
    params: {
      query: search,
    },
  });

  return data.data;
};

export async function updateProfileImage(image: ImagePicker.ImagePickerAsset) {
  const formData = new FormData();

  if (Platform.OS === "web") {
    if (!image.file) {
      throw new Error("No file selected.");
    }

    formData.append("image", image.file);
  } else {
    formData.append("image", {
      uri: image.uri,
      name: image.fileName ?? "profile.jpg",
      type: image.mimeType ?? "image/jpeg",
    } as any);
  }

  // formData.append("image", {
  //   uri,
  //   name: "profile.jpg",
  //   type: "image/jpeg",
  // } as any);

  const { data } = await api.patch(
    "/api/user/me/profile-image",
    formData,
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );

  return data.data;
}
