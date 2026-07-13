import AppText from "@/components/ui/AppText";
import { View } from "react-native";

type Section = {
  title?: string;
  content: string | null;

  titleSize?: "lg" | "xl" | "2xl";
  contentSize?: "sm" | "base" | "lg";
};

type TextSectionProps = {
  sections: Section[];
};

export default function TextSection({
  sections,
}: TextSectionProps) {
  return (
    <View className="mt-5 gap-5">
      {sections.map(
        ({
          title,
          content,
          titleSize = "xl",
          contentSize = "base",
        }) => {
          if (!content) return null;

          return (
            <View key={content}>
              <AppText
                size={titleSize}
                weight="semibold"
                className="mb-1"
              >
                {title}
              </AppText>

              <AppText
                size={contentSize}
                className="leading-6 text-text-muted"
              >
                {content}
              </AppText>
            </View>
          );
        },
      )}
    </View>
  );
}