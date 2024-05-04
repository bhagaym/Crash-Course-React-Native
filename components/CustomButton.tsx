import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import { FC } from 'react'

type CustomButtonProps = {
  title?: string | undefined,
  handlePress?: (event: GestureResponderEvent) => void,
  containerStyles?: string | undefined,
  textStyles?: string | undefined,
  isLoading?: boolean | undefined
}

const CustomButton: FC<CustomButtonProps> = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity className={`${containerStyles} ${isLoading ? 'opacity-50' : ''} bg-secondary rounded-xl min-h-[62px] justify-center items-center`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{(isLoading ? 'Loading...' : title)}</Text>
    </TouchableOpacity>
  )
}
export default CustomButton