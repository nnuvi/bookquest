import { useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";

import Screen from "@/components/common/Screen";
import { HeaderTitle } from "@/components/common/HeaderTitle";

import Tabs from "@/components/ui/Tabs";
import ISBNScanner from "@/components/feature/add/ISBNScanner";
import ISBN from "./ISBN";

type ISBNTab = "scan" | "manual";

export default function ScanISBN() {
  const [tab, setTab] = useState<ISBNTab>("scan");

  function handleSubmit(isbn: string) {
    router.push({
      pathname: "/add/Form",
      params: { isbn },
    });
  }

  return (
    <Screen>
      <HeaderTitle text="ISBN" />

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { label: "Scan", value: "scan" },
          { label: "Enter ISBN", value: "manual" },
        ]}
      />

      <View className="flex-1 items-center justify-center">
        {tab === "scan" ? (
          <View className="">
            <View className="aspect-square w-90 overflow-hidden rounded-3xl border border-border mb-16">
              <ISBNScanner onScanned={handleSubmit} />
            </View>
          </View>
        ) : (
          <ISBN />
        )}
      </View>
    </Screen>
  );
}
