import { CheckCircle, WarningTriangle } from "iconoir-react-native";
import { FC } from "react";
import { Modal, Text, View } from "react-native";
import { getTailwindColor } from "../lib/myFunction";
import { ButtonText } from "./Button";

// type ButtonProps = {
//   confirm?: {
//     customText: string;
//     additionalStyle: string;
//     textStyle: string;
//     onPress: () => void;
//   };
//   cancel?: {
//     customText: string;
//     additionalStyle: string;
//     textStyle: string;
//     onPress: () => void;
//   };
// };
type AlertProps = {
  title?: string;
  message?: string | undefined;
  button?: any;
  visibility?: boolean;
};
type DialogPropsParent = {
  options: AlertProps;
};

export const WarningDialog: FC<DialogPropsParent> = ({ options }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={options.visibility || false}
    >
      <View className="justify-center items-center h-full w-full bg-dark/40">
        <View className="bg-white w-[90%] items-center justify-center p-5 rounded-md shadow">
          <Text className="text-lg font-psemibold">
            {options.title || "Perhatian!"}
          </Text>
          <View className="justify-center mt-4">
            <Text className="text-base">{options.message}</Text>
          </View>

          <View className="flex-row items-center justify-center ">
            <ButtonText
              title={options.button?.confirm?.customText || "Ok, mengerti"}
              containerStyles={` ${
                options.button?.confirm?.additionalStyle || "bg-utama"
              } mt-7 basis-2/4`}
              textStyles={` ${
                options.button?.confirm?.textStyle || "text-white"
              } `}
              buttonSize="small"
              handlePress={options.button?.confirm?.onPress || (() => {})}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ConfirmDialog: FC<DialogPropsParent> = ({ options }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={options.visibility || false}
    >
      <View className="justify-center items-center h-full w-full bg-dark/40">
        <View className="bg-white w-[90%] items-center justify-center p-5 rounded-md shadow">
          <Text className="text-lg font-psemibold">{options.title}</Text>
          <View className="w-full mt-4">
            <Text className="text-base text-center">{options.message}</Text>
          </View>

          <View className="flex-row items-center justify-center ">
            <ButtonText
              title={options.button?.cancel?.customText || "Batal"}
              containerStyles={` ${
                options.button?.cancel?.additionalStyle || "bg-utama_light"
              } mt-7 basis-2/4 mr-1`}
              textStyles={` ${
                options.button?.cancel?.textStyle || "text-utama"
              } `}
              buttonSize="small"
              handlePress={options.button?.cancel?.onPress || (() => {})}
            />
            <ButtonText
              title={options.button?.confirm?.customText || "Ok, Lanjutkan"}
              containerStyles={` ${
                options.button?.confirm?.additionalStyle || "bg-utama"
              } mt-7 basis-2/4`}
              textStyles={` ${
                options.button?.confirm?.textStyle || "text-white"
              } `}
              buttonSize="small"
              handlePress={options.button?.confirm?.onPress || (() => {})}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const SuccessAlert: FC<AlertProps> = ({ message }) => {
  if (message) {
    return (
      <View className="flex flex-row bg-success_light p-3 border border-success rounded-md">
        <CheckCircle
          width={36}
          height={36}
          color={getTailwindColor("success")?.toString()}
          className="mr-3 mt-3"
        />
        <View className="flex-auto">
          <Text className="text-lg text-success font-psemibold">
            Perhatian!
          </Text>
          <Text className="text-base text-success">{message}</Text>
        </View>
      </View>
    );
  } else {
    return;
  }
};

export const ErrorAlert: FC<AlertProps> = ({ message }) => {
  if (message) {
    return (
      <View className="mb-5 flex flex-row bg-danger_light p-3 border border-danger rounded-md">
        <WarningTriangle
          width={36}
          height={36}
          color={getTailwindColor("danger")?.toString()}
          className="mr-3 mt-3"
        />
        <View className="flex-auto">
          <Text className="text-md text-danger font-psemibold">Perhatian!</Text>
          <Text className="text-sm text-danger">{message}</Text>
        </View>
      </View>
    );
  } else {
    return;
  }
};
