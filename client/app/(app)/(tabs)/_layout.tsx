import React from "react";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";
import TabBar from "@/components/navigation/TabBar";

export default function HomeLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Homepage" options={{ title: "Home" }} />

      <Tabs.Screen name="Search" options={{ title: "Search" }} />

      <Tabs.Screen name="Request" options={{ title: "Request" }} />

      <Tabs.Screen name="Notifications" options={{ title: "Notification" }} />

      <Tabs.Screen name="MyProfile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
