import { Image, ImageProps, ImageSourcePropType } from "react-native";

import bookPlaceholder from "@assets/images/placeholder-book.png";

const sizes = {
  xs: 50,
  sm: 70,
  md: 90,
  lg: 110,
  xl: 130,
};

type BookCoverProps = Omit<ImageProps, "source"> & {
  image?: string | null;
  placeholder?: ImageSourcePropType;
  size?: keyof typeof sizes;
  width?: number;
};

export default function BookCover({
  image,
  placeholder = bookPlaceholder,
  size = "md",
  width,
  style,
  ...props
}: BookCoverProps) {
  const finalWidth = width ?? sizes[size];

  return (
    <Image
      {...props}
      source={
        image && image.trim().length > 0
          ? { uri: image }
          : placeholder
      }
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