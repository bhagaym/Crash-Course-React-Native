import { View, RefreshControl, SectionList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import { logoutUser } from "../../controllers/auth";
import { removeAuth } from "../../lib/myFunction";
import { SafeAreaView } from "react-native-safe-area-context";
import Image from "../../components/Image";
import { ListHeader, ListMenu } from "../../components/ListMenu";
import { SpinnerOverlay } from "../../components/Spinner";

const Profile = () => {
  const { user, setUser, setIsLoggedIn, setConfirmOptions } =
    useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    await logoutUser(user.id);
    removeAuth();
    setUser(null);
    setIsLoggedIn(false);
    setIsLoading(false);

    router.replace("/sign-in");
  };

  const konfirmasiLogout = () => {
    setConfirmOptions({
      title: "Keluar Dari Aplikasi",
      message: "Apakah Anda yakin ingin keluar dari aplikasi?",
      button: {
        confirm: {
          customText: "Keluar",
          onPress: () => {
            setConfirmOptions({
              visibility: false,
            });
            logout();
          },
        },
        cancel: {
          customText: "Batal",
          onPress: () => {
            setConfirmOptions({
              visibility: false,
            });
          },
        },
      },
      visibility: true,
    });
  };

  const listData = [
    {
      title: "Pengaturan Akun",
      data: [
        {
          icon: "ProfileCircle",
          title: "Edit Profil",
          subtitle: "Perbarui profil anda",
          handleClick: () => {
            router.push("/edit-profile");
          },
        },
        {
          icon: "Lock",
          title: "Ganti Password",
          subtitle: "Atur ulang password Anda",
          handleClick: () => {
            router.push("/ganti-password");
          },
        },
      ],
    },
    {
      data: [
        {
          icon: "LogOut",
          title: "Keluar",
          subtitle: "",
          handleClick: konfirmasiLogout,
        },
      ],
    },
  ];

  const fetchData = async () => {
    // setIsLoading(true);
    // getuserPost(user.$id)
    //   .then((response: any) => {
    //     setData(response);
    //   })
    //   .catch((error: any) => {
    //     Alert.alert("Error", error.message);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full pb-10">
      <SectionList
        sections={listData}
        keyExtractor={(item) => item.title}
        renderSectionHeader={({ section }) => (
          <ListHeader title={section.title || ""} />
        )}
        renderItem={({ item }) => <ListMenu data={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center pb-10 px-4">
            <View className="w-24 h-24 justify-center items-center mt-10">
              <Image
                source={{ uri: user?.profile_picture }}
                imageReplace={images.avatar}
                className="w-24 h-24 rounded-full"
                resizeMode="cover"
              />
            </View>

            <Text className="mt-10 text-lg font-pbold">
              {user?.nama_lengkap}
            </Text>

            <Text className="mt-3 text-sm font-pregular">{user?.email}</Text>

            <SpinnerOverlay visibility={isLoading} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
