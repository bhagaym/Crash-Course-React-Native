import { View, Text, TextInput, TouchableOpacity, Image,KeyboardTypeOptions } from 'react-native'
import React, { FC, useState } from 'react'
import { icons } from '../constants'


type FormFieldProps = {
    title?: string | undefined,
    value?: string | undefined,
    placeholder?: string | undefined,
    handleChangeText?: ((text: string) => void) | undefined,
    otherStyle?: string | undefined,
    keyboardType?: KeyboardTypeOptions | undefined
}

export const FormField: FC<FormFieldProps> = ({title, value, placeholder, handleChangeText, otherStyle, keyboardType, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)

    return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput 
            className='flex-1 text-white font-psemibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            keyboardType={keyboardType}
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={() => { setshowPassword(!showPassword) }}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
            </TouchableOpacity>
        )}
      </View>

    </View>
  )
}
