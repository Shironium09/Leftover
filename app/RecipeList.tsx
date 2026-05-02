import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function RecipeListScreen(){

  const router = useRouter();

  return (
    <View>
      <Text>Recipe List Screen</Text>
      <TouchableOpacity
        style={{borderWidth: 1}}
        onPress={() => router.push('/Recipe')}
      >
        <Text>Go to Recipe (select a dish)</Text>
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
