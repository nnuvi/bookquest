import { Image, ImageProps } from "react-native";

const sizes = {
  xs: 50,
  sm: 70,
  md: 90,
  lg: 110,
  xl: 130,
};

type AvatarProps = ImageProps & {
  size?: keyof typeof sizes;
};

export default function Avatar({
  size = "md",
  style,
  ...props
}: AvatarProps) {
  return (
    <Image
      {...props}
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
}