import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { User } from "@/types/user";
import { router } from "expo-router";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import AppModal from "@/components/ui/AppModal";
import Avatar from "@/components/ui/Avatar";
import userPlaceHolder from "@assets/images/placeholder-user.png";
import { ReactNode, useState } from "react";
import AvatarPicker from "../user/AvatarPicker";
import { Colors } from "@/constants/Colors";
import { useLogout } from "@/hooks/auth";

type ProfileHeaderProps = {
  user: User;
  bookNo: number;
  currentUser?: boolean;
  action?: ReactNode;
};

export const ProfileHeader = ({
  user,
  bookNo,
  currentUser = true,
  action,
}: ProfileHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const logoutMutation = useLogout();

  return (
    <View>
      {/** Top Header */}
      <View className="bg-primary items-center flex-row justify-between p-3 px-4 relative">
        <View className="flex-1 items-start pl-3">
          {currentUser && (
            <TouchableOpacity>
              {/* <Ionicons name="return-up-back" size={25} color="white" /> */}
              <SimpleLineIcons
                name="settings"
                size={25}
                color={Colors.background}
              />
            </TouchableOpacity>
          )}
        </View>

        <AppText weight="bold" size="2xl" color="light" className="text-center">
          @{user?.username}
        </AppText>

        <View className="flex-1 items-end pr-4">
          {currentUser && (
            // <TouchableOpacity onPress={() => router.push(`request/Requests`)}>
            //   {/* <Ionicons name="chatbubbles-outline" size={28} color="white" /> */}
            //   <MaterialCommunityIcons
            //     name="book-multiple-outline"
            //     size={28}
            //     color={Colors.background}
            //   />
            // </TouchableOpacity>
            <TouchableOpacity onPress={() => logoutMutation.mutate()}>
              {/* <Ionicons name="return-up-back" size={28} color="white" /> */}
              {/* <SimpleLineIcons
                name="settings"
                size={25}
                color={Colors.background}
              /> */}
              <MaterialCommunityIcons
                name="logout"
                size={26}
                color={Colors.background}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="justify-between p-2 px-8">
        <View className="flex-row items-center w-full">
          {/* Image */}
          <View className="mt-2 bg-gray rounded-full overflow-hidden mb-2">
            {currentUser ? (
              <AvatarPicker
                image={user.profileImage.url}
                placeholder={userPlaceHolder}
              />
            ) : (
              <Avatar image={user.profileImage.url} />
            )}
          </View>
          {/** Book and Friends */}
          <View className="flex-row justify-end w-[70%] mt-2 mr-2">
            <View className="items-center justify-center mx-2 py-2 px-5">
              <AppText size="lg" weight="bold">
                {bookNo}
              </AppText>
              <AppText size="lg" weight="semibold">
                Books
              </AppText>
            </View>
            <TouchableOpacity
              className="items-center justify-center mx-2 py-2 px-5"
              onPress={
                currentUser
                  ? () => router.push("/profile/FriendList")
                  : () => {}
              }
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

            <AppText size="lg">@{user?.username}</AppText>

            <AppText size="lg">{user?.bio}</AppText>
          </View>
          {/* Edit Button */}
          {/* {currentUser && (
            <View className="justify-end pb-2 px-6">
              <Button
                title={"Edit"}
                buttonSize="base"
                // onPress={() => router.push("/profile/EditProfile")}
                onPress={() => setVisible(true)}
              />
            </View>
          )} */}
          {visible && (
            <AppModal
              visible={visible}
              onClose={() => setVisible(false)}
              title={<Text className="text-xl font-bold">Delete Book</Text>}
              actions={
                <View className="flex-row justify-end gap-3">
                  <Button title="Cancel" />
                  <Button title="Delete" />
                </View>
              }
            >
              <Text>Are you sure you want to delete this book?</Text>
            </AppModal>
          )}
        </View>
        {action && <View>{action}</View>}
      </View>
    </View>
  );
};
