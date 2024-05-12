import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { IconoirProvider } from "iconoir-react-native";

const AuthLayout = () => {
  return (
    <IconoirProvider
      iconProps={{
        color: "black",
        width: "24px",
        height: "24px",
      }}
    >
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{ headerTitle: "Masuk", headerShadowVisible: false }}
        />
        <Stack.Screen
          name="sign-up"
          options={{ headerTitle: "Daftar", headerShadowVisible: false }}
        />
        <Stack.Screen
          name="sign-up-email"
          options={{
            headerTitle: "Daftar Dengan Email",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerTitle: "Lupa Password",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="check-otp"
          options={{
            headerTitle: "Verifikasi OTP",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="new-password"
          options={{
            headerTitle: "Password Baru",
            headerShadowVisible: false,
          }}
        />
      </Stack>

      <StatusBar />
    </IconoirProvider>
  );
};

export default AuthLayout;
