import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Image } from "expo-image";
import { useAuth } from "../components/Auth";

import Logo from "../assets/logo.png";

export default function SignupScreen() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, loading, signUpWithEmail } =
    useAuth();

  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <View className="flex justify-center bg-stone-100 h-screen py-20">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="h-full w-full flex flex-col justify-evenly gap-20">
        <View>
          <Image source={Logo} className="w-40 h-40 mx-auto" />
          <Text className="text-center text-5xl font-bold">Leftover</Text>
          <Text className="text-center text-xl">
            Welcome! Let's get you started!
          </Text>
        </View>
        <View className="flex flex-col gap-3 justify-center items-center px-10">
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            autoComplete="email"
            autoCapitalize="none"
            className="border-2 p-2 rounded-full w-full text-2xl text-left px-5"
          />
          <View className="flex flex-row justify-between w-full gap-3">
            <TextInput
              placeholder="First Name"
              onChangeText={setFirstName}
              value={firstName}
              className="border-2 p-2 rounded-full flex-1 text-2xl text-left px-5"
            />
            <TextInput
              placeholder="Last Name"
              onChangeText={setLastName}
              value={lastName}
              className="border-2 p-2 rounded-full flex-1 text-2xl text-left px-5"
            />
          </View>
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            className="border-2 p-2 rounded-full w-full text-2xl text-left px-5"
          />
          <TextInput
            placeholder="Confirm Password"
            onChangeText={setConfirmPass}
            value={confirmPass}
            secureTextEntry={true}
            className="border-2 p-2 rounded-full w-full text-2xl text-left px-5"
          />
        </View>
        <View className="flex flex-col gap-5 justify-center items-center">
          <TouchableOpacity
            className="bg-emerald-700 rounded-full px-6 py-4"
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <Text className="text-white text-2xl font-bold w-80 text-center">
              {loading ? "Signing up..." : "Signup"}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row gap-2">
            <Text className="text-center text-xl">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/Login")}>
              <Text className="text-center text-xl text-emerald-700 font-semibold underline underline-offset-4">
                Login!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
