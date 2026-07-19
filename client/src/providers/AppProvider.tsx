import { queryClient } from "@/lib/queryClient";
import { Host } from "@expo/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AuthProvider from "./AuthProvider";
import FeedbackProvider from "./FeedbackProvider";

type Props = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <BottomSheetModalProvider> */}
          <FeedbackProvider>
            <Host style={{ flex: 1 }}>{children}</Host>
          </FeedbackProvider>
          {/* </BottomSheetModalProvider> */}
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
