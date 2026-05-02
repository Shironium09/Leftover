import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function IndexScreen(){

  const router = useRouter();

  return (
    <View>
      <Text>Welcome to Leftover</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Login')}
      >
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Signup')}
      >
        <Text>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );

}
