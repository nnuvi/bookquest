import { View } from "react-native";

import RequestTabButton from "./RequestTabButton";

export type RequestTab = "received" | "sent" | "friends";

interface Props {
  selected: RequestTab;
  onChange: (tab: RequestTab) => void;
}

export default function RequestTabs({ selected, onChange }: Props) {
  return (
    <View className="mx-3 my-3 flex-row rounded-full bg-neutral p-1">
      <RequestTabButton
        title="Received"
        active={selected === "received"}
        onPress={() => onChange("received")}
      />

      <RequestTabButton
        title="Sent"
        active={selected === "sent"}
        onPress={() => onChange("sent")}
      />

      <RequestTabButton
        title="Friends"
        active={selected === "friends"}
        onPress={() => onChange("friends")}
      />
    </View>
  );
}
