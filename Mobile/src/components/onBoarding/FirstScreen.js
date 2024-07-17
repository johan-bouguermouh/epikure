import React from "react";
import { View, Text } from "react-native";

function FirstScreen({ step }) {
  return (
    <View>
      <Text>First Screen</Text>
      <Text>Step: {step}</Text>
    </View>
  );
}

export default FirstScreen;
