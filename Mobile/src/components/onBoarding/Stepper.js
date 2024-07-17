import React from "react";
import { Button, View, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

function Stepper({ step, setStep, onBoarding, setLocalStorage }) {
  return (
    <View style={styles.container}>
      <Button
        title="Back"
        onPress={() => setStep(step - 1)}
        disabled={step === 0}
      />
      {onBoarding.map((dot, index) => (
        <TouchableOpacity key={index} onPress={() => setStep(index)}>
          <Entypo
            key={index}
            name="dot-single"
            size={24}
            color={step === index ? "black" : "gray"}
          />
        </TouchableOpacity>
      ))}
      {step < onBoarding.length - 1 && (
        <Button title="Next" onPress={() => setStep(step + 1)} />
      )}
      {step === onBoarding.length - 1 && (
        <Button title="Finish" onPress={() => setLocalStorage()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Stepper;