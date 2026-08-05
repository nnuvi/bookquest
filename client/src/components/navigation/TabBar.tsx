import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import { Tabs } from "expo-router";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Colors } from "@/constants/Colors";
import AppText from "../ui/AppText";

type TabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0] & {
  showLabels?: boolean;
};

export default function TabBar({
  state,
  descriptors,
  navigation,
  insets,
  showLabels = true,
}: TabBarProps) {
  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom + 16,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const options = descriptors[route.key].options;

        return (
          <Pressable
            key={route.key}
            style={[styles.item, focused && styles.activeContainer]}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {renderIcon(route.name, focused)}

            {showLabels && (
              <AppText
                numberOfLines={1}
                style={[styles.label, focused && styles.activeLabel]}
              >
                {descriptors[route.key].options.title ?? route.name}
              </AppText>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

function renderIcon(routeName: string, focused: boolean) {
  const color = focused ? Colors.primary : Colors.textMuted;

  switch (routeName) {
    case "Homepage":
      return (
        <MaterialCommunityIcons name="bookshelf" size={21} color={color} />
      );

    case "Search":
      return <Octicons name="search" size={21} color={color} />;

    case "Request":
      return (
        <MaterialCommunityIcons name="book-multiple" size={21} color={color} />
      );

    case "Notifications":
      return <MaterialIcons name="notifications" size={21} color={color} />;

    case "MyProfile":
      return <FontAwesome6 name="circle-user" size={21} color={color} />;

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 16,
    right: 16,

    height: 55,

    borderRadius: 36,

    backgroundColor: Colors.background,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",

    padding: 4,

    shadowColor: Colors.borderDark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 24,

    elevation: 10,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  item: {
    flex: 1,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 999,
  },

  activeContainer: {
    backgroundColor: Colors.input,
  },

  label: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.textMuted,
  },

  activeLabel: {
    color: Colors.primary,
  },
});
