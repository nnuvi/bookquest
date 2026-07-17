import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { View } from "react-native";

import AppModal from "@/components/ui/AppModal";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

type AddBookModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddBookModal({ visible, onClose }: AddBookModalProps) {
  function navigate(path: "/add/Manual" | "/add/ScanISBN") {
    onClose();
    router.push(path);
  }

  return (
    <AppModal visible={visible} onClose={onClose}>
      <View className="items-center">
        <MaterialIcons name="library-add" size={44} color={Colors.primary} />

        <AppText size="2xl" weight="bold" className="mt-3">
          Add Book
        </AppText>

        {/* <AppText className="mt-2 mb-6 text-center text-neutral">
          Choose how you'd like to add your book.
        </AppText> */}
      </View>

      <View className="mt-6 gap-3">
        <Button
          title="Scan ISBN Barcode"
          //   leftIcon="barcode-outline"
          variant="neutral"
          onPress={() => navigate("/add/ScanISBN")}
        />

        <Button
          title="Enter Manually"
          //   leftIcon="create-outline"
          variant="neutral"
          onPress={() => navigate("/add/Manual")}
        />

        {/* <Button
          title="Enter Manually"
          //   leftIcon="create-outline"
          variant="neutral"
          onPress={() => navigate("/add/Manual")}
        /> */}
      </View>
    </AppModal>
  );
}
