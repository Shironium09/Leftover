import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';

export default function ConfirmationScreen(){

  const router = useRouter();

  return (
    <View>
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
    </View>
  );

}
