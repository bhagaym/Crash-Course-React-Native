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
  errorMessage?: string | [] | undefined;
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

  let passwordMode = false;
  const type_password = [
    "password",
    "ulangi password",
    "ulangi password baru",
    "password baru",
    "password lama",
  ];
  if (title && type_password.includes(title.toLowerCase())) {
    passwordMode = true;
  }

  let displayErrorMessage;
  if (errorMessage && Array.isArray(errorMessage) && errorMessage.length > 1) {
    let rangkai = "";
    errorMessage.map((item) => {
      rangkai = rangkai + item + "\n";
    });

    displayErrorMessage = (
      <Text className="text-sm font-pregular text-danger">{rangkai}</Text>
    );
  } else {
    displayErrorMessage = (
      <Text className="text-sm font-pregular text-danger">{errorMessage}</Text>
    );
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
          secureTextEntry={passwordMode && !showPassword}
          keyboardType={keyboardType}
        />

        {passwordMode && (
          <TouchableOpacity
            onPress={() => {
              setshowPassword(!showPassword);
            }}
          >
            {!showPassword ? <EyeClosed /> : <Eye />}
          </TouchableOpacity>
        )}
      </View>

      {displayErrorMessage}
    </View>
  );
};
