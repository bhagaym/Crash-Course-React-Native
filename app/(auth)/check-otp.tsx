import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";
import { ButtonText } from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpEmail = () => {
  const [form, setForm] = useState({
    kode_otp: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = () => {
    if (!form.kode_otp) {
      Alert.alert("Error", "Pelase fill in all the fields");
      return;
    }

    router.push("check-otp");

    // setisSubmitting(true);

    // registerUser(form)
    //   .then((response) => {
    //     router.replace("/check-otp");
    //   })
    //   .catch((error) => {
    //     Alert.alert("Error", error.message);
    //   })
    //   .finally(() => {
    //     setisSubmitting(false);
    //   });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 pb-10">
          <View className="mt-7">
            <Text className="text-2xl font-pbold">OTP Terkirim</Text>
            <Text className="text-base text-gray-500">
              Kami telah mengirimkan kode OTP ke alamat email Anda. Silakan cek
              dan masukkan kode OTP pada tempat yang sudah disediakan dibawah
              ini.
            </Text>
          </View>

          <View className="space-y-2 mt-7">
            <Text className="text-base font-pmedium">Kode OTP</Text>

            <View className="border-2 border-gray-200 w-full h-16 px-4 bg-white rounded-lg focus:border-primary items-center flex-row">
              <TextInput
                className="flex-1 text-dark font-pbold text-2xl text-center"
                placeholder="Masukkan kode OTP disini"
                placeholderTextColor="#7A7A7A"
                autoCapitalize="characters"
                onChangeText={(e: string) => setForm({ ...form, kode_otp: e })}
              />
            </View>
          </View>

          <ButtonText
            title="Verifikasi OTP"
            handlePress={submit}
            containerStyles="mt-7 bg-utama"
            textStyles="text-white"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpEmail;
