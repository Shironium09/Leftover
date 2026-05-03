import { supabase } from "../../lib/supabase";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SignOutButton() {
  async function onSignOutButtonPress() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onSignOutButtonPress}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#e53935",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#e53935",
    fontSize: 16,
    fontWeight: "600",
  },
});
