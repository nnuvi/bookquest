import AppText from "@/components/common/AppText";
import { View } from "react-native";

type BookDescriptionProps = {
  description?: string;
  notes?: string;
};

export default function BookDescription({
  description,
  notes,
}: BookDescriptionProps) {
  console.log("description:", description);
  console.log("notes:", notes);

  return (
    <View className="mt-5">
      <AppText className="text-2xl font-semibold mb-1">Description</AppText>

      <AppText className="leading-5">{description}</AppText>

      {notes && (
        <View className="mt-5">
          <AppText className="text-xl font-semibold mb-1">Note</AppText>

          <AppText className="leading-5">{notes || "N/A"}</AppText>
        </View>
      )}
    </View>
  );
}
