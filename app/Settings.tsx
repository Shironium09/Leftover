import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function SettingsScreen(){

  const router = useRouter();

  return (
    <View>
      <Text>Settings Screen</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.back()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );

}
