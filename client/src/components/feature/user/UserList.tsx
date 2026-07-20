import { FlatList, StyleProp, View, ViewStyle } from "react-native";

import UserCard from "./UserCard";
import { User } from "@/types/user";
import AppText from "@/components/ui/AppText";
import { ReactElement } from "react";
import { router } from "expo-router";
import { useAuthUser } from "@/hooks/auth";
import { LOG_SCOPE, logger } from "@/lib/logger";

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
  const { data: currentUser } = useAuthUser();
  logger.debug(LOG_SCOPE.router, "user current: ", { id: currentUser?._id });
  return (
    <FlatList
      data={users}
      style={{ flex: 1 }}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          currentUserId={currentUser?._id}
          action={renderAction?.(item)}
          actionButton={actionButton}
        />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{
        padding: 12,
        paddingBottom: 20,
        paddingVertical: 12,
        marginBottom: 12,
        ...contentContainerStyle,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
