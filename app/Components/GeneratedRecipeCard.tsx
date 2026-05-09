import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Recipe } from "../../lib/gemini_recipes";

interface GeneratedRecipeCardProps {
  recipe: Recipe;
  imageUrl: string;
  isSaving: boolean;
  onPress: () => void;
}

export default function GeneratedRecipeCard({
  recipe,
  imageUrl,
  isSaving,
  onPress,
}: GeneratedRecipeCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex-row"
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isSaving}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 100, height: 100 }}
        contentFit="cover"
        transition={300}
      />

      <View className="flex-1 p-4 justify-center gap-1">
        <Text
          className="text-stone-800 text-base font-bold leading-5"
          numberOfLines={2}
        >
          {recipe.name}
        </Text>
        <View className="flex-row items-center gap-1 mt-1">
          <Ionicons name="time-outline" size={13} color="#6b7280" />
          <Text className="text-gray-500 text-sm">
            {recipe.prep_time} mins
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="list-outline" size={13} color="#6b7280" />
          <Text className="text-gray-500 text-sm">
            {recipe.ingredients.length} ingredients
          </Text>
        </View>
      </View>

      <View className="justify-center pr-4">
        {isSaving ? (
          <ActivityIndicator size="small" color="#047857" />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#d6d3d1" />
        )}
      </View>
    </TouchableOpacity>
  );
}
