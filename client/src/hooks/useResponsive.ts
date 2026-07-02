import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // const bookCardWidth = isDesktop ? Math.min(180, width / 6) : (width - 48) / 3;

  const avatarSize = isDesktop ? 120 : 80;

  const spacing = 16;
  const numColumns = isDesktop ? 6 : isTablet ? 4 : 3;

  const bookCardWidth = (width - spacing * (numColumns + 1)) / numColumns;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    numColumns,
    bookCardWidth,
    avatarSize,
  };
}
