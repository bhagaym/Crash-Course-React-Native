import React, { FC } from "react";
import { Home, ProfileCircle, Lock, LogOut } from "iconoir-react-native";

type IconoirProps = {
  icon?: string;
  width?: string;
  height?: string;
  color?: string;
};

const Iconoir: FC<IconoirProps> = ({ icon, ...props }) => {
  switch (icon) {
    case "Home":
      return <Home {...props} />;
    case "ProfileCircle":
      return <ProfileCircle {...props} />;
    case "Lock":
      return <Lock {...props} />;
    case "LogOut":
      return <LogOut {...props} />;

    default:
      return;
  }
};

export default Iconoir;
