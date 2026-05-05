import '../global.css';
import React from 'react';
import {Stack} from 'expo-router';
import { cssInterop } from 'nativewind';
import { Image } from 'expo-image';

cssInterop(Image, { className: 'style' });

export default function RootLayout(){

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="Confirmation" />
      <Stack.Screen name="RecipeList" />
      <Stack.Screen name="Recipe" />
      <Stack.Screen name="chatbot" />
      <Stack.Screen name="Timer" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="ShoppingList" />
    </Stack>
  );

}
