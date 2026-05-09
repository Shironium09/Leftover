import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { generateRecipes, Recipe } from "../lib/gemini_recipes";

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
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-2xl p-4 border border-stone-200"
            onPress={() =>
              router.push({
                pathname: "/Recipe",
                params: { recipe: JSON.stringify(item) },
              })
            }
          >
            <Text className="text-stone-800 text-xl font-bold">
              {item.name}
            </Text>
            <Text className="text-gray-500 mt-1">⏱ {item.prep_time} mins</Text>
            <Text className="text-gray-500 mt-1">
              {item.ingredients.length} ingredients
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
