import { useRouter } from "expo-router";
import { View } from "react-native";

import LogoText from "@/components/common/LogoText";
import Button from "@/components/ui/Button";

import FormInput from "@/components/ui/FormInput";
import { useLogin } from "@/hooks/auth";
import {
  LoginInput,
  loginInputDefaultValues,
  loginSchema,
} from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import Screen from "@/components/common/Screen";

export default function LoginScreen() {
  const router = useRouter();

  const loginMutation = useLogin();

  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginInputDefaultValues,
  });

  // const setUser = useAuthStore((s) => s.setUser);

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.replace("/(app)/(tabs)/Homepage");
      },
    });
  };

  const handleDemoLogin = () => {
    loginMutation.mutate(
      {
        username: "demo",
        password: "DemoPass99",
      },
      {
        onSuccess: () => {
          router.replace("/(app)/(tabs)/Homepage");
        },
      },
    );
  };

  return (
    <Screen statusBarColor={Colors.background}>
      <View className="flex-1 justify-center px-6">
        {/* <StatusBar style="auto" translucent backgroundColor="transparent" /> */}

        <View className="items-center mb-12">
          <LogoText variant="dark" />
          {/* <AppText size="3xl" weight="bold" color={"primary"}>
          Login
        </AppText> */}
        </View>

        <View className="mb-4">
          <FormInput
            control={control}
            name="username"
            // label="Username"
            placeholder="Username"
          />

          <FormInput
            control={control}
            name="password"
            // label="Password"
            placeholder="Password"
            secureTextEntry
          />
        </View>

        <Button
          title="Login"
          variant="primary"
          buttonSize="xl"
          fullWidth
          disabled={loginMutation.isPending}
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          title="Continue as Demo"
          variant="outline"
          buttonSize="xl"
          fullWidth
          disabled={loginMutation.isPending}
          onPress={handleDemoLogin}
          className="mt-6"
        />
      </View>
    </Screen>
  );
}
