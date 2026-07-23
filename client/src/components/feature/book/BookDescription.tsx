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
    <View className="my-5 pb-10">
      <AppText size="2xl" weight="semibold" className="mb-1">
        Description
      </AppText>

      <AppText className="leading-5">
        {description || "N/A"}
      </AppText>

      {!!notes && (
        <View className="mt-5">
          <AppText size="xl" weight="semibold" className="mb-1">
            Note
          </AppText>

          <AppText className="leading-5">
            {notes}
          </AppText>
        </View>
      )}
    </View>
  );
}
