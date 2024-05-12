import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { IconoirProvider } from "iconoir-react-native";

const PengaturanLayout = () => {
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
          name="edit-profile"
          options={{ headerTitle: "Edit Profile", headerShadowVisible: false }}
        />
        <Stack.Screen
          name="ganti-password"
          options={{
            headerTitle: "Ganti Password",
            headerShadowVisible: false,
          }}
        />
      </Stack>

      <StatusBar />
    </IconoirProvider>
  );
};

export default PengaturanLayout;
