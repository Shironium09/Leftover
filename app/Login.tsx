import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function LoginScreen(){

  const router = useRouter();

  return (
    <View>
      <Text>Login Screen</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Signup')}
      >
        <Text>Go to Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text>Go to Home (Login)</Text>
      </TouchableOpacity>
    </View>
  );

}
