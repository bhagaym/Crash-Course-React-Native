import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { FormField } from "../../components/FormField";
import { router } from "expo-router";
import { Alert } from "react-native";
import { ButtonText } from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpEmail = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = () => {
    if (!form.email) {
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
            <Text className="text-2xl font-pbold">Reset Password</Text>
            <Text className="text-base text-gray-500">
              Jangan kuatir jika Anda lupa password. Silakan masukkan alamat
              email Anda dan kami akan mengirimkan kode OTP untuk mengatur ulang
              password Anda.
            </Text>
          </View>

          <FormField
            title="Alamat Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
            placeholder="Masukkan alamat email"
          />

          <ButtonText
            title="Pulihkan Password"
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
