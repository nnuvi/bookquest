import { FlatList } from "react-native";

import UserCard from "./UserCard";
import { User } from "@/types/user";

type UserListProps = {
  users: User[];
  refreshing?: boolean;
  onRefresh?: () => void;
  renderAction?: (user: User) => React.ReactNode;
};

export default function UserList({
  users,
  refreshing = false,
  onRefresh,
  renderAction,
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
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
