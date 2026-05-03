import { StyleSheet, Text, View, ScrollView } from "react-native";
import SignOutButton from "../../components/social-auth-buttons/sign-out-button";
import { useAuthContext } from "../../hooks/use-auth-context";

export default function HomeScreen() {
  const { profile } = useAuthContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Username</Text>
        <Text>{profile?.username}</Text>
        <Text style={styles.subtitle}>Full name</Text>
        <Text>{profile?.full_name}</Text>
      </View>
      <SignOutButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
