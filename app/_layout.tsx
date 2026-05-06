import "../global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SplashScreenController } from "../components/splash-screen-controller";
import { useAuthContext } from "../hooks/use-auth-context";
import { useColorScheme } from "react-native";
import AuthProvider from "../providers/auth-provider";
import { useEffect } from "react";

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "Login" || segments[0] === "Signup" || segments[0] === "index";

    if (!isLoggedIn && !inAuthGroup) {
      // Redirect to welcome screen if not logged in
      router.replace("/");
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect to home if logged in
      router.replace("/(tabs)/home");
    }
  }, [isLoggedIn, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="chatbot" />
      <Stack.Screen name="Recipe" />
      <Stack.Screen name="RecipeList" />
      <Stack.Screen name="ShoppingList" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="Timer" />
      <Stack.Screen name="Confirmation" />
      <Stack.Screen name="Options" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
