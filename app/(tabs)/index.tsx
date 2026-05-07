import { StyleSheet, Text, View, ScrollView } from "react-native";
import SignOutButton from "../../components/social-auth-buttons/sign-out-button";
import { useAuthContext } from "../../hooks/use-auth-context";

export default function HomeScreen() {
  
  const { profile } = useAuthContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome {profile?.first_name}!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{profile?.username ?? "—"}</Text>

        <Text style={styles.label}>Full name</Text>
        <Text style={styles.value}>
          {`${profile?.first_name ?? "—"} ${profile?.last_name ?? "—"}`}
        </Text>
      </View>

      <SignOutButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
  },
});
