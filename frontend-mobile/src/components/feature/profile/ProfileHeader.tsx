import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { User } from "@/types/user";
import { router } from "expo-router";
import Button from "@/components/ui/Button";

import userPlaceHolder from "@assets/images/placeholder-user.png";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";

type ProfileHeaderProps = {
  user: User;
  bookNo: number;
  currentUser?: boolean;
};

export const ProfileHeader = ({
  user,
  bookNo,
  currentUser = true,
}: ProfileHeaderProps) => {
  return (
    <View>
      {/** Top Header */}
      <View className="bg-primary items-center flex-row justify-between p-3 px-4 relative">
        <View className="flex-1 pl-4">
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="return-up-back" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <AppText weight="bold" size="2xl" color="light" className="text-center">
          @{user?.username}
        </AppText>

        <View className="flex-1 items-end pr-4">
          {currentUser && (
            <TouchableOpacity>
              <Ionicons name="chatbubbles-outline" size={28} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Profile Section */}
      {/* {!user ? (
        <ProfileSkeleton />
      ) : ( */}
      <View className="justify-between p-2 px-8">
        <View className="flex-row items-center w-full">
          {/* Image */}
          <View className="mt-2 bg-gray rounded-full overflow-hidden mb-2">
            <Image
              source={
                user.profieImage ? { uri: user.profieImage } : userPlaceHolder
              }
              className="w-24 h-24"
            />
          </View>
          {/** Book and Friends */}
          <View className="flex-row justify-end w-[70%] mt-2 mr-2">
            <View className="items-center justify-center mx-2 py-2 px-5">
              <AppText size="lg" weight="bold">{bookNo}</AppText>
              <AppText size="lg" weight="semibold">Books</AppText>
            </View>

            <TouchableOpacity
              className="items-center justify-center mx-2 py-2 px-5"
              onPress={() => router.push("/profile/FriendList")}
            >
              <AppText size="lg" weight="bold">
                {user?.friends?.length ?? 0}
              </AppText>

              <AppText
                size="lg"
                weight="semibold"
                // onPress={() => router.push("../friends/MyFriendlist")}
              >
                Friends
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between">
          {/* Profile Details */}
          <View className="pb-4 w-[70%]">
            <AppText size="2xl" weight="bold">
              {user?.fullName}
            </AppText>

            <AppText size="lg">
              @{user?.username}
            </AppText>

            <AppText size="lg">{user?.bio}</AppText>
          </View>
          {/* Edit Button */}
          {currentUser && (
            <View className="justify-end pb-2 px-2">
              <Button
                title={"Edit"}
                size="sm"
                onPress={() => router.push("/profile/EditProfile")}
              />
            </View>
          )}
        </View>
      </View>
      {/* )} */}
    </View>
  );
};
