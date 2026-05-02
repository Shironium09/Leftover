import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function RecipeScreen(){

  const router = useRouter();

  return (
    <View>
      <Text>Recipe Screen</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Chatbot')}
      >
        <Text>Go to Chatbot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Timer')}
      >
        <Text>Go to Timer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.back()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );

}
