import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OptionSelectorProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  horizontal?: boolean;
}

export default function OptionSelector({ title, icon, options, selected, onChange, horizontal = false }: OptionSelectorProps) {
  
  const renderChips = () => {
    return options.map((option) => {
      const isSelected = selected === option;
      return (
        <TouchableOpacity
          key={option}
          onPress={() => onChange(option)}
          className={`px-4 py-2 rounded-full ${
            isSelected 
              ? 'bg-emerald-700' 
              : 'bg-stone-100 border border-stone-200'
          }`}
        >
          <Text className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-stone-600'}`}>
            {option}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="bg-white rounded-2xl border border-stone-200 p-5">
      <View className="flex-row items-center gap-2 mb-4">
        {icon && <Ionicons name={icon} size={20} color="#065f46" />}
        <Text className="text-stone-800 text-lg font-bold">{title}</Text>
      </View>
      
      {horizontal ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
        >
          {renderChips()}
        </ScrollView>
      ) : (
        <View className="flex flex-row flex-wrap gap-2">
          {renderChips()}
        </View>
      )}
    </View>
  );
}
