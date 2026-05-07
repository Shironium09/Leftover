import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface ImageInputProps {
  image: string | null;
  base64: string | null;
  onImageChange: (uri: string | null, base64: string | null) => void;
}

export default function ImageInput({ image, base64, onImageChange }: ImageInputProps) {

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant gallery access to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      onImageChange(result.assets[0].uri, result.assets[0].base64 ?? null);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera access to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      onImageChange(result.assets[0].uri, result.assets[0].base64 ?? null);
    }
  };

  return (
    <View className="px-5">
      <View className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        {image ? (
          <View>
            <Image 
              source={{ uri: image }} 
              className="w-full h-64"
              contentFit="cover"
            />
            <View className="flex-row border-t border-stone-200">
              <TouchableOpacity 
                onPress={takePhoto}
                className="flex-1 flex-row items-center justify-center gap-2 py-3 border-r border-stone-200"
                activeOpacity={0.6}
              >
                <Ionicons name="camera-outline" size={20} color="#065f46" />
                <Text className="text-emerald-800 font-semibold">Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={pickImage}
                className="flex-1 flex-row items-center justify-center gap-2 py-3 border-r border-stone-200"
                activeOpacity={0.6}
              >
                <Ionicons name="images-outline" size={20} color="#065f46" />
                <Text className="text-emerald-800 font-semibold">Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => onImageChange(null, null)}
                className="flex-1 flex-row items-center justify-center gap-2 py-3"
                activeOpacity={0.6}
              >
                <Ionicons name="trash-outline" size={20} color="#dc2626" />
                <Text className="text-red-600 font-semibold">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Empty state
          <View className="py-10 px-6 items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-emerald-50 items-center justify-center">
              <Ionicons name="camera" size={36} color="#065f46" />
            </View>
            <View className="items-center gap-1">
              <Text className="text-stone-800 text-lg font-bold">Add your ingredients</Text>
              <Text className="text-stone-400 text-sm text-center">Take a photo or pick one from your gallery</Text>
            </View>
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity 
                onPress={takePhoto}
                className="flex-row items-center gap-2 bg-emerald-700 px-5 py-3 rounded-full"
                activeOpacity={0.7}
              >
                <Ionicons name="camera-outline" size={18} color="white" />
                <Text className="text-white font-bold">Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={pickImage}
                className="flex-row items-center gap-2 bg-stone-100 border border-stone-200 px-5 py-3 rounded-full"
                activeOpacity={0.7}
              >
                <Ionicons name="images-outline" size={18} color="#065f46" />
                <Text className="text-emerald-800 font-bold">Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
