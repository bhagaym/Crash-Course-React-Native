import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getTailwindColor } from "../../lib/myFunction";
import {
  Bookmark,
  Home,
  IconoirProvider,
  PlusCircle,
  ProfileCircle,
} from "iconoir-react-native";

const TabsLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && !isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <IconoirProvider
      iconProps={{
        color: "black",
        width: "24px",
        height: "24px",
      }}
    >
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: getTailwindColor("utama")?.toString(),
          tabBarInactiveTintColor: "#636363",
          tabBarStyle: {
            shadowOpacity: 0,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#f4f4f4",
            height: 50,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="items-center justify-center gap-2">
                <Home
                  color={color}
                  height={20}
                  width={20}
                  style={{ marginBottom: -5 }}
                />
                <Text
                  className={`${focused ? "font-psemibold" : "font-pregular"}`}
                  style={{ color: color, fontSize: 10 }}
                >
                  Beranda
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="items-center justify-center gap-2">
                <Bookmark
                  color={color}
                  height={20}
                  width={20}
                  style={{ marginBottom: -5 }}
                />
                <Text
                  className={`${focused ? "font-psemibold" : "font-pregular"}`}
                  style={{ color: color, fontSize: 10 }}
                >
                  Bookmark
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="items-center justify-center gap-2">
                <PlusCircle
                  color={color}
                  height={20}
                  width={20}
                  style={{ marginBottom: -5 }}
                />
                <Text
                  className={`${focused ? "font-psemibold" : "font-pregular"}`}
                  style={{ color: color, fontSize: 10 }}
                >
                  Create
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="items-center justify-center gap-2">
                <ProfileCircle
                  color={color}
                  height={20}
                  width={20}
                  style={{ marginBottom: -5 }}
                />
                <Text
                  className={`${focused ? "font-psemibold" : "font-pregular"}`}
                  style={{ color: color, fontSize: 10 }}
                >
                  Profil Saya
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>

      <StatusBar />
    </IconoirProvider>
  );
};

export default TabsLayout;
