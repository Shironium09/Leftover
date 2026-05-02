import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function ShoppingListScreen(){

  const router = useRouter();

  return (
    <View>
      <Text>Shopping List Screen</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.back()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );

}
