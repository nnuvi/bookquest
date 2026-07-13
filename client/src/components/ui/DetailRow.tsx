import { View } from "react-native";

import AppText from "./AppText";

type Props = {
  label: string;
  value?: React.ReactNode;
};

export default function DetailRow({
  label,
  value,
}: Props) {
  return (
    <View className="flex-row justify-between py-2">
      <AppText className="text-text-muted">
        {label}
      </AppText>

      {typeof value === "string" ? (
        <AppText weight="semibold">
          {value || "-"}
        </AppText>
      ) : (
        value
      )}
    </View>
  );
}