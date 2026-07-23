import { View } from "react-native";
import AppText from "./AppText";

type MetadataItem = {
  label: string;
  value?: React.ReactNode;
};

type Props = {
  items: MetadataItem[];
};

export default function DetailsList({ items }: Props) {
  return (
    <View className="mt-4 rounded-xl bg-background px-4 py-2 shadow">
      {items.map(({ label, value }) => (
        <View
          key={label}
          className="flex-row items-start py-2"
        >
          <AppText className="w-28" weight="medium">{label}</AppText>

          <View className="flex-1">
            {typeof value === "string" || typeof value === "number" ? (
              <AppText>{value}</AppText>
            ) : (
              (value ?? <AppText>N/A</AppText>)
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
