import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { generateRecipes, Recipe } from "../lib/gemini_recipes";
import { getRecipeImageUrl } from "../lib/recipe_image";
import { saveRecipe } from "../lib/supabase_recipes";
import GeneratedRecipeCard from "./Components/GeneratedRecipeCard";

function showToast(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}

export default function RecipeListScreen() {
  const router = useRouter();
  const {
    ingredients: ingredientsParam,
    time,
    mealType,
    dietType,
    spiceLevel,
    cuisineType,
  } = useLocalSearchParams();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const ingredients = JSON.parse(ingredientsParam as string) as string[];
        const result = await generateRecipes(ingredients, {
          prep_time: Number(time),
          meal_type: mealType as string,
          diet_type: dietType as string,
          spice_level: spiceLevel as string,
          cuisine_type: cuisineType as string,
        });
        setRecipes(result);
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to generate recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSelectRecipe = async (item: Recipe) => {
    const imageUrl = getRecipeImageUrl(item.name);

    setSaving(item.name);
    try {
      await saveRecipe(
        item,
        {
          meal_type: mealType as string,
          diet_type: dietType as string,
          cuisine_type: cuisineType as string,
          spice_level: spiceLevel as string,
        },
        imageUrl,
      );
      showToast("Recipe saved!");
    } catch (e) {
      console.warn("Could not save recipe:", e);
    } finally {
      setSaving(null);
    }

    router.push({
      pathname: "/Recipe",
      params: {
        recipe: JSON.stringify({ ...item, image_url: imageUrl }),
      },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-stone-100">
        <ActivityIndicator size="large" color="#047857" />
        <Text className="text-emerald-800 font-semibold mt-4 text-lg">
          Generating recipes...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-stone-100">
      {/* Header */}
      <View className="bg-emerald-800 w-full rounded-bl-3xl rounded-br-3xl px-7 py-10 pt-20">
        <Text className="text-white text-4xl font-bold">Recipes</Text>
        <Text className="text-white text-lg mt-1">
          {recipes.length} recipes found for you
        </Text>
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        renderItem={({ item }) => {
          const imageUrl = getRecipeImageUrl(item.name);
          const isSaving = saving === item.name;

          return (
            <GeneratedRecipeCard
              recipe={item}
              imageUrl={imageUrl}
              isSaving={isSaving}
              onPress={() => handleSelectRecipe(item)}
            />
          );
        }}
      />
    </View>
  );
}
