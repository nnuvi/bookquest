import AppText from "@/components/common/AppText";
import { View } from "react-native";

type MetadataItem = {
  label: string;
  value?: string | number | null;
};

type BookMetadataProps = {
  items: MetadataItem[];
};

export default function BookMetadata({ items }: BookMetadataProps) {
  return (
    <View className="flex-col bg-card-bg rounded-xl p-4 mt-4 shadow">
      {items.map(({ label, value }) => (
        <View key={label} className="flex-row py-2">
          <AppText className="w-24 font-medium">
            {label}
          </AppText>

          <AppText
            className="flex-1"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {value || "N/A"}
          </AppText>
        </View>
      ))}
    </View>
  );
}