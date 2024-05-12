import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { appAttribute } from "../../constants";
import { FormField } from "../../components/FormField";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ButtonText } from "../../components/Button";
import { registerUser } from "../../controllers/auth";
import { ErrorAlert } from "../../components/Alert";
import { setAuth } from "../../lib/myFunction";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpEmail = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const { setUser, setIsLoggedIn, setWarningOptions } = useGlobalContext();
  const [form, setForm] = useState({
    nama_lengkap: "Bhaga Yanuardo",
    email: "bhagaym@gmail.com",
    password: "Missa080343.",
    ulangi_password: "Missa080343.",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (
      !form.nama_lengkap ||
      !form.email ||
      !form.password ||
      !form.ulangi_password
    ) {
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

    await registerUser(form)
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
            title="Nama Lengkap"
            value={form.nama_lengkap}
            handleChangeText={(e: string) =>
              setForm({ ...form, nama_lengkap: e })
            }
            otherStyle="mb-7"
            placeholder="Masukkan nama lengkap Anda"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyle="mb-7"
            keyboardType="email-address"
            placeholder="Masukkan alamat email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyle="mb-7"
            placeholder="Masukkan password"
          />

          <FormField
            title="Ulangi Password"
            value={form.ulangi_password}
            handleChangeText={(e: string) =>
              setForm({ ...form, ulangi_password: e })
            }
            otherStyle="mb-7"
            placeholder="Ulangi password"
          />

          <ButtonText
            title="Daftar"
            handlePress={submit}
            containerStyles="mb-10 mt-3 bg-utama"
            textStyles="text-white"
            isLoading={isSubmitting}
          />

          <Text className="text-center text-sm">
            Dengan mendaftar, Anda menyetujui aturan penggunaan dan kebijakan
            privasi {appAttribute.AppName}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpEmail;
