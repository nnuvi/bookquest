import AppText from "@/components/ui/AppText";
import { View } from "react-native";

type BookDescriptionProps = {
  description?: string;
  notes?: string;
};

export default function BookDescription({
  description,
  notes,
}: BookDescriptionProps) {
  return (
    <View className="mt-5">
      <AppText size="2xl" weight="semibold" className="mb-1">
        Description
      </AppText>

      <AppText className="leading-5">{description}</AppText>

      {notes && (
        <View className="mt-5">
          <AppText size="xl" weight="semibold" className="mb-1">
            Note
          </AppText>

          <AppText className="leading-5">{notes || "N/A"}</AppText>
        </View>
      )}
    </View>
  );
}
