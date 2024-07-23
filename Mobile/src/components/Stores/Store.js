import React from "react";
import { Button, Text, View } from "react-native";

function Store({ route, navigation }) {
  console.log("navigation", navigation);
  console.log("route", route);
  // récup les paramètres de la navigation
  const id = route.params.place;
  console.log("id", id);
  return (
    <View>
      <Text>Magasin</Text>
      <Button
        title="Go to Produit"
        onPress={() => navigation.push("Produit")}
      />
      <Button
        title="Go to Producteur"
        onPress={() => navigation.push("Producteur")}
      />
    </View>
  );
}

export default Store;
