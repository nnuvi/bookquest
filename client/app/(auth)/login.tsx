import { useRouter } from "expo-router";
import { TextInput, View } from "react-native";

import LogoText from "@/components/common/LogoText";
import Button from "@/components/ui/Button";

import FormInput from "@/components/ui/FormInput";
import { useLogin } from "@/hooks/auth";
import {
  LoginInput,
  loginInputDefaultValues,
  loginSchema,
} from "@/schema/auth.schema";
import { getUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

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

  // useEffect(() => {
  //   console.log("LoginScreen mounted");

  //   return () => {
  //     console.log("LoginScreen unmounted");
  //   };
  // }, []);

  return (
    <View className="flex-1 bg-background justify-center px-6">
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
        {/* <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              style={{
                borderWidth: 1,
                padding: 12,
              }}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        /> */}

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
  );
}
