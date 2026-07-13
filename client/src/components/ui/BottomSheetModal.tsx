import { Colors } from "@/constants/Colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";

type Props = {
  children: React.ReactNode;
};

const AppBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ children }, ref) => {
    const snapPoints = useMemo(() => ["55%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        // android_keyboardInputMode="adjustResize"
        backgroundStyle={{
          backgroundColor: Colors.background,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#BDBDBD",
          width: 55,
        }}
        handleStyle={{
          backgroundColor: Colors.background,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default AppBottomSheet;
