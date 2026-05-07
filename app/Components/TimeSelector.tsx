import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TimeSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const PRESETS = [15, 30, 45, 60, 90, 120];

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
    <View className="bg-white rounded-2xl border border-stone-200 p-5">
      <View className="flex-row items-center gap-2 mb-4">
        <Ionicons name="time-outline" size={20} color="#065f46" />
        <Text className="text-stone-800 text-lg font-bold">Cooking Time</Text>
      </View>

      <View className="flex flex-row flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isSelected = value === preset && customValue === '';
          return (
            <TouchableOpacity
              key={preset}
              onPress={() => handlePresetPress(preset)}
              className={`px-4 py-2 rounded-full ${
                isSelected 
                  ? 'bg-emerald-700' 
                  : 'bg-stone-100 border border-stone-200'
              }`}
            >
              <Text className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-stone-600'}`}>
                {preset} min
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-row items-center mt-4 gap-2">
        <Text className="text-stone-500 text-sm font-semibold">Custom:</Text>
        <View className="flex-row items-center bg-stone-50 border border-stone-200 rounded-full px-4 py-2">
          <TextInput
            className="text-stone-800 text-base font-bold w-10 text-center"
            keyboardType="number-pad"
            maxLength={3}
            value={customValue}
            onChangeText={handleCustomChange}
            placeholder="--"
            placeholderTextColor="#9ca3af"
            onFocus={() => {
                if (!customValue && value > 0) {
                    setCustomValue(value.toString());
                }
            }}
          />
          <Text className="text-stone-400 text-sm font-semibold ml-1">min</Text>
        </View>
      </View>
    </View>
  );
}
