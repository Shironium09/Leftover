import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableOpacity
        style={{ borderWidth: 1 }}
        onPress={() => router.push("/Settings")}
      >
        <Text>Go to Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ borderWidth: 1 }}
        onPress={() => router.push("/ShoppingList")}
      >
        <Text>Go to Shopping List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ borderWidth: 1 }}
        onPress={() => router.push("/Recipe")}
      >
        <Text>Go to Recipe (from favorites)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ borderWidth: 1 }}
        onPress={() => router.replace("/")}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
