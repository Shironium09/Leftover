import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MOCK_USER, MOCK_RECIPES } from '../../data/mockdata';
import RecipeCard from '../Components/RecipeCard';
import { useAuthContext } from '../../hooks/use-auth-context';

export default function HomeScreen() {
  const router = useRouter();

  const { profile } = useAuthContext();
  const recipes = MOCK_RECIPES;

  const [query, setQuery] = useState("");

  return (
    <View className="flex-1">
      <View className="bg-emerald-800 w-full rounded-bl-3xl rounded-br-3xl px-7 py-10 pt-20 gap-5">
        <View className="">
          <Text className="text-white text-4xl font-bold">Good day, {profile?.first_name || "User"}!</Text>
          <Text className="text-white text-xl font-bold">What's for dinner?</Text>
        </View>
        <View className="bg-white flex-row items-center px-4 py-2 rounded-full mt-2 shadow-sm">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-3 text-lg"
            value={query}
            onChangeText={(e) => setQuery(e)}
            placeholder="Search recipes or ingredients..."
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>

        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Text className="text-xl font-bold">Want to try these recipes again?</Text>
          </View>
        </View>

        {
          recipes.map((recipe) => {
            return (
              <RecipeCard key={recipe.id} image={recipe.image} title={recipe.title} time={recipe.time} difficulty={recipe.difficulty}/>
            )
          })
        }
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
