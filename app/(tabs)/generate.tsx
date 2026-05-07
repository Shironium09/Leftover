import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView, TextInput, Keyboard } from "react-native";
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
    <View className="flex-1 bg-stone-100">
      <View className="bg-emerald-800 w-full rounded-bl-3xl rounded-br-3xl px-7 py-10 pt-20">
        <Text className="text-white text-4xl font-bold">Generate</Text>
        <Text className="text-white text-lg mt-1">Snap your leftovers and discover recipes</Text>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <ImageInput 
          image={ingredientImage} 
          base64={ingredientBase64}
          onImageChange={handleImageChange} 
        />
        {scanned && (
          <View className="px-5 mt-6">
            <View className="bg-white rounded-2xl border border-stone-200 p-5">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-stone-800 text-lg font-bold">
                  Found Ingredients
                </Text>
                <View className="bg-emerald-700 px-3 py-1 rounded-full">
                  <Text className="text-white font-bold text-sm">{ingredients.length}</Text>
                </View>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {ingredients.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => removeIngredient(item)}
                    className="flex-row items-center bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-full gap-1"
                  >
                    <Text className="text-emerald-800 font-semibold capitalize">{item}</Text>
                    <Ionicons name="close-circle" size={16} color="#065f46" />
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex-row items-center mt-4 gap-2">
                <View className="flex-1 flex-row items-center bg-stone-50 border border-stone-200 rounded-full px-4 py-2">
                  <Ionicons name="add-circle-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-2 text-stone-800 text-base"
                    placeholder="Add an ingredient..."
                    placeholderTextColor="#9ca3af"
                    value={newIngredient}
                    onChangeText={setNewIngredient}
                    onSubmitEditing={addIngredient}
                    returnKeyType="done"
                  />
                </View>
                <TouchableOpacity
                  onPress={addIngredient}
                  className="bg-emerald-700 w-10 h-10 rounded-full items-center justify-center"
                >
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="absolute bottom-10 left-0 right-0 px-8">
        <TouchableOpacity
          className={`py-4 rounded-full ${loading ? 'bg-gray-400' : 'bg-emerald-700'}`}
          onPress={scanned ? handleNext : handleScan}
          disabled={loading}
        >
          {loading ? (
            <View className="flex-row items-center justify-center gap-3">
              <ActivityIndicator color="white" />
              <Text className="text-center text-white text-xl font-bold">Scanning...</Text>
            </View>
          ) : (
            <View className="flex-row items-center justify-center gap-2">
              <Ionicons 
                name={scanned ? "arrow-forward" : "scan"} 
                size={22} 
                color="white" 
              />
              <Text className="text-center text-white text-xl font-bold">
                {scanned ? "Next" : "Scan Ingredients"}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
