import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function RecipeScreen() {
  const router = useRouter();
  const { recipe: recipeParam } = useLocalSearchParams();
  const recipe = JSON.parse(recipeParam as string);
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps">(
    "ingredients",
  );

  return (
    <View className="flex-1 bg-stone-100">
      {/* Header */}
      <View className="bg-emerald-800 w-full rounded-bl-3xl rounded-br-3xl px-7 py-10 pt-20">
        <View className="flex-row items-center gap-3 mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text
            className="text-white text-2xl font-bold flex-1"
            numberOfLines={2}
          >
            {recipe.name}
          </Text>
        </View>

        {/* Prep time */}
        <View className="flex-row items-center gap-2">
          <Ionicons name="time-outline" size={18} color="#a7f3d0" />
          <Text className="text-emerald-200 text-base">
            {recipe.prep_time} mins
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 120, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-emerald-700 rounded-2xl py-4 items-center gap-1"
            onPress={() =>
              router.push({
                pathname: "/Chatbot",
                params: { recipe: recipeParam },
              })
            }
          >
            <Ionicons name="chatbubble-outline" size={22} color="white" />
            <Text className="text-white font-semibold text-sm">Ask AI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-emerald-700 rounded-2xl py-4 items-center gap-1"
            onPress={() => router.push("/(tabs)/timer")}
          >
            <Ionicons name="timer-outline" size={22} color="white" />
            <Text className="text-white font-semibold text-sm">Timer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-white border border-emerald-700 rounded-2xl py-4 items-center gap-1"
            onPress={() => router.back()}
          >
            <Ionicons name="list-outline" size={22} color="#047857" />
            <Text className="text-emerald-700 font-semibold text-sm">
              All Recipes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Switcher */}
        <View className="flex-row bg-white rounded-2xl border border-stone-200 p-1">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl items-center ${activeTab === "ingredients" ? "bg-emerald-700" : ""}`}
            onPress={() => setActiveTab("ingredients")}
          >
            <Text
              className={`font-semibold ${activeTab === "ingredients" ? "text-white" : "text-stone-500"}`}
            >
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl items-center ${activeTab === "steps" ? "bg-emerald-700" : ""}`}
            onPress={() => setActiveTab("steps")}
          >
            <Text
              className={`font-semibold ${activeTab === "steps" ? "text-white" : "text-stone-500"}`}
            >
              Steps
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <View className="bg-white rounded-2xl border border-stone-200 p-5 gap-3">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <View key={index} className="flex-row items-center gap-3">
                <View className="w-2 h-2 rounded-full bg-emerald-700" />
                <Text className="text-stone-800 text-base capitalize">
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Steps Tab */}
        {activeTab === "steps" && (
          <View className="gap-3">
            {recipe.instructions.map((step: string, index: number) => (
              <View
                key={index}
                className="bg-white rounded-2xl border border-stone-200 p-5 flex-row gap-4"
              >
                <View className="w-8 h-8 rounded-full bg-emerald-700 items-center justify-center shrink-0">
                  <Text className="text-white font-bold">{index + 1}</Text>
                </View>
                <Text className="text-stone-800 text-base flex-1 leading-6">
                  {step}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
