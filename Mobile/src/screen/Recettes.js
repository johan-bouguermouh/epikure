import React from "react";
import { Button, Text, View, Image } from "react-native";
import working_progress from "../../assets/working_progress.png";

function Recettes({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DDD6C6",
      }}
    >
      <Image source={working_progress} style={{ width: 320, height: 320 }} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: 600,
          marginVertical: 12,
        }}
      >
        Work in progress !
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: 18,
          paddingHorizontal: "8%",
          marginBottom: "20%",
        }}
      >
        Bientôt, des recettes avec les produits de vos producteurs préférés !
      </Text>
    </View>
  );
}

export default Recettes;
