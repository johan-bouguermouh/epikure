import React from "react";
import { Button, Text, View } from "react-native";

function Produits({ navigation }) {
  return (
    <View>
      <Text>Test</Text>
      <Button
        title="Go to Produit"
        onPress={() => navigation.push("Produit")}
      />
      <Button
        title="Go to Recette"
        onPress={() => navigation.push("Recette")}
      />
    </View>
  );
}

export default Produits;
