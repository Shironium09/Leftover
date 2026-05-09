import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { useAuthContext } from "../hooks/use-auth-context";
import { sendChatMessage, ChatMessage } from "../lib/gemini_chat";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  createdAt: Date;
}

export default function ChatbotScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { session } = useAuthContext();
  const { recipe: recipeParam } = useLocalSearchParams();
  const currentRecipe = recipeParam
    ? JSON.parse(recipeParam as string)
    : undefined;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: currentRecipe
        ? `Hello! I'm your cooking assistant for ${currentRecipe.name}. Ask me anything about this recipe!`
        : "Hello! I am your Leftover assistant. How can I help you today?",
      sender: "bot",
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeHistory, setRecipeHistory] = useState<any[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchRecipeHistory = async () => {
      if (!session?.user || currentRecipe) return;

      const { data } = await supabase
        .from("recipes")
        .select("name, ingredients, instructions")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      setRecipeHistory(data ?? []);
    };

    fetchRecipeHistory();
  }, [session]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {

      const chatHistory: ChatMessage[] = messages.slice(1).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        content: msg.text,
      }));

      const response = await sendChatMessage(
        userText,
        chatHistory,
        recipeHistory,
        currentRecipe,
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Save to Supabase
      if (session?.user) {
        await supabase.from("chatbot_messages").insert([
          {
            user_id: session.user.id,
            recipe_id: currentRecipe?.id ?? null,
            role: "user",
            message: userText,
          },
          {
            user_id: session.user.id,
            recipe_id: currentRecipe?.id ?? null,
            role: "assistant",
            message: response,
          },
        ]);
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error.message?.includes("429")
          ? "Too many requests. Please wait a moment before sending another message."
          : "Sorry, something went wrong. Please try again.",
        sender: "bot",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`my-1 mx-3 p-3 rounded-2xl max-w-[80%] ${
        item.sender === "user"
          ? "bg-emerald-700 self-end rounded-br-sm"
          : "bg-gray-200 self-start rounded-bl-sm"
      }`}
    >
      <Text
        className={`text-base ${
          item.sender === "user" ? "text-white" : "text-gray-800"
        }`}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Text className="text-emerald-700 font-bold text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold" numberOfLines={1}>
          {currentRecipe ? currentRecipe.name : "Leftover Assistant"}
        </Text>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          className="flex-1 pt-2"
          contentContainerStyle={{ paddingBottom: 8 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Loading indicator */}
        {loading && (
          <View className="flex-row items-center px-4 py-2">
            <ActivityIndicator size="small" color="#047857" />
            <Text className="text-gray-400 ml-2 text-sm">Thinking...</Text>
          </View>
        )}

        {/* Input */}
        <View
          className="flex-row items-center p-3 border-t border-gray-200 bg-white"
          style={{ paddingBottom: insets.bottom + 8 }}
        >
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-base mr-2"
            value={input}
            onChangeText={setInput}
            placeholder="Ask about your leftovers..."
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            editable={!loading}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={loading}
            className={`rounded-full px-5 py-2 ${loading ? "bg-gray-300" : "bg-emerald-700"}`}
          >
            <Text className="text-white font-bold text-base">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
