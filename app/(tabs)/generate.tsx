import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ImageInput from "../Components/ImageInput";
import { scanIngredients } from "../../lib/gemini_image";

export default function GenerateScreen() {

  const router = useRouter();
  const [ingredientImage, setIngredientImage] = useState<string | null>(null);
  const [ingredientBase64, setIngredientBase64] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");

  const handleImageChange = (uri: string | null, base64: string | null) => {
    setIngredientImage(uri);
    setIngredientBase64(base64);
    // Reset scan state when a new image is picked
    setScanned(false);
    setIngredients([]);
  };

  const handleScan = async () => {
    if (!ingredientImage || !ingredientBase64) {
      Alert.alert("No image", "Please add a photo of your ingredients first.");
      return;
    }

    setLoading(true);
    try {
      const result = await scanIngredients(ingredientBase64);

      if (result.length === 0) {
        Alert.alert("No ingredients found", "We couldn't identify any ingredients. Try a clearer photo.");
        setLoading(false);
        return;
      }

      setIngredients(result);
      setScanned(true);
    } catch (error: any) {
      console.error("Scan error:", error);
      Alert.alert("Scan failed", error.message || "Something went wrong while scanning.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    router.push({
      pathname: '/Options',
      params: { ingredients: JSON.stringify(ingredients) },
    });
  };

  const addIngredient = () => {
    const trimmed = newIngredient.trim();
    if (trimmed && !ingredients.includes(trimmed.toLowerCase())) {
      setIngredients(prev => [...prev, trimmed.toLowerCase()]);
      setNewIngredient("");
      Keyboard.dismiss();
    }
  };

  const removeIngredient = (item: string) => {
    setIngredients(prev => prev.filter(i => i !== item));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 pt-20">

        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Image Input */}
          <ImageInput 
            image={ingredientImage} 
            base64={ingredientBase64}
            onImageChange={handleImageChange} 
          />

          {/* Ingredients List */}
          {scanned && (
            <View className="px-5 mt-8">
              <Text className="text-black text-xl font-bold text-center mb-3">
                Found Ingredients ({ingredients.length})
              </Text>

              {/* Ingredient Chips */}
              <View className="flex-row flex-wrap justify-center gap-2">
                {ingredients.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => removeIngredient(item)}
                    className="flex-row items-center bg-emerald-700 px-3 py-2 rounded-full gap-1"
                  >
                    <Text className="text-white font-semibold capitalize">{item}</Text>
                    <Ionicons name="close-circle" size={16} color="white" />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Add Ingredient Input */}
              <View className="flex-row items-center mt-4 gap-2 justify-center">
                <TextInput
                  className="flex-1 border border-emerald-700 rounded-full px-4 py-2 text-black text-base"
                  placeholder="Add an ingredient..."
                  placeholderTextColor="#9ca3af"
                  value={newIngredient}
                  onChangeText={setNewIngredient}
                  onSubmitEditing={addIngredient}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={addIngredient}
                  className="bg-emerald-700 w-10 h-10 rounded-full items-center justify-center"
                >
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Button */}
        <View className="absolute bottom-10 left-0 right-0 px-8">
          <TouchableOpacity
            className={`py-4 rounded-full shadow-lg ${loading ? 'bg-gray-400' : 'bg-emerald-700'}`}
            onPress={scanned ? handleNext : handleScan}
            disabled={loading}
          >
            {loading ? (
              <View className="flex-row items-center justify-center gap-3">
                <ActivityIndicator color="white" />
                <Text className="text-center text-white text-xl font-bold">Scanning...</Text>
              </View>
            ) : (
              <Text className="text-center text-white text-xl font-bold">
                {scanned ? "Next" : "Scan Ingredients"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}
