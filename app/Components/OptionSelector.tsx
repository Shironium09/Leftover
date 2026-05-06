import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface OptionSelectorProps {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  horizontal?: boolean;
}

export default function OptionSelector({ title, options, selected, onChange, horizontal = false }: OptionSelectorProps) {
  
  const renderChips = () => {
    return options.map((option) => {
      const isSelected = selected === option;
      return (
        <TouchableOpacity
          key={option}
          onPress={() => onChange(option)}
          className={`px-4 py-2 rounded-full border-2 ${
            isSelected 
              ? 'bg-emerald-700 border-emerald-700' 
              : 'bg-transparent border-emerald-700'
          }`}
        >
          <Text className={`font-bold text-base ${isSelected ? 'text-white' : 'text-emerald-900'}`}>
            {option}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="flex flex-col items-center gap-3 mt-8">
      <Text className="text-black text-2xl font-bold text-center">{title}</Text>
      
      {horizontal ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="w-full"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingVertical: 4 }}
        >
          {renderChips()}
        </ScrollView>
      ) : (
        <View className="flex flex-row flex-wrap justify-center gap-2 px-2">
          {renderChips()}
        </View>
      )}
    </View>
  );
}
