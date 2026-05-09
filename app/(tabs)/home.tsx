import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import RecipeCard from "../Components/RecipeCard";
import { useAuthContext } from "../../hooks/use-auth-context";
import { getHistoryRecipes, getFavoriteRecipeIds, toggleFavorite, SavedRecipe } from "../../lib/supabase_recipes";

export default function HomeScreen() {

  const { profile } = useAuthContext();
  const [query, setQuery] = useState("");

  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filterType, setFilterType] = useState<"all" | "favorites">("all");

  const loadData = async () => {
    try {
      const [history, favIds] = await Promise.all([
        getHistoryRecipes(),
        getFavoriteRecipeIds(),
      ]);
      setRecipes(history);
      setFavorites(favIds);
    } catch (err) {
      console.error("Failed to load recipes on home:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleToggleFavorite = async (recipeId: string) => {
    const isCurrentlyFav = favorites.has(recipeId);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (isCurrentlyFav) next.delete(recipeId);
      else next.add(recipeId);
      return next;
    });

    try {
      await toggleFavorite(recipeId, !isCurrentlyFav);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert if failed
      setFavorites((prev) => {
        const next = new Set(prev);
        if (isCurrentlyFav) next.add(recipeId);
        else next.delete(recipeId);
        return next;
      });
    }
  };

  // Filter recipes locally by query AND filter type
  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filterType === "all" || favorites.has(r.id);
    return matchesSearch && matchesFilter;
  });

  return (
    <View className="flex-1">
      <View className="bg-emerald-800 w-full rounded-bl-3xl rounded-br-3xl px-7 py-10 pt-20 gap-5">
        <View className="">
          <Text className="text-white text-4xl font-bold">
            Good day, {profile?.first_name || "User"}!
          </Text>
          <Text className="text-white text-xl font-bold">
            What's for dinner?
          </Text>
        </View>
        <View className="bg-white flex-row items-center px-4 py-2 rounded-full mt-2 shadow-sm">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-3 text-lg"
            value={query}
            onChangeText={setQuery}
            placeholder="Search recipes or ingredients..."
            placeholderTextColor="gray"
          />
        </View>
      </View>
      
      <ScrollView
        className="flex-1 px-5 pt-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex flex-row items-center justify-between mb-2">
          <View className="flex flex-row items-center gap-2">
            <Text className="text-xl font-bold">
              Want to try these recipes again?
            </Text>
          </View>
        </View>

        <View className="flex-row gap-3 mb-4 mt-2">
          <TouchableOpacity
            onPress={() => setFilterType("all")}
            className={`px-4 py-2 rounded-full border ${
              filterType === "all"
                ? "bg-emerald-700 border-emerald-700"
                : "bg-transparent border-gray-300"
            }`}
          >
            <Text
              className={`font-semibold ${
                filterType === "all" ? "text-white" : "text-gray-500"
              }`}
            >
              All Recipes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterType("favorites")}
            className={`px-4 py-2 rounded-full border ${
              filterType === "favorites"
                ? "bg-emerald-700 border-emerald-700"
                : "bg-transparent border-gray-300"
            }`}
          >
            <Text
              className={`font-semibold ${
                filterType === "favorites" ? "text-white" : "text-gray-500"
              }`}
            >
              Favorites Only
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#047857" className="mt-10" />
        ) : filteredRecipes.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            {filterType === "favorites" ? "No favorite recipes found." : "No recipes found. Try generating one!"}
          </Text>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.has(recipe.id)}
              onToggleFavorite={() => handleToggleFavorite(recipe.id)}
            />
          ))
        )}
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
