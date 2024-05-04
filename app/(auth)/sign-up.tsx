import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import { FormField }  from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { registerUser } from '../../lib/appwrite'
import { Alert } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider';


const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = () => {

    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Pelase fill in all the fields');
      return;
    }

    setisSubmitting(true);
    
    registerUser(form)
      .then((response) => {
        setUser(response);
        setIsLoggedIn(true);
        
        router.replace('/home')
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} className='w-[115px] h-[35px]' />
          <Text className='text-xl text-white text-semibold mt-10 font-psemibold'>Sign up to Aora</Text>
        
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e})}
            otherStyle="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e})}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e})}
            otherStyle="mt-7"
          />

          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>

            <Link href='/sign-in' className='text-lg font-psemibold text-secondary-100'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp