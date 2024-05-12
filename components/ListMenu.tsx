import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React, { FC } from "react";
import { NavArrowRight } from "iconoir-react-native";
import Iconoir from "./Iconoir";

type MenuProps = {
  title: string;
  subtitle?: string;
  icon?: string;
  handleClick?: (event: GestureResponderEvent) => void;
};
type ListMenuProps = {
  data: MenuProps;
};
export const ListMenu: FC<ListMenuProps> = ({ data }) => {
  return (
    <TouchableOpacity onPress={data.handleClick}>
      <View className="bg-white p-3 flex-row">
        {data.icon && (
          <View className="justify-center mr-4">
            <Iconoir icon={data.icon} width="30" height="30" />
          </View>
        )}
        <View className="">
          <Text className="text-base font-psemibold">{data.title}</Text>
          {data.subtitle ? (
            <Text className="text-sm">{data.subtitle}</Text>
          ) : (
            ""
          )}
        </View>
        <View className="flex-auto justify-center items-end ">
          <NavArrowRight />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ListHeader: FC<MenuProps> = ({ title }) => {
  return title ? (
    <View className="bg-white p-4 pt-3">
      <View>
        <Text className="text-base font-psemibold">{title}</Text>
      </View>
    </View>
  ) : (
    <View className="pt-3"></View>
  );
};
