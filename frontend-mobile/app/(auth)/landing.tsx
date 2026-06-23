import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import LogoText from "@/components/common/LogoText";
import StatusBar from "@/components/common/StatusBar";
import { Colors } from "@/constants/Colors";

export default function Landing() {

  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
            <StatusBar />
      <LogoText variant='dark'/>

      <Text className="text-center text-midgray mb-10">
        Manage, borrow, and track your books easily.
      </Text>

      <TouchableOpacity
        className="border bg-button border-primary px-6 py-3 rounded-full w-full mb-3"
        onPress={() => router.push("/(auth)/login")}
      >
        <Text className="text-text-dark text-center">Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border bg-button border-primary px-6 py-3 rounded-full w-full"
        onPress={() => router.push("/(auth)/signup")}
      >
        <Text className="text-text-dark text-center">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
} 

// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { useRouter } from "expo-router";
// import { useFonts } from "expo-font";

// import LogoText from "@/src/components/common/LogoText";
// import StatusBar from "@/src/components/common/StatusBar";

// const Page = () => {
//   const router = useRouter();

//   const [fontsLoaded] = useFonts({
//     CustomFont: require("../assets/fonts/Retrograde.ttf"),
//   });

//   if (!fontsLoaded) return null;

//   return (
//     <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
//       <StatusBar />

//       <LogoText />

//       <View className="w-4/5">
//         <TouchableOpacity
//           className="bg-button py-4 rounded-full my-2.5 items-center"
//           onPress={() => router.push("/auth/login")}
//         >
//           <Text className="text-black text-lg">Log In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="bg-button py-4 rounded-full my-2.5 items-center"
//           onPress={() => router.push("/auth/signup")}
//         >
//           <Text className="text-black text-lg">Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Page;
