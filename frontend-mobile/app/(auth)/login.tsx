import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View
} from "react-native";

// import ErrorMessageModal from "@/components/common/ErrorMessageModal";
import LogoText from "@/components/common/LogoText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { api } from "@/lib/api";
import { getUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

const Page = () => {
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isErrorVisible, setErrorVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  console.log("Current Form Data:", formData);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const login = async (username: string, password: string) => {
    try {
      // send credentials - backend sets cookie
      await api.post("/api/auth/login", { username, password });

      // DO NOT trust login response alone
      // verify session via /me 
      const user = await getUser();

      // STEP 2: store verified user in state
      setUser(user);

      // navigate only AFTER auth is confirmed
      router.replace("(app)/(tabs)/Homepage");
    } catch (error) {
      // any failure means login OR cookie failed
      console.error("Login error:", error);
    }
  };

  const handleLogin = () => {
    const trimmedUsername = formData.username.trim();
    const trimmedPassword = formData.password.trim();
    console.log(trimmedUsername, trimmedPassword);

    if (!trimmedUsername || !trimmedPassword) {
      alert("Username and password are required.");
      return;
    }
    console.log("Submitting Data:", {
      username: trimmedUsername,
      password: trimmedPassword,
    });

    login(trimmedUsername, trimmedPassword);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        style="auto"
        translucent={true}
        backgroundColor="transparent"
      />
      <LogoText />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={Colors.primary}
          style={styles.input}
          onChangeText={(text) =>
            setFormData((prevState) => ({
              ...prevState,
              username: text,
            }))
          }
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.primary}
          secureTextEntry
          style={styles.input}
          onChangeText={(text) =>
            setFormData((prevState) => ({
              ...prevState,
              password: text,
            }))
          }
        />
      </View>

      <Button title="Login" onPress={handleLogin}></Button>
      {/* {isErrorVisible && (
        <ErrorMessageModal
          visible={isErrorVisible}
          onClose={() => setErrorVisible(false)}
          message={errorMessage}
        />
      )} */}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 50,
    color: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 55,
    color: Colors.primary,
    fontFamily: "CustomFont",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#F1F1F1",
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: "80%",
    backgroundColor: Colors.button,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  space: {
    height: 33,
  },
});
