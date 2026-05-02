import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function SignupScreen(){

  const router = useRouter();

  return (
    <View>
      <Text>Signup Screen</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Login')}
      >
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text>Go to Home (Signup)</Text>
      </TouchableOpacity>
    </View>
  );

}
