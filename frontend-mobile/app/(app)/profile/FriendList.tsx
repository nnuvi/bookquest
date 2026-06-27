import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
// import { useUser } from "./getMe";
import { api } from "@/lib/api";
import { Colors } from "@/constants/Colors";
import { useFriendList } from "@/hooks/user";
import UserList from "@/components/feature/user/UserList";
import AppText from "@/components/common/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderTitle } from "@/components/common/HeaderTitle";

type Friends = {
  _id: string;
  fullName: string;
  username: string;
  bio: string;
};

export default function FriendListScreen() {
  //const { userId } = useUser();
  const { data: friendList = [] } = useFriendList();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderTitle text={"Friends"} />
      <UserList
        users={friendList}
        renderAction={(user) => (
          <TouchableOpacity className="bg-red-500 px-3 py-2 rounded-lg">
            <AppText className="text-white">Unfriend</AppText>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
