import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { FC, useState } from "react";
import { router, usePathname } from "expo-router";
import { Search } from "iconoir-react-native";

type SearchInputProps = {
  initialQuery?: string | undefined;
};

export const SearchInput: FC<SearchInputProps> = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="border-2 border-gray-200 w-full h-14 px-4 bg-white rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="ext-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#000"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something o search resuls across database"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push("/search/" + query);
          }
        }}
      >
        <Search />
      </TouchableOpacity>
    </View>
  );
};
