import React from "react";
import { Text, View } from "react-native";

function LastScreen({ step }) {
  return (
    <View>
      <Text>Last Screen</Text>
      <Text>Step: {step}</Text>
    </View>
  );
}

export default LastScreen;
