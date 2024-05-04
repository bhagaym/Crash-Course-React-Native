import { View, Text } from 'react-native'
import React, { FC } from 'react'

type InfoBoxProps = {
    title? : string | number | undefined;
    subtitle? : string | undefined;
    containerStyles? : string | undefined;
    titleStyles? : string | undefined;
}

const InfoBox: FC<InfoBoxProps> = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>
        {subtitle}
      </Text>
    </View>
  )
}

export default InfoBox