import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function GenerateScreen(){

  const router = useRouter();

  

  return (
    <View>
      <Text>Generate Recipe Screen</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Confirmation')}
      >
        <Text>Go to Confirmation (after AI processing)</Text>
      </TouchableOpacity>
    </View>
  );

}
