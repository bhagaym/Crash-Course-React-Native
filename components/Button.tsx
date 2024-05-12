import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from "react-native";
import { FC } from "react";

type ButtonProps = {
  title?: string | undefined;
  handlePress?: (event: GestureResponderEvent) => void;
  containerStyles?: string | undefined;
  textStyles?: string | undefined;
  isLoading?: boolean | undefined;
  icon?: any | undefined;
  buttonSize?: string | undefined;
};

export const ButtonText: FC<ButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  buttonSize,
}) => {
  let size = 14;
  let textSize = "text-md";
  if (buttonSize == "small") {
    size = 10;
    textSize = "text-md";
  } else if (buttonSize == "large") {
    size = 16;
    textSize = "text-lg";
  }

  return (
    <TouchableOpacity
      className={`${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } rounded-md h-${size} justify-center items-center`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`font-psemibold ${textSize} ${textStyles}`}>
        {isLoading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export const ButtonTextIcon: FC<ButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
}) => {
  return (
    <TouchableOpacity
      className={`${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } rounded-md min-h-[52px] justify-center items-center`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <View className="flex-row gap-4">
        <Image source={icon} className="w-6 h-6" />
        <Text className={`font-psemibold text-md ${textStyles}`}>
          {isLoading ? "Loading..." : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
