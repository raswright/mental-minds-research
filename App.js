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

  // choose suggestions based on words found in the user's task
  const [steps, setSteps] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [completedSteps, setCompletedSteps] = useState([]);

  const [customStep, setCustomStep] = useState("");
  const [showResetQuestion, setShowResetQuestion] = useState(false);

  const energyLabels = {
    1: "Drained",
    2: "Low",
    3: "Steady",
    4: "Good",
    5: "Ready",
  };

  const createSteps = () => {
    const cleanedTask = task.trim();

    if (cleanedTask === "") {
      setErrorMessage(
        "Enter a task first so we know what to help you break down."
      );
      setSteps([]);
      return;
    }

    setErrorMessage("");

    const lowerTask = cleanedTask.toLowerCase();
    let mainSteps;

    if (
      lowerTask.includes("study") ||
      lowerTask.includes("homework") ||
      lowerTask.includes("assignment")
    ) {
      mainSteps = [
        "Read the instructions and choose one section to begin with.",
        "Work on that section without worrying about the rest yet.",
        "Review what you finished and mark what still needs attention.",
      ];
    } else if (
      lowerTask.includes("clean") ||
      lowerTask.includes("organize") ||
      lowerTask.includes("room")
    ) {
      mainSteps = [
        "Choose one small area instead of working on the whole space.",
        "Separate what belongs there from what needs to be moved.",
        "Put away or remove the items from that one area.",
      ];
    } else if (
      lowerTask.includes("presentation") ||
      lowerTask.includes("project") ||
      lowerTask.includes("slides")
    ) {
      mainSteps = [
        "Write a short outline of the main points you want to cover.",
        "Create a basic first version without focusing on appearance.",
        "Review the work and improve one section at a time.",
      ];
    } else {
      mainSteps = [
        "Decide what finished would look like for this task.",
        "Start with the easiest part for ten minutes.",
        "Review your progress and choose the next small action.",
      ];
    }

    // lower energy levels receive smaller preparation steps
    if (energyLevel <= 2) {
      mainSteps = [
        "Gather only the first thing you need to begin.",
        ...mainSteps,
        "Pause, recognize your progress, and decide whether to continue.",
      ];
    } else if (energyLevel === 3) {
      mainSteps = ["Gather what you need to begin.", ...mainSteps];
    }

    setCompletedSteps([]);
    setSteps(mainSteps);
  };

  // add or remove a step from the completed list
  const toggleStep = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) {
      const updatedSteps = completedSteps.filter(
        (index) => index !== stepIndex
      );
      setCompletedSteps(updatedSteps);
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  // calculate progress using completed steps and total steps
  const progressPercent =
    steps.length === 0
      ? 0
      : Math.round((completedSteps.length / steps.length) * 100);

  const addCustomStep = () => {
    const cleanedStep = customStep.trim();

    if (cleanedStep === "") {
      return;
    }

    setSteps([...steps, cleanedStep]);
    setCustomStep("");
  };

  // return the app to its original state
  const resetApp = () => {
    setTask("");
    setEnergyLevel(3);
    setSteps([]);
    setCompletedSteps([]);
    setErrorMessage("");
    setCustomStep("");
    setShowResetQuestion(false);
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

          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity
            style={styles.mainButton}
            onPress={createSteps}
          >
            <Text style={styles.mainButtonText}>Help me get started</Text>
          </TouchableOpacity>

          {steps.length > 0 && (
            <View style={styles.results}>
              <Text style={styles.resultsTitle}>Your smaller steps</Text>
              <Text style={styles.taskName}>{task.trim()}</Text>

              <View style={styles.progressHeading}>
                <Text style={styles.progressText}>Your progress</Text>
                <Text style={styles.progressPercent}>{progressPercent}%</Text>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>

              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);

                return (
                  <TouchableOpacity
                    style={[
                      styles.stepCard,
                      isCompleted && styles.completedStepCard,
                    ]}
                    key={index}
                    onPress={() => toggleStep(index)}
                  >
                    <View
                      style={[
                        styles.stepNumber,
                        isCompleted && styles.completedStepNumber,
                      ]}
                    >
                      <Text style={styles.stepNumberText}>
                        {isCompleted ? "✓" : index + 1}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.stepText,
                        isCompleted && styles.completedStepText,
                      ]}
                    >
                      {step}
                    </Text>
                  </TouchableOpacity>
                );
              })}


              < View style={styles.customStepArea}>
                <Text style={styles.customStepLabel}>
                  Want to add a step of your own?
                </Text>

                <View style={styles.customStepRow}>
                  <TextInput
                    style={styles.customStepInput}
                    placeholder="Add another step"
                    placeholderTextColor="#7f89a8"
                    value={customStep}
                    onChangeText={setCustomStep}
                    onSubmitEditing={addCustomStep}
                  />

                  <TouchableOpacity
                    style={styles.addStepButton}
                    onPress={addCustomStep}
                  >
                    <Text style={styles.addStepButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.tapMessage}>
                Tap a step when you complete it.
              </Text>

              {showResetQuestion ? (
                <View style={styles.resetQuestion}>
                  <Text style={styles.resetQuestionText}>
                    Are you sure you want to clear this task and your progress?
                  </Text>

                  <View style={styles.resetChoiceRow}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setShowResetQuestion(false)}
                    >
                      <Text style={styles.cancelButtonText}>Keep working</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.confirmResetButton}
                      onPress={resetApp}
                    >
                      <Text style={styles.confirmResetText}>Start over</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.startOverButton}
                  onPress={() => setShowResetQuestion(true)}
                >
                  <Text style={styles.startOverText}>Start over</Text>
                </TouchableOpacity>
              )}

            </View>
          )}

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
  errorText: {
    color: "#E8A3B3",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  results: {
    borderTopColor: "#303A57",
    borderTopWidth: 1,
    marginTop: 28,
    paddingTop: 24,
  },
  resultsTitle: {
    color: "#F0F2FA",
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 5,
  },
  taskName: {
    color: "#9FBCE8",
    fontSize: 14,
    marginBottom: 17,
  },
  stepCard: {
    alignItems: "flex-start",
    backgroundColor: "#151A2A",
    borderColor: "#303A57",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 10,
    padding: 13,
  },
  stepNumber: {
    alignItems: "center",
    backgroundColor: "#6658C7",
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    marginRight: 12,
    width: 30,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  stepText: {
    color: "#DCE1EF",
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  progressHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  progressText: {
    color: "#DCE1EF",
    fontSize: 14,
    fontWeight: "600",
  },
  progressPercent: {
    color: "#9FBCE8",
    fontSize: 14,
    fontWeight: "700",
  },
  progressBar: {
    backgroundColor: "#303A57",
    borderRadius: 6,
    height: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#7468D8",
    borderRadius: 6,
    height: "100%",
  },
  completedStepCard: {
    backgroundColor: "#242B40",
    borderColor: "#50638A",
  },
  completedStepNumber: {
    backgroundColor: "#456FAD",
  },
  completedStepText: {
    color: "#929BB5",
    textDecorationLine: "line-through",
  },
  tapMessage: {
    color: "#8791AD",
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
  },
  customStepArea: {
    borderTopColor: "#303A57",
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },
  customStepLabel: {
    color: "#DCE1EF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 9,
  },
  customStepRow: {
    flexDirection: "row",
    gap: 9,
  },
  customStepInput: {
    backgroundColor: "#151A2A",
    borderColor: "#3B4665",
    borderWidth: 1,
    borderRadius: 11,
    color: "#F0F2FA",
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  addStepButton: {
    alignItems: "center",
    backgroundColor: "#6658C7",
    borderRadius: 11,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  addStepButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  resetQuestion: {
    backgroundColor: "#151A2A",
    borderColor: "#3B4665",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 20,
    padding: 14,
  },
  resetQuestionText: {
    color: "#DCE1EF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 13,
  },
  resetChoiceRow: {
    flexDirection: "row",
    gap: 9,
  },
  cancelButton: {
    alignItems: "center",
    borderColor: "#4D5A7D",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: "#BFC6DA",
    fontSize: 13,
    fontWeight: "600",
  },
  confirmResetButton: {
    alignItems: "center",
    backgroundColor: "#6D4054",
    borderRadius: 10,
    flex: 1,
    paddingVertical: 10,
  },
  confirmResetText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  startOverButton: {
    alignItems: "center",
    marginTop: 18,
    paddingVertical: 9,
  },
  startOverText: {
    color: "#A7B3D2",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  supportText: {
    color: "#8791AD",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 18,
  },
});