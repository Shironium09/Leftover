import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SavedRecipe } from '../../lib/supabase_recipes';

interface RecipeCardProps {
    recipe: SavedRecipe;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
    const router = useRouter();
    
    const time = recipe.prep_time ? `${recipe.prep_time} mins` : '';
    const difficulty = recipe.ingredients?.length ? `${recipe.ingredients.length} items` : '';
    const image = recipe.image_url || 'https://loremflickr.com/400/400/food';

    return (
        <TouchableOpacity 
            onPress={() => router.push({
                pathname: '/Recipe',
                params: { recipe: JSON.stringify(recipe) }
            })} 
            className="w-full h-36 bg-white rounded-lg mt-4 px-2 gap-2 flex-row items-center justify-between"
        >
            <Image source={{ uri: image }} className="w-32 h-32 rounded-lg" />
            <View className="flex-col gap-2 flex-1 flex-shrink py-2 h-full justify-center">
                <View className="flex-row items-start justify-between">
                    <Text className="text-xl font-bold flex-1" numberOfLines={2}>{recipe.name}</Text>
                    <TouchableOpacity 
                        onPress={onToggleFavorite}
                        className="p-2"
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    >
                        <Ionicons 
                            name={isFavorite ? "star" : "star-outline"} 
                            size={24} 
                            color={isFavorite ? "#eab308" : "#9ca3af"} 
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {!!time && <Text className="text-sm text-gray-600">{time}</Text>}
                    {!!difficulty && <Text className="text-sm text-gray-600">{difficulty}</Text>}
                </View>
            </View>
        </TouchableOpacity>
    );
}