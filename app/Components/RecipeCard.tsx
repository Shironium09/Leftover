import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { useRouter } from 'expo-router';

export default function RecipeCard({image, title, time, difficulty}: {image: string, title: string, time: string, difficulty: string}){
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push('/Recipe')} className="w-full h-36 bg-white rounded-lg mt-4 px-2 gap-2 flex-row items-center justify-between">
            <Image source={{uri: image}} className="w-32 h-32 rounded-lg"/>
            <View className="flex-col gap-2 flex-1 flex-shrink">
                <View className="flex-row">
                    <Text className="text-2xl font-bold" numberOfLines={2}>{title}</Text>        
                </View>
                <View>
                    <Text className="text-sm">{time}</Text>
                    <Text className="text-sm">{difficulty}</Text>   
                </View>
            </View>
        </TouchableOpacity>
    );
}