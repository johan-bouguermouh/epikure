import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";

function ProductCard({ navigation, command }) {
  console.log("COMMANDE", command);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.containerImage}
        onPress={() =>
          navigation.navigate("Produit", { productId: command.id })
        }
      >
        <Image source={{ uri: command.thumbnail }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.containerOthers}>
        <Text style={styles.name}>{command.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    opacity: 0.92,
    borderWidth: 1,
    borderColor: "#E6CCE6",
    borderRadius: 8,
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 11,
  },

  containerImage: {
    width: 95,
    height: 92,
    // borderWidth: 1,
    // borderColor: "#E6CCE6",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },

  containerOthers: {
    width: "66%",
    paddingTop: 8,
    flexDirection: "column",
    alignItems: "flex-start",
  },

  name: {
    fontSize: 16,
    fontWeight: "semibold",
  },
});

export default ProductCard;
