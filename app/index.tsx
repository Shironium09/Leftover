import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useRouter} from 'expo-router';

import Logo from '../assets/logo.png';

export default function IndexScreen(){

  const router = useRouter();

  return (
    <View className="flex justify-center bg-stone-100 h-screen py-20">
        <View className="flex flex-col justify-between h-full py-20">
            <View>
                <Image source={Logo} className="w-40 h-40 mx-auto" />
                <Text className="text-center text-5xl font-bold">Leftover</Text>
                <Text className="text-center text-xl">Turn Your Leftovers Into Delicious Meals!</Text>
            </View>
            <View className="flex flex-col gap-5 justify-center items-center">
                <TouchableOpacity
                    className='bg-emerald-700 rounded-full px-6 py-4'
                    onPress={() => router.push('/Login')}
                >
                    <Text className='text-white text-2xl font-bold w-80 text-center'>Login Your Account</Text>
                </TouchableOpacity>
                <View className="flex flex-row gap-2">                   
                    <Text className='text-center text-xl'>Don't have an account?</Text>
                    <TouchableOpacity                        
                        onPress={() => router.push('/Signup')}
                    >
                        <Text className="text-center text-xl text-emerald-700 font-semibold underline underline-offset-4">Signup!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  );

}
