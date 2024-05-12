import tailwindConfig from "../tailwind.config";
import { Member } from "../models/Member";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

type TailwindConfig = {
  theme?: {
    extend?: {
      colors?: Record<string, string | Record<string, string>>;
    };
  };
};

type TailwindColor = string | Record<string, string>;

export const getTailwindColor = (
  colorName: string,
  colorVariant?: string
): TailwindColor | undefined => {
  const extendColors = (tailwindConfig as TailwindConfig)?.theme?.extend
    ?.colors;
  if (
    extendColors &&
    typeof extendColors === "object" &&
    colorName in extendColors
  ) {
    const color = extendColors[colorName];
    if (typeof color === "string") {
      return color;
    } else if (
      colorVariant &&
      typeof color === "object" &&
      colorVariant in color
    ) {
      return color[colorVariant];
    } else {
      return color;
    }
  } else {
    return "black";
  }
};

export const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v";
export const getAuth = async (): Promise<any> => {
  try {
    const lsValue = await AsyncStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    const parsedValue =
      lsValue != null ? (JSON.parse(lsValue) as Member) : null;
    return parsedValue;
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
    throw error; // Melempar kembali error untuk ditangani di tempat pemanggilan
  }
};

export const renderAuth = async () => {
  const auth = await getAuth();
  if (auth) {
    return {
      headers: {
        Authorization: "Bearer " + auth.api_token,
      },
    };
  } else {
    return {};
  }
};

export const setAuth = async (auth: Member) => {
  try {
    const lsValue = JSON.stringify(auth);
    await AsyncStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

export const removeAuth = () => {
  try {
    AsyncStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export const errorSystem = (error: any, rejects: any) => {
  if (error.response) {
    if (error.response.data.message == "Unauthenticated.") {
      Toast.show({
        type: "customErrorToast",
        position: "bottom",
        text1: "Sesi Habis!",
        text2: "Silakan masuk kembali.",
      });

      router.replace("/sign-in");
    } else {
      rejects(error.response.data);
    }
  } else {
    rejects(error);
  }
};
