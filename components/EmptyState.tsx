import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { images } from "../constants";
import { router } from "expo-router";
import { ButtonText } from "./Button";

type EmptyStateProps = {
  title?: string | undefined;
  subtitle?: string | undefined;
};

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold mt-2">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-500">{subtitle}</Text>

      <ButtonText
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
