import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TimeSelector from "./Components/TimeSelector";
import OptionSelector from "./Components/OptionSelector";
import { useLocalSearchParams } from "expo-router";

export default function OptionsScreen() {
  const router = useRouter();
  const { ingredients: ingredientsParam } = useLocalSearchParams();
  const ingredients = JSON.parse(ingredientsParam as string) as string[];

  const [time, setTime] = useState(15);
  const [mealType, setMealType] = useState("");
  const [dietType, setDietType] = useState("");
  const [spiceLevel, setSpiceLevel] = useState("");
  const [cuisineType, setCuisineType] = useState("");

  const changeTime = (time: number) => {
    setTime(time);
  };

  return (
    <View className="flex-1 bg-stone-100">
      {/* Header */}
      <View className="bg-emerald-800 w-full rounded-bl-3xl rounded-br-3xl px-7 py-10 pt-20">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <View>
            <Text className="text-white text-3xl font-bold">Preferences</Text>
            <Text className="text-emerald-200 text-base mt-1">
              Customize your recipe generation
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 120, gap: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <TimeSelector value={time} onChange={(num) => changeTime(num)} />

        <OptionSelector
          title="Meal Type"
          icon="restaurant-outline"
          options={["Any", "Breakfast", "Lunch", "Dinner", "Snack"]}
          selected={mealType || "Any"}
          onChange={setMealType}
        />

        <OptionSelector
          title="Dietary Preference"
          icon="leaf-outline"
          options={["None", "Keto", "Vegan", "Vegetarian", "Gluten-Free"]}
          selected={dietType || "None"}
          onChange={setDietType}
        />

        <OptionSelector
          title="Spice Level"
          icon="flame-outline"
          options={["None", "Mild", "Medium", "Spicy"]}
          selected={spiceLevel || "None"}
          onChange={setSpiceLevel}
        />

        <OptionSelector
          title="Cuisine"
          icon="globe-outline"
          options={[
            "Any",
            "American",
            "Chinese",
            "Indian",
            "Italian",
            "Japanese",
            "Korean",
            "Mexican",
            "Thai",
            "Mediterranean",
          ]}
          selected={cuisineType || "Any"}
          onChange={setCuisineType}
          horizontal={true}
        />
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-10 left-0 right-0 px-8">
        <TouchableOpacity
          className="bg-emerald-700 py-4 rounded-full flex-row items-center justify-center gap-2"
          onPress={() =>
            router.push({
              pathname: "/RecipeList",
              params: {
                ingredients: ingredientsParam,
                time: time.toString(),
                mealType: mealType || "Any",
                dietType: dietType || "None",
                spiceLevel: spiceLevel || "None",
                cuisineType: cuisineType || "Any",
              },
            })
          }
        >
          <Ionicons name="sparkles" size={22} color="white" />
          <Text className="text-center text-white text-xl font-bold">
            Generate Recipe!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
