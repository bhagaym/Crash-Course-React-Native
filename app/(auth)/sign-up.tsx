import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { appAttribute, icons } from "../../constants";
import { router } from "expo-router";
import { ButtonText, ButtonTextIcon } from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const signInGoogle = () => {};

  const signInFacebook = () => {};

  const signInEmail = () => {
    router.push("/sign-up-email");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 pb-10">
          <ButtonTextIcon
            title="Daftar Dengan Google"
            handlePress={signInGoogle}
            containerStyles="mt-7 bg-utama_light border-1 border-utama"
            textStyles="text-utama"
            icon={icons.google}
          />
          <ButtonTextIcon
            title="Daftar Dengan facebook"
            handlePress={signInFacebook}
            containerStyles="mt-4 bg-utama_light border-1 border-utama"
            textStyles="text-utama"
            icon={icons.facebook}
          />

          <View className="justify-center pt-7 flex-row gap-4 items-center px-7">
            <View className="flex-1 border-b border-gray-300"></View>
            <Text className="text-center text-sm text-gray-500">
              Atau gunakan akun
            </Text>
            <View className="flex-1 border-b border-gray-300"></View>
          </View>

          <ButtonText
            title="Daftar Dengan Email"
            handlePress={signInEmail}
            containerStyles="mt-7 bg-utama"
            textStyles="text-white"
          />

          <View className="justify-center pt-20 flex-row gap-2">
            <Text className="text-sm text-gray-500 font-pregular">
              Sudah punya akun?
            </Text>

            <TouchableOpacity onPress={() => router.replace("/sign-in")}>
              <Text className="text-sm font-psemibold text-utama">Masuk</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-20">
            <Text className="text-center mt-5 text-sm">
              Dengan mendaftar, Anda menyetujui aturan penggunaan dan kebijakan
              privasi {appAttribute.AppName}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
