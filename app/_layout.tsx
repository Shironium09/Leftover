import "../global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SplashScreenController } from "../components/splash-screen-controller";
import { useAuthContext } from "../hooks/use-auth-context";
import { useColorScheme } from "react-native";
import AuthProvider from "../providers/auth-provider";

function RootNavigator() {
  const { isLoggedIn} = useAuthContext();

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chatbot" options={{ headerShown: false }} />
        <Stack.Screen name="Recipe" options={{ headerShown: false }} />
        <Stack.Screen name="RecipeList" options={{ headerShown: false }} />
        <Stack.Screen name="ShoppingList" options={{ headerShown: false }} />
        <Stack.Screen name="Settings" options={{ headerShown: false }} />
        <Stack.Screen name="Confirmation" options={{ headerShown: false }} />
        <Stack.Screen name="Options" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
      </Stack.Protected>
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
