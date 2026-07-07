import { FlatList, StyleProp, ViewStyle } from "react-native";

import UserCard from "./UserCard";
import { User } from "@/types/user";
import AppText from "@/components/ui/AppText";
import { ReactElement } from "react";

type UserListProps = {
  users: User[];
  refreshing?: boolean;
  onRefresh?: () => void;
  actionButton?: "bottom" | "right";
  renderAction?: (user: User) => React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  listEmptyComponent?: ReactElement;
};

export default function UserList({
  users,
  refreshing = false,
  onRefresh,
  actionButton,
  renderAction,
  contentContainerStyle,
  listEmptyComponent,
}: UserListProps) {
  return (
    <FlatList
      data={users}
      style={{ flex: 1 }}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          action={renderAction?.(item)}
          actionButton={actionButton}
        />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{
        paddingBottom: 20,
        ...contentContainerStyle,
      }}
      ListEmptyComponent={
        listEmptyComponent ?? (
          <AppText className="text-center mt-5">No users found.</AppText>
        )
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
