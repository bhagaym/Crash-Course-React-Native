import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { FormField } from "../../components/FormField";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ButtonText } from "../../components/Button";
import { loginUser } from "../../controllers/auth";
import { ErrorAlert } from "../../components/Alert";
import { setAuth } from "../../lib/myFunction";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser, setIsLoggedIn, setWarningOptions } = useGlobalContext();
  const [form, setForm] = useState({
    email: "bhagaym@gmail.com",
    password: "Missa080343.",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      setWarningOptions({
        message: "Silakan lengkapi semua field yang ada.",
        button: {
          confirm: {
            onPress: () => {
              setWarningOptions({
                visibility: false,
              });
            },
          },
        },
        visibility: true,
      });
      return;
    }
    setErrorMsg("");
    setisSubmitting(true);

    await loginUser(form)
      .then((response) => {
        setUser(response.data);
        setAuth(response.data);
        setIsLoggedIn(true);

        router.replace("/home");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 pb-10">
          <ErrorAlert message={errorMsg} />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
            placeholder="Masukkan alamat email Anda"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            placeholder="Masukkan password Anda"
          />

          <View className="mt-3">
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Link
                  href="/forgot-password"
                  className="text-right text-utama font-pmedium text-sm"
                >
                  Lupa Password
                </Link>
              </View>
            </View>
          </View>

          <ButtonText
            title="Masuk"
            handlePress={submit}
            containerStyles="mt-7 bg-utama"
            textStyles="text-white"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-7 flex-row gap-4 items-center px-7">
            <View className="flex-1 border-b border-gray-300"></View>
            <Text className="text-center text-sm text-gray-500">
              Atau gunakan akun
            </Text>
            <View className="flex-1 border-b border-gray-300"></View>
          </View>

          <View className="justify-center pt-7 flex-row gap-4 items-center text-center px-7">
            <TouchableOpacity className="bg-facebook rounded-xl min-h-[50px] min-w-[50px] justify-center items-center">
              <Image
                source={icons.facebook}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-google rounded-xl min-h-[50px] min-w-[50px] justify-center items-center">
              <Image
                source={icons.google}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>

          <View className="justify-center pt-20 flex-row gap-2">
            <Text className="text-sm text-gray-500 font-pregular">
              Belum punya akun?
            </Text>

            <TouchableOpacity onPress={() => router.replace("/sign-up")}>
              <Text className="text-sm font-psemibold text-utama">
                Daftar Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
