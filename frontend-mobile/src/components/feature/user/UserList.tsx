import { FlatList, StyleProp, ViewStyle } from "react-native";

import UserCard from "./UserCard";
import { User } from "@/types/user";
import AppText from "@/components/ui/AppText";
import { ReactElement } from "react";

type UserListProps = {
  users: User[];
  refreshing?: boolean;
  onRefresh?: () => void;
  renderAction?: (user: User) => React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  listEmptyComponent?: ReactElement;
};

export default function UserList({
  users,
  refreshing = false,
  onRefresh,
  renderAction,
  contentContainerStyle,
  listEmptyComponent,
}: UserListProps) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <UserCard user={item} action={renderAction?.(item)} />
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
