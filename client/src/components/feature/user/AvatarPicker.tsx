import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

import Avatar from "@/components/ui/Avatar";

import { useUpdateProfileImage } from "@/hooks/user";
import { pickImage } from "@/lib/image";

type AvatarPickerProps = {
  image?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  placeholder: any;
  onSuccess?: () => void;
};

export default function AvatarPicker({
  image,
  size = "md",
  placeholder,
  onSuccess,
}: AvatarPickerProps) {
  const mutation = useUpdateProfileImage();

  async function handlePress() {
    try {
      const pickedImage = await pickImage();

      if (!pickedImage) return;

      mutation.mutate(pickedImage);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={mutation.isPending}
      className="self-center"
    >
      <View>
        <Avatar
          size={size}
          image={image}
          style={{
            opacity: mutation.isPending ? 0.6 : 1,
          }}
        />

        <View className="absolute bottom-2 right-4 rounded-full bg-primary p-1 border border-white">
          <Ionicons
            name={mutation.isPending ? "hourglass" : "camera"}
            size={14}
            color="white"
          />
        </View>
      </View>
    </Pressable>
  );
}
