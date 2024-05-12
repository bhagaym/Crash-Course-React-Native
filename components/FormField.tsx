import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import React, { FC, useState } from "react";
import { Eye, EyeClosed } from "iconoir-react-native";

type FormFieldProps = {
  title?: string | undefined;
  value?: string | undefined;
  placeholder?: string | undefined;
  handleChangeText?: ((text: string) => void) | undefined;
  otherStyle?: string | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  required?: boolean | undefined;
  errorMessage?: string | undefined;
};

export const FormField: FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyle,
  keyboardType,
  required,
  errorMessage,
}) => {
  const [showPassword, setshowPassword] = useState(false);

  let star;
  if (required) {
    star = <Text className=" text-danger"> *</Text>;
  }

  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-sm font-pmedium">
        {title}
        {star}
      </Text>

      <View
        className={`border-2 ${
          errorMessage ? "border-danger" : "border-gray-200 focus:border-utama"
        } w-full h-14 px-3 bg-white rounded-lg items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-dark font-pregular text-sm"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7A7A7A"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Ulangi Password") &&
            !showPassword
          }
          keyboardType={keyboardType}
        />

        {(title === "Password" || title === "Ulangi Password") && (
          <TouchableOpacity
            onPress={() => {
              setshowPassword(!showPassword);
            }}
          >
            {!showPassword ? <EyeClosed /> : <Eye />}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text className="text-sm font-pregular text-danger">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
