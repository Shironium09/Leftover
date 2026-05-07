import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs 
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#065f46',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        }
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="generate" 
        options={{
          title: 'Generate',
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="timer" 
        options={{
          title: 'Timer',
          tabBarIcon: ({ color, size }) => <Ionicons name="timer" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
        }} 
      />
    </Tabs>
  );
}
