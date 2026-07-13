import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

import AppModal from "@/components/ui/AppModal";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

type FeedbackModalProps = {
  visible: boolean;
  type: "success" | "error";
  title: string;
  message?: string;
  onClose: () => void;
};

export default function FeedbackModal({
  visible,
  type,
  title,
  message,
  onClose,
}: FeedbackModalProps) {
  const success = type === "success";

  return (
    <AppModal visible={visible} onClose={onClose}>
      <View className="items-center">
        {/* Icon */}
        <View
          className={`mb-5 h-20 w-20 items-center justify-center rounded-full ${
            success ? "bg-primary-light/10" : "bg-neutral/10"
          }`}
        >
          <Ionicons
            name={success ? "checkmark-circle" : "close-circle"}
            size={52}
            color={success ? Colors.primaryLight : Colors.neutral}
          />
        </View>

        {/* Title */}
        <AppText
          size="2xl"
          weight="bold"
          className="text-center"
        >
          {title}
        </AppText>

        {/* Message */}
        {message && (
          <AppText
            className="mt-3 text-center text-text-muted"
          >
            {message}
          </AppText>
        )}

        {/* Button */}
        <Button
          title="OK"
          className="mt-8 w-full"
          onPress={onClose}
        />
      </View>
    </AppModal>
  );
}