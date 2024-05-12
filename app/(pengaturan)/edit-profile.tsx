import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorAlert } from "../../components/Alert";
import { FormField } from "../../components/FormField";
import { ButtonText } from "../../components/Button";
import { updateProfile } from "../../controllers/member";
import { useGlobalContext } from "../../context/GlobalProvider";
import { setAuth } from "../../lib/myFunction";

const EditProfile = () => {
  const { user, setUser, setWarningOptions } = useGlobalContext();

  const initialErrorMessage = {
    nama_lengkap: "",
    email: "",
    nomor_hp: "",
  };
  const initialForm = {
    nama_lengkap: user.nama_lengkap,
    email: user.email,
    nomor_hp: user.nomor_hp,
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const submit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");
    setErrorMessage(initialErrorMessage);

    await updateProfile(form)
      .then((result: any) => {
        setUser(result.data);
        setAuth(result.data);

        setWarningOptions({
          title: "Berhasil",
          message: result.message,
          visibility: true,
          button: {
            confirm: {
              onPress: () => {
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
            title="Nama Lengkap"
            value={form.nama_lengkap}
            errorMessage={errorMessage.nama_lengkap || ""}
            required={true}
            handleChangeText={(e: string) =>
              setForm({ ...form, nama_lengkap: e })
            }
            otherStyle="mb-7"
            placeholder="Masukkan nama lengkap Anda"
          />
          <FormField
            title="Email"
            value={form.email}
            errorMessage={errorMessage.email || ""}
            required={true}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyle="mb-7"
            keyboardType="email-address"
            placeholder="Masukkan alamat email"
          />
          <FormField
            title="Nomor HP"
            value={form.nomor_hp}
            errorMessage={errorMessage.nomor_hp || ""}
            required={true}
            handleChangeText={(e: string) => setForm({ ...form, nomor_hp: e })}
            otherStyle="mb-7"
            placeholder="Masukkan nomor HP"
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

export default EditProfile;
