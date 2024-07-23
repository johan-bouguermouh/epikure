import React from "react";
import { Button, Text, View } from "react-native";
import Avatar from "../components/common/Avatar";

function Favoris({ navigation }) {
  return (
    <View>
      <Text>Test</Text>
      <Avatar
        uriImage="https://picsum.photos/200/300"
        isPressable={true}
        onPressHandler={() => alert("Avatar pressed")}
        size={60}
      />
      <Button
        title="Go to Produit"
        onPress={() => navigation.push("Produit")}
      />
      <Button
        title="Go to Recette"
        onPress={() => navigation.push("Recette")}
      />
      <Button
        title="Go to Magasin"
        onPress={() => navigation.push("Magasin")}
      />
    </View>
  );
}

export default Favoris;
