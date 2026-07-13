import { useState } from "react";
import { Host, Column, Button, BottomSheet, Text } from "@expo/ui";

import BorrowRequestForm, {
  BorrowRequestFormValues,
} from "./BorrowRequestForm";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  isPresented: boolean;
  loading?: boolean;
  onDismiss: () => void;
  onSubmit: (values: BorrowRequestFormValues) => void;
};

export default function BorrowRequestSheet({
  isPresented,
  loading,
  onDismiss,
  onSubmit,
}: Props) {
  // const [isPresented, setIsPresented] = useState(false);

  return (
    <BottomSheet isPresented={isPresented} onDismiss={onDismiss}>
      <View
        style={{
          width: 320,
          alignSelf: "center",
          padding: 20,
          backgroundColor: Colors.background,
        }}
      >
        <BorrowRequestForm
          loading={loading}
          onCancel={onDismiss}
          onSubmit={onSubmit}
        />
      </View>
    </BottomSheet>
  );
}

// import { BottomSheet, Column } from "@expo/ui";

// import BorrowRequestForm, {
//   BorrowRequestFormValues,
// } from "./BorrowRequestForm";
// import { View, Text, Pressable, ScrollView } from "react-native";

// type Props = {
//   isPresented: boolean;
//   loading?: boolean;
//   onDismiss: () => void;
//   onSubmit: (values: BorrowRequestFormValues) => void;
// };

// export default function BorrowRequestSheet({
//   isPresented,
//   loading,
//   onDismiss,
//   onSubmit,
// }: Props) {
//   return (
//     <BottomSheet   isPresented={isPresented}
//   onDismiss={onDismiss}
//   showDragIndicator
//   snapPoints={[0.85]}>
//       {/* <Column
//         spacing={20}
//         style={{
//           // width: "90%",
//           // maxWidth: 700,
//           // alignSelf: "center",
//           padding: 20,
//           backgroundColor: "red",
//         }} */}
//       {/* > */}
//       <View
//         style={{
//           width: "100%",
//           backgroundColor: "red",
//               // flex: 1,
//           padding: 10,
//         }}
//       >
//         <BorrowRequestForm
//           loading={loading}
//           onCancel={onDismiss}
//           onSubmit={onSubmit}
//         />
//       </View>
//       {/* </Column> */}
//     </BottomSheet>
//   );
// }

// import { forwardRef } from "react";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";

// import AppBottomSheet from "@/components/ui/BottomSheetModal";
// import BorrowRequestForm from "./BorrowRequestForm";

// type Props = {
//   loading?: boolean;
//   onSubmit: (values: {
//     borrowDurationDays: number;
//     message: string;
//   }) => void;
// };

// const BorrowRequestSheet = forwardRef<BottomSheetModal, Props>(
//   ({ loading, onSubmit }, ref) => {
//     return (
//       <AppBottomSheet ref={ref}>
//         <BorrowRequestForm
//           loading={loading}
//           onCancel={() => (ref as React.RefObject<BottomSheetModal>).current?.dismiss()}
//           onSubmit={onSubmit}
//         />
//       </AppBottomSheet>
//     );
//   },
// );

// BorrowRequestSheet.displayName = "BorrowRequestSheet";

// export default BorrowRequestSheet;
