import { View, Text, ActivityIndicator, Modal } from "react-native";
import React, { FC } from "react";

type SpinnerProps = {
  containerStyles?: string;
};

const Spinner: FC<SpinnerProps> = ({ containerStyles }) => {
  return (
    <View
      className={`${containerStyles} flex-row items-center w-full justify-center`}
    >
      <ActivityIndicator size={"large"} className="mr-3" />
      <Text className="text-lg font-psemibold">Loading...</Text>
    </View>
  );
};

type SpinnerOverlayProps = {
  visibility?: boolean;
};
export const SpinnerOverlay: FC<SpinnerOverlayProps> = ({ visibility }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility || false}
    >
      <View className="justify-center items-center h-full w-full bg-dark/40">
        <View className="bg-white flex-row items-center justify-center p-3 rounded-md shadow">
          <ActivityIndicator size={"large"} className="mr-3" />
          <Text className="text-lg font-psemibold">Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Spinner;
