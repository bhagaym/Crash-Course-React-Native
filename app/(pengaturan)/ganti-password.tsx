import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorAlert } from "../../components/Alert";
import { FormField } from "../../components/FormField";
import { ButtonText } from "../../components/Button";
import { gantiPassword, updateProfile } from "../../controllers/member";
import { useGlobalContext } from "../../context/GlobalProvider";
import { setAuth } from "../../lib/myFunction";

const GantiPassword = () => {
  const { setWarningOptions } = useGlobalContext();
  const initialErrorMessage = {
    password_lama: "",
    password_baru: "",
    ulangi_password_baru: "",
  };
  const initialForm = {
    password_lama: "",
    password_baru: "",
    ulangi_password_baru: "",
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const submit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");
    setErrorMessage(initialErrorMessage);

    await gantiPassword(form)
      .then((result: any) => {
        setWarningOptions({
          title: "Berhasil",
          message: result.message,
          visibility: true,
          button: {
            confirm: {
              onPress: () => {
                setForm(initialForm);
                setWarningOptions({
                  visibility: false,
                });
              },
            },
          },
        });
      })
      .catch((error: any) => {
        setErrorMsg(error.message);
        if (error.data) {
          console.log(error.data);

          setErrorMessage(error.data);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 pb-10">
          <ErrorAlert message={errorMsg} />

          <FormField
            title="Password Lama"
            value={form.password_lama}
            errorMessage={errorMessage.password_lama || ""}
            required={true}
            handleChangeText={(e: string) =>
              setForm({ ...form, password_lama: e })
            }
            otherStyle="mb-7"
            placeholder="Masukkan password lama Anda"
          />

          <FormField
            title="Password Baru"
            value={form.password_baru}
            errorMessage={errorMessage.password_baru || ""}
            required={true}
            handleChangeText={(e: string) =>
              setForm({ ...form, password_baru: e })
            }
            otherStyle="mb-7"
            placeholder="Masukkan password baru Anda"
          />

          <FormField
            title="Ulangi Password Baru"
            value={form.ulangi_password_baru}
            errorMessage={errorMessage.ulangi_password_baru || ""}
            required={true}
            handleChangeText={(e: string) =>
              setForm({ ...form, ulangi_password_baru: e })
            }
            otherStyle="mb-7"
            placeholder="Ulangi password baru Anda"
          />

          <ButtonText
            title="Simpan"
            handlePress={submit}
            containerStyles="mb-10 mt-3 bg-utama"
            textStyles="text-white"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GantiPassword;
