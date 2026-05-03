import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../assets/logo.png';

export default function SignupScreen() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <View className="flex justify-center bg-stone-100 h-screen py-20">
            <View className="h-full w-full flex flex-col justify-evenly gap-20">
                <View>
                    <Image source={Logo} className="w-40 h-40 mx-auto" />
                    <Text className="text-center text-5xl font-bold">Leftover</Text>
                    <Text className="text-center text-xl">Welcome back! Hope you're ready to cook!</Text>
                </View>
                <View className="flex flex-col gap-3 justify-center items-center px-10">
                    <TextInput
                        placeholder="Email"
                        onChangeText={(e) => { setEmail(e) }}
                        autoComplete='email'
                        className="border-2 p-2 rounded-full w-full text-2xl text-left px-5 gap-3"
                    />
                    <View className="flex flex-row justify-between w-full">
                        <TextInput
                            placeholder="First Name"
                            onChangeText={(e) => { setFirstName(e) }}
                            className="border-2 p-2 rounded-full w-[50%] text-2xl text-left px-5"
                        />
                        <TextInput
                            placeholder="Last Name"
                            onChangeText={(e) => { setLastName(e) }}
                            className="border-2 p-2 rounded-full w-[50%] text-2xl text-left px-5"
                        />
                    </View>
                    <TextInput
                        placeholder="Password"
                        onChangeText={(e) => { setPassword(e) }}
                        secureTextEntry={true}
                        className="border-2 p-2 rounded-full w-full text-2xl text-left px-5"
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        onChangeText={(e) => { setConfirmPass(e) }}
                        secureTextEntry={true}
                        className="border-2 p-2 rounded-full w-full text-2xl text-left px-5"
                    />
                </View>
                <View className="flex flex-col gap-5 justify-center items-center">
                    <TouchableOpacity
                        className='bg-emerald-700 rounded-full px-6 py-4'
                        onPress={() => router.replace('/(tabs)/home')}
                    >
                        <Text className='text-white text-2xl font-bold w-80 text-center'>Login</Text>
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
