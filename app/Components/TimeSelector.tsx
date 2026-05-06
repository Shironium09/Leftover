import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

interface TimeSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const PRESETS = [15, 30, 45, 60, 75, 90, 120];

export default function TimeSelector({ value, onChange }: TimeSelectorProps) {
  const [customValue, setCustomValue] = useState('');

  const handleCustomChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCustomValue(numericValue);
    
    const num = parseInt(numericValue, 10);
    if (!isNaN(num) && num > 0) {
       onChange(Math.min(num, 120));
    }
  };

  const handlePresetPress = (preset: number) => {
    setCustomValue('');
    onChange(preset);
  };

  return (
    <View className="flex flex-col items-center gap-3">
      <Text className="text-black text-2xl font-bold text-center">Cooking Time</Text>
      <View className="flex flex-row flex-wrap justify-center gap-2 mt-2">
        {PRESETS.map((preset) => {
          const isSelected = value === preset && customValue === '';
          return (
            <TouchableOpacity
              key={preset}
              onPress={() => handlePresetPress(preset)}
              className={`px-4 py-2 rounded-full border-2 ${
                isSelected 
                  ? 'bg-emerald-700 border-emerald-700' 
                  : 'bg-transparent border-emerald-700'
              }`}
            >
              <Text className={`font-bold text-base ${isSelected ? 'text-white' : 'text-emerald-900'}`}>
                {preset} min
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex flex-row justify-center items-center mt-3">
        <Text className="text-black text-base font-semibold mr-3">Custom:</Text>
        <View className="flex-row items-center bg-emerald-900 rounded-xl px-4 py-2 border border-emerald-700">
          <TextInput
            className="text-white text-xl font-bold w-12 text-center"
            keyboardType="number-pad"
            maxLength={3}
            value={customValue}
            onChangeText={handleCustomChange}
            placeholder="--"
            placeholderTextColor="#6ee7b7"
            onFocus={() => {
                if (!customValue && value > 0) {
                    setCustomValue(value.toString());
                }
            }}
          />
          <Text className="text-emerald-300 text-lg font-semibold ml-2">mins</Text>
        </View>
      </View>
    </View>
  );
}
