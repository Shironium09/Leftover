import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import TimeSelector from './Components/TimeSelector';
import OptionSelector from './Components/OptionSelector';

/* 
    1. The time they want, minimum of 1 minute, maximum of 120 minutes
    2. The meal type: Breakfast, Lunch, Dinner, or Snack
    3. The diet type: Keto, Vegan, Vegetarian, Gluten-Free, or None
    4. The spice level: Mild, Medium, Spicy, or None
    5. The cuisine type: American, Chinese, Indian, Italian, Japanese, Korean, Mexican, or etc. (This will be an option way)
*/

export default function GenerateScreen() {

  const router = useRouter();

  const [time, setTime] = useState(15);
  const [mealType, setMealType] = useState("");
  const [dietType, setDietType] = useState("");
  const [spiceLevel, setSpiceLevel] = useState("");
  const [cuisineType, setCuisineType] = useState("");

  const changeTime = (time: number) => {

    setTime(time);

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-stone-100">
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingVertical: 40, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TimeSelector value={time} onChange={(num) => changeTime(num)} />

          <OptionSelector 
            title="Meal Type" 
            options={["Any", "Breakfast", "Lunch", "Dinner", "Snack"]} 
            selected={mealType || "Any"} 
            onChange={setMealType} 
          />

          <OptionSelector 
            title="Dietary Preference" 
            options={["None", "Keto", "Vegan", "Vegetarian", "Gluten-Free"]} 
            selected={dietType || "None"} 
            onChange={setDietType} 
          />

          <OptionSelector 
            title="Spice Level" 
            options={["None", "Mild", "Medium", "Spicy"]} 
            selected={spiceLevel || "None"} 
            onChange={setSpiceLevel} 
          />

          <OptionSelector 
            title="Cuisine" 
            options={["Any", "American", "Chinese", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Thai", "Mediterranean"]} 
            selected={cuisineType || "Any"} 
            onChange={setCuisineType} 
            horizontal={true}
          />

          <View className="px-5 mt-12">
            <TouchableOpacity
              className="bg-emerald-700 py-4 rounded-full shadow-md"
              onPress={() => router.push('/Confirmation')}
            >
              <Text className="text-center text-white text-xl font-bold">Generate Recipe!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );

}
