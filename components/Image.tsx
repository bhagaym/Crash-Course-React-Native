import { Image as ImageReact, ImageSourcePropType } from "react-native";
import React, { FC, useState } from "react";
import { ImageResizeMode } from "react-native";

type ImageProps = {
  source?: ImageSourcePropType;
  imageReplace?: ImageSourcePropType;
  className?: string;
  resizeMode?: ImageResizeMode;
};
const Image: FC<ImageProps> = ({ source, imageReplace, ...props }) => {
  const [imageFile, setImageFile] = useState(source);

  const handleImageError = () => {
    setImageFile(imageReplace);
  };

  return (
    <>
      <ImageReact source={imageFile} onError={handleImageError} {...props} />
    </>
  );
};

export default Image;
