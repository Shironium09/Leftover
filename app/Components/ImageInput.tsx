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

  const showOptions = () => {
    Alert.alert(
      'Add a photo',
      'Take a photo of your ingredients or choose from your gallery.',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        ...(image ? [{ text: 'Remove Photo', onPress: () => onImageChange(null, null), style: 'destructive' as const }] : []),
        { text: 'Cancel', style: 'cancel' as const },
      ]
    );
  };

  return (
    <View className="flex flex-col items-center gap-3 mt-8">
      <Text className="text-emerald-800 text-2xl font-bold text-center">Photo of Ingredients</Text>

      <TouchableOpacity
        onPress={showOptions}
        className="w-52 h-52 rounded-2xl border-2 border-dashed border-emerald-800 items-center justify-center overflow-hidden mt-2"
        activeOpacity={0.7}
      >
        {image ? (
          <Image 
            source={{ uri: image }} 
            className="w-full h-full"
            contentFit="cover"
          />
        ) : (
          <View className="items-center gap-2">
            <Ionicons name="camera-outline" size={48} color="#267358" />
            <Text className="text-emerald-800 text-sm font-semibold text-center">Tap to add a photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {image && (
        <TouchableOpacity onPress={showOptions}>
          <Text className="text-emerald-300 text-sm font-semibold underline">Change photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
