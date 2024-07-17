import React from "react";
import { Button, Text, View } from "react-native";

function MapScreen({ navigation }) {
  return (
    <View>
      <Text>Test</Text>
      <Button
        title="Go to Magasin"
        onPress={() => navigation.push("Magasin")}
      />
    </View>
  );
}

export default MapScreen;
