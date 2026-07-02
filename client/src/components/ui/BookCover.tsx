import { Image, ImageProps } from "react-native";

const sizes = {
  xs: 50,
  sm: 70,
  md: 90,
  lg: 110,
  xl: 130,
};

type BookCoverProps = ImageProps & {
  size?: keyof typeof sizes;
  width?: number;
};

export default function BookCover({
  size = "md",
  width,
  style,
  ...props
}: BookCoverProps) {
  const finalWidth = width ?? sizes[size];

  return (
    <Image
      {...props}
      resizeMode="cover"
      style={[
        {
          width: finalWidth,
          height: finalWidth * 1.5,
          borderRadius: 8,
        },
        style,
      ]}
    />
  );
}