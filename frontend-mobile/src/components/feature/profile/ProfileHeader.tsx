import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import AppText from "@/components/common/AppText";
import { User } from "@/types/user";
import { router } from "expo-router";

type ProfileHeaderProps = {
  user: User;
  bookNo: number;
};

export const ProfileHeader = ({ user, bookNo }: ProfileHeaderProps) => {
  return (
    <>
      <View className="bg-primary flex-row justify-between p-2 px-4">
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="return-up-back" size={28} color="white" />
        </TouchableOpacity>

        <Text className="font-bold text-text-dark text-2xl">
          @{user?.username}
        </Text>

        <TouchableOpacity>
          <Ionicons name="chatbubbles-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View className="justify-between p-2 px-8">
        {/* Profile Section */}
        {/* Image */}
        <View className="flex-row items-center w-full">
          <View className="mt-2 bg-gray rounded-full overflow-hidden mb-2">
            <Image
              source={{ uri: "https://example.com/profile-pic.jpg" }}
              className="w-24 h-24"
            />
          </View>
          {/** Book and Friends */}
          <View className="flex-row justify-end w-[70%] mt-2 mr-2">
            <View className="items-center justify-center mx-2 py-2 px-5">
              <AppText className="text-lg font-bold text-text-light">
                {bookNo}
              </AppText>
              <AppText className="text-lg text-text-light">Books</AppText>
            </View>

            <TouchableOpacity className="items-center justify-center mx-2 py-2 px-5" onPress={() => router.push("/profile/FriendList")}>
              <AppText className="text-lg font-bold text-text-light">
                {user?.friends?.length ?? 0}
              </AppText>

              <AppText
                className="text-lg text-text-light"
                // onPress={() => router.push("../friends/MyFriendlist")}
              >
                Friends
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Edit Button */}
        <View className="flex-row justify-between">
          {/* Profile Details */}
          <View className="pb-4 w-[70%]">
            <AppText className="text-xl font-bold text-primary">
              {user?.fullName}
            </AppText>

            <AppText className="text-base text-primary">
              @{user?.username}
            </AppText>

            <AppText className="text-sm text-primary">{user?.bio}</AppText>
          </View>
          {/* Edit Button */}
          <View className="justify-end pb-2 px-2">
          <TouchableOpacity
            className="h-8 py-1.5 px-6 items-center bg-primary rounded-full"
            onPress={() => router.push("/profile/EditProfile")}
          >
            <AppText className="font-bold text-background">Edit</AppText>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
