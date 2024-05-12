import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { FormField } from "../../components/FormField";
import { Alert } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ButtonText } from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpEmail = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    password: "",
    ulangi_password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = () => {
    if (!form.password || !form.ulangi_password) {
      Alert.alert("Error", "Pelase fill in all the fields");
      return;
    }

    setisSubmitting(true);

    // registerUser(form)
    //   .then((response) => {
    //     setUser(response);
    //     setIsLoggedIn(true);

    //     router.replace("/home");
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
          <FormField
            title="Password"
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            placeholder="Masukkan password"
          />

          <FormField
            title="Ulangi Password"
            handleChangeText={(e: string) =>
              setForm({ ...form, ulangi_password: e })
            }
            otherStyle="mt-7"
            placeholder="Ulangi password"
          />

          <ButtonText
            title="Simpan Password Baru"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpEmail;
