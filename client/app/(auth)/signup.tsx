import { useRouter } from "expo-router";
import { View } from "react-native";

import LogoText from "@/components/common/LogoText";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import Screen from "@/components/common/Screen";

import { useSignup } from "@/hooks/auth";

import {
  SignupInput,
  signupInputDefaultValues,
  signupSchema,
} from "@/schema/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";

export default function SignupScreen() {
  const router = useRouter();

  const signupMutation = useSignup();

  const { control, handleSubmit } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupInputDefaultValues,
  });

  // const onSubmit = (data: SignupInput) => {
  //   const { confirmPassword, ...signupData } = data;

  //   signupMutation.mutate(signupData, {
  //     onSuccess: () => {
  //       router.replace("/(auth)/login");
  //     },
  //   });
  // };
  const onSubmit = (data: SignupInput) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        router.replace("/(auth)/login");
      },
    });
  };

  return (
    <Screen statusBarColor={Colors.background}>
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-10">
          <LogoText variant="dark" />
        </View>

        <View className="gap-2 mb-6">
          <FormInput
            control={control}
            name="fullName"
            // label="Full Name"
            placeholder="Full name"
            autoCapitalize="words"
          />

          <FormInput
            control={control}
            name="username"
            // label="Username"
            placeholder="Username"
            autoCapitalize="none"
          />

          <FormInput
            control={control}
            name="email"
            // label="Email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            control={control}
            name="password"
            // label="Password"
            placeholder="Password"
            secureTextEntry
          />

          <FormInput
            control={control}
            name="confirmPassword"
            // label="Confirm Password"
            placeholder="Confirm password"
            secureTextEntry
          />
        </View>

        <Button
          title={
            signupMutation.isPending ? "Creating Account..." : "Create Account"
          }
          variant="primary"
          buttonSize="lg"
          fullWidth
          disabled={signupMutation.isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Screen>
  );
}
