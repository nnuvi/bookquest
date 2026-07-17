import React from "react";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          paddingTop: 6,
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarActiveTintColor: Colors.selection,
        tabBarInactiveTintColor: Colors.background,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12.5,
          fontWeight: "600",
        },
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="Homepage"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Octicons name="search" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="line-scan" size={24} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="Request"
        options={{
          title: "Request",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-multiple"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          title: "Notification",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="MyProfile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="circle-user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
