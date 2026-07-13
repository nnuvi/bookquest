import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "@/lib/queryClient";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Host } from "@expo/ui";

import FeedbackProvider from "./FeedbackProvider";

type Props = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <BottomSheetModalProvider> */}
        <FeedbackProvider>
          <Host style={{ flex: 1 }}>{children}</Host>
        </FeedbackProvider>
        {/* </BottomSheetModalProvider> */}
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
