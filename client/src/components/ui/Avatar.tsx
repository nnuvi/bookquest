import { Image, ImageProps, Pressable } from "react-native";

import userPlaceholder from "@assets/images/placeholder-user.png";
import { LOG_SCOPE, logger } from "@/lib/logger";

const sizes = {
  xs: 50,
  sm: 70,
  md: 90,
  lg: 110,
  xl: 130,
};

type AvatarProps = Omit<ImageProps, "source"> & {
  image?: string | null;
  size?: keyof typeof sizes;
  onPress?: () => void;
  disabled?: boolean;
};

export default function Avatar({
  image,
  size = "md",
  style,
  onPress,
  disabled,
  ...props
}: AvatarProps) {
  logger.debug(LOG_SCOPE.image, "image: ", { image });
  const source =
    typeof image === "string" && image.trim().length > 0
      ? { uri: image }
      : userPlaceholder;

  const avatar = (
    <Image
      {...props}
      source={source}
      resizeMode="cover"
      style={[
        {
          width: sizes[size],
          height: sizes[size],
          borderRadius: sizes[size] / 2,
        },
        style,
      ]}
    />
  );

  if (!onPress) return avatar;

  return (
    <Pressable onPress={onPress} disabled={disabled} hitSlop={8}>
      {avatar}
    </Pressable>
  );
}
