import React from "react";
import { Text, View } from "react-native";

function SecondScreen({ step }) {
  return (
    <View>
      <Text>Second Screen</Text>
      <Text>Step: {step}</Text>
    </View>
  );
}

export default SecondScreen;
