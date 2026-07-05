import { View, Text } from "react-native";

interface NotificationBadgeProps {
  count: number;
}

const NotificationBadge = ({ count }: NotificationBadgeProps) => {
  if (count <= 0) return null;

  return (
    <View className="min-w-6 h-6 px-1 rounded-full bg-primary items-center justify-center">
      <Text className="text-white text-xs font-bold">
        {count > 99 ? "99+" : count}
      </Text>
    </View>
  );
};

export default NotificationBadge;