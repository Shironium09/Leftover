import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function ConfirmationScreen(){

  const router = useRouter();

  

  return (
    <View className="flex h-screen">
      <View className="flex h-full w-full py-20">
        <Text>Confirmation Screen</Text>
        <TouchableOpacity
          style={{borderWidth: 1}}
          onPress={() => router.push('/RecipeList')}
        >
          <Text>Go to Recipe List (confirm ingredients)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{borderWidth: 1}}
          onPress={() => router.back()}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{borderWidth: 1}}
          onPress={() => router.push('/chatbot')}
        >
          <Text>Go Chatbot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}
