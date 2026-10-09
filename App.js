import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [task, setTask] = useState("");
  const [energyLevel, setEnergyLevel] = useState(3);

  const energyLabels = {
    1: "Drained",
    2: "Low",
    3: "Steady",
    4: "Good",
    5: "Ready",
  };

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.pageContent}>
        <View style={styles.card}>
          <Text style={styles.smallIcon}>✦</Text>
          <Text style={styles.appName}>Mental Minds</Text>

          <Text style={styles.heading}>
            Let’s take this one step at a time.
          </Text>

          <Text style={styles.description}>
            Enter a task and choose your energy level to receive manageable
            steps.
          </Text>

          <Text style={styles.label}>What feels overwhelming right now?</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: Clean and organize my room"
            placeholderTextColor="#7f89a8"
            value={task}
            onChangeText={setTask}
          />

          <Text style={styles.label}>Where is your energy right now?</Text>

          <View style={styles.energyRow}>
            {[1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.energyButton,
                  energyLevel === level && styles.selectedEnergyButton,
                ]}
                onPress={() => setEnergyLevel(level)}
              >
                <Text
                  style={[
                    styles.energyNumber,
                    energyLevel === level && styles.selectedEnergyText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.energyLabel}>
            {energyLabels[energyLevel]}
          </Text>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Help me get started</Text>
          </TouchableOpacity>

          <Text style={styles.supportText}>
            There is no pressure to finish everything at once.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#121625",
  },
  pageContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
  },
  card: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#1D2336",
    borderColor: "#303A57",
    borderWidth: 1,
    borderRadius: 24,
    padding: 27,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  smallIcon: {
    color: "#8A7DE0",
    fontSize: 22,
    marginBottom: 7,
  },
  appName: {
    color: "#9FBCE8",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 26,
  },
  heading: {
    color: "#F0F2FA",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 35,
    marginBottom: 12,
  },
  description: {
    color: "#AFB7CE",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 28,
  },
  label: {
    color: "#E4E7F2",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#151A2A",
    borderColor: "#3B4665",
    borderWidth: 1,
    borderRadius: 13,
    color: "#F0F2FA",
    fontSize: 16,
    padding: 15,
    marginBottom: 25,
  },
  energyRow: {
    flexDirection: "row",
    gap: 8,
  },
  energyButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#151A2A",
    borderColor: "#3B4665",
    borderWidth: 1,
    borderRadius: 11,
    paddingVertical: 12,
  },
  selectedEnergyButton: {
    backgroundColor: "#6658C7",
    borderColor: "#8A7DE0",
  },
  energyNumber: {
    color: "#AAB4D0",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedEnergyText: {
    color: "#FFFFFF",
  },
  energyLabel: {
    color: "#9FBCE8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 9,
    marginBottom: 25,
  },
  mainButton: {
    alignItems: "center",
    backgroundColor: "#456FAD",
    borderRadius: 13,
    paddingVertical: 15,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  supportText: {
    color: "#8791AD",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 18,
  },
});