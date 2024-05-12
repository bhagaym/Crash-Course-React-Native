import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import { ButtonText } from "../components/Button";
import { getAuth } from "../lib/myFunction";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function App() {
  const { isLoading, isLoggedIn, setIsLoggedIn, setUser } = useGlobalContext();

  const fetchAuthData = async () => {
    getAuth().then((response: any) => {
      if (response) {
        setUser(response);
        setIsLoggedIn(true);
      }
    });
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 pb-10">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[200px] mt-7"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-2xl font-bold text-center">
              Fast, Efficient and Productive
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-800 mt-7 text-center">
            In this kind of post, the blogger introduces a person they’ve
            interviewed.
          </Text>

          {!isLoading ? (
            <>
              <ButtonText
                title="Daftar"
                handlePress={() => router.replace("/sign-up")}
                containerStyles="w-full mt-7 bg-utama"
                textStyles="text-white"
              />
              <ButtonText
                title="Masuk"
                handlePress={() => router.replace("/sign-in")}
                containerStyles="w-full mt-4 bg-utama_light border-1 border-utama"
                textStyles="text-utama"
              />
            </>
          ) : (
            <Spinner containerStyles="pt-10" />
          )}
        </View>
      </ScrollView>

      <StatusBar />
    </SafeAreaView>
  );
}
